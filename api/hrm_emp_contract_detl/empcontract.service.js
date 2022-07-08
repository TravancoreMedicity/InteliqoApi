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
            em_cont_close,cont_grace,fine_status,
            em_cont_close_date,em_category
        FROM hrm_emp_contract_detl
        left join hrm_emp_master
        on hrm_emp_master.em_no=hrm_emp_contract_detl.em_no
        left join hrm_emp_category 
		on hrm_emp_category.category_slno=hrm_emp_master.em_category
        left join hrm_emp_fine_mast
        on hrm_emp_fine_mast.fine_emp_id=hrm_emp_contract_detl.em_id
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

    },
    insertContractlog: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_contract_log (
               em_id,
               old_emno,
                new_emno, 
                changed_date, 
                contract_end_date
                                                    
            )
            VALUES (?,?,?,?,?)`,
            [
                data.em_id,
                data.old_emno,
                data.em_no,
                data.changed_date,
                data.em_cont_end

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //update emp_personal
    updateempPersonal: (data, callBack) => {
        pool.query(
            `update hrm_emp_personal
            set em_no=?
            where em_id=?`,
            [
                data.em_no,
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
    updateEmpQual: (data, callBack) => {
        pool.query(
            `update hrm_emp_qual
            set em_no=?
            where em_id=?`,
            [
                data.em_no,
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
    updateEmpexp: (data, callBack) => {
        pool.query(
            `update hrm_emp_exp
            set em_no=?
            where em_id=?`,
            [
                data.em_no,
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
    updatePfEsi: (data, callBack) => {
        pool.query(
            `update hrm_emp_pfesi
            set em_no=?
            where em_id=?`,
            [
                data.em_no,
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
    updateEarnDeduction: (data, callBack) => {
        pool.query(
            `update hrm_emp_earn_deduction
            set em_no=?
            where em_id=?`,
            [
                data.em_no,
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
    updateFineMast: (data, callBack) => {
        pool.query(
            `update hrm_emp_fine_mast
            set fine_emp_no=?
            where fine_emp_id=?`,
            [
                data.em_no,
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
    getContractCloseDetl: (callBack) => {
        pool.query(
            `select hrm_emp_contract_detl.em_id,hrm_emp_contract_detl.em_no,dept_name,em_cont_start,em_designation,desg_name,
            em_cont_close_date,em_cont_close,em_department,em_dept_section,em_name,sect_name
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
			left join designation on designation.desg_slno=hrm_emp_master.em_designation
			where em_cont_close='C' and em_cont_renew is null and contract_close_hr_appr is null`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractCloseDetlById: (id, callBack) => {
        pool.query(
            `select hrm_emp_contract_detl.em_id,hrm_emp_contract_detl.em_no,dept_name,em_cont_start,em_designation,desg_name,
            em_cont_close_date,em_cont_close,em_department,em_dept_section,em_name,sect_name
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
			left join designation on designation.desg_slno=hrm_emp_master.em_designation
            where em_cont_close='C' and em_cont_renew is null and hrm_emp_contract_detl.em_id=?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}