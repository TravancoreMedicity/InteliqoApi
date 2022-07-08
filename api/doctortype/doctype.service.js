const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO doctor_type (doctype_desc,doctype_status,create_user)
            VALUES (?,?,?)`,
            [
                data.doctype_desc,
                data.doctype_status,
                data.create_user,
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
            `UPDATE doctor_type
                SET doctype_desc = ?,
                    doctype_status = ?,
                    edit_user = ?
                WHERE doctype_slno = ?`,
            [
                data.doctype_desc,
                data.doctype_status,
                data.edit_user,
                data.doctype_slno
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
            `SELECT doctype_desc,
            doctype_status
                FROM doctor_type
                WHERE doctype_desc = ?`,
            [
                data.doctype_desc,
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
            `SELECT doctype_desc,
               
                 doctype_slno
                FROM doctor_type 
                WHERE doctype_desc = ?  AND doctype_slno != ?`,
            [
                data.doctype_desc,

                data.doctype_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE doctor_type SET doctype_status = 0 WHERE doctype_slno = ?`,
            [
                data.doctype_slno
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
            `SELECT 
                doctype_slno,
                doctype_desc,
                if(doctype_status = 1 ,'Yes','No') doctype_status
            FR doctor_type `,
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
                doctype_slno,
                doctype_desc,
                doctype_status
            FROM doctor_type
            WHERE doctype_slno = ?`,
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
    getSelect: (callBack) => {
        pool.query(
            `SELECT 	
                doctype_slno,
                doctype_desc
            FROM doctor_type 
            WHERE doctype_status = 1`,
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