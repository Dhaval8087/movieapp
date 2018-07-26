var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/constants');

var movieActions = {

   //
   // ──────────────────────────────────────────────────────────────────────────────────── I ──────────
   //   :::::: R E C E I V E   M O V I E   R E S P O N S E : :  :   :    :     :        :          :
   // ──────────────────────────────────────────────────────────────────────────────────────────────
   //
  receiveTop10Movies: function (data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_TOP_MOVIES_RES,
      data: data
    })
  },
  //
  // ──────────────────────────────────────────────────────────────────────────────────────────────────── II ──────────
  //   :::::: R E C E I V E   M O V I E   D E T A I L S   R E S P O N S E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //
  receiveMoviesDetails: function (data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_MOVIES_DETAILS_RES,
      data: data
    })
  }
};
module.exports = movieActions;