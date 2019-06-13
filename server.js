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

// mongoose.connect();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/scrape", function(req, res) {
  axios.get("https://www.nytimes.com/section/sports").then(function(response) {
    var $ = cheerio.load(response.data);

    var results = [];

    $("div.css-10wtrbd").each(function(i, element) {
      var title = $(element)
        .children("h2")
        .children("a")
        .text();
      var link = $(element)
        .children("h2")
        .children("a")
        .attr("href");
      var content = $(element)
        .children("p")
        .text();
      var author = $(element)
        .children()
        .last()
        .children(".css-9voj2j")
        .children("span")
        .text();

      results.push({
        title: title,
        content: content,
        author: author,
        link: "https://www.nytimes.com" + link
      });
    });
    res.json(results);
    console.log(results);
  });
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
