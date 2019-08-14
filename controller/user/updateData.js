var db = require( '../../model/mongoUtil');
const objectId = require('mongodb').ObjectID;
const { check, validationResult } = require('express-validator');

exports.update = function (req, res, next) {

    var errors = validationResult(req);

    if(errors.array().length >0)
         {
             req.session.errors = errors.array();
             req.session.success = false;
         }
        else {
        var item = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        };
        var id = req.body.id;

        db.getDb().collection('users').updateOne({"_id": objectId(id)}, {$set: item}, function (err, result) {
            if (err) throw err;
            console.log("Item updated");
        });
    }
        res.redirect('/');
    }
























    // check("id")
    //     .isLength({min:1}).withMessage("Update Data Id cannot be Empty"),
    // check('title')
    //     .isAlphanumeric().withMessage("Update Data title Should be AlphaNumeric")
    //     .isLength({min:2, max:15}).withMessage("Update Data title length should be in between 2-15 "),
    //
    // check("content")
    //     .isAlphanumeric().withMessage("Update Data content should be AlphaNumeric")
    //     .isLength({min:2, max:100}).withMessage("Update Data content length should be in between 2-15"),
    //
    // check("author")
    //     .isAlphanumeric().withMessage("Update Data author Should be AlphaNumeric")
    //     .isLength({min:2, max:15}).withMessage("Update Data author length should be in between 2-15"),
    //
    //
    // function (req, res, next) {
    //
    //     var errors = validationResult(req);
    //
    //     if(errors.array().length >0)
    //     {
    //         req.session.errors = errors.array();
    //         req.session.success = false;
    //     }
    //     else
    //     {
    //         var item = {
    //             title: req.body.title,
    //             content: req.body.content,
    //             author: req.body.author
    //         };
    //         var id = req.body.id;
    //
    //         MongoClient.connect(url, function (err, db) {
    //             if(err) throw err;
    //             var dbo = db.db('mydb');
    //             dbo.collection('users').updateOne({"_id": objectId(id)}, {$set: item}, function (err, result) {
    //                 if (err) throw err;
    //                 console.log("Item updated");
    //                 db.close();
    //             });
    //         });
    //     }
    //     res.redirect('/');
    // }