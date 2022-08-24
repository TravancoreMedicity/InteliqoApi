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
                WHERE em_no =?`,
            [
                data.em_cont_close,
                data.em_cont_close_date,
                data.edit_user,
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
    getDataById: (id, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_contract_detl.em_no,
            hrm_emp_contract_detl.em_id,
            hrm_emp_master.em_name,
			em_cont_start,
            em_cont_end,
            em_cont_compl_status,
            em_cont_renew,
            ecat_name,
            em_cont_renew_date,
            em_cont_close,cont_grace,
            em_cont_close_date,em_category,
            dept_name,sect_name,desg_name
        FROM hrm_emp_contract_detl
        left join hrm_emp_master on hrm_emp_master.em_no=hrm_emp_contract_detl.em_no
        left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
        left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
		left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
        left join designation on designation.desg_slno=hrm_emp_master.em_designation
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
                SET 
                em_cont_close=?,
                em_cont_compl_status = ?,
                em_cont_renew=?,
                em_cont_close_date=?,
                em_cont_renew_date=?
                WHERE em_no =?`,
            [
                data.em_cont_close,
                data.em_cont_compl_status,
                data.em_cont_renew,
                data.em_cont_close_date,
                data.em_cont_renew_date,
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
    updateEmpMaster: (data, callBack) => {
        pool.query(
            `update hrm_emp_master
            set em_no=?,
            em_doj=?,
            em_category=?,
            em_contract_end_date=?,
            em_prob_end_date=?
            where em_id=?`,
            [
                data.em_no,
                data.em_doj,
                data.em_category,
                data.em_contract_end_date,
                data.em_prob_end_date,
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
    //create contract log
    createContractlog: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emplog_contract (
                em_id,
                em_no,
                em_salutation,
                em_name,
                em_gender,
                em_dob,
                em_age_year,
                em_age_month,
                em_age_day,
                em_doj,
                em_mobile,
                em_phone,
                em_email,
                em_branch,
                em_department,
                em_dept_section,
                em_institution_type,
                em_designation,
                em_doc_type,
                em_category,
                em_prob_end_date,
                em_conf_end_date,
                em_retirement_date,
                em_contract_end_date,
                em_status,
                create_user,
                addressPermnt1,
                addressPermnt2, 
                hrm_pin1,
                em_region,
                addressPresent1,
                addressPresent2,
                hrm_pin2, 
                hrm_region2, 
                blood_slno,
                hrm_religion,
                contract_status
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.em_salutation,
                data.em_name,
                data.em_gender,
                data.em_dob,
                data.em_age_year,
                data.em_age_month,
                data.em_age_day,
                data.em_doj,
                data.em_mobile,
                data.em_phone,
                data.em_email,
                data.em_branch,
                data.em_department,
                data.em_dept_section,
                data.em_institution_type,
                data.em_designation,
                data.em_doc_type,
                data.em_category,
                data.em_prob_end_date,
                data.em_conf_end_date,
                data.em_retirement_date,
                data.em_contract_end_date,
                data.em_status,
                data.create_user,
                data.addressPermnt1,
                data.addressPermnt2,
                data.perPincode,
                data.em_region,
                data.addressPresent1,
                data.addressPresent2,
                data.presPincode,
                data.hrm_region2,
                data.blood_slno,
                data.hrm_religion,
                data.contractflag
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    InsertArrearSalaryContractRenew: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_arrear (
                em_id,
                em_no,
                arrear_amount,
                arrear_month,
                create_user                                        
            )
            VALUES (?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.arrear_amount,
                data.arrear_month,
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
    updateConreactrenewAppr: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_contract_detl
                SET contract_renew_appr=?
                WHERE em_no =?`,
            [
                data.contract_renew_appr,
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
    getContractRenewApprovalList: (callBack) => {
        pool.query(
            `select hrm_emp_contract_detl.em_id,hrm_emp_contract_detl.em_no,em_name,sect_name,desg_name,em_status,contract_renew_appr,
            em_doj,em_cont_start,em_cont_end from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            where em_cont_close is null and em_cont_renew is null and contract_renew_appr=1`,
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