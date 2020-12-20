var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  //   // GET route for getting all of the presents
  //   app.get("/api/presents", function(req, res) {
  //   var query = {};
  //   if (req.query.user_id) {
  //     query.UserId = req.query.user_id;
  //   }
  //   db.Present.findAll({
  //     where: query,
  //     include: [db.User]
  //   }).then(function(dbPresent) {
  //     res.json(dbPresent);
  //   });
  // });

  // GET route for getting presents for a specific user 
  app.get("/api/presents:userId", function (req, res) {
    db.Present.findAll({
      where: {
        userId: req.params.userId
      },
      include: [db.User]
    }).then(function (dbPresent) {
      console.log(dbPresent);
      res.json(dbPresent);
    })
  })


  // POST route for adding to a new present to the list

  // needs to render all gifts not just the one added
  app.post("/api/addpresent", isAuthenticated, function (req, res) {
    db.Present.create(req.body).then(function (dbPresent) {
      res.render("createlist")
      // res.json(dbPresent);
    })
  })


  // DELETE route for deleting presents
  app.delete("/api/presents/:id", isAuthenticated, function (req, res) {
    console.log("is deleting")
    db.Present.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbPresent) {
      res.json(dbPresent);
    });
  });

  // PUT route for updating presents
  app.put("/api/presents", isAuthenticated, function (req, res) {
    db.Present.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then(function (dbPresent) {
      res.json(dbPresent);
    });
  });
};
