const { insertcarry, checkInsertVal, insertcarrycount, getCarrysettingById } = require('../leavecarryforward/leavecarryforward.service');
const logger = require('../../logger/logger')

module.exports = {
    insertcarry: (req, res) => {
        const body = req.body;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                insertcarry(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        insertcarrycount(body, (err, results) => {
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
                    }
                });
            } else {
                return res.status(200).json({
                    success: 2,
                    message: " Already proccessed "
                })
            }
        })
    },

    getCarrysettingById: (req, res) => {

        const id = req.params.id;
        getCarrysettingById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },


}