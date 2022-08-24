const {
    getSectionTypeDetl,
    getdeptSection,
} = require('../DeptSectionReport/DeptSectionReport.service');

module.exports = {
    getdeptSection: (req, res) => {
        const body = req.body
        getdeptSection(body, (err, results) => {
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
                    message: "no result found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getSectionTypeDetl: (req, res) => {
        const body = req.body;
        getSectionTypeDetl(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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
    }
}