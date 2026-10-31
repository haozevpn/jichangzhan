# 机场站

中文机场列表、网络线路服务资料与推荐指南。项目以静态生成的 Astro 页面发布，正文、导航、元数据和结构化数据都在构建时生成。

## 本地运行

需要 Node.js 20.19.0 或更高版本。

```sh
pnpm install
pnpm dev
```

默认在 `http://localhost:4321` 预览。构建并检查：

```sh
pnpm build
pnpm preview
```

也可用 npm 运行相同脚本。`dist/` 是可部署的静态站点输出。

## 内容与事实边界

- 机场推荐指南源文件在 `src/content/guides/`，采用 Markdown 和 frontmatter；专题数据在 `src/data/editorial.ts`，由 `/ai/`、`/clients/`、`/network/`、`/questions/`、`/tizi/` 与 `/risk/` 栏目渲染为静态页面。
- 新增专题文章时，同时填写独立标题、description、keywords、直接答案（问答类）和内容分节；由对应栏目索引自动提供站内链接。
- 空白实测模板位于 `templates/test-record.csv`，部署后可在 `/test-record.csv` 获取。模板不含演示成绩；服务商测试结论须与完整记录、证据和限制一起发布。
- 服务商资料在 `src/data/providers.ts`，由站点运营者整理名称和注册入口。部分链接包含推广参数，价格、条款和服务表现不在本站资料卡中冒充已核验事实。
- 当前没有可公开复核的实测记录或真实评分；榜单页不会伪装成实测排行。注册链接含推广参数，实际收益情况需由运营者核实并按实际情况更新披露。发布前请补充真实作者、复核人和联系方式。
- 内容更新日期代表文章实质修订日期，不等于供应商数据已更新。更新服务商字段时，记录核验日期和修订摘要。

## 项目结构

```text
src/content/guides/   常青指南 Markdown
src/data/providers.ts 服务商名称、注册入口和披露状态
src/layouts/          页面框架、SEO 元数据和 JSON-LD
src/pages/            首页、服务商、政策与文章路由
public/               robots.txt 与静态资源
scripts/              IndexNow 密钥发布和 URL 通知脚本
templates/            测试表与变更记录 CSV 模板
```

## 发布与域名配置

1. 在现有托管商创建静态站点，构建命令设为 `pnpm build`，发布目录设为 `dist`，安装命令设为 `pnpm install --frozen-lockfile`（首次安装后提交 lockfile）。
2. 按托管商要求添加 `jichangzhan.com` 和 `www.jichangzhan.com`，开启 HTTPS，并把非规范主机名设置为 301 到 `https://jichangzhan.com`。域名、托管商和 DNS 账号尚未提供，本地实现没有改动真实 DNS 或部署。
3. 对外前核对品牌/商标、服务商信息、每个外链和文章来源；补充真实的编辑署名、复核人、联系邮箱、隐私政策适用范围和实际商业关系。
4. 在 Bing Webmaster Tools 验证规范域名，提交 `https://jichangzhan.com/sitemap.xml`，检查首页、目录和指南 URL 的抓取状态。验证方式与账户功能以当时的 Bing 官方界面为准。
5. sitemap 由 `@astrojs/sitemap` 随构建生成。只有内容实质更新后才改文章 frontmatter 的 `updatedAt`；不要只为显示新日期而修改。

## IndexNow

通知只表示提交 URL，不保证抓取或收录。本站不保存真实密钥。上线时：

1. 生成一个由字母和数字组成的随机密钥，放在托管环境变量 `INDEXNOW_KEY` 中。
2. 从该变量生成站点根目录的 `/<密钥>.txt` 文件，再重新构建、部署；不要把密钥提交到 Git。Windows PowerShell 示例：

   ```powershell
   $env:INDEXNOW_KEY = 'your-generated-key'
   pnpm indexnow:key
   ```

3. 确认 `https://jichangzhan.com/<密钥>.txt` 返回该密钥后，设置 `INDEXNOW_URLS`（英文逗号分隔的已发布规范 URL），再运行 `pnpm indexnow:submit`。该脚本会向 IndexNow 提交，不会自动运行在开发或构建流程中。

## 部署前检查

- `jichangzhan.com` 是否已由站点所有者控制，HTTPS 与单一主机名重定向是否生效。
- 所有外链的商家身份、目标域名、联盟/赞助关系、价格口径及条款是否经过人工核验。
- 真实作者/复核人、纠错渠道、隐私政策和条款是否补齐。
- 重要 URL（含新增 AI/客户端/故障/问答专题）返回 200，未知 URL 返回 404；检查 canonical、sitemap、移动端布局、键盘焦点与外链新标签行为。
- 无服务商评分、读者评价或性能测试数据进入页面，除非存在可追溯的测试记录。

## 维护

测试方法及初始评分权重见 `/methodology/`。发布指南日历、测试记录表、变更日志模板位于 `CONTENT_CALENDAR.md` 与 `templates/`。价格过期时先标记失效或下架，不要静默保留成当前报价。
