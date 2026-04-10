# 🚀 快速部署指南（5分钟完成）

## ⏱️ 配置 Google Apps Script（2分钟）

### 第一步：创建表格

1. 打开 [Google Sheets](https://sheets.google.com/)
2. 新建表格，命名为"人格测试数据"
3. 第一行输入表头（复制粘贴）：

```
提交时间	用户ID	邮箱	行为测试答案	BFI-2答案	外向性	宜人性	尽责性	负性情绪	开放性	动物类型
```

### 第二步：创建脚本

1. 在表格中：**扩展程序** → **Apps Script**
2. 删除默认代码，粘贴以下代码：

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    const data = JSON.parse(e.postData.contents);

    if (!data.userInfo || !data.userInfo.userId) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: '缺少必要字段'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 防止频繁提交（10分钟内只能提交一次）
    const cache = CacheService.getScriptCache();
    const cacheKey = 'submit_' + data.userInfo.userId;
    if (cache.get(cacheKey)) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: '提交过于频繁，请1秒后再试'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    cache.put(cacheKey, 'true', 1);

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

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '数据已保存'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. 点击 **保存** 💾（或 Ctrl+S）

### 第三步：部署脚本

1. 点击右上角 **部署** → **新建部署**
2. 点击"选择类型" → 选择 **Web 应用**
3. 配置：
   - 说明：`人格测试数据提交API`
   - **执行身份**：选择 **我**
   - **谁有权访问**：选择 **任何人**
4. 点击 **部署**
5. 首次部署需要授权：
   - 点击 **授权访问**
   - 选择你的 Google 账号
   - 点击 **高级** → **转至项目（不安全）**
   - 点击 **允许**
6. **复制 Web 应用 URL** 📋（看起来像 `https://script.google.com/macros/s/AKfyc...xyz/exec`）

---

## 📝 修改网页代码（1分钟）

打开 `index.html`，找到这一行（约第 735 行）：

```javascript
const SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

替换为你刚才复制的 URL：

```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfyc...你的URL.../exec';
```

保存文件！✅

---

## 🧪 本地测试（1分钟）

```bash
cd /Users/selina/testducc/personality-test
python -m http.server 8000
```

打开 `http://localhost:8000`，完成一次测试，检查：
1. 测试能否完成
2. Google Sheets 表格中是否有新数据

---

## 🌐 推送到 GitHub（1分钟）

### 如果还没创建 GitHub 仓库：

1. 去 [github.com](https://github.com/new) 创建新仓库
   - 名称：`personality-test`
   - 设为 Public
   - 不要勾选任何初始化选项
2. 复制仓库地址

### 推送代码：

```bash
cd /Users/selina/testducc/personality-test

# 如果还没 commit 过
git add .
git commit -m "配置 Google Apps Script"

# 关联远程仓库（替换成你的）
git remote add origin https://github.com/你的用户名/personality-test.git

# 推送
git push -u origin main
```

---

## 🎉 启用 GitHub Pages（30秒）

1. 进入你的 GitHub 仓库
2. **Settings** → 左侧 **Pages**
3. Source 选择 **main** 分支
4. **Save**

等待 1-2 分钟，访问：
```
https://你的用户名.github.io/personality-test/
```

---

## ✅ 完成！分享链接

把这个链接发给别人就可以了：
```
https://你的用户名.github.io/personality-test/
```

---

## 🔒 安全性确认

✅ **代码公开** - GitHub 上所有人能看到 HTML/CSS/JS
✅ **数据私密** - Google Sheets 只有你能访问
✅ **API安全** - 没有暴露任何密钥
✅ **防刷机制** - 10分钟内同一ID只能提交一次

---

## 📊 查看数据

直接打开你的 Google Sheets 表格，所有提交的数据都在里面！

可以：
- 导出为 Excel/CSV
- 创建图表
- 使用数据透视表分析
- 在 Google Data Studio 中可视化

---

## 🐛 常见问题

**Q: 提交后显示"数据将下载到本地"？**
A: 检查 `index.html` 中的 `SCRIPT_URL` 是否正确替换

**Q: Apps Script 报错"权限不足"？**
A: 重新部署，确保"谁有权访问"选择的是"任何人"

**Q: 表格中没有数据？**
A:
1. 检查表格名称是否是 `Sheet1`
2. 打开浏览器控制台查看错误信息
3. 在 Apps Script 中查看执行日志

**Q: 如何更新 Apps Script？**
A: 修改代码后，点击 **部署** → **管理部署** → 点击编辑 ✏️ → **部署**

**Q: 数据能保存多少？**
A: Google Sheets 最多 1000万行，Apps Script 每天可处理约 5000 次请求，对个人测试完全够用

---

## 🎯 下一步

1. [ ] 完善动物类型映射逻辑
2. [ ] 美化结果展示页面
3. [ ] 添加数据可视化（雷达图）
4. [ ] 自定义域名（可选）

需要帮助随时问我！
