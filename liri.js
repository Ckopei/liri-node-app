require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var commands = process.argv[2];
//take the process.argv and removes the first 3 items in the array, being node, lirijs, and command. Joins them all with a space.
var userInput = process.argv.slice(3).join(" ");

//four function. 
function spotifyThis(input) {
    spotify
  .search({ type: 'track', query: input, limit: 1 })
  .then(function(response) {
    // console.log(JSON.stringify(response, null, 2));
    console.log("Artist: " +response.tracks.items[0].artists[0].name)
    console.log("Song: " +response.tracks.items[0].name)
    console.log("Preview link: "+response.tracks.items[0].external_urls.spotify)
    console.log("Album: " +response.tracks.items[0].album.name)
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

