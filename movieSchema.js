// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const Schema = mongoose.Schema;// a data type called schema

const MovieSchema = new Schema({ //structure for the data being put in
    Title: {
      type: String,
      required: true
    },
    Year: {
      type: Number,
      required: true
    },
    Genre: {
      type: String,
      required: true
    },
    ID: {                   // we are going to ignore mongo's _id
      type: String,
      required: true
    },
    Time: {
      type: Date,
      required: true
    }
  });

  module.exports = mongoose.model("movieCollection", MovieSchema);


