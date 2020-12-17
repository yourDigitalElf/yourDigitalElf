// Requiring path to so we can use relative routes to our HTML files
var path = require("path");


const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

	//load landing page
	app.get("/", (req,res) => {
		res.sendFile(path.join(__dirname, "public/html/index.html"))
	});

	// load the login page
	app.get("/login", function(req,res){
		res.sendFile(path.join(__dirname, "public/html/login.html"))
	});

	// load sign-up page
	app.get("/signup", function(req,res){
		res.sendFile(path.join(__dirname, "public/html/signup.html"))
	});

	// load the user page
	// requires user's list data; user related followies; and possibly other user info
	app.get("/user:username", isAuthenticated, function(req,res){
		
		
		res.render();
	});


	// load a page where you search for other people
	app.get("/view", (req, res) => {
		res.render()
	});

	// load list page that displays a person's list
	app.get("/list", (req, res) => {
		res.render()
	});

};

	// res.render("handlebars")