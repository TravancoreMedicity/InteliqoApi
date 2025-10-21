const {
    create,
    update,
    deleteByID,
    getData,
    getDataById,
    getSelect,
    getEmpByDeptAndSection,
    updateserialnum,
    updateCompanyInfo,
    createCompanyInfo,
    updatecategory,
    getDepartmentSectEmployye,
    checkidvaluedate,
    getCategoryType,
    updateDeptSec,
    getInactiveEmpByDeptAndSection,
    InActiveEmpHR,
    getEmpBybranch,
    getEmpByDeptartment,
    updateEmpRegister,
    getDataByEmpno,
    getDataByEmpID,
    createContractDetl,
    UpdateContractDetlStatus,
    UpdateContractDetl,
    ActiveEmploye,
    insertInactiveEmp,
    getEmpList,
    insertActivateEmp,
    createCompany,
    updateContractEmpmastData,
    updatePermanentData,
    empLoginDeactivate,
    getDoctors,
    getDoctorsbyDeptSectionWise
} = require('../hrm_emp_master/empmast.service');
const {
    validateempmaster,
    validateempmasterupdate,
    validateempmasterEdit
} = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createempmast: (req, res) => {
        const body = req.body;
        const body_result = validateempmaster.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.em_name = body_result.value.em_name;
        body.addressPermnt1 = body_result.value.addressPermnt1;
        body.addressPermnt2 = body_result.value.addressPermnt2;
        body.addressPresent2 = body_result.value.addressPresent2;
        body.addressPresent1 = body_result.value.addressPresent1;

        checkidvaluedate(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                // Insert the values
                create(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    } else if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "No Results Found"
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Data Created Successfully"
                        });
                    }

                });
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Employee ID  Already Exist"
                })
            }
        })

    },
    updateempmast: (req, res) => {

        const body = req.body;
        const body_result = validateempmasterupdate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.em_name = body_result.value.em_name;
        update(body, (err, results) => {
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
    updateEmpRegister: (req, res) => {

        const body = req.body;
        const body_result = validateempmasterEdit.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.em_name = body_result.value.em_name;

        updateEmpRegister(body, (err, results) => {
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
    inactiveempmast: (req, res) => {

        const body = req.body;

        deleteByID(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Record Deleted Successfully"
            });
        });
    },
    getempmast: (req, res) => {

        getData((err, results) => {
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
    getempmastByID: (req, res) => {

        const id = req.params.id;
        getDataById(id, (err, results) => {
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
    getSelectEmpmast: (req, res) => {

        getSelect((err, results) => {
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
    getDepartAndSectionEmpDetl: (req, res) => {
        const body = req.body

        getEmpByDeptAndSection(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
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
                data: results
            });
        })
    },
    getInactiveEmpByDeptAndSection: (req, res) => {
        const body = req.body

        getInactiveEmpByDeptAndSection(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
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
                data: results
            });
        })
    },
    getEmpBybranch: (req, res) => {
        const body = req.body

        getEmpBybranch(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
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
                data: results
            });
        })
    },
    getEmpByDeptartment: (req, res) => {
        const body = req.body
        getEmpByDeptartment(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
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
                data: results
            });
        })
    },
    createCompanyInfo: (req, res) => {
        const body = req.body;

        createCompanyInfo(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            } else {
                updateCompanyInfo(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 2,
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
                        success: 1,
                        message: "Data Updated Successfully"
                    });

                });

            }
        })
    },

    updatecategory: (req, res) => {

        const body = req.body;


        updatecategory(body, (err, results) => {

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
    getDepartmentSectEmployye: (req, res) => {
        const body = req.body;
        getDepartmentSectEmployye(body, (err, results) => {
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
    getCategoryType: (req, res) => {

        const id = req.params.id;
        getCategoryType(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(400).json({
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
    updateDeptSec: (req, res) => {

        const body = req.body;

        updateDeptSec(body, (err, results) => {

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
    InActiveEmpHR: (req, res) => {
        const body = req.body;
        InActiveEmpHR(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            } else {
                empLoginDeactivate(body, (err, results) => {

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
            }


        });
    },

    updateserialnum: (req, res) => {


        updateserialnum((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Employee Number Updated Successfully"
            });
        });
    },

    getDataByEmpno: (req, res) => {

        const id = req.params.id;
        getDataByEmpno(id, (err, results) => {
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
    getDataByEmpID: (req, res) => {
        const id = req.params.id;
        getDataByEmpID(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(400).json({
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
    checkidvaluedate: (req, res) => {
        const body = req.body;
        checkidvaluedate(body, (err, results) => {
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
    createContractDetl: (req, res) => {
        const body = req.body;
        createContractDetl(body, (err, results) => {
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
                message: "Data Created Successfully"
            });
        });
    },
    UpdateContractDetlStatus: (req, res) => {
        const body = req.body;
        UpdateContractDetlStatus(body, (err, results) => {

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
    UpdateContractDetl: (req, res) => {
        const body = req.body;
        UpdateContractDetl(body, (err, results) => {

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
    ActiveEmploye: (req, res) => {
        const body = req.body;
        ActiveEmploye(body, (err, results) => {

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
    insertInactiveEmp: (req, res) => {
        const body = req.body;
        insertInactiveEmp(body, (err, results) => {
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
                message: "Data Created Successfully"
            });
        });
    },
    getEmpList: (req, res) => {
        const body = req.body;
        getEmpList(body, (err, results) => {
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
    insertActivateEmp: (req, res) => {
        const body = req.body;
        insertActivateEmp(body, (err, results) => {
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
                message: "Data Created Successfully"
            });
        });
    },
    createCompany: (req, res) => {

        const body = req.body;

        createCompany(body, (err, results) => {

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
    craeteCateChange: (req, res) => {
        const body = req.body;
        createCompanyInfo(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            } else {
                updateContractEmpmastData(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 2,
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
                        success: 1,
                        message: "Data Updated Successfully"
                    });

                });

            }
        })
    },
    createPermanentChange: (req, res) => {
        const body = req.body;
        createCompanyInfo(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            } else {
                updatePermanentData(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 2,
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
                        success: 1,
                        message: "Data Updated Successfully"
                    });

                });

            }
        })
    },
    getDoctors: (req, res) => {
        const body = req.body

        getDoctors(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
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
                data: results
            });
        })
    },
    getDoctorsbyDeptSectionWise: (req, res) => {
        const body = req.body
        getDoctorsbyDeptSectionWise(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err,
                    data:[]
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data:[]
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
                message: "Data Found"
            });
        })
    },
}