const { getEmpByDeptAndSection, insertmanpowerplanning, getname, getdesignation, updatemanpowerplanning } = require('../Manpower/Manpower.service');

module.exports = {
    getDepartAndSectionEmpDetl: (req, res) => {
        const body = req.body
        getEmpByDeptAndSection(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    insertmanpowerplanning: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.dept_id, value.sect_id, value.em_designation_number, value.MinCount, value.MaxCount]
        })
        insertmanpowerplanning(values, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
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
                message: "Data Submitted Successfully"
            });
        });
    },
    getname: (req, res) => {
        const body = req.body
        getname(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getdesignation: (req, res) => {
        const body = req.body
        getdesignation(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data: []

                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    // update data

    updatemanpowerplanning: (req, res) => {
        const body = req.body;
        const result = updatemanpowerplanning(body)
            .then((r) => {
                return res.status(200).json({
                    success: 1,
                    message: 'Update Successfully'
                });
            }).catch((e) => {
                return res.status(200).json({
                    success: 0,
                    message: e.sqlMessage
                });
            })
    },
}