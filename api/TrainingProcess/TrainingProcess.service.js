const pool = require('../../config/database');

module.exports = {
    GetTrainingProcess: (callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as sn,slno, emp_name, emp_dept, emp_dept_sectn, topic, schedule_date, training_employee_details.training_status,
            emp_name,training_employee_details.pretest_status, training_employee_details.posttest_status, dept_name, sect_name,training_topic_name,em_name,posttest_permission,
            hrm_department.dept_id,em_id,sect_id,topic_slno
            FROM training_employee_details
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

            `SELECT training_departmental_schedule.slno, department, deparment_sect,schedule_year, training_employee_details.schedule_date, schedule_topics, 
             schedule_trainers,hrm_department.dept_id,dept_name,sect_id,sect_name,topic_slno,training_topic_name,
             GROUP_CONCAT(em_name)  as traineer_name
             FROM training_departmental_schedule
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
            training_employee_details.pretest_status, posttest_status,topic_slno,training_topic_name,training_employee_details.question_count,em_id,em_name,desg_slno,desg_name,hrm_department.dept_id,dept_name,sect_id,sect_name,posttest_permission
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            LEFT JOIN designation ON designation.desg_slno=training_employee_details.emp_desig
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
            WHERE emp_name=?`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },


    GetQuestionDetails: (data, callBack) => {
        pool.query(
            `SELECT q_slno, training_topics, questions, answer_a, answer_b, answer_c,
             answer_d, right_answer, training_topic_name,training_questions.upload_status, writtenStatus, handwrite_answer, marks,topic_slno,online_status,offline_status,both_status
             FROM training_questions
             LEFT JOIN  training_topic ON training_topic.topic_slno=training_questions.training_topics
             WHERE training_topic.topic_slno=?
             ORDER BY RAND() 
             LIMIT ?`,
            [
                data.topic_slno,
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

    UpdateQuestionCount: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE training_employee_details set
                     training_status=?,
                     question_count=?
                     where slno=?`,
                    [val.training_status, val.question_count, val.slno],
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
    GetDataBasedOnCount: (data, callBack) => {
        pool.query(
            `SELECT slno, department, deparment_sect,schedule_year, schedule_date, schedule_topics, schedule_trainers,question_count,hrm_department.dept_id,dept_name,sect_id,sect_name,topic_slno,training_topic_name,
             GROUP_CONCAT(em_name)  as traineer_name
             FROM training_departmental_schedule
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
    //QR CODE
    InsertPretest: (data, callBack) => {
        pool.query(
            `INSERT INTO training_pretest
            (
                emp_id,
                emp_dept,
                emp_dept_sec,
                emp_desg,
                emp_topic,
                mark,
                create_user,
                pre_dept_schedule_slno,
               pre_dept_schedule_date
            )
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.emp_id,
                data.emp_dept,
                data.emp_dept_sec,
                data.emp_desg,
                data.emp_topic,
                data.mark,
                data.create_user,
                data.scheduled_slno,
                data.schedule_date
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
            FROM training_pretest 
            WHERE emp_id=? and emp_topic=? and pre_dept_schedule_slno=?
            `, [
            data.emp_id,
            data.emp_topic,
            data.scheduled_slno
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
            `UPDATE training_employee_details set 
             pretest_status=?,
             posttest_permission=?
             WHERE slno=?`,
            [
                data.pretest_status,
                data.posttest_permission,
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
            `INSERT INTO training_posttest
            (
                emp_id,
                emp_dept,
                emp_dept_sec,
                emp_desg,
                emp_topic,
                mark,
                create_user,
                dept_schedule_slno,
                post_dept_schedule_date
            )
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.emp_id,
                data.emp_dept,
                data.emp_dept_sec,
                data.emp_desg,
                data.emp_topic,
                data.mark,
                data.create_user,
                data.scheduled_slno,
                data.schedule_date
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
            FROM training_posttest 
            WHERE emp_id=? and emp_topic=? and dept_schedule_slno=?
            `, [
            data.emp_id,
            data.emp_topic,
            data.scheduled_slno
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
             training_status=0,
             question_count=0,
             pretest_status=0,
             posttest_status=0,
             posttest_permission=0,
             online_mode=0,
             offline_mode=0,
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
    GetTrainingCompletedList: (id, callback) => {
        pool.query(
            `SELECT ROW_NUMBER() OVER () as sn, training_employee_details.slno,scheduled_slno, em_id,em_no,hrm_emp_master.em_name, emp_dept,emp_dept_sectn,topic,
            training_employee_details.schedule_date, training_employee_details.training_status, question_count,
            training_employee_details.pretest_status, posttest_status, posttest_permission,topic_slno,training_topic_name,
            hrm_dept_section.sect_id,hrm_dept_section.sect_name
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
            where training_employee_details.training_status = 1 and training_employee_details.posttest_status = 1 
            and training_employee_details.pretest_status = 1  and emp_dept=?
            `, [id],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetTodaysTrainingList: (id, callback) => {
        pool.query(
            `     
            SELECT training_departmental_schedule.slno, department, deparment_sect, schedule_year, schedule_topics,
            topic_slno,training_topic_name,training_employee_details.schedule_date
            FROM training_departmental_schedule
            LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
              LEFT JOIN training_employee_details ON training_employee_details.scheduled_slno=training_departmental_schedule.slno
            where training_employee_details.schedule_date=current_date() and department=?
            group by slno,schedule_date
            `, [id],

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
            `  SELECT slno, em_id,hrm_emp_master.em_name, topic, schedule_date, training_employee_details.training_status, question_count,
            training_employee_details.pretest_status, posttest_status, posttest_permission,topic_slno,training_topic_name,em_no
            FROM training_employee_details
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
            where topic_slno=? and schedule_date=current_date()`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    GetTrainingEmpDetailsAll: (id, callback) => {
        pool.query(
            `     
            SELECT schedule_topics,schedule_date,topic_slno,training_topic_name FROM training_departmental_schedule        
            LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics  where department=?
            `, [id],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetTrainingEmp: (id, callback) => {
        pool.query(
            `     
            SELECT ROW_NUMBER() OVER () as sn, training_employee_details.slno,scheduled_slno, emp_name,hrm_emp_master.em_id,hrm_emp_master.em_name, emp_desig, emp_dept, emp_dept_sectn, topic,
            training_topic.topic_slno,training_topic.training_topic_name,training_employee_details.schedule_date, 
            training_employee_details.training_status, training_employee_details.question_count, training_employee_details.pretest_status,
            training_employee_details.posttest_status, training_employee_details.posttest_permission,training_departmental_schedule.slno as shSlno,
            training_departmental_schedule.schedule_year,training_departmental_schedule.schedule_trainers,training_departmental_schedule.schedule_remark,
            hrm_emp_master.em_no
            FROM training_employee_details
            left join hrm_emp_master on hrm_emp_master.em_id=training_employee_details.emp_name
            left join training_topic on training_topic.topic_slno=training_employee_details.topic
            left join training_departmental_schedule on training_departmental_schedule.slno=training_employee_details.scheduled_slno
            where training_employee_details.pretest_status = 0 and  training_employee_details.posttest_status = 0 and emp_dept=?
            `, [id],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    //     SELECT * FROM training_dept_emp_reschedule;
    // dept_reschedule_slno, dept_schedule_tbl_slno, dept_reschdl_em_id, dept_reschdl_depart, dept_reshdl_dept_sec, dept_reshdl_topic, 
    // dept_reschdl_status, dept_reschdl_date, create_user, edit_user, create_date, update_date;


    checkTopicExistORNot: (data, callback) => {
        pool.query(
            `     
            SELECT dept_reschdl_depart,dept_reshdl_dept_sec 
            FROM training_dept_emp_reschedule 
            WHERE dept_reshdl_topic=? and dept_reschdl_date=?
            `, [
            data.topic_slno,
            data.schedule_date
        ],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    InsertReScheduleTable: (data, callBack) => {
        pool.query(
            `INSERT INTO training_dept_emp_reschedule ( dept_schedule_tbl_slno, dept_reschdl_em_id, dept_reschdl_depart, dept_reshdl_dept_sec, dept_reshdl_topic,dept_reschdl_status, dept_reschdl_date, create_user )
             VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.slno,
                data.employeeno,
                data.emp_dept,
                data.emp_dept_sectn,
                data.topic_slno,
                data.status,
                data.schedule_date,
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


    AllotToPostTest: (callback) => {
        pool.query(
            `     
            SELECT ROW_NUMBER() OVER () as sn, training_employee_details.slno,scheduled_slno, em_id,hrm_emp_master.em_name, emp_dept,emp_dept_sectn,topic,
            training_employee_details.schedule_date, training_employee_details.training_status, question_count,
                  training_employee_details.pretest_status, posttest_status, posttest_permission,topic_slno,training_topic_name,video_time,pdf_time
                  FROM training_employee_details
                  LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                  LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                  WHERE  training_employee_details.training_status=1 and training_employee_details.pretest_status=1 and training_employee_details.posttest_status=0
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetpreTestEmpListAll: (callback) => {
        pool.query(
            `     
            SELECT ROW_NUMBER() OVER () as sl,training_employee_details.slno, emp_name, emp_desig, emp_dept, emp_dept_sectn, topic,
            training_employee_details.schedule_date,training_employee_details.training_status, 
                       training_employee_details.pretest_status, posttest_status,topic_slno,training_topic_name,training_employee_details.question_count,
                       em_id,em_name,desg_slno,desg_name,hrm_department.dept_id,dept_name,sect_id,sect_name,posttest_permission
                       FROM training_employee_details
                       LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                       LEFT JOIN designation ON designation.desg_slno=training_employee_details.emp_desig
                       LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
                       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                       WHERE training_employee_details.training_status=1 
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetpostTestEmpListAll: (callback) => {
        pool.query(
            `     
            SELECT ROW_NUMBER() OVER () as sl,training_employee_details.slno, emp_name, emp_desig, emp_dept, emp_dept_sectn, topic,
            training_employee_details.schedule_date,training_employee_details.training_status, 
                       training_employee_details.pretest_status, posttest_status,topic_slno,training_topic_name,training_employee_details.question_count,
                       em_id,em_name,desg_slno,desg_name,hrm_department.dept_id,dept_name,sect_id,sect_name,posttest_permission
                       FROM training_employee_details
                       LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_details.topic
                       LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_employee_details.emp_name
                       LEFT JOIN designation ON designation.desg_slno=training_employee_details.emp_desig
                       LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_details.emp_dept
                       LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_employee_details.emp_dept_sectn
                       WHERE training_employee_details.training_status=1 and training_employee_details.pretest_status=1
                       AND training_employee_details.posttest_permission=1
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    UpdateOnlineMode: (data, callBack) => {
        pool.query(
            `UPDATE training_employee_details set 
             online_mode=?,
             offline_mode=?
             WHERE slno=?`,
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
            `UPDATE training_employee_details set 
             online_mode=?,
             offline_mode=?
             WHERE slno=?`,
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
}