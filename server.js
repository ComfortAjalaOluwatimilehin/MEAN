// JavaScript source code
var express = require("express");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require('body-parser');
var router = require("./routes");


mongoose.connect("mongodb://localhost/social",function(){console.log("DB ON")})
var port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client"))
app.get("/", function (req, res) {
   res.sendFile("index.html",{root:__dirname})
})
app.use("/",router)
app.listen(port, function () {
    console.log("Server On")
})
/*<script src="angular/angular.js"></script>/*
<script src="angular/app.js"></script>

    <script src="angular/authcontroller.js"></script>
    <script src="angular/config.js"></script>
    <script src="angular/authservice.js"></script>
    <script src="angular/profilecontroller.js"></script>
    <script src="angular/profileservice.js"></script>*/