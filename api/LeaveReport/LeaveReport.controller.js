const {
    getleavereq,
    getHalfday,
    getNopunchReq,
    getCoffReq,
    getOneHour,
    getOnduty,
    empMisspunchyearwise,
    emOnehouryearwise,
    empOndutyyearwise,
    empHalfdayYearWise,
    empLeaveYearWise
} = require('../LeaveReport/LeaveReport.service');

const logger = require('../../logger/logger')
module.exports = {
    getleavereq: (req, res) => {
        getleavereq((err, results) => {
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
    getHalfday: (req, res) => {
        getHalfday((err, results) => {
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
    getNopunchReq: (req, res) => {
        getNopunchReq((err, results) => {
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
    getCoffReq: (req, res) => {
        getCoffReq((err, results) => {
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
    getOneHour: (req, res) => {
        getOneHour((err, results) => {
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
    getOnduty: (req, res) => {
        getOnduty((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length === 0) {
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
    empMisspunchyearwise: (req, res) => {
        const body = req.body;
        empMisspunchyearwise(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
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
    emOnehouryearwise: (req, res) => {
        const body = req.body;
        emOnehouryearwise(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
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
    empOndutyyearwise: (req, res) => {
        const body = req.body;
        empOndutyyearwise(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
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
    empHalfdayYearWise: (req, res) => {
        const body = req.body;
        empHalfdayYearWise(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
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
    empLeaveYearWise: (req, res) => {
        const body = req.body;
        empLeaveYearWise(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
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
}