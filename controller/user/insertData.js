var db = require( '../../model/mongoUtil');
const { check, validationResult } = require('express-validator');

exports.insert = function (req, res, next) {

    var errors = validationResult(req);
    console.log(errors);

    if(errors.array().length >0)
        {
             req.session.errors = errors.array();
             req.session.success = false;
        }

        else {
        req.session.success = true;
        var item = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        };
        db.getDb().collection('users').insertOne(item, function (err, result) {
            if (err) throw err;
            console.log(result + "Item Inserted Successfully");
        });
    }
        res.redirect('/');
    }


// check('title')
//     .isAlphanumeric().withMessage("Insert Data title Should be AlphaNumeric")
//     .isLength({min:2, max:15}).withMessage("Insert Data title length should be in between 2-15 "),
//
//     check("content")
//         .isAlphanumeric().withMessage("Insert Data content should be AlphaNumeric")
//         .isLength({min:2, max:100}).withMessage("Insert Data content length should be in between 2-15"),
//
//     check("author")
//         .isAlphanumeric().withMessage("Insert Data author Should be AlphaNumeric")
//         .isLength({min:2, max:15}).withMessage("Insert Data author length should be in between 2-15"),
//
//     function (req, res, next) {
//
//         var errors = validationResult(req);
//
//         if(errors.array().length >0)
//         {
//             req.session.errors = errors.array();
//             req.session.success = false;
//         }
//
//         else
//         {
//             req.session.success = true;
//
//             var item =  {
//                 title: req.body.title,
//                 content: req.body.content,
//                 author: req.body.author
//             };
//                 db.collection('users').insertOne(item, function (err, result) {
//                     if(err) throw err;
//                     console.log(result + "Item Inserted Successfully");
//             });
//         }
//         res.redirect('/');
//     }