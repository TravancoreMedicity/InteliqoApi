const { logger } = require('../../logger/logger');
const { GetEmpOnlineTraining } = require('./TrainingOnline.service');
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

}