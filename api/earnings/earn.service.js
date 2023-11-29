const pool = require('../../config/database');
const userControllers = require('../users/user.controllers');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_earning_deduction (
                earnded_name,
                include_esi,
                include_lwf,
                include_pf,
                include_protax,
                erning_type_id,
                earnded_status,
                create_user
                )
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.earnded_name,
                data.include_esi,
                data.include_lwf,
                data.include_pf,
                data.include_protax,
                data.erning_type_id,
                data.earnded_status,
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
            `SELECT earnded_name,
            earnded_id     
                FROM hrm_earning_deduction
                WHERE earnded_name = ?`,
            [
                data.earnded_name
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
            `UPDATE hrm_earning_deduction
                SET earnded_name = ?,
                    include_esi = ?,
                    include_lwf = ?,
                    include_pf = ?,
                    include_protax = ?,
                    erning_type_id = ?,
                    earnded_status = ?,
                    edit_user = ?
                WHERE earnded_id = ?`,
            [
                data.earnded_name,
                data.include_esi,
                data.include_lwf,
                data.include_pf,
                data.include_protax,
                data.erning_type_id,
                data.earnded_status,
                data.edit_user,
                data.earnded_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_earning_deduction SET earnded_status = 0 WHERE earnded_id = ?`,
            [
                data.earnded_id
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
            `SELECT earnded_id, earnded_name,  include_esi, include_lwf,include_pf, include_protax,
            hrm_earning_type.erning_type_id, earnded_status,
                    if(include_esi = 1 ,'Yes','No') esi,
                    if(include_lwf = 1 , 'Yes','No') lwf,
                    if(include_pf = 1 , 'Yes','No') pf,
                    if(include_protax = 1, 'Yes','No') protax ,
                    hrm_earning_type.earning_type_name,
                    if(earnded_status = 1 , 'Yes','No')status
            FROM hrm_earning_deduction
            LEFT JOIN hrm_earning_type ON  hrm_earning_type.erning_type_id = hrm_earning_deduction.erning_type_id`,
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
                    earnded_id,
                    earnded_name,
                    include_esi,
                    include_lwf,
                    include_pf,
                    include_protax,
                    erning_type_id,
                    earnded_status
                FROM hrm_earning_deduction
                WHERE earnded_id = ?`,
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
    getSelect: (id, callBack) => {
        pool.query(
            `SELECT 
                    earnded_id,
                    earnded_name
                FROM hrm_earning_deduction
                WHERE earnded_status = 1 and  erning_type_id=?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
}