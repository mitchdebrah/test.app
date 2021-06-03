const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Import models
const Ytvideos = require('../models/ytvideos.js');

router.get('/', (req, res) => { res.send(' say what!!') });

router.get('/yvideos', (req, res) => {
    Ytvideos.find({}, (err, displayItems) => {
        if (err) { res.send(err) }
        else { res.render('index.ejs', { yvideos: displayItems }) }
    });
});

// new
router.get('/yvideos/new', (req, res) => { 
  res.render('new.ejs') 
});

router.post('/yvideos', (req, res) => {
    console.log(req.body);

    Ytvideos.create(req.body, (err, createdYtvideos) => { res.redirect('/yvideos')});
});

// show
router.get('/yvideos/:id', (req, res) => {
    Ytvideos.findById(req.params.id, (err, editItems) => {
        res.render('show.ejs', { Ytvideos: editItems })
    })
});

// delete
router.delete('/yvideos/:id', (req, res) => {
    Ytvideos.findByIdAndRemove(req.params.id, (err, removeItems) => {
        res.redirect('/yvideos')
    });
});

// edit
router.get('/yvideos/:id/edit', (req, res) => {
    Ytvideos.findById(req.params.id, (err, editItems) => {
        res.render('edit.ejs', { Ytvideos: editItems });
    });
});

router.put('/yvideos/:id', (req, res) => {
    Ytvideos.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, showItems) => {
        res.render('show.ejs', { Ytvideos: showItems });
    });
});

//buy
router.put('/yvideos/buy/:id', (req, res) => {
    Ytvideos.findByIdAndUpdate(req.params.id, {subscribers:req.query.subscribers-1}, {new:true}, (err, showItems) => {
        res.redirect('/yvideos/' + req.params.id);
    });
});

module.exports = router;