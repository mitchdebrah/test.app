const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Import models
const Birdes = require('../models/endgbirds.js');


router.get('/', (req, res) => { res.send(' say what!!') });

router.get('/birds', (req, res) => {
    Birdes.find({}, (err, displayAllItems) => {
        if (err) { res.send(err) }
        else { res.render('index.ejs', { birds: displayAllItems }) }
    });
});

// new
router.get('/birds/new', (req, res) => { 
   req.session.currentUser
  res.render('new.ejs') 
});

router.get('/birds/survey', (req, res) => { 
    req.session.currentUser
   res.render('survey.ejs') 
 });

router.post('/birds', (req, res) => {
    console.log(req.body);

    Birdes.create(req.body, (err, createdBirdes) => { res.redirect('/birds')});
});

// show
router.get('/birds/:id', (req, res) => {
    Birdes.findById(req.params.id, (err, editItems) => {
        res.render('show.ejs', { bird: editItems })
    })
});

// delete
router.delete('/birds/:id', (req, res) => {
    Birdes.findByIdAndRemove(req.params.id, (err, removeItems) => {
        res.redirect('/birds')
    });
});

// edit
router.get('/birds/:id/edit', (req, res) => {
    Birdes.findById(req.params.id, (err, editItems) => {
        res.render('edit.ejs', { bird: editItems });
    });
});

router.put('/birds/:id', (req, res) => {
   Birdes.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, showItems) => {
        res.render('show.ejs', { bird: showItems });
    });
});

//buy
router.put('/birds/buy/:id', (req, res) => {
    Birdes.findByIdAndUpdate(req.params.id, {population:req.query.population-1}, {new:true}, (err, showItems) => {
        res.redirect('/birds/' + req.params.id);
    });
});

module.exports = router;