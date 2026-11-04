// 机场客观资料字段（折中策略：资料表 + 不排名）。
//
// 边界：这里只存“可核验、带来源、带核验日期”的客观字段，绝不编造线路、地区、
// 价格或任何主观评分/名次。无法核验的字段留空，页面会显示“资料待补充”。
// 填写某条记录时，务必同时写明 sourceNote（来源）与 verifiedAt（核验日期，YYYY-MM-DD）。
// 分类归属（老牌/专线等）本身是需要来源支撑的断言，不在此文件预设。

export type ProviderProfile = {
  // 线路类型，如 ['直连', '中转', 'IEPL', 'IPLC', 'BGP']。只在服务商页或参考资料明确标注时填写。
  lineTypes?: string[];
  // 覆盖地区概述，如 '港/日/新/美 等'。仅填服务商公开说明的内容。
  regions?: string;
  // 套餐结构概述（周期/流量口径），不含具体价格数字除非已逐项核实。
  planShape?: string;
  // 对“老牌机场”有意义：公开可查的上线/运营时长说明。
  since?: string;
  // 退款/试用条款概述。
  refund?: string;
  // 资料来源（服务商页面 / 参考站 / 其他）。
  sourceNote: string;
  // 核验日期 YYYY-MM-DD；未核验填 null。
  verifiedAt: string | null;
};

// 目前所有字段均待从服务商页面逐项核实后填入，不预先填充未经核验的线路/地区/价格。
// 填写示例（核实后再取消注释并补 verifiedAt）：
// export const providerProfiles: Record<string, ProviderProfile> = {
//   someslug: { lineTypes: ['中转'], regions: '港/日/新', sourceNote: '服务商注册页', verifiedAt: '2026-11-05' },
// };
export const providerProfiles: Record<string, ProviderProfile> = {};
