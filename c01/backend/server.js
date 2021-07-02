// require function includes modules that exist in separate files
// it reats a JS file, executes the file and return exports object
const express = require('express');
const cors = require('cors');

// Connect to mongodb database
const mongoose = require('mongoose');


// Configures the environment so we can have it in the .env file
require('dotenv').config();

// Create express server, port
const app = express();
const port = process.env.PORT || 5000;

// Cors middleware
app.use(cors());
app.use(express.json()); // Allow us to parse json
// Server will send and receive json

// database uri, get from mongodb from the dashboard
// ATLAS_URI is the envionrment variable, we need to set it (backend/.env)
const uri = process.env.ATLAS_URI;
// The flags deal with mongodb
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
//mongoose starts the connection
const connection = mongoose.connection;
// once the connection is open, it will log that
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


app.use('/api/reports', require('./route/reports'));
app.use("/api/company",require("./route/companyRegistration"));
app.use("/api/partner",require("./route/partnerRegistration"));
app.use("/api/users", require("./route/userRouting"));

// Starts the server: listens to the port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})