var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated")

module.exports = function (app) {
  // Find all users 
  // app.get("/api/users", function (req, res) {
  //   db.User.findAll({
  //     include: [db.Present]

  //   }).then(function (dbUser) {
  //     // console.log(dbUser[0].Present.dataValues.giftName);
  //     console.log(dbUser[0].User.dataValues.Presents);
  //     res.render("users", dbUser);
  //   });
  // });

  //   // Create a new user
  //   app.post("/api/newuser", function(req, res) {
  //     db.User.create(req.body).then(function(dbUser) {
  //         res.json(dbUser);
  //     })
  //   })

  //   // Get a list of followed users
  //   app.get("/api/follwies", function(req, res) {

  //   })

  //   // Follow someone
  //   app.put("/api/follow", function(req, res) {

  //   });


};
