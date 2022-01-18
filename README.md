# 概要 #

メッセージに対して「w」の数をカウントして返信するLINE bot用のソースです。

### 構成概要 ###

 - 本ソースをGASにwebアプリとしてデプロイ。
 - LINE Developerにて作成したbotアカウントのwebhook URLにデプロイしたURLを指定。
 - リクエストを受け取ると「w」をカウントして、その結果を返信。

### Github Actionsによるデプロイ ###

 - mainブランチにpushされた場合、Github ActionsによりGASスクリプトの自動デプロイを行います。
 - ログイン情報はRepository Secretsに設定している内容をもとに定義しています。
 - デプロイのたびにURLが変わらないよう、デプロイIDを指定しています。  
※詳細は「action.yml」を確認  
※claspの仕様については割愛  
  
### Repository Secretsに定義する変数 ###
ログイン情報などは直接記載せずにSECRETSから取得する。
  
| SECRETS変数   | 説明 | 
| :------------- | :----: | 
| ACCESS_TOKEN  |   clasp loginで作成される.clasprc.jsonに記載   | 
| CLIENT_ID     |  〃 | 
| CLIENT_SECRET |  〃 | 
| ID_TOKEN      |  〃 | 
| REFRESH_TOKEN |  〃 | 
| DEPLOYMENT_ID |   GASスクリプトのデプロイID   | 
  
  
### GASのScript Propertyに定義する変数 ###
| SECRETS変数   | 説明 | 
| :------------- | :----: | 
| LINE_TOKEN  |  LINE botを使用するためのtoken<br>LINE Developerのアカウントページで確認できる  | 
| GSS_ID     | ログ出しする場合のGSSのID<br>GSSのURLから取得できる | 
| GSS_SHEET_NAME | ログ出しする場合のGSSのシート名称 | 

※GSS_ID、GSS_SHEET_NAMEはオプション、指定のない場合はログ出力処理は行われない。