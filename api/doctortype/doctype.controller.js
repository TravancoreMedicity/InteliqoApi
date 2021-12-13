const { create, update, checkInsertVal, checkUpdateVal, deleteByID, getData, getDataById, getSelect } = require('../doctortype/doctype.service');
const { validatedoctype } = require('../../validation/validation_schema');

module.exports = {
    createDocType: (req, res) => {
        const body = req.body;
        const body_result = validatedoctype.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.doctype_desc = body_result.value.doctype_desc;

        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                // Insert the values
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
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Doctor Type Already Exist"
                })
            }
        })
    },
    updateDocType: (req, res) => {

        const body = req.body;
        const body_result = validatedoctype.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.doctype_desc = body_result.value.doctype_desc;


        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                update(body, (err, results) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err.sqlMessage
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
                    message: "Doctor Type Already Exist"
                })
            }
        })
    },
    inactiveDocType: (req, res) => {

        const body = req.body;

        deleteByID(body, (err, results) => {
            if (err) {
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
    getDocType: (req, res) => {

        getData((err, results) => {
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
    getDocTypeByID: (req, res) => {

        const id = req.params.id;
        getDataById(id, (err, results) => {
            if (err) {
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
    getSelectDocType: (req, res) => {

        getSelect((err, results) => {
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
}