const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO module_group_user_rights (
                emp_slno,
                mdgrp_slno,
                user_grp_slno,
                status
            )
            VALUES (?,?,?,?)`,
            [
                data.emp_slno,
                data.mdgrp_slno,
                data.user_grp_slno,
                data.mdlstatus,
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
            `UPDATE module_group_user_rights
                SET emp_slno  = ?,
                    mdgrp_slno = ?,
                    user_grp_slno = ?,
                    status = ?
                WHERE mdrte_slno =?`,
            [
                data.emp_slno,
                data.mdgrp_slno,
                data.user_grp_slno,
                data.mdlstatus,
                data.mdrte_slno
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
            `SELECT mdrte_slno
                FROM module_group_user_rights 
                WHERE emp_slno = ?`,
            [
                data.emp_slno
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
            `SELECT mdrte_slno
                FROM module_group_user_rights 
                WHERE emp_slno = ? AND mdrte_slno != ?`,
            [
                data.emp_slno,
                data.mdrte_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUserModuleRightByID: (id, callBack) => {
        pool.query(
            `SELECT 
            mdrte_slno,
            emp_slno,
            mdgrp_slno,
            user_grp_slno,
            em_dept_section,
            status
        FROM module_group_user_rights
        left join hrm_emp_master on hrm_emp_master.em_id=module_group_user_rights.emp_slno
        WHERE mdrte_slno =? `,
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
    getuserModuleRights: (callBack) => {
        pool.query(
            `SELECT 
            mdrte_slno,
            emp_slno,
            hrm_emp_master.em_no as 'em_no',
            module_group_user_rights.mdgrp_slno,
            module_group_user_rights.user_grp_slno,
            hrm_emp_master.em_name,
            hrm_emp_master.em_department,
            hrm_emp_master.em_dept_section,
            module_group_mast.module_group_name,
            user_group_mast.user_group_name,
            status,
            IF(status = 1, 'Active', 'Inactive') showstatus
        FROM module_group_user_rights
        LEFT JOIN  hrm_emp_master ON hrm_emp_master.em_id = module_group_user_rights.emp_slno
        LEFT JOIN module_group_mast ON module_group_mast.mdgrp_slno = module_group_user_rights.mdgrp_slno
        LEFT JOIN 
            user_group_mast ON user_group_mast.user_grp_slno = module_group_user_rights.user_grp_slno`,
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