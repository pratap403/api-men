var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!', success: req.session.success, errors: req.session.errors});
});


router.get('/get-data', function (req, res, next) {

    var resultArray =[];

    MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        var dbo = db.db('mydb');
        dbo.collection('users').find({}).toArray(function (err,result) {
           if (err) throw err;
           resultArray = result;
           console.log(resultArray);
           db.close();
           res.render('index',{items: resultArray});
        });
    });
});


const { check, validationResult } = require('express-validator');

router.post('/insert',

    check('title')
        .isAlphanumeric().withMessage("Insert Data title Should be AlphaNumeric")
        .isLength({min:2, max:15}).withMessage("Insert Data title length should be in between 2-15 "),

    check("content")
        .isAlphanumeric().withMessage("Insert Data content should be AlphaNumeric")
        .isLength({min:2, max:100}).withMessage("Insert Data content length should be in between 2-15"),

    check("author")
        .isAlphanumeric().withMessage("Insert Data author Should be AlphaNumeric")
        .isLength({min:2, max:15}).withMessage("Insert Data author length should be in between 2-15"),

    function (req, res, next) {

        var errors = validationResult(req);

        if(errors.array().length >0)
        {
            req.session.errors = errors.array();
            req.session.success = false;
        }

        else
        {
            req.session.success = true;

            var item =  {
                title: req.body.title,
                content: req.body.content,
                author: req.body.author
            };

            MongoClient.connect(url, function (err, db) {
                if(err) throw  err;
                var dbo = db.db('mydb');
                dbo.collection('users').insertOne(item, function (err, result) {
                    if(err) throw err;
                    console.log(result + "Item Inserted Successfully");
                });

            });
        }
    res.redirect('/');
});

router.post('/update',

    check("id")
        .isLength({min:1}).withMessage("Update Data Id cannot be Empty"),
    check('title')
        .isAlphanumeric().withMessage("Update Data title Should be AlphaNumeric")
        .isLength({min:2, max:15}).withMessage("Update Data title length should be in between 2-15 "),

    check("content")
        .isAlphanumeric().withMessage("Update Data content should be AlphaNumeric")
        .isLength({min:2, max:100}).withMessage("Update Data content length should be in between 2-15"),

    check("author")
        .isAlphanumeric().withMessage("Update Data author Should be AlphaNumeric")
        .isLength({min:2, max:15}).withMessage("Update Data author length should be in between 2-15"),


    function (req, res, next) {

        var errors = validationResult(req);

        if(errors.array().length >0)
        {
            req.session.errors = errors.array();
            req.session.success = false;
        }
        else
        {
            var item = {
                title: req.body.title,
                content: req.body.content,
                author: req.body.author
            };
            var id = req.body.id;

            MongoClient.connect(url, function (err, db) {
                if(err) throw err;
                var dbo = db.db('mydb');
                dbo.collection('users').updateOne({"_id": objectId(id)}, {$set: item}, function (err, result) {
                    if (err) throw err;
                    console.log("Item updated");
                    db.close();
                });
            });
        }
        res.redirect('/');
});

router.post('/delete',

    check("id")
        .isLength({min:1}).withMessage("Delete Data Id cannot be Empty"),

    function (req, res, next) {
        var errors = validationResult(req);

        if(errors.array().length >0)
        {
            req.session.errors = errors.array();
            req.session.success = false;
        }
        else
        {
            var id = req.body.id;

            MongoClient.connect(url, function (err, db) {
                if(err) throw err;
                var dbo = db.db('mydb');
                dbo.collection('users').deleteOne({"_id":objectId(id)}, function (err, result) {
                    if(err) throw err;
                    console.log('Item Deleted');
                    db.close();
                });
            });
        }
        res.redirect('/');
});



module.exports = router;