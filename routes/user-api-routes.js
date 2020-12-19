var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated")

module.exports = function (app) {
  // Find all users 
  app.get("/api/users", function (req, res) {
    db.User.findAll({
<<<<<<< HEAD
      include: [db.Present]
    }).then(function (dbUser) {
=======
        include: [db.Present]
       
    }).then(function(dbUser) {
>>>>>>> 1b2b35f8ef049e6a06a3f03444923ff511eee2d8
      res.render("users", dbUser);
    });
  });

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
