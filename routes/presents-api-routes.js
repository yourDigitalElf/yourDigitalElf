var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

  // GET route for getting all of the presents
  app.get("/api/users", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Present.findAll({
      where: query,
      // include: [db.User]
    }).then(function (dbPresent) {
      res.json(dbPresent);
    });
  });

  // GET route for getting presents for a specific user 
  app.get("/api/presents:userId", function (req, res) {
    db.Present.findAll({
      where: query,
      include: [db.User]
    }).then(function (dbPresent) {
      res.json(dbPresent);
    });
  });

  // GET route for getting a specific present
  app.get("/api/presents:id", function (req, res) {
    db.Present.finOne({
      where: {
        id: req.params
      },
      include: [db.User]
    }).then(function (dbPresent) {
      console.log(dbPresent);
      res.json(dbPresent);
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
