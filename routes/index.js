const express = require('express')
const router = express.Router()

// @desc Login/Landing Page
// @route  GET /
router.get('/',(req,res) =>{
    res.render('login',{
        layout:'login'
    })
})

// @desc Dashboard
// @route  GET /dashbaord
router.get('/dashboard',(req,res) =>{
    res.render('dashboard')
})

module.exports = router