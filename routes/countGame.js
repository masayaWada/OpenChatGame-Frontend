var express = require("express");
var router = express.Router();
const request = require("request");
const config = require("./../public/conf/config.json");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// ゲーム準備(順番割振り)
router.get("/standby", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  // 順番の振り分けを実行
  const allocateOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/countGame/functions/allocate`,
  };
  request(allocateOptions, function (error, response, allocateBody) {
    // URLを定義
    const targetURL = `/countGame/home`;
    res.render("wereWolfGame/onload", {
      targetURL: targetURL,
    });
  });
});

// ホーム画面を表示する
router.get("/home", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  // ユーザー一覧を取得
  const memberListOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/countGame/members/get`,
  };
  request(memberListOptions, function (error, response, memberListBody) {
    //クリップボードに張り付ける内容を生成
    var clipboardBody = "";
    for (var i = 0; i < memberListBody.length; i++) {
      clipboardBody = clipboardBody + memberListBody[i].sequential + "番目";
      clipboardBody = clipboardBody + ":";
      clipboardBody = clipboardBody + memberListBody[i].name;
      clipboardBody = clipboardBody + "　";
    }

    //レスポンスを送る
    res.render("countGame/home", {
      memberList: memberListBody,
      clipboard: clipboardBody,
      activeTab: "ホーム",
    });
  });
});

// 参加者追加
router.get("/home/add/:name", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const name = encodeURI(req.params.name);
  // ユーザーを追加
  const memberListOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/countGame/members/add/${name}`,
  };
  request(memberListOptions, function (error, response, memberListBody) {
    // URLを定義
    const targetURL = `/countGame/home`;
    res.render("wereWolfGame/onload", {
      targetURL: targetURL,
    });
  });
});

// 参加者削除
router.get("/home/delete/:id", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const id = parseFloat(req.params.id);
  // ユーザーを削除
  const memberListOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/countGame/members/delete/${id}`,
  };
  request(memberListOptions, function (error, response, memberListBody) {
    // URLを定義
    const targetURL = `/countGame/home`;
    res.render("wereWolfGame/onload", {
      targetURL: targetURL,
    });
  });
});

module.exports = router;
