const { empDeptdata, empDeptSecdata, empNameBasedata, getFixedByEmid, getTotalFineByEmid,
    getTotalFixedByEmid, getTotalEarningsByEmid, getTotalDeductionByEmid, getDeductionByEmid,
    getEarningByEmid, getLopByEmid, getTotalGrosssalaryById, GetPfStatus, getPFcalcalculatingamt,
    GetEsiStatus, getESIcalculatingamt, createAttendanceManual, DutyPlanLock, dutyPlanUnLock,
    punchMastLock, getPaySlipTableData, getEmpEarningData, getEmpFixedWageData, getEmpDeductionData,
    getAllEarnData, createPayrollpayslip, createPayrollpayslipDetl, checkAttendanceProcess, getPunchdata,
    getPunchmastData, getattendancemark, getEmpNoDeptWise, getPaySlipData, getIndvidualPayslipDetl,
    checkPayslipDataExist, deptWisePaySlipData, empWisePaySlipDetl, checkInsertVal, InsertPunchInOutHr,
    updatePunchInOutHr, getPunchInOutHr, CancelPunchInOutHr, getPunchByEmid, InsertArrearSalary,
    getArearData, getAllEmployee, getPunchMarkingHr, getPunchMarkingHrFull, getTotalGrosssalaryByno,
    getPunchMasterSalaryAllEmployee, getAcriveDepartmentSection, getPunchmastAboveSelectedDate,
    getPunchAboveSelectedDate, submitProcessedSalary, inertMonthlyProcess, getProcessedDepartments,
    getPayrollDetails, CancelPayrollProcess, deleteProcessedSalary, ActivatePayrollProcess,
    getSectionWiseEmployee, getPayrollDetailsByDept
} = require('../payrollprocess/payrollprocess.service');
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

    DutyPlanLock: (req, res) => {
        const body = req.body;
        const result = DutyPlanLock(body)
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

    dutyPlanUnLock: (req, res) => {
        const body = req.body;
        const result = dutyPlanUnLock(body)
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

    punchMastLock: (req, res) => {
        const body = req.body;
        const result = punchMastLock(body)
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
                    success: 2,
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
                value.total_lop,
                value.calculated_lop
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
    getEmpNoDeptWise: (req, res) => {
        const body = req.body
        getEmpNoDeptWise(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    succes: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succes: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                succes: 1,
                dataa: results
            });
        });
    },
    getPunchmastData: (req, res) => {
        const body = req.body
        getPunchmastData(body, (err, results) => {
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
    getPaySlipData: (req, res) => {
        const body = req.body
        getPaySlipData(body, (err, results) => {
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
    getIndvidualPayslipDetl: (req, res) => {
        const body = req.body
        getIndvidualPayslipDetl(body, (err, results) => {
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
    checkPayslipDataExist: (req, res) => {
        const body = req.body
        checkPayslipDataExist(body, (err, results) => {
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
    deptWisePaySlipData: (req, res) => {
        const body = req.body
        deptWisePaySlipData(body, (err, results) => {
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
    empWisePaySlipDetl: (req, res) => {
        const body = req.body
        empWisePaySlipDetl(body, (err, results) => {
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
                succes: 1,
                datas: results
            });
        });
    },

    InsertPunchInOutHr: (req, res) => {
        const body = req.body;
        // checkInsertVal(body, (err, results) => {

        // const value = JSON.parse(JSON.stringify(results))
        // if (Object.keys(value).length === 0) {

        InsertPunchInOutHr(body, (err, results) => {

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

        // } else {

        // updatePunchInOutHr(body, (err, results) => {

        //     if (err) {
        //         logger.errorLogger(err)
        //         return res.status(200).json({
        //             success: 0,
        //             message: err
        //         });
        //     }

        //     if (!results) {
        //         return res.status(200).json({
        //             success: 2,
        //             message: "Record Not Found"
        //         });
        //     }

        //     return res.status(200).json({
        //         success: 1,
        //         message: "Data Updated Successfully"
        //     });

        // });

        // }
        // })
    },
    getPunchInOutHr: (req, res) => {
        const body = req.body
        getPunchInOutHr(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    succes: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succes: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                succes: 1,
                dataa: results
            });
        });
    },
    CancelPunchInOutHr: (req, res) => {
        const body = req.body
        CancelPunchInOutHr(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Data Updated Successfully"
            });

        });
    },
    getPunchByEmid: (req, res) => {
        const body = req.body
        getPunchByEmid(body, (err, results) => {
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
    InsertArrearSalary: (req, res) => {
        const body = req.body;
        InsertArrearSalary(body, (err, results) => {
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
    getArearData: (req, res) => {
        const body = req.body
        getArearData(body, (err, results) => {
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
    getAllEmployee: (req, res) => {
        const body = req.body
        getAllEmployee(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    succes: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succes: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                succes: 1,
                dataa: results
            });
        });
    },
    getPunchMarkingHr: (req, res) => {
        const body = req.body
        getPunchMarkingHr(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getPunchMarkingHrFull: (req, res) => {
        const body = req.body
        getPunchMarkingHrFull(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    succ: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succ: 2,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                succ: 1,
                data: results
            });
        });
    },
    getTotalGrosssalaryByno: (req, res) => {
        const id = req.params.id;
        getTotalGrosssalaryByno(id, (err, results) => {
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
    getPunchMasterSalaryAllEmployee: (req, res) => {
        const body = req.body
        getPunchMasterSalaryAllEmployee(body, (err, results) => {
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
    getAcriveDepartmentSection: (req, res) => {
        getAcriveDepartmentSection((err, results) => {
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
    getPunchmastAboveSelectedDate: (req, res) => {
        const body = req.body;
        getPunchmastAboveSelectedDate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getPunchAboveSelectedDate: (req, res) => {
        const body = req.body;
        getPunchAboveSelectedDate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    submitProcessedSalary: (req, res) => {
        var values = req.body.map((value, index) => {
            return [
                value.em_id,
                value.em_no,
                value.branch_slno,
                value.dept_id,
                value.sect_id,
                value.category_slno,
                value.desg_slno,
                value.inst_slno,
                value.em_account_no,
                value.em_ifsc,
                value.totalDays,
                value.totalLeaves,
                value.totalHoliday,
                value.totalHD,
                value.totalLC,
                value.totallopCount,
                value.paydays,
                value.lopAmount,
                value.npsamount,
                value.lwfamount,
                value.deductValue,
                value.empSalary,
                value.totalSalary,
                value.holidayworked,
                value.holidaySalary,
                value.processed_month
            ]
        })
        submitProcessedSalary(values, (err, results) => {
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
    inertMonthlyProcess: (req, res) => {
        const body = req.body;
        inertMonthlyProcess(body, (err, results) => {

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
    getProcessedDepartments: (req, res) => {
        const body = req.body
        getProcessedDepartments(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    succ: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succ: 2,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                succ: 1,
                data: results
            });
        });
    },
    getPayrollDetails: (req, res) => {
        const body = req.body
        getPayrollDetails(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    succ: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succ: 2,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    CancelPayrollProcess: (req, res) => {
        const body = req.body
        CancelPayrollProcess(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    succ: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succ: 2,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    deleteProcessedSalary: (req, res) => {
        const body = req.body
        deleteProcessedSalary(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    succ: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succ: 2,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getSectionWiseEmployee: (req, res) => {
        const body = req.body
        getSectionWiseEmployee(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    succes: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succes: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                succes: 1,
                dataa: results
            });
        });
    },
    ActivatePayrollProcess: (req, res) => {
        const body = req.body
        ActivatePayrollProcess(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    succ: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succ: 2,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getPayrollDetailsByDept: (req, res) => {
        const body = req.body
        getPayrollDetailsByDept(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    succ: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    succ: 2,
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