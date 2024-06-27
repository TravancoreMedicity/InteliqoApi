const pool = require('../../config/database');

module.exports = {
    GetInductList: (callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as slno,schedule_slno,schedule_topic,induction_date,
            training_topic.topic_slno,training_topic.training_topic_name
            FROM training_induction_schedule
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic`
            , [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    GetInductAllData: (id, callback) => {
        pool.query(
            ` SELECT ROW_NUMBER() OVER () as veriftn_slno,induction_slno, schedule_no, indct_emp_no, induction_date,
            training_induction_emp_details.training_status, question_count, training_induction_emp_details.pretest_status,
            training_induction_emp_details.posttest_status, training_induction_emp_details.online_mode, training_induction_emp_details.offline_mode, retest,
            training_iduct_tnd_verify_status,
            topic_slno,training_topic_name,hours,
            em_id,em_name,em_no,
            schedule_topic,
            training_induction_pretest.mark as pre_mark,
            training_induct_posttest.mark as post_mark
            FROM training_induction_emp_details
            LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
		    LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
		    LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
            LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_id=training_induction_emp_details.indct_emp_no
			LEFT JOIN training_induction_pretest ON training_induction_pretest.emp_id=training_induction_emp_details.indct_emp_no
            where training_induction_emp_details.schedule_no=?
            group by induction_slno, schedule_no, indct_emp_no, induction_date,
            training_induction_emp_details.training_status, question_count, training_induction_emp_details.pretest_status,
            training_induction_emp_details.posttest_status, training_induction_emp_details.online_mode, training_induction_emp_details.offline_mode, retest,
            training_iduct_tnd_verify_status,
            topic_slno,training_topic_name,hours,
            em_id,em_name,em_no,
            schedule_topic,
            training_induction_pretest.mark ,
            training_induct_posttest.mark`
            , [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    UpdateVerification: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE training_induction_emp_details SET
                    training_iduct_tnd_verify_status=?,
                    training_induct_tnd_verify_user=?,
                    edit_user=?
                    WHERE induction_slno=?`,
                    [
                        val.verify_status,
                        val.verify_user,
                        val.edit_user,
                        val.induction_slno
                    ],
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

    GetDeptTrainings: (callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as dept_slno, slno,department,deparment_sect,schedule_date,schedule_topics,
             hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_name,
             training_topic.topic_slno,training_topic.training_topic_name,hrm_dept_section.sect_id
             FROM training_departmental_schedule
             LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
             LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_departmental_schedule.deparment_sect
             LEFT JOIN hrm_department ON hrm_department.dept_id= training_departmental_schedule.department`
            , [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    // GetDeptTrainingEmpList: (callback) => {
    //     pool.query(
    //         `
    //         SELECT ROW_NUMBER() OVER () as veriftn_slno,training_employee_details.slno,emp_name,training_employee_details.schedule_date,training_employee_details.training_status,
    //         training_employee_details.pretest_status,training_employee_details.posttest_status,online_mode,offline_mode,retest,training_apprvl_status,training_hod_apprvls_status,
    //         hrm_emp_master.em_id,hrm_emp_master.em_no,hrm_emp_master.em_name,training_topic.topic_slno,training_topic.training_topic_name,training_topic.hours,tnd_verification_status,
    //         training_pretest.mark as pre_mark,training_posttest.mark as post_mark,question_count
    //         FROM training_employee_details
    //         LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
    //         LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
    //         LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
    //         LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
    //         `  
    //         , [],
    //         (err, results, feilds) => {
    //             if (err) {
    //                 return callback(err)

    //             }
    //             return callback(null, results)
    //         }
    //     )
    // },

    // GetDeptTrainingEmpList: (id, callback) => {
    //     console.log(id);
    //     pool.query(
    //         `SELECT ROW_NUMBER() OVER () as dept_verifn_slno training_employee_details.slno,training_employee_details.scheduled_slno,training_employee_details.emp_name,
    //   training_employee_details.emp_dept,training_employee_details.emp_dept_sectn,training_employee_details.schedule_date,
    //   training_employee_details.topic,training_employee_details.training_status,training_employee_details.pretest_status,
    //   training_employee_details.posttest_status,training_employee_details.training_apprvl_status,
    //   training_employee_details.training_hod_apprvls_status,training_employee_details.tnd_verification_status,
    //   training_topic.topic_slno,training_topic.training_topic_name,hrm_emp_master.em_id,hrm_emp_master.em_no,hrm_emp_master.em_name,
    //   training_pretest.mark as pre_mark,training_posttest.mark as post_mark
    //   FROM training_employee_details
    //   LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
    //   LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
    //   LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
    //   LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
    //   WHERE training_employee_details.emp_dept=?`, [id],
    //         (err, results, feilds) => {
    //             if (err) {
    //                 return callback(err)

    //             }
    //             return callback(null, results)

    //         }
    //     )
    // },

    GetDeptTrainingEmpList: (data, callback) => {
        pool.query(
            `
      SELECT ROW_NUMBER() OVER () as dept_verifn_slno ,training_employee_details.slno,training_employee_details.scheduled_slno,training_employee_details.emp_name,
      training_employee_details.emp_dept,training_employee_details.emp_dept_sectn,training_employee_details.schedule_date,
      training_employee_details.topic,training_employee_details.training_status,training_employee_details.pretest_status,
      training_employee_details.posttest_status,training_employee_details.training_apprvl_status,
      training_employee_details.training_hod_apprvls_status,training_employee_details.tnd_verification_status,
      training_topic.topic_slno,training_topic.training_topic_name,hrm_emp_master.em_id,hrm_emp_master.em_no,hrm_emp_master.em_name,
      training_pretest.mark as pre_mark,training_posttest.mark as post_mark,training_topic.hours,
       hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_name,hrm_dept_section.sect_id
      FROM training_employee_details
	  LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
      LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
	  LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
	  LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
	  LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
	  LEFT JOIN hrm_department ON hrm_department.dept_id= training_employee_details.emp_dept
	  WHERE training_employee_details.emp_dept=? and training_employee_details.emp_dept_sectn=?`,
            [
                data.dept_id,
                data.sect_id,

            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },


    UpdateDeptVerification: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE training_employee_details SET 
                     tnd_verification_status=?,
                     tnd_verification_user=?,
                     edit_user=?
                     WHERE slno=?`,
                    [

                        val.tnd_verification_status,
                        val.tnd_verification_user,
                        val.edit_user,
                        val.slno
                    ],
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
    // UpdateDeptVerification: (data, callback) => {
    //     pool.query(`UPDATE training_employee_details SET 
    //     emp_name=?,
    //     tnd_verification_status=1,
    //     tnd_verification_user=?,
    //     edit_user=?
    //     WHERE slno=?`,
    //         [
    //             data.emp_ID,
    //             data.verify_user,
    //             data.edit_user,
    //             data.scheduled_slno
    //         ],
    //         (err, results, fields) => {
    //             if (err) {
    //                 return callback(err)
    //             }
    //             return callback(null, results)
    //         }
    //     )
    // },
}