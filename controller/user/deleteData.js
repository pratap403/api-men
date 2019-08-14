var db = require( '../../model/mongoUtil');
const objectId = require('mongodb').ObjectID;
const { check, validationResult } = require('express-validator');

exports.delete = function (req, res, next) {

    var errors = validationResult(req);

         if(errors.array().length >0)
         {
             req.session.errors = errors.array();
             req.session.success = false;
         }
         else {


             var id = req.body.id;
             db.getDb().collection('users').deleteOne({"_id": objectId(id)}, function (err, result) {
                 if (err) throw err;
                 console.log('Item Deleted');
             });
         }
                        res.redirect('/');
    }