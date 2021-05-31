const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import our models
const Fruit = require('../models/fruits.js');

// ROUTES
// INDEX
router.get('/', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        if (error) {
            res.send(error)
        } else {
            res.render('index.ejs', { 
                fruits: allFruits 
            });
        }
    })
});


// NEW
router.get('/new', (req, res) => {
    res.render('new.ejs');
});


// CREATE
router.post('/', (req, res) => {
    console.log(req.body);

    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    console.log(req.body);

    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits');
    });
});


// SHOW
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    Fruit.findById(req.params.id, (error, foundFruit) => {
        res.render('show.ejs', {
            fruit: foundFruit
        })
    })
});


// DELETE
router.delete('/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (error, deletedFruit) => {
        res.redirect('/fruits');
    });
});


// EDIT SHOW 
router.get('/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (error, foundFruit) => {
        res.render('edit.ejs', {
            fruit: foundFruit
        });
    });
});

// EDIT
router.put('/:id', (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
        res.redirect('/fruits');
    });
});

module.exports = router;