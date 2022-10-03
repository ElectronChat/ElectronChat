const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/home', (req, res,next)=>{
  res.sendFile('../front-end/electron-chat/dist/electron-chat/index.html');
});
module.exports = router;
