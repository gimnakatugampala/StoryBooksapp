const express = require('express')
const router = express.Router()

// @desc Login/Landing Page
// @route  GET /
router.get('/',(req,res) =>{
    res.send('Login')
})

// @desc Dashboard
// @route  GET /dashbaord
router.get('/',(req,res) =>{
    res.send('Login')
})

module.exports = router