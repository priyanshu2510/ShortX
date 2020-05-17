const express = require("express");
 const router = express.Router();

 const url = require('./url');
//  const auth =require('./auth')
 

 router.use('/url', url);
//  router.use('/auth', auth);
 


 module.exports = router;