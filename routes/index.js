var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Bootstrap Sample. */
router.get("/sample", function (req, res, next) {
  res.render("sample", { title: "Express" });
});

module.exports = router;
