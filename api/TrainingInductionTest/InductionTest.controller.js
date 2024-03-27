const { logger } = require('../../logger/logger');
const { GetInductionTestTopics, GetLogEmpDetails, InsertPretest, checkPreeTestEntryExistORNot, UpdatePretestStatus, GetTestEmpdetails, UpdateOnlineMode, UpdateOfflineMode, GetPosttestQRdetails, InsertPostTest, checkPostTestEntryExistORNot, UpdatePosttestStatus, GetLogDetails } = require('./InductionTest.service');
module.exports = {

    GetInductionTestTopics: (req, res) => {
        GetInductionTestTopics((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    GetLogEmpDetails: (req, res) => {
        const body = req.body;
        GetLogEmpDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        });
    },
    GetTestEmpdetails: (req, res) => {
        const id = req.params.id;
        GetTestEmpdetails(id, (err, results) => {
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
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results,
            });
        });
    },
    InsertPretest: (req, res) => {
        const body = req.body;
        checkPreeTestEntryExistORNot(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
                InsertPretest(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        UpdatePretestStatus(body, (err, results) => {
                            if (err) {
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            else {
                                return res.status(200).json({
                                    success: 1,
                                    message: "PreTest over Successfully"
                                });
                            }
                        });
                    }
                });
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "You Already Attend the Test"
                });
            }
        })
    },
    UpdateOnlineMode: (req, res) => {
        const body = req.body;
        UpdateOnlineMode(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Online status updated successfully"
                });
            }

        })
    },

    UpdateOfflineMode: (req, res) => {
        const body = req.body;
        UpdateOfflineMode(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Offline status updated successfully"
                });
            }

        })
    },

    GetPosttestQRdetails: (req, res) => {
        const id = req.params.id;
        GetPosttestQRdetails(id, (err, results) => {
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
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results,
            });
        });
    },
    InsertPostTest: (req, res) => {
        const body = req.body;
        checkPostTestEntryExistORNot(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
                InsertPostTest(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        UpdatePosttestStatus(body, (err, results) => {
                            if (err) {
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            else {
                                return res.status(200).json({
                                    success: 1,
                                    message: "Post-Test over Successfully"
                                });
                            }
                        });
                    }
                });
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "You Already Attend the Test"
                });
            }
        })
    },

} 