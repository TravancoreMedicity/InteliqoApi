const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_bank (bank_name,bank_ifsc,bank_address,bank_status,create_user)
            VALUES (?,?,?,?,?)`,
            [
                data.bank_name,
                data.bank_ifsc,
                data.bank_address,
                data.bank_status,
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
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_bank 
                SET bank_name = ?,
                    bank_ifsc = ?,
                    bank_address = ?,
                    bank_status = ?,
                    edit_user =?
                WHERE bank_slno =?`,
            [
                data.bank_name,
                data.bank_ifsc,
                data.bank_address,
                data.bank_status,
                data.edit_user,
                data.bank_slno
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
            `DELETE FROM hrm_bank WHERE bank_slno = ?`,
            [
                data.bank_slno
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
            `SELECT bank_slno,
                bank_name,
                bank_ifsc,
                bank_address,
                if(bank_status = 1 ,'Active','Inactive') status
            FROM hrm_bank`,
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
            `SELECT bank_slno,
                bank_name,
                bank_ifsc,
                bank_address,
                bank_status
            FROM hrm_bank
            WHERE bank_slno = ?`,
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
    }
}