const express = require('express')
const router = express.Router()

router.get('/',(req,res)=> {
	res.sendFile('../front-end-main/dist/index.html')
})

module.exports = router
