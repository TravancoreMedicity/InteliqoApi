const { create, getData, checkInsertVal } = require('../EarnType/earntype.service');
const { validateEarnMast } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createEarnType: (req, res) => {

        const body = req.body;
        const body_result = validateEarnMast.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.earnded_name = body_result.value.earnded_name;

        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {

                create(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Data Created Successfully"
                    });

                });
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Earn Type Already Exist"
                })
            }
        })
    },
    getEarnType: (req, res) => {

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