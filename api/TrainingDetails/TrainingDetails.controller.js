const { logger } = require('../../logger/logger')
const { GetDepartmentalTrainingDetails, GetInductionTrainingDetails, GetInductionTrainingEMPDetails, GetDepartmentalTrainingEMPDetails, GetDeptEmp, GetInductEmp, GetAllInductEmpData, GetAllDeptEmpData, GetTrainers, GetInductTrainers, GetTrainerApprvlsData, TrainerVerification, GetTrainerApprvlsInductData, TrainerInductVerification, GetHodDeptApprvlsData, HodDeptVerification, GetHodInductApprvlsData, HODInductVerification, GetDeptTrainers, GetHODdetails, GetInductTrainersDetails, GetAllPdfInductEmpData } = require('./TrainingDetails.service')
module.exports = {

    GetDepartmentalTrainingDetails: (req, res) => {
        const body = req.body;
        GetDepartmentalTrainingDetails(body, (err, results) => {
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
    GetInductionTrainingDetails: (req, res) => {
        const body = req.body;
        GetInductionTrainingDetails(body, (err, results) => {
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
    GetInductionTrainingEMPDetails: (req, res) => {
        const body = req.body;
        GetInductionTrainingEMPDetails(body, (err, results) => {
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
    GetDepartmentalTrainingEMPDetails: (req, res) => {
        const body = req.body;
        GetDepartmentalTrainingEMPDetails(body, (err, results) => {
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
    GetDeptEmp: (req, res) => {
        const id = req.params.id;
        GetDeptEmp(id, (err, results) => {
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
    GetInductEmp: (req, res) => {
        const id = req.params.id;
        GetInductEmp(id, (err, results) => {
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
    GetAllInductEmpData: (req, res) => {
        const id = req.params.id;
        GetAllInductEmpData(id, (err, results) => {
            const datas = results.map((val) => {
                const obj = {
                    em_id: val.em_id,
                    em_no: val.em_no,
                    indct_emp_no: val.indct_emp_no,
                    induct_post_mark: val.induct_post_mark,
                    induct_pre_mark: val.induct_pre_mark,
                    induct_quest_count: val.induct_quest_count,
                    induct_retest_mark: val.induct_retest_mark,
                    int_slno: val.int_slno,
                    online_mode: val.online_mode,
                    offline_mode: val.offline_mode,
                    pretest_status: val.pretest_status,
                    retest: val.retest,
                    schedule_no: val.schedule_no,
                    schedule_topic: val.schedule_topic,
                    schedule_type: val.schedule_type,
                    topic_slno: val.topic_slno,
                    trainers: JSON.parse(val.trainers),
                    training_topic_name: val.training_topic_name,
                    posttest_status: val.posttest_status,
                    induction_date: val.induction_date
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
                data: datas,
            });
        });
    },
    GetAllDeptEmpData: (req, res) => {
        const id = req.params.id;
        GetAllDeptEmpData(id, (err, results) => {
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
    //getTrainers
    GetTrainers: (req, res) => {
        const body = req.body;
        GetTrainers(body, (err, results) => {
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
    GetInductTrainers: (req, res) => {
        const body = req.body;
        GetInductTrainers(body, (err, results) => {
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

    GetTrainerApprvlsData: (req, res) => {
        const id = req.params.id;
        GetTrainerApprvlsData(id, (err, results) => {
            if (err) {
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
    TrainerVerification: (req, res) => {
        const body = req.body;
        TrainerVerification(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Approved Successfully"
                });
            }

        });
    },
    GetTrainerApprvlsInductData: (req, res) => {
        const id = req.params.id;
        GetTrainerApprvlsInductData(id, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    TrainerInductVerification: (req, res) => {
        const body = req.body;
        TrainerInductVerification(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Approved Successfully"
                });
            }

        });
    },

    GetHodDeptApprvlsData: (req, res) => {
        const id = req.params.id;
        GetHodDeptApprvlsData(id, (err, results) => {
            if (err) {
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
    HodDeptVerification: (req, res) => {

        const body = req.body;
        HodDeptVerification(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Approved Successfully"
                });
            }

        });
    },
    GetHodInductApprvlsData: (req, res) => {
        const id = req.params.id;
        GetHodInductApprvlsData(id, (err, results) => {
            if (err) {
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
    HODInductVerification: (req, res) => {
        const body = req.body;
        HODInductVerification(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Approved Successfully"
                });
            }

        });
    },

    GetDeptTrainers: (req, res) => {
        const id = req.params.id;
        GetDeptTrainers(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    status: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    status: 0,
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                status: 2,
                datas: results,
            });
        });
    },
    GetHODdetails: (req, res) => {
        const id = req.params.id;
        GetHODdetails(id, (err, results) => {
            if (err) {
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
                dataas: results,
            });
        });
    },
    GetInductTrainersDetails: (req, res) => {
        const id = req.params.id;
        GetInductTrainersDetails(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    status: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    status: 0,
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                status: 2,
                datas: results,
            });
        });
    },
    GetAllPdfInductEmpData: (req, res) => {
        const id = req.params.id;
        GetAllPdfInductEmpData(id, (err, results) => {
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
}



