const pool = require('../../config/database');

module.exports = {
    GetInductionTestTopics: (callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as sno,schedule_slno, schedule_type, schedule_topic,training_induction_emp_details.induct_detail_date,
            training_topic.topic_slno,training_topic.training_topic_name
             FROM training_induction_schedule
             LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
             LEFT JOIN training_induction_emp_details ON training_induction_emp_details.schedule_no=training_induction_schedule.schedule_slno
             where training_topic.training_status=1 and date(training_induction_emp_details.induct_detail_date)=current_date() 
             group by schedule_slno, schedule_type, schedule_topic,training_induction_emp_details.induct_detail_date,
            training_topic.topic_slno,training_topic.training_topic_name
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    GetLogEmpDetails: (data, callBack) => {
        pool.query(
            ` 
            SELECT em_id, em_no, em_name, em_mobile, 
            em_department, em_dept_section, em_designation,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,
            hrm_dept_section.sect_name, designation.desg_slno,designation.desg_name,
            training_induction_schedule.schedule_topic,
            training_induction_emp_details.indct_emp_no,
            training_topic.topic_slno,training_topic.training_topic_name,training_induction_emp_details.question_count,
            training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,training_induction_emp_details.online_mode,
            training_induction_emp_details.offline_mode,training_induction_emp_details.training_status,training_induction_pretest.mark ,
            training_induct_posttest.mark as postmark,
            training_induction_emp_details.induction_slno as Emslno,
            training_induction_emp_details.schedule_no
            FROM hrm_emp_master
            LEFT JOIN hrm_department ON hrm_department.dept_id=hrm_emp_master.em_department
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            LEFT JOIN training_induction_emp_details ON training_induction_emp_details.indct_emp_no=hrm_emp_master.em_id
			LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            LEFT JOIN training_induction_pretest ON training_induction_pretest.emp_topic=training_induction_schedule.schedule_topic
            LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_topic=training_induction_schedule.schedule_topic
            where hrm_emp_master.em_no=? and hrm_emp_master.em_mobile=? and  training_induction_schedule.schedule_topic=?`,
            [
                data.em_no,
                data.em_mobile,
                data.topic_slno
            ],

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetTestEmpdetails: (id, callback) => {
        pool.query(
            ` SELECT ROW_NUMBER() OVER () as sno,induction_slno, schedule_no, indct_emp_no, induct_emp_dept, induct_emp_sec,
            training_induction_emp_details.training_status, question_count, training_induction_emp_details.pretest_status, 
            training_induction_emp_details.posttest_status, online_mode, offline_mode, retest,
           hrm_department.dept_id,hrm_emp_master.em_id,hrm_dept_section.sect_id,training_topic.topic_slno,training_induction_schedule.schedule_topic,
            training_topic_name,em_name, training_induction_schedule.schedule_slno
           FROM training_induction_emp_details
           LEFT JOIN hrm_department on hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
           LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
           LEFT JOIN hrm_dept_section on hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
           LEFT JOIN training_induction_schedule on training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
           LEFT JOIN training_topic on training_topic.topic_slno=training_induction_schedule.schedule_topic
           WHERE induction_slno=? and training_induction_emp_details.training_status=1`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    InsertPretest: (data, callBack) => {
        pool.query(
            `INSERT INTO training_induction_pretest
            (
                emp_id,
                emp_dept,
                emp_dept_sec,
                emp_topic,
                mark,
                create_user
            )
            VALUES (?,?,?,?,?,?)`,
            [
                data.emp_id,
                data.emp_dept,
                data.emp_dept_sec,
                data.emp_topic,
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

    //Check PreTest Exits or Not
    checkPreeTestEntryExistORNot: (data, callback) => {
        pool.query(
            `     
            SELECT emp_id,emp_topic
            FROM training_induction_pretest 
            WHERE emp_id=? and emp_topic=?
            `, [
            data.emp_id,
            data.topic_slno
        ],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    //QR CODE
    UpdatePretestStatus: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_emp_details set 
             pretest_status=?
             WHERE induction_slno=?`,
            [
                data.pretest_status,
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
    UpdateOnlineMode: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_emp_details set 
             online_mode=?,
             offline_mode=?
             WHERE induction_slno=?`,
            [
                data.online_mode,
                data.offline_mode,
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

    UpdateOfflineMode: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_emp_details set 
             online_mode=?,
             offline_mode=?
             WHERE induction_slno=?`,
            [
                data.online_mode,
                data.offline_mode,
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

    GetPosttestQRdetails: (id, callback) => {
        pool.query(
            `  SELECT ROW_NUMBER() OVER () as sno,induction_slno, schedule_no, indct_emp_no, induct_emp_dept, induct_emp_sec,
               training_induction_emp_details.training_status, question_count, training_induction_emp_details.pretest_status, 
               training_induction_emp_details.posttest_status, online_mode, offline_mode, retest,
               hrm_department.dept_id,hrm_emp_master.em_id,hrm_dept_section.sect_id,training_topic.topic_slno,training_induction_schedule.schedule_topic,
               training_topic_name,em_name, training_induction_schedule.schedule_slno
               FROM training_induction_emp_details
               LEFT JOIN hrm_department on hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
               LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
               LEFT JOIN hrm_dept_section on hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
               LEFT JOIN training_induction_schedule on training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
               LEFT JOIN training_topic on training_topic.topic_slno=training_induction_schedule.schedule_topic
               WHERE induction_slno=? and training_induction_emp_details.training_status=1 `, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    InsertPostTest: (data, callBack) => {
        pool.query(
            `INSERT INTO training_induct_posttest
            (
                emp_id,
                emp_dept,
                emp_dept_sec,
                emp_topic,
                mark,
                create_user
            )
            VALUES (?,?,?,?,?,?)`,
            [
                data.emp_id,
                data.emp_dept,
                data.emp_dept_sec,
                data.emp_topic,
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

    checkPostTestEntryExistORNot: (data, callback) => {
        pool.query(
            `     
            SELECT emp_id,emp_topic
            FROM training_induct_posttest 
            WHERE emp_id=? and emp_topic=?
            `, [
            data.emp_id,
            data.emp_topic
        ],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    UpdatePosttestStatus: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_emp_details set 
            posttest_status=?
             WHERE induction_slno=?`,
            [
                data.posttest_status,
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
}