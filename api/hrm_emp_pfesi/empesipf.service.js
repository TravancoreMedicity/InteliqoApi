const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_pfesi (
                em_no,
                em_id,
                em_pf_status,
                em_pf_no,
                em_uan_no,
                em_esi_status,
                em_esi_no,
                em_grade,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.em_pf_status,
                data.em_pf_no,
                data.em_uan_no,
                data.em_esi_status,
                data.em_esi_no,
                data.em_grade,
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
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_pfesi
                SET em_id =?,
                    em_pf_status =?,
                    em_pf_no =?,
                    em_uan_no =?,
                    em_esi_status =?,
                    em_esi_no =?,
                    em_grade =?,
                    edit_user =?
                WHERE esi_slno = ?`,
            [
                data.em_id,
                data.em_pf_status,
                data.em_pf_no,
                data.em_uan_no,
                data.em_esi_status,
                data.em_esi_no,
                data.em_grade,
                data.edit_user,
                data.esi_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDataById: (id, callBack) => {
        pool.query(
            `SELECT 
                esi_slno,
                em_no,
                em_id,
                em_pf_status,
                em_pf_no,
                em_uan_no,
                em_esi_status,
                em_esi_no,
                em_grade
            FROM hrm_emp_pfesi
            WHERE em_no = ?`,
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
    getDataBySlno: (id, callBack) => {
        pool.query(
            `SELECT 
                esi_slno,
                em_no,
                em_id,
                em_pf_status,
                em_pf_no,
                em_uan_no,
                em_esi_status,
                em_esi_no,
                em_grade
            FROM hrm_emp_pfesi
            WHERE esi_slno = ?`,
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