const { create, update, getDataById, updatecontractclose, updateContractRenew, updateContractComplete, updateempnumber } = require('../hrm_emp_contract_detl/empcontract.service');
const { validateempcontract } = require('../../validation/validation_schema');

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
        const body_result = validateempcontract.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        updatecontractclose(body, (err, results) => {

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
                message: "Contract Closed Successfully"
            });

        });
    },
    getempcontractByID: (req, res) => {

        const id = req.params.id;
        getDataById(id, (err, results) => {
            if (err) {
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
    //contract Renew
    updateContractRenew: (req, res) => {

        const body = req.body;
        const body_result = validateempcontract.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        else {
            updatecontractclose(body, (err, results) => {

                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                else {
                    updateContractRenew(body, (err, results) => {

                        if (err) {
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }

                        else {


                            updateContractComplete(body, (err, results) => {
                                if (err) {
                                    return res.status(200).json({
                                        success: 0,
                                        message: err
                                    });
                                }
                                else {
                                    create(body, (err, results) => {
                                        if (err) {
                                            return res.status(200).json({
                                                success: 0,
                                                message: err
                                            });
                                        }

                                        else {

                                            updateempnumber(body, (err, results) => {
                                                if (err) {
                                                    return res.status(200).json({
                                                        success: 0,
                                                        message: err
                                                    });
                                                }

                                                else {
                                                    return res.status(200).json({
                                                        success: 2,
                                                        message: "Contract Renewed Successfully"
                                                    });
                                                }


                                            });
                                        }


                                    });

                                }
                            });



                        }

                    });

                }


            });

        }

    },
}

