const express = require("express");

const Animal = require("../models/Animal");
const { createJWToken } = require("../common/tokens");

const { decodeRequestToken } = require("../common/middleware");
const { getNewConfig } = require("../common/learning");

const router = express.Router();

router.get("/", (req, res) => {
    decodeRequestToken(req, res)
        .then( decodedToken => {
            Animal.findById(decodedToken.data)
                .exec( (err, animal) => {
                    if (err || !animal) {
                        return res.status(400)
                                .json({success: false, message: err});
                    }
                    
                    const config = { 
                        food: animal.food,
                        time: animal.time
                    };

                    res.status(200)
                        .json({ success: true, config });
                });
        })
        .catch( err => console.log(err));
});

router.post("/", (req, res) => {
    const { food, time } = req.body;

    if (!food || !time) {
        return res.status(400)
                    .json({
                        success: false,
                        message: "Not all arguments were specified"
                    });
    }
        
    const animal = new Animal({food, time});

    animal.save((err, saved) => {
        if (err) {
            return res.status(400)
                        .json({ success: false, message: err });
        }
        
        res.status(200)
            .json({
                success: true,
                token: createJWToken({
                    sessionData: saved._id, maxAge: 7200
                })
            });
    });
});

router.patch("/", (req, res) => {
    const { food, time } = req.body;

    if (!food || !time) {
        return res.status(400) 
                    .json({
                        success: false,
                        message: "Not all arguments were specified"
                    });
    }
    
    decodeRequestToken(req, res)
        .then( decodedToken => {
            Animal.findByIdAndUpdate(decodedToken.data, { food, time }, { new: true })
                .exec( (err, animal) => {
                    if (err) {
                        res.status(400)
                            .json({ success: false, message: err });
                    }

                    const config = {
                        food: animal.food,
                        time: animal.time
                    };

                    res.status(200)
                        .json({ success: true, config });
                });
        })
        .catch( err => console.log(err));
});

router.post("/feed", (req, res) => {
    const { food, time } = req.body;

    if (!food || !time) {
        return res.status(400)
                    .json({
                        success: false,
                        message: "Not all arguments were specified"
                    });
    }

    decodeRequestToken(req)
        .then( decodedToken => {
            getNewConfig({ id: decodedToken.data, food, time })
                .then( newConfig => {
                    const config = {
                        food: newConfig.food,
                        time: newConfig.time
                    };
                    
                    res.status(200)
                        .json({ success: true, config });
                })
                .catch( err => res.status(400)
                                    .json({ success: false, message: err.message }));
        })
        .catch( err => console.log(err));
});

module.exports = exports = router;