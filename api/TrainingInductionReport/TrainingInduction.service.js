const pool = require('../../config/database');

module.exports = {
    GetInductCalenderReport: (data, callback) => {
        pool.query(
            `   SELECT ROW_NUMBER() OVER () as sn, induction_slno, schedule_no, indct_emp_no, induct_detail_date, induct_emp_dept, induct_emp_sec,
            training_induction_emp_details.training_status, question_count, training_induction_emp_details.pretest_status,
             training_induction_emp_details.posttest_status, online_mode, offline_mode, retest,
            em_id,em_name,training_induction_schedule.schedule_topic,topic_slno,training_topic_name,training_induct_posttest.mark as postmark,
            training_induction_pretest.mark as premark,
            training_induction_schedule.induction_date,training_induction_schedule.schedule_topic,
            training_induction_retest.retest_status,training_induction_retest.retest_mark,
            induct_retest_exam_details.induct_retest_mark,training_topic.training_name,training_name.type_slno,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name
            FROM training_induction_emp_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
            LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            LEFT JOIN training_induction_pretest ON training_induction_pretest.emp_id=training_induction_emp_details.indct_emp_no
            LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_id=training_induction_emp_details.indct_emp_no
            LEFT JOIN training_induction_retest ON training_induction_retest.retest_em_no=training_induction_emp_details.indct_emp_no
            LEFT JOIN induct_retest_exam_details ON induct_retest_exam_details.induct_re_slno=training_induction_emp_details.indct_emp_no
            LEFT JOIN training_name ON training_topic.training_name=training_topic.training_name
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
            where training_name.type_slno=? and training_induction_schedule.schedule_topic=? and
            training_induction_schedule.induction_date between ? AND ?`,
            [
                data.type,
                data.topic,
                data.fromdate,
                data.todate
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetInductionCompletedList: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as serialno, indct_emp_no, induct_emp_dept, induct_detail_date,
             hrm_emp_master.em_name,hrm_department.dept_name,training_induction_schedule.schedule_topic,
             training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,
             training_topic.training_topic_name
             FROM training_induction_emp_details
             LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
             LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
             LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
             WHERE training_induction_emp_details.pretest_status=1 AND training_induction_emp_details.posttest_status=1 
             AND date(induct_detail_date) BETWEEN ? AND ?`,
            [
                data.Fromdate,
                data.Todate
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    GetInductionPendingList: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as serialno, indct_emp_no, induct_emp_dept, induct_detail_date,
             hrm_emp_master.em_name,hrm_department.dept_name,training_induction_schedule.schedule_topic,
             training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,
             training_topic.training_topic_name
             FROM training_induction_emp_details
             LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
             LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
             LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
             WHERE training_induction_emp_details.posttest_status!=1
             AND date(induct_detail_date) BETWEEN ? AND ?`,
            [
                data.Fromdate,
                data.Todate
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



