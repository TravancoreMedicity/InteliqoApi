const pool = require('../../config/database');

module.exports = {


    TrainingQuestionGetTopic: (callback) => {
        pool.query(
            `SELECT topic_slno,training_topic_name FROM medi_hrm.training_topic`, [],
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
            `INSERT INTO  medi_hrm.training_questions
            (
                questions,
                answers,
                training_topics,
                marks,
                create_user
            )
            VALUES (?,?,?,?,?)`,
            [
                data.questions,
                data.answers,
                data.training_topics,
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
            training_questions.q_slno,
            training_questions.questions,
            training_questions.answers,
            training_questions.marks,
            training_topic.topic_slno,
            training_topic.training_topic_name
            FROM medi_hrm.training_questions
             LEFT JOIN training_topic ON
             training_questions.training_topics=training_topic.topic_slno`, [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    TrainingQuestionUpdate: (data, callback) => {
        pool.query(`UPDATE medi_hrm.training_questions
         SET
         questions=?,
         answers=?,
         training_topics=?,
         marks=?,
         edit_user=? WHERE q_slno=?`,
            [
                data.questions,
                data.answers,
                data.training_topics,
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
    //insert
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT 
            questions
                FROM medi_hrm.training_questions
                WHERE questions = ?`,
            [
                data.questions
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    //update
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT questions,
            q_slno
            FROM medi_hrm.training_questions
            WHERE questions =? AND q_slno != ?`,
            [
                data.questions,
                data.q_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    }
}