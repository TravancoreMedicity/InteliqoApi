const { validateotwage, validateotwageone } = require('../../validation/validation_schema');
const { empmasterOtWage, empmasterOtWageone, empmasterOtWageedit, getOtWage,
    getdeptsecauthri, getOtWageByID } = require('../otwage/otwage.service')
const logger = require('../../logger/logger')
module.exports = {
    empmasterOtWage: (req, res) => {

        const body = req.body;
        const body_result = validateotwage.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        empmasterOtWage(body, (err, results) => {

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
    empmasterOtWageone: (req, res) => {

        const body = req.body;
        const body_result = validateotwageone.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        empmasterOtWageone(body, (err, results) => {

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
    empmasterOtWageedit: (req, res) => {

        const body = req.body;
        const body_result = validateotwageone.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        empmasterOtWageedit(body, (err, results) => {

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
    getOtWage: (req, res) => {

        getOtWage((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getOtWageByID: (req, res) => {

        const id = req.params.id;
        getOtWageByID(id, (err, results) => {
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
    getdeptsecauthri: (req, res) => {

        const id = req.params.id;
        getdeptsecauthri(id, (err, results) => {
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
                succes: 1,
                dataa: results
            });
        });

    },

}