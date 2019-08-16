var db = require('../../model/mongoUtil');
const objectId = require('mongodb').ObjectID;
const {check, validationResult} = require('express-validator');

exports.update = function (req, res, next) {
    try {
        var errors = validationResult(req);

        if (errors.array().length > 0) {
            req.session.errors = errors.array();
            req.session.success = false;
        } else {

            req.session.success = true;
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
    } catch (error) {
        res.send({status: "error", message: error.message});
    }
}