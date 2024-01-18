const { logger } = require('../../logger/logger');
const { GetEmpOnlineTraining, GetPretestQRdetails, GetPosttestQRdetails } = require('./TrainingOnline.service');
module.exports = {

    GetEmpOnlineTraining: (req, res) => {
        const id = req.params.id;
        GetEmpOnlineTraining(id, (err, results) => {
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
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results,
            });
        });
    },

    //QR PreEmpDETAILS
    GetPretestQRdetails: (req, res) => {
        const id = req.params.id;
        GetPretestQRdetails(id, (err, results) => {
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
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results,
            });
        });
    },
    GetPosttestQRdetails: (req, res) => {
        const id = req.params.id;
        GetPosttestQRdetails(id, (err, results) => {
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
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results,
            });
        });
    },
}