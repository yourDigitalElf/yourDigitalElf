// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated")

module.exports = function (app) {
	//route to landingpage
	app.get("/", (req, res) => {
		res.render("index")
	});

	//route to login page
	app.get("/login", (req, res) => {
		res.render("login")
	});

	//route to signup page
	app.get("/signup", (req, res) => {
		res.render("signup")
	});

	//route to createlist page
	app.get("/createList", isAuthenticated, (req, res) => {
		db.Present.findAll({
			where: {
				UserId: req.user.id
			}
		}).then((presentsArr) => {
			res.render("createList", presentsArr)

		})
	});

	app.get("/users", (req, res) => {
		db.User.findAll({
			include: [db.Present]
		}).then((data) => {
			let hbArr = [];
			let presArr = [];
			for(let i = 0; i < data.length; i++){
				
				for(let j = 0; j < data[i].dataValues.Presents.length; j++){
					let presCon = {
						giftName: data[i].dataValues.Presents[j].giftName,
						rating: data[i].dataValues.Presents[j].rating
					};

					presArr.push(presCon);
				};

				let usePres = {
					firstName: data[i].dataValues.firstName,
					lastName: data[i].dataValues.lastName,
					presents: presArr
				};

				hbArr.push(usePres);
			};
			console.log(hbArr)
			console.log(hbArr[0].presents)
			console.log(hbArr[0].presents[0])
			res.render("users", {user: hbArr});
		});

	});
	// Using the passport.authenticate middleware with our local strategy.
	// If the user has valid login credentials, send them to the members page.
	// Otherwise the user will be sent an error
	app.post("/api/login", passport.authenticate("local", {
		successRedirect: '/createList',
		failureRedirect: '/login'
	})
		//  (req, res) => {

		// 	res.json(req.user);
		// }
	);



	// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
	// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
	// otherwise send back an error
	app.post("/api/signup", function (req, res) {
		console.log(req.body.firstName);
		db.User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
		})
			.then(function () {
				// res.end();
				res.redirect(307, "/api/login");
			})
			.catch(function (err) {
				res.status(401).json(err);
				console.log(err);
			});
	});

	// Route for logging user out
	app.get("/logout", function (req, res) {
		req.logout();
		res.redirect("index");
	});

	// Route for getting some data about our user to be used client side
	app.get("/api/user_data", function (req, res) {
		if (!req.user) {
			// The user is not logged in, send back an empty object
			res.json({});
		} else {
			// Otherwise send back the user's email and id
			// Sending back a password, even a hashed password, isn't a good idea
			res.json({
				email: req.user.email,
				id: req.user.id,
			});
		}
	});


};
