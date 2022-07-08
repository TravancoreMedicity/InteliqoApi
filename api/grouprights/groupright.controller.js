const {
    insertGroupRight,
    validateGroupRights,
    getGroupMenuRigths,
    getMenuSlno,
    updateGroupMenuRights,
    getMenuRightSlno
} = require('../grouprights/groupright.service');
const logger = require('../../logger/logger')
module.exports = {
    createGroupRights: (req, res) => {

        const body = req.body;
        const body_result = body;

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        validateGroupRights(body, (err, results) => {

            const value = JSON.parse(JSON.stringify(results))

            if (Object.keys(value).length === 0) {

                // Insert the values
                getMenuSlno(body, (err, results) => {

                    const postData = {
                        user_group_slno: body.user_group_slno,
                        module_slno: body.module_slno
                    }

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    const menuSLno = JSON.parse(JSON.stringify(results))

                    const menuDetl = menuSLno.map((val) => {
                        const newArray = [body.user_group_slno, body.module_slno, val.menu_slno]
                        return newArray;
                    })

                    insertGroupRight(menuDetl, (err, results) => {
                        if (err) {
                            logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }

                        if (results) {

                            getGroupMenuRigths(postData, (err, results) => {

                                if (err) {
                                    logger.errorLogger(err)
                                    return res.status(200).json({
                                        success: 0,
                                        message: err
                                    });
                                }

                                return res.status(200).json({
                                    success: 1,
                                    data: results
                                });
                            })
                        }
                    });

                })

            } else {
                //Get The Selected Values
                getGroupMenuRigths(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "No Data Found"
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        data: results
                    });
                })
            }
        })
    },
    updateGroupMenuRits: (req, res) => {
        const body = req.body
        updateGroupMenuRights(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Data Found"
                });
            }
            if (results) {

                getGroupMenuRigths(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "No Data Found"
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Updated",
                        data: results
                    });
                })
            }
        })
    },
    getModuleMenuViewRights: (req, res) => {
        const body = req.body
        getGroupMenuRigths(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Data Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getModuleMenuList: (req, res) => {
        const id = req.params.id;
        // console.log(body)
        getMenuRightSlno(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    status: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    status: 0,
                    message: "No Data Found"
                });
            }

            return res.status(200).json({
                status: 1,
                resdata: results
            });
        })
    }

}