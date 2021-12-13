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

    }
}