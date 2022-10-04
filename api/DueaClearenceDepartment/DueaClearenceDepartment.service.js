const pool = require('../../config/database');

module.exports = {
    createDueClearenceDept: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_due_clearence_dept_master (
                dept_id,
                sect_id,
                due_dept_code,
                updated_user
            )
            VALUES (?,?,?,?)`,
            [
                data.dept_id,
                data.sect_id,
                JSON.stringify(data.due_dept_code),
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

    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT dept_id,
            sect_id     
                FROM hrm_due_clearence_dept_master
                WHERE dept_id = ?`,
            [
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

    updateDueDepartment: (data, callBack) => {
        pool.query(
            `UPDATE hrm_due_clearence_dept_master 
                SET dept_id = ?,
                sect_id =?,
                due_dept_code=?,
                updated_user=?
                WHERE due_dept_slno = ?`,
            [
                data.dept_id,
                data.sect_id,
                JSON.stringify(data.due_dept_code),
                data.updated_user,
                data.due_dept_slno
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
                due_dept_slno,
              hrm_due_clearence_dept_master.dept_id,dept_name,
               hrm_due_clearence_dept_master.sect_id,sect_name,
               due_dept_code,
               updated_user     
       FROM hrm_due_clearence_dept_master 
       left join hrm_department
       on hrm_department.dept_id=hrm_due_clearence_dept_master.dept_id
         left join hrm_dept_section
       on hrm_dept_section.sect_id=hrm_due_clearence_dept_master.sect_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDueClearenceDeptByID: (id, callBack) => {
        pool.query(
            `SELECT 
            due_dept_slno,
            dept_id,
            sect_id,
            due_dept_code,
            updated_user
            FROM hrm_due_clearence_dept_master
            WHERE due_dept_slno = ?`,
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
    GetDueClearenceDeptBydept: (data, callBack) => {
        pool.query(
            `SELECT 
            due_dept_slno,
        due_dept_code                 
       FROM hrm_due_clearence_dept_master 
       left join hrm_department
       on hrm_department.dept_id=hrm_due_clearence_dept_master.dept_id
        left join hrm_dept_section
       on hrm_dept_section.sect_id=hrm_due_clearence_dept_master.sect_id
       where hrm_due_clearence_dept_master.dept_id=?
       and hrm_due_clearence_dept_master.sect_id=?`,
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
}