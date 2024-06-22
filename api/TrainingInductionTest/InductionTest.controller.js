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
    // GetLogEmpDetails: (req, res) => {
    //     const body = req.body;
    //     GetLogEmpDetails(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (results === 0) {
    //             return res.status(400).json({
    //                 success: 1,
    //                 message: "No Record Found"
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     });
    // },

    GetLogEmpDetails: (req, res) => {
        const body = req.body;
        GetLogEmpDetails(body, (err, results) => {
            const datas = results.map((val) => {
                const obj = {
                    em_id: val.em_id,
                    em_no: val.em_no,
                    em_name: val.em_name,
                    em_mobile: val.em_mobile,
                    em_department: val.em_department,
                    em_dept_section: val.em_dept_section,
                    em_designation: val.em_designation,
                    dept_id: val.dept_id,
                    dept_name: val.dept_name,
                    sect_id: val.sect_id,
                    sect_name: val.sect_name,
                    desg_slno: val.desg_slno,
                    desg_name: val.desg_name,
                    schedule_topic: val.schedule_topic,
                    indct_emp_no: val.indct_emp_no,
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    question_count: val.question_count,
                    pretest_status: val.pretest_status,
                    posttest_status: val.posttest_status,
                    online_mode: val.online_mode,
                    offline_mode: val.offline_mode,
                    training_status: val.training_status,
                    mark: val.mark,
                    postmark: val.postmark,
                    Emslno: val.Emslno,
                    schedule_no: val.schedule_no,
                    induct_detail_date: val.induct_detail_date,
                    trainers: JSON.parse(val.trainers),
                    fedbk_topic: val.fedbk_topic
                }
                return obj
            })
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
                // data: results,
                data: datas
            });
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