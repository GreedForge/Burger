var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/", function(req, res) {
    var time = Date.now();
    console.log(req.body.name);
    burger.create([
        "burger_name", "devoured", "date"
    ], [
        req.body.name, false, "2008-01-01 00:00:01"
    ], function() {
        res.redirect("/");
    });
});

router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: true
    }, condition, function() {
        res.redirect("/");
    });
});

// router.delete("/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function() {
//     res.redirect("/");
//   });
// });

// Export routes for server.js to use.
module.exports = router;