const pool = require('../../config/database');

module.exports = {
    GetTodaysInductions: (callback) => {
        pool.query(
            `
            SELECT schedule_slno, schedule_type, schedule_topic, training_induction_schedule.trainers, induction_date,
                      topic_slno,training_topic_name
                      FROM medi_hrm.training_induction_schedule
                      LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
                      where DATE(training_induction_schedule.induction_date)=current_date()
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetAttendanceList: (id, callback) => {
        pool.query(
            `SELECT induction_slno, schedule_no, indct_emp_no, induct_emp_dept, induct_emp_sec,
            training_induction_schedule.schedule_topic,training_induction_schedule.induction_date,
            training_status,question_count,pretest_status,posttest_status,online_mode,offline_mode,retest,
            training_induction_emp_details.indct_emp_no,em_id,em_name
            FROM medi_hrm.training_induction_emp_details
            LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
            where schedule_no=(SELECT schedule_slno FROM medi_hrm.training_induction_schedule where schedule_topic=? and date(induction_date)=current_date()) `, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    UpdateQuestionCount: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE training_induction_emp_details set
                     training_status=?,
                     question_count=?
                     where induction_slno=?`,
                    [val.training_status, val.question_count, val.induction_slno],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })

        })
    },
    GetInductionCompletedList: (callback) => {
        pool.query(
            `
            SELECT ROW_NUMBER() OVER () as sn,induction_slno, schedule_no, indct_emp_no, induct_emp_dept,induction_date,
            induct_emp_sec, training_induction_emp_details.training_status, question_count, training_induction_emp_details.pretest_status,
            training_induction_emp_details.posttest_status, training_induction_emp_details.online_mode, training_induction_emp_details.offline_mode, retest,
            topic_slno,training_topic_name,
            hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            em_id,em_name,
            schedule_topic,
            training_induct_posttest.create_date as postdate
            FROM training_induction_emp_details
            LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
            LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_id=training_induction_emp_details.indct_emp_no
            where training_induction_emp_details.training_status =1 and training_induction_emp_details.posttest_status = 1
            and training_induction_emp_details.pretest_status = 1
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    GetPendingEmpList: (callback) => {
        pool.query(
            `
            SELECT ROW_NUMBER() OVER () as sn, induction_slno, schedule_no, indct_emp_no, induct_emp_dept, induct_emp_sec, training_induction_emp_details.training_status,
            question_count, training_induction_emp_details.pretest_status, training_induction_emp_details.posttest_status, online_mode, offline_mode, retest,
           em_id,em_name,training_induction_schedule.trainers,training_induction_schedule.schedule_type,
           training_induction_schedule.schedule_topic,training_induction_schedule.induction_date,
           training_topic.topic_slno,training_topic.training_topic_name
           FROM training_induction_emp_details
           left join hrm_emp_master on hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
           left join training_induction_schedule on training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
           left join training_topic on training_topic.topic_slno=training_induction_schedule.schedule_topic
           where training_induction_emp_details.pretest_status = 0 and  training_induction_emp_details.posttest_status = 0
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    UpdateTrainingDate: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_emp_details set 
            induct_detail_date=?,
            training_status=0,
            question_count=0,
            edit_user=?
            where induction_slno=?`,
            [
                data.retest_date,
                data.edit_user,
                data.induction_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    checkTopicExistORNot: (data, callback) => {
        pool.query(
            `     
            SELECT schedule_type,schedule_topic 
            FROM training_induction_schedule 
            WHERE schedule_topic=? and induction_date=? 
            `, [
            data.topic_slno,
            data.retest_date
        ],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    InsertScheduleTable: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.training_induction_schedule (
                schedule_type, schedule_topic, trainers, induction_date, create_user  )
             VALUES (?,?,?,?,?)`,
            [
                data.schedule_type,
                data.retest_topic,
                data.trainers,
                data.retest_date,
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
    GetbelowAvgEmp: (callback) => {
        pool.query(
            `
            SELECT ROW_NUMBER() OVER () as sn, induction_slno, schedule_no, indct_emp_no, induct_detail_date, induct_emp_dept, induct_emp_sec,
            training_induction_emp_details.training_status, question_count, training_induction_emp_details.pretest_status,
             training_induction_emp_details.posttest_status, online_mode, offline_mode, retest,
            em_id,em_name,training_induction_schedule.schedule_topic,topic_slno,training_topic_name,training_induct_posttest.mark as postmark,
            training_induction_schedule.induction_date
            FROM medi_hrm.training_induction_emp_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_id=training_induction_emp_details.indct_emp_no
            WHERE training_induction_emp_details.posttest_status=1 and training_induct_posttest.mark <2
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    //retest_slno, retest_em_no, re_emp_dept, re_dept_sec, retest_date, re_topic, re_attendance, re_questn_count, create_user, edit_user, create_date, edit_date
    InsertRetestEmps: (data, callBack) => {
        pool.query(
            `INSERT INTO  medi_hrm.training_induction_retest
            (
                retest_em_no,
                re_emp_dept,
                re_dept_sec,
                retest_date,
                re_topic,
                re_attendance,
                re_questn_count,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.indct_emp_no,
                data.induct_emp_dept,
                data.induct_emp_sec,
                data.date,
                data.topic_slno,
                data.training_status,
                data.question_count,
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
        console.log(data);
        pool.query(
            `
            UPDATE training_induction_emp_details set 
                        retest=1,
                        detail_retest_date=?,
                        edit_user=?
                        where indct_emp_no=? and induction_slno=?`,
            [
                data.date,
                data.edit_user,
                data.indct_emp_no,
                data.induction_slno
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

