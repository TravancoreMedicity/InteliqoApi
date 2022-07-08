const { createDueHrApproval } = require('../DueClearenceHR/DueClearenceHR.service');
const logger = require('../../logger/logger')
module.exports = {
    createDueHrApproval: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.emid, value.em_sec, value.slno, value.due_desc, value.approval]
        })
        createDueHrApproval(a1, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Data Created Successfully"
            });

        });
    },
}