const pool = require('../../config/database');

module.exports = {
    //training_induct_feedback

    //feedback_slno, induct_schedule_no, emp_id, fedbk_topic, training_date, induct_trainer, quest_a, quest_b, quest_c, quest_d, induct_feedback, create_user, create_date, update_user, update_date

    InsertInductFeedback: (data, callBack) => {
        pool.query(
            `INSERT INTO training_induct_feedback
            (
                induct_schedule_no,
                emp_id,
                fedbk_topic,
                training_date,
                quest_a,
                quest_b,
                quest_c,
                quest_d,
                induct_feedback,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.schedule_no,
                data.em_id,
                data.topic,
                data.induct_detail_date,
                // JSON.stringify(data.trainers),
                data.q1,
                data.q2,
                data.q3,
                data.q4,
                data.feedback,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    checkFeedbackExistORNot: (data, callback) => {
        pool.query(
            `     
            SELECT induct_schedule_no,emp_id,fedbk_topic
            FROM training_induct_feedback 
            WHERE induct_schedule_no=? and emp_id=? and fedbk_topic=?
            `, [
            data.schedule_no,
            data.em_id,
            data.topic
        ],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },


}