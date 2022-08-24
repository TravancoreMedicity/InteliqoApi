const {
    getReligionWiseReport
} = require('../ReligionReport/ReligionReport.service')

module.exports = {
    getReligionWiseReport: (req, res) => {

        const body = req.body
        getReligionWiseReport(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
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