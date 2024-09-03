const { logger } = require('../../logger/logger');
const { GetInductTraining, GetDeptTraining } = require('./TrainingRecord.service');
module.exports = {

    GetInductTraining: (req, res) => {
        const id = req.params.id;
        GetInductTraining(id, (err, results) => {
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
    // GetDeptTraining: (req, res) => {
    //     const id = req.params.id;
    //     GetDeptTraining(id, (err, results) => {
    //         if (err) {
    //             logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (results.length == 0) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "no Record Found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results,
    //         });
    //     });
    // },

    GetDeptTraining: (req, res) => {
        const body = req.body;
        GetDeptTraining(body, (err, results) => {
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
} 