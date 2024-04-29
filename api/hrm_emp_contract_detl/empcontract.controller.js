const { create, update, getDataById,
    updatecontractclose, updateContractComplete, updateEmpMaster, getContractCloseDetl,
    getContractCloseDetlById, createContractlog, InsertArrearSalaryContractRenew, updateConreactrenewAppr,
    getContractRenewApprovalList, updateQualEmpId, EmpIDExpUpdate, UpdateEMpIdEarnDeduction,
    UpdateEMpIdPersonal, getContractByEmno, getContractDetlId, updateEmpmastSatus,
    getEmployeeByUserName, inactiveLoginNewPromise, activeLoginNewPromise, newLoginInsert,
    updateQualEmpno, updateDutyPlanData, updatePunchmstEmno, newEntryContract,
    deleteNewLoginEntry,
    reverseUpdateQualEmpno } = require('../hrm_emp_contract_detl/empcontract.service');

const { validateempcontract } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { genSaltSync, hashSync } = require('bcrypt');
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
    // updateEmpMaster: (req, res) => {
    //     const body = req.body;
    //     updateEmpMaster(body, (err, results) => {

    //         if (err) {
    //             logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: "Record Not Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 6,
    //             message: "Data Updated Successfully"
    //         });

    //     });
    // },
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
    // updatePunchmstEmno: (req, res) => {
    //     const body = req.body;
    //     const result = updatePunchmstEmno(body)
    //         .then((r) => {
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: r
    //             });
    //         }).catch((e) => {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: e.sqlMessage
    //             });
    //         })
    // },
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
    updateContractEmployee: (req, res) => {
        const body = req.body;
        if (Object.keys(body).length === 0) { // Object length zero return with no effect
            return res.status(200).json({
                success: 0,
                message: err
            });
        }

        const Func = async (body) => {
            const { emp_slno } = body;
            const newEmpData = {
                em_no: body.em_no,
                em_category: body.em_category,
                em_contract_end_date: body.em_contract_end_date,
                em_prob_end_date: body.em_prob_end_date,
                probation_status: body.probation_status,
                contract_status: body.contract_status,
                em_doj: body.em_doj,
                actual_doj: body.actual_doj,
                em_designation: body.em_designation,
                em_id: body.em_id
            }

            const oldData = {
                em_no: body.old_emno,
                em_category: body.oldCategory,
                em_contract_end_date: body.old_contracteEnd,
                em_prob_end_date: body.em_prob_end_date,
                probation_status: body.probation_status,
                contract_status: body.oldContarctStatus,
                em_doj: body.old_doj,
                actual_doj: body.old_doj,
                em_designation: body.oldDesignation,
                em_id: body.em_id
            }


            const loginInsert = {
                emp_email: body.emp_email,
                emp_username: body.emp_username,
                emp_password: body.emp_password,
                emp_status: body.emp_status,
                emp_create_user: body.create_user,
                emp_id: body.em_id,
                emp_no: body.emp_no
            }

            const updateEmno = {
                em_no: body.emp_no,
                em_id: body.em_id
            }
            dutyplandata = {
                em_no: body.emp_no,
                dutyplanData: body.dutyplanData
            }
            const punchmast = {
                em_no: body.emp_no,
                punchmast: body.punchmast
            }
            const resetOldEmno = {
                em_no: body.old_emno,
                em_id: body.em_id
            }

            const old_dutyplandata = {
                em_no: body.old_emno,
                dutyplanData: body.dutyplanData
            }

            const old_punchmast = {
                em_no: body.old_emno,
                punchmast: body.punchmast
            }

            const newContractEntry = {
                em_no: body.emp_no,
                em_id: body.em_id,
                em_cont_start: body.em_doj,
                em_cont_end: body.em_contract_end_date,
                em_prob_end_date: body.em_prob_end_date,
                create_user: body.create_user
            }



            //inactive old empno in hrm_employee table
            const result = await inactiveLoginNewPromise(emp_slno)
            const { status, message } = result;
            if (status === 1) {
                // update new emno, doj,desgnation,category in hrm_emp_master
                const result = await updateEmpMaster(newEmpData)
                const { status, message } = result;
                if (status === 1) {

                    //new emno login creation hrm_employee
                    const salt = genSaltSync(10);
                    let new_password = loginInsert.emp_password;
                    loginInsert.emp_password = hashSync(new_password, salt);
                    const result = await newLoginInsert(loginInsert)
                    const { status, message } = result;
                    if (status === 1) {
                        //updating new emno in hrm_emp_exp, hrm_emp_qual, hrm_emp_personal
                        const result = await updateQualEmpno(updateEmno)
                        const { status, message } = result;
                        if (status === 1) {
                            if (body?.dutyplanData?.length !== 0) {
                                //updating new emno dutyplan
                                const result = await updateDutyPlanData(dutyplandata)
                                const { status, message } = result;
                                if (status === 1) {
                                    //updating new emno in punchmaster
                                    const result = await updatePunchmstEmno(punchmast)
                                    const { status, message } = result;
                                    if (status === 1) {
                                        if (body.contract_status === 1) {
                                            //if category is contract, new entry to hrm_emp_contract_detl
                                            const result = await newEntryContract(newContractEntry)
                                            const { status, message } = result;
                                            if (status === 1) {
                                                return res.status(200).json({
                                                    success: 1,
                                                    message: 'Contract Renewal Completed Successfully!' + message
                                                });
                                            } else {
                                                await updatePunchmstEmno(old_punchmast)
                                                await updateDutyPlanData(old_dutyplandata)
                                                await updateQualEmpno(resetOldEmno)
                                                await deleteNewLoginEntry(body.emp_username)
                                                await updateEmpMaster(oldData)
                                                await activeLoginNewPromise(emp_slno)
                                                return res.status(200).json({
                                                    success: 0,
                                                    message: 'Error Found, Contact IT'
                                                });
                                            }
                                        } else {
                                            return res.status(200).json({
                                                success: 1,
                                                message: 'Contract Renewal Completed Successfully!'
                                            });
                                        }
                                    } else {
                                        await updateDutyPlanData(old_dutyplandata)
                                        await reverseUpdateQualEmpno(resetOldEmno)
                                        await deleteNewLoginEntry(body.emp_username)
                                        await updateEmpMaster(oldData)
                                        await activeLoginNewPromise(emp_slno)
                                        return res.status(200).json({
                                            success: 0,
                                            message: 'Error While Updating Employee punch' + message
                                        });
                                    }
                                } else {
                                    await reverseUpdateQualEmpno(resetOldEmno)
                                    await deleteNewLoginEntry(body.emp_username)
                                    await updateEmpMaster(oldData)
                                    await activeLoginNewPromise(emp_slno)
                                    return res.status(200).json({
                                        success: 0,
                                        message: 'Error While Updating Employee DutyPlan' + message
                                    });
                                }
                            } else {
                                if (body.contract_status === 1) {
                                    //if category is contract, new entry to hrm_emp_contract_detl
                                    const result = await newEntryContract(body)
                                    const { status } = result;
                                    if (status === 1) {
                                        return res.status(200).json({
                                            success: 1,
                                            message: 'Contract Renewal Completed Successfully!'
                                        });
                                    } else {
                                        await reverseUpdateQualEmpno(resetOldEmno)
                                        await deleteNewLoginEntry(body.emp_username)
                                        await updateEmpMaster(oldData)
                                        await activeLoginNewPromise(emp_slno)
                                        return res.status(200).json({
                                            success: 0,
                                            message: 'Error Found, Contact IT'
                                        });
                                    }
                                } else {
                                    return res.status(200).json({
                                        success: 1,
                                        message: 'Contract Renewal Completed Successfully!'
                                    });
                                }
                            }

                        } else {
                            await deleteNewLoginEntry(body.emp_username)
                            await updateEmpMaster(oldData)
                            await activeLoginNewPromise(emp_slno)
                            await reverseUpdateQualEmpno(resetOldEmno)
                            return res.status(200).json({
                                success: 0,
                                message: 'Error While Updating Employee ID' + message
                            });
                        }
                    } else {
                        await updateEmpMaster(oldData)
                        await activeLoginNewPromise(emp_slno)
                        return res.status(200).json({
                            success: 0,
                            message: 'Error While Adding new login' + message
                        });
                    }
                } else {
                    //error while inserting employee master, then active old emno login
                    await activeLoginNewPromise(emp_slno)
                    return res.status(200).json({
                        success: 0,
                        message: 'Error While Updating Employee Master' + message
                    });
                }
            } else {
                return res.status(200).json({
                    success: 0,
                    message: 'Error While Inactiving Employee' + message
                });
            }
        }
        Func(body)
    }
}

