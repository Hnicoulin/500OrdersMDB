
var express = require('express');
var router = express.Router();
var fs = require("fs");

// start by creating data so we don't have to type it in each time
let ServerMovieArray = [];

// define a constructor to create movie objects
let MovieObject = function (pTitle, pYear, pGenre, pMan, pWoman, pURL) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.Title = pTitle;
    this.Year = pYear;
    this.Genre = pGenre;  // action  comedy  drama  horrow scifi  musical  western
}

// removed my file management code,

// add mongoDB support  ===============================

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const MovieSchema = require("../movieSchema");


// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection is in (MoviesDB)
const dbURI =
  "mongodb+srv://iluvjuntae:@haleynisit420.cj3rn.mongodb.net/Movies?retryWrites=true&w=majority";

  //mongodb+srv://iluvjuntae:@haleynisit420.cj3rn.mongodb.net/Movies?retryWrites=true&w=majority
  // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);


//============================================

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* GET all Movie data */
router.get('/getAllMovies', function(req, res) {
  // find {  takes values, but leaving it blank gets all}
  MovieSchema.find({}, (err, AllMovies) => { //an object with methods that change the database, All movies is all the info you take from the database w/ a new name
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(AllMovies);
  });
});


/* GET just drama Movie data */
// router.get('/getAllDramaMovies', function(req, res) {
//   let which = "drama";
//   MovieSchema.find(  {Genre: which,  Year: { $gt: 1971, $lt: 1996} }  , (err, AllMovies) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//     console.log(AllMovies);
//     res.status(200).json(AllMovies);
//   });
// });


// had to swtich from arrow function style to the .exec style to add the .sort function
//Article.find({}).sort({fieldA: 1, fieldB: 1}).exec(function(err, docs){...})

router.get('/getAllDramaMovies', function(req, res) {
  let which = "drama";
  MovieSchema.find({Genre: which,  Year: { $gt: 1971, $lt: 1996} }).sort({ Year: -1}).exec(function(err, AllMovies) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(AllMovies);
    res.status(200).json(AllMovies);
  });
});


/* Add one new Movie */
router.post('/AddMovie', function(req, res) {

  let oneNewMovie = new MovieSchema(req.body);  
  console.log(req.body);
  oneNewMovie.save((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
    // console.log(todo);
    // res.status(201).json(todo);

    var response = {
      status  : 200,
      success : 'Added Successfully'
    }
    res.end(JSON.stringify(response)); // send reply

    }
  });
});


// delete movie
router.delete('/DeleteMovie/:ID', function (req, res) {
  MovieSchema.deleteOne({ ID: req.params.ID }, (err, note) => { 
    if (err) {
      res.status(404).send(err);
    }
    var response = {
      status  : 200,
      success : 'Movie ' +  req.params.ID + ' deleted!'
    }
    res.end(JSON.stringify(response)); // send reply
  });
});



module.exports = router;
