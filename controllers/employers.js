const express = require('express');
const router = express.Router();

// add fs to read the data file
// const fs = require('fs');

// use Employer model for CRUD w/mongoose
const Employer = require('../models/employer');
const City = require('../models/city');

// global auth check to make most methods private
const global = require('../controllers/globalFunctions');

/* GET employers index (the module home page) */
router.get('/', (req, res) => {
    
    // const employers = [
    //     {
    //         "name": "Provix"
    //     },
    //     {
    //         "name": "Element6"
    //     },
    //     {
    //         "name": "Netgain"
    //     },
    //     {
    //         "name": "44 North"
    //     }
    // ];
    // res.render('employers/index', {
    //     title: 'Employer List',
    //     employers: employers
    // });
    
    
    // get data from json file
    /*fs.readFile('./data/employers.json', 'utf8', (err, employers) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(employers);
            res.render('employers/index', { 
                title : 'Employer List',
                employers: JSON.parse(employers)
            });
        }
    });*/

    // get data from mongodb using the employer model
    Employer.find((err, employers) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(employers);
            res.render('employers/index', { 
                title : 'Employer List',
                employers: employers
            });
        }
    });
});

/* GET /create - display form to add an employer */
// injecting our auth check function as middleware for security
router.get('/create', global.isAuthenticated, (req, res) => {
    // use City model to fetch list of cities from db to populate city dropdown
    City.find((err, cities) => {
        if(err) {
            console.log(err);
        }
        else{
            res.render('employers/create', {
                cities: cities
            });
        }
    }).sort('name');
});

/* POST /create - submit form data to mongodb */
router.post('/create', global.isAuthenticated, (req, res) => {
    Employer.create(req.body, (err, newDocument) =>{
        if(err) {
            console.log(err);
        }
        else {
            res.redirect('/employers');
        }
    });
})

/* GET /delete/abc123 => delete selected employer document using the url param */ 
router.get('/delete/:_id', global.isAuthenticated, (req, res) => {
    Employer.remove({ _id: req.params._id }, (err) => {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect('/employers');
        }
    })
});

/* GET /edit/asb23 => fetch & display selected employer */
router.get('/edit/:_id', global.isAuthenticated, (req, res) => {
    Employer.findById(req.params._id, (err, employer) => {
        if(err) {
            console.log(err);
        }
        else {
            City.find((err, cities) => {
                if(err){
                    console.log(err);
                }
                else {
                    res.render('employers/edit', {
                        employer: employer,
                        title: 'Edit Emplyer Details',
                        cities: cities
                    });
                }
            }).sort('name');
        }
    });
});


/* POST /edit/abc123 => update selected employer */
router.post('/edit/:_id', global.isAuthenticated, (req, res) => {
    Employer.findByIdAndUpdate({ _id: req.params._id}, req.body, null ,(err)=>{
        if(err) {
            console.log(err);
        }
        else {
            res.redirect('/employers');
        }
    });
});


// make public
module.exports = router;