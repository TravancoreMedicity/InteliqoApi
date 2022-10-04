const pool = require('../../config/database');

module.exports = {

    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_earning_type (
                earning_type_name,
                deduction,
                earning_type_status,
                create_user
                )
            VALUES (?,?,?,?)`,
            [
                data.earn_type,
                data.deduction_status,
                data.earntype_status,
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
            `SELECT earning_type_name,
            erning_type_id     
                FROM hrm_earning_type
                WHERE earning_type_name = ?`,
            [
                data.earn_type
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getData: (callBack) => {
        pool.query(
            `SELECT erning_type_id,
            earning_type_name,
            deduction, if(deduction = 1 ,'Deduction',' No Deduction')deduction,
            if(earning_type_status = 1 ,'Active','Inactive') status
            FROM hrm_earning_type`,
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