var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

//Scraping packages
var cheerio = require("cheerio");
var axios = require("axios");

var PORT = 3000;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
