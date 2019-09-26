require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var commands = process.argv[2];
var userInput = process.argv[3];

//four function. 
function spotifyThis(input) {
    spotify
  .search({ type: 'track', query: input })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

}

function concertThis() {

}
function movieThis() {

}
function doWhatItSays() {

}
//switch statement with functions in them.

switch (commands) {
    case "spotify-this-song":
        spotifyThis(userInput)
        break;
    case "movie-this":
        movieThis();
        break;
    case "concert-this":
        concertThis()
        break;
    case "do-what-it-says":
        doWhatItSays()
        break;

    default:
        break;
}

