// 机场分类排行数据。
//
// 名次与点评由站点运营者综合线路类型、套餐性价比、节点覆盖与公开资料整理，
// 并参考 clash-jichang.com/airport/ 的机场资料。排行供选购参考，具体体验以
// 服务商页面与你自己的测试为准。极连云、光年梯为综合推荐前两名。

export type RankItem = { slug: string; reason: string };
export type RankCategory = {
  key: string;
  eyebrow: string;
  title: string;
  href?: string;        // 对应分类落地页
  intro: string;
  items: RankItem[];
};

export const rankingsUpdatedAt = '2026-11-05';

// 综合机场推荐排行
export const overallRanking: RankItem[] = [
  { slug: 'jilianyun', reason: 'IEPL/IPLC 专线，无倍率、不限速、不限设备，解锁全面，8 折码 JLY888，综合性价比突出。' },
  { slug: 'guangnianti', reason: '全 IPLC 专线，高峰满速、自有机房，入门年付折合 7.5 元/月，稳定性与价格兼顾。' },
  { slug: 'feimaoyun', reason: '全 IPLC 专线，最高 2.5Gbps，节点覆盖广、x1 倍率不限设备，长期优惠力度大。' },
  { slug: 'kexinyun', reason: '全 IEPL 专线，60+ 节点、不限速不限设备，晚高峰稳定。' },
  { slug: 'guangsuyun', reason: 'IEPL 专线，主打跨境与流媒体，节点覆盖港台日美新及欧美。' },
  { slug: 'nice', reason: 'IEPL 南北双通道专线 + 家宽，设有纯净 AI 节点，适合长期主力。' },
  { slug: 'huanyuyun', reason: '全 IEPL 专线 + 直连，最大 2.5Gbps，原生 IP、不限客户端数。' },
  { slug: 'xingdaomeng', reason: 'IPLC 专线，晚高峰不降速，支持 TikTok 跨区，含永久流量包。' },
  { slug: 'qingyunti', reason: '全 IPLC 专线、2.5Gbps，不限设备数，长期订阅折扣大。' },
  { slug: 'flowercloud', reason: '成立于 2020 年的老牌机场，BGP 入口专线、多线优选回程。' },
];

export const rankingCategories: RankCategory[] = [
  {
    key: 'value',
    eyebrow: 'VALUE',
    title: '性价比机场排行',
    href: '/jichang/xingjiabi/',
    intro: '按线路档次、单位流量成本、不限速不限设备与解锁能力综合衡量性价比。',
    items: [
      { slug: 'jilianyun', reason: '专线 + 无倍率不限设备，8 折后单位成本低。' },
      { slug: 'guangnianti', reason: '年付入门折合 7.5 元/月的 IPLC 专线。' },
      { slug: 'kexinyun', reason: '年费小礼包 8 元/月、IEPL 专线不限设备。' },
      { slug: 'guangsuyun', reason: '轻量版年付折合 8.25 元/月，专线跨境。' },
      { slug: 'edgenodes', reason: '限时年付折合 9 元/月，中转不限速、自研客户端。' },
    ],
  },
  {
    key: 'budget',
    eyebrow: 'BUDGET',
    title: '便宜机场排行',
    href: '/jichang/pianyi/',
    intro: '按绝对月均价格排序，适合预算敏感、用量不大的用户；低价需结合倍率与稳定性判断。',
    items: [
      { slug: 'shanhai', reason: '三网直连 128G 低至 3 元，多档位覆盖。' },
      { slug: 'jinyun', reason: '月付 50G 体验版 6 元，不限速。' },
      { slug: 'jiuyun', reason: '招财版 6 元 150G/月，海外中转。' },
      { slug: 'jiuba', reason: '年付折合 7.5 元/月，99 台设备上限。' },
      { slug: 'lizione', reason: '青铜 100G/月 10 元，中转与专线混合。' },
    ],
  },
  {
    key: 'established',
    eyebrow: 'ESTABLISHED',
    title: '老牌机场排行',
    href: '/jichang/laopai/',
    intro: '按公开可查的运营背景与口碑排序；运营时长是背景参考，仍需结合近期状态判断。',
    items: [
      { slug: 'flowercloud', reason: '成立于 2020 年，业内公认老牌之一。' },
      { slug: 'dageyun', reason: '运营商自述 5 年口碑，IPLC 线路、免费试用。' },
      { slug: 'guangnianti', reason: '资深团队运营，多年 IPLC 专线。' },
      { slug: 'nice', reason: '运营超 2 年、专线出口，站长长期自用。' },
      { slug: 'feiniao', reason: '有口碑的老牌机房，中转 + IEPL 专线。' },
    ],
  },
  {
    key: 'dedicated',
    eyebrow: 'DEDICATED LINE',
    title: '专线机场排行',
    href: '/jichang/zhuanxian/',
    intro: '按 IEPL/IPLC/BGP 专线的档次与稳定性排序，适合对延迟、丢包敏感的用户。',
    items: [
      { slug: 'jilianyun', reason: 'IEPL/IPLC 专线，Trojan/SS 双协议。' },
      { slug: 'guangnianti', reason: '全 IPLC 物理专线，高峰满速。' },
      { slug: 'qingyunti', reason: '全 IPLC 专线、顶级国际出口 2.5Gbps。' },
      { slug: 'longmaoyun', reason: 'IPLC 深港/沪美/沪日级跨境专线。' },
      { slug: 'edgex', reason: 'IEPL 内网专线，高峰 1 倍率/闲时 0.5 倍率。' },
    ],
  },
  {
    key: 'stable',
    eyebrow: 'STABILITY',
    title: '稳定机场排行',
    href: '/jichang/laopai/',
    intro: '按线路稳定性与晚高峰表现的公开资料排序；稳定性建议再用跨时段测试复核。',
    items: [
      { slug: 'jilianyun', reason: '专线 + 海外团队巡检、节点异常自动切换。' },
      { slug: 'guangnianti', reason: '自有机房 + 全 IPLC，高峰满速不降速。' },
      { slug: 'nice', reason: 'IEPL 南北双通道，三网高峰较友好。' },
      { slug: 'xingdaomeng', reason: 'IPLC 专线，主打晚高峰不降速。' },
      { slug: 'huanyuyun', reason: 'IEPL + 直连双线路，2.5Gbps 带宽。' },
    ],
  },
];
