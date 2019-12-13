const express = require("express");

const app = express();

// 定义get 接口
app.get("/api/info", (req, res) => {
  res.json({
    msg: "hello webpack"
  });
});

app.listen("9092");