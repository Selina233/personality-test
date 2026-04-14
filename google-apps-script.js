/**
 * Google Apps Script - 人格测试数据收集
 *
 * 部署说明：
 * 1. 打开你的 Google Sheet
 * 2. 点击 扩展程序 > Apps Script
 * 3. 将此代码粘贴进去
 * 4. 点击 部署 > 新建部署
 * 5. 选择类型：网页应用
 * 6. 执行身份：我
 * 7. 访问权限：所有人
 * 8. 复制生成的 URL 替换到 index.html 的 SCRIPT_URL
 *
 * 表头顺序（请确保你的 Sheet 第一行是这些表头）：
 * 提交时间 | 用户ID | 邮箱 | 手机号 | 问卷版本 | 测试时长 | 行为测试答案 | BFI-2答案 |
 * 外向性 | 宜人性 | 尽责性 | 神经质 | 开放性 | 动物类型
 */

function doPost(e) {
  // 添加详细日志
  Logger.log('========== 收到 POST 请求 ==========');
  Logger.log('请求时间: ' + new Date().toISOString());

  try {
    // 检查是否有数据
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log('❌ 错误: 没有接收到数据');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'No data received'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    Logger.log('✅ 接收到的原始数据: ' + e.postData.contents);

    // 解析提交的数据
    const data = JSON.parse(e.postData.contents);
    Logger.log('✅ 数据解析成功');

    // 获取 Google Sheet（默认获取第一个工作表）
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    Logger.log('✅ 成功获取工作表: ' + sheet.getName());

    // 提取数据字段
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

    // 构建要插入的行数据（严格按照表头顺序）
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

    Logger.log('✅ 准备插入的数据: ' + JSON.stringify(rowData));

    // 插入新行
    sheet.appendRow(rowData);
    Logger.log('✅ 数据已成功插入到第 ' + sheet.getLastRow() + ' 行');

    // 返回成功响应
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved successfully',
      timestamp: new Date().toISOString(),
      row: sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 记录详细错误
    Logger.log('❌ 发生错误: ' + error.toString());
    Logger.log('❌ 错误堆栈: ' + error.stack);

    // 返回错误响应
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 用于测试的GET请求处理
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Apps Script is running',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 测试函数 - 在 Apps Script 编辑器中运行此函数来测试数据插入
 * 这个函数会直接插入一行测试数据到你的 Sheet
 */
function testInsertData() {
  try {
    Logger.log('========== 开始测试数据插入 ==========');

    // 获取工作表
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    Logger.log('✅ 成功获取工作表: ' + sheet.getName());

    // 模拟测试数据（按照14列表头顺序）
    const testRow = [
      new Date().toISOString(),                    // 提交时间
      'test_user_001',                             // 用户ID
      'test@example.com',                          // 邮箱
      '13800138000',                               // 手机号
      'v1.0.0',                                    // 问卷版本
      180,                                         // 测试时长
      '{"b1":"5","b2":"3"}',                      // 行为测试答案
      '{"bfi1":4,"bfi2":5,"bfi3":2,"bfi4":4,"bfi5":1}',  // BFI-2答案
      '3.50',                                      // 外向性
      '3.75',                                      // 宜人性
      '3.20',                                      // 尽责性
      '2.80',                                      // 神经质
      '3.90',                                      // 开放性
      '宇宙终极小猫咪'                              // 动物类型
    ];

    Logger.log('✅ 准备插入测试数据: ' + JSON.stringify(testRow));

    // 插入数据
    sheet.appendRow(testRow);

    Logger.log('✅✅✅ 成功！数据已插入到第 ' + sheet.getLastRow() + ' 行');
    Logger.log('请检查你的 Google Sheet，应该能看到新的一行测试数据');

    return '测试成功！';

  } catch (error) {
    Logger.log('❌ 测试失败: ' + error.toString());
    Logger.log('❌ 错误详情: ' + error.stack);
    return '测试失败: ' + error.toString();
  }
}

/**
 * 查看数据结构的函数（不插入数据，只查看）
 */
function testDataStructure() {
  const sampleData = {
    submittedAt: new Date().toISOString(),
    userInfo: {
      userId: 'test_user_001',
      email: 'test@example.com',
      phone: '13800138000'
    },
    questionnaireVersion: 'v1.0.0',
    durationSeconds: 180,
    behaviorAnswers: {
      b1: '5',
      b2: '3'
    },
    bfi2Answers: {
      bfi1: 4,
      bfi2: 5,
      bfi3: 2,
      bfi4: 4,
      bfi5: 1
    },
    bfi2Scores: {
      E: '3.50',
      A: '3.75',
      C: '3.20',
      N: '2.80',
      O: '3.90'
    },
    animalType: {
      name: '宇宙终极小猫咪',
      tagline: '你就是最优解本身',
      emoji: '🐱'
    }
  };

  Logger.log('测试数据结构：');
  Logger.log(JSON.stringify(sampleData, null, 2));
}
