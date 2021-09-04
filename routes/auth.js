const express = require('express')
const router = express.Router()
const passport =  require('passport')

// @desc auth with google
// @route  GET /
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  // @desc Google auth callback
// @route  GET / auth/google/callback

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

  // @desc Logout
  // @route /auth/logout
  router.get('/auth/logout',(req,res) =>{
    req.logout()
    res.redirect('/')
  })





module.exports = router