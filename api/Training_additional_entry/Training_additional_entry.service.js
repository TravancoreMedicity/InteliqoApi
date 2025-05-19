const pool = require('../../config/database');

module.exports = {
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
    InsertTrainings: (data, callBack) => {
        pool.query(
            `INSERT INTO training_departmental_schedule (
             department, deparment_sect, schedule_year, schedule_date, schedule_topics, schedule_trainers, schedule_remark, create_user  )
            VALUES ?`,
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

    InsertToDetailTbl: (data, callBack) => {
        pool.query(
            `INSERT INTO training_employee_details (
             scheduled_slno, emp_name, emp_desig,emp_dept, emp_dept_sectn,topic,schedule_date,training_status, question_count, pretest_status, posttest_status, posttest_permission, online_mode, offline_mode,create_user )
            VALUES ?`,
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

    InsertPretest: (data, callBack) => {
        pool.query(
            `INSERT INTO training_pretest (
             emp_id, emp_dept, emp_dept_sec, emp_desg, emp_topic, mark, create_user, pre_dept_schedule_slno, pre_dept_schedule_date)
            VALUES ?`,
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

    InsertPosttest: (data, callBack) => {
        pool.query(
            `INSERT INTO training_posttest (
             emp_id, emp_dept, emp_dept_sec, emp_desg, emp_topic, mark,create_user,dept_schedule_slno, post_dept_schedule_date )
            VALUES ?`,
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

}
