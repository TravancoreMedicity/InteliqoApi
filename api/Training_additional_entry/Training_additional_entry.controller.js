
const { ScheduleInsert, InsertTrainings, InsertToDetailTbl, InsertPretest, InsertPosttest } = require('./Training_additional_entry.service');

module.exports = {
    ScheduleInsert: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.tes_dept, value.tes_dept_sec, value.tes_topic,
            JSON.stringify(value.tes_emp_name), value.date, value.tes_remark, value.create_user

            ]
        })
        ScheduleInsert(values, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Successfully Inserted"
                });
            }

        });
    },
    ///*************** */
    InsertTrainings: (req, res) => {
        const body = req.body;

        const insertEachTraining = (index) => {
            if (index >= body.length) {
                return res.status(200).json({
                    success: 1,
                    message: "All trainings successfully inserted"
                });
            }

            const value = body[index];
            const trainingValues = [
                value.dept_id, value.sect_id, value.schedule_year, value.date,
                value.topic, JSON.stringify(value.trainer), value.remark, value.create_user
            ];

            InsertTrainings([trainingValues], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Error inserting training: " + err
                    });
                }

                const insertId = result.insertId;

                const detailValues = [
                    insertId, value.em_id, value.desg_slno, value.dept_id, value.sect_id,
                    value.topic, value.date, value.training_status, value.question_count,
                    value.pretest_status, value.posttest_status, value.posttest_permission,
                    value.online, value.offline, value.logUser
                ];

                InsertToDetailTbl([detailValues], (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Error inserting training detail: " + err
                        });
                    }

                    const pretestValues = [
                        value.em_id, value.dept_id, value.sect_id, value.desg_slno,
                        value.topic, value.premark, value.logUser, insertId, value.date
                    ];

                    InsertPretest([pretestValues], (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                success: 0,
                                message: "Error inserting pretest: " + err
                            });
                        }

                        const posttestValues = [
                            value.em_id, value.dept_id, value.sect_id, value.desg_slno,
                            value.topic, value.postmark, value.logUser, insertId, value.date
                        ];

                        InsertPosttest([posttestValues], (err, result) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    message: "Error inserting posttest: " + err
                                });
                            }

                            // Insert next training
                            insertEachTraining(index + 1);
                        });
                    });
                });
            });
        };

        insertEachTraining(0); // start from first item
    }


    // InsertTrainings: (req, res) => {
    //     const body = req.body;
    //     var values = body.map((value, index) => {
    //         return [value.dept_id, value.sect_id, value.schedule_year, value.date,
    //         value.topic, JSON.stringify(value.trainer), value.remark, value.create_user
    //         ]
    //     })

    //     InsertTrainings(values, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         else {
    //             const inserId = results.insertId;
    //             var detailedvalues = body.map((value, index) => {
    //                 return [results.insertId, value.em_id, value.desg_slno, value.dept_id, value.sect_id, value.topic,
    //                 value.date, value.training_status, value.question_count, value.pretest_status, value.posttest_status,
    //                 value.posttest_permission, value.online, value.offline, value.logUser
    //                 ]
    //             })
    //             InsertToDetailTbl(detailedvalues, (err, results) => {
    //                 if (err) {

    //                     return res.status(200).json({
    //                         success: 0,
    //                         message: err
    //                     });
    //                 }
    //                 else {
    //                     var prevalues = body.map((value, index) => {
    //                         return [
    //                             value.em_id, value.dept_id, value.sect_id, value.desg_slno, value.topic, value.premark, value.logUser, inserId, value.date
    //                         ]
    //                     })
    //                     var postvalues = body.map((value, index) => {
    //                         return [
    //                             value.em_id, value.dept_id, value.sect_id, value.desg_slno, value.topic, value.premark, value.logUser, inserId, value.date
    //                         ]
    //                     })
    //                     InsertPretest(prevalues, (err, results) => {
    //                         if (err) {

    //                             return res.status(200).json({
    //                                 success: 0,
    //                                 message: err
    //                             });
    //                         }
    //                         else {
    //                             InsertPosttest(postvalues, (err, results) => {
    //                                 if (err) {

    //                                     return res.status(200).json({
    //                                         success: 0,
    //                                         message: err
    //                                     });
    //                                 }
    //                                 else {
    //                                     return res.status(200).json({
    //                                         success: 1,
    //                                         message: "Training Successfully Inserted",
    //                                     });
    //                                 }

    //                             });
    //                         }

    //                     });
    //                 }

    //             });
    //         }

    //     });
    // },
}
