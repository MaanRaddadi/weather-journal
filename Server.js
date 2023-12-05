// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

app.get("/all", function (req, res) {
  res.send(projectData);
});

const postData = (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  console.log(projectData);
  res.status(200).send({
    sucess: true,
    message: "Data saved successfully",
    data: projectData,
  });
};

app.post("/add", postData);
