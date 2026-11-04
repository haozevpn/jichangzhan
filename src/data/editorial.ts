export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleFaq = { question: string; answer: string };

export type EditorialArticle = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  updatedAt: string;
  answer?: string;
  faqs?: ArticleFaq[];
  sections: ContentSection[];
};

export type AiPlatform = {
  slug: string;
  name: string;
  vendor: string;
  summary: string;
  keywords: string[];
  nodeNote: string;
  article: EditorialArticle;
};

export type ClientGuide = {
  slug: string;
  name: string;
  platforms: string;
  summary: string;
  keywords: string[];
  sections: ContentSection[];
};

export const editorialDate = '2026-11-01';

export const aiPlatforms: AiPlatform[] = [
  {
    slug: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    summary: '围绕 Claude 的地区支持、出口 IP、浏览器登录、Claude Code 终端代理与长连接排查。',
    keywords: ['Claude 网络环境', 'Claude 节点', 'Claude 登录失败', 'Claude Code 代理', 'Claude 地区不可用'],
    nodeNote: '先查 Anthropic 当前支持地区，再用同一地区的出口 IP 做浏览器与终端测试；不要把节点名称当成地区证明。',
    article: {
      slug: 'network',
      title: 'Claude 网络环境怎么检查？地区、IP 与客户端分流',
      description: '从支持地区、出口 IP、浏览器登录和 Claude Code 终端代理四个层面排查 Claude 网络问题，给出可复查的测试顺序。',
      keywords: ['Claude 网络环境', 'Claude 节点推荐', 'Claude Code 网络', 'Claude 登录失败'],
      category: 'AI 使用指南',
      updatedAt: editorialDate,
      sections: [
        { heading: '先确认平台和账户条件', paragraphs: ['Claude 的可用性会同时受到平台政策、账户地区、出口 IP 和请求路径影响。先查看 Anthropic 当前支持地区与账户提示，再判断是地区限制、IP 风控还是客户端没有走代理。', '不要因为某个节点标注“美国”就直接下结论。记录实际出口国家、网络类型、测试时间和页面错误，才能区分节点标签与真实出口。'] },
        { heading: '浏览器与 Claude Code 分开测试', paragraphs: ['浏览器能打开不代表终端工具也能用。Claude Code 运行在终端，可能需要 HTTP(S) 代理环境变量、TUN 模式或应用级分流；先用一个最小请求验证，再运行长任务。', '测试时分别记录登录、短对话、长响应和代码拉取。任何一项失败，都保留错误类型和发生时间，不要把一次成功截图写成长期保证。'] },
        { heading: '出现错误时按层定位', paragraphs: ['先确认系统时间、DNS 和本地网络，再确认客户端是否接管目标域名，最后检查出口 IP 是否频繁变化。fetch failed、连接重置和长响应中断通常需要不同的排查路径。', '每次只改变一个条件，例如只换节点或只切换 TUN，避免同时修改规则、客户端和网络后无法判断原因。'] },
        { heading: '发布测评需要留下什么', paragraphs: ['真实测评至少应写明设备、系统、客户端、节点地区、运营商、时段、样本数和失败次数。对 Claude 这类平台，还要标记浏览器与终端是否分别通过。', '本站只在有可复查记录时发布可用性结论；没有样本的品牌只保留资料状态，不用“稳定”或“支持 Claude”替代证据。'] },
      ],
    },
  },
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    summary: '覆盖 ChatGPT 网页、App、长响应、登录错误与终端工具的网络条件和排查顺序。',
    keywords: ['ChatGPT 网络环境', 'ChatGPT 节点', 'ChatGPT 登录失败', 'ChatGPT 回答中断'],
    nodeNote: '以 OpenAI 支持地区和官方网络建议为基准，优先保持出口稳定并观察长连接是否连续。',
    article: {
      slug: 'network',
      title: 'ChatGPT 网络环境完整指南：地区、节点、分流与响应中断',
      description: '解释 ChatGPT 网页与 App 的网络检查方法，区分地区、IP、DNS、长连接和客户端分流问题。',
      keywords: ['ChatGPT 网络错误', 'ChatGPT 节点选择', 'ChatGPT 响应中断', 'ChatGPT 登录失败'],
      category: 'AI 使用指南',
      updatedAt: editorialDate,
      sections: [
        { heading: '把问题分成四层', paragraphs: ['ChatGPT 打不开、登录失败、回答中断和图片或文件加载失败，不一定由同一个原因造成。先分别检查页面可达性、账户地区、出口 IP、DNS 与长连接，再决定是否更换节点。', '记录错误页面、发生时间和网络环境。不要只记“不能用”，因为登录、流式输出和文件域名可能走不同请求路径。'] },
        { heading: '网页和 App 使用不同验证方法', paragraphs: ['网页端先用无痕窗口排除缓存与扩展，再检查客户端是否覆盖目标域名。App 还要检查系统代理、证书、应用权限和系统时间。', '若普通网页都能打开但回答中断，优先观察丢包、出口变化和晚高峰拥塞；若只有登录失败，再回到账户与地区条件。'] },
        { heading: '终端工具不能默认继承浏览器代理', paragraphs: ['命令行程序通常需要单独设置 HTTP_PROXY、HTTPS_PROXY 或使用 TUN。设置后用一个安全的连通性请求验证，不要把令牌或完整订阅地址贴到在线诊断站。', '长任务测试要记录开始时间、持续时间和中断位置。短暂成功不代表长连接在高峰期也稳定。'] },
        { heading: '如何写出可复查结论', paragraphs: ['测评应写清平台版本、设备、客户端、节点地区、运营商、时间段、样本数和失败样本。结论使用“在这些条件下观察到”，不要扩展成所有用户都可用。'] },
      ],
    },
  },
  {
    slug: 'codex',
    name: 'Codex',
    vendor: 'OpenAI',
    summary: '区分 Codex CLI、IDE 扩展和云端任务的网络路径，重点处理终端代理、登录回调与长任务断连。',
    keywords: ['Codex 网络环境', 'Codex CLI 代理', 'Codex 登录失败', 'Codex 连接失败'],
    nodeNote: 'Codex CLI 和 IDE 扩展需要单独验证终端路径；浏览器能访问 ChatGPT 不等于命令行已走代理。',
    article: {
      slug: 'network',
      title: 'Codex 网络环境怎么配？CLI、IDE 与云端任务分别排查',
      description: '区分 Codex CLI、IDE 扩展和云端任务的连接路径，给出终端代理、登录回调与长任务排查步骤。',
      keywords: ['Codex CLI 代理', 'Codex 网络环境', 'Codex 登录回调', 'Codex 连接失败'],
      category: 'AI 使用指南',
      updatedAt: editorialDate,
      sections: [
        { heading: '先判断你使用的是哪条路径', paragraphs: ['Codex CLI、IDE 扩展和云端任务的网络路径不同。CLI 依赖当前终端环境，IDE 可能使用自己的进程环境，云端任务则由远端执行环境负责连接。', '把“浏览器可以用”与“命令行可以用”分别记录，避免用一个结果解释全部产品形态。'] },
        { heading: 'CLI 的最小代理检查', paragraphs: ['先检查终端是否能解析目标域名，再确认 HTTPS 代理变量或 TUN 是否生效。用不包含密钥的请求做验证，避免把访问令牌放入日志、截图或在线检测工具。', 'PowerShell、bash 和 zsh 的变量设置方式不同，完成测试后检查是否把代理变量写入了不应共享的配置文件。'] },
        { heading: '登录回调与长任务', paragraphs: ['登录回调失败时，先观察浏览器回调是否返回终端、端口是否被本机防火墙拦截，以及终端与浏览器是否使用同一出口。', '长任务中断时记录断开时间、是否切换节点、终端错误和本地网络变化。稳定性结论必须来自多次、跨日期样本。'] },
        { heading: '测评边界', paragraphs: ['Codex 的网络表现不能只用网页测速代替。真实记录应包含命令类型、任务时长、工具版本、网络环境和失败次数，并将账号权限、模型额度等非网络因素单独标记。'] },
      ],
    },
  },
  {
    slug: 'gemini',
    name: 'Gemini',
    vendor: 'Google',
    summary: '解释 Gemini 网页、App、Gemini API 与 Google AI Studio 的地区、账号和出口 IP 差异。',
    keywords: ['Gemini 地区不可用', 'Gemini 节点', 'Google AI Studio 地区', 'Gemini 网络环境'],
    nodeNote: 'Gemini 与 Google AI Studio 不是同一个入口；同时记录出口 IP、Google 账号地区和产品版本。',
    article: {
      slug: 'network',
      title: 'Gemini 地区不可用怎么办？节点、账号地区与 AI Studio 区分',
      description: '从出口 IP、Google 账号地区和产品入口三个层面排查 Gemini 与 Google AI Studio 的地区限制。',
      keywords: ['Gemini 地区不可用', 'Gemini 节点选择', 'Google AI Studio 无法使用', 'Gemini 登录失败'],
      category: 'AI 使用指南',
      updatedAt: editorialDate,
      sections: [
        { heading: '先区分 Gemini 产品入口', paragraphs: ['Gemini 网页、移动应用、Gemini API 和 Google AI Studio 的支持范围、账户条件和请求路径可能不同。遇到“地区不可用”时，先记录入口、账户类型和完整错误。', '不要用网页可用性推断 API 或 AI Studio 一定可用，也不要把一次切换节点成功视为地区政策长期不变。'] },
        { heading: '检查出口与账号地区', paragraphs: ['确认当前出口 IP 的国家或地区，再检查 Google 账号的地区、付款资料和组织策略是否存在冲突。测试时尽量固定一个出口，避免多个标签不同的节点同时登录。', '清缓存、重新登录或更换浏览器只能排除本地状态，不能改变平台对地区或账户资格的判断。'] },
        { heading: 'AI Studio 需要额外检查', paragraphs: ['AI Studio 还涉及开发者项目、API 密钥、配额和组织设置。页面能打开但模型请求失败时，分别检查项目权限、配额、API 域名与网络日志。', '公开截图时遮挡密钥、项目编号和账户信息；不要把密钥复制到第三方诊断页。'] },
        { heading: '记录可复查结果', paragraphs: ['写清产品入口、浏览器或客户端、出口地区、账号条件、时间、错误文本和重复次数。结论应限定到测试条件，并链接官方支持地区页面。'] },
      ],
    },
  },
  {
    slug: 'grok',
    name: 'Grok',
    vendor: 'xAI',
    summary: '从账号、出口地区、浏览器会话和长连接角度整理 Grok 的可用性排查。',
    keywords: ['Grok 节点', 'Grok 地区', 'Grok 登录失败', 'Grok 网络错误'],
    nodeNote: 'Grok 的地区和产品政策可能调整，发布前必须重新查看 xAI 或 X 的官方说明。',
    article: {
      slug: 'network',
      title: 'Grok 用什么节点？先检查账号、地区和出口 IP',
      description: '不直接给出固定地区结论，按账号、出口 IP、浏览器会话和网络错误建立 Grok 排查流程。',
      keywords: ['Grok 用什么节点', 'Grok 地区限制', 'Grok 登录失败'],
      category: 'AI 使用指南',
      updatedAt: editorialDate,
      sections: [
        { heading: '政策先于节点清单', paragraphs: ['Grok 的支持地区、产品入口和账号要求可能变化。先看官方政策和账户提示，再根据实际出口 IP 进行测试。节点名称或社群列表不能替代官方规则。'] },
        { heading: '检查登录与会话状态', paragraphs: ['若网页能打开但模型请求失败，先退出多余会话、检查浏览器缓存和系统时间，再固定单一出口重试。不要在多个地区节点之间快速切换，以免把会话风控和网络问题混在一起。'] },
        { heading: '记录失败样本', paragraphs: ['至少记录页面错误、请求是否开始、流式输出是否中断、网络类型和测试时间。只有多日重复结果才能说明某个条件下的稳定性。'] },
      ],
    },
  },
  {
    slug: 'perplexity',
    name: 'Perplexity',
    vendor: 'Perplexity AI',
    summary: '覆盖网页、App、搜索请求和流式回答的网络排查与节点选择记录方法。',
    keywords: ['Perplexity 节点', 'Perplexity 无法访问', 'Perplexity 网络错误'],
    nodeNote: '优先固定出口和客户端，观察搜索请求、引用加载与流式回答是否分别异常。',
    article: {
      slug: 'network',
      title: 'Perplexity 无法访问怎么排查？网页、App 与搜索请求',
      description: '按网页、App、搜索请求和引用加载拆分 Perplexity 的网络故障，避免只用一次打开结果判断稳定性。',
      keywords: ['Perplexity 无法访问', 'Perplexity 网络错误', 'Perplexity 节点选择'],
      category: 'AI 使用指南',
      updatedAt: editorialDate,
      sections: [
        { heading: '先确认是哪一段失败', paragraphs: ['页面加载、提交问题、流式回答和引用内容可能是不同请求。记录具体失败位置，比简单写“Perplexity 打不开”更容易定位。'] },
        { heading: '固定出口后逐项验证', paragraphs: ['先用一个固定节点测试网页，再测试短问题、长回答和引用打开。若只在长回答中断，优先检查丢包、连接重置和客户端超时。'] },
        { heading: 'App 的额外变量', paragraphs: ['移动端还要检查系统代理、蜂窝网络切换、应用版本和后台网络权限。截图或日志中遮挡账户与设备标识。'] },
      ],
    },
  },
  {
    slug: 'google-ai-studio',
    name: 'Google AI Studio',
    vendor: 'Google',
    summary: '区分 AI Studio 网页、API 项目、密钥、配额和地区支持，适合开发者排查。',
    keywords: ['Google AI Studio 地区', 'AI Studio 无法使用', 'Gemini API 网络', 'AI Studio API 密钥'],
    nodeNote: '同时记录网页入口、开发者项目、API 区域和账户组织限制，不能只测试首页。',
    article: {
      slug: 'network',
      title: 'Google AI Studio 地区不可用怎么办？网页、API 与配额检查',
      description: '从地区、项目权限、API 密钥、配额和网络请求五个层面排查 Google AI Studio。',
      keywords: ['Google AI Studio 地区不可用', 'Gemini API 连接失败', 'AI Studio 配额'],
      category: 'AI 使用指南',
      updatedAt: editorialDate,
      sections: [
        { heading: '不要把网页和 API 混为一谈', paragraphs: ['AI Studio 网页能打开，只能说明当前浏览器完成了页面加载；API 是否可用还取决于项目、密钥、模型、配额和请求路径。'] },
        { heading: '检查项目与密钥', paragraphs: ['确认请求使用正确项目和模型，密钥没有过期或被限制，配额没有耗尽。任何日志、截图和示例代码都必须移除真实密钥。'] },
        { heading: '区分网络错误和权限错误', paragraphs: ['超时、DNS、TLS 和连接重置属于网络层；403、配额不足和地区提示属于权限或政策层。记录 HTTP 状态、错误字段和发生时间。'] },
        { heading: '把地区结论写成日期化记录', paragraphs: ['官方可用地区会变化，文章需显示核验日期，并链接 Google 官方文档。没有当天证据时，使用“需以官方页面为准”，不要承诺固定地区。'] },
      ],
    },
  },
  {
    slug: 'github',
    name: 'GitHub AI',
    vendor: 'GitHub / Microsoft',
    summary: '围绕 GitHub Copilot、模型请求、企业网络和客户端证书的基础排查。',
    keywords: ['GitHub Copilot 网络', 'GitHub AI 连接失败', 'Copilot 代理'],
    nodeNote: '企业网络、组织策略和证书检查常常比节点地区更关键，先确认组织管理员要求。',
    article: {
      slug: 'network',
      title: 'GitHub Copilot 网络连接怎么排查？企业代理与证书检查',
      description: '介绍 GitHub AI 工具在浏览器、IDE 和企业网络中的连接排查顺序，区分代理、证书和组织策略。',
      keywords: ['GitHub Copilot 网络', 'Copilot 连接失败', 'GitHub AI 代理'],
      category: 'AI 使用指南',
      updatedAt: editorialDate,
      sections: [
        { heading: '先确认账号与组织策略', paragraphs: ['GitHub AI 功能可能受个人订阅、组织策略、IDE 登录状态和网络出口共同影响。先确认账号有权限，再排查网络。'] },
        { heading: 'IDE 与浏览器路径不同', paragraphs: ['浏览器能打开 GitHub，不代表 IDE 的扩展进程能够连接。检查 IDE 代理设置、扩展日志、系统证书和企业 TLS 检查。'] },
        { heading: '企业网络需要管理员配合', paragraphs: ['遇到证书替换、代理认证或域名白名单问题，应让网络管理员确认允许的域名和证书链。不要自行关闭证书验证。'] },
      ],
    },
  },
];

export const clientGuides: ClientGuide[] = [
  { slug: 'clash-verge', name: 'Clash Verge Rev', platforms: 'Windows · macOS · Linux', summary: '覆盖安装来源、订阅导入、规则分流、系统代理、TUN 和日志排查。', keywords: ['Clash Verge Rev 教程', 'Clash Verge 导入订阅', 'Clash Verge TUN'], sections: [
    { heading: '安装与版本确认', paragraphs: ['只从项目官方发布页或可信的软件分发渠道安装，记录版本和系统架构。首次启动先确认系统代理、权限和配置目录。'] },
    { heading: '导入订阅并保护链接', paragraphs: ['订阅链接等同账户凭证，不要贴到在线转换站或公开群。导入后检查更新时间、节点数量和配置来源，异常时删除旧配置再重新添加。'] },
    { heading: '规则与 TUN 的取舍', paragraphs: ['规则模式适合需要分流的日常使用，TUN 适合不遵循系统代理的终端程序。启用 TUN 前确认系统权限和 DNS 设置，避免多个代理同时接管。'] },
    { heading: '排查顺序', paragraphs: ['先看客户端运行状态，再看系统代理、DNS、日志和单个节点。不要同时切换内核、规则和节点，否则难以定位。'] },
  ] },
  { slug: 'mihomo', name: 'Mihomo（Clash Meta）', platforms: 'Windows · macOS · Linux · 路由器', summary: '面向高级用户的配置、策略组、规则集和 TUN 兼容性说明。', keywords: ['Mihomo 教程', 'Clash Meta 配置', 'Mihomo TUN'], sections: [
    { heading: '先分清内核与图形界面', paragraphs: ['Mihomo 是内核，图形界面负责编辑配置和控制进程。遇到问题时分别记录内核版本、界面版本和配置文件来源。'] },
    { heading: '策略组不要只看节点名称', paragraphs: ['自动选择、故障转移和手动选择的行为不同。测试时固定策略组，记录实际命中的节点和切换时间。'] },
    { heading: '路由器部署的额外变量', paragraphs: ['路由器还涉及固件、DNS、IPv6、MTU 和局域网设备范围。先用一台设备验证，再扩大到全局。'] },
  ] },
  { slug: 'shadowrocket', name: 'Shadowrocket', platforms: 'iOS · macOS', summary: '介绍 iOS 端订阅、规则、按域名分流、DNS 和权限检查。', keywords: ['Shadowrocket 教程', '小火箭导入订阅', 'Shadowrocket 规则'], sections: [
    { heading: '购买与安装来源', paragraphs: ['以 App Store 当前页面和设备系统要求为准。不要安装来历不明的同名配置工具，也不要把账户凭证交给代配置服务。'] },
    { heading: '订阅与节点验证', paragraphs: ['导入后先确认订阅更新时间、节点数量和策略组，再打开系统代理。用一个公开网页和一个目标应用分别测试。'] },
    { heading: 'DNS 与分流', paragraphs: ['DNS、规则和代理模式会共同影响结果。修改前记录原设置，出现全局断网时先恢复最小配置。'] },
  ] },
  { slug: 'v2rayn', name: 'v2rayN', platforms: 'Windows · Linux · macOS', summary: '覆盖分享链接、订阅分组、系统代理、核心版本与日志阅读。', keywords: ['v2rayN 教程', 'v2rayN 导入订阅', 'v2rayN 连接失败'], sections: [
    { heading: '导入前先确认格式', paragraphs: ['不同服务商提供的分享链接、订阅地址和配置文件格式不同。先查看服务商说明，再选择对应导入方式。'] },
    { heading: '核心版本与界面版本分开记录', paragraphs: ['更新后若行为改变，记录核心、界面和系统版本。不要为了追求最新版而覆盖可用配置，先备份并验证。'] },
    { heading: '查看日志定位错误', paragraphs: ['DNS、TLS、端口、认证和超时在日志中的表现不同。每次只改一个变量，并保留脱敏后的错误文本。'] },
  ] },
  { slug: 'sing-box', name: 'sing-box', platforms: 'Windows · macOS · Linux · iOS · Android · 路由器', summary: '面向多平台用户的 JSON 配置、路由规则、DNS 和入站出站概念。', keywords: ['sing-box 教程', 'sing-box 配置', 'sing-box 路由'], sections: [
    { heading: '先理解配置层次', paragraphs: ['sing-box 配置通常分为入站、出站、路由和 DNS。先用最小配置验证出站，再逐步加规则，避免一次复制复杂模板。'] },
    { heading: '跨平台时记录差异', paragraphs: ['桌面、移动端和路由器的权限与网络栈不同。相同配置在不同平台表现不一致时，优先比较系统权限和 DNS。'] },
    { heading: '安全地处理配置', paragraphs: ['配置文件可能包含服务器地址、UUID、密码或订阅令牌。分享日志前删除敏感字段，存储时使用本地安全位置。'] },
  ] },
  { slug: 'stash', name: 'Stash', platforms: 'iOS · macOS', summary: '适合 Apple 设备的策略组、脚本、重写和按应用分流基础。', keywords: ['Stash 教程', 'Stash 导入订阅', 'Stash 规则'], sections: [
    { heading: '从最小配置开始', paragraphs: ['首次导入后先测试单节点和系统代理，再启用脚本、重写和复杂策略组。每次更新前保留可回滚的配置。'] },
    { heading: '按应用和域名验证', paragraphs: ['网页可用不代表应用内请求可用。分别测试浏览器、目标 App 和后台请求，记录系统版本与应用版本。'] },
    { heading: '避免配置泄露', paragraphs: ['订阅地址、脚本和重写规则可能包含账号或内部域名。公开排障时只提供脱敏片段。'] },
  ] },
  { slug: 'surge', name: 'Surge', platforms: 'iOS · macOS', summary: '面向高级用户的模块、规则、策略组和网络诊断方法。', keywords: ['Surge 教程', 'Surge 配置', 'Surge 规则'], sections: [
    { heading: '先确认许可与系统要求', paragraphs: ['以当前 App Store 和官方文档为准，记录设备、系统和 Surge 版本。不同平台功能与许可方式可能不同。'] },
    { heading: '规则调试要看命中结果', paragraphs: ['不要只检查配置是否能加载，还要确认目标域名实际命中了哪个策略。使用日志和规则匹配信息逐项验证。'] },
    { heading: '复杂配置要有回滚点', paragraphs: ['修改模块、脚本或 DNS 前保存版本。出现全局断网时先恢复最小配置，再逐项加回高级功能。'] },
  ] },
];

export const networkArticles: EditorialArticle[] = [
  { slug: 'ip-restricted', title: 'IP 被限制或反复验证怎么办？', description: '按出口 IP、账户会话、浏览器状态和平台政策逐层排查 IP 风控提示。', keywords: ['IP 被限制', 'IP 风控', 'Access denied', '反复验证'], category: '网络故障', updatedAt: editorialDate, sections: [
    { heading: '先保存错误和时间', paragraphs: ['记录完整提示、目标服务、出口地区、设备、客户端和发生时间。不要用多个节点连续刷新，让问题变得更难判断。'] },
    { heading: '固定出口并清理会话', paragraphs: ['固定一个符合平台政策的出口，退出多余会话，检查系统时间和浏览器缓存。若是账号或地区限制，换节点不一定解决。'] },
    { heading: '不要绕过安全验证', paragraphs: ['遇到验证码、身份验证或账户限制，应按平台官方流程处理。不要购买所谓“干净 IP”或把账号交给代验证服务。'] },
  ] },
  { slug: 'client-no-internet', title: '客户端开启后没有网络怎么办？', description: '从系统代理、TUN、DNS、端口占用和规则模式开始定位全局断网。', keywords: ['客户端开启后没网', '代理没网', 'TUN 断网'], category: '网络故障', updatedAt: editorialDate, sections: [
    { heading: '先关闭冲突代理', paragraphs: ['确认系统中只有一个客户端接管代理，暂时关闭浏览器扩展、系统 VPN 和其他代理进程。'] },
    { heading: '按最小配置恢复', paragraphs: ['关闭 TUN、脚本和复杂规则，只保留一个节点和系统代理。能恢复后再逐项开启功能。'] },
    { heading: '检查 DNS 与权限', paragraphs: ['查看 DNS 是否被错误接管、系统时间是否准确、客户端是否有必要权限。不要直接关闭证书验证或安全软件。'] },
  ] },
  { slug: 'node-timeout', title: '节点全部超时或连接不上怎么办？', description: '区分单节点故障、订阅失效、本地网络问题和服务端维护。', keywords: ['节点超时', '节点连接不上', '机场全部超时'], category: '网络故障', updatedAt: editorialDate, sections: [
    { heading: '先测本地基线', paragraphs: ['关闭代理确认普通网络正常，再检查系统时间、DNS 和防火墙。若普通网络本身异常，先处理本地连接。'] },
    { heading: '区分单点和全量', paragraphs: ['只测试一个节点无法判断服务整体。选择不同地区和协议的少量节点，记录是否全部超时以及错误类型。'] },
    { heading: '确认订阅和维护公告', paragraphs: ['检查订阅是否过期、配置是否更新成功、服务商是否发布维护通知。不要在无法解释原因时连续购买套餐。'] },
  ] },
  { slug: 'ai-tools-blocked', title: '普通网页能开，但 AI 工具打不开怎么办？', description: '区分 AI 平台地区、出口 IP、域名分流、账号和长连接问题。', keywords: ['AI 工具打不开', 'ChatGPT 打不开', 'Claude 无法访问', 'Gemini 地区不可用'], category: '网络故障', updatedAt: editorialDate, sections: [
    { heading: '先确定失败位置', paragraphs: ['记录是登录、发送请求、流式输出、文件上传还是引用加载失败。不同路径可能使用不同域名。'] },
    { heading: '固定出口与规则', paragraphs: ['固定单一出口，确认目标域名走代理而不是直连。不要频繁切换地区节点，以免把会话风控误判成网络问题。'] },
    { heading: '回到官方支持条件', paragraphs: ['平台地区和账户政策会变化。链接官方帮助页，记录核验日期，不要从社群表格推断长期可用性。'] },
  ] },
  { slug: 'dns-errors', title: 'DNS 错误怎么排查？解析失败与 DNS 泄漏', description: '从本地 DNS、代理 DNS、IPv6、缓存和客户端规则检查域名解析问题。', keywords: ['DNS 错误', 'DNS_PROBE_FINISHED', 'DNS 泄漏', '域名无法解析'], category: '网络故障', updatedAt: editorialDate, sections: [
    { heading: '判断是否只是一个域名', paragraphs: ['先比较多个公开域名和同一服务的不同入口。只有一个域名失败时，重点看缓存、规则和域名状态。'] },
    { heading: '逐层检查解析路径', paragraphs: ['记录系统 DNS、客户端 DNS、IPv4/IPv6 和代理模式。修改后清理缓存并重复相同查询，避免凭感觉下结论。'] },
    { heading: '不要上传完整网络信息', paragraphs: ['公开排障只需提供错误文本和脱敏结果，不要上传账户、订阅地址或完整内网信息。'] },
  ] },
  { slug: 'subscription-update-failed', title: '订阅更新失败怎么办？', description: '按链接有效性、网络可达性、客户端格式和服务商配额顺序排查订阅更新。', keywords: ['订阅更新失败', '订阅导入失败', '机场订阅失效'], category: '网络故障', updatedAt: editorialDate, sections: [
    { heading: '先确认链接没有泄露', paragraphs: ['订阅地址包含账户凭证。不要在公开平台测试，也不要把完整链接发给客服之外的第三方。'] },
    { heading: '检查客户端和格式', paragraphs: ['确认客户端支持服务商提供的格式，查看更新时间、HTTP 状态、响应大小和解析错误。'] },
    { heading: '重新生成前先留证', paragraphs: ['保存错误时间、客户端版本和服务商工单号。若服务商要求重新生成订阅，先确认旧链接如何失效。'] },
  ] },
  { slug: 'sudden-slow', title: '速度突然变慢怎么办？', description: '区分晚高峰拥塞、本地网络、节点切换、倍率和目标站限速。', keywords: ['机场速度变慢', '晚高峰变慢', '节点速度慢'], category: '网络故障', updatedAt: editorialDate, sections: [
    { heading: '先和本地基线比较', paragraphs: ['在相同时间测本地直连和代理结果，记录运营商、Wi-Fi、设备和目标端点。单次测速不能代表全天。'] },
    { heading: '固定节点和测试条件', paragraphs: ['不要同时自动切换节点、修改协议和更换下载目标。每次只改变一个变量，保留失败样本。'] },
    { heading: '看延迟、丢包和吞吐分布', paragraphs: ['最高速度不等于稳定体验。长连接应用还要关注丢包、抖动和中断次数。'] },
  ] },
  { slug: 'tls-errors', title: 'TLS 握手错误怎么办？检查证书、SNI 与系统时间', description: '从系统时间、证书链、代理重写、SNI 和客户端核心版本定位 TLS 错误。', keywords: ['TLS handshake failed', '证书错误', 'SNI 错误', '系统时间不对'], category: '网络故障', updatedAt: editorialDate, sections: [
    { heading: '先检查系统时间', paragraphs: ['证书校验依赖准确时间。先同步系统时钟，再重试同一个节点，避免把时间问题误判成线路故障。'] },
    { heading: '检查是否有证书拦截', paragraphs: ['企业网络、安全软件或代理脚本可能替换证书。不要为了连接而关闭证书验证，应确认信任链和组织要求。'] },
    { heading: '记录核心和节点信息', paragraphs: ['保存客户端、核心、节点协议、SNI 和错误文本。若只有单个节点失败，优先更换节点并向服务商报告。'] },
  ] },
];

export const questionArticles: EditorialArticle[] = [
  { slug: 'android-client', title: '安卓手机用什么代理客户端？', description: '按订阅格式、设备权限和维护成本选择 Android 客户端。', keywords: ['安卓代理客户端', 'Android 机场客户端', '安卓导入订阅'], category: '问题中心', updatedAt: editorialDate, answer: '先看服务商提供的订阅格式和官方兼容说明，再在可信渠道安装客户端。新手优先选择文档完整、更新稳定、能查看日志的方案。', sections: [{ heading: '选择顺序', paragraphs: ['确认订阅格式、系统版本、是否需要 TUN 或 VPN 权限，再比较客户端的规则能力和维护成本。不要只按名字或群聊推荐安装。'] }, { heading: '验证方法', paragraphs: ['导入后先测试一个节点、一个公开网页和一个目标应用，记录客户端版本与权限。出现全局断网时先恢复最小配置。'] }] },
  { slug: 'chatgpt-plus-subscription', title: 'ChatGPT Plus 怎么订阅？付款与地区要点', description: '说明 ChatGPT Plus 订阅前应核对的账户地区、付款渠道、自动续费和官方入口。', keywords: ['ChatGPT Plus 订阅', 'ChatGPT 付款', 'ChatGPT Plus 地区'], category: '问题中心', updatedAt: editorialDate, answer: '只从 ChatGPT 官方网页或官方应用商店入口开始，先确认账户所在地区、付款方式、税费和自动续费规则。不要把账号交给代充或共享服务。', sections: [{ heading: '付款前检查', paragraphs: ['核对官方域名、账户邮箱、最终金额、续费周期和退款规则。第三方代充可能带来账号和支付风险。'] }, { heading: '订阅后留证', paragraphs: ['保存订单凭证和订阅状态，关闭不需要的自动续费。遇到扣款或登录问题，通过官方支持渠道处理。'] }] },
  { slug: 'chatgpt-response-interrupted', title: 'ChatGPT 回答到一半中断怎么办？', description: '从丢包、长连接、浏览器状态、节点切换和服务状态逐项排查流式回答中断。', keywords: ['ChatGPT 回答中断', 'ChatGPT 流式输出断开', 'ChatGPT 丢包'], category: '问题中心', updatedAt: editorialDate, answer: '先停止自动切换节点，固定网络条件重试；若只有长回答中断，重点检查丢包、连接重置和浏览器扩展。', sections: [{ heading: '快速处理', paragraphs: ['复制已生成内容，刷新或用无痕窗口重试，关闭可能拦截流式请求的扩展。'] }, { heading: '长期定位', paragraphs: ['比较短回答、长回答和不同时间段，记录中断位置和网络条件。单次成功不能证明稳定。'] }] },
  { slug: 'codex-vs-claude-code-network', title: 'Codex 和 Claude Code 的网络要求有什么区别？', description: '比较两个终端工具的代理继承、登录回调、长任务和权限边界。', keywords: ['Codex vs Claude Code', '终端代理', 'Claude Code 网络', 'Codex CLI 网络'], category: '问题中心', updatedAt: editorialDate, answer: '两者都需要单独验证终端进程是否走代理；浏览器能用不代表 CLI 能用。区别应以当前工具文档和实际日志为准。', sections: [{ heading: '共同点', paragraphs: ['都对终端环境变量、TUN、DNS 和长连接敏感。先用最小请求验证代理，再运行长任务。'] }, { heading: '排查重点', paragraphs: ['分别记录工具版本、终端类型、登录回调、错误文本和任务持续时间。不要把两个工具的配置文件混用。'] }] },
  { slug: 'gemini-region-not-available', title: 'Gemini 为什么显示地区不可用？', description: '区分出口 IP、Google 账号地区、产品入口和组织策略造成的地区提示。', keywords: ['Gemini 地区不可用', 'Gemini 账号地区', 'Google AI Studio 地区'], category: '问题中心', updatedAt: editorialDate, answer: '先记录使用的是 Gemini 网页、App、API 还是 AI Studio，再分别核对出口 IP、Google 账号地区与官方支持范围。', sections: [{ heading: '先不要频繁换节点', paragraphs: ['频繁切换可能造成会话异常。固定一个符合政策的出口，重新登录并检查账号地区。'] }, { heading: '区分产品', paragraphs: ['Gemini 网页、App、API 和 AI Studio 的条件不一定相同。分别测试并记录错误，不要互相推断。'] }] },
  { slug: 'google-ai-studio-unavailable', title: 'Google AI Studio 显示地区不可用怎么办？', description: '从网页入口、项目权限、API 密钥、配额与支持地区排查 AI Studio。', keywords: ['Google AI Studio 无法使用', 'AI Studio 地区不可用', 'Gemini API 配额'], category: '问题中心', updatedAt: editorialDate, answer: '先确认官方支持地区和账户条件，再检查项目、密钥和配额。网页能打开不代表 API 请求一定有权限。', sections: [{ heading: '权限和网络分开看', paragraphs: ['403、配额不足属于权限或账户问题；DNS、TLS、超时属于网络问题。保存状态码和错误字段。'] }, { heading: '保护密钥', paragraphs: ['不要把 API 密钥放进截图、公共仓库或在线诊断页面。疑似泄露时按官方流程轮换。'] }] },
  { slug: 'grok-which-node', title: 'Grok 用什么节点？', description: '不提供固定地区承诺，按官方支持范围、账号状态和出口 IP 建立测试方法。', keywords: ['Grok 用什么节点', 'Grok 节点推荐', 'Grok 地区限制'], category: '问题中心', updatedAt: editorialDate, answer: '先以 xAI 当前政策和账户提示为准，固定一个符合条件的出口测试登录、短请求和长回答，再比较失败样本。', sections: [{ heading: '不要只看节点标签', paragraphs: ['实际出口、IP 信誉和账户会话比节点名称更重要。记录时间、地区和错误文本。'] }, { heading: '何时更换节点', paragraphs: ['只有在固定条件下重复失败，且排除账户与服务状态后，才逐项更换节点或客户端。'] }] },
  { slug: 'device-limit-exceeded', title: '机场设备数超限怎么办？', description: '从套餐设备政策、旧会话、客户端重复添加和账户安全逐项检查。', keywords: ['机场设备数超限', '机场多设备', '订阅设备限制'], category: '问题中心', updatedAt: editorialDate, answer: '先到服务商账户确认设备政策与在线会话，撤销不再使用的设备，再检查客户端是否重复添加同一订阅。', sections: [{ heading: '核对套餐条款', paragraphs: ['登录设备数和同时在线数可能是两个概念。保存套餐页面和客服答复。'] }, { heading: '保护订阅凭证', paragraphs: ['不要把完整订阅链接发给所谓代排障人员。若怀疑泄露，按服务商流程重置或撤销。'] }] },
  { slug: 'clash-verge-or-v2rayn', title: 'Windows 用 Clash Verge Rev 还是 v2rayN？', description: '按规则分流、TUN、协议格式、维护成本和日志能力比较两类 Windows 客户端。', keywords: ['Clash Verge Rev vs v2rayN', 'Windows 机场客户端', 'TUN 客户端'], category: '问题中心', updatedAt: editorialDate, answer: '需要规则分流和 TUN 的用户可优先看 Clash Verge Rev；只想管理节点并保持配置简单的用户可比较 v2rayN。最终以订阅格式和官方文档为准。', sections: [{ heading: '如何选择', paragraphs: ['列出自己需要的系统代理、TUN、规则、脚本和日志功能，再查看服务商支持的格式。'] }, { heading: '不要忽略维护', paragraphs: ['记录版本、配置来源和更新方式。遇到问题时一次只改变一个条件。'] }] },
];

export const tiziArticles: EditorialArticle[] = [
  { slug: 'what-is-airport', title: '机场是什么？网络线路服务新手入门', description: '解释机场、订阅链接、节点、客户端和线路之间的关系，并列出购买前需要核对的条件。', keywords: ['机场是什么', '机场服务', '机场订阅', '机场节点'], category: '梯子指南', updatedAt: editorialDate, faqs: [
    { question: '机场和 VPN 有什么区别？', answer: '机场通常指提供代理节点订阅的服务，用户用客户端导入订阅后选择节点；商业 VPN 是打包好的独立产品，由厂商维护更多服务端组件。两者在责任边界、客户端和条款上不同，不能用同一套评分比较。' },
    { question: '新手买机场要注意什么？', answer: '先核对付款周期、流量、设备数、退款、隐私和客服，再用可承受的短周期验证连接与客服，之后才决定是否加长周期。价格或节点数量不能单独证明稳定性。' },
    { question: '机场和梯子是一个意思吗？', answer: '“梯子”是对跨网络连接工具或服务的口语统称，机场只是其中一种形态，商业 VPN、自建 VPS 也可能被称作梯子。名称不能推出匿名性、速度或合规性。' },
  ], sections: [{ heading: '几个词分别指什么', paragraphs: ['机场通常指提供代理节点订阅的服务商；订阅链接是账户配置入口；客户端负责导入、分流和连接；节点是可选择的连接端点；线路是节点之间的网络路径。它们不是同一个概念。'] }, { heading: '购买前核对什么', paragraphs: ['看付款周期、流量、设备数、退款、隐私和客服。价格或节点数量不能单独证明稳定性。'] }, { heading: '怎样避免过度承诺', paragraphs: ['先用短周期和可承受预算验证自己的设备与网络，再根据重复测试结果决定是否继续。'] }] },
  { slug: 'what-is-tizi', title: '梯子是什么意思？梯子、机场、VPN 与代理的关系', description: '用服务形态和责任边界解释梯子、机场、VPN、代理和 VPS 的区别。', keywords: ['梯子是什么意思', '梯子和机场区别', '机场和 VPN 区别', '代理和 VPS'], category: '梯子指南', updatedAt: editorialDate, faqs: [
    { question: '梯子和机场是一回事吗？', answer: '不完全是。梯子是口语统称，机场是提供代理节点订阅的具体服务形态之一。说“梯子推荐”时，可能指机场、商业 VPN 或自建 VPS，选择前要先确认是哪一类产品。' },
    { question: '梯子、VPN、代理和 VPS 有什么区别？', answer: '它们的责任边界不同：机场和商业 VPN 由供应商维护服务端；代理是连接方式；VPS 需要用户自己承担系统、更新和安全配置。名称不能直接推出速度、匿名性或合规性，应按实际需求和维护能力选择。' },
    { question: '梯子推荐怎么看才靠谱？', answer: '先区分产品类别，再按设备、预算、条款、隐私和可复核证据比较，不要只按宣传词排序。涉及服务表现的结论应以可复查的连续测试为准。' },
  ], sections: [{ heading: '“梯子”是口语称呼', paragraphs: ['梯子通常是对跨网络连接工具或服务的俗称，不是统一产品类别。机场、商业 VPN、自建 VPS 可能都被口语称作梯子。'] }, { heading: '比较责任边界', paragraphs: ['托管服务由供应商维护更多服务端组件；VPS 需要用户承担系统、更新和安全配置。名称不能推出匿名性、速度或合规性。'] }, { heading: '选择时看实际需求', paragraphs: ['根据设备、维护能力、预算、条款和目标服务规则选择，不要只按宣传词排序。'] }] },
  { slug: 'subscription-link', title: '订阅链接是什么？怎么导入、更新和保护', description: '说明订阅链接的作用、导入方式、更新失败排查和凭证保护。', keywords: ['订阅链接是什么', '机场订阅导入', '订阅链接保护', '订阅更新失败'], category: '梯子指南', updatedAt: editorialDate, sections: [{ heading: '订阅链接就是账户入口', paragraphs: ['它通常包含可下载配置的凭证。任何拿到链接的人都可能使用或刷新配置，因此不要公开分享。'] }, { heading: '导入与更新', paragraphs: ['按客户端支持的格式导入，检查更新时间、响应状态和节点数量。更新失败时先确认链接未过期、网络可达且格式正确。'] }, { heading: '泄露后的处理', paragraphs: ['联系服务商确认是否能重置订阅，撤销旧设备会话，并检查是否有异常使用。'] }] },
  { slug: 'what-is-node', title: '机场节点是什么意思？节点、地区、倍率与线路', description: '拆解节点名称、地区标签、倍率和线路之间的关系，避免把营销标签当成性能证明。', keywords: ['机场节点是什么', '节点地区', '机场倍率', '机场线路'], category: '梯子指南', updatedAt: editorialDate, sections: [{ heading: '节点不是线路质量分数', paragraphs: ['节点通常是可连接的端点，地区标签可能表示出口或分组，倍率常用于流量计量，线路描述则涉及连接路径。它们不能互相替代。'] }, { heading: '如何比较', paragraphs: ['记录实际出口、延迟、丢包、吞吐、时间段和失败次数。没有样本时只记录服务商自述。'] }, { heading: '倍率要看计费口径', paragraphs: ['先确认基础流量、适用节点、统计方向、失败重试和后台更新时间，再做成本比较。'] }] },
  { slug: 'latency-and-multiplier', title: '延迟和倍率是什么意思？看懂两个关键数字', description: '解释延迟、抖动、丢包与倍率计费，给出可复查的记录表。', keywords: ['机场延迟', '机场倍率怎么算', '节点延迟', '流量倍率'], category: '梯子指南', updatedAt: editorialDate, sections: [{ heading: '延迟不等于速度', paragraphs: ['延迟表示请求往返耗时，抖动表示波动，丢包会影响长连接和语音视频；吞吐量则是另一项指标。'] }, { heading: '倍率不等于稳定性', paragraphs: ['倍率只描述计量方式。较低倍率不自动代表线路更好，必须结合总价、可用额度和自己的使用记录。'] }, { heading: '记录一组完整样本', paragraphs: ['同一设备、网络、节点和时段重复测试，保存中位数、分布和失败样本，避免只截取最低延迟。'] }] },
  { slug: 'line-types', title: 'IEPL、IPLC、BGP、中转与直连是什么？', description: '用责任边界和可验证指标解释常见线路术语，避免把线路名称直接当成稳定性承诺。', keywords: ['IEPL 机场', 'IPLC 机场', 'BGP 机场', '中转机场', '直连机场'], category: '线路与协议', updatedAt: editorialDate, faqs: [
    { question: '专线机场是什么意思？', answer: '专线机场通常指使用 IEPL、IPLC、BGP 或优质中转等线路的机场。这些术语描述的是网络路径或入口方式，不同商家定义和实现不同，不能只凭标题判断稳定或高速。' },
    { question: 'IEPL、IPLC、BGP 哪个更好？', answer: '没有脱离具体产品和用途的通用答案。应请服务商说明术语在其产品中的含义、适用套餐和节点范围，再用延迟、丢包、吞吐的连续样本对照判断。' },
    { question: '机场写了“专线”就一定稳定吗？', answer: '不一定。“专线”是描述路径的背景术语，不是稳定性承诺，还受节点负载、维护和本地网络影响。把术语当线索，用跨日期的连续样本核对延迟、丢包和断连。' },
  ], sections: [{ heading: '术语描述的是路径或入口', paragraphs: ['IEPL、IPLC、BGP、中转和直连通常描述网络路径、路由或入口方式。不同商家的定义和实现可能不同，不能只凭标题比较。'] }, { heading: '实际要问什么', paragraphs: ['询问适用套餐、节点范围、故障切换、维护通知和测试样本。要求服务商说明术语在其产品中的具体含义。'] }, { heading: '测评怎么写', paragraphs: ['把术语作为背景字段，把延迟、丢包、吞吐和断连作为观测字段，两者分开呈现。'] }] },
];

export const riskArticles: EditorialArticle[] = [
  { slug: 'naiyun-shutdown', title: '奈云已跑路：确认停服与善后提醒', description: '奈云已于 2026 年 6 月确认跑路，节点失效、客服装死、群组解散、官网失效。请勿充值或续费，并按付款周期控制损失。', keywords: ['奈云 跑路', '奈云 停服', '奈云机场', '奈云 骗局'], category: '风险预警', updatedAt: editorialDate, answer: '根据公开监测，奈云已于 2026 年 6 月确认跑路：节点全部失效、客服无人响应、官方群组解散、官网 v2naiun.com 失效。请勿再充值或续费，尽快更换备用机场。', faqs: [
    { question: '奈云还能用吗、会恢复吗？', answer: '根据公开监测，奈云已确认跑路，节点与客服均已失效，不应期待恢复。请勿再充值或续费。' },
    { question: '在奈云充的钱能退吗？', answer: '跑路服务通常无法正常退款。可保存订单与付款凭证，按支付平台争议流程尝试，但结果不确定；不要把账号或订阅链接交给陌生“维权”人员。' },
  ], sections: [
    { heading: '跑路确认信号', paragraphs: ['奈云同时出现入口失效、节点无法连接、客服工单无人回复、官方群组解散等多重信号，官网 v2naiun.com 已无法访问。多重信号叠加通常意味着服务已实质停运，而非临时维护。'] },
    { heading: '已付费用户怎么办', paragraphs: ['先保存订单、付款记录、工单和群组公告截图，再按支付平台规则尝试争议处理；不要向所谓维权或代追回人员提供账号密码、验证码或完整订阅链接。'] },
    { heading: '如何降低下次损失', paragraphs: ['更换机场时用短周期先验证，关闭自动续费，核对付款主体与官方入口是否一致。付款周期越短，单次预付风险越低。'] },
  ] },
  { slug: 'yinyun-risk', title: '隐云高危预警：与奈云同平台，跑路风险极高', description: '隐云与已跑路的奈云共享同一套代理平台和支付通道，官网已异常，跑路风险极高。建议停止续费、更换备用机场、不要预付长周期套餐。', keywords: ['隐云 跑路', '隐云 高危', '隐云机场', '隐云 风险'], category: '风险预警', updatedAt: editorialDate, answer: '根据公开监测，隐云处于极高跑路风险：与已跑路的奈云共享同一套代理平台和支付通道，官网 airportgo.org 已异常。建议尽快更换备用机场、停止续费，不要预付长周期套餐。', faqs: [
    { question: '隐云现在还能充值吗？', answer: '不建议。隐云处于高危跑路预警，与已跑路的奈云同平台同支付通道，随时可能停服。建议停止续费并更换备用机场。' },
    { question: '隐云和奈云是什么关系？', answer: '据公开监测，两者共享同一套代理平台和支付通道。奈云已确认跑路，因此隐云被判定为高度联动的高危对象。' },
  ], sections: [
    { heading: '为什么判定为高危', paragraphs: ['隐云与已确认跑路的奈云共享同一套代理平台和支付通道，官网 airportgo.org 出现异常。共用平台与支付通道意味着风险高度联动，一方跑路时另一方风险显著上升。'] },
    { heading: '现在该怎么做', paragraphs: ['准备并切换到备用机场，关闭隐云的自动续费，不再预付长周期套餐。保存现有订单与付款记录，以备争议处理。'] },
    { heading: '如何识别联动风险', paragraphs: ['留意多个机场是否共用同一入口域名、支付主体或后台平台。共用基础设施的机场往往风险联动，分散预付、缩短周期能降低集中损失。'] },
  ] },
  { slug: 'airport-shutdown', title: '机场为什么会停服？用付款周期控制预付风险', description: '从硬关停、慢性停摆、转手改名和代理断供四种形态分析停服信号，并给出购买记录和损失控制方法。', keywords: ['机场跑路', '机场停服', '机场风险', '机场退款', '机场付款周期'], category: '风险预警', updatedAt: editorialDate, sections: [{ heading: '四种常见停服形态', paragraphs: ['硬关停通常表现为入口、客服和节点同时消失；慢性停摆可能先出现更新延迟、节点大量失效和公告减少；转手改名会改变域名、条款或付款主体；代理断供则可能只影响部分地区或线路。单一信号不能证明未来一定停服，但值得降低预付金额。'] }, { heading: '购买前记录风险', paragraphs: ['保存官方入口、付款主体、套餐周期、退款期限、客服渠道和政策页面。入口与付款主体不一致、条款无法找到或客服拒绝回答基础问题时，不要投入超过可承受范围的金额。'] }, { heading: '用付款周期减少损失', paragraphs: ['年付折算价不等于风险更低。先用短周期验证连接、退款和客服，再决定是否增加承诺。关闭自动续费，设置到期提醒，保留订单和工单凭证。'] }, { heading: '遇到停服如何处理', paragraphs: ['先保存错误、订单和沟通记录，再按服务商条款、支付平台和当地适用流程处理。不要向所谓维权代理提供密码、验证码或完整订阅链接。'] }] },
];

const supplementalSections = (article: EditorialArticle): ContentSection[] => {
  if (article.category === '网络故障') {
    return [
      { heading: '先定位故障发生在哪一层', paragraphs: [`排查“${article.title}”时，先记录是网页无法加载、请求提交失败、流式响应中断，还是只有某个应用异常。不同现象对应的域名、连接方式和超时位置可能不同，不能只用“节点不好”概括。`, '建议把时间、设备、客户端、模式、节点名称、实际出口地区和错误原文放在同一条记录中。记录完整后再开始修改设置，避免排查过程中失去对照条件。'] },
      { heading: '用最小配置做一次复测', paragraphs: ['先关闭脚本、复杂规则、多个代理和自动切换，只保留一个节点与最基础的系统代理或应用代理。若最小配置恢复，再逐项开启功能；若仍失败，就能把范围缩小到网络、出口或服务端。', '每次只改变一个变量，并在同一时间段重复两到三次。一次成功只能说明当时请求完成，不能单独支持“长期稳定”或“所有地区可用”的判断。'] },
      { heading: '记录本地基线与失败样本', paragraphs: ['本地 Wi-Fi、移动网络、DNS、IPv6 和设备负载都会影响结果。先记录不使用代理时的延迟、丢包或普通网页情况，再比较启用客户端后的变化，避免把本地故障归因于服务商。', '失败样本和成功样本同样重要。保存超时、连接重置、解析失败、TLS 错误、HTTP 状态码和断开时间，后续才能判断是单节点问题、时段拥塞还是配置冲突。'] },
      { heading: '日志分享前先做隐私清理', paragraphs: ['客户端日志可能包含订阅地址、服务器域名、UUID、账号标识、局域网地址或完整 IP。公开截图前只保留错误类型、时间和必要的版本字段，遮盖凭证和可识别信息。', '如果需要向服务商反馈，提供脱敏后的最小复现步骤：设备、系统、客户端版本、节点分组、发生时间和错误原文。不要把完整订阅链接复制给陌生的代排障人员。'] },
      { heading: '何时可以形成结论', paragraphs: ['只有在多个日期、不同时间段和固定条件下得到重复结果，才适合写“在这些条件下观察到”。如果样本少、服务商正在维护或账号权限不明确，应把结论限定为一次性现象并标记限制。', '排查文章解决的是定位路径，不会替读者保证某个节点、平台或套餐始终可用。平台政策、线路配置和客户端版本改变后，应重新核验并记录修订原因。'] },
    ];
  }
  if (article.category === '客户端教程') {
    return [
      { heading: '安装前核对来源与权限', paragraphs: [`开始配置“${article.title}”前，先确认项目或应用的官方发布渠道、系统版本要求和许可方式。不要从搜索结果中的改包、网盘或不明脚本安装同名程序，也不要把账号交给代配置服务。`, '记录安装包版本、系统版本和配置文件来源。桌面端、移动端和路由器的权限边界不同，同一份配置在不同平台出现差异时，先比较权限、DNS 和系统代理状态。'] },
      { heading: '先建立最小可用配置', paragraphs: ['导入订阅后先只启用一个节点、一个基础模式和一个公开网页测试。确认订阅更新时间、节点数量、实际出口和日志状态，再逐步增加规则集、策略组、脚本、重写或 TUN。', '最小配置的价值是保留清晰的回滚点。遇到全局断网、DNS 错误或应用无法连接时，先恢复到最小配置，再逐项打开高级功能，而不是一次替换整套模板。'] },
      { heading: '日志和规则命中比截图更有用', paragraphs: ['教程应说明如何查看连接日志、DNS 结果、规则命中和实际使用的出站，而不是只展示“已连接”状态。浏览器能打开不代表终端、游戏或移动应用走了同一条代理路径。', '记录一次成功和一次失败的差异：节点、模式、规则、系统代理、TUN、时间段和错误原文。这样读者可以复现步骤，也能判断问题来自客户端、订阅格式还是目标服务。'] },
      { heading: '更新时保留可回滚版本', paragraphs: ['升级核心、界面或移动应用前导出当前配置，记下旧版本和可用节点。更新后先做最小测试，不要在同一时间更换客户端、规则库和订阅转换方式。', '订阅链接是账户凭证，导入、备份和分享时都应隐藏令牌。公开排障只提供脱敏的错误字段，发现链接泄露后尽快按服务商流程重置或撤销。'] },
      { heading: '如何判断教程是否适用', paragraphs: ['客户端功能会随系统和版本变化。文章应写清适用平台、版本日期、订阅格式和测试范围，并把平台官方文档作为优先来源。不能把某个用户的配置截图写成所有设备都适用。', '如果文档与实际界面不一致，先记录版本和页面路径，再提交纠错或更新说明。教程的目标是让读者能安全复现和回退，而不是堆叠复杂配置。'] },
    ];
  }
  if (article.category === 'AI 使用指南') {
    return [
      { heading: '先写清测试对象与账户条件', paragraphs: [`围绕“${article.title}”进行排查时，先写明使用的是网页、App、API、IDE 扩展还是终端工具，以及账户类型、组织策略和目标功能。不同入口可能使用不同域名和鉴权流程，不能用首页能打开代替完整可用。`, '同时记录出口地区、测试时间、设备、浏览器或客户端版本和错误原文。地区支持、账号资格、IP 风控和网络路径可能同时影响结果，先分层记录比频繁换节点更有效。'] },
      { heading: '浏览器、App 与终端分别验证', paragraphs: ['浏览器成功不代表 App 或 CLI 成功。浏览器可能使用系统代理，终端工具可能需要单独设置 HTTPS 代理变量、TUN 或证书；移动应用还会受到后台权限、蜂窝网络切换和系统证书影响。', '建议依次测试登录、短请求、长响应、文件或引用加载，并记录每一步是否通过。只要其中一层失败，就把失败位置写清楚，不要把“页面打开”扩展成“平台稳定可用”。'] },
      { heading: '节点标签不等于出口事实', paragraphs: ['节点名称中的国家、城市、线路或“原生”字样不能替代实际出口检测。固定一个节点后，记录出口地区、IP 是否变化、DNS 解析路径和连接是否被重置，再比较另一个条件。', '不要在短时间内连续切换多个地区登录同一账户。频繁变化会把会话风控、账户状态和网络问题混在一起，也会让后续测试无法复现。'] },
      { heading: '失败样本也要进入记录', paragraphs: ['真实测评不只统计成功截图，还要记录地区提示、验证码、403、429、超时、TLS 错误、流式中断和 API 配额等失败类型。每种失败对应的责任层级不同，不能都归因于节点速度。', '若平台正在维护、账号额度不足或官方政策改变，应在记录中单独标注。测试报告需写明样本数、时间段和未覆盖的功能，避免读者把有限结果理解成长期保证。'] },
      { heading: '发布结论要限定范围', paragraphs: ['只有多日重复、条件清楚且证据可复查时，才可以写“在某设备、网络、出口和时间段下观察到”。没有购买或授权测试账号时，只发布公开资料、排查方法和平台官方链接，不编造解锁、速度或稳定性分数。', '文章更新时保留原结论和修改原因。AI 平台支持地区、账户策略和客户端版本变化很快，发布日期本身不能替代重新核验。'] },
    ];
  }
  if (article.category === '问题中心') {
    return [
      { heading: '先确认问题类型', paragraphs: [`“${article.title}”可能同时涉及账户、付款、地区政策、客户端和网络层。先把入口、设备、时间、错误提示和是否能复现写下来，再决定是否需要更换节点或重装客户端。`, '如果只有一个功能异常，不要直接重置全部设置；先比较同一账户的另一个入口、同一设备的普通网页和一个最小请求，避免丢失可以帮助定位的对照结果。'] },
      { heading: '按条件逐项核验', paragraphs: ['核对官方支持地区、账户资格、订阅条款、客户端版本和网络路径。每次只改一个条件，并保留改动前后的错误文本、时间和日志，才能知道哪一步真正产生影响。', '对于涉及付款、设备数量或服务商条款的问题，保存页面日期和订单凭证。宣传页、群聊回答和第三方截图都不能自动替代当前官方规则。'] },
      { heading: '保护账号、密钥和订阅凭证', paragraphs: ['排查时不要公开邮箱、密码、验证码、API 密钥、完整订阅地址、付款卡信息或带有身份标识的日志。截图只保留必要的错误字段，分享前检查浏览器地址栏和文件名。', '若怀疑凭证泄露，先撤销或轮换，再继续定位网络问题。任何要求远程接管账号、代登录或发送完整订阅链接的排障方式都应谨慎处理。'] },
      { heading: '把答案写成有边界的步骤', paragraphs: ['问题页开头给出直接答案，后面说明适用条件、例外和验证方法。避免“换一个节点就一定能用”“永久稳定”这类无法由单次观察支持的表述。', '若故障依赖平台政策、地区或账户权限，应明确告诉读者去看当前官方说明；若依赖服务商条款，应把客服答复和编辑测试分开标注。'] },
      { heading: '什么时候应该停止尝试', paragraphs: ['连续修改多个设置仍无法复现时，先回滚并保存日志，不要继续叠加脚本或未知配置。若涉及扣款、账户限制或凭证泄露，优先走官方支持与支付平台流程。', '文章只能帮助读者建立排查顺序，不能替代平台客服、服务商工单或专业安全建议。记录完整后再提交问题，通常比反复刷新更容易获得有效回应。'] },
    ];
  }
  if (article.category === '风险预警') {
    return [
      { heading: '付款前建立可回溯记录', paragraphs: ['在购买前保存官方入口、付款主体、套餐名称、流量与设备规则、退款期限、客服渠道和页面日期。价格折算、永久包、免费试用和限时优惠都需要核对原始条款。', '入口域名与付款主体不一致、条款无法找到、客服拒绝说明基础规则时，应降低预付金额，不要因为单价低就跳过身份和退款检查。'] },
      { heading: '使用期关注变化而非单一信号', paragraphs: ['更新延迟、节点大量失效、公告减少、入口频繁更换或付款页面变化都值得记录，但单一信号不能直接证明服务商将停服。把现象、日期和来源分开保存。', '关闭不需要的自动续费，设置到期提醒，定期检查订阅链接是否仍由正确的账户生成。不要把完整订阅地址发给所谓优惠、代排障或维权人员。'] },
      { heading: '异常时先保留证据', paragraphs: ['发生断连、入口失效或扣款争议时，先保存错误页面、订单、工单、付款记录和服务商公告。截图应遮盖密码、验证码、订阅令牌和完整个人信息。', '再按服务商退款条款、支付平台规则和适用法律处理。不要为了“追回损失”向陌生人提供远程控制、账户密码或额外付款。'] },
      { heading: '如何把风险写进评测', paragraphs: ['风险字段应描述可观察事实，例如付款周期、退款条款是否可见、入口是否有官方说明、客服是否回应，以及信息核验日期。不要把“跑路”“骗子”等定性词当作没有证据的标题。', '如果服务商提供补充资料，页面应标注资料来自供应商，并说明尚未独立验证的部分。风险提示与服务质量评分分开，避免用单一标签代替完整证据。'] },
      { heading: '结论需要持续更新', paragraphs: ['域名、付款主体、套餐规则和服务状态会变化。更新文章时保留旧记录、核验日期和修订原因；无法确认的内容应标记为待核实或移除。', '风险预警的目的在于帮助读者控制损失和保护凭证，不是替读者作出购买决定。读者应结合预算、用途、条款和当地规则独立判断。'] },
    ];
  }
  return [
    { heading: '先定义术语和使用场景', paragraphs: [`阅读“${article.title}”时，先把术语放回实际使用场景：设备、系统、客户端、订阅格式和目标应用分别是什么。一个宣传词可能在不同服务商页面中含义不同，不能只按名称比较。`, '把需要的功能列出来，例如多设备、规则分流、低延迟、流量计费或退款保障，再检查哪些字段有一手来源，哪些只是服务商自述。'] },
    { heading: '比较时把数字和结论分开', paragraphs: ['价格、流量、倍率、延迟和节点数量是不同维度。先确认单位、统计方向、适用套餐和核验日期，再判断是否真的能满足自己的使用方式。', '没有连续样本时，不要用最低延迟、最高速度或节点数量推断稳定性。把可见资料、编辑判断和待核实项目分栏记录，结论会更容易复查。'] },
    { heading: '订阅与配置需要保护', paragraphs: ['订阅地址通常包含账户凭证，导入、备份和排障时都应隐藏令牌。客户端日志、截图和配置文件发布前删除 UUID、密码、完整 IP、订单号和邮箱。', '如果订阅泄露或设备异常增加，先按服务商流程撤销、重置或更换，再继续排查。不要把安全问题交给来路不明的转换站或代配置服务。'] },
    { heading: '记录更新和适用边界', paragraphs: ['术语、价格、客户端版本和平台政策会变化。文章应保留发布日期、最近实质修订日期和来源入口；来源失效时更新、标记或移除，不只刷新日期。', '本文提供的是选购与排查框架，不能替代具体服务商条款、平台官方政策或在你所在网络环境中的实际测试。'] },
  ];
};

const enrichEditorialArticle = (article: EditorialArticle): EditorialArticle => ({
  ...article,
  sections: [...article.sections, ...supplementalSections(article)],
});

for (const platform of aiPlatforms) platform.article = enrichEditorialArticle(platform.article);
for (const client of clientGuides) {
  client.sections = enrichEditorialArticle({ slug: client.slug, title: client.name, description: client.summary, keywords: client.keywords, category: '客户端教程', updatedAt: editorialDate, sections: client.sections }).sections;
}
for (const collection of [networkArticles, questionArticles, tiziArticles, riskArticles]) {
  collection.splice(0, collection.length, ...collection.map(enrichEditorialArticle));
}

export const allEditorialArticles: EditorialArticle[] = [
  ...aiPlatforms.map((platform) => ({ ...platform.article, slug: `${platform.slug}/${platform.article.slug}` })),
  ...networkArticles,
  ...questionArticles,
  ...tiziArticles,
  ...riskArticles,
];
