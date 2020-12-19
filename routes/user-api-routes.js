var db = require("../models");

module.exports = function(app) {
  // Find all users 
  app.get("/api/users", function(req, res) {
    db.User.findAll({
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
    });
  });

  // Create a new user
  app.post("/api/newuser", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
        res.json(dbUser);
    })
  })

  // Get a list of followed users
  app.get("/api/follwies", function(req, res) {
     
  })

  // Follow someone
  app.put("/api/follow", function(req, res) {
    
  });


};
