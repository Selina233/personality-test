// BFI-2 体验版题目（30题，每个子维度2题）
const bfi2QuestionsShort = [
  // E - 外向性 (6题)
  { id: 'bfi1', text: '性格外向，喜欢交际', dim: 'E', subdim: '社交', reverse: false },
  { id: 'bfi16', text: '比较安静', dim: 'E', subdim: '社交', reverse: true },
  { id: 'bfi6', text: '性格坚定自信，敢于表达自己的观点', dim: 'E', subdim: '果断', reverse: false },
  { id: 'bfi21', text: '常常处于主导地位，像个领导一样', dim: 'E', subdim: '果断', reverse: false },
  { id: 'bfi11', text: '很少觉得兴奋或者特别想要(做)什么', dim: 'E', subdim: '活力', reverse: true },
  { id: 'bfi41', text: '精力充沛', dim: 'E', subdim: '活力', reverse: false },

  // A - 宜人性 (6题)
  { id: 'bfi2', text: '心肠柔软，有同情心', dim: 'A', subdim: '同情', reverse: false },
  { id: 'bfi17', text: '对他人没有什么同情心', dim: 'A', subdim: '同情', reverse: true },
  { id: 'bfi7', text: '为人恭谦，尊重他人', dim: 'A', subdim: '谦恭', reverse: false },
  { id: 'bfi22', text: '常与他人意见不和', dim: 'A', subdim: '谦恭', reverse: true },
  { id: 'bfi12', text: '常常挑别人的毛病', dim: 'A', subdim: '信任', reverse: true },
  { id: 'bfi27', text: '宽宏大量', dim: 'A', subdim: '信任', reverse: false },

  // C - 尽责性 (6题)
  { id: 'bfi3', text: '缺乏条理', dim: 'C', subdim: '条理', reverse: true },
  { id: 'bfi18', text: '做事有计划有条理', dim: 'C', subdim: '条理', reverse: false },
  { id: 'bfi8', text: '比较懒', dim: 'C', subdim: '效率', reverse: true },
  { id: 'bfi38', text: '有效率，做事有始有终', dim: 'C', subdim: '效率', reverse: false },
  { id: 'bfi13', text: '可信赖的，可靠的', dim: 'C', subdim: '负责', reverse: false },
  { id: 'bfi28', text: '有时比较没有责任心', dim: 'C', subdim: '负责', reverse: true },

  // N - 神经质 (6题)
  { id: 'bfi4', text: '从容，善于处理压力', dim: 'N', subdim: '焦虑', reverse: true },
  { id: 'bfi19', text: '容易紧张', dim: 'N', subdim: '焦虑', reverse: false },
  { id: 'bfi9', text: '经历挫折后仍能保持积极心态', dim: 'N', subdim: '抑郁', reverse: true },
  { id: 'bfi39', text: '时常觉得悲伤', dim: 'N', subdim: '抑郁', reverse: false },
  { id: 'bfi14', text: '喜怒无常，情绪起伏较多', dim: 'N', subdim: '易变', reverse: false },
  { id: 'bfi29', text: '情绪稳定，不易生气', dim: 'N', subdim: '易变', reverse: true },

  // O - 开放性 (6题)
  { id: 'bfi10', text: '对许多不同的事物都感兴趣', dim: 'O', subdim: '好奇', reverse: false },
  { id: 'bfi25', text: '不喜欢知识性或者哲学性强的讨论', dim: 'O', subdim: '好奇', reverse: true },
  { id: 'bfi5', text: '对艺术没有什么兴趣', dim: 'O', subdim: '审美', reverse: true },
  { id: 'bfi20', text: '着迷于艺术、音乐或文学', dim: 'O', subdim: '审美', reverse: false },
  { id: 'bfi15', text: '善于创造，能找到聪明的方法来做事', dim: 'O', subdim: '想象', reverse: false },
  { id: 'bfi30', text: '几乎没有什么创造性', dim: 'O', subdim: '想象', reverse: true }
];
