# 人格与行为测试系统

一个基于 BFI-2（大五人格问卷第二版）和自定义行为测试的在线人格测试系统，设计风格参考了流行的 SBTI 测试。

## 📋 测试内容

### 第一部分：行为测试（30题）
填空题形式，收集被测试者的日常行为数据，包括：
- 社交活动时间
- 生活习惯
- 工作学习时长
- 兴趣爱好
- 情绪状态
- 等等

### 第二部分：BFI-2 人格测试（60题）
标准的李克特5点量表选择题，测量大五人格维度：
1. **外向性 (Extraversion)** - 社交性、活力、果断性
2. **宜人性 (Agreeableness)** - 同情心、谦恭、信任
3. **尽责性 (Conscientiousness)** - 条理性、效率、责任感
4. **负性情绪 (Negative Emotionality)** - 焦虑、抑郁、情绪波动
5. **开放性 (Open-Mindedness)** - 好奇心、审美、想象力

## ✨ 功能特点

- ✅ 美观的单页面设计（参考 SBTI 风格）
- ✅ 进度条实时显示
- ✅ 支持前后翻页
- ✅ 自动计算大五人格得分
- ✅ 反向计分题自动处理
- ✅ 根据人格特征映射动物类型
- ✅ 数据自动保存到 Google Sheets
- ✅ 支持下载 JSON 格式结果
- ✅ 移动端友好的响应式设计

## 🚀 快速开始

### 1. 本地预览（30秒）

```bash
cd personality-test
python -m http.server 8000
```

打开浏览器访问 `http://localhost:8000`

### 2. 配置数据存储（2分钟）

**强烈推荐使用 Google Apps Script 方案（最简单且安全）：**

📖 详细步骤见 **[QUICKSTART.md](QUICKSTART.md)** - 5分钟完成所有配置！

简要步骤：
1. 创建 Google Sheets 表格
2. 在表格中创建 Apps Script（复制粘贴代码）
3. 部署为 Web 应用，获取 URL
4. 在 `index.html` 中替换 URL
5. 测试并推送到 GitHub

### 3. 部署到线上（1分钟）

#### GitHub Pages（推荐）

```bash
# 推送代码
git push -u origin main

# 在 GitHub 仓库设置中启用 Pages
```

你的网页将发布到：`https://你的用户名.github.io/personality-test/`

#### 其他部署方式

- **Vercel**: 导入 GitHub 仓库自动部署
- **Netlify**: 拖拽文件夹即可部署

---

## 📚 详细文档

- [QUICKSTART.md](QUICKSTART.md) - 5分钟快速部署指南 ⭐ 推荐
- [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) - 安全部署完整指南
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Google Sheets API 配置（高级）

## 📁 项目结构

```
personality-test/
├── index.html           # 主页面（包含所有HTML/CSS/JS）
├── SETUP_GUIDE.md      # Google Sheets 配置详细指南
└── README.md           # 本文件
```

## 🎯 计分方式

### BFI-2 计分

- 每个维度包含12道题
- 部分题目需要反向计分（标记为 R）
- 反向计分公式：`6 - 原始分数`
- 最终得分：该维度所有题目得分的平均值（1-5分）

### 动物类型映射

根据五个维度中得分最高的维度，映射到对应的动物类型：

| 维度 | 动物类型 | 说明 |
|------|----------|------|
| 外向性 | 🦁 社交狮子 | 喜欢与人交往，充满活力和领导力 |
| 宜人性 | 🐼 和善熊猫 | 善良友好，乐于助人，团队协作能力强 |
| 尽责性 | 🦉 严谨猫头鹰 | 做事有条理，可靠负责，追求完美 |
| 负性情绪 | 🐱 敏感猫咪 | 情绪敏感，善于感知细微变化 |
| 开放性 | 🦄 创意独角兽 | 富有创造力和想象力，喜欢探索新事物 |

*注意：你可以在 `index.html` 中自定义这个映射关系。*

## 📊 数据格式

### 存储到 Google Sheets 的数据结构

| 列名 | 类型 | 说明 |
|------|------|------|
| 提交时间 | ISO 8601 | 测试提交的时间戳 |
| 用户ID | String | 用户填写的ID或昵称 |
| 邮箱 | String | 用户选填的邮箱 |
| 行为测试答案 | JSON | 30道题的答案对象 |
| BFI-2答案 | JSON | 60道题的答案对象 |
| 外向性 | Number | 1-5分，保留两位小数 |
| 宜人性 | Number | 1-5分，保留两位小数 |
| 尽责性 | Number | 1-5分，保留两位小数 |
| 负性情绪 | Number | 1-5分，保留两位小数 |
| 开放性 | Number | 1-5分，保留两位小数 |
| 动物类型 | String | 映射的动物类型名称 |

### 下载的 JSON 格式

```json
{
  "userInfo": {
    "userId": "user123",
    "email": "user@example.com",
    "startTime": "2026-04-10T14:30:00.000Z",
    "endTime": "2026-04-10T14:45:00.000Z"
  },
  "behaviorAnswers": {
    "b1": "5",
    "b2": "3",
    ...
  },
  "bfi2Answers": {
    "bfi1": 4,
    "bfi2": 5,
    ...
  },
  "bfi2Scores": {
    "E": "3.75",
    "A": "4.12",
    "C": "3.50",
    "N": "2.83",
    "O": "4.25"
  },
  "animalType": {
    "emoji": "🦄",
    "name": "创意独角兽",
    "desc": "开放性突出，富有创造力和想象力，喜欢探索新事物"
  }
}
```

## 🛠️ 自定义

### 修改行为测试题目

在 `index.html` 中找到 `behaviorQuestions` 数组（约第 400 行）：

```javascript
const behaviorQuestions = [
  { id: 'b1', text: '你的题目：_____ 单位', placeholder: '请输入数字' },
  // 添加更多题目...
];
```

### 修改动物类型映射

在 `determineAnimalType` 函数中修改 `animals` 对象：

```javascript
const animals = {
  'E': { emoji: '🦁', name: '社交狮子', desc: '...' },
  'A': { emoji: '🐼', name: '和善熊猫', desc: '...' },
  // 自定义其他类型...
};
```

### 修改页面样式

所有样式都在 `<style>` 标签中的 CSS 变量中定义：

```css
:root {
  --bg: #f6faf6;           /* 背景色 */
  --accent: #6c8d71;       /* 主题色 */
  --radius: 22px;          /* 圆角大小 */
  /* 修改这些变量即可改变整体风格 */
}
```

## 📈 数据分析

### 在 Google Sheets 中分析

1. 使用数据透视表统计各维度分布
2. 使用公式提取 JSON 中的具体答案
3. 创建图表可视化结果

### 使用 Python 分析

```python
import pandas as pd
import json

# 从 Google Sheets 导出 CSV
df = pd.read_csv('test_data.csv')

# 解析 JSON 列
df['bfi2_parsed'] = df['BFI-2答案'].apply(json.loads)

# 统计分析
print(df[['外向性', '宜人性', '尽责性', '负性情绪', '开放性']].describe())
```

## 🔒 隐私和安全

- 所有数据通过 HTTPS 传输
- Google Sheets 可设置访问权限
- 建议使用 OAuth 2.0 而非 API 密钥
- 不收集用户的IP地址或设备信息
- 用户可选择性填写邮箱

## 📚 参考文献

BFI-2 问卷：
- Soto, C. J., & John, O. P. (2017). The next Big Five Inventory (BFI-2): Developing and assessing a hierarchical model with 15 facets to enhance bandwidth, fidelity, and predictive power. *Journal of Personality and Social Psychology*, 113, 117-143.

中文版翻译：
- 张博、黎坚、李一茗、罗晶、叶勇豪、尹露、陈卓生

## 📄 许可

本项目仅供学习和研究使用。BFI-2 问卷版权归 Oliver P. John 和 Christopher J. Soto 所有。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## ❓ 常见问题

**Q: 可以修改题目数量吗？**
A: 可以，但BFI-2的60题是标准化量表，建议保持完整。行为测试部分可以随意修改。

**Q: 如何导出所有用户数据？**
A: 在 Google Sheets 中选择"文件" > "下载" > "逗号分隔值(.csv)"

**Q: 能否添加更多动物类型？**
A: 可以！你可以基于多个维度的组合创建更复杂的映射逻辑。

**Q: 测试结果科学吗？**
A: BFI-2 是经过科学验证的人格量表。但本测试仅供娱乐和自我认知，不能代替专业心理评估。

---

Made with ❤️ | Inspired by SBTI Test
