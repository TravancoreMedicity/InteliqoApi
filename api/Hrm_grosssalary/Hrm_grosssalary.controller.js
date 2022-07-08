const { create } = require('../Hrm_grosssalary/Hrm_grosssalary.service');
const logger = require('../../logger/logger')
module.exports = {
    createGrossSalary: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
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
