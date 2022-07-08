const pool = require('../../config/database');
module.exports = {
    empmasterOtWage: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master
            SET emp__ot =?,
                ot_amount = ?                 
            WHERE em_dept_section=?`,
            [
                data.emp__ot,
                data.ot_amount,
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
    empmasterOtWageone: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master
            SET emp__ot =?,
                ot_amount = ?                 
            WHERE em_id=?`,
            [
                data.emp__ot,
                data.ot_amount,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    empmasterOtWageedit: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master
            SET emp__ot =?,
                ot_amount = ?                 
            WHERE em_id=?`,
            [
                data.emp__ot,
                data.ot_amount,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getOtWage: (callBack) => {
        pool.query(
            `SELECT
            em_id,
             em_name,
             dept_name,
            sect_name,
             ot_amount
             FROM hrm_emp_master
             LEFT JOIN hrm_department ON hrm_department.dept_id=hrm_emp_master.em_department
             LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
             WHERE emp__ot = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getOtWageByID: (id, callBack) => {
        pool.query(
            `SELECT
            em_id,
             em_name,
             em_department,
           em_dept_section,
             ot_amount
             FROM hrm_emp_master
             LEFT JOIN hrm_department ON hrm_department.dept_id=hrm_emp_master.em_department
             LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
             WHERE em_id = ?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getdeptsecauthri: (id, callBack) => {

        pool.query(
            `SELECT authorization_incharge,authorization_hod FROM hrm_dept_section
            WHERE sect_id = ?`,
            [
                id
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