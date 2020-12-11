// var express = require("express");

// var router = express.Router();

// // Import the model (cat.js) to use its database functions.
// const db = require("../models");

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   db.Cats.findAll({}).then(function(data){
//     var hbsObject = {
//       cats: data.map( cat => cat.dataValues)
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   })
// });

// router.post("/api/cats", function(req, res) {
//   db.Cats.create(req.body).then(function(result){
//     console.log("Post result", result);
//     res.json({id: result.dataValues.id});
//   })
// });

// router.put("/api/cats/:id", function(req, res) {
//   db.Cats.update(req.body, {
//     where: {
//       id: req.params.id
//     }
//   }).then(function(result){
//     if(result === 0) {
//       return res.status(200).end();
//     };
    
//     res.status(200).end();
//   })
// });

// // Export routes for server.js to use.
// module.exports = router;
