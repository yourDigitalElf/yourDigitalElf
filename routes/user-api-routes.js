var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated")

module.exports = function (app) {
  // Find all users 
  app.get("/api/users", function (req, res) {
    db.User.findAll({
<<<<<<< HEAD
        include: [db.Present]
        // [{
        //   firstName:
        //   lastName:
        //   email:
        //   id:
        //   Presents: [
        //     {
        //       rating:
        //       name:
        //     },
        //     {}
        //   ] 
        // },{}]
    }).then(function(dbUser) {
      res.render("bens handles he is making right now", dbUser);
=======
      include: [db.Present]
    }).then(function (dbUser) {
      res.render("users", dbUser);
>>>>>>> Develop
    });
  });

  // Create a new user
  app.post("/api/newuser", function (req, res) {

    db.User.create(req.body)
      .then(function (dbUser) {
        // res.redirect(307, "/login")
        console.log(req.body);
        res.json(dbUser);
      })
      .catch(function (err) {
        console.log(err);
      })
  })

  // Get a list of followed users
  app.get("/api/follwies", function (req, res) {

  })

  // Follow someone
  app.put("/api/follow", function (req, res) {

  });


};
