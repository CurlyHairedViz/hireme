const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Express',
    user: req.user 
  });
});

/* GET /about */
router.get('/about', (req, res) => {
  // Get the current date and pass it to the view for display
  let date = new Date();
  
  res.render('about', { 
    date : date,
    title: 'About this Site',
    user: req.user
  });
});

module.exports = router;
