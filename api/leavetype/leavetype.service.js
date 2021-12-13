const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_leave_type (
                lvetype_desc,
                lvetype_code,
                carryforward,
                avail_on_traing_probation,
                avail_on_after_confirm,
                half_day_allowed,
                leave_credit_policy,
                leave_credit_policy_count,
                status, 
                is_lop,
                is_holiday,
                is_leave,
                create_user
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.lvetype_desc,
                data.lvetype_code,
                data.carryforward,
                data.avail_on_traing_probation,
                data.avail_on_after_confirm,
                data.half_day_allowed,
                data.leave_credit_policy,
                data.leave_credit_policy_count,
                data.status,
                data.is_lop,
                data.is_holiday,
                data.is_leave,
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
            `UPDATE hrm_leave_type 
                SET lvetype_desc = ?,
                    lvetype_code = ?,
                    carryforward = ?,
                    avail_on_traing_probation = ?,
                    avail_on_after_confirm =?,
                    half_day_allowed =?,
                    leave_credit_policy =?,
                    leave_credit_policy_count =?,
                    status = ?,
                    is_lop= ?,
                    is_holiday = ?,
                    is_leave = ?,
                    edit_user = ?
                WHERE lvetype_slno = ?`,
            [
                data.lvetype_desc,
                data.lvetype_code,
                data.carryforward,
                data.avail_on_traing_probation,
                data.avail_on_after_confirm,
                data.half_day_allowed,
                data.leave_credit_policy,
                data.leave_credit_policy_count,
                data.status,
                data.is_lop,
                data.is_holiday,
                data.is_leave,
                data.edit_user,
                data.lvetype_slno
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
            `UPDATE hrm_leave_type SET status = 0 WHERE lvetype_slno = ?`,
            [
                data.lvetype_slno
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
                lvetype_slno,
                lvetype_desc,
                lvetype_code,
                status 
            FROM hrm_leave_type`,
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
                lvetype_slno,
                lvetype_desc,
                lvetype_code,
                carryforward,
                avail_on_traing_probation,
                avail_on_after_confirm,
                half_day_allowed,
                leave_credit_policy,
                leave_credit_policy_count,
                status,
                is_lop,
                is_holiday,
                is_leave
            FROM hrm_leave_type
            WHERE lvetype_slno = ?`,
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
                lvetype_slno,
                lvetype_desc
            FROM hrm_leave_type
            WHERE status = 1`,
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