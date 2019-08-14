var db = require( '../../model/mongoUtil');


exports.fetch = function (req, res, next) {
    var resultArray =[];
    db.getDb().collection('users').find({}).toArray(function (err,result) {
            if (err) throw err;
            console.log(result);
            resultArray = result;
            res.render('index',{items: resultArray});
    });
}

