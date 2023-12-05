const pool = require('../../config/database');

module.exports = {

    GetEmpOnlineTraining: (id, callback) => {
        pool.query(
            `             
            SELECT ROW_NUMBER() OVER () as sno,slno,emp_name,topic,training_employee_details.training_status,training_employee_details.pretest_status,
            posttest_status,topic_slno,training_topic_name,online_status,both_status,video_link
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            WHERE emp_name=? and training_employee_details.training_status=1 and training_employee_details.pretest_status=1`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

}