const LINE_TOKEN = PropertiesService.getScriptProperties().getProperty('LINE_TOKEN');
const GSS_ID = PropertiesService.getScriptProperties().getProperty('GSS_ID');
const GSS_SHEET_NAME = PropertiesService.getScriptProperties().getProperty('GSS_SHEET_NAME');

type PostEvent = {
  queryString: string;
  parameter: { [index: string]: string };
  parameters: { [index: string]: [string] };
  contentLenth: number;
  postData: {
    length: number;
    type: string;
    contents: string;
    name: string;
  };
};

const doPost = (e: PostEvent): void => {
  const payload = JSON.parse(e.postData.contents).events[0];
  const replyToken = payload.replyToken;
  const messageText = payload.message.text;
  const userId = payload.source.userId;

  if (GSS_ID && GSS_SHEET_NAME) {
    try {
      const sheet = SpreadsheetApp.openById(GSS_ID).getSheetByName(GSS_SHEET_NAME);
      if (sheet) {
        sheet.appendRow([ messageText, userId ]);
      }
    } catch(error) {
      console.log('GSS properties are invalid');
    }
  }

  const count = getWCount(messageText);
  if (count) {
    const replyText = '草の数: ' + count;
    replyMessage(replyToken, replyText);
  }
};

function replyMessage(replyToken: string, replyText: string): void {
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + LINE_TOKEN
    },
    method: 'post',
    payload: JSON.stringify({
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: replyText
        }
      ]
    })
  });
}

const getWCount = (text: string): number => {
  const replacedText = text.replace(/ｗ|W|Ｗ/g, 'w');
  return (replacedText.match(/w/g) || []).length;
};
