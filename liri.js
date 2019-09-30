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
      console.log("")
      console.log("Artist: " + response.tracks.items[0].artists[0].name)
      console.log("Song: " + response.tracks.items[0].name)
      console.log("Preview link: " + response.tracks.items[0].external_urls.spotify)
      console.log("Album: " + response.tracks.items[0].album.name)
      console.log("")
    })
    .catch(function (err) {
      console.log(err);
    });
}

function concertThis(input) {
  axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
    function (response) {
      //loop through every response and output for each.
      for (let i = 0; i < response.data.length; i++) {
        console.log("")
        console.log("Venue: " + response.data[i].venue.name);
        console.log("Location: " + response.data[i].venue.city);
        //Week4/Day_03/21
        console.log("Time: " + moment(response.data[i].datetime).format("MM/DD/YYYY hh:mm"))
        console.log("")
      }
    }).catch(function (err) {
      console.log(err);
    });

}
function movieThis(input) {
  //if the user gives no movie input, we output the details for Mr. Nobody.
  if (input === "") {
    axios.get("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy").then(
      function (response) {
        console.log("")
        console.log("Title: " + response.data.Title)
        console.log("Year: " + response.data.Year)
        console.log("IMDB Rating: " + response.data.imdbRating)
        console.log("Rotten Tomatoes Rating: " + response.data.Metascore)
        console.log("Produced in: " + response.data.Country)
        console.log("Language: " + response.data.Language)
        console.log("Plot: " + response.data.Plot)
        console.log("Actors: " + response.data.Actors)
        console.log("")
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  //If there is an input, search for it.
  else {
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
      function (response) {
        console.log("")
        console.log("Title: " + response.data.Title)
        console.log("Year: " + response.data.Year)
        console.log("IMDB Rating: " + response.data.imdbRating)
        console.log("Rotten Tomatoes Rating: " + response.data.Metascore)
        console.log("Produced in: " + response.data.Country)
        console.log("Language: " + response.data.Language)
        console.log("Plot: " + response.data.Plot)
        console.log("Actors: " + response.data.Actors)
        console.log("")
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
function doWhatItSays() {
  // for 
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      throw error;
    }
    var dataArr = data.split(",")
    switch (dataArr[0]) {
      case "spotify-this-song":
        spotifyThis(dataArr[1])
        break;
      case "movie-this":
        movieThis(dataArr[1]);
        break;
      case "concert-this":
        concertThis(dataArr[1])
        break;
      default:
        break;

    }
  })
}
//switch statement with functions in them.

switch (commands) {
  case "spotify-this-song":
    spotifyThis(userInput)
    break;
  case "movie-this":
    movieThis(userInput);
    break;
  case "concert-this":
    concertThis(userInput)
    break;
  case "do-what-it-says":
    doWhatItSays()
    break;

  default:
    break;
}

