const { logger } = require('../../logger/logger')
const { GetTrainingTopics, GetPreLogEmpDetails, GetPreLogEmpDatas, GetTrainingPostTopics, GetDashboardTrainingTopics } = require('./TrainingCommonTest.service')
module.exports = {
    GetTrainingTopics: (req, res) => {
        const id = req.params.id;
        GetTrainingTopics(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    GetPreLogEmpDetails: (req, res) => {
        const body = req.body;
        GetPreLogEmpDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        });
    },

    GetPreLogEmpDatas: (req, res) => {
        const body = req.body;
        GetPreLogEmpDatas(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                datas: results
            })
        });
    },

    GetTrainingPostTopics: (req, res) => {
        GetTrainingPostTopics((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    GetDashboardTrainingTopics: (req, res) => {
        GetDashboardTrainingTopics((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
}