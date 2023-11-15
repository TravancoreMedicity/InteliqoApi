const pool = require("../../config/database");

module.exports = {

    insertGroupRight: (data, callBack) => { //Inser Group Rights
        pool.query(
            `INSERT INTO user_group_rights (
                user_group_slno,
                module_slno,
                menu_slno
            )
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    validateGroupRights: (data, callBack) => {
        pool.query(
            `SELECT user_group_slno,
                module_slno,
                menu_slno,
                    group_rights_slno
                FROM user_group_rights 
                WHERE user_group_slno = ? AND module_slno =?`,
            [
                data.user_group_slno,
                data.module_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getGroupMenuRigths: (data, callBack) => {
        pool.query(
            `SELECT 
            user_group_rights.group_rights_slno,
            menu_name.menu_slno,
            menu_name.menu_module,
            menu_name.menu_name,
            user_group_rights.menu_view,
            user_group_rights.menu_add,
            user_group_rights.menu_edit
        FROM user_group_rights
        RIGHT JOIN menu_name ON menu_name.menu_slno = user_group_rights.menu_slno 
        WHERE menu_name.menu_module = ? AND user_group_slno = ?`,
            [
                data.module_slno,
                data.user_group_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getMenuSlno: (data, callBack) => {
        pool.query(
            `SELECT menu_slno
            FROM menu_name 
            WHERE menu_module= ?`,
            [
                data.module_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    updateGroupMenuRights: (data, callBack) => {
        pool.query(
            `UPDATE user_group_rights
                SET menu_view = ?
                WHERE group_rights_slno = ?`,
            [
                data.menu_view,
                data.group_rights_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getMenuRightSlno: (id, callBack) => {
        pool.query(
            `call GET_MENU_RIGHT_SLNO(?)`,
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
    }

}