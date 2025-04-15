const express = require('express');
const cors = require('cors');
const { createAvatar } = require('@dicebear/core');
const { adventurer } = require('@dicebear/collection'); // 你也可以换别的风格

const app = express();
const port = 3000;

app.use(cors()); // 允许跨域请求

// 创建头像接口
app.get('/avatar', (req, res) => {
  const {
    seed = 'guest',
    hair = 'shortHair',
    beard = 'none',
    hairColor = 'blue',
    bgColor = '',
  } = req.query;

  const avatar = createAvatar(adventurer, {
    seed,
    backgroundColor: bgColor ? [bgColor] : undefined,
    hair: [hair],
    facialHair: [beard],
    hairColor: [hairColor],
  });

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(avatar.toString());
});

app.listen(port, () => {
  console.log(`✅ 头像生成服务已启动：http://localhost:${port}/avatar`);
});
