const pool = require('../../config/database');

module.exports = {

    GetInductTraining: (id, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as view_slno, induction_slno, schedule_no, indct_emp_no, induction_date,schedule_topic,
            training_induction_emp_details.training_status, question_count, training_induction_emp_details.pretest_status,
            training_induction_emp_details.posttest_status, training_induction_emp_details.online_mode, training_induction_emp_details.offline_mode, retest,
            training_iduct_tnd_verify_status,
            topic_slno,training_topic_name,hours,
            em_id,em_name,em_no,
            training_induction_pretest.mark as pre_mark,
			training_induct_posttest.mark as post_mark
            FROM training_induction_emp_details
            LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
            LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_topic=training_induction_emp_details.indct_emp_no
            LEFT JOIN training_induction_pretest ON training_induction_pretest.emp_topic=training_induction_emp_details.indct_emp_no
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
            WHERE training_induction_emp_details.indct_emp_no=? `, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    // GetDeptTraining: (id, callback) => {
    //     pool.query(
    //         `SELECT 
    //            training_employee_details.schedule_date,
    //            training_employee_details.emp_name ,
    //            training_employee_details.topic,
    //            training_topic.training_topic_name,
    //            training_pretest.mark as pretest_mark,
    //            training_posttest.mark as posttest_mark
    //         FROM 
    //            training_employee_details
    //            LEFT JOIN training_topic ON training_topic.topic_slno = training_employee_details.topic
    //            LEFT JOIN training_pretest ON training_pretest.pre_dept_schedule_slno = training_employee_details.scheduled_slno and training_pretest.emp_id = ?
    //            LEFT JOIN training_posttest ON training_posttest.dept_schedule_slno =training_employee_details.scheduled_slno and training_pretest.emp_id = ?
    //         WHERE 
    //            training_employee_details.emp_name = ?
    //         GROUP BY 
    //            training_employee_details.scheduled_slno`, [id],
    //         (err, results, feilds) => {
    //             if (err) {
    //                 return callback(err)

    //             }
    //             return callback(null, results)
    //         }
    //     )
    // },

    GetDeptTraining: (data, callBack) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as view_slno,
               training_employee_details.schedule_date,
               training_employee_details.emp_name ,
               training_employee_details.topic,
               training_topic.training_topic_name,
               training_pretest.mark as pre_mark,
               training_posttest.mark as post_mark,
               training_topic.hours,
               training_employee_details.tnd_verification_status
            FROM 
               training_employee_details
               LEFT JOIN training_topic ON training_topic.topic_slno = training_employee_details.topic
               LEFT JOIN training_pretest ON training_pretest.pre_dept_schedule_slno = training_employee_details.scheduled_slno and training_pretest.emp_id = ?
               LEFT JOIN training_posttest ON training_posttest.dept_schedule_slno =training_employee_details.scheduled_slno and training_posttest.emp_id = ?
            WHERE 
               training_employee_details.emp_name = ?
            GROUP BY 
               training_employee_details.scheduled_slno`,
            [
                data.pre_id,
                data.post_id,
                data.emp_id

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}