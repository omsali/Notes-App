const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/user?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

// connectingto db using connectToMongo function
//mongoose.connect is a function to connect the db it takes 2 parameters (db url, call back function) 
const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongoose sucessfully");
    })
}

module.exports = connectToMongo; //exports the function 