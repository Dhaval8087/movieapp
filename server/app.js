const express = require('express');
const app = express();
const movie = require('./movie');
const path = require('path');
const bodyParser = require("body-parser");

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 8000;

const movieRouter = express.Router();

movieRouter.route('/allMovies').get(movie.getAllMovies);
movieRouter.route('/getMoviesByRank').post(movie.getMoviesByRank);
movieRouter.route('/getMovieDetails').post(movie.getMovieDetails);
app.use('/api', movieRouter);

app.get('/', (req, res) => {
    res.send('welcome to my API');
});

app.listen(port, () => {
    console.log("Running on PORT :" + port);
})