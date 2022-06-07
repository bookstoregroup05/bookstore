// *********************************************************************************
// Purchase-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    // GET route for getting all of the purchases
    app.get("/api/purchases", function (req, res) {
        db.Purchase.findAll({
            include: [db.Book]
        }).then(function (dbPurchase) {
            res.json(dbPurchase);
        });
    });


    // Get route for retrieving a single Purchase for a Userid
    app.get("/api/purchase/:UserId", function (req, res) {
        db.Purchase.findAll({
            where: {
                UserId: req.params.UserId
            },
            include: [db.Book]
        }).then(function (dbPurchase) {
            res.json(dbPurchase);
        });
    });

    // POST route for saving a new Purchase
    app.post("/api/purchases", function (req, res) {
        db.Purchase.create({
            UserId: req.body.UserId,
            BookId: req.body.BookId,
            // total: req.body.total,
            date: new Date()
        }).then(function (dbPurchase) {
            // Also insert into the intermediary table
            db.Purchase_Book.create({
                PurchaseId: dbPurchase.id,
                BookId: req.body.BookId
            }).then(function (dbPurchase_Book) {
                res.json(dbPurchase_Book);
            });
        });
    });

    // DELETE route for deleting a Purchase
    app.delete("/api/purchases/:UserId", function (req, res) {
        db.Purchase.destroy({
            where: {
                UserId: req.params.UserId
            }
        }).then(function (dbPurchase) {
            res.json(dbPurchase);
        });
    });

    // PUT route for updating posts
    app.put("/api/purchases", function (req, res) {
        db.Purchase.update(
            req.body,
            {
                where: {
                    UserId: req.body.UserId
                }
            }).then(function (dbPurchase) {
                res.json(dbPurchase);
            });
    });
};
