const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_mast_specializtion (
                spec_desc,
                cour_slno,
                spec_status,
                create_user
            )
            VALUES (?,?,?,?)`,
            [
                data.spec_desc,
                data.cour_slno,
                data.spec_status,
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
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT spec_desc,
            cour_slno       
                FROM hrm_mast_specializtion
                WHERE spec_desc = ? AND cour_slno = ? `,
            [
                data.spec_desc,
                data.cour_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_mast_specializtion
                SET spec_desc =?,
                    cour_slno =?,
                    spec_status =?,
                    edit_user =?
                WHERE spec_slno = ?`,
            [
                data.spec_desc,
                data.cour_slno,
                data.spec_status,
                data.edit_user,
                data.spec_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT spec_desc,
                spec_slno
                FROM hrm_mast_specializtion
                WHERE spec_desc = ?  AND spec_slno != ?`,
            [
                data.spec_desc,

                data.spec_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_mast_specializtion SET  spec_status = 0 WHERE spec_slno =?`,
            [
                data.relg_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getData: (callBack) => {
        pool.query(
            `SELECT     
               spec_slno,
               spec_desc,
               hrm_mast_course.cour_desc,
            if(spec_status = 1 ,'Yes','No') spec_status
        FROM hrm_mast_specializtion
        LEFT JOIN hrm_mast_course ON hrm_mast_specializtion.cour_slno = hrm_mast_course.cour_slno`,
            [],
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
                spec_slno,
                spec_desc,
                cour_slno,
                spec_status
            FROM hrm_mast_specializtion
            WHERE spec_slno =?`,
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
    getSelect: (callBack) => {
        pool.query(
            `SELECT 
                spec_slno,
                spec_desc
            FROM hrm_mast_specializtion
            WHERE spec_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}