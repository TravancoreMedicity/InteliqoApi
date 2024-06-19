const pool = require('../../config/database');

module.exports = {
    getNewJoineesBydate: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_no,em_name,em_doj, dept_name,sect_name FROM hrm_emp_master
            inner join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            where em_doj between ? and ? and doctor_status=0 and em_id not in  (select emp_id  FROM on_observation_request);`,
            [
                data.fromDate,
                data.toDate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getNewjoineesbyDept: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_no,em_name,em_doj, dept_name,sect_name FROM hrm_emp_master
            inner join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            where em_doj between ? and ? and em_department=? and em_dept_section=? and doctor_status=0 and em_id not in  (select emp_id  FROM on_observation_request);`,
            [
                data.fromDate,
                data.toDate,
                data.em_department,
                data.em_dept_section
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    punchMasterUpdate: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET duty_status = 1,
            lvereq_desc = 'OBS',
            duty_desc = 'OBS',
            lve_tble_updation_flag=1,
            leave_status=1
        WHERE duty_day=? and emp_id=?`,
            [
                data.duty_day,
                data.emp_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertLog: (data, callBack) => {
        pool.query(
            `INSERT INTO on_observation_request (
                dateofjoining,
                observation_day,
                create_user,
                emp_id
                )
            VALUES (?,?,?,?)`,
            [
                data.dateofjoining,
                data.observation_day,
                data.create_user,
                data.emp_id

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