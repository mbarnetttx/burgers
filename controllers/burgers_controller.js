var burger = require("../models/burger.js");

var router = require('express').Router();

// use a post request to save the burger

router.post("/create-burger", function(req, res) {
    console.log(req.body.burgerName);


    // fix this next time 
    burger.insertOne(req.body.burgerName, function(result) {
        // Send back the ID of the new quote
        res.redirect("/");
    });

   
});

router.put("/update-burger/:id", function(req, res) {
    burger.updateOne(req.params.id, function(result){
        res.status(200).send();
    });


});

router.get("/", function(req, res){
    
    burger.selectAll(function(burgers) {
        console.log(burger);
        res.render('index', { burgers });
    });
});

module.exports = router;
