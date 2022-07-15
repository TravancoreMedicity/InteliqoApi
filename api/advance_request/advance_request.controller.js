const { InsertAdvanceRequest, CheckInsertval } = require('../advance_request/advance_request.service');
const { validateAdvanceRequest } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    InsertAdvanceRequest: (req, res) => {
        const body = req.body;
        //Validate body result
        const body_result = validateAdvanceRequest.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        CheckInsertval(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                InsertAdvanceRequest(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Data Inserted Successfully"
                    });
                })
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Advance Request Already In Process"
                })
            }
        })
    },
}