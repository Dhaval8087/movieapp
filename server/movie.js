var rp = require('request-promise');
var config = require('./config');


//
// ──────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: G E T   A L L   T H E   M O V I E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────
//
function getAllMovies(req, res) {
    let options = {
        method: 'GET',
        uri: config.API + config.AllMovies,
        qs: {
            "authToken": config.authToken
        },
        json: true // Automatically stringifies the body to JSON
    };
    rp(options)
        .then(function (result) {
            res.json(result)
        })
        .catch(function (err) {
            res.status(500);
            res.json(err.error);
        });
}
//
// ────────────────────────────────────────────────────────────────────────────────────────── II ──────────
//   ::::::  G E T   T H E   M O V I E S   B Y   R A N K : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────
//
function getMoviesByRank(req, res) {

    let options = {
        method: 'GET',
        uri: config.API + config.MoviesByRank,
        qs: {
            "authToken": config.authToken,
            "startRankIndex": req.body.startRankIndex,
            "numMovies": req.body.numMovies
        },
        json: true // Automatically stringifies the body to JSON
    };
    rp(options)
        .then(function (result) {
            res.json(result)
        })
        .catch(function (err) {
            res.status(500);
            res.json(err.error);
        });
}
//
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────── III ──────────
//   :::::: G E T   T H E   M O V I E S   D E T A I L S   B Y   M O V I E   I D S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
function getMovieDetails(req, res) {
    let options = {
        method: 'GET',
        uri: config.API + config.MovieDetails,
        qs: {
            "authToken": config.authToken,
            "movieIds": req.body.movieIds
        },
        json: true // Automatically stringifies the body to JSON
    };

    rp(options)
        .then(function (result) {
            res.json(result)
        })
        .catch(function (err) {
            res.status(500);
            res.json(err.error);
        });
}

exports.getAllMovies = getAllMovies;
exports.getMoviesByRank = getMoviesByRank
exports.getMovieDetails = getMovieDetails;