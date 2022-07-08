const { insertalert, getAlert } = require('../hrm_alert/hrm_alert.service')
const { validateAlert } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    insertalert: (req, res) => {
        const body = req.body;
        const body_result = validateAlert.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        insertalert(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Alert Saved Successfully"
            });
        });
    },
    getAlert: (req, res) => {

        getAlert((err, results) => {
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