const express = require('express');
const router = express.Router();
const City = require('../models/city.js');

// GET: /cities/create => show new city form
router.get('/create', (req, res) => {
    res.render('cities/create',{
        user: req.user
    });
});

// POST: /cities/create =>
router.post('/create', (req, res) => {
    City.create(req.body, (err, newDocument) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

module.exports = router;