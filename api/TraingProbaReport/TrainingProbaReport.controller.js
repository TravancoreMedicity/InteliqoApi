const { getTrainingprob, getDesignCategory, getcatedetl } = require('../TraingProbaReport/TrainingProbaReport.service')

module.exports = {
    getTrainingprob: (req, res) => {
        getTrainingprob((err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    // getDesignCategory: (req, res) => {
    //     const body = req.body
    //     getDesignCategory(body, (err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: err
    //             });
    //         }

    //         if (results.length == 0) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Results Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
    getcatedetl: (req, res) => {
        const body = req.body
        getcatedetl(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length == 0) {
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
    }
}