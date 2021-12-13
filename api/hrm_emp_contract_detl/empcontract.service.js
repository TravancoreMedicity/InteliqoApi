const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_contract_detl (
                em_no,
                em_id,
                em_cont_start,
                em_cont_end,
                create_user
                                                    
            )
            VALUES (?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.em_cont_start,
                data.em_cont_end,
                data.create_user

            ],
            (error, results, feilds) => {
                if (error) {
                    console.log(error)
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_contract_detl
                SET em_id = ?,
                    em_cont_start =?,
                    em_cont_end =?,
                    em_cont_renew =?,
                    create_user = ?,
                    edit_user =?,
                    create_date =?,
                    update_date =?
                WHERE em_no =?`,
            [
                data.em_id,
                data.em_cont_start,
                data.em_cont_end,
                data.em_cont_renew,
                data.create_user,
                data.edit_user,
                data.create_date,
                data.update_date,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatecontractclose: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_contract_detl
                SET em_cont_close=?,
                    em_cont_close_date=?,
                    edit_user=?
                WHERE em_id =?`,
            [
                data.em_cont_close,
                data.em_cont_close_date,
                data.edit_user,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results)
                return callBack(null, results);
            }
        )
    },
    updateContractRenew: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master
                SET em_no = ?,
                em_contract_end_date=?
                WHERE em_id =?`,
            [
                data.em_no,
                data.em_cont_end,
                data.em_id
            ],
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
            hrm_emp_contract_detl.em_no,
            hrm_emp_contract_detl.em_id,
            em_cont_start,
            em_cont_end,
            em_cont_compl_status,
            em_cont_renew,
            em_cont_renew_date,
            em_cont_close,cont_grace,
            em_cont_close_date,em_category
        FROM hrm_emp_contract_detl
        left join hrm_emp_master
        on hrm_emp_master.em_no=hrm_emp_contract_detl.em_no
        left join hrm_emp_category 
        on
        hrm_emp_category.category_slno=hrm_emp_master.em_category
        WHERE hrm_emp_contract_detl.em_id=? and em_cont_close is null`,
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
    updateContractComplete: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_contract_detl
                SET em_cont_compl_status = ?,
                em_cont_renew=?,
                em_cont_renew_date=?
                WHERE em_id =?`,
            [
                data.em_cont_compl_status,
                data.em_cont_renew,
                data.em_cont_renew_date,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateempnumber: (data, callBack) => {
        pool.query(
            `update master_serialno set serial_current=serial_current+1 where serial_slno=2`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    }
}