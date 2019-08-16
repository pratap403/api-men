var db = require('../../model/mongoUtil');


exports.fetch = function (req, res, next) {
    try{
        var resultArray = [];
        db.getDb().collection('users').find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            resultArray = result;
            res.render('index', {items: resultArray});
        });
    }catch (error) {
        res.send({status:"error",message:error.message});
    }

}

