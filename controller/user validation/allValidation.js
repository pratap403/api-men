const { check, validationResult } = require('express-validator');

module.exports =
    {
        insertValidation: [
            check('title')
                .isLength({min:2, max:15}).withMessage("Insert Data title length should be in between 2-15 "),

            check("content")
                .isLength({min:2, max:100}).withMessage("Insert Data content cannot be empty"),

            check("author")
                .isLength({min:2, max:15}).withMessage("Insert Data author length should be in between 2-15"),
        ],

        updateValidation: [

            check("id")
                .isLength({min:1}).withMessage("Update Data Id cannot be Empty"),
            check('title')
                .isLength({min:2, max:15}).withMessage("Update Data title length should be in between 2-15 "),

            check("content")
                .isLength({min:2, max:100}).withMessage("Update Data content cannot be empty"),

            check("author")
                .isLength({min:2, max:15}).withMessage("Update Data author length should be in between 2-15"),
        ],

        deleteValidation: [
            check("id")
                .isLength({min:1}).withMessage("Delete Data Id cannot be Empty"),
        ]
    }

