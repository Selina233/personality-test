function doPost(e) {
  try {
    // 解析提交的数据
    const data = JSON.parse(e.postData.contents);

    // 获取 Google Sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 提取数据字段（按照14列表头顺序）
    const submittedAt = data.submittedAt || new Date().toISOString();
    const userId = data.userInfo.userId || '';
    const email = data.userInfo.email || '';
    const phone = data.userInfo.phone || '';
    const questionnaireVersion = data.questionnaireVersion || '';
    const durationSeconds = data.durationSeconds || 0;

    // 行为测试答案（JSON字符串）
    const behaviorAnswers = JSON.stringify(data.behaviorAnswers);

    // BFI-2答案（JSON字符串）
    const bfi2Answers = JSON.stringify(data.bfi2Answers);

    // 大五人格分数
    const scoreE = data.bfi2Scores.E || '';
    const scoreA = data.bfi2Scores.A || '';
    const scoreC = data.bfi2Scores.C || '';
    const scoreN = data.bfi2Scores.N || '';
    const scoreO = data.bfi2Scores.O || '';

    // 动物类型
    const animalName = data.animalType.name || '';

    // 构建要插入的行数据
    const rowData = [
      submittedAt,           // 提交时间
      userId,                // 用户ID
      email,                 // 邮箱
      phone,                 // 手机号
      questionnaireVersion,  // 问卷版本
      durationSeconds,       // 测试时长
      behaviorAnswers,       // 行为测试答案
      bfi2Answers,           // BFI-2答案
      scoreE,                // 外向性
      scoreA,                // 宜人性
      scoreC,                // 尽责性
      scoreN,                // 神经质
      scoreO,                // 开放性
      animalName             // 动物类型
    ];

    // 插入新行
    sheet.appendRow(rowData);

    // 返回成功响应
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 返回错误响应
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Apps Script is running'
  })).setMimeType(ContentService.MimeType.JSON);
}
