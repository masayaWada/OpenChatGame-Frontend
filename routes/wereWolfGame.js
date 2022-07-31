var express = require("express");
var router = express.Router();
const request = require("request");
const axios = require("axios");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// ログイン画面を表示する
router.get("/login", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  async function asyncFunc() {
    //APIを呼び出す(メンバー一覧を取得)
    const apiResponse = await axios.get(
      `${config.rootURL}/wereWolf/members/get`
    );
    //APIの内容を元にレスポンスを返す
    res.render("wereWolfGame/login", {
      memberList: apiResponse.data,
      activeTab: "",
    });
  }
  asyncFunc();
});

//以下、管理者用===================================================
// ゲーム準備
router.get("/standby/0/1432", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  // 役職の振り分けを実行
  const allocateOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/functions/allocate/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
  };
  request(allocateOptions, function (error, response, allocateBody) {
    // チャットのリセットを実行
    const resetChatOptions = {
      method: "GET",
      json: true,
      url: `${config.rootURL}/wereWolf/talks/reset/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
    };
    request(resetChatOptions, function (error, response, resetChatBody) {
      // フェーズのリセットを実行
      const resetPhaseOptions = {
        method: "GET",
        json: true,
        url: `${config.rootURL}/wereWolf/phase/reset/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
      };
      request(resetPhaseOptions, function (error, response, resetPhaseBody) {
        // 連絡のリセットを実行
        const resetInfoOptions = {
          method: "GET",
          json: true,
          url: `${config.rootURL}/wereWolf/infomations/reset/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
        };
        request(resetInfoOptions, function (error, response, resetInfoBody) {
          // URLを定義
          const targetURL = `/wereWolfGame/home/0/1432`;
          res.render("wereWolfGame/onload", {
            targetURL: targetURL,
          });
        });
      });
    });
  });
});

// ホーム画面を表示する
router.get("/home/0/1432", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  // 最新日の選択状況を取得
  const latestPhaseOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/phase/get/latest/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
  };
  request(latestPhaseOptions, function (error, response, latestPhaseBody) {
    // メンバーの一覧を取得する。
    const memberListOptions = {
      method: "GET",
      json: true,
      url: `${config.rootURL}/wereWolf/members/get/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
    };
    request(memberListOptions, function (error, response, memberListBody) {
      // ユーザー情報を定義
      const userInfo = { id: 0, password: 1432 };
      const myInfo = { myInfo: { job_name: "管理者" } };
      //レスポンスを送る
      res.render("wereWolfGame/home", {
        userInfo: userInfo,
        myInfo: myInfo,
        latestPhase: latestPhaseBody[0],
        memberList: memberListBody,
        activeTab: "ホーム",
      });
    });
  });
});

// チャット画面を表示する
router.get("/chat/0/1432", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  // メンバーの情報を取得する。
  const chatOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/talks/get/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
  };
  request(chatOptions, function (error, response, chatListBody) {
    // ユーザー情報を定義
    const userInfo = { id: 0, password: 1432 };
    res.render("wereWolfGame/chat", {
      userInfo: userInfo,
      myInfo: { myInfo: { job_id: 1, died: 0 } },
      chatList: chatListBody,
      talkRoomName: "人狼チャット",
      activeTab: "チャット",
    });
  });
});

// 役職画面を表示する
router.get("/job/0/1432", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  // 最新日の選択状況を取得
  const latestPhaseOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/phase/get/latest/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
  };
  request(latestPhaseOptions, function (error, response, latestPhaseBody) {
    // 生存者一覧を取得する。
    const memberListOptions = {
      method: "GET",
      json: true,
      url: `${config.rootURL}/wereWolf/members/get/live`,
    };
    request(memberListOptions, function (error, response, memberListBody) {
      // ユーザー情報を定義
      const userInfo = { id: 0, password: 1432 };
      res.render("wereWolfGame/admin", {
        userInfo: userInfo,
        latestPhase: latestPhaseBody[0],
        memberList: memberListBody,
        message: "この画面で管理者としての操作を行ってください。",
        activeTab: "役職",
      });
    });
  });
});

// フェーズを進める。
router.get("/nextPhase/0/1432", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  // 最新日の選択状況を取得
  const nextPhaseOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/phase/next/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
  };
  request(nextPhaseOptions, function (error, response, nextPhaseBody) {
    // URLを定義
    const targetURL = `/wereWolfGame/job/0/1432`;
    res.render("wereWolfGame/onload", {
      targetURL: targetURL,
    });
  });
});

// 処刑対象を選択。
router.get("/execution/0/1432/:tarId", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const tarId = req.params.tarId;
  // 最新日を取得
  const latestDayOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/phase/get/latest/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
  };
  request(latestDayOptions, function (error, response, latestDayBody) {
    // 処刑対象を更新
    const executionOptions = {
      method: "GET",
      json: true,
      url: `${config.rootURL}/wereWolf/phase/update/execution/${tarId}/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
    };
    request(executionOptions, function (error, response, executionBody) {
      // URLを定義
      const targetURL = `/wereWolfGame/job/0/1432`;
      res.render("wereWolfGame/onload", {
        targetURL: targetURL,
      });
    });
  });
});

// 死亡通知を送る。
router.get("/dead/0/1432/:tarId/:type", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const tarId = req.params.tarId;
  const type = req.params.type;
  // 死亡通知を送る
  const executionOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/functions/update/dead/${tarId}/${type}/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
  };
  request(executionOptions, function (error, response, executionBody) {
    // URLを定義
    const targetURL = `/wereWolfGame/job/0/1432`;
    res.render("wereWolfGame/onload", {
      targetURL: targetURL,
    });
  });
});

// ニュース画面を表示する
router.get("/news/0/1432", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  // ニュース一覧を取得する。
  const newsOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/infomations/get`,
  };
  request(newsOptions, function (error, response, newsListBody) {
    // ユーザー情報を定義
    const userInfo = { id: 0, password: 1432 };
    res.render("wereWolfGame/news", {
      userInfo: userInfo,
      newsList: newsListBody,
      activeTab: "連絡",
    });
  });
});

// 役職一覧を表示する
router.get("/jobList/0/1432", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  // ニュース一覧を取得する。
  const jobListOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/jobs/get`,
  };
  request(jobListOptions, function (error, response, jobListBody) {
    // ユーザー情報を定義
    const userInfo = { id: 0, password: 1432 };
    res.render("wereWolfGame/jobList", {
      userInfo: userInfo,
      jobList: jobListBody,
      activeTab: "役職一覧",
    });
  });
});

// 役職情報を表示する
router.get("/jobInfo/0/1432/:jobId", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const jobId = req.params.jobId;
  // 役職一覧を取得する。
  const jobListOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/jobs/get/${jobId}`,
  };
  request(jobListOptions, function (error, response, jobInfoBody) {
    // ユーザー情報を定義
    const userInfo = { id: 0, password: 1432 };
    res.render("wereWolfGame/jobInfo", {
      userInfo: userInfo,
      jobInfo: jobInfoBody[0],
      activeTab: "役職一覧",
    });
  });
});
//ここまで、管理者用===================================================

// ホーム画面を表示する
router.get("/home/:id/:password", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const id = parseFloat(req.params.id);
  const password = req.params.password;
  // 最新日の選択状況を取得
  const latestPhaseOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/phase/get/latest/zETQt7i_nQyxhbKRDJtdt4aMZU6R7J`,
  };
  request(latestPhaseOptions, function (error, response, latestPhaseBody) {
    // メンバーの情報を取得する。
    const myInfoOptions = {
      method: "GET",
      json: true,
      url: `${config.rootURL}/wereWolf/members/get/${id}/${password}`,
    };
    request(myInfoOptions, function (error, response, myInfoBody) {
      // メンバーの一覧を取得する。
      const memberListOptions = {
        method: "GET",
        json: true,
        url: `${config.rootURL}/wereWolf/members/get`,
      };
      request(memberListOptions, function (error, response, memberListBody) {
        // ユーザー情報を定義
        const userInfo = {
          id: myInfoBody.myInfo.id,
          password: myInfoBody.myInfo.password,
        };
        //メンバーリスト、追加情報をマージする。
        for (let j = 0; j < memberListBody.length; j++) {
          memberListBody[j] = {
            id: memberListBody[j].id,
            name: memberListBody[j].name,
            died: memberListBody[j].died,
            job_id: 0,
          };
        }
        if (myInfoBody.addInfo !== null) {
          // 追加情報がある場合、メンバー一覧にマージする
          for (let i = 0; i < myInfoBody.addInfo.length; i++) {
            for (let j = 0; j < memberListBody.length; j++) {
              if (myInfoBody.addInfo[i].id === memberListBody[j].id) {
                memberListBody[j] = {
                  id: memberListBody[j].id,
                  name: memberListBody[j].name,
                  died: memberListBody[j].died,
                  job_id: myInfoBody.addInfo[i].job_id,
                };
              }
            }
          }
        }
        //レスポンスを送る
        res.render("wereWolfGame/home", {
          userInfo: userInfo,
          memberList: memberListBody,
          latestPhase: latestPhaseBody[0],
          myInfo: myInfoBody,
          activeTab: "ホーム",
        });
      });
    });
  });
});

// チャット画面を表示する
router.get("/chat/:id/:password", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const id = parseFloat(req.params.id);
  const password = req.params.password;
  // 自身の情報を取得する。
  const myInfoOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/members/get/${id}/${password}`,
  };
  request(myInfoOptions, function (error, response, myInfoBody) {
    // メンバーの情報を取得する。
    const chatOptions = {
      method: "GET",
      json: true,
      url: `${config.rootURL}/wereWolf/talks/get/${id}/${password}`,
    };
    request(chatOptions, function (error, response, chatListBody) {
      // ユーザー情報を定義
      const userInfo = { id: id, password: password };
      res.render("wereWolfGame/chat", {
        userInfo: userInfo,
        myInfo: myInfoBody,
        chatList: chatListBody,
        activeTab: "チャット",
      });
    });
  });
});

// チャット画面で内容を送信する。
router.get("/chat/:id/:password/:content", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const id = parseFloat(req.params.id);
  const password = req.params.password;
  const content = encodeURI(req.params.content);
  // メンバーの情報を取得する。
  const chatOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/talks/insert/${content}/${id}/${password}`,
  };
  request(chatOptions, function (error, response, chatListBody) {
    // URLを定義
    const targetURL = `/wereWolfGame/chat/${id}/${password}`;
    res.render("wereWolfGame/onload", {
      targetURL: targetURL,
    });
  });
});

// 役職画面を表示する
router.get("/job/:id/:password", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const id = parseFloat(req.params.id);
  const password = req.params.password;
  // 自身の情報を取得する。
  const myInfoOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/members/get/${id}/${password}`,
  };
  request(myInfoOptions, function (error, response, myInfoBody) {
    // 役職IDをもとに表示メッセージを取得
    const messageArray = {
      0: "行える作業はありません。",
      1: "今夜、襲撃するプレイヤーを選んで下さい。",
      2: "行える作業はありません。",
      3: "行える作業はありません。",
      4: "今夜、占うプレイヤーを選んでください。",
      5: "今夜、護衛するプレイヤーを選んでください。",
      6: "昼ターンに処刑された人物の正体を知ることができます。",
      7: "行える作業はありません。",
      8: "銃撃するプレイヤーを選んでください。",
      9: "今夜、護衛するプレイヤーを選んでください。",
      10: "行える作業はありません。",
      11: "行える作業はありません。",
      12: "行える作業はありません。",
      13: "行える作業はありません。",
    };
    const message = messageArray[myInfoBody.myInfo.job_id];
    // 選択済みの場合、対象となっているプレーヤーを取得
    const selectedUserOptions = {
      method: "GET",
      json: true,
      url: `${config.rootURL}/wereWolf/phase/get/${myInfoBody.myInfo.job_id}/${id}/${password}`,
    };
    request(selectedUserOptions, function (error, response, selectedUserBody) {
      console.log(selectedUserBody);
      // 生存者一覧を取得する。
      const memberListOptions = {
        method: "GET",
        json: true,
        url: `${config.rootURL}/wereWolf/members/get/live`,
      };
      request(memberListOptions, function (error, response, memberListBody) {
        // ユーザー情報を定義
        const userInfo = { id: id, password: password };
        res.render("wereWolfGame/job", {
          userInfo: userInfo,
          selectedUser: selectedUserBody,
          myInfo: myInfoBody,
          message: message,
          memberList: memberListBody,
          activeTab: "役職",
        });
      });
    });
  });
});

// 役職画面の内容をDBに反映する
router.get("/job/:id/:password/:tarId", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const id = parseFloat(req.params.id);
  const password = req.params.password;
  const tarId = req.params.tarId;
  // メンバーの情報を取得する。
  const myInfoOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/members/get/${id}/${password}`,
  };
  request(myInfoOptions, function (error, response, myInfoBody) {
    // 役職IDをもとに役職名を取得
    const jobsArray = {
      1: "kill",
      4: "fortune",
      5: "protect",
      8: "shot",
      9: "dark_protect",
    };
    const jobName = jobsArray[myInfoBody.myInfo.job_id];
    // 対象者を登録する
    const memberListOptions = {
      method: "GET",
      json: true,
      url: `${config.rootURL}/wereWolf/phase/update/${jobName}/${tarId}/${id}/${password}`,
    };
    request(memberListOptions, function (error, response, memberListBody) {
      // URLを定義
      const targetURL = `/wereWolfGame/job/${id}/${password}`;
      res.render("wereWolfGame/onload", {
        targetURL: targetURL,
      });
    });
  });
});

// ニュース画面を表示する
router.get("/news/:id/:password", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const id = parseFloat(req.params.id);
  const password = req.params.password;
  // ニュース一覧を取得する。
  const newsOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/infomations/get`,
  };
  request(newsOptions, function (error, response, newsListBody) {
    // ユーザー情報を定義
    const userInfo = { id: id, password: password };
    res.render("wereWolfGame/news", {
      userInfo: userInfo,
      newsList: newsListBody,
      activeTab: "連絡",
    });
  });
});

// 役職一覧を表示する
router.get("/jobList/:id/:password", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const id = parseFloat(req.params.id);
  const password = req.params.password;
  // 役職一覧を取得する。
  const jobListOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/jobs/get`,
  };
  request(jobListOptions, function (error, response, jobListBody) {
    // ユーザー情報を定義
    const userInfo = { id: id, password: password };
    res.render("wereWolfGame/jobList", {
      userInfo: userInfo,
      jobList: jobListBody,
      activeTab: "役職一覧",
    });
  });
});

// 役職情報を表示する
router.get("/jobInfo/:id/:password/:jobId", function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  const id = parseFloat(req.params.id);
  const password = req.params.password;
  const jobId = req.params.jobId;
  // 役職一覧を取得する。
  const jobListOptions = {
    method: "GET",
    json: true,
    url: `${config.rootURL}/wereWolf/jobs/get/${jobId}`,
  };
  request(jobListOptions, function (error, response, jobInfoBody) {
    // ユーザー情報を定義
    const userInfo = { id: id, password: password };
    res.render("wereWolfGame/jobInfo", {
      userInfo: userInfo,
      jobInfo: jobInfoBody[0],
      activeTab: "役職一覧",
    });
  });
});

module.exports = router;
