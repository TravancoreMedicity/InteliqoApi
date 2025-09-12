const {
    checkDoctorDutyplan,
    insertDutyplan,
    createDoctorDuty,
    getDutyList,
    updateDoctorduty,
    updateDoctorDutyPlan,
    getDutyplan,
    getDoctorById,
    getdoctorDept,
    getDoctorSectionByDept,
    createDoctorPunch } = require("./doctorService");

module.exports = {
    checkDoctorDutyplan: (req, res) => {
        const body = req.body;
        checkDoctorDutyplan(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err,
                    data: []
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    insertDutyplan: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.date, value.emp_id, value.em_no, value.shift,
            value.holidayStatus, value.holidayName, value.holidaySlno,
            value.plan_user]
        })

        insertDutyplan(a1, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success1: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success1: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success1: 1,
                message: "Data Created Successfully"
            });
        });
    },
    createDoctorDuty: (req, res) => {
        const body = req.body;
        createDoctorDuty(body, (err, results) => {
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
                message: "Data Created Successfully"
            });

        });
    },
    getDutyList: (req, res) => {
        getDutyList((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
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
    updateDoctorduty: (req, res) => {
        const body = req.body;
        updateDoctorduty(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Data Updated Successfully"
            });

        });
    },
    updateDoctorDutyPlan: (req, res) => {
        const body = req.body;
        const result = updateDoctorDutyPlan(body)
            .then((r) => {
                return res.status(200).json({
                    success: 1,
                    message: r
                });
            }).catch((e) => {
                return res.status(200).json({
                    success: 0,
                    message: e.sqlMessage
                });
            })
    },
    getDutyplan: (req, res) => {
        const body = req.body;
        getDutyplan(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err,
                    data: []
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getDoctorById: (req, res) => {
        const id = req.params.id;
        getDoctorById(id, (err, results) => {
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
        });

    },
    getdoctorDept: (req, res) => {
        getdoctorDept((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
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
    getDoctorSectionByDept: (req, res) => {
        const id = req.params.id;
        getDoctorSectionByDept(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Department Section under this Department"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    insertDutyplan: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.date, value.emp_id, value.em_no, value.shift,
            value.holidayStatus, value.holidayName, value.holidaySlno,
            value.plan_user]
        })

        insertDutyplan(a1, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success1: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success1: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success1: 1,
                message: "Data Created Successfully"
            });
        });
    },
    createDoctorPunch: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [
                value.Attendance_id,
                value.In_Time,
                value.Out_Time,
                value.Status,
            ]
        })

        createDoctorPunch(a1, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Created Successfully"
            });
        });
    },
}