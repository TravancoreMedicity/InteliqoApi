const pool = require('../../config/database');

module.exports = {


    TrainingQuestionGetTopic: (callback) => {
        pool.query(
            `SELECT topic_slno,training_topic_name FROM training_topic`, [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },


    TrainingQuestionInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO training_questions
            (
                training_topics,
                questions,
                answer_a,
                answer_b,
                answer_c,
                answer_d,
                right_answer,
                writtenStatus,
                handwrite_answer,
                marks,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.training_topics,
                data.questions,
                data.answer_a,
                data.answer_b,
                data.answer_c,
                data.answer_d,
                data.right_answer,
                data.writtenStatus,
                data.handwrite_answer,
                data.marks,
                data.create_user,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    TrainingQuestionGet: (callback) => {
        pool.query(
            `SELECT
            q_slno,
            training_topic.topic_slno,
            training_questions.training_topics,
            training_topic_name,
                questions,
                answer_a,
                answer_b,
                answer_c,
                answer_d,
                right_answer,
                writtenStatus,
                handwrite_answer,
                marks
            FROM training_questions
             LEFT JOIN training_topic ON
             training_questions.training_topics=training_topic.topic_slno`
            , [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    TrainingQuestionUpdate: (data, callback) => {
        pool.query(
            `UPDATE training_questions
            SET
                questions=?,
                answer_a=?,
                answer_b=?,
                answer_c=?,
                answer_d=?,
                right_answer=?,
                writtenStatus=?,
                handwrite_answer=?,
                marks=?,
            edit_user=? WHERE q_slno=?`,
            [
                data.questions,
                data.answer_a,
                data.answer_b,
                data.answer_c,
                data.answer_d,
                data.right_answer,
                data.writtenStatus,
                data.handwrite_answer,
                data.marks,
                data.edit_user,
                data.q_slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },

    GetlastEntryDatas: (data, callBack) => {
        pool.query(
            `SELECT  training_topics, questions, answer_a, answer_b, answer_c, answer_d, right_answer, upload_status, writtenStatus, handwrite_answer, marks FROM training_questions where q_slno=?
            `,
            [
                data.q_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetDeptWiseQuestns: (id, callback) => {
        pool.query(
            `SELECT
            q_slno,
            training_topic.topic_slno,
            training_questions.training_topics,
            training_topic_name,training_topic.training_dept,
                questions,
                answer_a,
                answer_b,
                answer_c,
                answer_d,
                right_answer,
                writtenStatus,
                handwrite_answer,
                marks
             FROM training_questions
             LEFT JOIN training_topic ON
             training_questions.training_topics=training_topic.topic_slno 
             WHERE training_topic.training_dept=?`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
}