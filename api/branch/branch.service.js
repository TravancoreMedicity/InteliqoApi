const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_branch 
                (branch_name,
                    branch_address,
                    branch_email,
                    branch_esi,
                    branch_pf,
                    branch_status,
                    create_user
                    ) 
                VALUES (?,?,?,?,?,?,?)`,
            [
                data.branch_name,
                data.branch_address,
                data.branch_email,
                data.branch_esi,
                data.branch_pf,
                data.branch_status,
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
    updateBranch: (data, callBack) => {
        pool.query(
            `UPDATE hrm_branch 
                SET branch_name = ?,
                    branch_address = ?,
                    branch_email = ?,
                    branch_esi = ?,
                    branch_pf = ?,
                    branch_status = ?,
                    edit_user =?
                WHERE branch_slno = ?`,
            [
                data.branch_name,
                data.branch_address,
                data.branch_email,
                data.branch_esi,
                data.branch_pf,
                data.branch_status,
                data.edit_user,
                data.branch_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteBranch: (data, callBack) => {
        pool.query(
            `DELETE FROM hrm_branch WHERE BRANCH_SLNO = ?`,
            [
                data.branch_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getBranch: (callBack) => {
        pool.query(
            `SELECT 
                branch_slno,
                branch_name,
                branch_address,
                branch_email,
                branch_esi,
                branch_pf,
                if(branch_status=1,'Yes','No') status 
            FROM medi_hrm.hrm_branch `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getBranchById: (id, callback) => {
        pool.query(
            `SELECT 
                branch_slno,
                branch_name,
                branch_address,
                branch_email,
                branch_esi,
                branch_pf,
                branch_status 
            FROM hrm_branch 
            WHERE branch_slno = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    }
}