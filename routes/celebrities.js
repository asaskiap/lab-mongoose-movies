const express = require('express');
const Celebrity = require('./../models/celebrity');

// instantiate new router
// correct syntax with "new"
const router = new express.Router();

router.get('/celebrities', (req, res, next) => {
    Celebrity.find({})
        .then((celebs) => {
            res.render('celebrities/index', {
                celebs: celebs
            });
        })
        .catch((error) => {
            next(error);
        });
});

router.post('/celebrities', (req, res, next) => {
    const celeb = new Celebrity({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    });
    // celebrity
    //     .create({
    //         name: celeb.name,
    //         occupation: celeb.occupation,
    //         catchPhrase: celeb.catchPhrase
    //     })
    celeb
        .save()
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch(() => {
            res.render('/create');
        });
});

router.get('/create', (req, res, next) => {
    res.render('create');
});

router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
        .then((celeb) => {
            console.log(celeb);
            res.render('celebrities/show', {
                celeb: celeb
            });
        })
        .catch((error) => {
            next(error);
        });
});

//edit
router.post('/celebrities/:id', (req, res, next) => {
    const celeb = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };
    Celebrity.findByIdAndUpdate(req.params.id, celeb)
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((error) => {
            next(error);
        });
});

router.post('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((error) => {
            next(error);
        });
});

//edit
router.get(`/celebrities/:id/edit`, (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
        .then((celeb) => {
            res.render('celebrities/edit', {
                celeb: celeb
            });
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;