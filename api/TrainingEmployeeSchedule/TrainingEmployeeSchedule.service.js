const pool = require('../../config/database');

module.exports = {

    getTopicByNameId: (id, callback) => {
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
    },


    getEmpNameById: (id, callback) => {
        pool.query(
            `SELECT em_id,em_name FROM medi_hrm.hrm_emp_master WHERE em_department=? and em_id!=1`, [id],
            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },

    TrainingEmployeeScheduleInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO medi_hrm.training_employee_schedule ( tes_dept, tes_dept_sec, tes_training_name, tes_topic, tes_date, tes_time, tes_emp_name, create_user )
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.tes_dept,
                data.tes_dept_sec,
                data.tes_training_name,
                data.tes_topic,
                data.tes_date,
                data.tes_time,
                data.tes_emp_name,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
}