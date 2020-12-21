// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated")

module.exports = function (app) {

	// Using the passport.authenticate middleware with our local strategy.
	// If the user has valid login credentials, send them to the members page.
	// Otherwise the user will be sent an error
	app.post("/api/login", passport.authenticate("local"), function (req, res) {
		res.json(req.user);
		// successRedirect: '/createList',
		// failureRedirect: '/login'
	});

	// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
	// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
	// otherwise send back an error
	app.post("/api/signup", (req, res) => {
		console.log(req.body.firstName);
		db.User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
		})
			.then(() => {
				res.redirect(307, "/api/login");
			})
			.catch(function (err) {
				res.status(401).json(err);
				console.log(err);
			});
	});

	app.post("/api/addpresent", isAuthenticated, (req, res) => {
		db.Present.create({
			giftName: req.body.giftName,
			rating: req.body.rating,
			UserId: req.user.id
		}).then(() => {
			res.redirect("/createList");
		});
	});

	// Route for logging user out
	app.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});
};
