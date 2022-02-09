const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.myCity;
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=bc21ed6b6637d8771d9d1d8ba1a8a1b9&units=metric";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weatherDesc=weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      res.write("<p>The weather is " + weatherDesc + " </p>");
      res.write("<h1>The temperature in " + city + " is " + temp + "</h1>");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Port 3000 started working");
});
