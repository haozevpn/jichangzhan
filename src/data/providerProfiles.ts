// 机场客观资料字段（折中策略：资料表 + 不排名）。
//
// 数据来源：站点运营者参考 clash-jichang.com/airport/ 整理的线路类型与覆盖地区等客观字段。
// 这里只存可核对的客观资料，不含主观评分或名次；价格、条款与实际体验以服务商页面为准。
// 分类归属（老牌/专线等）仍以各落地页正文的口径与候选说明为准。

export type ProviderProfile = {
  lineTypes?: string[];   // 线路类型，如 ['IEPL/IPLC 专线']
  regions?: string;       // 覆盖地区概述
  planShape?: string;     // 套餐结构概述（可选）
  since?: string;         // 运营时长/成立背景（对“老牌机场”有意义）
  refund?: string;        // 退款/试用条款概述（可选）
  sourceNote: string;     // 资料来源
  verifiedAt: string | null; // 核验/整理日期 YYYY-MM-DD
};

const SRC = '参考 clash-jichang.com/airport/ 整理';
const AT = '2026-11-05';

export const providerProfiles: Record<string, ProviderProfile> = {
  jilianyun: { lineTypes: ['IEPL/IPLC 专线'], planShape: 'Trojan/SS，无倍率不限速不限设备', sourceNote: SRC, verifiedAt: AT },
  guangnianti: { lineTypes: ['IPLC 专线'], regions: '全球节点', since: '运营商自述多年稳定运营', sourceNote: SRC, verifiedAt: AT },
  feimaoyun: { lineTypes: ['IPLC 专线'], regions: '港/台/日/新/美/韩/马来/越/菲/泰/印/英/法/德/阿根廷 等', sourceNote: SRC, verifiedAt: AT },
  yuntu: { lineTypes: ['金融级专线'], planShape: '全节点 1 倍率', sourceNote: SRC, verifiedAt: AT },
  kunpeng: { lineTypes: ['多国原生节点'], regions: '全球多国 + 冷门地区', sourceNote: SRC, verifiedAt: AT },
  jisu: { lineTypes: ['三网优化线路'], sourceNote: SRC, verifiedAt: AT },
  jiuyun: { lineTypes: ['海外中转 (VLESS)'], regions: '港/日/台/新/美 等', sourceNote: SRC, verifiedAt: AT },
  kexinyun: { lineTypes: ['IEPL 专线'], regions: '港/台/日/美/新 等', sourceNote: SRC, verifiedAt: AT },
  sujie: { lineTypes: ['高速节点'], regions: '港/台/日/美/马来 等', sourceNote: SRC, verifiedAt: AT },
  kuaili: { lineTypes: ['高速专线'], regions: '港/台/日/美/新 等', sourceNote: SRC, verifiedAt: AT },
  edgenodes: { lineTypes: ['中转加速'], regions: '港/台/日/美/马来 等', sourceNote: SRC, verifiedAt: AT },
  guangsuyun: { lineTypes: ['IEPL 专线'], regions: '港/台/日/美/新/欧美 等', sourceNote: SRC, verifiedAt: AT },
  yingzi: { lineTypes: ['IEPL 跨境专线'], sourceNote: SRC, verifiedAt: AT },
  bianjie: { lineTypes: ['IEPL 优化线路'], regions: '全球 50+ 节点', refund: '3 天无理由全额退款（运营商自述）', sourceNote: SRC, verifiedAt: AT },
  nice: { lineTypes: ['IEPL 南北双通道专线/家宽'], regions: '港/台/日/新/美/英/德（含家宽） 等', since: '运营商自述运营超过 2 年', sourceNote: SRC, verifiedAt: AT },
  lingmao: { lineTypes: ['IPLC 专线'], sourceNote: SRC, verifiedAt: AT },
  xingdaomeng: { lineTypes: ['IEPL/IPLC 专线'], sourceNote: SRC, verifiedAt: AT },
  quanqiuyun: { lineTypes: ['BGP 多线'], sourceNote: SRC, verifiedAt: AT },
  shunyun: { lineTypes: ['直连 + 专线 (ANYCAST)'], regions: '主流国家', sourceNote: SRC, verifiedAt: AT },
  huanyuyun: { lineTypes: ['IEPL 专线 + 直连'], sourceNote: SRC, verifiedAt: AT },
  lumina: { lineTypes: ['直连 (Hysteria2) + 中转 (AnyTLS)'], regions: '港/台/日/美/德 等', sourceNote: SRC, verifiedAt: AT },
  runwaycloud: { lineTypes: ['BGP + IEPL 专线'], sourceNote: SRC, verifiedAt: AT },
  jiuba: { lineTypes: ['SS 加密线路'], planShape: '最多 99 台设备，仅限内地使用', sourceNote: SRC, verifiedAt: AT },
  jinyun: { lineTypes: ['优化线路'], sourceNote: SRC, verifiedAt: AT },
  jisucloud: { lineTypes: ['中转 + 高速流媒体节点'], sourceNote: SRC, verifiedAt: AT },
  shanshui: { lineTypes: ['中转 + 直连'], regions: '全球多国（含冷门）', sourceNote: SRC, verifiedAt: AT },
  miaomiao: { lineTypes: ['中转高速节点'], regions: '全球多国（含冷门）', sourceNote: SRC, verifiedAt: AT },
  xundavpn: { lineTypes: ['BGP 跨境企业级专线'], sourceNote: SRC, verifiedAt: AT },
  edgex: { lineTypes: ['IEPL 内网专线'], planShape: '高峰 1 倍率 / 闲时 0.5 倍率', sourceNote: SRC, verifiedAt: AT },
  keda: { lineTypes: ['SD-WAN'], regions: '全球多节点', sourceNote: SRC, verifiedAt: AT },
  shanhai: { lineTypes: ['中转 + 专线 + 直连'], planShape: '多档位，入门低至 3 元', sourceNote: SRC, verifiedAt: AT },
  lizione: { lineTypes: ['中转 / 专线'], sourceNote: SRC, verifiedAt: AT },
  doraemon: { lineTypes: ['中转 + 加速'], regions: '全球多个核心地区', sourceNote: SRC, verifiedAt: AT },
  dageyun: { lineTypes: ['IPLC 专线'], since: '运营商自述 5 年老牌', refund: '提供免费试用（运营商自述）', sourceNote: SRC, verifiedAt: AT },
  longmaoyun: { lineTypes: ['IPLC 跨境专线'], regions: '深港 / 沪美 / 沪日 等跨境', sourceNote: SRC, verifiedAt: AT },
  feiniao: { lineTypes: ['中转 + IEPL 专线'], since: '运营商自述老牌机房', sourceNote: SRC, verifiedAt: AT },
  qingyunti: { lineTypes: ['IPLC 专线'], regions: '顶级国际出口', sourceNote: SRC, verifiedAt: AT },
  flowercloud: { lineTypes: ['BGP 入口专线'], regions: '港/台/日/新/美/欧 等', since: '成立于 2020 年', sourceNote: SRC, verifiedAt: AT },
};

// 跑路 / 高危预警：根据公开监测与用户反馈整理，提示停服与预付风险。
// level: '跑路' 表示已确认停服/跑路；'高危' 表示风险极高但尚未完全确认。
export type ProviderWarning = {
  level: '跑路' | '高危';
  summary: string;
  detail: string;
  verifiedAt: string | null;
};

export const providerWarnings: Record<string, ProviderWarning> = {
  naiyun: {
    level: '跑路',
    summary: '已确认跑路，请勿充值或续费',
    detail: '根据公开监测，奈云已于 2026 年 6 月倒闭跑路：所有节点无法连接，客服工单无人响应，官方群组已解散，官网 v2naiun.com 已失效。请不要在任何渠道充值或续费，并及时更换备用机场。',
    verifiedAt: AT,
  },
  yinyun: {
    level: '高危',
    summary: '高危跑路风险，建议停止续费',
    detail: '根据公开监测，隐云处于极高跑路风险：与已跑路的“奈云”共享同一套代理平台和支付通道，官网 airportgo.org 已出现异常，随时可能彻底停服。建议尽快更换备用机场并停止续费，不要预付长周期套餐。',
    verifiedAt: AT,
  },
};

