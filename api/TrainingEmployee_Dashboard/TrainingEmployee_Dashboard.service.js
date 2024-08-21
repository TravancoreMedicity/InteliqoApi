const pool = require('../../config/database');

module.exports = {

    InsertRetestEmp: (data, callBack) => {
        pool.query(
            `INSERT INTO training_retest_emp_details
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
            retest=1,
             edit_user=?
             where emp_name=? and topic=? and slno=?`,
            [
                data.retest_date,
                data.edit_user,
                data.candidate_em_no,
                data.retest_topic,
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
            em_id as candid_id,em_name,topic_slno,training_topic_name,hrm_department.dept_id,dept_name,sect_id,sect_name,
            training_pretest.mark as premark,training_posttest.mark as postmark,training_employee_details.pretest_status,
            training_employee_details.posttest_status,training_employee_details.online_mode,training_employee_details.training_status,
            hrm_emp_master.em_no,designation.desg_slno,designation.desg_name,hrm_emp_master.em_id,training_retest_emp_details.retest_status
            FROM training_retest_emp_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_retest_emp_details.candidate_em_no
            LEFT JOIN training_topic ON training_topic.topic_slno=training_retest_emp_details.retest_topic
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_retest_emp_details.candidate_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_retest_emp_details.candidate_dept_sec
			LEFT JOIN training_pretest ON training_pretest.emp_id=training_retest_emp_details.candidate_em_no
            LEFT JOIN training_posttest ON training_posttest.emp_id=training_retest_emp_details.candidate_em_no
            LEFT JOIN training_employee_details ON training_employee_details.emp_name=training_retest_emp_details.candidate_em_no
            LEFT JOIN designation ON designation.desg_slno=training_employee_details.emp_desig
            WHERE candidate_em_no=?
            group by  hrm_emp_master.em_id `, [id],
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
            `INSERT INTO training_retest_exam_details
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
    GetRetestEmpDetails: (data, callBack) => {
        pool.query(
            ` 
            SELECT ROW_NUMBER() OVER () as sn, retest_sl_no, candidate_em_no, candidate_dept, candidate_dept_sec, retest_date,
            retest_topic, attendance_status, retest_quest_count, retest_status, retest_mark,
            em_id as candid_id,em_name,topic_slno,training_topic_name,hrm_department.dept_id,dept_name,sect_id,sect_name,
            training_pretest.mark as premark,training_posttest.mark as postmark,training_employee_details.pretest_status,
            training_employee_details.posttest_status,training_employee_details.online_mode,training_employee_details.training_status,
            hrm_emp_master.em_no,designation.desg_slno,designation.desg_name,hrm_emp_master.em_id
            FROM training_retest_emp_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_retest_emp_details.candidate_em_no
            LEFT JOIN training_topic ON training_topic.topic_slno=training_retest_emp_details.retest_topic
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_retest_emp_details.candidate_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_retest_emp_details.candidate_dept_sec
			LEFT JOIN training_pretest ON training_pretest.emp_topic=training_retest_emp_details.retest_topic
            LEFT JOIN training_posttest ON training_posttest.emp_topic=training_retest_emp_details.retest_topic
            LEFT JOIN training_employee_details ON training_employee_details.topic=training_retest_emp_details.retest_topic
            LEFT JOIN designation ON designation.desg_slno=training_employee_details.emp_desig
            WHERE candidate_em_no=? and retest_topic=?`,
            [
                data.emId,
                data.tslno

            ],

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    //induction retest
    GetInductionEmpRetestTopics: (id, callback) => {
        pool.query(
            `             
            SELECT ROW_NUMBER() OVER () as sn, retest_slno, retest_em_no, re_emp_dept, re_dept_sec, retest_date, re_topic, re_attendance, re_questn_count,hrm_emp_master.em_no,hrm_emp_master.em_id,hrm_emp_master.em_name,training_topic.topic_slno,training_topic.training_topic_name,hrm_department.dept_id,hrm_department.dept_name,
            hrm_dept_section.sect_id,hrm_dept_section.sect_name,hrm_emp_master.em_designation,designation.desg_slno,designation.desg_name,
            training_induct_posttest.mark as postmark,training_induction_pretest.mark as premark,
            training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,training_induction_emp_details.online_mode,
            training_induction_emp_details.training_status,training_induction_emp_details.induction_slno,training_induction_emp_details.retest,training_induction_retest.retest_mark,
            training_induction_retest.retest_status
            from training_induction_retest
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_retest.retest_em_no
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_retest.re_topic
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_retest.re_emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_retest.re_dept_sec
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            LEFT JOIN training_induction_pretest ON training_induction_pretest.emp_id=training_induction_retest.retest_em_no
            LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_id=training_induction_retest.retest_em_no
            LEFT JOIN training_induction_emp_details ON training_induction_emp_details.indct_emp_no=training_induction_retest.retest_em_no
            WHERE retest_em_no=? and training_induction_emp_details.training_status=1 and training_induction_emp_details.retest=1`, [id],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetinductRetestQuestions: (data, callBack) => {
        pool.query(
            ` 
            SELECT q_slno, training_topics, questions, answer_a, answer_b, answer_c,
            answer_d, right_answer,training_questions.upload_status, writtenStatus, handwrite_answer,
            marks,training_topic.online_status,training_topic.offline_status,training_topic.both_status,
            training_induction_retest.retest_em_no,training_induction_retest.re_questn_count,
            training_induction_retest.re_emp_dept,training_induction_retest.retest_status, training_induction_retest.retest_mark,
            training_induction_retest.re_dept_sec,hrm_emp_master.em_id,hrm_emp_master.em_name,
            training_induction_retest.re_topic,training_induction_retest.retest_slno
            FROM training_questions
            LEFT JOIN  training_induction_retest ON  training_induction_retest.re_topic=training_questions.training_topics
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_retest.re_topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_retest.retest_em_no
            WHERE training_induction_retest.re_topic=? and training_induction_retest.retest_em_no=?
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

    InsertInductRetestDetails: (data, callBack) => {
        pool.query(
            `INSERT INTO induct_retest_exam_details
            (
                induct_emp_id,
                induct_dept,
                induct_dept_Sec,
                induct_re_topic,
                induct_retest_mark,
                create_user
            )
            VALUES (?,?,?,?,?,?)`,
            [
                data.candidate_em_no,
                data.re_emp_dept,
                data.re_dept_sec,
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

    checkInductRetestEntryExistORNot: (data, callback) => {
        pool.query(
            `     
            SELECT induct_emp_id,induct_re_topic
            FROM induct_retest_exam_details 
            WHERE induct_emp_id=? and induct_re_topic=?
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

    UpdateInductReTestStatus: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_retest set 
             retest_status=?,
             retest_mark=?
             WHERE retest_slno=?`,
            [
                data.retest_status,
                data.mark,
                data.retest_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetRetestQREmpDetails: (data, callBack) => {
        pool.query(
            ` 
            SELECT ROW_NUMBER() OVER () as sn, retest_slno, retest_em_no, re_emp_dept, re_dept_sec, retest_date, re_topic, re_attendance, re_questn_count,hrm_emp_master.em_no,hrm_emp_master.em_id,hrm_emp_master.em_name,training_topic.topic_slno,training_topic.training_topic_name,hrm_department.dept_id,hrm_department.dept_name,
            hrm_dept_section.sect_id,hrm_dept_section.sect_name,hrm_emp_master.em_designation,designation.desg_slno,designation.desg_name,
            training_induct_posttest.mark as postmark,training_induction_pretest.mark as premark,
            training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,training_induction_emp_details.online_mode,
            training_induction_emp_details.training_status,training_induction_emp_details.induction_slno,training_induction_emp_details.retest,training_induction_retest.retest_mark,
            training_induction_retest.retest_status
            from training_induction_retest
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_retest.retest_em_no
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_retest.re_topic
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_retest.re_emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_retest.re_dept_sec
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            LEFT JOIN training_induction_pretest ON training_induction_pretest.emp_id=training_induction_retest.retest_em_no
            LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_id=training_induction_retest.retest_em_no
            LEFT JOIN training_induction_emp_details ON training_induction_emp_details.indct_emp_no=training_induction_retest.retest_em_no
            WHERE retest_em_no=? and re_topic=? and training_induction_emp_details.training_status=1`,
            [
                data.emId,
                data.tslno

            ],

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    GetBelowAvgEmpList: (data, callBack) => {
        pool.query(
            ` 
         SELECT ROW_NUMBER() OVER () as sn, training_employee_details.slno, scheduled_slno, training_employee_details.emp_name, training_employee_details.emp_desig,
            training_employee_details.emp_dept, training_employee_details.emp_dept_sectn, topic, training_employee_details.schedule_date, 
            training_employee_details.training_status, question_count, training_employee_details.pretest_status, 
            training_employee_details.posttest_status,training_employee_details.posttest_permission,emp_topic,hrm_emp_master.em_no,
            em_id as candid_id,em_name,topic_slno,training_topic_name,training_posttest.mark,training_employee_details.retest
            FROM training_employee_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
            where training_employee_details.posttest_status=1 and training_posttest.mark <2 and training_employee_details.emp_dept=?
            and training_employee_details.emp_dept_sectn=?`,
            [
                data.em_department,
                data.em_dept_section

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