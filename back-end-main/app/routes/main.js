const express = require('express')
const router = express.Router()

router.get('/',(req,res)=> {
	res.sendFile('/home/front-end/frontend/dist/frontend/index.html')
})

module.exports = router
