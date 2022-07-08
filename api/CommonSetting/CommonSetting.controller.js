const { InsertCommonSettings, getCommonSettings, updateCommonSettings } = require('../CommonSetting/CommonSetting.service');
const { validatecommonsettings } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    InsertCommonSettings: (req, res) => {
        const body = req.body;
        const body_result = validatecommonsettings.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 1,
                message: body_result.error.details[0].message
            });
        }
        InsertCommonSettings(body, (err, results) => {
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
    },

    getCommonSettings: (req, res) => {
        getCommonSettings((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length === 0) {

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
    updateCommonSettings: (req, res) => {
        const body = req.body;
        const body_result = validatecommonsettings.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 1,
                message: body_result.error.details[0].message
            });
        }
        updateCommonSettings(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Data Updated Successfully"
            });

        });
    },
}