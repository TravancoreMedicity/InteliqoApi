const pool = require('../../config/database');

module.exports = {
    GetDatewiseEmps: (data, callback) => {
        pool.query(
            `
            SELECT em_id,em_no,em_name,em_department,em_dept_section,em_designation,
            hrm_department.dept_id,hrm_department.dept_name,
            hrm_dept_section.sect_id,hrm_dept_section.sect_name,
            designation.desg_slno,designation.desg_name,
            training_master.joining_date,training_master.assign_status,training_master.slno as master_slno
            FROM hrm_emp_master
            LEFT JOIN hrm_department ON hrm_department.dept_id=hrm_emp_master.em_department
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
            LEFT JOIN training_master ON training_master.emp_no=hrm_emp_master.em_no 
            WHERE hrm_emp_master.em_id!=1 and training_master.assign_status=0 and
            training_master.joining_date between ? AND ?`,
            [
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
    ScheduleInductionTrainings: (data, callBack) => {
        pool.query(
            `INSERT INTO training_induction_schedule (
                schedule_type, schedule_topic, trainers, induction_date,create_user )
            VALUES (?,?,?,?,?)`,
            [
                data.type_slno,
                data.topic_slno,
                JSON.stringify(data.trainers),
                data.date,
                data.create_user,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    InsertInductionEmps: (data, callBack) => {
        pool.query(
            `INSERT INTO training_induction_emp_details (
                schedule_no, indct_emp_no,induct_detail_date, induct_emp_dept, induct_emp_sec, create_user)
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


    UpdateAssignStatus: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE training_master
            SET assign_status=?,
            edit_user=?
            WHERE slno=?  `,
                    [val.assign_status, val.edit_user, val.slno],
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


    GetTypeWiseTraining: (id, callback) => {
        pool.query(
            `            
            SELECT schedule_slno, schedule_type, schedule_topic, induction_date,topic_slno,training_topic_name,training_induction_schedule.trainers,
            training_type.trainingtype_slno,training_type.type_name,
             GROUP_CONCAT(em_name)  as trainers_name
             FROM training_induction_schedule
             LEFT JOIN training_induction_emp_details ON training_induction_emp_details.schedule_no=training_induction_schedule.schedule_slno
             LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
             LEFT JOIN training_type ON training_type.trainingtype_slno=training_induction_schedule.schedule_type
             LEFT JOIN hrm_emp_master ON JSON_CONTAINS(training_induction_schedule.trainers,cast(hrm_emp_master.em_id as json),'$') 
             WHERE schedule_type=?
             GROUP BY  schedule_slno `, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    ScheduleDateUpdate: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_schedule set 
            induction_date=?,
            edit_user=?
            where schedule_slno=?`,
            [
                data.schedule_date,
                data.edit_user,
                data.schedule_slno

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
            `UPDATE training_induction_schedule set 
            trainers=?,
            edit_user=?
            where schedule_slno=?`,
            [
                JSON.stringify(data.NewTrainers),
                data.edit_user,
                data.schedule_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    UpdateDate: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_schedule set 
            induction_date=?,
            edit_user=?
            where schedule_slno=?`,
            [
                data.Reschedule,
                data.edit_user,
                data.schedule_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    UpdateDateOnScheduleTbl: (data, callBack) => {
        pool.query(
            `UPDATE training_induction_emp_details set 
            induct_detail_date=?,
            edit_user=?
            where schedule_no=?`,
            [
                data.Reschedule,
                data.edit_user,
                data.schedule_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    GetTraineers: (data, callback) => {
        pool.query(
            `
           SELECT trainers as trainer ,schedule_topic as topic, GROUP_CONCAT(em_name)  as trainer_name
           FROM training_induction_schedule
           LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_induction_schedule.trainers,cast(hrm_emp_master.em_id as json),'$')
           where schedule_slno=? and schedule_type=? and schedule_topic=?`,
            [
                data.schedule_slno,
                data.trainingtype_slno,
                data.topic_slno
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetInductionCanderDetails: (callback) => {
        pool.query(
            `SELECT schedule_slno, schedule_type, schedule_topic, training_induction_schedule.trainers, induction_date,
            training_type.trainingtype_slno,training_type.type_name,topic_slno,training_topic_name,GROUP_CONCAT(em_name)  as trainer_name
            FROM training_induction_schedule
            LEFT JOIN training_type ON training_type.trainingtype_slno=training_induction_schedule.schedule_type
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
             LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_induction_schedule.trainers,cast(hrm_emp_master.em_id as json),'$')
            group by schedule_slno,schedule_type
            `, [],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },
    GetIncutCalenderEmpDetails: (data, callback) => {
        pool.query(
            `
            SELECT schedule_slno, schedule_type, schedule_topic, training_induction_schedule.trainers, induction_date,
            topic_slno,training_topic_name,indct_emp_no,E.em_name as employee_name,E.em_no as emno,
            training_type.trainingtype_slno,training_type.type_name,sect_id,sect_name
            FROM training_induction_schedule
            LEFT JOIN training_induction_emp_details ON training_induction_emp_details.schedule_no=training_induction_schedule.schedule_slno
            LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
            LEFT JOIN hrm_emp_master E  ON E.em_id=training_induction_emp_details.indct_emp_no
            LEFT JOIN training_type ON training_type.trainingtype_slno=training_induction_schedule.schedule_type
            LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
            WHERE schedule_type=? AND schedule_topic=? and induction_date=?`,
            [
                data.trainingtype_slno,
                data.topic_slno,
                data.induction_date
            ],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    GetIncutCalenderTrainers: (data, callback) => {
        pool.query(
            `
            SELECT schedule_slno, schedule_type, schedule_topic, training_induction_schedule.trainers, induction_date,
            GROUP_CONCAT(T.em_name) as trainer_name
            FROM training_induction_schedule
            LEFT JOIN hrm_emp_master T on JSON_CONTAINS(training_induction_schedule.trainers,cast(T.em_id as json),'$')
            WHERE schedule_type=? AND schedule_topic=? and induction_date=?
            group by schedule_slno`,
            [
                data.trainingtype_slno,
                data.topic_slno,
                data.induction_date
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