const { format } = require("date-fns");
const {
    validateDoctorDuty,
    validateDoctorempRights
} = require("../../validation/validation_schema");
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
    createDoctorPunch,
    getDoctorsByNMC,
    updateNMCpunch,
    getDoctorPunchmastData,
    logDoctorPunch,
    getDoctorpunchLog,
    activeDoctorsList,
    clinicalDoctorsList,
    accademicDoctorsList,
    getDoctorpunch,
    nmcDoctorPunch,
    gettodayPresentDoctor,
    checkInsertVal,
    getDutyplanByDate,
    createRights,
    checkEmployeeHasRights,
    getEmployeeDocDepartments,
    updateDeptRights,
    getEmployeeDepartments,
    createDoctorCoff,
    doctorLeaveRequestUniquNumer,
    checkDoctorLeaveexist,
    saveLeaveRequest,
    saveLeaveDetailedTable,
    cancelDoctorLeaveReqMaster,
    getSelectedDateShift,
    updateCOFFLeave
} = require("./doctorService");
const { leaveRequestUniquNumer, checkLeaveexist, saveLeaveRequestMasterTable, saveDetailedTableFun, cancelLeaveReqMasterTable } = require("../LeaveRequest/LeaveRequest.service");

module.exports = {
    checkDoctorDutyplan: (req, res) => {
        const body = req.body;
        checkDoctorDutyplan(body, (err, results) => {
            if (err) {
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
                value.plan_user
            ]
        })

        insertDutyplan(a1, (err, results) => {
            if (err) {
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
        //validate department Inster function
        const body_result = validateDoctorDuty.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.duty_name = body_result.value.duty_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {

                createDoctorDuty(body, (err, results) => {
                    if (err) {
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
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Doctor Duty Already Exist"
                })
            }
        })
    },
    getDutyList: (req, res) => {
        getDutyList((err, results) => {
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
    updateDoctorduty: (req, res) => {
        const body = req.body;
        updateDoctorduty(body, (err, results) => {
            if (err) {
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
                //  logger.errorLogger(err)
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
        var a1 = body?.map((value, index) => {
            return [value.date, value.emp_id, value.em_no, value.shift,
                value.holidayStatus, value.holidayName, value.holidaySlno,
                value.plan_user
            ]
        })

        insertDutyplan(a1, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
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
        const {  insertArray } = body

        var a1 = insertArray?.map((value, index) => {
            return [
                value.attendanceId,
                value.inTime,
                value.outTime,
                value.status,
            ]
        })

        const nmc_regnoList = insertArray?.map((val) => val?.attendanceId)
        createDoctorPunch(a1, (err, results) => {
            
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
            
            getDoctorsByNMC(nmc_regnoList, (err, results) => {
            if (err) {
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
                    message: "Punch Updated Successfully",
                    data: results                  
                });
            // const result = updateNMCpunch(newArray)
            //     .then((r) => {
            //         logDoctorPunch(em_id, (err, results) => {
            //             if (err) {
            //                 return res.status(200).json({
            //                     success: 2,
            //                     message: err
            //                 });
            //             }
            //             if (!results) {
            //                 return res.status(200).json({
            //                     success: 0,
            //                     message: "No Results Found"
            //                 });
            //             }
            //             return res.status(200).json({
            //                 success: 1,
            //                 message: "Punch Updated Successfully"
            //             });
            //         });
            //     }).catch((e) => {
            //         return res.status(200).json({
            //             success: 0,
            //             message: e.sqlMessage
            //         });
            //     })
            })
        });
    },
    getDoctorsByNMC: (req, res) => {
        const body = req.body;
        getDoctorsByNMC(body, (err, results) => {
            if (err) {
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
    getDoctorPunchmastData: (req, res) => {
        const body = req.body
        getDoctorPunchmastData(body, (err, results) => {
            if (err) {
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
    getDoctorpunchLog: (req, res) => {
        getDoctorpunchLog((err, results) => {
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
                data: results[results?.length - 1]
            });
        });
    },
    activeDoctorsList: (req, res) => {
        activeDoctorsList((err, results) => {
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
    clinicalDoctorsList: (req, res) => {
        clinicalDoctorsList((err, results) => {
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
    accademicDoctorsList: (req, res) => {
        accademicDoctorsList((err, results) => {
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
    tmcPunchedDoctorList: (req, res) => {
        getDoctorpunch((err, results) => {
            if (err) {
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
    nmcPunchedDoctorList: (req, res) => {
        activeDoctorsList((err, results) => {
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

            const nmcArr = results?.map((val) => val?.nmc_regno)?.filter(val => val != null);
            const post = {
                id: nmcArr
            }
            nmcDoctorPunch(post, (err, results) => {
                if (err) {
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
        });
    },
    gettodayPresentDoctor: (req, res) => {
        gettodayPresentDoctor((err, results) => {
            if (err) {
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
    getDutyplanByDate: (req, res) => {
        const body = req.body;
        getDutyplanByDate(body, (err, results) => {
            if (err) {
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
    createRights: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.em_id, value.department, value.right_status]
        })
        createRights(a1, (err, results) => {
            if (err) {
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
    getEmployeeDocDepartments: (req, res) => {
        getEmployeeDocDepartments((err, results) => {
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
    updateDeptRights: (req, res) => {
        const body = req.body;
        checkEmployeeHasRights(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                updateDeptRights(body, (err, results) => {
                    if (err) {
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
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Employee Rights Already Exist"
                })
            }
        })
    },
    getEmployeeDepartments: (req, res) => {
        const body = req.body;
        getEmployeeDepartments(body, (err, results) => {
            if (err) {
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
    createDoctorCoff: (req, res) => {
        const body = req.body;
        createDoctorCoff(body, (err, results) => {
            if (err) {
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
            updateCOFFLeave(body, (err, results) => {
            if (err) {
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
                message: "COFF Updated Successfully"
            });

        });
        });
    },
    updatePunchMasterLeave: async (req, res) => {
        const body = req.body;
        updatePunchMasterLeave(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    getSelectedDateShift: (req, res) => {
            const body = req.body;
            getSelectedDateShift(body, (err, results) => {
                if (err) {
                    logger.errorLogger(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                else if (results?.length === 0) {
                    return res.status(200).json({
                        success: 2,
                        message: "No Record Found"
                    });
                }
                else {
                    return res.status(200).json({
                        success: 1,
                        data: results
                    });
                }
            });
        },
        updateDoctorPunchMast: (req, res) => {
        const body = req.body;
        const {   em_id,  insertArray } = body;      
        const result =updateNMCpunch(insertArray)
            .then((r) => {
            logDoctorPunch(em_id, (err, results) => {
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
                    message: "Punch Updated Successfully"
                });
            });
            }).catch((e) => {
                return res.status(200).json({
                    success: 0,
                    message: e.sqlMessage
                });
            })
    },
}