const pool = require('../../config/database');

module.exports = {
    GetDepartmentalTrainingDetails: (data, callBack) => {
        pool.query(
            `  SELECT ROW_NUMBER() OVER () as slnum,training_employee_details.slno, scheduled_slno, emp_name, emp_desig, emp_dept, emp_dept_sectn, training_departmental_schedule.schedule_date,
            hrm_emp_master.em_id,hrm_emp_master.em_no,hrm_emp_master.em_name,training_departmental_schedule.schedule_year,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,HO.em_name as hod
            FROM training_employee_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
			LEFT JOIN training_departmental_schedule ON training_departmental_schedule.slno=training_employee_details.scheduled_slno
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
            LEFT JOIN designation ON designation.desg_slno=training_employee_details.emp_desig
             left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_employee_details.emp_dept_sectn
             LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
            WHERE department=? and deparment_sect=? and hrm_authorization_assign.auth_post=1 group by hrm_emp_master.em_id
		  `,
            [
                data.dept,
                data.deptSec
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetInductionTrainingDetails: (data, callBack) => {
        pool.query(
            ` SELECT ROW_NUMBER() OVER () as Induct_slno, indct_emp_no, induct_emp_dept, induct_emp_sec,
            hrm_emp_master.em_name,hrm_emp_master.em_no,hrm_emp_master.em_id,hrm_emp_master.em_designation,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,HO.em_name as hod,hrm_authorization_assign.auth_post,training_iduct_tnd_verify_status
            FROM training_induction_emp_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_induction_emp_details.induct_emp_sec
            LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
            WHERE induct_emp_dept=? AND induct_emp_sec=? AND  hrm_authorization_assign.auth_post=1
            group by  indct_emp_no, induct_emp_dept, induct_emp_sec,
            hrm_emp_master.em_name,hrm_emp_master.em_no,hrm_emp_master.em_id,hrm_emp_master.em_designation,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,HO.em_name,hrm_authorization_assign.auth_post,training_iduct_tnd_verify_status`,
            [
                data.dept,
                data.deptSec
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetInductionTrainingEMPDetails: (data, callBack) => {
        pool.query(
            `  SELECT ROW_NUMBER() OVER () as Induct_slno, indct_emp_no, induct_emp_dept, induct_emp_sec,
            hrm_emp_master.em_name,hrm_emp_master.em_no,hrm_emp_master.em_id,hrm_emp_master.em_designation,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,HO.em_name as hod,hrm_authorization_assign.auth_post,
            training_iduct_tnd_verify_status
            FROM training_induction_emp_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_induction_emp_details.induct_emp_sec
            LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
            WHERE induct_emp_dept=? AND induct_emp_sec=? AND hrm_emp_master.em_no=? and hrm_authorization_assign.auth_post=1
            group by indct_emp_no, induct_emp_dept, induct_emp_sec,
            hrm_emp_master.em_name,hrm_emp_master.em_no,hrm_emp_master.em_id,hrm_emp_master.em_designation,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,HO.em_name,hrm_authorization_assign.auth_post,training_iduct_tnd_verify_status`,
            [
                data.dept,
                data.deptSec,
                data.Emp_ID
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    //recheck
    GetDepartmentalTrainingEMPDetails: (data, callBack) => {
        pool.query(
            ` 
            SELECT ROW_NUMBER() OVER () as slnum,training_employee_details.slno, scheduled_slno, emp_name, emp_desig, emp_dept, emp_dept_sectn, training_departmental_schedule.schedule_date,
            hrm_emp_master.em_id,hrm_emp_master.em_no,hrm_emp_master.em_name,training_departmental_schedule.schedule_year,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,HO.em_name as hod,hrm_authorization_assign.auth_post
            FROM training_employee_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            LEFT JOIN training_departmental_schedule ON training_departmental_schedule.slno=training_employee_details.scheduled_slno
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
            LEFT JOIN designation ON designation.desg_slno=training_employee_details.emp_desig
             left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_employee_details.emp_dept_sectn
             LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
            WHERE department=? and deparment_sect=? and hrm_emp_master.em_no=? and hrm_authorization_assign.auth_post=1`,
            [
                data.dept,
                data.deptSec,
                data.Emp_ID
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetDeptEmp: (id, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as slnum,training_employee_details.slno, scheduled_slno, emp_name, emp_desig, emp_dept, emp_dept_sectn, training_departmental_schedule.schedule_date,
            E.em_id,E.em_no,E.em_name,training_departmental_schedule.schedule_year,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,HO.em_name as hod,hrm_authorization_assign.auth_post
            FROM training_employee_details
            LEFT JOIN hrm_emp_master E ON E.em_id=training_employee_details.emp_name
			LEFT JOIN training_departmental_schedule ON training_departmental_schedule.slno=training_employee_details.scheduled_slno
			LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
            LEFT JOIN designation ON designation.desg_slno=training_employee_details.emp_desig
            left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_employee_details.emp_dept_sectn
             LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
            WHERE E.em_no=? and hrm_authorization_assign.auth_post=1 
            group by E.em_id `, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    GetInductEmp: (id, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as Induct_slno, indct_emp_no, induct_emp_dept, induct_emp_sec,
            hrm_emp_master.em_name,hrm_emp_master.em_no,hrm_emp_master.em_id,HO.em_name as hod,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,hrm_authorization_assign.auth_post,training_iduct_tnd_verify_status
            FROM training_induction_emp_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_induction_emp_details.induct_emp_sec
            LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
            WHERE hrm_emp_master.em_no=? and hrm_authorization_assign.auth_post=1
            group by indct_emp_no,indct_emp_no, induct_emp_dept, induct_emp_sec, hrm_emp_master.em_name,hrm_emp_master.em_no,hrm_emp_master.em_id,HO.em_name ,
            hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,training_iduct_tnd_verify_status`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    ///check
    GetAllInductEmpData: (id, callback) => {
        pool.query(
            // ` SELECT ROW_NUMBER() OVER () as int_slno, indct_emp_no, schedule_no,hrm_emp_master.em_id,hrm_emp_master.em_no,
            // training_induction_schedule.schedule_type,training_induction_schedule.schedule_topic,training_induction_schedule.trainers,
            // training_induction_schedule.induction_date,
            // training_topic.topic_slno,training_topic.training_topic_name,
            // training_induction_pretest.mark as induct_pre_mark,training_induct_posttest.mark as induct_post_mark,
            // training_induction_retest.retest_mark as induct_retest_mark,
            // training_induction_emp_details.question_count as induct_quest_count,training_induction_emp_details.training_status,
            // training_induction_emp_details.online_mode,training_induction_emp_details.offline_mode,training_induction_emp_details.retest,
            // training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status
            // FROM training_induction_emp_details
            // LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
            // LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
            // LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            // LEFT JOIN training_induction_pretest ON training_induction_pretest.emp_id=training_induction_emp_details.indct_emp_no
            // LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_id=training_induction_emp_details.indct_emp_no
            // LEFT JOIN training_induction_retest ON training_induction_retest.retest_em_no=training_induction_emp_details.indct_emp_no
            // WHERE hrm_emp_master.em_no=?
            // `, [id],



            ` SELECT ROW_NUMBER() OVER () as int_slno, indct_emp_no, schedule_no,hrm_emp_master.em_id,hrm_emp_master.em_no,
             training_induction_schedule.schedule_type,training_induction_schedule.schedule_topic,training_induction_schedule.trainers,
             training_induction_schedule.induction_date,
             training_topic.topic_slno,training_topic.training_topic_name,
             training_induction_pretest.mark as induct_pre_mark,training_induct_posttest.mark as induct_post_mark,
             training_induction_retest.retest_mark as induct_retest_mark,
             training_induction_emp_details.question_count as induct_quest_count,training_induction_emp_details.training_status,
             training_induction_emp_details.online_mode,training_induction_emp_details.offline_mode,training_induction_emp_details.retest,
             training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,
             
               hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
             designation.desg_slno,designation.desg_name,hrm_authorization_assign.auth_post
             
             FROM training_induction_emp_details
             LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
             LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
             LEFT JOIN training_induction_pretest ON training_induction_pretest.emp_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN training_induction_retest ON training_induction_retest.retest_em_no=training_induction_emp_details.indct_emp_no
             
              LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
             LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
             LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
             left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_induction_emp_details.induct_emp_sec
             LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
             
             WHERE hrm_emp_master.em_id=? and hrm_authorization_assign.auth_post=1
            `, [id],


            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    // GetAllDeptEmpData: (id, callback) => {
    //     pool.query(
    //         `SELECT ROW_NUMBER() OVER () as Dept_slno,training_employee_details.slno, scheduled_slno, emp_name, 
    //         training_departmental_schedule.schedule_date,training_departmental_schedule.schedule_trainers,
    //                    hrm_emp_master.em_id,hrm_emp_master.em_no,hrm_emp_master.em_name,training_departmental_schedule.schedule_year,
    //                    training_employee_details.question_count,training_employee_details.pretest_status,training_employee_details.posttest_status,
    //                    training_employee_details.online_mode,training_employee_details.offline_mode,training_employee_details.retest,
    //                    training_topic.topic_slno,training_topic.training_topic_name,training_pretest.mark as dept_pre_mark,training_posttest.mark as dept_post_mark,
    //                    training_retest_emp_details.retest_mark as dept_retest_mark,hours,training_employee_details.training_hod_apprvls_status,training_employee_details.training_status
    //                    FROM training_employee_details
    //                    LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
    //                    LEFT JOIN training_departmental_schedule ON training_departmental_schedule.slno=training_employee_details.scheduled_slno
    //                    LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
    //                    LEFT JOIN training_pretest ON training_pretest.pre_dept_schedule_slno=training_employee_details.scheduled_slno and training_pretest.emp_id=?
    //                    LEFT JOIN training_posttest ON training_posttest.dept_schedule_slno=training_employee_details.scheduled_slno and training_posttest.emp_id=?
    //                    LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
    //                    WHERE training_employee_details.emp_name=? group by training_topic.topic_slno
    //                   `, [id],
    //         (err, results, feilds) => {
    //             if (err) {
    //                 return callback(err)

    //             }
    //             return callback(null, results)

    //         }
    //     )
    // },

    GetAllDeptEmpData: (data, callBack) => {
        pool.query(
            `
            SELECT ROW_NUMBER() OVER () as Dept_slno,training_employee_details.slno, scheduled_slno, emp_name, 
            training_departmental_schedule.schedule_date,training_departmental_schedule.schedule_trainers,
                       hrm_emp_master.em_id,hrm_emp_master.em_no,hrm_emp_master.em_name,training_departmental_schedule.schedule_year,
                       training_employee_details.question_count,training_employee_details.pretest_status,training_employee_details.posttest_status,
                       training_employee_details.online_mode,training_employee_details.offline_mode,training_employee_details.retest,
                       training_topic.topic_slno,training_topic.training_topic_name,training_pretest.mark as dept_pre_mark,training_posttest.mark as dept_post_mark,
                       training_retest_emp_details.retest_mark as dept_retest_mark,hours,training_employee_details.training_hod_apprvls_status,training_employee_details.training_status
                       FROM training_employee_details
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                       LEFT JOIN training_departmental_schedule ON training_departmental_schedule.slno=training_employee_details.scheduled_slno
                       LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                       LEFT JOIN training_pretest ON training_pretest.pre_dept_schedule_slno=training_employee_details.scheduled_slno and training_pretest.emp_id=?
                       LEFT JOIN training_posttest ON training_posttest.dept_schedule_slno=training_employee_details.scheduled_slno and training_posttest.emp_id=?
                       LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
                       WHERE training_employee_details.emp_name=? group by training_topic.topic_slno
           `,
            [
                data.preId,
                data.postId,
                data.emid
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetTrainers: (data, callBack) => {
        pool.query(
            `
            select GROUP_CONCAT(em_name) as emname
            from hrm_emp_master
            where em_id in(?)
           `,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetInductTrainers: (data, callBack) => {
        pool.query(
            `
            select GROUP_CONCAT(em_name) as emname
            from hrm_emp_master
            where em_id in(?)
           `,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetTrainerApprvlsData: (id, callback) => {
        const EmID = id.toString()
        pool.query(
            `
            SELECT ROW_NUMBER() OVER () as Tr_Apprvl_slno, topic_slno, training_topic_name, training_name, trainers,scheduled_slno,
            training_employee_details.slno as detail_slno,
                       training_employee_details.pretest_status,training_employee_details.posttest_status,training_employee_details.emp_name,
                       hrm_emp_master.em_id as employeeId, hrm_emp_master.em_no, hrm_emp_master.em_name,training_employee_details.schedule_date,
                       training_employee_details.training_apprvl_status,training_departmental_schedule.schedule_trainers,
                       training_employee_details.training_apprvl_user,training_employee_details.training_apprvl_date
                       FROM training_topic
                       LEFT JOIN training_departmental_schedule ON training_departmental_schedule.schedule_topics=training_topic.topic_slno
                       LEFT JOIN training_employee_details ON training_employee_details.scheduled_slno=training_departmental_schedule.slno
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                       WHERE JSON_CONTAINS(training_departmental_schedule.schedule_trainers,?,'$') AND  training_employee_details.pretest_status=1 AND training_employee_details.posttest_status=1 
                      `, [EmID],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    TrainerVerification: (data, callBack) => {
        pool.query(
            `UPDATE training_employee_details SET 
            training_apprvl_status=?,
            training_apprvl_user=?,
            training_apprvl_date=?
            WHERE topic=? AND slno=? AND emp_name=?`,
            [
                data.training_apprvl_status,
                data.training_apprvl_user,
                data.training_apprvl_date,
                data.topic_slno,
                data.detail_slno,
                data.employeeId,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // GetTrainerApprvlsInductData: (id, callback) => {
    //     const EmID = id.toString()
    //     pool.query(
    //         `
    //         SELECT ROW_NUMBER() OVER () as Tr_Apprvl_slno, topic_slno, training_topic_name, training_name, training_topic.trainers,training_induction_emp_details.schedule_no as scheduled_slno,training_induction_emp_details.induction_slno,
    //         training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,training_induction_emp_details.indct_emp_no,
    //         hrm_emp_master.em_id as employeeId, hrm_emp_master.em_no as emno, hrm_emp_master.em_name,training_induction_schedule.induction_date,
    //         training_induction_emp_details.trainer_induct_apprvl_status,training_induction_emp_details.trainer_induct_apprvl_user,training_induction_emp_details.trainer_induct_apprvl_date,
    //         training_induction_schedule.trainers
    //         FROM training_topic
    //         LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_topic=training_topic.topic_slno
    //         LEFT JOIN training_induction_emp_details ON training_induction_emp_details.schedule_no=training_induction_schedule.schedule_slno
    //         LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
    //         WHERE JSON_CONTAINS(training_induction_schedule.trainers,?,'$') AND  training_induction_emp_details.pretest_status=1 AND training_induction_emp_details.posttest_status=1 
    //       `, [EmID],
    //         (err, results, feilds) => {
    //             if (err) {
    //                 return callback(err)

    //             }
    //             return callback(null, results)

    //         }
    //     )
    // },


    //just view
    GetTrainerApprvlsInductData: (id, callback) => {
        const EmID = id.toString()
        pool.query(
            `
            SELECT ROW_NUMBER() OVER () as Tr_Apprvl_slno, topic_slno, training_topic_name, training_name, training_topic.trainers,training_induction_emp_details.schedule_no as scheduled_slno,training_induction_emp_details.induction_slno,
            training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,training_induction_emp_details.indct_emp_no,
            hrm_emp_master.em_id as employeeId, hrm_emp_master.em_no as emno, hrm_emp_master.em_name,training_induction_schedule.induction_date,
            training_induction_emp_details.trainer_induct_apprvl_status,training_induction_emp_details.trainer_induct_apprvl_user,training_induction_emp_details.trainer_induct_apprvl_date,
            training_induction_schedule.trainers,training_iduct_tnd_verify_status
            FROM training_topic
            LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_topic=training_topic.topic_slno
            LEFT JOIN training_induction_emp_details ON training_induction_emp_details.schedule_no=training_induction_schedule.schedule_slno
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
            WHERE JSON_CONTAINS(training_induction_schedule.trainers,?,'$');
          `, [EmID],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    TrainerInductVerification: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_emp_details SET 
            trainer_induct_apprvl_status=?,
            trainer_induct_apprvl_user=?,
            trainer_induct_apprvl_date=?
            WHERE  induction_slno=? AND indct_emp_no=?`,
            [
                data.training_apprvl_status,
                data.training_apprvl_user,
                data.training_apprvl_date,
                data.induction_slno,
                data.employeeId,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //Hod Approvals

    GetHodDeptApprvlsData: (id, callback) => {
        const EmID = id.toString()
        pool.query(
            `
            SELECT ROW_NUMBER() OVER () as Tr_Apprvl_slno, training_employee_details.slno,emp_name,emp_dept,emp_dept_sectn,emp_desig,topic,training_employee_details.schedule_date,
            training_employee_details.pretest_status,training_employee_details.posttest_status,
            training_apprvl_status,training_hod_apprvls_status,training_hod_apprvls_user,training_hod_apprvls_date,
            E.em_name,training_topic.topic_slno, E.em_no,E.em_id as EmployeeId,
            training_topic.training_topic_name
            FROM training_employee_details
            LEFT JOIN hrm_emp_master E ON E.em_id=training_employee_details.emp_name
                   LEFT JOIN training_departmental_schedule ON training_departmental_schedule.slno=training_employee_details.scheduled_slno
                   LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
                   LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                   LEFT JOIN designation ON designation.desg_slno=training_employee_details.emp_desig
                   left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_employee_details.emp_dept_sectn
                    LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
                    LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                    where HO.em_id=? AND  training_employee_details.pretest_status=1 AND training_employee_details.posttest_status=1 
                   AND training_employee_details.training_apprvl_status=1
                   `, [EmID],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    HodDeptVerification: (data, callBack) => {
        pool.query(
            `
            UPDATE training_employee_details SET 
                        training_hod_apprvls_status=?,
                        training_hod_apprvls_user=?,
                        training_hod_apprvls_date=?
                        WHERE topic=? AND slno=? AND emp_name=?`,
            [
                data.training_hod_apprvls_status,
                data.training_hod_apprvls_user,
                data.training_hod_apprvls_date,
                data.topic_slno,
                data.slno,
                data.EmployeeId,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //induct hod approvals with respect to trainer approvals
    // GetHodInductApprvlsData: (id, callback) => {
    //     const EmID = id.toString()
    //     pool.query(
    //         `
    //         SELECT ROW_NUMBER() OVER () as Tr_Apprvl_slno, induction_slno,schedule_no,indct_emp_no,induct_emp_dept,induct_emp_sec,training_induction_emp_details.pretest_status,
    //         training_induction_emp_details.posttest_status,training_induction_schedule.schedule_topic,EM.em_id as EmployeeID ,EM.em_name,EM.em_no,
    //         trainer_induct_apprvl_status,training_induct_hod_aprvl_status,training_induct_hod_apprvls_user,training_induct_hod_apprvls_date,
    //         training_topic.topic_slno,training_topic.training_topic_name,training_induction_schedule.induction_date
    //         FROM training_induction_emp_details
    //         LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
    //         LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
    //         LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
    //         left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_induction_emp_details.induct_emp_sec
    //         LEFT JOIN hrm_emp_master EM ON EM.em_id=training_induction_emp_details.indct_emp_no
    //         LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
    //         LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
    //         where HO.em_id=? AND  training_induction_emp_details.pretest_status=1 AND training_induction_emp_details.posttest_status=1 
    //         AND training_induction_emp_details.trainer_induct_apprvl_status=1 

    //         `, [EmID],
    //         (err, results, feilds) => {
    //             if (err) {
    //                 return callback(err)

    //             }
    //             return callback(null, results)

    //         }
    //     )
    // },


    //induct hod view without respect to trainer approvals
    GetHodInductApprvlsData: (id, callback) => {
        const EmID = id.toString()
        pool.query(
            `
            SELECT ROW_NUMBER() OVER () as Tr_Apprvl_slno, induction_slno,schedule_no,indct_emp_no,induct_emp_dept,induct_emp_sec,training_induction_emp_details.pretest_status,
            training_induction_emp_details.posttest_status,training_induction_schedule.schedule_topic,EM.em_id as EmployeeID ,EM.em_name,EM.em_no,
            trainer_induct_apprvl_status,training_induct_hod_aprvl_status,training_induct_hod_apprvls_user,training_induct_hod_apprvls_date,
            training_topic.topic_slno,training_topic.training_topic_name,training_induction_schedule.induction_date,training_iduct_tnd_verify_status
            FROM training_induction_emp_details
            LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
            left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_induction_emp_details.induct_emp_sec
            LEFT JOIN hrm_emp_master EM ON EM.em_id=training_induction_emp_details.indct_emp_no
            LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            where HO.em_id=? 
             
            `, [EmID],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    HODInductVerification: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_emp_details SET 
            training_induct_hod_aprvl_status=?,
            training_induct_hod_apprvls_user=?,
            training_induct_hod_apprvls_date=?
            WHERE induction_slno=? AND indct_emp_no=?`,
            [
                data.training_induct_hod_aprvl_status,
                data.training_induct_hod_apprvls_user,
                data.training_induct_hod_apprvls_date,
                data.induction_slno,
                data.EmployeeID
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetDeptTrainers: (id, callback) => {
        const EmID = id.toString()
        pool.query(
            `
            SELECT schedule_topics,GROUP_CONCAT(em_name)  as trainer_name,training_departmental_schedule.schedule_date,
            training_employee_details.emp_name
                     FROM training_departmental_schedule
                     Left join training_employee_details on training_employee_details.scheduled_slno=training_departmental_schedule.slno
                     LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_departmental_schedule.schedule_trainers,cast(hrm_emp_master.em_id as json),'$')
                     where   training_employee_details.emp_name= ?
                     group by training_departmental_schedule.slno `, [EmID],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    GetHODdetails: (id, callback) => {
        const EmID = id.toString()
        pool.query(
            `
            select emp_id from hrm_authorization_assign
            where dept_section=(select em_dept_section from hrm_emp_master where em_id=?) and auth_post=1 `, [EmID],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    GetInductTrainersDetails: (id, callback) => {
        const EmID = id.toString()
        pool.query(
            `
            SELECT schedule_topic,induction_date,training_induction_emp_details.indct_emp_no,GROUP_CONCAT(em_name)  as trainer_name
            FROM training_induction_schedule
            Left join training_induction_emp_details on training_induction_emp_details.schedule_no=training_induction_schedule.schedule_slno             
            LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_induction_schedule.trainers,cast(hrm_emp_master.em_id as json),'$')
            where training_induction_emp_details.indct_emp_no= ?
            group by training_induction_schedule.schedule_slno `, [EmID],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    //edited left join with topic not id(pre-post)
    GetAllPdfInductEmpData: (id, callback) => {
        pool.query(
            ` SELECT ROW_NUMBER() OVER () as Induct_slno,training_induction_emp_details.induction_slno, schedule_no, indct_emp_no, 
            training_induction_schedule.induction_date,training_induction_schedule.trainers,training_induction_schedule.schedule_topic,
             hrm_emp_master.em_id,hrm_emp_master.em_no,hrm_emp_master.em_name,training_induction_emp_details.question_count,
              training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,
            training_induction_emp_details.online_mode,training_induction_emp_details.offline_mode,training_induction_emp_details.retest,
            training_topic.topic_slno,training_topic.training_topic_name,training_induction_pretest.mark as induct_pre_mark,training_induct_posttest.mark as induct_post_mark,
                     training_induction_retest.retest_mark as induct_retest_mark, training_topic.hours,training_induction_emp_details.training_induct_hod_aprvl_status,
                       training_induction_emp_details.training_status,training_iduct_tnd_verify_status
                       FROM training_induction_emp_details
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
                       LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
                       LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
                       LEFT JOIN training_induction_pretest ON training_induction_pretest.emp_topic=training_induction_schedule.schedule_topic
                       LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_topic=training_induction_schedule.schedule_topic
                       LEFT JOIN training_induction_retest ON training_induction_retest.retest_em_no=training_induction_emp_details.indct_emp_no
                       WHERE training_induction_emp_details.indct_emp_no=? `, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
}


