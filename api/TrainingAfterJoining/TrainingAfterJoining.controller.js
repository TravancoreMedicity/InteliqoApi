
const { TrainingAfterJoiningGet, TrainingNewJoineeInsert, JoineeDetailsInsert,
    JoineeDetailsUpdate, ScheduleDetailsGet, ScheduleUpdate, ScheduleDateUpdate, GetTopic, GetTrainers, ScheduleInsert,
    GetScheduleDetails, DepartmentalScheduleInsert, DepartmentalScheduleGet, getDeptTopic, getEmpNameBydepID, InsertEmpDetails,
    GetDeptEmpNameDetails, InsertTrainingMaster, ScheduleDateDetailUpdate, UpdateTrainers, getTrainerByTopic } = require('./TrainingAfterJoining.service');

module.exports = {

    TrainingAfterJoiningGet: (req, res) => {
        TrainingAfterJoiningGet((err, results) => {

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
    TrainingNewJoineeInsert: (req, res) => {
        const body = req.body;
        TrainingNewJoineeInsert(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Inserted"
                });
            }

        });
    },


    JoineeDetailsInsert: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.tnd_emp_id, value.trainingtype_slno, value.cat_slno, value.name_slno, value.tnd_date, value.create_user]
        })
        JoineeDetailsInsert(values, (err, results) => {
            if (err) {
                return res.status(200).json({
                    successmsg: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    successmsg: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                successmsg: 1,
                message: " Submitted Successfully"
            });
        });
    },
    JoineeDetailsUpdate: (req, res) => {
        const body = req.body;
        JoineeDetailsUpdate(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Inserted successfully"
                });
            }

        });
    },
    ScheduleDetailsGet: (req, res) => {
        ScheduleDetailsGet((err, results) => {

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
    ScheduleUpdate: (req, res) => {
        const body = req.body;
        ScheduleUpdate(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Schedule Date Updated successfully"
                });
            }

        });
    },
    GetTopic: (req, res) => {
        GetTopic((err, results) => {

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
    GetTrainers: (req, res) => {
        GetTrainers((err, results) => {

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
    ScheduleInsert: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.tes_dept, value.tes_dept_sec, value.tes_topic,
            JSON.stringify(value.tes_emp_name), value.date, value.tes_remark, value.create_user

            ]
        })
        ScheduleInsert(values, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Successfully Inserted"
                });
            }

        });
    },
    GetScheduleDetails: (req, res) => {
        GetScheduleDetails((err, results) => {

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

    DepartmentalScheduleInsert: (req, res) => {
        const body = req.body;
        DepartmentalScheduleInsert(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Successfully Inserted"
                });
            }

        });
    },

    DepartmentalScheduleGet: (req, res) => {
        const body = req.body;
        DepartmentalScheduleGet(body, (err, results) => {
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

    ScheduleDateUpdate: (req, res) => {
        const body = req.body;
        ScheduleDateUpdate(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {

                ScheduleDateDetailUpdate(body, (err, results) => {
                    if (err) {

                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {


                        return res.status(200).json({
                            success: 1,
                            message: "Schedule Date Updated successfully"
                        });
                    }

                });
            }

        });
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



    getDeptTopic: (req, res) => {
        const id = req.params.id;
        getDeptTopic(id, (err, results) => {
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
                success: 1,
                data: results,
            });
        });
    },
    getEmpNameBydepID: (req, res) => {
        const id = req.params.id;
        getEmpNameBydepID(id, (err, results) => {
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
                success: 1,
                data: results,
            });
        });
    },

    InsertEmpDetails: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.slno, value.emp_name, value.emp_desig, value.emp_dept, value.emp_dept_sectn, value.topic, value.schedule_date,
            value.create_user
            ]
        })
        InsertEmpDetails(values, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Successfully Inserted"
                });
            }

        });
    },
    GetDeptEmpNameDetails: (req, res) => {
        const id = req.params.id;
        GetDeptEmpNameDetails(id, (err, results) => {
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
                success: 1,
                data: results,
            });
        });
    },

    InsertTrainingMaster: (req, res) => {
        const body = req.body;
        InsertTrainingMaster(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Inserted"
                });
            }

        });
    },
    getTrainerByTopic: (req, res) => {
        const id = req.params.id;
        getTrainerByTopic(id, (err, results) => {

            const datas = results.map((val) => {
                const obj = {
                    topic_slno: val.topic_slno,
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
                success: 1,
                data: datas,
            });
        });
    },
}
