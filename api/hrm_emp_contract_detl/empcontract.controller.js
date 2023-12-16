const { create, update, getDataById,
    updatecontractclose,
    updateContractComplete, updateEmpMaster,
    getContractCloseDetl, getContractCloseDetlById, createContractlog,
    InsertArrearSalaryContractRenew, updateConreactrenewAppr,
    getContractRenewApprovalList,
    updateQualEmpId,
    EmpIDExpUpdate,
    UpdateEMpIdEarnDeduction,
    UpdateEMpIdPersonal, getContractByEmno,
    getContractDetlId, updateEmpmastSatus, updatePunchmstEmno,
    getEmployeeByUserName } = require('../hrm_emp_contract_detl/empcontract.service');

const { validateempcontract } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    creatempcontract: (req, res) => {
        const body = req.body;
        const body_result = validateempcontract.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        create(body, (err, results) => {
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
    updateempcontract: (req, res) => {

        const body = req.body;
        const body_result = validateempcontract.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

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
    updatecontractclose: (req, res) => {

        const body = req.body;
        // const body_result = validateempcontract.validate(body);

        // if (body_result.error) {
        //     return res.status(200).json({
        //         success: 1,
        //         message: body_result.error.details[0].message
        //     });
        // }
        updatecontractclose(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            else {
                updateEmpmastSatus(body, (err, results) => {
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
                        message: "Contract Closed Successfully"
                    });

                });

            }

        });
    },
    getempcontractByID: (req, res) => {
        const id = req.params.id;
        getDataById(id, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    //get contract close detl
    getContractCloseDetl: (req, res) => {
        getContractCloseDetl((err, results) => {
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
    getContractCloseDetlById: (req, res) => {
        const id = req.params.id;
        getContractCloseDetlById(id, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    createContractlog: (req, res) => {
        const body = req.body;
        createContractlog(body, (err, results) => {
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
    updateEmpMaster: (req, res) => {
        const body = req.body;
        updateEmpMaster(body, (err, results) => {

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
                success: 6,
                message: "Data Updated Successfully"
            });

        });
    },
    InsertArrearSalaryContractRenew: (req, res) => {
        const body = req.body;
        InsertArrearSalaryContractRenew(body, (err, results) => {
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
    updateContractComplete: (req, res) => {
        const body = req.body;
        updateContractComplete(body, (err, results) => {
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
                message: "Contract Completed Successfully"
            });

        });
    },
    updateConreactrenewAppr: (req, res) => {
        const body = req.body;
        updateConreactrenewAppr(body, (err, results) => {

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
                message: "Contract Renew Process Started"
            });

        });
    },
    getContractRenewApprovalList: (req, res) => {
        getContractRenewApprovalList((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 2,
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
    updateQualEmpId: (req, res) => {
        const body = req.body;
        updateQualEmpId(body, (err, results) => {

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
                message: "Contract Renew Process Started"
            });

        });
    },
    EmpIDExpUpdate: (req, res) => {
        const body = req.body;
        EmpIDExpUpdate(body, (err, results) => {

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
                message: "Contract Renew Process Started"
            });

        });
    },
    UpdateEMpIdEarnDeduction: (req, res) => {
        const body = req.body;
        UpdateEMpIdEarnDeduction(body, (err, results) => {

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
                message: "Contract Renew Process Started"
            });

        });
    },
    UpdateEMpIdPersonal: (req, res) => {
        const body = req.body;
        UpdateEMpIdPersonal(body, (err, results) => {

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
                message: "Contract Renew Process Started"
            });

        });
    },
    getContractByEmno: (req, res) => {
        const id = req.params.id;
        getContractByEmno(id, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    getContractDetlId: (req, res) => {
        const id = req.params.id;
        getContractDetlId(id, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    updatePunchmstEmno: (req, res) => {
        const body = req.body;
        const result = updatePunchmstEmno(body)
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
    getEmployeeByUserName: (req, res) => {
        const id = req.params.id;
        getEmployeeByUserName(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
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
}

