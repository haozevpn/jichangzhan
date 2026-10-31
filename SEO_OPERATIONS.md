# 搜索发现与 Bing 上线操作

核验日期：2026-11-01。Bing 的界面和报告可能变化，实际配置以 Bing Webmaster Tools 当前界面为准。

## 已实现

- Astro 在构建时生成正文、title、description、关键词元数据、canonical、Article/CollectionPage JSON-LD 和面包屑 JSON-LD。
- `@astrojs/sitemap` 生成 XML sitemap；当前单个分片会汇总到 `/sitemap.xml`，服务商资料、数据说明、榜单状态页和未配置联系页不进 sitemap。
- 可索引内容栏目包括 `/ai/`、`/clients/`、`/network/`、`/questions/`、`/tizi/`、`/risk/` 与 `/guides/`，各文章均从栏目页通过普通 HTML 链接可达。
- `public/robots.txt` 允许抓取公开页面并声明 sitemap。
- 服务商资料卡和详情页使用 `noindex,follow`，等价格、条款和测试记录逐项核实后再决定是否开放索引。
- 无效链接由静态站点的 404 页面承接。具体 HTTP 状态码由部署平台负责配置和验证。
- `public/_headers` 是 Cloudflare Pages 风格的响应头文件。其他托管平台需按各自格式配置同类头部。
- IndexNow 脚本只在手工运行时提交同一规范主机名的 URL；密钥不写入源码库。

## Bing Webmaster Tools

1. 确认站点拥有者已控制 `jichangzhan.com`，启用 HTTPS，并将其他主机名永久重定向到 `https://jichangzhan.com`。
2. 在 Bing Webmaster Tools 验证站点所有权；使用账户当前提供的 DNS、文件或其他验证方式。
3. 提交 `https://jichangzhan.com/sitemap.xml`，检查 sitemap 读取状态和重要 URL 的抓取/索引诊断。
4. 抽查首页、AI、客户端、故障、问答、入门指南及 `/methodology/` 等 canonical 页面，确认返回 200、HTML 正文可见、robots 未误拦截且 canonical 正确。
5. 发布或删除内容后按实际改动更新 sitemap 和日期；出现重定向、404 或过期数据时，先修正来源与目标，再请求重新抓取。
6. 每周检查技术错误；每 28 天回顾查询、曝光、点击、索引和可用的 AI 引用报告。样本量不足时只记录现象，不解释成稳定趋势。

站点运营应使用清晰的内部链接、规范 sitemap、准确结构化数据和可核验的内容。SEO/GEO 做法不保证排名、流量或引用。

## IndexNow

IndexNow 通知需要在站点根目录发布 UTF-8 密钥文件，并以密钥提交 URL；成功响应只表示收到通知，不保证抓取或收录。

本站的 `scripts/write-indexnow-key.mjs` 从 `INDEXNOW_KEY` 环境变量生成公开验证文件；`scripts/submit-indexnow.mjs` 仅提交人工指定的 URL。正式部署后先确认根目录密钥文件可访问，再运行 URL 提交。不要把密钥放进前端页面、聊天、公开仓库或构建日志。

## 上线后需要验证的技术项

- 首页与重要内容的 HTML 源码包含标题、描述、正文、内部链接与 JSON-LD。
- 规范域名的 HTTPS 证书有效；`www`、HTTP 和其他已拥有主机名按单跳 301 到规范 URL。
- 首页和有效页面返回 200；不存在的路径返回真正的 404，而不是带 200 的软 404。
- sitemap 只包含规范、可索引的 200 页面；服务商详情、`/data/` 和 `/contact/` 使用 noindex 且从 sitemap 排除，`/providers/` 列表页保留收录；`lastmod` 仅在实质内容变化时变更。
- robots 文件可访问，未阻止 CSS、重要页面或 Bingbot；`noindex` 页面不出现在 sitemap。
- 手机版键盘焦点可见、导航可滚动、表格可横向浏览、对比度可读；加载无需第三方字体或分析脚本。
- 按托管平台文档验证响应安全头、自动备份、访问日志保留和 404 配置。

## 不执行的外部操作

本地工程未登录 Bing Webmaster Tools、未验证域名、未提交 sitemap 或 IndexNow URL，也未更改 DNS、托管配置或真实密钥。这些步骤需要站点所有者控制的账号和域名。
