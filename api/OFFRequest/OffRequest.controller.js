const { deletePunchMasterSingleRow, } = require('../attendance_updation/attendance.service');
const { punchMasterUpdate, disableDutyplanData } = require('./OffRequest.service');
const { create, getEmpwiseDoff, deletedoff, disableDoffDutyplanData, updateDelStatDutyPlan,
    enableDoffDutyplanData } = require('./OffRequest.service')
module.exports = {
    create: (req, res) => {
        const body = req.body;
        punchMasterUpdate(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            disableDutyplanData(body, (err, results) => {
                if (err) {
                    logger.errorLogger(err)
                    return res.status(400).json({
                        susc: 0,
                        message: err
                    });
                }
                create(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    disableDoffDutyplanData(body, (err, results) => {
                        if (err) {
                            logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "Request Submitted Successfully"
                        });
                    });
                });
            });
        });
    },
    getEmpwiseDoff: (req, res) => {
        const body = req.body;
        getEmpwiseDoff(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Request Cancelled successfully",
                    data: results
                });

            }
        });
    },
    cancelDoff: (req, res) => {
        const body = req.body;
        deletePunchMasterSingleRow(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            updateDelStatDutyPlan(body, (err, results) => {
                if (err) {
                    logger.errorLogger(err)
                    return res.status(400).json({
                        susc: 0,
                        message: err
                    });
                }
                deletedoff(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    enableDoffDutyplanData(body, (err, results) => {
                        if (err) {
                            logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        else if (!results) {
                            return res.status(200).json({
                                success: 2,
                                message: "Record Not Found"
                            });
                        }
                        else {
                            return res.status(200).json({
                                success: 1,
                                message: "Request Cancelled successfully"
                            });

                        }
                    });
                });
            });
        });
    },
}