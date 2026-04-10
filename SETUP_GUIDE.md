# Google Sheets 数据存储配置指南

## 概述

这个人格测试网页使用 Google Sheets 作为数据存储后端，所有用户的答题数据会自动保存到你的 Google Sheets 表格中。

## 配置步骤

### 第一步：创建 Google Cloud 项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 点击 "创建项目" 或选择现有项目
3. 记录项目名称

### 第二步：启用 Google Sheets API

1. 在 Google Cloud Console 中，进入 "API 和服务" > "库"
2. 搜索 "Google Sheets API"
3. 点击 "启用"

### 第三步：创建 API 凭据

#### 方案 A：API 密钥（简单但功能受限）

1. 在 Google Cloud Console 中，进入 "API 和服务" > "凭据"
2. 点击 "创建凭据" > "API 密钥"
3. 复制生成的 API 密钥
4. （重要）点击"限制密钥"，在"API 限制"中选择"限制密钥"，只勾选"Google Sheets API"

**注意：使用 API 密钥时，表格必须设置为"任何知道链接的人都可以编辑"**

#### 方案 B：OAuth 2.0 客户端 ID（推荐，更安全）

1. 在 "凭据" 页面，点击 "创建凭据" > "OAuth 客户端 ID"
2. 选择 "Web 应用"
3. 添加授权的 JavaScript 来源（例如：`http://localhost:8000` 或你的域名）
4. 添加授权的重定向 URI
5. 复制客户端 ID

### 第四步：创建 Google Sheets 表格

1. 访问 [Google Sheets](https://sheets.google.com/)
2. 创建新表格，命名为 "人格测试数据"
3. 在第一行添加表头：

| 提交时间 | 用户ID | 邮箱 | 行为测试答案 | BFI-2答案 | 外向性 | 宜人性 | 尽责性 | 负性情绪 | 开放性 | 动物类型 |
|---------|--------|------|-------------|-----------|--------|--------|--------|----------|--------|----------|

4. 从浏览器地址栏复制表格 ID（例如：`https://docs.google.com/spreadsheets/d/1abc...xyz/edit` 中的 `1abc...xyz`）

### 第五步：设置表格权限

#### 如果使用 API 密钥：
1. 点击右上角的"共享"按钮
2. 将共享设置改为"任何知道链接的人都可以编辑"

#### 如果使用 OAuth 2.0：
1. 只需要确保你的 Google 账户有编辑权限

### 第六步：配置网页文件

打开 `index.html`，找到以下代码（大约在第 800 行左右）：

```javascript
const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // 替换为你的表格ID
const API_KEY = 'YOUR_API_KEY_HERE';   // 替换为你的API密钥
```

替换为你的实际值：

```javascript
const SHEET_ID = '1abc...xyz';  // 你的表格ID
const API_KEY = 'AIza...';      // 你的API密钥
```

### 第七步：测试（本地）

1. 启动本地服务器（不能直接用 `file://` 打开）：

```bash
# 使用 Python
cd personality-test
python -m http.server 8000

# 或使用 Node.js
npx serve .
```

2. 在浏览器中打开 `http://localhost:8000`
3. 完成一次测试，检查 Google Sheets 是否收到数据

---

## 使用 OAuth 2.0 的完整方案（推荐）

如果你想使用更安全的 OAuth 2.0 认证，需要在 HTML 文件中添加 Google 身份验证库。

### 修改 HTML

在 `<head>` 标签中添加：

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

在 JavaScript 部分替换 `saveToGoogleSheets` 函数：

```javascript
let accessToken = null;

function initGoogleAuth() {
  google.accounts.oauth2.initTokenClient({
    client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    callback: (tokenResponse) => {
      accessToken = tokenResponse.access_token;
    },
  }).requestAccessToken();
}

async function saveToGoogleSheets(data) {
  if (!accessToken) {
    initGoogleAuth();
    // 等待用户授权后重试
    setTimeout(() => saveToGoogleSheets(data), 2000);
    return;
  }

  const SHEET_ID = 'YOUR_SHEET_ID';

  const rowData = [
    new Date().toISOString(),
    data.userInfo.userId,
    data.userInfo.email,
    JSON.stringify(data.behaviorAnswers),
    JSON.stringify(data.bfi2Answers),
    data.bfi2Scores.E,
    data.bfi2Scores.A,
    data.bfi2Scores.C,
    data.bfi2Scores.N,
    data.bfi2Scores.O,
    data.animalType.name
  ];

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          values: [rowData]
        })
      }
    );

    if (response.ok) {
      console.log('数据已保存到 Google Sheets');
    } else {
      console.error('保存失败:', await response.text());
      downloadAsJSON(data);
    }
  } catch (error) {
    console.error('保存出错:', error);
    downloadAsJSON(data);
  }
}
```

---

## 替代方案：使用 Google Apps Script

如果配置 API 太复杂，可以使用 Google Apps Script 作为中间层：

### 1. 在 Google Sheets 中创建脚本

1. 打开你的 Google Sheets 表格
2. 点击 "扩展程序" > "Apps Script"
3. 粘贴以下代码：

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const data = JSON.parse(e.postData.contents);

  const row = [
    new Date().toISOString(),
    data.userInfo.userId,
    data.userInfo.email,
    JSON.stringify(data.behaviorAnswers),
    JSON.stringify(data.bfi2Answers),
    data.bfi2Scores.E,
    data.bfi2Scores.A,
    data.bfi2Scores.C,
    data.bfi2Scores.N,
    data.bfi2Scores.O,
    data.animalType.name
  ];

  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. 点击 "部署" > "新建部署"
5. 选择类型："Web 应用"
6. 设置：
   - 执行身份：我
   - 谁有权访问：任何人
7. 点击 "部署"，复制 Web 应用 URL

### 2. 修改 HTML 中的保存函数

```javascript
async function saveToGoogleSheets(data) {
  const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    console.log('数据已提交到 Google Sheets');
  } catch (error) {
    console.error('保存出错:', error);
    downloadAsJSON(data);
  }
}
```

---

## 数据格式说明

### 表格列说明

1. **提交时间**: ISO 8601 格式的时间戳
2. **用户ID**: 用户填写的ID或昵称
3. **邮箱**: 用户选填的邮箱
4. **行为测试答案**: JSON格式，包含30道题的答案
5. **BFI-2答案**: JSON格式，包含60道题的答案（1-5分）
6. **外向性**: 计算后的得分（1-5分，保留两位小数）
7. **宜人性**: 计算后的得分
8. **尽责性**: 计算后的得分
9. **负性情绪**: 计算后的得分
10. **开放性**: 计算后的得分
11. **动物类型**: 根据最高维度映射的动物类型名称

### 示例数据行

```
2026-04-10T14:30:45.123Z | user123 | user@example.com | {"b1":"5","b2":"3",...} | {"bfi1":4,"bfi2":5,...} | 3.75 | 4.12 | 3.50 | 2.83 | 4.25 | 创意独角兽
```

---

## 常见问题

### Q: 数据没有保存到表格？

**A:** 检查以下几点：
1. 表格权限是否正确设置
2. API密钥是否正确配置
3. 浏览器控制台是否有错误信息
4. 表格ID是否正确

### Q: 出现 CORS 错误？

**A:**
- 使用 Google Apps Script 方案（推荐）
- 或者在本地服务器上运行，不要用 `file://` 协议

### Q: 如何分析收集的数据？

**A:**
1. 在 Google Sheets 中使用数据透视表
2. 导出为CSV后使用Python/R分析
3. 使用 Google Data Studio 创建可视化报告

### Q: 如何批量处理JSON格式的答案？

**A:** 在 Google Sheets 中创建新列，使用公式：

```
=REGEXEXTRACT(D2, "\"b1\":\"([^\"]+)\"")
```

这会提取 `b1` 题的答案。

---

## 安全建议

1. **不要公开分享 API 密钥**
2. **定期轮换 API 密钥**
3. **使用 OAuth 2.0 而非 API 密钥**
4. **限制 API 密钥的使用范围**
5. **定期备份 Google Sheets 数据**

---

## 部署到线上

### 使用 GitHub Pages

1. 将 `personality-test` 文件夹推送到 GitHub
2. 在仓库设置中启用 GitHub Pages
3. 访问 `https://yourusername.github.io/personality-test/`

### 使用 Vercel/Netlify

1. 将项目推送到 GitHub
2. 在 Vercel/Netlify 中导入项目
3. 自动部署

---

## 支持

如果遇到问题，可以：
1. 查看浏览器控制台的错误信息
2. 检查 Google Cloud Console 的配额和使用情况
3. 参考 [Google Sheets API 文档](https://developers.google.com/sheets/api)
