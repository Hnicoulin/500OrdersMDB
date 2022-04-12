
let movieArray = [];

// define a constructor to create movie objects
let MovieObject = function (pTitle, pYear, pGenre) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.Title = pTitle;
    this.Year = pYear;
    this.Genre = pGenre;  // action  comedy  drama  horrow scifi  musical  western
    this.Time = GetTimeString();
}

function GetTimeString(){
    let timeElapsed = Date.now();
    let rightNow = new Date(timeElapsed);
    
    return rightNow.toISOString();
}

let selectedGenre = "not selected";

document.addEventListener("DOMContentLoaded", function () {

    createList();

// add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
        let newMovie = new MovieObject(document.getElementById("title").value, 
        document.getElementById("year").value, selectedGenre);

        fetch('/AddMovie', {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json),
            createList()
            )
            .catch(err => console.log(err));
    });

    document.getElementById("buttonGet").addEventListener("click", function () {
        createList();      
    });

    document.getElementById("buttonDrama").addEventListener("click", function () {
        createListDrama();      
    });
    


    let primeTitle = ["The Shawshank Redemption", "The Godfather", "The Godfather: Part II",
     "The Dark Knight", "12 Angry Men", "Schindlers List", "The Return of the King", ];
    let primeYear = [1994, 1972, 1974, 2008, 1957, 1994, 2003]; //Shindler is really 93
    let primeGenre = ["drama", "drama", "drama", "SciFi", "drama", "drama", "SciFi"];

    document.getElementById("buttonLoad").addEventListener("click", function () {

        for(let i=0; i < 7; i++){
            let newMovie = new MovieObject(primeTitle[i], primeYear[i], primeGenre[i]); 
            fetch('/AddMovie', {
                method: "POST",
                body: JSON.stringify(newMovie),
                headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json),
                createList()
                )
                .catch(err => console.log(err));
        }

        createList();      
    });
   

    document.getElementById("buttonDelete").addEventListener("click", function () {
        deleteMovie(document.getElementById("deleteID").value);      
    });
    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("title").value = "";
        document.getElementById("year").value = "";
    });

    document.getElementById("select-genre").addEventListener("change", function (event, ui) {
        selectedGenre = document.getElementById("select-genre").options[document.getElementById("select-genre").selectedIndex].value
    });

  

});  
// end of wait until document has loaded event  *************************************************************************


function createList() {
// update local array from server

    fetch('/getAllMovies')
    // Handle success
    .then(response => response.json())  // get the data out of the response object
    .then( responseData => fillUL(responseData))    //update our array and li's
    .catch(err => console.log('Request Failed', err)); // Catch errors
};

function createListDrama() {
    // update local array from server
    
        fetch('/getAllDramaMovies')
        // Handle success
        .then(response => response.json())  // get the data out of the response object
        .then( responseData => fillUL(responseData))    //update our array and li's
        .catch(err => console.log('Request Failed', err)); // Catch errors
    };

function fillUL(data) {
    movieArray = data;
    console.log(movieArray);
        // clear prior data
    var divMovieList = document.getElementById("divMovieList");
    while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
        divMovieList.removeChild(divMovieList.firstChild);
    };

    var ul = document.createElement('ul');
   
    movieArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.ID + ":  &nbsp &nbsp  &nbsp &nbsp " + 
        element.Title + "  &nbsp &nbsp  &nbsp &nbsp "  +
        element.Year + " &nbsp &nbsp  &nbsp &nbsp  " + 
        element.Genre  + " &nbsp &nbsp  &nbsp &nbsp  " + 
        element.Time;
        ul.appendChild(li);
    });
    divMovieList.appendChild(ul)
}

function deleteMovie(ID) {

    fetch('/DeleteMovie/' + ID, {
        method: "DELETE",
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json),
      createList()
      )
      .catch(err => console.log(err));
}


  
