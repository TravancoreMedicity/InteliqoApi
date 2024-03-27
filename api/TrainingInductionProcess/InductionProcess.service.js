const pool = require('../../config/database');

module.exports = {
    GetTodaysInductions: (callback) => {
        pool.query(

            `
            SELECT schedule_slno, schedule_type, schedule_topic, training_induction_schedule.trainers, training_induction_emp_details.induct_detail_date,
            topic_slno,training_topic_name
            FROM medi_hrm.training_induction_schedule
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
             LEFT JOIN training_induction_emp_details ON training_induction_emp_details.schedule_no=training_induction_schedule.schedule_slno
            where DATE(training_induction_emp_details.induct_detail_date)=current_date() group by schedule_topic
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

            `   SELECT induction_slno, schedule_no, indct_emp_no, induct_emp_dept, induct_emp_sec,
            training_induction_schedule.schedule_topic,training_induction_schedule.induction_date,
            training_induction_emp_details.training_status,question_count,training_induction_emp_details.pretest_status,
            training_induction_emp_details.posttest_status,training_induction_emp_details.online_mode,training_induction_emp_details.offline_mode,
            training_induction_emp_details.retest,training_induction_emp_details.induct_detail_date,
            training_induction_emp_details.indct_emp_no,em_id,em_name,em_no,
            training_topic.training_status as topic_training,
            training_topic.pretest_status as topic_pretest,training_topic.post_test_status as topic_posttest,training_topic.online_status as topic_online,
            training_topic.offline_status as topic_offline,training_topic.both_status as topic_bothmode
            FROM medi_hrm.training_induction_emp_details
            LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            where schedule_no=(SELECT schedule_slno FROM medi_hrm.training_induction_schedule where schedule_topic=? and date(training_induction_emp_details.induct_detail_date)=current_date())`, [id],
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
    UpdateTrainingOnly: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE training_induction_emp_details set
                     training_status=?,
                     question_count=0,
                     pretest_status=0,
                     posttest_status=0,
                     online_mode=0,
                     offline_mode=0,
                     retest=0
                     where induction_slno=?`,
                    [val.training_status, val.induction_slno],
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
            em_id,em_name,em_no,
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
           em_id,em_name,em_no,training_induction_schedule.trainers,training_induction_schedule.schedule_type,
           training_induction_schedule.schedule_topic,training_induction_schedule.induction_date,
           training_topic.topic_slno,training_topic.training_topic_name,training_induction_emp_details.induct_detail_date
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
    //induction detail_table update
    UpdateTrainingDate: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_emp_details set 
            induct_detail_date=?,
            training_status=0,
            question_count=0,
            pretest_status=0,
            posttest_status=0,
            online_mode=0,
            offline_mode=0,
            edit_user=?
            where schedule_no=? and induction_slno=?`,
            [
                data.retest_date,
                data.edit_user,
                data.slno,
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
            SELECT induct_reschdl_topic ,induct_reschdl_date
            FROM training_induct_reschedule 
            WHERE induct_reschdl_topic=? and induct_reschdl_date=?
            `, [
            data.retest_topic,
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
    //select * from training_induct_reschedule;

    //induct_reschdl_slno, induct_schedule_slno, induct_reschdl_em_id, induct_reschdl_dept, induct_reschdl_dept_sec,
    // induct_reschdl_topic, induct_reschdl_status, induct_reschdl_date, create_user, edit_user, create_date, update_date
    InsertScheduleTable: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.training_induct_reschedule (
                induct_schedule_slno, induct_reschdl_em_id, induct_reschdl_dept, induct_reschdl_dept_sec,
    induct_reschdl_topic, induct_reschdl_status, induct_reschdl_date, create_user )
             VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.slno,
                data.employeeId,
                data.induct_emp_dept,
                data.induct_emp_sec,
                data.retest_topic,
                data.status,
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
            em_id,em_name,em_no,training_induction_schedule.schedule_topic,topic_slno,training_topic_name,training_induct_posttest.mark as postmark,
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
    GetInductCalenderDetails: (callback) => {
        pool.query(
            ` SELECT schedule_topic,induction_date,topic_slno,training_topic_name
            FROM medi_hrm.training_induction_schedule        
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
}

