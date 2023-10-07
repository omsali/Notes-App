const mongoose = require('mongoose'); // requiring mongoose
const { Schema } = mongoose;

//Defining a schema of the collection
const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        default : "General"
    },
    date : {
        type : Date,
        default : Date.now
    }
  });

  //exporting using mongoose.model( modelname, schema)
  module.exports = mongoose.model("notes", NotesSchema);