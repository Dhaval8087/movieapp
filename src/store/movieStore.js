import toastr from 'toastr';
import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher';
import movieActions from '../actions/movieActions';
import { EventEmitter } from 'events';
import Constants from '../constants/constants';
import _ from 'underscore';
import appconfig from '../config';

let _movies = [];
function loadTopMovies(data) {
    _movies = data;
}
function loadMovieDetails(data) {
    localStorage.removeItem("movieDetails");
    localStorage.setItem('movieDetails', JSON.stringify(data));
}
var movieStore = _.extend({}, EventEmitter.prototype, {

    // Emit Change event
    emitChange: function () {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    getTopMovies: function () {
        return _movies;
    },
    setCompareMoviesIds: function (ids) {
        localStorage.removeItem("movieIds");
        localStorage.setItem("movieIds", JSON.stringify(ids));
    },
    getCompareMoviesIds: function () {
        return JSON.parse(localStorage.getItem("movieIds"));
    },
    getMoviesDetails: function () {
        return JSON.parse(localStorage.getItem("movieDetails"));
    },
    loadMoviesDetails: function () {
        axios.post(appconfig.API_URL + 'getMovieDetails', {
            movieIds: movieStore.getCompareMoviesIds()
        }).then((response) => {
            movieActions.receiveMoviesDetails(response.data);
        }).catch(error => {
            toastr.error(error.response.data.error.message);
            movieActions.receiveTop10Movies([]);
        })
    },
    loadMovies: function (data) {
        axios.post(appconfig.API_URL + 'getMoviesByRank', {
            startRankIndex: 1,
            numMovies: 10
        }).then((response) => {
            movieActions.receiveTop10Movies(response.data);
        }).catch(error => {
            toastr.error(error.response.data.error.message);
            movieActions.receiveTop10Movies([]);
        })
    },

});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {

        // Respond to RECEIVE_TOP_MOVIES_RES action
        case Constants.RECEIVE_TOP_MOVIES_RES:
            loadTopMovies(action.data);
            break;
        case Constants.RECEIVE_MOVIES_DETAILS_RES:
            loadMovieDetails(action.data);
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    movieStore.emitChange();

    return true;

});

export default movieStore;
