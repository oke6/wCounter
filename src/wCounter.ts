// LINEアカウントのアクセストークン
const LINE_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_TOKEN");
// GssId
const GSS_ID = "1e-D9MUtC-Cc0NiplVLheY11L67vgaLg5l3MjsFkamZQ";

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

const doPost = (e: PostEvent) => {
  //投稿情報を取得
  const payload = JSON.parse(e.postData.contents).events[0];
  const replyToken = payload.replyToken;
  const messageText = payload.message.text;
  const userId = payload.source.userId;

  //ログ取得用
  const sheet = SpreadsheetApp.openById(GSS_ID).getSheetByName("log");
  if (sheet) {
    sheet.appendRow([messageText, userId]);
  }

  const count = getWCount(messageText);

  if (count) {
    const replyText = "草の数: " + count;
    replyMessage(replyToken, replyText);
  }
};

function replyMessage(replyToken: string, replyText: string): void {
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + LINE_TOKEN,
    },
    method: "post",
    payload: JSON.stringify({
      replyToken: replyToken,
      messages: [
        {
          type: "text",
          text: replyText,
        },
      ],
    }),
  });
}

const getWCount = (text: string) => {
  const replacedText = text.replace(/ｗ|W|Ｗ/g, "w");
  const count = (replacedText.match(/w/g) || []).length;
  return count;
};
