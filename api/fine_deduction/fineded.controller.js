const { createFineDed, checkInsertVal, getData } = require('../fine_deduction/fineded.service')
const { validatefineded } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createFineDed: (req, res) => {
        const body = req.body;
        const body_result = validatefineded.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.fine_desc = body_result.value.fine_desc;

        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                // Insert the values
                createFineDed(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Fine Deduction Successfully Inserted"
                    });

                });
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Fine Deduction Already Exist"
                })
            }
        })
    },
    getFineDed: (req, res) => {

        getData((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
}