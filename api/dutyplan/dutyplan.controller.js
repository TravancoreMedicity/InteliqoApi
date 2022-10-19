const { getData, getEmpdetl, insertDutyplan, updateDutyPlan,
    CheckInsertVal, updateDefaultShift, updateWoffShift, updateholiday } = require('../dutyplan/dutyplan.service');
const logger = require('../../logger/logger')
module.exports = {
    getDutyPlan: (req, res) => {
        const body = req.body;
        getData(body, (err, results) => {
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
    getEmpdetl: (req, res) => {
        const body = req.body;
        getEmpdetl(body, (err, results) => {
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
    insertDutyplan: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.date, value.emp_id, value.shift]
        })

        console.log(a1)

        insertDutyplan(a1, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success1: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success1: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success1: 1,
                message: "Data Created Successfully"
            });
        });
    },
    updateDutyPlan: (req, res) => {
        const body = req.body;
        const result = updateDutyPlan(body)
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
    CheckInsertVal: (req, res) => {
        const body = req.body;
        CheckInsertVal(body, (err, results) => {
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
    updateDefaultShift: (req, res) => {
        const body = req.body;
        const result = updateDefaultShift(body)
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
    updateWoffShift: (req, res) => {
        const body = req.body;
        const result = updateWoffShift(body)
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
    updateholiday: (req, res) => {
        const body = req.body;
        const result = updateholiday(body)
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
}