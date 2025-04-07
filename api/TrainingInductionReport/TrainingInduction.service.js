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

            `  
             SELECT ROW_NUMBER() OVER () as serialno, indct_emp_no, induct_emp_dept, induct_detail_date,hrm_emp_master.em_no,
             hrm_emp_master.em_name,hrm_department.dept_name,training_induction_schedule.schedule_topic,
             training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,
             training_topic.training_topic_name, training_topic.subtype_no
             FROM training_induction_emp_details
             LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
             LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
             LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
             LEFT JOIN training_subtype_master on JSON_CONTAINS(training_topic.subtype_no,cast(training_subtype_master.subtype_slno as json),'$')
             WHERE date(training_induction_emp_details.induct_detail_date) BETWEEN ? AND ? 
             group by training_topic.topic_slno,indct_emp_no`,
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

        // `SELECT ROW_NUMBER() OVER () as serialno, indct_emp_no, induct_emp_dept, induct_detail_date,hrm_emp_master.em_no,
        //      hrm_emp_master.em_name,hrm_department.dept_name,training_induction_schedule.schedule_topic,
        //      training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,
        //      training_topic.training_topic_name
        //      FROM training_induction_emp_details
        //      LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
        //      LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
        //      LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
        //      LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic

        //      AND date(induct_detail_date) BETWEEN ? AND ?`,

        //  WHERE training_induction_emp_details.pretest_status=1 AND training_induction_emp_details.posttest_status=1 
    },

    GetInductionPendingList: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as serialno, indct_emp_no, induct_emp_dept, induct_detail_date,hrm_emp_master.em_no,
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

    GetInductionPassedEmpList: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as serialno,
       indct_emp_no,
       induct_emp_dept,
       induct_detail_date,
       hrm_emp_master.em_no,
       hrm_emp_master.em_name,
       hrm_department.dept_name,
       training_induction_schedule.schedule_topic,
       training_induction_emp_details.pretest_status,
       training_induction_emp_details.posttest_status,
       training_topic.training_topic_name,
       training_induct_posttest.mark as post_mark,
       training_induction_emp_details.schedule_no,
       training_induction_pretest.mark as pre_mark
       FROM training_induction_emp_details
LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id = training_induction_emp_details.indct_emp_no
LEFT JOIN hrm_department ON hrm_department.dept_id = training_induction_emp_details.induct_emp_dept
LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno = training_induction_emp_details.schedule_no
LEFT JOIN training_topic ON training_topic.topic_slno = training_induction_schedule.schedule_topic
LEFT JOIN training_induct_posttest ON training_induct_posttest.post_scheduleno = training_induction_emp_details.schedule_no
                                    AND training_induction_emp_details.indct_emp_no = training_induct_posttest.emp_id
LEFT JOIN training_induction_pretest ON training_induction_pretest.pre_scheduleno = training_induction_emp_details.schedule_no
                                    AND training_induction_emp_details.indct_emp_no = training_induction_pretest.emp_id
WHERE training_induction_emp_details.pretest_status = 1 
      AND training_induction_emp_details.posttest_status = 1 
      AND training_induct_posttest.mark >= 3
      AND DATE(training_induction_emp_details.induct_detail_date) BETWEEN ? AND ?`,
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
    GetInductionFailedEmpList: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () AS serialno,
       indct_emp_no,
       induct_emp_dept,
       induct_detail_date,
       emp_master.em_no,
       emp_master.em_name,
       hrm_department.dept_name,
       training_induction_schedule.schedule_topic,
       training_induction_emp_details.pretest_status,
       training_induction_emp_details.posttest_status,
       training_topic.training_topic_name,
       training_induct_posttest.mark AS post_mark,
       training_induction_emp_details.schedule_no,
       training_induction_pretest.mark AS pre_mark,
       GROUP_CONCAT(trainer_master.em_name) AS trainers_name,
       training_induction_schedule.trainers
FROM training_induction_emp_details
LEFT JOIN hrm_emp_master AS emp_master ON emp_master.em_id = training_induction_emp_details.indct_emp_no
LEFT JOIN hrm_department ON hrm_department.dept_id = training_induction_emp_details.induct_emp_dept
LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno = training_induction_emp_details.schedule_no
LEFT JOIN training_topic ON training_topic.topic_slno = training_induction_schedule.schedule_topic
LEFT JOIN training_induct_posttest ON training_induct_posttest.post_scheduleno = training_induction_emp_details.schedule_no
                                    AND training_induction_emp_details.indct_emp_no = training_induct_posttest.emp_id
LEFT JOIN training_induction_pretest ON training_induction_pretest.pre_scheduleno = training_induction_emp_details.schedule_no
                                    AND training_induction_emp_details.indct_emp_no = training_induction_pretest.emp_id
LEFT JOIN hrm_emp_master AS trainer_master ON JSON_CONTAINS(training_induction_schedule.trainers, CAST(trainer_master.em_id AS JSON), '$')
WHERE training_induction_emp_details.pretest_status = 1
      AND training_induction_emp_details.posttest_status = 1
      AND training_induct_posttest.mark < 3
      AND DATE(training_induction_emp_details.induct_detail_date) BETWEEN ? AND ?
GROUP BY training_induction_emp_details.schedule_no`,
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
    // GetinductionGeneralList: (callback) => {
    //     pool.query(
    //         `
    //         SELECT topic_slno,training_dept,training_topic.dept_status,training_topic_name,training_topic.training_name,training_status, tutorial_status, medical_status, non_medical_status,
    //         pretest_status, post_test_status,online_status, offline_status, both_status,video_link,video_time,
    //         name_slno,training_name.training_name,hours,hrm_department.dept_id,dept_name,name_slno,upload_status,
    //         GROUP_CONCAT(em_name)  as trainers_name,trainers,training_topic.subtype_no,GROUP_CONCAT(subtype_name)  as subtype_name
    //         FROM training_topic
    //         LEFT JOIN hrm_department ON hrm_department.dept_id=training_topic.training_dept
    //         LEFT JOIN training_name ON training_topic.training_name=training_name.name_slno
    //         LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_topic.trainers,cast(hrm_emp_master.em_id as json),'$')  
    // 		LEFT JOIN training_subtype_master on JSON_CONTAINS(training_topic.subtype_no,cast(training_subtype_master.subtype_slno as json),'$')  
    //         WHERE  training_topic.dept_status=0
    //         group by topic_slno`, [],

    //         (err, results, feilds) => {
    //             if (err) {
    //                 return callback(err)

    //             }
    //             return callback(null, results)
    //         }
    //     )
    // },

    GetinductionGeneralList: (data, callback) => {
        pool.query(
            `     
  SELECT 
               ROW_NUMBER() OVER () AS serialno, 
               indct_emp_no, 
               induct_emp_dept, 
               induct_detail_date, 
               hrm_emp_master.em_no, 
               hrm_emp_master.em_name, 
               hrm_department.dept_name, 
               training_induction_schedule.schedule_topic,
               training_topic.training_topic_name, 
               training_topic.subtype_no,
               training_subtype_master.subtype_name,
               training_subtype_master.subtype_count,
			   training_topic.pretest_status as topic_pre_status,
               training_topic.post_test_status as topic_post_status,
               training_topic.offline_status as topic_offline_status,
               training_topic.online_status as topic_online_status,
               training_induction_emp_details.training_status,
               training_induction_emp_details.pretest_status,
               training_induction_emp_details.posttest_status,
               training_induction_emp_details.online_mode,
               training_induction_emp_details.offline_mode,
               training_induction_emp_details.retest,
               training_induction_emp_details.training_iduct_tnd_verify_status,
               training_induction_emp_details.induct_emp_sec,
               hrm_dept_section.sect_id,hrm_dept_section.sect_name
               FROM training_induction_emp_details
               LEFT JOIN hrm_emp_master 
               ON hrm_emp_master.em_id = training_induction_emp_details.indct_emp_no
               LEFT JOIN hrm_department 
               ON hrm_department.dept_id = training_induction_emp_details.induct_emp_dept
               LEFT JOIN training_induction_schedule 
               ON training_induction_schedule.schedule_slno = training_induction_emp_details.schedule_no
               LEFT JOIN training_topic 
               ON training_topic.topic_slno = training_induction_schedule.schedule_topic
               LEFT JOIN  training_subtype_master ON training_subtype_master.subtype_slno=training_topic.subtype_no
               LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id= training_induction_emp_details.induct_emp_sec
               WHERE 
               DATE(training_induction_emp_details.induct_detail_date) BETWEEN ? AND ?
               AND training_topic.subtype_no=? AND training_induction_emp_details.training_status=1 AND
               training_induction_emp_details.posttest_status=1
               GROUP BY 
              indct_emp_no`,
            [
                data.Fromdate,
                data.Todate,
                data.typeId
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )

    },
    GetinductPendingList: (data, callback) => {
        pool.query(
            `     
               SELECT 
               ROW_NUMBER() OVER () AS serialno, 
               indct_emp_no, 
               induct_emp_dept, 
               induct_detail_date, 
               hrm_emp_master.em_no, 
               hrm_emp_master.em_name, 
               hrm_department.dept_name, 
               training_induction_schedule.schedule_topic,
               training_topic.training_topic_name, 
               training_topic.subtype_no,
               training_subtype_master.subtype_name,
               training_subtype_master.subtype_count,
			   training_topic.pretest_status as topic_pre_status,
               training_topic.post_test_status as topic_post_status,
               training_topic.offline_status as topic_offline_status,
               training_topic.online_status as topic_online_status,
               training_induction_emp_details.training_status,
               training_induction_emp_details.pretest_status,
               training_induction_emp_details.posttest_status,
               training_induction_emp_details.online_mode,
               training_induction_emp_details.offline_mode,
               training_induction_emp_details.retest,
               training_induction_emp_details.training_iduct_tnd_verify_status,
               training_induction_emp_details.induct_emp_sec,
               hrm_dept_section.sect_id,hrm_dept_section.sect_name
               FROM training_induction_emp_details
               LEFT JOIN hrm_emp_master 
               ON hrm_emp_master.em_id = training_induction_emp_details.indct_emp_no
               LEFT JOIN hrm_department 
               ON hrm_department.dept_id = training_induction_emp_details.induct_emp_dept
               LEFT JOIN training_induction_schedule 
               ON training_induction_schedule.schedule_slno = training_induction_emp_details.schedule_no
               LEFT JOIN training_topic 
               ON training_topic.topic_slno = training_induction_schedule.schedule_topic
               LEFT JOIN  training_subtype_master ON training_subtype_master.subtype_slno=training_topic.subtype_no
               LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id= training_induction_emp_details.induct_emp_sec
               WHERE 
               DATE(training_induction_emp_details.induct_detail_date) BETWEEN ? AND ?
               AND training_topic.subtype_no=? AND training_induction_emp_details.training_status=0 AND
               training_induction_emp_details.posttest_status=0
               GROUP BY 
              indct_emp_no`,
            [
                data.Fromdate,
                data.Todate,
                data.typeId
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )

    },

    GetinductReTestList: (data, callback) => {
        pool.query(
            `
            SELECT ROW_NUMBER() OVER () AS serialno,
       training_induction_emp_details.indct_emp_no,
       training_induction_emp_details.induct_emp_dept,
       training_induction_emp_details.induct_detail_date,
       emp_master.em_no,
       emp_master.em_name,
       hrm_department.dept_name,
       training_induction_schedule.schedule_topic,
       training_induction_emp_details.pretest_status,
       training_induction_emp_details.posttest_status,
       training_topic.training_topic_name,
       training_induct_posttest.mark AS post_mark,
       training_induction_emp_details.schedule_no,
       training_induction_pretest.mark AS pre_mark,
       GROUP_CONCAT(trainer_master.em_name) AS trainers_name,
       training_induction_schedule.trainers,
       training_induct_reschedule.induct_reschdl_status
FROM training_induction_emp_details
LEFT JOIN hrm_emp_master AS emp_master 
       ON emp_master.em_id = training_induction_emp_details.indct_emp_no
LEFT JOIN hrm_department 
       ON hrm_department.dept_id = training_induction_emp_details.induct_emp_dept
LEFT JOIN training_induction_schedule 
       ON training_induction_schedule.schedule_slno = training_induction_emp_details.schedule_no
LEFT JOIN training_topic 
       ON training_topic.topic_slno = training_induction_schedule.schedule_topic
LEFT JOIN training_induct_posttest 
       ON training_induct_posttest.post_scheduleno = training_induction_emp_details.schedule_no
          AND training_induction_emp_details.indct_emp_no = training_induct_posttest.emp_id
LEFT JOIN training_induction_pretest 
       ON training_induction_pretest.pre_scheduleno = training_induction_emp_details.schedule_no
          AND training_induction_emp_details.indct_emp_no = training_induction_pretest.emp_id
LEFT JOIN hrm_emp_master AS trainer_master 
       ON JSON_CONTAINS(training_induction_schedule.trainers, CAST(trainer_master.em_id AS JSON), '$')
LEFT JOIN training_induct_reschedule 
       ON training_induct_reschedule.induct_reschdl_em_id = training_induct_posttest.emp_id
WHERE training_induction_emp_details.pretest_status = 1
  AND training_induction_emp_details.posttest_status = 1
  AND training_induct_posttest.mark < 3 
  AND (training_induct_reschedule.induct_reschdl_status != 1 OR training_induct_reschedule.induct_reschdl_status IS NULL)
  AND DATE(training_induction_emp_details.induct_detail_date) BETWEEN ? AND ?
GROUP BY training_induction_emp_details.schedule_no,
         training_induction_emp_details.indct_emp_no,
         training_induction_emp_details.induct_emp_dept,
         training_induction_emp_details.induct_detail_date,
         emp_master.em_no,
         emp_master.em_name,
         hrm_department.dept_name,
         training_induction_schedule.schedule_topic,
         training_induction_emp_details.pretest_status,
         training_induction_emp_details.posttest_status,
         training_topic.training_topic_name,
         training_induct_posttest.mark,
         training_induction_pretest.mark,
         training_induction_schedule.trainers,
         training_induct_reschedule.induct_reschdl_status`,
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

    GetTrainerTrainingInductDatas: (id, callback) => {
        const EmID = id.toString()
        pool.query(
            `
       SELECT ROW_NUMBER() OVER () AS Slno,
       schedule_topic,
       induction_date,
       training_induction_schedule.trainers,
       GROUP_CONCAT(trainer.em_name) AS trainer_name,
       topic_slno,
       training_topic_name,
       trainer.em_department,
       dept_name,sect_name,em_no
       FROM training_induction_schedule
       LEFT JOIN training_topic ON training_topic.topic_slno = training_induction_schedule.schedule_topic
       LEFT JOIN hrm_emp_master AS trainer ON JSON_CONTAINS(training_induction_schedule.trainers, CAST(trainer.em_id AS JSON), '$')
       LEFT JOIN hrm_department ON hrm_department.dept_id = trainer.em_department
       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id = trainer.em_dept_section
       WHERE JSON_CONTAINS(training_induction_schedule.trainers,?, '$')
       GROUP BY training_induction_schedule.induction_date;
          `, [EmID],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    GetTrainerTrainingDeptDatas: (id, callback) => {
        const EmID = id.toString()
        pool.query(
            `
       SELECT ROW_NUMBER() OVER () AS Slno,
       schedule_topics,
       schedule_date,
       training_departmental_schedule.schedule_trainers,
       GROUP_CONCAT(trainer.em_name) AS trainer_name,
       topic_slno,
       training_topic_name,
       trainer.em_department,
       dept_name,sect_name,em_no
       FROM training_departmental_schedule
       LEFT JOIN training_topic ON training_topic.topic_slno = training_departmental_schedule.schedule_topics
       LEFT JOIN hrm_emp_master AS trainer ON JSON_CONTAINS(training_departmental_schedule.schedule_trainers, CAST(trainer.em_id AS JSON), '$')
       LEFT JOIN hrm_department ON hrm_department.dept_id = trainer.em_department
       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id = trainer.em_dept_section
       WHERE JSON_CONTAINS(training_departmental_schedule.schedule_trainers,?, '$')
       GROUP BY training_departmental_schedule.schedule_date
          `, [EmID],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    GetInductTrainingTopicWise: (data, callback) => {
        pool.query(
            `
             SELECT ROW_NUMBER() OVER () as Slno ,schedule_slno,topic_slno,training_topic_name,induction_date,GROUP_CONCAT(trainer.em_name) AS trainer_name
             FROM training_induction_schedule 
             LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
             LEFT JOIN hrm_emp_master AS trainer ON JSON_CONTAINS(training_induction_schedule.trainers, CAST(trainer.em_id AS JSON), '$')
             WHERE schedule_topic=?  group by schedule_slno`,
            [
                data.topic
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )

    },
    GetInductionDeptWiseTrainings: (data, callback) => {
        pool.query(
            `      
                          
    SELECT ROW_NUMBER() OVER () AS serialno,
       indct_emp_no,
       induct_emp_dept,
       induct_detail_date,
       emp_master.em_no,
       emp_master.em_name,
       hrm_department.dept_name,
       training_induction_schedule.schedule_topic,
       training_induction_emp_details.pretest_status,
       training_induction_emp_details.posttest_status,
       training_topic.training_topic_name,
       training_induct_posttest.mark AS post_mark,
       training_induction_emp_details.schedule_no,
       training_induction_pretest.mark AS pre_mark,
       GROUP_CONCAT(trainer_master.em_name) AS trainers_name,
       training_induction_schedule.trainers,training_induction_emp_details.training_status,
       hrm_dept_section.sect_name,
        training_induction_emp_details.training_induct_hod_aprvl_status,
       training_induction_emp_details.training_iduct_tnd_verify_status,
        training_induction_emp_details.retest, training_induction_emp_details.offline_mode,
          training_induction_emp_details.online_mode
FROM training_induction_emp_details
LEFT JOIN hrm_emp_master AS emp_master ON emp_master.em_id = training_induction_emp_details.indct_emp_no
LEFT JOIN hrm_department ON hrm_department.dept_id = training_induction_emp_details.induct_emp_dept
LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno = training_induction_emp_details.schedule_no
LEFT JOIN training_topic ON training_topic.topic_slno = training_induction_schedule.schedule_topic
LEFT JOIN training_induct_posttest ON training_induct_posttest.post_scheduleno = training_induction_emp_details.schedule_no
                                    AND training_induction_emp_details.indct_emp_no = training_induct_posttest.emp_id
LEFT JOIN training_induction_pretest ON training_induction_pretest.pre_scheduleno = training_induction_emp_details.schedule_no
                                    AND training_induction_emp_details.indct_emp_no = training_induction_pretest.emp_id
LEFT JOIN hrm_emp_master AS trainer_master ON JSON_CONTAINS(training_induction_schedule.trainers, CAST(trainer_master.em_id AS JSON), '$')
 LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id= emp_master.em_dept_section  
 WHERE  induct_emp_dept=? and induct_emp_sec=? and schedule_topic=? and month(induct_detail_date)=?
GROUP BY training_induction_emp_details.indct_emp_no`,
            [
                data.deptID,
                data.sectionID,
                data.topic,
                data.selectedMonth
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetInductionAllStaffReports: (data, callback) => {
        pool.query(
            `      
                          
    SELECT ROW_NUMBER() OVER () AS serialno,
       indct_emp_no,
       induct_emp_dept,
       induct_detail_date,
       emp_master.em_no,
       emp_master.em_name,
       hrm_department.dept_name,
       training_induction_schedule.schedule_topic,
       training_induction_emp_details.pretest_status,
       training_induction_emp_details.posttest_status,
       training_topic.training_topic_name,
       training_induct_posttest.mark AS post_mark,
       training_induction_emp_details.schedule_no,
       training_induction_pretest.mark AS pre_mark,
       GROUP_CONCAT(trainer_master.em_name) AS trainers_name,
       training_induction_schedule.trainers,training_induction_emp_details.training_status,
       hrm_dept_section.sect_name,
       training_induction_emp_details.training_induct_hod_aprvl_status,
       training_induction_emp_details.training_iduct_tnd_verify_status,
       training_induction_emp_details.retest, training_induction_emp_details.offline_mode,
       training_induction_emp_details.online_mode
       FROM training_induction_emp_details
       LEFT JOIN hrm_emp_master AS emp_master ON emp_master.em_id = training_induction_emp_details.indct_emp_no
       LEFT JOIN hrm_department ON hrm_department.dept_id = training_induction_emp_details.induct_emp_dept
       LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno = training_induction_emp_details.schedule_no
       LEFT JOIN training_topic ON training_topic.topic_slno = training_induction_schedule.schedule_topic
       LEFT JOIN training_induct_posttest ON training_induct_posttest.post_scheduleno = training_induction_emp_details.schedule_no
                                    AND training_induction_emp_details.indct_emp_no = training_induct_posttest.emp_id
       LEFT JOIN training_induction_pretest ON training_induction_pretest.pre_scheduleno = training_induction_emp_details.schedule_no
                                    AND training_induction_emp_details.indct_emp_no = training_induction_pretest.emp_id
       LEFT JOIN hrm_emp_master AS trainer_master ON JSON_CONTAINS(training_induction_schedule.trainers, CAST(trainer_master.em_id AS JSON), '$')
       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id= emp_master.em_dept_section  
       WHERE  schedule_topic=? and month(induct_detail_date)=?
       GROUP BY training_induction_emp_details.indct_emp_no`,
            [
                data.topic,
                data.selectedMonth
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetScheduledDeptTrainingList: (data, callback) => {
        pool.query(
            `                           
    SELECT ROW_NUMBER() OVER () as Slno, slno, department, deparment_sect, schedule_date, schedule_topics, schedule_trainers, schedule_remark,
    GROUP_CONCAT(hrm_emp_master.em_name) AS trainer_name,topic_slno,training_topic_name,hrm_emp_master.em_department,dept_name,
    hrm_dept_section.sect_name
    FROM training_departmental_schedule
    LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
    LEFT JOIN hrm_emp_master ON JSON_CONTAINS(training_departmental_schedule.schedule_trainers, CAST(hrm_emp_master.em_id AS JSON), '$')
    LEFT JOIN hrm_department ON hrm_department.dept_id=training_departmental_schedule.department
    LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_departmental_schedule.deparment_sect
    WHERE month(schedule_date)=?
    GROUP BY slno`,
            [
                data.selectedmonth
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    getTrainingCompletionEmpReports: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as calender_slno, training_employee_details.slno, emp_name, emp_desig, training_employee_details.emp_dept, emp_dept_sectn, topic,
            training_employee_details.training_status,hrm_emp_master.em_no,
                       training_employee_details.schedule_date, training_employee_details.pretest_status, training_employee_details.posttest_status,
                       training_topic.topic_slno,training_topic.training_topic_name,hrm_emp_master.em_name,online_status,offline_status,
                       training_posttest.mark as posttest_mark,training_retest_emp_details.retest_mark,training_retest_emp_details.retest_status,
                       hrm_emp_master.em_id,training_pretest.mark as Pretest_mark,training_employee_details.online_mode,training_employee_details.offline_mode,
                       hrm_department.dept_id,hrm_department.dept_name,sect_id,sect_name,training_hod_apprvls_status,tnd_verification_status,
                       training_employee_details.retest
                       FROM training_employee_details
                       LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                       LEFT JOIN training_posttest ON training_posttest.dept_schedule_slno=training_employee_details.scheduled_slno and training_posttest.emp_id= training_employee_details.emp_name
                       LEFT JOIN training_pretest ON training_pretest.pre_dept_schedule_slno =training_employee_details.scheduled_slno and training_pretest.emp_id =training_employee_details.emp_name
                       LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
                       LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
                       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                        LEFT JOIN training_departmental_schedule ON training_departmental_schedule.slno=training_employee_details.scheduled_slno
                       WHERE  training_employee_details.emp_dept=? and training_employee_details.emp_dept_sectn=?
                      and training_employee_details.emp_name =?
                       and training_employee_details.training_status=1
                       group by training_employee_details.scheduled_slno,training_employee_details.schedule_date`,
            [
                data.deptID,
                data.sectionID,
                data.emID
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    getDeptPendingEmpReports: (data, callback) => {

        pool.query(
            `SELECT ROW_NUMBER() OVER () as calender_slno, training_employee_details.slno, emp_name, emp_desig, training_employee_details.emp_dept, emp_dept_sectn, topic,
            training_employee_details.training_status,hrm_emp_master.em_no,
                       training_employee_details.schedule_date, training_employee_details.pretest_status, training_employee_details.posttest_status,
                       training_topic.topic_slno,training_topic.training_topic_name,hrm_emp_master.em_name,online_status,offline_status,
                       training_posttest.mark as posttest_mark,training_retest_emp_details.retest_mark,training_retest_emp_details.retest_status,
                       hrm_emp_master.em_id,training_pretest.mark as Pretest_mark,training_employee_details.online_mode,training_employee_details.offline_mode,
                       hrm_department.dept_id,hrm_department.dept_name,sect_id,hrm_dept_section.sect_name,training_hod_apprvls_status,tnd_verification_status,
                       training_employee_details.retest
                       FROM training_employee_details
                       LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name 
                       LEFT JOIN training_posttest ON training_posttest.dept_schedule_slno=training_employee_details.scheduled_slno and training_posttest.emp_id= training_employee_details.emp_name
                       LEFT JOIN training_pretest ON training_pretest.pre_dept_schedule_slno =training_employee_details.scheduled_slno and training_pretest.emp_id =training_employee_details.emp_name
                       LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
                       LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
                       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                        LEFT JOIN training_departmental_schedule ON training_departmental_schedule.slno=training_employee_details.scheduled_slno
                       WHERE  training_employee_details.emp_dept=? and training_employee_details.emp_dept_sectn=?
                       and training_employee_details.training_status=0
                       group by training_employee_details.slno, emp_name `,
            [
                data.deptID,
                data.sectionID
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    GetDeptStaffExamPassedReport: (data, callback) => {
        pool.query(
            `                      
     SELECT 
    ROW_NUMBER() OVER () AS serialno, 
    training_employee_details.slno, 
    training_employee_details.scheduled_slno, 
    emp_master.em_name AS emp_name, 
    training_employee_details.emp_dept, 
    emp_master.em_dept_section, 
    training_employee_details.topic, 
    training_employee_details.schedule_date, 
    training_employee_details.training_status, 
    training_employee_details.pretest_status, 
    training_employee_details.posttest_status, 
    training_employee_details.online_mode, 
    training_employee_details.offline_mode, 
    training_employee_details.retest, 
    training_employee_details.training_apprvl_status, 
    training_employee_details.training_hod_apprvls_status, 
    training_employee_details.tnd_verification_status, 
    hrm_dept_section.sect_name, 
    GROUP_CONCAT(trainer_master.em_name) AS trainers_name, 
    emp_master.em_no, 
    hrm_department.dept_name, 
    training_topic.training_topic_name, 
    training_posttest.mark AS post_mark, 
    training_departmental_schedule.slno AS schedule_slno, 
    training_pretest.mark AS pre_mark
FROM 
    training_employee_details
LEFT JOIN 
    hrm_emp_master AS emp_master ON emp_master.em_id = training_employee_details.emp_name
LEFT JOIN 
    hrm_department ON hrm_department.dept_id = training_employee_details.emp_dept
LEFT JOIN 
    training_departmental_schedule ON training_departmental_schedule.slno = training_employee_details.scheduled_slno
LEFT JOIN 
    training_topic ON training_topic.topic_slno = training_employee_details.topic
LEFT JOIN 
    training_posttest ON training_posttest.dept_schedule_slno = training_employee_details.scheduled_slno
                      AND training_employee_details.emp_name = training_posttest.emp_id
LEFT JOIN 
    training_pretest ON training_pretest.pre_dept_schedule_slno = training_employee_details.scheduled_slno
                     AND training_employee_details.emp_name = training_pretest.emp_id
LEFT JOIN 
    hrm_emp_master AS trainer_master ON JSON_CONTAINS(training_departmental_schedule.schedule_trainers, 
                      CAST(trainer_master.em_id AS CHAR), '$')
LEFT JOIN 
    hrm_dept_section ON hrm_dept_section.sect_id = emp_master.em_dept_section
 WHERE training_employee_details.emp_dept=? and training_employee_details.emp_dept_sectn=?
 and month(training_employee_details.schedule_date)=? and training_employee_details.topic=?
 and training_employee_details.training_status=1 and  training_posttest.mark>2
    
GROUP BY 
    training_employee_details.slno, emp_master.em_name, emp_master.em_no`,
            [
                data.deptID,
                data.sectionID,
                data.selectedMonth,
                data.topic
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetDeptStaffExamFailledReport: (data, callback) => {
        pool.query(
            `                      
     SELECT 
    ROW_NUMBER() OVER () AS serialno, 
    training_employee_details.slno, 
    training_employee_details.scheduled_slno, 
    emp_master.em_name AS emp_name, 
    training_employee_details.emp_dept, 
    emp_master.em_dept_section, 
    training_employee_details.topic, 
    training_employee_details.schedule_date, 
    training_employee_details.training_status, 
    training_employee_details.pretest_status, 
    training_employee_details.posttest_status, 
    training_employee_details.online_mode, 
    training_employee_details.offline_mode, 
    training_employee_details.retest, 
    training_employee_details.training_apprvl_status, 
    training_employee_details.training_hod_apprvls_status, 
    training_employee_details.tnd_verification_status, 
    hrm_dept_section.sect_name, 
    GROUP_CONCAT(trainer_master.em_name) AS trainers_name, 
    emp_master.em_no, 
    hrm_department.dept_name, 
    training_topic.training_topic_name, 
    training_posttest.mark AS post_mark, 
    training_departmental_schedule.slno AS schedule_slno, 
    training_pretest.mark AS pre_mark
FROM 
    training_employee_details
LEFT JOIN 
    hrm_emp_master AS emp_master ON emp_master.em_id = training_employee_details.emp_name
LEFT JOIN 
    hrm_department ON hrm_department.dept_id = training_employee_details.emp_dept
LEFT JOIN 
    training_departmental_schedule ON training_departmental_schedule.slno = training_employee_details.scheduled_slno
LEFT JOIN 
    training_topic ON training_topic.topic_slno = training_employee_details.topic
LEFT JOIN 
    training_posttest ON training_posttest.dept_schedule_slno = training_employee_details.scheduled_slno
                      AND training_employee_details.emp_name = training_posttest.emp_id
LEFT JOIN 
    training_pretest ON training_pretest.pre_dept_schedule_slno = training_employee_details.scheduled_slno
                     AND training_employee_details.emp_name = training_pretest.emp_id
LEFT JOIN 
    hrm_emp_master AS trainer_master ON JSON_CONTAINS(training_departmental_schedule.schedule_trainers, 
                      CAST(trainer_master.em_id AS CHAR), '$')
LEFT JOIN 
    hrm_dept_section ON hrm_dept_section.sect_id = emp_master.em_dept_section
 WHERE training_employee_details.emp_dept=? and training_employee_details.emp_dept_sectn=?
 and month(training_employee_details.schedule_date)=? and training_employee_details.topic=?
 and training_employee_details.training_status=1 and  training_posttest.mark<2
    
GROUP BY 
    training_employee_details.slno, emp_master.em_name,emp_master.em_no`,
            [
                data.deptID,
                data.sectionID,
                data.selectedMonth,
                data.topic
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetYearWiseDepartmentalTrainingList: (data, callback) => {
        pool.query(
            `                      
 SELECT ROW_NUMBER() OVER () as Slno, slno, department, deparment_sect, schedule_date, schedule_topics, schedule_trainers, schedule_remark,
  GROUP_CONCAT(hrm_emp_master.em_name) AS trainer_name,topic_slno,training_topic_name,hrm_emp_master.em_department,dept_name,
  hrm_dept_section.sect_name
 FROM training_departmental_schedule
  LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
 LEFT JOIN hrm_emp_master ON JSON_CONTAINS(training_departmental_schedule.schedule_trainers, CAST(hrm_emp_master.em_id AS JSON), '$')
 LEFT JOIN hrm_department ON hrm_department.dept_id=training_departmental_schedule.department
  LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_departmental_schedule.deparment_sect
 WHERE department=? AND deparment_sect=? AND year(schedule_date)=?
 group by slno`,
            [
                data.deptID,
                data.sectionID,
                data.selectedYear
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



