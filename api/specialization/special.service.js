const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_mast_specializtion (
                spec_desc,
                cour_slno,
                spec_status,
                create_user,
                reg_mandatory
            )
            VALUES (?,?,?,?,?)`,
            [
                data.spec_desc,
                data.cour_slno,
                data.spec_status,
                data.create_user,
                data.reg_mandatory
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
                    edit_user =?,
                    reg_mandatory=?
                WHERE spec_slno = ?`,
            [
                data.spec_desc,
                data.cour_slno,
                data.spec_status,
                data.edit_user,
                data.reg_mandatory,
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
                WHERE spec_desc = ?  AND spec_slno = ? `,
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
               hrm_mast_specializtion.cour_slno,
               hrm_mast_course.cour_desc,
               spec_status,
            if(spec_status = 1 ,'Yes','No') status,
            reg_mandatory,
             if(reg_mandatory = 1 ,'Yes','No') mandatory
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
                spec_status,
                reg_mandatory
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
                spec_desc,
                reg_mandatory
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