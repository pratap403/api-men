var express = require('express');
var router = express.Router();
var getData = require("../controller/user/get-data");
var insertData = require("../controller/user/insertData");
var updateData = require("../controller/user/updateData");
var deleteData = require('../controller/user/deleteData');
const validation = require("../controller/user validation/allValidation")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!', success: req.session.success, errors: req.session.errors});
});

router.get('/get-data', getData.fetch);
router.post('/insert',validation.insertValidation, insertData.insert);
router.post('/update', validation.updateValidation,updateData.update);
router.post('/delete',validation.deleteValidation,deleteData.delete);

module.exports = router;