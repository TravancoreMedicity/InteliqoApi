const pool = require("../../config/database");

module.exports = {

    insertuserGroup: (data, callBack) => {
        pool.query(
            `INSERT INTO user_group_mast (
                    user_group_name,
                    user_group_status
                )
                VALUES(?,?)`,
            [
                data.user_group_name,
                data.user_group_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    updateUserGroup: (data, callBack) => {
        pool.query(
            `UPDATE user_group_mast
                SET user_group_name =?,
                    user_group_status =?
                WHERE user_grp_slno =? `,
            [
                data.user_group_name,
                data.user_group_status,
                data.user_grp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUserGroup: (data, callBack) => {
        pool.query(
            `UPDATE user_group_mast SET user_group_status = 0 WHERE user_grp_slno = ?`,
            [
                data.user_grp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUserGroups: (callBack) => {
        pool.query(
            `SELECT 
                    user_grp_slno,
                    user_group_name,
                    user_group_status,
                    if(user_group_status = 1,'Active','Inactive') grp_status
            FROM user_group_mast`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getGroupById: (id, callBack) => {
        pool.query(
            `SELECT 
                    user_grp_slno,
                    user_group_name,
                    user_group_status
            FROM user_group_mast
            WHERE user_grp_slno =?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results[0]);
            }
        );
    },
    getUserGroupSelect: (callBack) => {
        pool.query(
            `SELECT 
                    user_grp_slno,
                    user_group_name
            FROM user_group_mast
            WHERE user_group_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}