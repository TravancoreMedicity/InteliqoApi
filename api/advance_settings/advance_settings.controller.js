const { InsertAdvanceSettings, updateAdvanceSettings, getAdvanceSettings, getAdvanceSettingsById } = require('../advance_settings/advance_settings.service');
const { validateadvanceSettings } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    InsertAdvanceSettings: (req, res) => {
        const body = req.body;
        //Validate body result
        const body_result = validateadvanceSettings.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        InsertAdvanceSettings(body, (err, results) => {
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
        });
    },
    updateAdvanceSettings: (req, res) => {

        const body = req.body;
        const body_result = validateadvanceSettings.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }

        updateAdvanceSettings(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
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
    getAdvanceSettings: (req, res) => {
        getAdvanceSettings((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 10,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
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
    getAdvanceSettingsById: (req, res) => {
        const id = req.params.id;
        getAdvanceSettingsById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }
}