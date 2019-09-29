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


function spotifyThis(input) {
  spotify
    .search({ type: 'track', query: input, limit: 1 })
    .then(function (response) {
      // console.log(JSON.stringify(response, null, 2));
      console.log("Artist: " + response.tracks.items[0].artists[0].name)
      console.log("Song: " + response.tracks.items[0].name)
      console.log("Preview link: " + response.tracks.items[0].external_urls.spotify)
      console.log("Album: " + response.tracks.items[0].album.name)
    })
    .catch(function (err) {
      console.log(err);
    });
}

function concertThis() {

}
function movieThis() {
  //if the user gives no movie input, we output the details for Mr. Nobody.
  if (userInput === "") {
    axios.get("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy").then(
      function (response) {
        // Then we print out the imdbRating
        // console.log(response);
        console.log("Title: " + response.data.Title)
        console.log("Year: " + response.data.Year)
        console.log("IMDB Rating: " + response.data.imdbRating)
        console.log("Rotten Tomatoes Rating: " + response.data.Metascore)
        console.log("Produced in: " + response.data.Country)
        console.log("Language: " + response.data.Language)
        console.log("Plot: " + response.data.Plot)
        console.log("Actors: " + response.data.Actors)
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  //If there is an input, search for it.
  else {
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
      function (response) {
        // Then we print out the imdbRating
        // console.log(response);
        console.log("Title: " + response.data.Title)
        console.log("Year: " + response.data.Year)
        console.log("IMDB Rating: " + response.data.imdbRating)
        console.log("Rotten Tomatoes Rating: " + response.data.Metascore)
        console.log("Produced in: " + response.data.Country)
        console.log("Language: " + response.data.Language)
        console.log("Plot: " + response.data.Plot)
        console.log("Actors: " + response.data.Actors)
      })
      .catch(function (err) {
        console.log(err);
      });
  }
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

