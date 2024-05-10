const pool = require('../../config/database');

module.exports = {
    TrainingAfterJoiningGet: (callback) => {
        pool.query(
            `
            SELECT training_master.slno as master_slno, emp_no, emp_id, joining_date,
            em_id,em_no,em_name,em_department,em_dept_section,hrm_emp_master.em_designation,
            hrm_department.dept_id,dept_name,
            sect_id,sect_name,
            desg_slno,desg_name,
            assign_status
            FROM training_master
            LEFT JOIN hrm_emp_master ON training_master.emp_id=hrm_emp_master.em_id
            INNER JOIN hrm_department ON hrm_emp_master.em_department=hrm_department.dept_id
            INNER JOIN hrm_dept_section ON hrm_emp_master.em_dept_section= hrm_dept_section.sect_id 
            INNER JOIN designation ON designation.desg_slno= hrm_emp_master.em_designation 
            WHERE assign_status=0 and emp_no!=1 order by slno
           `, [],


            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }

        )
    },

    TrainingNewJoineeInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO training_newjoinee_schedule (
                tns_emp_id, tns_dept, tns_dept_sec, tns_date, create_user
            )
            VALUES (?,?,?,?,?)`,
            [

                data.tns_emp_id,
                data.tns_dept,
                data.tns_dept_sec,
                data.tns_date,
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

    JoineeDetailsInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO training_newjoinee_details (
                tnd_emp_id,tnd_type,tnd_cat,tnd_name,tnd_date,create_user
            )
            values ?`,
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

    JoineeDetailsUpdate: (data, callBack) => {
        pool.query(
            `UPDATE training_master set 
            assign_status=1
            where emp_no=?`,
            [

                data.emp_no

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    ScheduleDetailsGet: (callback) => {
        pool.query(
            `  
            SELECT tnd_slno,tnd_emp_id,tns_emp_id,tns_dept,tns_dept_sec,trainingtype_slno,
            GROUP_CONCAT(type_name) as type_name,em_no,em_id,em_name,hrm_department.dept_id,
            dept_name,sect_id,sect_name,tnd_cat,cat_slno,trin_cat_name,tnd_name,name_slno,training_name,tnd_date
            FROM training_newjoinee_schedule
            LEFT JOIN training_newjoinee_details ON training_newjoinee_details.tnd_emp_id = training_newjoinee_schedule.tns_emp_id
            LEFT JOIN training_type ON training_type.trainingtype_slno = training_newjoinee_details.tnd_type
            LEFT JOIN training_category ON training_category.cat_slno = training_newjoinee_details.tnd_cat
            LEFT JOIN training_name ON training_name.name_slno = training_newjoinee_details.tnd_name
            LEFT JOIN hrm_department ON hrm_department.dept_id = training_newjoinee_schedule.tns_dept
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id = training_newjoinee_schedule.tns_dept_sec
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no = training_newjoinee_schedule.tns_emp_id
            
            GROUP BY
            tnd_slno,tnd_emp_id,tns_emp_id,tns_dept,tns_dept_sec,em_no,em_id,em_name,hrm_department.dept_id,dept_name,sect_id,sect_name,tnd_date
          `  , [],


            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }

        )
    },
    ScheduleUpdate: (data, callBack) => {
        pool.query(
            `UPDATE training_newjoinee_details set 
            tnd_date=?
            where tnd_slno=?`,
            [
                data.tnd_date,
                data.tnd_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    GetTopic: (callback) => {
        pool.query(
            `
            SELECT topic_slno,training_topic_name FROM training_topic
           `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetTrainers: (callback) => {
        pool.query(
            `
            SELECT trainer_slno,trainer_name,em_id,em_name
            FROM training_trainername
            INNER JOIN hrm_emp_master ON hrm_emp_master.em_id =training_trainername.trainer_name
           `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    ScheduleInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO training_employee_schedule (
                tes_dept, tes_dept_sec, tes_topic, tes_emp_name, tes_date, tes_remark, create_user)
            values ?`,
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

    GetScheduleDetails: (callback) => {
        pool.query(
            `  
            SELECT tes_slno, tes_dept, tes_dept_sec, tes_topic, tes_emp_name, tes_date, tes_remark ,dept_id,dept_name,desg_slno,desg_name,topic_slno,training_topic_name,
            GROUP_CONCAT(em_name)  as traineer_name
            FROM training_employee_schedule
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_employee_schedule.tes_dept
            LEFT JOIN designation ON designation.desg_slno=training_employee_schedule.tes_dept_sec
            LEFT JOIN training_topic ON training_topic.topic_slno=training_employee_schedule.tes_topic
            LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_employee_schedule.tes_emp_name,cast(hrm_emp_master.em_id as json),'$')  
            group by tes_slno
          `  , [],


            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }

        )
    },


    DepartmentalScheduleInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO training_departmental_schedule (
             department, deparment_sect, schedule_year, schedule_date, schedule_topics, schedule_trainers, schedule_remark, create_user  )
            VALUES (?,?,?,?,?,?,?,?)`,
            [

                data.department,
                data.deparment_sect,
                data.schedule_year,
                data.schedule_date,
                data.schedule_topics,
                JSON.stringify(data.schedule_trainers),
                data.schedule_remark,
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

    DepartmentalScheduleGet: (data, callBack) => {
        pool.query(
            `SELECT slno, department, deparment_sect, schedule_year, schedule_date, schedule_topics, schedule_trainers, 
            schedule_remark,hrm_department.dept_id,dept_name, topic_slno,training_topic_name,sect_id,
            GROUP_CONCAT(em_name)  as traineer_name
            FROM training_departmental_schedule
            LEFT JOIN hrm_department ON hrm_department.dept_id=training_departmental_schedule.department
            LEFT JOIN training_topic ON training_topic.topic_slno=training_departmental_schedule.schedule_topics
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =training_departmental_schedule.deparment_sect
             LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_departmental_schedule.schedule_trainers,cast(hrm_emp_master.em_id as json),'$')
             where department=? and deparment_sect=? and year(schedule_year)=?
           GROUP BY slno`,
            [
                data.department,
                data.deparment_sect,
                data.schedule_year

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    ScheduleDateUpdate: (data, callBack) => {
        pool.query(
            `UPDATE training_departmental_schedule set 
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
    ScheduleDateDetailUpdate: (data, callBack) => {
        pool.query(
            `UPDATE training_employee_details set 
            schedule_date=?,
            edit_user=?
            where scheduled_slno=?`,
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
    getDeptTopic: (id, callback) => {
        pool.query(
            ` SELECT topic_slno,training_topic_name FROM training_topic WHERE training_dept=?`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    getEmpNameBydepID: (id, callback) => {
        pool.query(
            `SELECT em_id,em_name 
            FROM hrm_emp_master 
            WHERE em_department=? and em_status=1`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    InsertEmpDetails: (data, callBack) => {
        pool.query(
            `INSERT INTO training_employee_details (
                scheduled_slno,emp_name,emp_desig, emp_dept, emp_dept_sectn,topic,schedule_date, create_user)
            values ?`,
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
    GetDeptEmpNameDetails: (id, callback) => {
        pool.query(
            `SELECT em_id,em_no,em_name,desg_slno,desg_name,em_designation
            FROM hrm_emp_master 
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            WHERE em_department=? and em_status=1 and em_id!=1`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    InsertTrainingMaster: (data, callBack) => {
        pool.query(
            `INSERT INTO training_master (
                 emp_no, emp_id, joining_date, assign_status, create_user
            )
            VALUES (?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.joining_date,
                data.assign_status,
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

    UpdateTrainers: (data, callBack) => {
        pool.query(
            `UPDATE training_departmental_schedule set 
            schedule_trainers=?,
            edit_user=?
            where slno=?`,
            [
                JSON.stringify(data.trainer),
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
    //show trainer names when selecting the trainings
    getTrainerByTopic: (id, callback) => {
        pool.query(
            `select topic_slno ,trainers ,GROUP_CONCAT(em_name)  as trainer_name
            from training_topic
            LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_topic.trainers,cast(hrm_emp_master.em_id as json),'$')
            Where topic_slno=?
            group by topic_slno`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    getScheduleDatas: (data, callback) => {
        pool.query(
            `SELECT em_id,em_no,em_name,topic,schedule_date
            FROM hrm_emp_master 
            LEFT JOIN training_employee_details ON training_employee_details.emp_name=hrm_emp_master.em_id
            WHERE em_department=? and topic=? and date(schedule_date)=?`,
            [
                data.dept,
                data.topic,
                data.date
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
