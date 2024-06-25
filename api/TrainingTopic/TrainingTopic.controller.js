
const { TrainingTopicInsert, TrainingTopicGet, TrainingTopicUpdate, TrainingTypeWiseTopic, TrainingTopicByTypeGet, GetDeptWiseTopic, checkInsertVal } = require('./TrainingTopic.service');
const { logger } = require('../../logger/logger');
const { validationTrainingTopic } = require('../../validation/validation_schema');
module.exports = {

    // TrainingTopicInsert: (req, res) => {
    //     const body = req.body;
    //     TrainingTopicInsert(body, (err, results) => {
    //         if (err) {

    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         else {
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: "Training Topic Added Successfully",
    //                 insetId: results.insertId
    //             });
    //         }

    //     });
    // },

    TrainingTopicInsert: (req, res) => {
        const body = req.body;
        checkInsertVal(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {

                TrainingTopicInsert(body, (err, result) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "Training Topic Added Successfully",
                            insetId: result.insertId
                        });
                    }
                })
            }
            else {
                return res.status(200).json({
                    success: 10,
                    message: "This Topic is already exist"
                })
            }
        })

    },

    TrainingTypeWiseTopic: (req, res) => {
        const id = req.params.id;
        TrainingTypeWiseTopic(id, (err, results) => {
            const datas = results.map((val) => {
                const obj = {
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    training_name: val.training_name,
                    name_slno: val.name_slno,
                    type_slno: val.type_slno,
                    trainers: JSON.parse(val.trainers),
                    trainers_name: val.trainers_name

                }
                return obj
            })
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: datas,
            });
        });
    },

    TrainingTopicUpdate: (req, res) => {
        const body = req.body;
        TrainingTopicUpdate(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated successfully"
                });
            }

        });
    },
    TrainingTopicGet: (req, res) => {
        TrainingTopicGet((err, results) => {
            const datas = results.map((val) => {
                const obj = {
                    training_dept: val.training_dept,
                    dept_status: val.dept_status,
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    training_name: val.training_name,
                    training_status: val.training_status,
                    tutorial_status: val.tutorial_status,
                    medical_status: val.medical_status,
                    pretest_status: val.pretest_status,
                    post_test_status: val.post_test_status,
                    online_status: val.online_status,
                    offline_status: val.offline_status,
                    both_status: val.both_status,
                    video_link: val.video_link,
                    video_time: val.video_time,
                    name_slno: val.name_slno,
                    hours: val.hours,
                    dept_id: val.dept_id,
                    dept_name: val.dept_name,
                    upload_status: val.upload_status,
                    trainers_name: val.trainers_name,
                    trainers: JSON.parse(val.trainers)
                }
                return obj
            })
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: datas
            })
        })
    },
    TrainingTopicByTypeGet: (req, res) => {
        const id = req.params.id;
        TrainingTopicByTypeGet(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results,
            });
        });
    },

    GetDeptWiseTopic: (req, res) => {
        const id = req.params.id;
        GetDeptWiseTopic(id, (err, results) => {
            const datas = results.map((val) => {
                const obj = {
                    training_dept: val.training_dept,
                    dept_status: val.dept_status,
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    training_name: val.training_name,
                    training_status: val.training_status,
                    tutorial_status: val.tutorial_status,
                    medical_status: val.medical_status,
                    pretest_status: val.pretest_status,
                    post_test_status: val.post_test_status,
                    online_status: val.online_status,
                    offline_status: val.offline_status,
                    both_status: val.both_status,
                    video_link: val.video_link,
                    video_time: val.video_time,
                    name_slno: val.name_slno,
                    hours: val.hours,
                    dept_id: val.dept_id,
                    dept_name: val.dept_name,
                    upload_status: val.upload_status,
                    trainers_name: val.trainers_name,
                    trainers: JSON.parse(val.trainers)
                }
                return obj
            })
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                // data: results,
                data: datas
            });
        });
    },
}
