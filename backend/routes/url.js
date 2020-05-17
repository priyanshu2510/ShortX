const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cuser = require("../models/user");
const cshort = require("../models/shorturl");
const shortid = require('shortid');



router.post('/create', async (req, res) => {

    const c = await cshort.find({
        short_url: req.body.custom
    });
    if (c.length !== 0) {
        return res.json({
            status: 404,
            message: "Custom URL Already in use"
        })
    } else {
        let custom = req.body.custom;
        if (custom === "") {
            let key = shortid.generate();
            cuser.create({
                url: req.body.url,
                short_url: key
            }, async (err, user) => {
                if (err) {
                    return res.json({
                        status: 500,
                        message: "Something went wrong, please try again"
                    });
                } else {
                    cshort.create({short_url:key});
                    return res.json({
                        status: 200,
                        message: `http://bit.ly/${key}`
                    });
                }

            });
        } else {
            cuser.create({
                url: req.body.url,
                short_url: custom
            }, async (err, user) => {
                if (err) {
                    return res.json({
                        status: 500,
                        message: "Something went wrong, please try again"
                    });
                } else {
                    cshort.create({short_url:custom});
                    return res.json({
                        
                        status: 200,
                        message: `http://bit.ly/${custom}`
                    });
                }

            });

        }
    }
});








module.exports = router;