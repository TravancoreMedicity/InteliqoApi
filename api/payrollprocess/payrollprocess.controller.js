const { empDeptdata, empDeptSecdata, empNameBasedata, getFixedByEmid,
    getTotalFineByEmid, getTotalFixedByEmid, getTotalEarningsByEmid,
    getTotalDeductionByEmid, getDeductionByEmid, getEarningByEmid,
    getLopByEmid, getTotalGrosssalaryById, GetPfStatus, getPFcalcalculatingamt,
    GetEsiStatus, getESIcalculatingamt,
    createAttendanceManual,
    getPaySlipTableData, getEmpEarningData, getEmpFixedWageData,
    getEmpDeductionData, getAllEarnData, createPayrollpayslip,
    createPayrollpayslipDetl, checkAttendanceProcess, getPunchdata,
    getattendancemark } = require('../payrollprocess/payrollprocess.service');
const logger = require('../../logger/logger')
module.exports = {
    empDeptdata: (req, res) => {
        const body = req.body
        empDeptdata(body, (err, results) => {
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
    empDeptSecdata: (req, res) => {
        const body = req.body
        empDeptSecdata(body, (err, results) => {
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
    empNameBasedata: (req, res) => {
        const body = req.body
        empNameBasedata(body, (err, results) => {
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
    getFixedByEmid: (req, res) => {
        const id = req.params.id;
        getFixedByEmid(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getTotalFixedByEmid: (req, res) => {
        const id = req.params.id;
        getTotalFixedByEmid(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getEarningByEmid: (req, res) => {
        const id = req.params.id;
        getEarningByEmid(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getTotalEarningsByEmid: (req, res) => {
        const id = req.params.id;
        getTotalEarningsByEmid(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getDeductionByEmid: (req, res) => {
        const id = req.params.id;
        getDeductionByEmid(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getTotalDeductionByEmid: (req, res) => {
        const id = req.params.id;
        getTotalDeductionByEmid(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getTotalFineByEmid: (req, res) => {
        const body = req.body
        getTotalFineByEmid(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getLopByEmid: (req, res) => {
        const body = req.body
        getLopByEmid(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getTotalGrosssalaryById: (req, res) => {
        const id = req.params.id;
        getTotalGrosssalaryById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    GetPfStatus: (req, res) => {
        const id = req.params.id;
        GetPfStatus(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getPFcalcalculatingamt: (req, res) => {
        const id = req.params.id;
        getPFcalcalculatingamt(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    GetEsiStatus: (req, res) => {
        const id = req.params.id;
        GetEsiStatus(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getESIcalculatingamt: (req, res) => {
        const id = req.params.id;
        getESIcalculatingamt(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    createAttendanceManual: (req, res) => {
        var values = req.body.map((value, index) => {
            return [value.em_no,
            value.em_id,
            value.dept_id,
            value.sect_id,
            value.attendance_marking_month,
            value.attnd_mark_startdate,
            value.attnd_mark_enddate,
            value.total_working_days,
            value.tot_days_present,
            value.calculated_worked,
            value.off_days,
            value.total_leave,
            value.total_lwp,
            value.total_lop,
            value.calculated_lop,
            value.total_days,
            value.total_holidays,
            value.holiday_worked,
            value.process_status
            ]
        })
        createAttendanceManual(values, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
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
                message: "Data Submitted Successfully"
            });
        });
    },
    getPaySlipTableData: (req, res) => {
        const body = req.body
        getPaySlipTableData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getEmpEarningData: (req, res) => {
        const body = req.body
        getEmpEarningData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getEmpFixedWageData: (req, res) => {
        const body = req.body
        getEmpFixedWageData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
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
    getEmpDeductionData: (req, res) => {
        const body = req.body
        getEmpDeductionData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getAllEarnData: (req, res) => {
        const body = req.body
        getAllEarnData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    createPayrollpayslip: (req, res) => {
        var values = req.body.map((value, index) => {
            return [
                value.em_no,
                value.em_id,
                value.dept_id,
                value.sect_id,
                value.total_working_days,
                value.total_days,
                value.fixed_wages,
                value.earning_wages,
                value.deduct_wages,
                value.gross_amount,
                value.net_amount,
                value.attendance_marking_month,
                value.esi_employee,
                value.esi_employer,
                value.pf_employee,
                value.pf_employer,
            ]
        })
        createPayrollpayslip(values, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
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
                message: "Data Submitted Successfully"
            });
        });
    },
    createPayrollpayslipDetl: (req, res) => {
        var values = req.body.map((value, index) => {
            return [
                value.em_no,
                value.em_id,
                value.em_earning_type,
                value.earning_type_name,
                value.em_amount,
                value.em_salary_desc,
                value.total_working_days,
                value.total_days,
                value.worked_amount,
                value.attendance_marking_month
            ]
        })
        createPayrollpayslipDetl(values, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
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
                message: "Data Submitted Successfully"
            });
        });
    },
    checkAttendanceProcess: (req, res) => {
        const body = req.body
        checkAttendanceProcess(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
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
    getPunchdata: (req, res) => {
        const body = req.body
        getPunchdata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
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
        });
    },
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
                data: results
            });
        });
    },
}