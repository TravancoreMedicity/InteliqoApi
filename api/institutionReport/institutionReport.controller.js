const {
    InstitutionReport
} = require('../institutionReport/institutionReport.service')

module.exports = {
    InstitutionReport: (req, res) => {
        const body = req.body;
        InstitutionReport(body, (err, results) => {
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
        })
    },
}