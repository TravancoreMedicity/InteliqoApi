const pool = require('../../config/database');

module.exports = {
    InsertCommonSettings: (data, callBack) => {
        pool.query(
            `INSERT INTO setting_mast (
                cmmn_grace_period,
                cmmn_late_in,
                cmmn_early_out,
                cmmn_late_in_grace,
                cmmn_early_out_grace,
                carry_hl,
                carry_cl,
                carry_el,
                carry_sl,
                min_salary,
                max_salary,
                pf_age,
                pf_employee,
                pf_employer,
                esi_limit,
                esi_employee,
                esi_employer,
                noofadvanceinyear,
                verification_level,
                creat_user,
                default_shift,
                notapplicable_shift,
                week_off_day,
                salary_above,
                noff_count,
                leavetype_multiple,
                pf_employee_amount,
                pf_employer_amount,
                onehour_rqst_count
                )

            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,


            [
                data.cmmn_grace_period,
                data.cmmn_late_in,
                data.cmmn_early_out,
                data.cmmn_late_in_grace,
                data.cmmn_early_out_grace,
                data.carry_hl,
                data.carry_cl,
                data.carry_el,
                data.carry_sl,
                data.min_salary,
                data.max_salary,
                data.pf_age,
                data.pf_employee,
                data.pf_employer,
                data.esi_limit,
                data.esi_employee,
                data.esi_employer,
                data.noofadvanceinyear,
                data.verification_level,
                data.creat_user,
                data.default_shift,
                data.notapplicable_shift,
                data.week_off_day,
                data.salary_above,
                data.noff_count,
                JSON.stringify(data.leavetype_multiple),
                data.pf_employee_amount,
                data.pf_employer_amount,
                data.onehour_rqst_count
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getCommonSettings: (callBack) => {
        pool.query(
            `select * from setting_mast`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateCommonSettings: (data, callBack) => {
        pool.query(
            `UPDATE setting_mast
                SET cmmn_grace_period =?,
                cmmn_late_in =?,
                cmmn_early_out =?,
                cmmn_early_out_grace=?,
                cmmn_late_in_grace=?,
                carry_hl=?,
                carry_cl=?,
                carry_el=?,
                carry_sl=?,
                min_salary=?,
                max_salary=?,
                pf_age=?,
                pf_employee=?,
                pf_employer=?,
                esi_limit=?,
                esi_employee=?,
                esi_employer=?,
                noofadvanceinyear=?,
                verification_level=?,
                update_user=?,
                default_shift=?,
                notapplicable_shift=?,
                week_off_day=?,
                salary_above=?,
                noff_count=?,
                leavetype_multiple=?,
                pf_employee_amount=?,
                pf_employer_amount=?,
                onehour_rqst_count=?
                WHERE setting_slno =?`,
            [
                data.cmmn_grace_period,
                data.cmmn_late_in,
                data.cmmn_early_out,
                data.cmmn_early_out_grace,
                data.cmmn_late_in_grace,
                data.carry_hl,
                data.carry_cl,
                data.carry_el,
                data.carry_sl,
                data.min_salary,
                data.max_salary,
                data.pf_age,
                data.pf_employee,
                data.pf_employer,
                data.esi_limit,
                data.esi_employee,
                data.esi_employer,
                data.noofadvanceinyear,
                data.verification_level,
                data.update_user,
                data.default_shift,
                data.notapplicable_shift,
                data.week_off_day,
                data.salary_above,
                data.noff_count,
                JSON.stringify(data.leavetype_multiple),
                data.pf_employee_amount,
                data.pf_employer_amount,
                data.onehour_rqst_count,
                data.setting_slno
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