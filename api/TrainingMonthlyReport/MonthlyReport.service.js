const pool = require('../../config/database');

module.exports = {
    GetMonthlyReportByMonth: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as calender_slno, training_employee_details.slno, emp_name, emp_desig, training_employee_details.emp_dept, emp_dept_sectn, topic,
            training_retest_emp_details.retest_date,training_employee_details.schedule_date,
            training_employee_details.training_status,training_employee_details.online_mode,training_employee_details.offline_mode,
            training_employee_details.pretest_status, training_employee_details.posttest_status,
            training_topic.topic_slno,training_topic.training_topic_name,hrm_emp_master.em_name,online_status,offline_status,
            training_posttest.mark as posttest_mark,training_retest_emp_details.retest_mark,training_retest_emp_details.retest_status,
            em_id,training_pretest.mark as Pretest_mark,training_employee_details.online_mode,training_employee_details.offline_mode,
            hrm_department.dept_id,hrm_department.dept_name,sect_id,sect_name
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
            LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
            LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
            WHERE  training_employee_details.emp_dept=? and training_employee_details.emp_dept_sectn=?
            and training_employee_details.topic=? and training_employee_details.schedule_date between  ? AND ?`,
            [
                data.dept,
                data.deptSect,
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

    GetTrainingList: (data, callback) => {
        pool.query(
            `SELECT training_departmental_schedule.slno, department, deparment_sect, training_departmental_schedule.schedule_date, schedule_topics, 
            schedule_trainers,em_name,topic_slno,training_topic_name
            FROM training_departmental_schedule
            LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_departmental_schedule.schedule_trainers,
            cast(hrm_emp_master.em_id as json),'$')
            LEFT JOIN training_topic ON training_topic.topic_slno = training_departmental_schedule.schedule_topics
            WHERE department=? and deparment_sect=?  and schedule_date between ? AND ?`,
            [
                data.dept,
                data.deptSect,
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
    GetscheduledDetails: (data, callback) => {
        pool.query(
            `
            SELECT emp_name,emp_dept,emp_dept_sectn,schedule_date,topic,
            training_status,pretest_status,posttest_status,em_name,candidate_em_no,retest_status
             FROM training_employee_details
             LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
             LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
             WHERE department=? and deparment_sect=?  and schedule_date between ? AND ?`,
            [
                data.dept,
                data.deptSect,
                data.getmonth
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    GetDepartmentNames: (callback) => {
        pool.query(
            `SELECT * FROM medi_hrm.hrm_department`, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    GetDepartmentSecNames: (data, callBack) => {
        pool.query(
            `SELECT slno, scheduled_slno, emp_name, emp_desig, emp_dept, emp_dept_sectn, topic, schedule_date, 
            training_employee_details.training_status, question_count,training_employee_details.pretest_status,
            training_employee_details.posttest_status,  online_mode, offline_mode,em_id,em_name,
            topic_slno,training_topic_name
            FROM medi_hrm.training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            where training_employee_details.emp_dept IN (?) and training_employee_details.emp_dept_sectn IN (?)`,
            [
                data.dept_id,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetDepartmentalTrainingTopics: (data, callBack) => {
        pool.query(
            `SELECT training_employee_details.slno, scheduled_slno, emp_name, emp_desig, training_employee_details.emp_dept, emp_dept_sectn, topic, schedule_date, 
            training_employee_details.training_status, question_count,training_employee_details.pretest_status,
            training_employee_details.posttest_status,  online_mode, offline_mode,em_id,em_name,
            topic_slno,training_topic_name,
            training_pretest.mark as preemark,training_posttest.mark as postmark,
            retest_status,retest_mark
            FROM medi_hrm.training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
            LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
            LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
            where training_employee_details.emp_dept IN (?) and training_employee_details.emp_dept_sectn IN(?) 
            and training_employee_details.topic IN(?)  and schedule_date between ? AND ?
            `,

            [
                data.dept_id,
                data.sect_id,
                data.topic_slno,
                data.firsdate,
                data.secondadte
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    //department by id
    GetDepartmentNamesById: (data, callBack) => {
        pool.query(
            `SELECT training_employee_details.slno, scheduled_slno, emp_name, emp_desig, training_employee_details.emp_dept, emp_dept_sectn, topic, schedule_date, 
            training_employee_details.training_status, question_count,training_employee_details.pretest_status,
            training_employee_details.posttest_status,  online_mode, offline_mode,em_id,em_name,
            topic_slno,training_topic_name,
            training_pretest.mark as preemark,training_posttest.mark as postmark,
            retest_status,retest_mark
            FROM medi_hrm.training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
            LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
            LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
            where training_employee_details.emp_dept IN (?)   ` ,
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
    GetDepartmentSecNamesById: (data, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.hrm_dept_section`,
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
    getDeptTopicsById: (data, callBack) => {
        pool.query(
            ` SELECT * FROM medi_hrm.training_topic`,
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
    getDeptTopicsByDepartId: (id, callback) => {
        pool.query(
            `SELECT topic_slno,training_topic_name ,training_dept FROM medi_hrm.training_topic
            where training_topic.training_dept=?`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    getAllotedTrainingEmpReports: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as calender_slno, training_employee_details.slno, emp_name, emp_desig, training_employee_details.emp_dept, emp_dept_sectn, topic,
            training_employee_details.training_status,
                       schedule_date, training_employee_details.pretest_status, training_employee_details.posttest_status,
                       training_topic.topic_slno,training_topic.training_topic_name,hrm_emp_master.em_name,online_status,offline_status,
                       training_posttest.mark as posttest_mark,training_retest_emp_details.retest_mark,training_retest_emp_details.retest_status,
                       em_id,training_pretest.mark as Pretest_mark,training_employee_details.online_mode,training_employee_details.offline_mode,
                       hrm_department.dept_id,hrm_department.dept_name,sect_id,sect_name
                       FROM training_employee_details
                       LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                       LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
                       LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
                       LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
                       LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
                       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                       WHERE  training_employee_details.emp_dept=? and training_employee_details.emp_dept_sectn=?
                       and training_employee_details.topic=? and schedule_date between ? AND ?`,
            [
                data.dept,
                data.deptSect,
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
    getTrainingCompletionEmpReports: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as calender_slno, training_employee_details.slno, emp_name, emp_desig, training_employee_details.emp_dept, emp_dept_sectn, topic,
            training_employee_details.training_status,
                       schedule_date, training_employee_details.pretest_status, training_employee_details.posttest_status,
                       training_topic.topic_slno,training_topic.training_topic_name,hrm_emp_master.em_name,online_status,offline_status,
                       training_posttest.mark as posttest_mark,training_retest_emp_details.retest_mark,training_retest_emp_details.retest_status,
                       em_id,training_pretest.mark as Pretest_mark,training_employee_details.online_mode,training_employee_details.offline_mode,
                       hrm_department.dept_id,hrm_department.dept_name,sect_id,sect_name
                       FROM training_employee_details
                       LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                       LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
                       LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
                       LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
                       LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
                       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                       WHERE  training_employee_details.emp_dept=? and training_employee_details.emp_dept_sectn=?
                       and training_employee_details.topic=? and schedule_date between ? AND ?
                       and training_employee_details.training_status=1
                       and training_employee_details.pretest_status=1
                       and training_employee_details.posttest_status=1`,
            [
                data.dept,
                data.deptSect,
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
    getTrainingPendingEmpReports: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as calender_slno, training_employee_details.slno, emp_name, emp_desig, training_employee_details.emp_dept, emp_dept_sectn, topic,
            training_retest_emp_details.retest_date,training_employee_details.schedule_date,
                      training_employee_details.training_status,training_employee_details.online_mode,training_employee_details.offline_mode,
                             training_employee_details.pretest_status, training_employee_details.posttest_status,
                                 training_topic.topic_slno,training_topic.training_topic_name,hrm_emp_master.em_name,online_status,offline_status,
                                 training_posttest.mark as posttest_mark,training_retest_emp_details.retest_mark,training_retest_emp_details.retest_status,
                                 em_id,training_pretest.mark as Pretest_mark,training_employee_details.online_mode,training_employee_details.offline_mode,
                                 hrm_department.dept_id,hrm_department.dept_name,sect_id,sect_name
                                 FROM training_employee_details
                                 LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                                 LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                                 LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
                                 LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
                                 LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
                                 LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
                                 LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                                WHERE  training_employee_details.emp_dept=?
                       and training_employee_details.emp_dept_sectn=?
                       and training_employee_details.topic=?
                       and schedule_date between ? AND ?
                       and training_employee_details.training_status=0
                       and training_employee_details.pretest_status=0
                       and training_employee_details.posttest_status=0
                       and training_employee_details.online_mode=0
                       and training_employee_details.offline_mode=0`,
            [
                data.dept,
                data.deptSect,
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
    getTrainingRetestEmpReports: (data, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as calender_slno, training_employee_details.slno, emp_name, emp_desig, training_employee_details.emp_dept, emp_dept_sectn, topic,  training_retest_emp_details.retest_date,
            training_employee_details.training_status,training_employee_details.online_mode,training_employee_details.offline_mode,
            training_employee_details.schedule_date, training_employee_details.pretest_status, training_employee_details.posttest_status,
                       training_topic.topic_slno,training_topic.training_topic_name,hrm_emp_master.em_name,online_status,offline_status,
                       training_posttest.mark as posttest_mark,training_retest_emp_details.retest_mark,training_retest_emp_details.retest_status,
                       em_id,training_pretest.mark as Pretest_mark,training_employee_details.online_mode,training_employee_details.offline_mode,
                       hrm_department.dept_id,hrm_department.dept_name,sect_id,sect_name
                       FROM training_employee_details
                       LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                       LEFT JOIN training_posttest ON training_posttest.emp_id=training_employee_details.emp_name
                       LEFT JOIN training_pretest ON training_pretest.emp_id=training_employee_details.emp_name
                       LEFT JOIN training_retest_emp_details ON training_retest_emp_details.candidate_em_no=training_employee_details.emp_name
                       LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
                       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                       WHERE  training_employee_details.emp_dept=? and training_employee_details.emp_dept_sectn=?
                       and training_employee_details.topic=? and schedule_date between ?  AND ?
                      and training_retest_emp_details.retest_status=1`,
            [
                data.dept,
                data.deptSect,
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
}

