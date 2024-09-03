const { logger } = require('../../logger/logger');
const { GetDatewiseEmps, ScheduleInductionTrainings, InsertInductionEmps, GetTypeWiseTraining, UpdateTrainers, UpdateDate, GetTraineers, GetInductionCanderDetails, GetIncutCalenderEmpDetails, GetIncutCalenderTrainers, UpdateDateOnScheduleTbl, UpdateAssignStatus, GetIncutCalenderDatas, GetInductDeptDatas, GetInductscheduledatas } = require('./TrainingInduction.service');
module.exports = {

    GetDatewiseEmps: (req, res) => {
        const body = req.body;
        GetDatewiseEmps(body, (err, results) => {
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

    ScheduleInductionTrainings: (req, res) => {
        const body = req.body;
        ScheduleInductionTrainings(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    insertId: results.insertId,
                    message: "Training Scheduled Succesfully"
                });
            }

        });
    },

    InsertInductionEmps: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.insertId, value.emp_id, value.date, value.dept_id, value.sect_id, value.create_user]
        })

        InsertInductionEmps(values, (err, results) => {
            if (err) {

                return res.status(200).json({
                    succes: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Training Scheduled Succesfully"
                });
                // const result = UpdateAssignStatus(body)
                //     .then((r) => {
                //         return res.status(200).json({
                //             success: 1,
                //             message: r
                //         });
                //     }).catch((e) => {
                //         return res.status(200).json({
                //             success: 0,
                //             message: e.sqlMessage
                //         });
                //     })
            }

        });

    },
    GetTypeWiseTraining: (req, res) => {
        const id = req.params.id;
        GetTypeWiseTraining(id, (err, results) => {
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
        })
    },

    UpdateTrainers: (req, res) => {
        const body = req.body;
        UpdateTrainers(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Trainers Updated successfully"
                });
            }

        });
    },
    UpdateDate: (req, res) => {
        const body = req.body;
        UpdateDate(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                // return res.status(200).json({
                //     success: 1,
                //     message: "Date Updated successfully"
                // });
                UpdateDateOnScheduleTbl(body, (err, results) => {
                    if (err) {

                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "Date Updated successfully"
                        });
                    }

                });
            }

        });

    },

    GetTraineers: (req, res) => {
        const body = req.body;
        GetTraineers(body, (err, results) => {
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

    GetInductionCanderDetails: (req, res) => {
        GetInductionCanderDetails((err, results) => {
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
    GetIncutCalenderEmpDetails: (req, res) => {
        const body = req.body;
        GetIncutCalenderEmpDetails(body, (err, results) => {
            const datas = results.map((val) => {
                const obj = {
                    emno: val.emno,
                    employee_name: val.employee_name,
                    indct_emp_no: val.indct_emp_no,
                    induction_date: val.induction_date,
                    schedule_slno: val.schedule_slno,
                    schedule_type: val.schedule_type,
                    sect_id: val.sect_id,
                    sect_name: val.sect_name,
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    trainers: JSON.parse(val.trainers),
                    trainingtype_slno: val.trainingtype_slno
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
    GetIncutCalenderTrainers: (req, res) => {
        const body = req.body;
        GetIncutCalenderTrainers(body, (err, results) => {
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

    GetIncutCalenderDatas: (req, res) => {
        const body = req.body;
        GetIncutCalenderDatas(body, (err, results) => {
            const datas = results.map((val) => {
                const obj = {
                    schedule_slno: val.schedule_slno,
                    schedule_type: val.schedule_type,
                    schedule_topic: val.schedule_topic,
                    induction_date: val.induction_date,
                    trainingtype_slno: val.trainingtype_slno,
                    type_name: val.type_name,
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    trainers: JSON.parse(val.trainers),
                    trainer_name: val.trainer_name
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

    GetInductDeptDatas: (req, res) => {
        const body = req.body;
        GetInductDeptDatas(body, (err, results) => {
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

    GetInductscheduledatas: (req, res) => {
        GetInductscheduledatas((err, results) => {
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
    }
} 