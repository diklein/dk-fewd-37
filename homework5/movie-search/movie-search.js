// This is what the data returning from IMDB will look like:
var sampleResult = {
  "Search": [
    {
      "Title": "Cool Runnings",
      "Type": "movie",
      "Year": "1993",
      "imdbID": "tt0106611"
    }
  ]
}

// Attach an event listener to the form submit (using jQuery)
$("#movie-search-form").submit(formSubmitted);

// Handle the form submission: go to OMDB and get results
function formSubmitted(event) {
  event.preventDefault();
  var url = "http://omdbapi.com/?s=" + $("#query").val();
  $.get(url, resultsReceived);
}

function resultsReceived(results) {

  for (var i = 0; i < results["Search"].length; i++) {

     // set up the variables
     var ul = document.querySelector("#movies");
     var li = document.createElement("li");
     var divMovie = document.createElement("div");
     var link = document.createElement("a");
     var divYear = document.createElement("div");

     // assign values
     li.classList.add("movie");
     divMovie.classList.add("movie-title");
     divYear.classList.add("movie-release-date");
     link.setAttribute("href","http://www.imdb.com/title/"+results["Search"][i]["imdbID"]);
     link.textContent = results["Search"][i]["Title"];
     divYear.textContent = results["Search"][i]["Year"];

     // build the list
     ul.appendChild(li);
     li.appendChild(divMovie);
     divMovie.appendChild(link);
     li.appendChild(divYear);

  }
}
