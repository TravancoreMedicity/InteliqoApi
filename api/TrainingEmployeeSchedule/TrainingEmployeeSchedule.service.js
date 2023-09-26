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
            `SELECT em_id,em_name FROM medi_hrm.hrm_emp_master WHERE em_dept_section=? and em_id!=1 and em_status=1`, [id],
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
            `INSERT INTO medi_hrm.training_employee_schedule (  tes_dept, tes_dept_sec, tes_training_name, tes_topic, tes_date, tes_time, tes_emp_name, create_user )
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.tes_dept,
                data.tes_dept_sec,
                data.tes_training_name,
                data.tes_topic,
                data.tes_date,
                data.tes_time,
                JSON.stringify(data.tes_emp_name),
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
    TrainingEmployeeScheduleGet: (callback) => {
        pool.query(
            `
            SELECT tes_slno, tes_dept, tes_dept_sec, tes_training_name, tes_topic, date(tes_date)as tes_date, tes_time, tes_emp_name,hrm_department.dept_id,dept_name,
            sect_id,sect_name,name_slno,training_name.training_name,topic_slno,training_topic_name,hrm_emp_master.em_id,hrm_emp_master.em_name,em_no,
            GROUP_CONCAT(em_name) as em_name
            FROM medi_hrm.training_employee_schedule
            LEFT JOIN medi_hrm.hrm_department ON training_employee_schedule.tes_dept= medi_hrm.hrm_department.dept_id
            LEFT JOIN hrm_dept_section ON training_employee_schedule.tes_dept_sec=hrm_dept_section.sect_id
            LEFT JOIN training_name ON training_employee_schedule.tes_training_name=training_name.name_slno
            LEFT JOIN training_topic ON training_employee_schedule.tes_topic=training_topic.topic_slno
            LEFT JOIN hrm_emp_master on JSON_CONTAINS(training_employee_schedule.tes_emp_name,cast(hrm_emp_master.em_id as json),'$')
            group by tes_slno`, [],


            (err, results, feilds) => {
                if (err) {
                    return callback(err)

                }
                return callback(null, results)

            }
        )
    },
    TrainingEmployeeScheduleUpdate: (data, callback) => {
        pool.query(`UPDATE medi_hrm.training_employee_schedule SET
        tes_dept=?,
        tes_dept_sec=?,
        tes_training_name=?,
        tes_topic=?,
        tes_date=?,
        tes_time=?,
        tes_emp_name=?,
        edit_user=?
        WHERE tes_slno=?`,
            [
                data.tes_dept,
                data.tes_dept_sec,
                data.tes_training_name,
                data.tes_topic,
                data.tes_date,
                data.tes_time,
                JSON.stringify(data.tes_emp_name),
                data.edit_user,
                data.tes_slno
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
