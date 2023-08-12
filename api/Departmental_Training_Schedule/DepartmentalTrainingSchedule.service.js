const pool = require('../../config/database');

module.exports = {

    DepartmentalTrainingScheduleInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.departmental_training_schedule (department, designation, training_name, topic_name, schedule_time, training_time, training_date, training_count, create_user )
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.department,
                data.designation,
                data.training_name,
                data.topic_name,
                data.schedule_time,
                data.training_time,
                data.training_date,
                data.training_count,
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

    DepartmentalTrainingScheduleGet: (callback) => {
        pool.query(
            `SELECT departmental_training_schedule.SlNo, departmental_training_schedule.department, departmental_training_schedule.designation, 
            departmental_training_schedule.training_name, departmental_training_schedule.topic_name, departmental_training_schedule.schedule_time, 
            departmental_training_schedule.training_time,
            date(departmental_training_schedule.training_date) as training_date ,
            departmental_training_schedule.training_count,
            hrm_department.dept_id,hrm_department.dept_name,
            designation.desg_slno,designation.desg_name, training_name.name_slno,training_name.training_name,
            training_topic.topic_slno,training_topic.training_topic_name,
            scheduling_time.slno,scheduling_time.schedule_name
            FROM medi_hrm.departmental_training_schedule
            LEFT JOIN  hrm_department ON departmental_training_schedule.department=hrm_department.dept_id
            LEFT JOIN designation ON departmental_training_schedule.designation=designation.desg_slno
            LEFT JOIN training_name ON departmental_training_schedule.training_name=training_name.name_slno
            LEFT JOIN training_topic ON departmental_training_schedule.topic_name=training_topic.topic_slno
            LEFT JOIN scheduling_time ON departmental_training_schedule.schedule_time=scheduling_time.slno;`, [],


            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    DepartmentalTrainingScheduleUpdate: (data, callback) => {
        pool.query(`UPDATE medi_hrm.departmental_training_schedule
         SET
        department=?,
        designation=?,
        training_name=?,
        topic_name=?,
        schedule_time=?,
        training_time=?,
        training_date=?,
        training_count=?,
        edit_user=?
        WHERE SlNo=?`,
            [
                data.department,
                data.designation,
                data.training_name,
                data.topic_name,
                data.schedule_time,
                data.training_time,
                data.training_date,
                data.training_count,
                data.edit_user,
                data.SlNo
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },
    getTopicByTNameID: (id, callback) => {
        pool.query(
            `SELECT topic_slno,training_topic_name 
            FROM training_topic 
            WHERE training_name=? and topic_slno!=1`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    }
}