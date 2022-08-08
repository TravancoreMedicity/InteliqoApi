
const {
    getPermanentEmpBranch,
    getpermanentEmpBranchDept,
    getpermanentEmpDetails

} = require('../PermanentEmpReport/PermanentEmpReport.service');


module.exports = {
    /** Branch wise permanent employee list */
    getPermanentEmpBranch: (req, res) => {
        const body = req.body
        getPermanentEmpBranch(body, (err, results) => {
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
    },
    /** Branch, Department wise permanent employee */
    getpermanentEmpBranchDept: (req, res) => {
        const body = req.body
        getpermanentEmpBranchDept(body, (err, results) => {
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
    },
    /** Branch, department, dept section wise permanent employee list */
    getpermanentEmpDetails: (req, res) => {
        const body = req.body
        getpermanentEmpDetails(body, (err, results) => {
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
    },
}