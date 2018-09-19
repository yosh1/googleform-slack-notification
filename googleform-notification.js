// Google App Script

function sendToSlack(body, channel) {
  var url = "/*https://hooks.slack.com/services/**************************/";    // 先ほど取得したアドレスを入力
  var data = { "channel" : channel, "username" : "GoogleForm Notification", "text" : body , "icon_url" : "/*画像URL*/" };
              // , "icon_emoji" : ":date: " };
  var payload = JSON.stringify(data);
  var options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload
  };
  var response = UrlFetchApp.fetch(url, options);
}

function test() {
  sendToSlack("Test Notification", "#お問い合わせ内容");    //  (内容,チャンネル名)
}

function onFormSubmit(e){

  var body = " <!channel> *お問い合わせが来ました!* \n"; 
  var applicant = "";
  var itemResponse = e.response.getItemResponses();

  for (var j = 0; j < itemResponse.length; j++){    
    var formData = itemResponse[j];
    var title = formData.getItem().getTitle();
    var response = formData.getResponse();

    switch (title) {
      case "お名前":
        name = response;
        break;
      case "メールアドレス":
        mail = response;
        break;
      case "お問い合わせ内容":
        content = response;
        break;
      default:
        break;
    }
  }
  var fullWord =  body + " `名前` " + name + "\n `メール` " + mail + "\n `内容` " + content ;
  sendToSlack(fullWord, "#お問い合わせ内容");
}
