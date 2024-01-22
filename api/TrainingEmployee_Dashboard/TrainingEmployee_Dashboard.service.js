const pool = require('../../config/database');

module.exports = {

    GetBelowAvgEmpList: (callback) => {
        pool.query(
            `    
            SELECT ROW_NUMBER() OVER () as sn, training_employee_details.slno, scheduled_slno, training_employee_details.emp_name, training_employee_details.emp_desig,
            training_employee_details.emp_dept, training_employee_details.emp_dept_sectn, topic, training_employee_details.schedule_date, 
            training_employee_details.training_status, question_count, training_employee_details.pretest_status, 
            training_employee_details.posttest_status,training_employee_details.posttest_permission,emp_topic,
            em_id as candid_id,em_name,topic_slno,training_topic_name,training_posttest.mark ,training_retest_emp_details.retest_status
            FROM training_employee_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
            LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_dept=training_employee_details.emp_dept
            where training_employee_details.posttest_status=1 and training_posttest.mark <2 
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    InsertRetestEmp: (data, callBack) => {
        pool.query(
            `INSERT INTO  medi_hrm.training_retest_emp_details
            (
                candidate_em_no,
                candidate_dept,
                candidate_dept_sec,
                retest_date,
                retest_topic,
                attendance_status,
                retest_quest_count,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.candidate_em_no,
                data.candidate_dept,
                data.candidate_dept_sec,
                data.retest_date,
                data.retest_topic,
                data.attendance_status,
                data.retest_quest_count,
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

    UpdateReTestDate: (data, callBack) => {
        pool.query(
            `UPDATE training_employee_details set 
             schedule_date=?,
             edit_user=?
             where slno=?`,
            [
                data.retest_date,
                data.edit_user,
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetEmpRetestTopics: (id, callback) => {
        pool.query(
            `             
            SELECT ROW_NUMBER() OVER () as sn, retest_sl_no, candidate_em_no, candidate_dept, candidate_dept_sec, retest_date,
            retest_topic, attendance_status, retest_quest_count, retest_status, retest_mark,
            em_id as candid_id,em_name,topic_slno,training_topic_name,hrm_department.dept_id,dept_name,sect_id,sect_name
            FROM training_retest_emp_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_retest_emp_details.candidate_em_no
            LEFT JOIN training_topic ON training_topic.topic_slno=training_retest_emp_details.retest_topic
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_retest_emp_details.candidate_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_retest_emp_details.candidate_dept_sec
            WHERE candidate_em_no=?`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetRetestQuestions: (data, callBack) => {
        pool.query(
            ` 
             SELECT q_slno, training_topics, questions, answer_a, answer_b, answer_c,
             answer_d, right_answer,training_questions.upload_status, writtenStatus, handwrite_answer,
             marks,training_topic.online_status,training_topic.offline_status,training_topic.both_status,
             training_retest_emp_details.candidate_em_no,training_retest_emp_details.retest_quest_count,
             training_retest_emp_details.candidate_dept,
             training_retest_emp_details.candidate_dept_sec,hrm_emp_master.em_id,hrm_emp_master.em_name,
             training_retest_emp_details.retest_topic,training_retest_emp_details.retest_sl_no
             FROM training_questions
             LEFT JOIN  training_retest_emp_details ON training_retest_emp_details.retest_topic=training_questions.training_topics
             LEFT JOIN training_topic ON training_topic.topic_slno=training_retest_emp_details.retest_topic
             LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_retest_emp_details.candidate_em_no
             WHERE training_retest_emp_details.retest_topic=? and training_retest_emp_details.candidate_em_no=?
             ORDER BY RAND() 
             LIMIT ?`,
            [
                data.topic_slno,
                data.Em_id,
                data.questCount

            ],

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    InsertRetestDetails: (data, callBack) => {
        pool.query(
            `INSERT INTO  medi_hrm.training_retest_exam_details
            (
                candid_id,
                candid_dept,
                candid_dept_sec,
                candid_topic,
                candid_mark,
                create_user
            )
            VALUES (?,?,?,?,?,?)`,
            [
                data.candidate_em_no,
                data.candidate_dept,
                data.candidate_dept_sec,
                data.retest_topic,
                data.mark,
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

    checkRetestEntryExistORNot: (data, callback) => {
        pool.query(
            `     
            SELECT candid_id,candid_topic
            FROM training_retest_exam_details 
            WHERE candid_id=? and candid_topic=?
            `, [
            data.candidate_em_no,
            data.retest_topic
        ],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    UpdateReTestStatus: (data, callBack) => {
        pool.query(
            `UPDATE training_retest_emp_details set 
             retest_status=?,
             retest_mark=?
             WHERE retest_sl_no=?`,
            [
                data.retest_status,
                data.mark,
                data.retest_sl_no

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