const { insertmessage, getMesssage } = require('../hrm_message/hrm_message.service')
const { validateMessage } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    insertmessage: (req, res) => {
        const body = req.body;
        const body_result = validateMessage.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        insertmessage(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Message Saved Successfully"
            });
        });
    },
    getMesssage: (req, res) => {
        const id = req.params.id;
        getMesssage(id, (err, results) => {
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