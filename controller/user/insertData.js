var db = require('../../model/mongoUtil');
const {check, validationResult} = require('express-validator');

exports.insert = function (req, res, next) {
    try {

        var errors = validationResult(req);
        console.log(errors);

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
            db.getDb().collection('users').insertOne(item, function (err, result) {
                if (err) throw err;
                console.log(result + "Item Inserted Successfully");
            });
        }
        res.redirect('/');
    } catch (error) {
        res.send({status: "error", message: error.message});
    }

}