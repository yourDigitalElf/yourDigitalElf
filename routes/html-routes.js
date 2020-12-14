// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

	//load home page
	app.get("/", function(req,res){
		res.sendFile(path.join(__dirname, "public/html/index.html"))
	});

	app.get("/login", function(req,res){
		res.sendFile(path.join(__dirname, "public/html/login"))
	});

	app.get("create", function(req,res){
		res.sendFile(path.join(__dirname, "createList.html"))
	})
};
