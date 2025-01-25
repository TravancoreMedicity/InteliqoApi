const { getReport, getDutyPlanBySection, getPunchMasterDataSectionWise, getPunchmastData,
    getPunchDataEmCodeWiseDateWise, getPunchDataDptWiseDateWise, getPunchMasterDataDeptWise,
    getInactivePunchDataDptWiseDateWise, getInactivePunchMasterDataDeptWise } = require('../AttendenceReport/AttendenceReport.service');

const logger = require('../../logger/logger')
module.exports = {
    getReport: (req, res) => {
        const body = req.body
        getReport(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getDutyPlanBySection: (req, res) => {
        const body = req.body;
        getDutyPlanBySection(body, (err, results) => {
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
                    succes: 2,
                    messagee: "Record Not Found"
                });
            }

            return res.status(200).json({
                succes: 1,
                shiftdetail: results
            });

        });
    },
    getPunchMasterDataSectionWise: (req, res) => {
        const body = req.body;

        getPunchMasterDataSectionWise(body, (err, results) => {
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
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                planData: results
            });

        });
    },
    getPunchDataEmCodeWiseDateWise: (req, res) => {
        const body = req.body;
        getPunchDataEmCodeWiseDateWise(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    su: 0,
                    mesge: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    su: 2,
                    mesge: "Record Not Found"
                });
            }

            return res.status(200).json({
                su: 1,
                result_data: results
            });

        });
    },

    getPunchDataDptWiseDateWise: (req, res) => {
        const body = req.body;
        getPunchDataDptWiseDateWise(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    su: 0,
                    mesge: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    su: 2,
                    mesge: "Record Not Found"
                });
            }

            return res.status(200).json({
                su: 1,
                resultPunch_data: results
            });

        });
    },
    getInactivePunchDataDptWiseDateWise: (req, res) => {
        const body = req.body;
        getInactivePunchDataDptWiseDateWise(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    su: 0,
                    mesge: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    su: 2,
                    mesge: "Record Not Found"
                });
            }

            return res.status(200).json({
                su: 1,
                resultPunch_data: results
            });

        });
    },
    getPunchMasterDataDeptWise: (req, res) => {
        const body = req.body;
        getPunchMasterDataDeptWise(body, (err, results) => {
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
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                planData: results
            });

        });
    },
    getInactivePunchMasterDataDeptWise: (req, res) => {
        const body = req.body;
        getInactivePunchMasterDataDeptWise(body, (err, results) => {
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
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                planData: results
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
                punchdata: results
            });
        });
    },
}