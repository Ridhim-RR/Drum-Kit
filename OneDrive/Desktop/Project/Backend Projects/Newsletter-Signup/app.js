const express = require("express");
const app = express();
const body = require("body-parser");
const bodyParser = require("body-parser");
const e = require("express");
const port = 3000;
const https = require("node:https");
const { url } = require("inspector");
const { response } = require("express");
const { request } = require("http");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;
  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  let jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/7187b58cb"; //e
  const options = {
    method: "Post",
    auth: "Ridhim97:f71fcd9203f74b0cec271cf436e22984-us13",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure.html", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Our server is up and running.");
});
