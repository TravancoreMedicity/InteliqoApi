const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO module_group_mast (
                module_group_name,
                module_slno
            )
            VALUES (?,?)`,
            [
                data.module_group_name,
                JSON.stringify(data.module_slno),
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
            `UPDATE module_group_mast 
                SET module_group_name = ?,
                    module_slno =?
                WHERE mdgrp_slno = ?`,
            [
                data.module_group_name,
                JSON.stringify(data.module_slno),
                data.mdgrp_slno
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
                mdgrp_slno,
                module_group_name,
                module_slno
            FROM module_group_mast `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getModuleMasterByID: (id, callBack) => {
        pool.query(
            `SELECT 
                mdgrp_slno,
                module_group_name,
                module_slno
            FROM module_group_mast
            WHERE mdgrp_slno = ?`,
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
    createMenuName: (data, callBack) => {
        pool.query(
            `INSERT INTO menu_name (
                menu_name,
                menu_module,
                menu_status
            )
            VALUES (?,?,?)`,
            [
                data.menu_name,
                data.menu_module,
                data.menu_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    geMenuName: (callBack) => {
        pool.query(
            `SELECT 
            menu_slno,
            menu_name,
            menu_module,
            menu_status,
            module_name
            FROM menu_name 
            inner join module_name on module_name.module_slno=menu_name.menu_module
            order by menu_slno desc`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateMenuname: (data, callBack) => {
        pool.query(
            `UPDATE menu_name 
                SET menu_name = ?,
                menu_status =?,
                menu_module=?
                WHERE menu_slno = ?`,
            [
                data.menu_name,
                data.menu_status,
                data.menu_module,
                data.menu_slno
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