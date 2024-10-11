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

    }


}

