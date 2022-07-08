const { getdeptSec } = require('../coffinsert/coffinsert.service');
const { } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    getdeptSec: (req, res) => {

        getdeptSec((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
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
}
