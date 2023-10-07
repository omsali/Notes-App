const mongoose = require('mongoose'); // requiring mongoose
const { Schema } = mongoose;

//Defining a schema of the collection
const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
  });

//   //exporting using mongoose.model( modelname, schema)
//   module.exports = mongoose.model("user", UserSchema);

  const User =  mongoose.model("user", UserSchema);
//   User.createIndexes();               //Creating indexes to avoid duplicate values // INSTEAD applying in auth.js
  module.exports = User;