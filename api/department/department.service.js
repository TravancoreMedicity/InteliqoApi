const pool = require('../../config/database');

module.exports = {
    createDept: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_department
            (dept_name,
            dept_alias,
            dept_status,
            create_user,
            dept_type,
            doctor_department)
            VALUES(?,?,?,?,?,?)`,
            [
                data.dept_name,
                data.dept_alias,
                data.dept_status,
                data.create_user,
                data.dept_type,
                data.doctor_department
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateDept: (data, callBack) => {

        pool.query(
            `UPDATE hrm_department 
                SET dept_name = ?,
                    dept_alias = ?,
                    dept_status = ?,
                    edit_user = ?,
                    dept_type=?,
                    doctor_department=?
                WHERE dept_id = ?`,
            [
                data.dept_name,
                data.dept_alias,
                data.dept_status,
                data.edit_user,
                data.dept_type,
                data.doctor_department,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteDept: (data, callBack) => {
        pool.query(
            `DELETE FROM hrm_department WHERE dept_id = ?`,
            [
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDept: (callBack) => {
        pool.query(
            `SELECT dept_id,
                dept_name,
                dept_alias,
                dept_status,
                dept_type,
                case when dept_type = 1 then 'Clinical' when  dept_type = 2 then 'Non Clinical' when  dept_type = 3 then 'Accademic' else 'Not Updated' end as 'descrp',
                if(dept_status = 1 ,'Yes','No') status,
                if(doctor_department=1,'Doctor Dept', 'General') docdept
            FROM hrm_department`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDeptById: (id, callBack) => {
        pool.query(
            `SELECT dept_id,
                dept_name,
                dept_alias,
                dept_status
            FROM hrm_department
            WHERE dept_id = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT dept_name,
            dept_alias
                FROM hrm_department
                WHERE dept_name = ?`,
            [
                data.dept_name,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT dept_name,               
            dept_id
            FROM hrm_department
            WHERE dept_name =?  AND dept_id != ?`,
            [
                data.dept_name,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}