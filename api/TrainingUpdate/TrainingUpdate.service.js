const pool = require('../../config/database');

module.exports = {

    TrainingUpdateGet: (id, callback) => {
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
            FROM departmental_training_schedule
            LEFT JOIN  hrm_department ON departmental_training_schedule.department=hrm_department.dept_id
            LEFT JOIN designation ON departmental_training_schedule.designation=designation.desg_slno
            LEFT JOIN training_name ON departmental_training_schedule.training_name=training_name.name_slno
            LEFT JOIN training_topic ON departmental_training_schedule.topic_name=training_topic.topic_slno
            LEFT JOIN scheduling_time ON departmental_training_schedule.schedule_time=scheduling_time.slno WHERE department=?`, [id],

            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    }
}