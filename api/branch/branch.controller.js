const { create, updateBranch, deleteBranch, getBranch, getBranchById } = require('../branch/branch.service');
const { validateBranch } = require('../../validation/validation_schema');

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


        create(body, (err, results) => {
            if (err) {
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
        console.log(body);

        updateBranch(body, (err, results) => {
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
                message: "Branch Updated Successfully"
            });

        });

    },
    deleteBranch: (req, res) => {
        const body = req.body;
        console.log(body);
        deleteBranch(body, (err, results) => {
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
                message: res
            });
        });
    },
    getBranch: (req, res) => {
        getBranch((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 10,
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
    getBranchById: (req, res) => {
        const id = req.params.id;
        getBranchById(id, (err, results) => {
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
    }
}