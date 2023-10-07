const connectToMongo = require('./db'); //requring the connectToMongo function
const express = require('express')
const cors = require('cors');

connectToMongo(); //calling a function for estabilishing the connection to the database
const app = express()
const port = 5000

//a middleware to use request.body 
app.use(cors());
app.use(express.json());

//creating routes using app.use(endpoint , require(fileOfRoute))
app.use('/api/auth/', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})