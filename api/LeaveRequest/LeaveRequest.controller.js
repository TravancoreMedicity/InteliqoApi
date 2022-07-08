const { createmastleave, createdetlleave, updateserialnum, gethafdayshift, getfirsthalf,
    getsecondhalf, inserthalfdayreque, insertnopunchrequest, insertcompensatyoff,
    getLeaveCancelEmpdetl } = require('../LeaveRequest/LeaveRequest.service');
// const { validateleavetype } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createmastleave: (req, res) => {
        const body = req.body;
        createmastleave(body, (err, results) => {
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
    inserthalfdayreque: (req, res) => {
        const body = req.body;
        inserthalfdayreque(body, (err, results) => {
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
    insertcompensatyoff: (req, res) => {
        const body = req.body;
        insertcompensatyoff(body, (err, results) => {
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
    insertnopunchrequest: (req, res) => {
        const body = req.body;
        insertnopunchrequest(body, (err, results) => {
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
    createdetlleave: (req, res) => {
        const body = req.body;

        var a1 = body.map((value, index) => {

            return [value.leaveid, value.lveDate, value.caulmnth,
            value.lveType, 1, value.levtypename, value.leave, value.nof_leave, value.singleleave]
        })
        createdetlleave(a1, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                updateserialnum((err, results) => {
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
            }
        });
    },
    gethafdayshift: (req, res) => {
        const body = req.body;
        gethafdayshift(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    getfirsthalf: (req, res) => {
        getfirsthalf((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getsecondhalf: (req, res) => {
        getsecondhalf((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getLeaveCancelEmpdetl: (req, res) => {
        const id = req.params.id;
        getLeaveCancelEmpdetl(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
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

    },
}