const pool = require('../../config/database');

module.exports = {
    TrainingAfterJoiningGet: (callback) => {
        pool.query(
            `
            SELECT training_master.slno, emp_no, emp_id, joining_date,
            em_id,em_no,em_name,em_department,em_dept_section,
            hrm_department.dept_id,dept_name,
            sect_id,sect_name,
            assign_status
            FROM training_master
            LEFT JOIN hrm_emp_master ON training_master.emp_id=hrm_emp_master.em_id
            INNER JOIN hrm_department ON hrm_emp_master.em_department=hrm_department.dept_id
            INNER JOIN hrm_dept_section ON hrm_emp_master.em_dept_section= hrm_dept_section.sect_id 
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

    //tns_slno, tns_emp_id, tns_dept, tns_dept_sec, tns_type, tns_date, create_user, edit_user, create_date, update_date
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
    // JoineeDetailsGet: (callback) => {

    //     pool.query(
    //         `
    //         SELECT tns_slno, tns_emp_id, tns_dept, tns_dept_sec,tns_date FROM medi_hrm.training_newjoinee_schedule
    //        `, [],


    //         (err, results, feilds) => {
    //             if (err) {
    //                 return callback(err)

    //             }
    //             return callback(null, results)

    //         }

    //     )
    // },


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
            FROM medi_hrm.training_newjoinee_schedule
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
            SELECT topic_slno,training_topic_name FROM medi_hrm.training_topic
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
            FROM medi_hrm.training_trainername
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
            SELECT tes_slno, tes_dept, tes_dept_sec, tes_topic, tes_emp_name, tes_date, tes_remark ,dept_id,dept_name,desg_slno,desg_name,topic_slno,training_topic_name ,
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
}
