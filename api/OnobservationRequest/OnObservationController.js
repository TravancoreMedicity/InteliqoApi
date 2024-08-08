const { deletePunchMasterSingleRow } = require("../attendance_updation/attendance.service");
const {
    getNewJoineesBydate,
    getNewjoineesbyDept,
    punchMasterUpdate,
    insertLog,
    getAllOnObservation,
    InactiveOnobservationrequest } = require("./OnObservationService");

module.exports = {
    getNewJoineesBydate: (req, res) => {
        const body = req.body
        getNewJoineesBydate(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getNewjoineesbyDept: (req, res) => {
        const body = req.body
        getNewjoineesbyDept(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    punchMasterUpdate: (req, res) => {
        const body = req.body;
        punchMasterUpdate(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            insertLog(body, (err, results) => {
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
        });
    },
    getAllOnObservation: (req, res) => {
        getAllOnObservation((err, results) => {
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
    inactiveOnObservation: (req, res) => {
        const body = req.body;
        deletePunchMasterSingleRow(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            InactiveOnobse
            rvationrequest(body, (err, results) => {
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
    }
}