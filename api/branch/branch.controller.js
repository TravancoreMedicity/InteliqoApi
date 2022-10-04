const { create, updateBranch, deleteBranch, getBranch, getBranchById, checkInsertVal } = require('../branch/branch.service');
const { validateBranch } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createBranch: (req, res) => {
        const body = req.body;

        // Validate body result
        const body_result = validateBranch.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.branch_name = body_result.value.branch_name;
        body.esiNumber = body_result.value.esiNumber;
        body.pfNumber = body_result.value.pfNumber;

        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {

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
                        message: "Branch Inserted Successfully"
                    });
                });
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Branch Already Exist"
                })
            }
        })

    },
    updateBranch: (req, res) => {

        const body = req.body;
        const body_result = validateBranch.validate(body);

        body.branch_name = body_result.value.branch_name;
        body.esiNumber = body_result.value.esiNumber;
        body.pfNumber = body_result.value.pfNumber;


        if (body_result.error) {
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }

        updateBranch(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Branch Updated Successfully"
            });

        });

    },
    deleteBranch: (req, res) => {
        const body = req.body;
        deleteBranch(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: res
            });
        });
    },
    getBranch: (req, res) => {
        getBranch((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 10,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
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
    getBranchById: (req, res) => {
        const id = req.params.id;
        getBranchById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infoLogger("No Records Found")
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
    }
}