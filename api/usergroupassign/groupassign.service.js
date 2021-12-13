const pool = require("../../config/database");

module.exports = {

    insertGroupAssign: (data, callBack) => {

        pool.query(
            `INSERT INTO user_group_assign (user_group_slno,hrm_emp_slno)
                VALUES(?,?)`,
            [
                data.user_group_slno,
                data.hrm_emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )

    },
    getGroupAssignById: (id, callBack) => {
        pool.query(
            `SELECT user_group_slno,hrm_emp_slno FROM user_group_assign WHERE ass_slno = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results[0]);
            }
        );
    },
    updateGroupAssign: (data, callBack) => {
        pool.query(
            `update user_group_assign set user_group_slno = ?,hrm_emp_slno =? where ass_slno = ?`,
            [
                data.user_group_slno,
                data.hrm_emp_slno,
                data.ass_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteGroupAssign: (data, callBack) => {
        pool.query(
            `delete from user_group_assign where ass_slno = ?`,
            [
                data.ass_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getGroupAssign: (callBack) => {
        pool.query(
            `SELECT user_group_slno,
                    hrm_emp_slno
            FROM user_group_assign`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

}