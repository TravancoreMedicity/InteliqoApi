const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_shift_mast (
                shft_desc,
                shft_code,
                shft_chkin_time,
                shft_chkout_time,
                shft_cross_day,
                shft_chkin_start,
                shft_chkin_end,
                shft_chkout_start,
                shft_chkout_end,
                shft_duty_day,
                shft_brk_start,
                shft_brk_end,
                shft_early_in_criteria,
                shft_early_in_mints,
                shft_late_out_criteria,
                shft_late_out_mints,
                shft_latein_allow_time,
                shft_earlyout_allow_time,
                first_half_in,
                first_half_out,
                second_half_in,
                second_half_out,
                shft_status
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.shft_desc,
                data.shft_code,
                data.shft_chkin_time,
                data.shft_chkout_time,
                data.shft_cross_day,
                data.shft_chkin_start,
                data.shft_chkin_end,
                data.shft_chkout_start,
                data.shft_chkout_end,
                data.shft_duty_day,
                data.shft_brk_start,
                data.shft_brk_end,
                data.shft_early_in_criteria,
                data.shft_early_in_mints,
                data.shft_late_out_criteria,
                data.shft_late_out_mints,
                data.shft_latein_allow_time,
                data.shft_earlyout_allow_time,
                data.first_half_in,
                data.first_half_out,
                data.second_half_in,
                data.second_half_out,
                data.shft_status
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
            `UPDATE hrm_shift_mast
                SET shft_desc = ?,
                    shft_code = ?,
                    shft_chkin_time =?,
                    shft_chkout_time =?,
                    shft_cross_day =?,
                    shft_chkin_start =?,
                    shft_chkin_end =?,
                    shft_chkout_start =?,
                    shft_chkout_end =?,
                    shft_duty_day =?,
                    shft_brk_start =?,
                    shft_brk_end =?,
                    shft_early_in_criteria =?,
                    shft_early_in_mints =?,
                    shft_late_out_criteria =?,
                    shft_late_out_mints =?,
                    shft_latein_allow_time =?,
                    shft_earlyout_allow_time =?,
                    first_half_in =?,
                    first_half_out =?,
                    second_half_in =?,
                    second_half_out =?,
                    shft_status
                WHERE shft_slno =?`,
            [
                data.shft_desc,
                data.shft_code,
                data.shft_chkin_time,
                data.shft_chkout_time,
                data.shft_cross_day,
                data.shft_chkin_start,
                data.shft_chkin_end,
                data.shft_chkout_start,
                data.shft_chkout_end,
                data.shft_duty_day,
                data.shft_brk_start,
                data.shft_brk_end,
                data.shft_early_in_criteria,
                data.shft_early_in_mints,
                data.shft_late_out_criteria,
                data.shft_late_out_mints,
                data.shft_latein_allow_time,
                data.shft_earlyout_allow_time,
                data.first_half_in,
                data.first_half_out,
                data.second_half_in,
                data.second_half_out,
                data.shft_status,
                data.shft_slno
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
            `UPDATE hrm_shift_mast SET shft_status = 0 WHERE shft_slno = ?`,
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
            `SELECT shft_slno,
                shft_desc,
                shft_code,
                shft_chkin_time,
                shft_chkout_time,
             if(shft_status = 1 ,'Active','In Active') shft_status
            FROM hrm_shift_mast`,
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
                shft_slno,
                shft_desc,
                shft_code,
              shft_chkin_time,
                shft_chkout_time,
                shft_cross_day,
                shft_chkin_start,
                shft_chkin_end,
                shft_chkout_start,
                shft_chkout_end,
                shft_duty_day,
                shft_brk_start,
                shft_brk_end,
                shft_early_in_criteria,
                shft_early_in_mints,
                shft_late_out_criteria,
                shft_late_out_mints,
                shft_latein_allow_time,
                shft_earlyout_allow_time,
                first_half_in,
                first_half_out,
                second_half_in,
                second_half_out,
                shft_status
            FROM hrm_shift_mast
            WHERE shft_slno = ?`,
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
            `SELECT shft_slno,
                    shft_code,
                    shft_desc
                FROM hrm_shift_mast`,
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


