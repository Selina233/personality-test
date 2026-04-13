const animalDatabase = [
  // --- HIGH O (高开放性) 系列：认知边界极广，追求新奇与复杂性 ---
  {
    name: "宇宙终极小猫咪",
    tagline: "你不是在成为谁，你就是最优解本身",
    emoji: "🐱",
    traits: {O:'high',E:'high',C:'high',A:'high',N:'low'},
    description: "高维人格的收敛状态。你在认知上极度开放，执行上高度自律，社交中富有魅力，且具备极强的情绪稳态。你无需对抗环境，因为你本身就是复杂系统迭代后的最优生存策略。",
    strength: "人格维度的完美整合与高心理韧性",
    weakness: "因极度自洽而产生的疏离感"
  },
  {
    name: "全感知独角兽",
    tagline: "世界对你而言没有边界",
    emoji: "🦄",
    traits: {O:'high',E:'high',C:'high',A:'high',N:'high'},
    description: "全带宽开启的感知者。你追求卓越的成就与深度的连接，但高神经质让你在闪耀的同时承受着巨大的情绪共振。你是一台高速运转、精密却又过热的仪器。",
    strength: "极高的生命能量与审美感悟力",
    weakness: "认知与情绪的双重过载"
  },
  {
    name: "拟态社交蓝环章鱼",
    tagline: "你不是在社交，你在实时变形",
    emoji: "🐙",
    traits: {O:'high',E:'high',C:'high',A:'low',N:'low'},
    description: "高能工具型人格。你将社交视为一种精密计算的博弈。你具备极高的情境洞察力与执行力，能够高效剥离情绪干扰以达成目标。你的‘亲和’只是你策略库中的一个组件。",
    strength: "极高的社会智能与目标导向执行",
    weakness: "主体人格在策略性伪装中逐渐消解"
  },
  {
    name: "野心家秃鹫",
    tagline: "在混乱中俯瞰，在机会中降落",
    emoji: "🦅",
    traits: {O:'high',E:'high',C:'high',A:'low',N:'high'},
    description: "竞争驱动的扩张者。你拥有宏大的认知图景与极强的掌控欲。你不满足于现状，在焦虑的驱动下不断攫取资源。你相信丛林法则，即便这让你长期处于紧绷的战斗状态。",
    strength: "战略前瞻性与高压下的推进力",
    weakness: "过度的功利化倾向与敌意归因"
  },
  {
    name: "意义过载白鲸",
    tagline: "你连沉默都在表达什么",
    emoji: "🐋",
    traits: {O:'high',E:'high',C:'low',A:'high',N:'high'},
    description: "典型的理想主义者。你热衷于发掘事物背后的形而上意义。你渴望情感深度与社群归属，但低尽责性与高神经质让你常在灵感爆发与情绪崩溃之间反复横跳。",
    strength: "极强的象征思维与情感感染力",
    weakness: "逻辑秩序缺失导致的自我戏剧化"
  },
  {
    name: "瞬时绽放凤尾蝶",
    tagline: "你的人生由无数个开场组成",
    emoji: "🦋",
    traits: {O:'high',E:'high',C:'low',A:'high',N:'low'},
    description: "典型的多潜力探索者。你拥有极高的探索欲和亲和力，但缺乏对枯燥过程的耐受。你的人生是一场连续的‘启动仪式’，在每一次新奇感的消退中寻找下一个出口。",
    strength: "极强的环境破冰能力与创意启动",
    weakness: "难以进入深度的专业化沉淀"
  },
  {
    name: "随机跃迁飞鱼",
    tagline: "你不走路径，你跳出路径",
    emoji: "🐟",
    traits: {O:'high',E:'high',C:'low',A:'low',N:'low'},
    description: "跨界经验的收集者。你通过不断切换赛道来维持认知的新鲜感。你不受传统规则与人际纽带的束缚，在不同系统间自由穿梭，追求的是经验的广度而非权力的深度。",
    strength: "极强的认知灵活性与脱域能力",
    weakness: "缺乏长期主义的支撑点"
  },
  {
    name: "风暴核心海燕",
    tagline: "在动荡中你才感到真实",
    emoji: "🐦",
    traits: {O:'high',E:'high',C:'low',A:'low',N:'high'},
    description: "追求极致体验的风险偏好者。你通过剧烈的生活波动来对冲内心的虚无感。高开放性让你不断寻找刺激，高神经质则让你在风暴中保持一种病态的清醒。",
    strength: "在不确定性中的生存本能",
    weakness: "无法忍受低刺激的常规生活"
  },
  {
    name: "压力转化独角鲸",
    tagline: "你把焦虑变成了一种能力",
    emoji: "🐋",
    traits: {O:'high',E:'low',C:'high',A:'high',N:'high'},
    description: "内向型防御者。你通过极度的勤奋与对他人的友善来缓解内在的生存焦虑。你习惯在精神深处进行高强度的自我审查，并将这种张力转化为稳定的产出。",
    strength: "在高度焦虑下维持专业水准",
    weakness: "长期自我压抑导致的心理损耗"
  },
  {
    name: "深海布道抹香鲸",
    tagline: "你知道很多，但你选择沉默",
    emoji: "🐳",
    traits: {O:'high',E:'low',C:'high',A:'high',N:'low'},
    description: "沉稳的思想构建者。你拥有庞大的内在认知世界与自律的执行体系。你不需要外界的掌声，在低社会需求的保护下，你默默完善着某种深奥的人格秩序。",
    strength: "深度认知储备与精神自主性",
    weakness: "因拒绝社会反馈而导致的认知孤岛"
  },
  {
    name: "幻觉捕食螳螂虾",
    tagline: "你看到的世界，比别人多很多层",
    emoji: "🦐",
    traits: {O:'high',E:'low',C:'high',A:'low',N:'high'},
    description: "敏锐的怀疑论者。你拥有极高的模式识别能力，能够捕捉系统中微小的缝隙。高神经质让你始终保持警戒，你通过不断分析和预判来抵御潜意识里的不安全感。",
    strength: "极致的洞察力与危机预判",
    weakness: "因过度解析导致的偏执倾向"
  },
  {
    name: "静默蓄能豹猫",
    tagline: "你不动，是因为你在等一个完美时机",
    emoji: "🐆",
    traits: {O:'high',E:'low',C:'high',A:'low',N:'low'},
    description: "高冷的人格策略家。你极度珍视能量的分配，拒绝无意义的社交耗损。你拥有清晰的目标图景与自律的节奏，是一个在暗处观察、在终点现身的专业主义者。",
    strength: "极高的独立性与资源利用效率",
    weakness: "在需要团队协作时表现冷漠"
  },
  {
    name: "边界消融海月水母",
    tagline: "你和世界没有清晰分界",
    emoji: "🪼",
    traits: {O:'high',E:'low',C:'low',A:'high',N:'high'},
    description: "高敏感的共情者。你的自我边界极其模糊，极易被环境的情绪和审美信号所浸润。你活在直觉与潜意识的洋流中，是一个天生的感官受体。",
    strength: "极高的艺术通感与移情能力",
    weakness: "缺乏心理硬壳，易产生身份认同危机"
  },
  {
    name: "深海概率灯塔水母",
    tagline: "你不是一个人，你是一种不断重启的可能性",
    emoji: "🪼",
    traits: {O:'high',E:'low',C:'low',A:'high',N:'low'},
    description: "流动的人格原型。你拒绝被任何固定的性格特质锁死。你具备极高的认知灵活性，能够在不同的环境周期中，主动解构旧自我并合成新的人格版本。",
    strength: "极强的自我重构与环境适应力",
    weakness: "核心自我（Core Self）的稀薄感"
  },
  {
    name: "透明情绪玻璃鱼",
    tagline: "你所有感受都是可见的",
    emoji: "🐟",
    traits: {O:'high',E:'low',C:'low',A:'low',N:'high'},
    description: "高敏感的怀疑者。你拥有捕捉细微变化的直觉，但低宜人性让你不屑于修饰自己的防御姿态。你是一面诚实的镜子，照出环境的荒谬，但也让自己伤痕累累。",
    strength: "极致的真实性与直觉洞察",
    weakness: "社交防御机制过于脆弱"
  },
  {
    name: "码头哲学信天翁",
    tagline: "去码头整点薯条",
    emoji: "🕊️",
    traits: {O:'high',E:'low',C:'low',A:'low',N:'low'},
    description: "彻底的解构主义者。你拥有看穿宏大叙事的能力，因此对社会竞争不屑一顾。你以一种极度的低耗状态生活，将精神能量保留在对虚无的思辨中。",
    strength: "极高的精神自由度与抗焦虑能力",
    weakness: "因社会参与度过低而导致的边缘化"
  },

  // --- LOW O (低开放性) 系列：侧重实证、传统与规则稳定性 ---
  {
    name: "秩序守望角雕",
    tagline: "世界混乱，但你的巢必须完美",
    emoji: "🦅",
    traits: {O:'low',E:'high',C:'high',A:'high',N:'high'},
    description: "高度紧绷的社会维护者。你极度依赖现有的规则与道德框架。高外向性让你倾向于控制环境，而高神经质则让你在规则被破坏时产生剧烈的应激反应。",
    strength: "极强的秩序维护能力与责任担当",
    weakness: "因教条主义导致的认知僵化"
  },
  {
    name: "群体导航帝企鹅",
    tagline: "你不是领袖，但大家会跟着你走",
    emoji: "🐧",
    traits: {O:'low',E:'high',C:'high',A:'high',N:'low'},
    description: "典型的集体主义脊梁。你认同传统价值，通过高稳定性的行为获得群体信任。你不需要创新的光芒，只需通过持续的可靠性成为环境的定心丸。",
    strength: "极高的社会可靠性与协作精神",
    weakness: "在范式转移时缺乏转型动力"
  },
  {
    name: "惊跳反应小羚羊",
    tagline: "你一直在奔跑，即使危险不存在",
    emoji: "🦌",
    traits: {O:'low',E:'high',C:'high',A:'low',N:'high'},
    description: "高能避险者。你对环境中的负面信号有极强的捕捉本能。你通过不断地‘动’和‘达成目标’来对冲内心的威胁感，是一个极度自律但也极度焦虑的幸存者。",
    strength: "极高的危机反应速度与执行密度",
    weakness: "无法进入深度的放松与自省状态"
  },
  {
    name: "冷血航行虎鲸",
    tagline: "目标比情绪更真实",
    emoji: "🐋",
    traits: {O:'low',E:'high',C:'high',A:'low',N:'low'},
    description: "结果导向的实用主义者。你高度认同层级与规则，并擅长将其转化为达成目标的工具。你剥离了感性损耗，在既定赛道上拥有无与伦比的巡航效率。",
    strength: "极致的理性决策力与目标专注度",
    weakness: "在情感连接维度上的深度匮乏"
  },
  {
    name: "即时情绪火烈鸟",
    tagline: "你站在那里，情绪就开始蔓延",
    emoji: "🦩",
    traits: {O:'low',E:'high',C:'low',A:'high',N:'high'},
    description: "群体情绪的放大器。你通过与周围人的情感共振来获得存在感。你对传统社交规则极度适应，但也容易在群体狂欢中彻底迷失个人立场。",
    strength: "卓越的情感共鸣与社交粘合力",
    weakness: "高度的情绪依赖与主见缺失"
  },
  {
    name: "快乐扩散海獭",
    tagline: "你存在本身就是一种安抚",
    emoji: "🦦",
    traits: {O:'low',E:'high',C:'low',A:'high',N:'low'},
    description: "社会润滑剂。你追求简单的快乐与人际和谐，擅长通过低攻击性的姿态化解紧张。你是一个天然的降压阀，让紧绷的规则系统变得柔软。",
    strength: "极高的情绪价值与社交亲和度",
    weakness: "面对深层冲突时的回避倾向"
  },
  {
    name: "风暴预感雨燕",
    tagline: "你飞得很低，因为你知道风要来了",
    emoji: "🐦",
    traits: {O:'low',E:'high',C:'low',A:'low',N:'high'},
    description: "环境变化的投机者。你对外界的资源流向和风险分配有本能的敏锐。你通过不断地变换位置来确保自身安全，是一个游走在体制边缘的高能预警机。",
    strength: "极强的动态平衡能力与生存嗅觉",
    weakness: "缺乏长期的事业忠诚度与深度沉淀"
  },
  {
    name: "边缘试探鬣狗",
    tagline: "你总是在规则边界试试看",
    emoji: "🐕",
    traits: {O:'low',E:'high',C:'low',A:'low',N:'low'},
    description: "灵活的实用主义者。你对宏大理想不屑一顾，只关注最现实的利益边界。你擅长在规则缝隙中获益，是一个低内耗、高弹性的现实玩家。",
    strength: "极强的现实适应力与损益计算能力",
    weakness: "因缺乏深层价值标准而产生的功利感"
  },
  {
    name: "记忆反刍驯鹿",
    tagline: "你活在现在，但你一直在消化过去",
    emoji: "🦌",
    traits: {O:'low',E:'low',C:'high',A:'high',N:'high'},
    description: "传统的守护者。高神经质让你对过往的失误记忆犹新，通过不断的反思和自省来确保当下的步履维艰。你是一个在记忆废墟上谨慎筑篱的工匠。",
    strength: "细致的人格反思深度与责任感",
    weakness: "反刍思维带来的沉重心理负担"
  },
  {
    name: "守拙筑巢工蜂",
    tagline: "稳定是最大的正义",
    emoji: "🐝",
    traits: {O:'low',E:'low',C:'high',A:'high',N:'low'},
    description: "稳定的社会基石。你高度认同社会契约，在低自我意识的状态下履行职责。你追求的是一种古老而踏实的道德感，通过服务群体获得内在的宁静。",
    strength: "极高的可靠性与社会整合价值",
    weakness: "在变革时代容易被思维定式围困"
  },
  {
    name: "织网结构黑寡妇",
    tagline: "如果世界没有秩序，你就创造一个",
    emoji: "🕷️",
    traits: {O:'low',E:'low',C:'high',A:'low',N:'high'},
    description: "高压控制型人格。你不信任外界的自发性，通过建立严密的私人秩序和监控体系来抵御内心的不安。你是自己世界的君主，也是最累的守卫。",
    strength: "严密的逻辑自洽与防御体系构建",
    weakness: "过度的戒备心导致的防御过度"
  },
  {
    name: "结构寄生管虫",
    tagline: "没有结构，你就无法呼吸",
    emoji: "🪱",
    traits: {O:'low',E:'low',C:'high',A:'low',N:'low'},
    description: "深度的体制依赖者。你在明确的KPI与规则下拥有极高的执行效率。你的人生通过依附于一个稳定的逻辑系统而获得意义，是系统中最高标准的执行组件。",
    strength: "极高的专业专注度与垂直整合力",
    weakness: "在去中心化环境中的严重迷失"
  },
  {
    name: "深层共振海参",
    tagline: "你看起来没反应，其实你全感受到了",
    emoji: "🥒",
    traits: {O:'low',E:'low',C:'low',A:'high',N:'high'},
    description: "内向型的高敏者。你缺乏有效的社会化表达通道，导致内在的丰富情感只能在沉默中自我消化。你是一个安静的情绪黑洞，吸收一切却无法排解。",
    strength: "极深的人格内在情感空间",
    weakness: "严重的表达障碍与情感淤积"
  },
  {
    name: "规则温顺水豚",
    tagline: "只要不出问题，你都可以",
    emoji: "🐹",
    traits: {O:'low',E:'low',C:'low',A:'high',N:'low'},
    description: "终极的人格稳态。你对世界没有攻击性，也没有防御的必要。你通过极低的人格特质波动，达成了一种与万物合一的佛系平衡，是宇宙中的背景音。",
    strength: "极致的包容力与心理低耗状态",
    weakness: "严重缺乏改变现状的驱动力"
  },
  {
    name: "潜行躲避穿山甲",
    tagline: "卷不赢，那就藏起来",
    emoji: "🛡️",
    traits: {O:'low',E:'low',C:'low',A:'low',N:'high'},
    description: "回避型人格。高神经质让你对社会互动充满恐惧，低开放性则让你缺乏突破现状的勇气。你通过最小化存在感和最大化防御来获得安全感。",
    strength: "极强的风险规避与自我隔离能力",
    weakness: "长期处于人格萎缩与社交孤立状态"
  },
  {
    name: "现实耐受蟑螂王",
    tagline: "意义不重要，活下来才重要",
    emoji: "🪳",
    traits: {O:'low',E:'low',C:'low',A:'low',N:'low'},
    description: "人格特质的“物理底线”。你剥离了所有高阶的精神需求与情感损耗，只保留最核心的生存逻辑。你不被羞辱、不被感动、不被定义，拥有最原始的顽强。",
    strength: "极致的现实耐受力与生命韧性",
    weakness: "精神维度的极度扁平化"
  }
];