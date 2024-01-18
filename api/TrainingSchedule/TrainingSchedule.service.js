const pool = require('../../config/database');

module.exports = {

    TrainingNameGet: (callback) => {
        pool.query(
            `SELECT name_slno,training_name FROM medi_hrm.training_name`,
            [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    TrainingScheduleInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.training_schedule (schedule_department, schedule_designation, schedule_category, training_name, create_user)
            VALUES (?,?,?,?,?)`,
            [
                data.schedule_department,
                data.schedule_designation,
                data.schedule_category,
                data.training_name,
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

    TrainingScheduleGet: (callback) => {
        pool.query(
            `SELECT training_schedule.slno, training_schedule.schedule_department, training_schedule.schedule_designation, training_schedule.schedule_category, training_schedule.training_name,
            hrm_department.dept_id,hrm_department.dept_name,
            designation.desg_slno,designation.desg_name,
            training_category.cat_slno,training_category.trin_cat_name,
            training_name.name_slno,training_name.training_name
            FROM training_schedule
             LEFT JOIN  hrm_department ON training_schedule.schedule_department=hrm_department.dept_id
             LEFT JOIN designation ON training_schedule.schedule_designation=designation.desg_slno
             LEFT JOIN training_category ON training_schedule.schedule_category=training_category.cat_slno
             LEFT JOIN training_name ON training_schedule.training_name=training_name.name_slno`,
            [],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)
            }
        )
    },

    TrainingScheduleUpdate: (data, callback) => {
        pool.query(`UPDATE medi_hrm.training_schedule
         SET
         schedule_department=?,
         schedule_designation=?,
         schedule_category=?,
         training_name=?,
         edit_user=?
        WHERE slno=?`,
            [
                data.schedule_department,
                data.schedule_designation,
                data.schedule_category,
                data.training_name,
                data.edit_user,
                data.slno
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    }
}