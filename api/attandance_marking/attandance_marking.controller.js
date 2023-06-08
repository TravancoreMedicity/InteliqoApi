const { getattendancemark, getattendancetotal, getnightoffdata, updatenightoff, getattendancetotalEmployee,
    updatePuchMastNoff } = require('../attandance_marking/attandance_marking.service');
const { validateauthorization, validatecoassign } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    getattendancemark: (req, res) => {
        const id = req.body;
        getattendancemark(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    },
    getattendancetotal: (req, res) => {
        const id = req.body;
        getattendancetotal(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    },
    getnightoffdata: (req, res) => {
        const id = req.body;
        getnightoffdata(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    },
    updatenightoff: (req, res) => {
        const id = req.body;
        updatenightoff(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            updatePuchMastNoff(id, (err, results) => {
                if (err) {
                    logger.errorLogger(err)
                    return res.status(400).json({
                        success: 0,
                        message: err
                    });
                }
                if (results.length == 0) {
                    logger.infoLogger("No Records Found")
                    return res.status(200).json({
                        success: 0,
                        message: "No Record Found"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: results
                });
            });
        });
    },
    getattendancetotalEmployee: (req, res) => {
        const id = req.body;
        getattendancetotalEmployee(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

}