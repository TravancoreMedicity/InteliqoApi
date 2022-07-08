const { inchargecancel } = require('../otcancel/otcancel.service')
const logger = require('../../logger/logger')
module.exports = {

    inchargecancel: (req, res) => {
        const body = req.body;
        // const body_result = validateResignationRequestCancel.validate(body);
        // if (body_result.error) {
        //     return res.status(200).json({
        //         success: 2,
        //         message: body_result.error.details[0].message
        //     });
        // }
        inchargecancel(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated SuccessFully"
            })
        })
    },
}