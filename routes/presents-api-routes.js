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
      where: {
        UserId: req.params.userId
      },
      include: [db.User]
    }).then(function (dbPresent) {
      console.log(dbPresent);
      res.json(dbPresent);
    })
  })


  // POST route for adding to a new present to the list

  app.post("/api/addpresent", isAuthenticated, function (req, res) {
    db.Present.create({
      giftName: req.body.giftName,
      rating: req.body.rating,
      UserId: req.user.id
    }).then(function (dbPresent) {
      res.redirect("/createList");
      // console.log("in here")
      // let hbPresent = {
      //   Present: [{
      //     giftName: dbPresent.dataValues.giftName,
      //     rating: dbPresent.dataValues.rating
      //   }]
      // };

      // console.log(hbPresent);

      // res.status(500).end();
      // res.json(dbPresent);
    })
  })

  app.get("/createList", isAuthenticated, (req, res) => {
    console.log("is reloading")
    db.Present.findAll({
      where: {
        UserId: req.user.id
      }
    }).then((data) => {
      let Present = [];
      for (let i = 0; i < data.length; i++) {
        presObj = {
          giftName: data[i].dataValues.giftName,
          rating: data[i].dataValues.rating,
        };

        Present.push(presObj);
      };
      console.log({ Present: Present });
      res.render("createList", { Present: Present });
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
