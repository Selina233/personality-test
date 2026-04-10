# 安全部署指南（公开代码 + 私密数据存储）

## 🔒 安全架构

```
用户浏览器 → Vercel 前端 → Vercel Serverless Function → Google Sheets
              (公开)          (私密，含API密钥)            (私密)
```

这样的好处：
- ✅ 前端代码可以公开到 GitHub
- ✅ API 密钥等敏感信息存储在 Vercel 环境变量中
- ✅ 用户只能提交数据，不能读取或修改他人数据
- ✅ 完全免费
- ✅ 自动 HTTPS

---

## 🚀 推荐方案：Vercel + Serverless Functions

### 第一步：创建 Serverless Function

创建文件夹和函数文件：

```bash
mkdir -p api
```

然后创建 `api/submit.js`（我会帮你创建这个文件）

### 第二步：配置 Google Sheets

#### 选项 A：使用 Service Account（推荐）

1. 在 Google Cloud Console 创建 Service Account
2. 下载 JSON 密钥文件
3. 将密钥内容设置为 Vercel 环境变量
4. 在 Google Sheets 中授权这个 Service Account 的邮箱

#### 选项 B：使用 Google Apps Script

（最简单，无需配置 API 密钥）

### 第三步：部署到 Vercel

```bash
# 推送到 GitHub 后
vercel --prod
```

或者在 Vercel 网站上导入你的 GitHub 仓库。

---

## 📝 详细步骤（推荐使用 Google Apps Script 方案）

### 方案：Google Apps Script（零配置，最安全）

这个方案不需要在前端或后端存储任何 API 密钥！

#### 1. 创建 Google Sheets 表格

1. 创建新表格：[Google Sheets](https://sheets.google.com/)
2. 第一行添加表头：

```
提交时间 | 用户ID | 邮箱 | 行为测试答案 | BFI-2答案 | 外向性 | 宜人性 | 尽责性 | 负性情绪 | 开放性 | 动物类型
```

#### 2. 创建 Apps Script

1. 在表格中：**扩展程序** → **Apps Script**
2. 粘贴以下代码：

```javascript
function doPost(e) {
  try {
    // 获取活动表格
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

    // 解析请求数据
    const data = JSON.parse(e.postData.contents);

    // 验证数据（可选，添加简单的防刷机制）
    if (!data.userInfo || !data.userInfo.userId) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: '缺少必要字段'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 准备行数据
    const row = [
      new Date().toISOString(),
      data.userInfo.userId,
      data.userInfo.email || '',
      JSON.stringify(data.behaviorAnswers),
      JSON.stringify(data.bfi2Answers),
      data.bfi2Scores.E,
      data.bfi2Scores.A,
      data.bfi2Scores.C,
      data.bfi2Scores.N,
      data.bfi2Scores.O,
      data.animalType.name
    ];

    // 追加到表格
    sheet.appendRow(row);

    // 返回成功响应
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '数据已保存'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 返回错误响应
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 处理 OPTIONS 请求（CORS）
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

#### 3. 部署 Apps Script

1. 点击 **部署** → **新建部署**
2. 类型选择：**Web 应用**
3. 配置：
   - **执行身份**：我
   - **谁有权访问**：任何人
4. 点击 **部署**
5. **复制 Web 应用 URL**（看起来像 `https://script.google.com/macros/s/AKfy...xyz/exec`）

#### 4. 设置表格权限

**重要**：不要公开共享你的表格！只有 Apps Script 能写入。

---

## 🔧 修改前端代码

现在修改 `index.html` 中的 `saveToGoogleSheets` 函数，使用 Apps Script URL。

我会帮你修改这个函数。

---

## 🛡️ 安全性说明

### Google Apps Script 方案的安全性

✅ **API 密钥不暴露**：脚本在 Google 服务器运行，不需要 API 密钥
✅ **数据只能写入**：用户只能提交数据，无法读取表格内容
✅ **表格权限独立**：表格本身可以设为私密
✅ **免费且稳定**：使用 Google 基础设施
⚠️ **限制**：每天有配额限制（对个人测试足够）

### 防止数据滥用

在 Apps Script 中可以添加：

```javascript
// 1. 限制提交频率
const cache = CacheService.getScriptCache();
const userId = data.userInfo.userId;
const cacheKey = 'submit_' + userId;

if (cache.get(cacheKey)) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: '提交过于频繁，请稍后再试'
  })).setMimeType(ContentService.MimeType.JSON);
}

// 设置缓存，10分钟内不能重复提交
cache.put(cacheKey, 'true', 600);

// 2. 验证数据完整性
if (Object.keys(data.bfi2Answers).length !== 60) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: '数据不完整'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

---

## 📊 查看和管理数据

### 你可以：
✅ 在 Google Sheets 中查看所有提交的数据
✅ 导出为 CSV/Excel 进行分析
✅ 使用 Google Data Studio 创建可视化报表
✅ 随时删除或修改数据

### 别人不能：
❌ 查看表格内容（除非你分享）
❌ 修改已提交的数据
❌ 删除数据
❌ 看到 Apps Script 的代码（私密的）

---

## 🎯 完整部署流程

1. ✅ 创建 Google Sheets 表格
2. ✅ 创建并部署 Apps Script
3. ✅ 复制 Web 应用 URL
4. ✅ 修改 `index.html` 中的 URL
5. ✅ 推送到 GitHub
6. ✅ 在 GitHub 启用 Pages 或用 Vercel 部署

---

## ⚠️ 推送前检查清单

推送到 GitHub 之前，确保：

- [ ] 代码中没有真实的 API 密钥
- [ ] 已将 Apps Script URL 替换到代码中
- [ ] Google Sheets 表格权限设为私密
- [ ] 已测试数据提交功能正常
- [ ] README 中没有敏感信息

---

## 🔄 替代方案对比

| 方案 | 安全性 | 复杂度 | 成本 | 推荐度 |
|------|--------|--------|------|--------|
| Google Apps Script | ⭐⭐⭐⭐⭐ | ⭐⭐ | 免费 | ⭐⭐⭐⭐⭐ |
| Vercel Functions + Service Account | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 免费 | ⭐⭐⭐⭐ |
| 自建后端服务器 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 可能收费 | ⭐⭐⭐ |

**推荐**：对于你的场景，**Google Apps Script** 最合适！
