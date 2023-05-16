const logger = require('../../logger/logger')
const { getpunchdataZtech, getpunchDataHr, InsertPunchdata
} = require("../PunchTransfer/punchtransfer.service")
module.exports = {

    getpunchdata: (req, res) => {
        const body = req.body;
        getpunchdataZtech(body, (err, results) => {
            const zkteco = [...results]
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            getpunchDataHr(body, (err, results) => {
                const hrPunch = [...results]
                if (err) {
                    logger.errorLogger(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                let newpunchdata = zkteco.filter(value => {
                    return !hrPunch.find(values => {
                        return values.id === value.id
                    })
                })
                var a1 = newpunchdata.map((value, index) => {
                    return [value.id, value.emp_code, value.punch_time, value.punch_state
                    ]
                })
                InsertPunchdata(a1, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Punch Data Transfer Successfully"
                    });
                });
            });
        });
    },


}