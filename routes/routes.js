'use strict'

var express = require('express');
var router = express.Router();
var Movie = require('../app/models/movie');

var count = 0;

router.use(function(req, res, next) {
    count++;
    console.log('API hit count = %s', count);
    next();
});

// /movies post(create new movie) get(see all movies)
router.route('/movies')
    .post(function(req,res) {
        var movie = new Movie();
        movie.title = req.body.title;
        movie.genre = req.body.genre;
        movie.actors = req.body.actors;
        movie.year = req.body.year;
        movie.rating = req.body.rating;

        //save the movie and checkfor errors
        movie.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({message: "Movie created!"});
            }    
        });

    })
    
    .get(function(req, res) {
        
        Movie.find(function(err, movies) {
            if (err) res.send(err);

            res.json(movies);
        })
    });

// /movies/:title route to get specific movie and put to update
//TODO make unique movieId and assign to Mongo _id
router.route('/movies/:title')
    .get(function(req, res) {
        var query = {_id: req.params._id};
        Movie.findOne(query, function(err, movie) {
            if (err) res.send(err);

            res.json(movie);
        });
    })

    .put(function(req, res) {
        
        var query = {_id: req.params._id};
        Movie.findOne(query, function(err, movie) {
            if (err) res.send(err);

            movie.title = req.body.title;
            movie.genre = req.body.genre;
            movie.actors = req.body.actors;
            movie.year = req.body.year;
            movie.rating = req.body.rating;

            movie.save(function(err) {
                if (err) res.send(err);
                res.json({message: "Movie Updated"});
            });
        });
    })

    .delete(function(req, res) {
        Movie.remove({
            _id: req.params._id
        }, function(err, movie) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;