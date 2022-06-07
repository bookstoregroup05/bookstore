// *********************************************************************************
// books-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Get all of the books
  app.get("/api/books", function(req, res) {   
    db.Book.findAll({}).then(function (dbBook) {
      res.json(dbBook);
    });
  });
    
   // Get a single book by its id
  app.get("/api/books/:id", function(req, res) {
    db.Book.findOne({
      where: {
        id: req.params.id
      },
      // include: [db.Author]
    }).then(function (dbBook) {
      res.json(dbBook);
    });
  });

    // Get all the books within a category by its category name
  app.get("/api/books/category/:category", function(req, res) {
    db.Book.findAll({
      where: {
        categories: req.params.category
      },
    }).then(function (dbBook) {
      res.json(dbBook);
    });
  });

    // POST route for saving a new book
  app.post("/api/books", function(req, res) {
    db.Book.create(req.body).then(function (dbBook) {
      res.json(dbBook);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/books/:id", function(req, res) {
    db.Book.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbBook) {
      res.json(dbBook);
    });
  });


  // PUT route for updating posts
  app.put("/api/books", function(req, res) {
    db.Book.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbBook) {
      res.json(dbBook);
    });
  });

};
