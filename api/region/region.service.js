const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_region (
                reg_name,
                reg_pincode,
                reg_dist_slno,
                reg_status,
                create_user)
            VALUES (?,?,?,?,?)`,
            [
                data.reg_name,
                data.reg_pincode,
                data.reg_dist_slno,
                data.reg_status,
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
            `UPDATE hrm_region
                SET reg_name = ?,
                    reg_pincode = ?,
                    reg_dist_slno =?,
                    reg_status =?,
                    edit_user = ?
                WHERE reg_slno =?`,
            [
                data.reg_name,
                data.reg_pincode,
                data.reg_dist_slno,
                data.reg_status,
                data.edit_user,
                data.reg_slno
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
            `DELETE FROM hrm_region WHERE reg_slno = ?`,
            [
                data.reg_slno
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
            `SELECT reg_slno,
            reg_name,dist_name,
            reg_pincode,
             if(reg_status = 1 ,'Yes','No') reg_status
        FROM hrm_region,hrm_district where hrm_region.reg_dist_slno=hrm_district.dist_slno`,
            //and reg_dist_slno='3'
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
            `SELECT reg_slno,
                    reg_name,
                    reg_pincode,
                    reg_dist_slno,
                    reg_status
                FROM hrm_region
                WHERE reg_slno = ?`,
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