const { getData } = require('../PersonalChecklist/personalchecklist.service');
const logger = require('../../logger/logger')
module.exports = {
    getData: (req, res) => {

        const body = req.body;
        getData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
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

}