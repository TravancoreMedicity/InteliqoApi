const pool = require('../../config/database');

module.exports = {
    GetTrainingProcess: (callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as sn,slno, emp_name, emp_dept, emp_dept_sectn, topic, schedule_date, training_employee_details.training_status,
            emp_name,training_employee_details.pretest_status, training_employee_details.posttest_status, dept_name, sect_name,training_topic_name,em_name,posttest_permission,
                        hrm_department.dept_id,em_id,sect_id,topic_slno
                        FROM medi_hrm.training_employee_details
                        left join hrm_department on hrm_department.dept_id=training_employee_details.emp_dept
                        LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                        left join hrm_dept_section on hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                        left join training_topic on training_topic.topic_slno=training_employee_details.topic
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    AttendanceMarking: (data, callBack) => {
        pool.query(
            `UPDATE training_employee_details set 
             training_status=1
             where slno=?`,
            [
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
    GetDepartmentalTrainings: (callback) => {
        pool.query(
            ` SELECT training_departmental_schedule.slno, department, deparment_sect,schedule_year, training_employee_details.schedule_date, schedule_topics, 
            schedule_trainers,question_count,hrm_department.dept_id,dept_name,sect_id,sect_name,topic_slno,training_topic_name,
             GROUP_CONCAT(em_name)  as traineer_name
             FROM medi_hrm.training_departmental_schedule
             LEFT JOIN hrm_department ON hrm_department.dept_id=training_departmental_schedule.department
             LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_departmental_schedule.deparment_sect
             LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
             LEFT JOIN hrm_emp_master ON JSON_CONTAINS(training_departmental_schedule.schedule_trainers,cast(hrm_emp_master.em_id as json),'$')
             LEFT JOIN training_employee_details ON training_employee_details.topic=training_departmental_schedule.schedule_topics
             GROUP BY slno, hrm_department.dept_id, dept_name, sect_id, sect_name, topic_slno, training_topic_name,schedule_date
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetDeptEmpNameDetails: (id, callback) => {
        pool.query(
            `SELECT em_id,em_name,desg_slno,desg_name,em_designation
             FROM hrm_emp_master 
             LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
             WHERE em_department=? and em_status=1`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    GetTopicAssignToEmp: (id, callback) => {
        pool.query(
            `             
            SELECT ROW_NUMBER() OVER () as sl,training_employee_details.slno, emp_name, emp_desig, emp_dept, emp_dept_sectn, topic, training_employee_details.schedule_date,training_employee_details.training_status, 
            training_employee_details.pretest_status, posttest_status,topic_slno,training_topic_name,question_count,em_id,em_name,desg_slno,desg_name,hrm_department.dept_id,dept_name,sect_id,sect_name,posttest_permission
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            INNER JOIN  training_departmental_schedule ON training_departmental_schedule.schedule_topics=training_employee_details.topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            LEFT JOIN designation ON designation.desg_slno=training_employee_details.emp_desig
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
            WHERE emp_name=? and training_employee_details.training_status=1 and question_count!=0`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    GetQuestionDetails: (id, callBack) => {
        const limit = parseInt(id)
        pool.query(
            `SELECT q_slno, training_topics, questions, answer_a, answer_b, answer_c,
            answer_d, right_answer, training_topic_name,upload_status, writtenStatus, handwrite_answer, marks,topic_slno,online_status,offline_status,both_status
            FROM training_questions
            LEFT JOIN  training_topic ON training_topic.topic_slno=training_questions.training_topics
            ORDER BY RAND() 
            LIMIT ? `,
            [
                limit
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    UpdateQuestionCount: (data, callBack) => {
        pool.query(
            `UPDATE training_departmental_schedule set 
             schedule_date=?,
             question_count=?
             where slno=?`,
            [
                data.schedule_date,
                data.question_count,
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
    GetDataBasedOnCount: (data, callBack) => {
        pool.query(
            `SELECT slno, department, deparment_sect,schedule_year, schedule_date, schedule_topics, schedule_trainers,question_count,hrm_department.dept_id,dept_name,sect_id,sect_name,topic_slno,training_topic_name,
             GROUP_CONCAT(em_name)  as traineer_name
             FROM medi_hrm.training_departmental_schedule
             LEFT JOIN hrm_department ON hrm_department.dept_id=training_departmental_schedule.department
             LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_departmental_schedule.deparment_sect
             LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
             LEFT JOIN hrm_emp_master ON JSON_CONTAINS(training_departmental_schedule.schedule_trainers,cast(hrm_emp_master.em_id as json),'$')
             where schedule_date=? and schedule_topics=? and question_count=?
             GROUP BY slno, hrm_department.dept_id, dept_name, sect_id, sect_name, topic_slno, training_topic_name`,
            [
                data.schedule_date,
                data.schedule_topics,
                data.question_count

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    InsertPretest: (data, callBack) => {
        pool.query(
            `INSERT INTO  medi_hrm.training_pretest
            (
                emp_id,
                emp_dept,
                emp_dept_sec,
                emp_desg,
                emp_topic,
                mark,
                create_user
            )
            VALUES (?,?,?,?,?,?,?)`,
            [
                data.emp_id,
                data.emp_dept,
                data.emp_dept_sec,
                data.emp_desg,
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

    UpdatePretestStatus: (data, callBack) => {
        pool.query(
            `UPDATE training_employee_details set 
            pretest_status=?
             WHERE slno=?`,
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

    InsertpostTest: (data, callBack) => {
        pool.query(
            `INSERT INTO  medi_hrm.training_posttest
            (
                emp_id,
                emp_dept,
                emp_dept_sec,
                emp_desg,
                emp_topic,
                mark,
                create_user
            )
            VALUES (?,?,?,?,?,?,?)`,
            [
                data.emp_id,
                data.emp_dept,
                data.emp_dept_sec,
                data.emp_desg,
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
    UpdatePosttestStatus: (data, callBack) => {
        pool.query(
            `UPDATE training_employee_details set 
            posttest_status=?
             WHERE slno=?`,
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

    UpdateTrainingDate: (data, callBack) => {
        pool.query(
            `UPDATE training_employee_details set 
             schedule_date=?,
             edit_user=?
             where slno=?`,
            [
                data.schedule_date,
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
    EmpVerification: (data, callBack) => {
        pool.query(
            `UPDATE training_employee_details set 
            posttest_permission=1
             where slno=?`,
            [
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