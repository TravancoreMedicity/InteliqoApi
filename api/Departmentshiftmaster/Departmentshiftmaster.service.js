const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_department_shift_master (
                dept_id,
                sect_id,
                shft_code,
                updated_user
            )
            VALUES (?,?,?,?)`,
            [
                data.dept_id,
                data.sect_id,
                JSON.stringify(data.shft_code),
                data.updated_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_department_shift_master 
                SET dept_id = ?,
                sect_id =?,
                shft_code=?,
                updated_user=?
                WHERE dept_shift_Slno = ?`,
            [
                data.dept_id,
                data.sect_id,
                JSON.stringify(data.shft_code),
                data.updated_user,
                data.dept_shift_Slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSelect: (callBack) => {
        pool.query(
            `SELECT 
                    dept_shift_Slno,
                    hrm_department_shift_master.dept_id,dept_name,
                    hrm_department_shift_master.sect_id,sect_name,
                    shft_code,
                    updated_user     
            FROM hrm_department_shift_master 
            left join hrm_department
            on hrm_department.dept_id=hrm_department_shift_master.dept_id
                left join hrm_dept_section
            on hrm_dept_section.sect_id=hrm_department_shift_master.sect_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getdepartmentshiftMasterByID: (id, callBack) => {
        pool.query(
            `SELECT 
            dept_shift_Slno,
            dept_id,
            sect_id,
            shft_code,
            updated_user
            FROM hrm_department_shift_master
            WHERE dept_shift_Slno = ?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }

                return callBack(null, results)
            }
        )

    },
    getDepartmentShiftbyshiftid: (data, callBack) => {
        pool.query(
            `SELECT 
                dept_shift_Slno,
                shft_code                 
            FROM hrm_department_shift_master 
                left join hrm_department on hrm_department.dept_id=hrm_department_shift_master.dept_id
                left join hrm_dept_section on hrm_dept_section.sect_id=hrm_department_shift_master.sect_id
            where hrm_department_shift_master.dept_id= ?
            and hrm_department_shift_master.sect_id= ?`,
            [
                data.dept_id,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkshiftforDept: (data, callBack) => {
        pool.query(
            `select dept_id,sect_id
            from hrm_department_shift_master
            where dept_id=?
            and sect_id=?`,
            [
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
    getShiftTiming: (data, callBack) => {
        pool.query(
            `SELECT 
                shft_slno,
                shft_chkin_time,
                shft_chkout_time,
                shft_cross_day
            FROM hrm_shift_mast 
            WHERE shft_slno IN (?)`,
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
    checkshiftforSection: (data, callBack) => {
        pool.query(
            `select dept_id,sect_id
            from hrm_department_shift_master
            where  sect_id=?`,
            [
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
    getSectionShiftbyshiftid: (data, callBack) => {
        pool.query(
            `SELECT 
                dept_shift_Slno,
                shft_code                 
            FROM hrm_department_shift_master 
            left join hrm_department
            on hrm_department.dept_id=hrm_department_shift_master.dept_id
                left join hrm_dept_section
            on hrm_dept_section.sect_id=hrm_department_shift_master.sect_id
            where hrm_department_shift_master.sect_id=?`,
            [
                data.sect_id
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