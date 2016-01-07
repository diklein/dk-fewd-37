// This is what the data returning from IMDB will look like:
// var sampleResult = {
//   "Search": [
//     {
//       "Title": "Cool Runnings",
//       "Type": "movie",
//       "Year": "1993",
//       "imdbID": "tt0106611"
//     }
//   ]
// }

// Attach an event listener to the form submit (using jQuery)
//$("#movie-search-form").submit(formSubmitted);
$("#movie-search-form").on("submit", formSubmitted);

// Handle the form submission: go to OMDB and get results
function formSubmitted(event) {
  event.preventDefault();
  $( "#movies" ).empty();
  var url = "http://omdbapi.com/?s=" + $("#query").val();
  $.get(url, resultsReceived);
};

function resultsReceived(results) {
   console.log(results);
   if(results.Response == "False") {
      prompt("what the what");
   } else {
      for (var i = 0; i < results.Search.length; i++) {
         var movie = results["Search"][i];
         createMovie(movie.Title, "http://www.imdb.com/title/"+movie.imdbID, movie.Year);
      };
   };
};

function createMovie(movieTitle, url, year) {
   var item = $("<li>").addClass("movie").appendTo("#movies");
   var title = $("<div>").addClass("movie-title").appendTo(item);
   $("<a>").text(movieTitle).attr("href",url).appendTo(title);
   $("<div>").text(year).addClass("movie-release-date").appendTo(item);
};
