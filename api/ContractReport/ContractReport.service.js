const pool = require('../../config/database');

module.exports = {

    /** Contract names */
    getContractList: (callBack) => {
        pool.query(
            `SELECT category_slno,ecat_name FROM hrm_emp_category WHERE ecat_name LIKE 'contract%'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    /**contract employee status wise report */
    getContractReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            designation.desg_name,
            hrm_emp_category.ecat_name,
            hrm_emp_master.em_doj,
            hrm_emp_contract_detl.em_cont_start,
            hrm_emp_contract_detl.em_cont_end,
            if(DATEDIFF( em_cont_end,CURRENT_DATE())<0,"expired",DATEDIFF( em_cont_end,CURRENT_DATE())) as 'Remaining_days'
             FROM hrm_emp_master
            LEFT JOIN hrm_department ON hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_emp_contract_detl ON hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            LEFT JOIN hrm_emp_category ON hrm_emp_master.em_category=hrm_emp_category.category_slno
            WHERE  hrm_emp_master.em_status=1 AND hrm_emp_category.category_slno IN (?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2 `,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    /**contract employee status with date wise report */
    getContractReportWithDate: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            designation.desg_name,
            hrm_emp_category.ecat_name,
            hrm_emp_master.em_doj,
            hrm_emp_contract_detl.em_cont_start,
            hrm_emp_contract_detl.em_cont_end,
            if(DATEDIFF( em_cont_end,CURRENT_DATE())<0,"expired",DATEDIFF( em_cont_end,CURRENT_DATE())) as 'Remaining_days'
             FROM hrm_emp_master
            LEFT JOIN hrm_department ON hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_emp_contract_detl ON hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            LEFT JOIN hrm_emp_category ON hrm_emp_master.em_category=hrm_emp_category.category_slno
            WHERE  hrm_emp_master.em_status=1 AND hrm_emp_category.category_slno IN (?) AND DATE(em_cont_end) between curdate() AND ? and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2 `,
            [
                data.category_slno,
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
    getBranchWiseContractClosed: (data, callBack) => {

        pool.query(
            `select 
            hrm_emp_master.em_name,
            hrm_emp_master.em_dob,
          hrm_emp_contract_detl.em_no as oldemo,
              hrm_emp_contract_detl.em_id as em_id,
               hrm_emp_master.em_no as new_emno,
               em_cont_start as oldDoj,
            em_doj as NewDoj,
            branch_name,
            dept_name,
            sect_name,
            desg_name,
            ecat_name,
            case when status = 1 then 'Contract End' else 'Working' end as 'Status',
            em_retirement_date
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where hrm_branch.branch_slno =? and hrm_emp_master.em_no !=1`,
            [
                data.branch_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDeptWiseContractClosed: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_master.em_name,
            hrm_emp_master.em_dob,
          hrm_emp_contract_detl.em_no as oldemo,
              hrm_emp_contract_detl.em_id as em_id,
               hrm_emp_master.em_no as new_emno,
               em_cont_start as oldDoj,
            em_doj as NewDoj,
            branch_name,
            dept_name,
            sect_name,
            desg_name,
            ecat_name,
            em_retirement_date
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where hrm_branch.branch_slno =? and hrm_department.dept_id = ?  and hrm_emp_master.em_no !=1`,
            [
                data.branch_slno,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractClosedReport: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_master.em_name,
            hrm_emp_master.em_dob,
          hrm_emp_contract_detl.em_no as oldemo,
              hrm_emp_contract_detl.em_id as em_id,
               hrm_emp_master.em_no as new_emno,
               em_cont_start as oldDoj,
            em_doj as NewDoj,
            branch_name,
            dept_name,
            sect_name,
            desg_name,
            ecat_name,
            case when status = 1 then 'Contract End' else 'Working' end as 'Status',
            em_retirement_date
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where hrm_branch.branch_slno =? and hrm_department.dept_id = ? and hrm_dept_section.sect_id = ? and hrm_emp_master.em_no !=1`,
            [
                data.branch_slno,
                data.dept_id,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getBranchContractRenew: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_no,
            em_name,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender',
            em_dob,
            em_doj,
            em_mobile,
            em_email,
            branch_name,
            dept_name,
            sect_name,
            inst_emp_type,
            desg_name,
            doctype_desc,
            ecat_name,
            em_cont_start,
            em_cont_end,
            em_cont_renew_date,
            em_cont_compl_status,
            em_cont_renew,
            em_cont_close
            FROM hrm_emp_master
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            left join hrm_emp_contract_detl on hrm_emp_contract_detl.em_id=hrm_emp_master.em_id
            where em_cont_compl_status='C' and em_cont_renew='R' and em_cont_close='C' and hrm_branch.branch_slno IN (?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDeptContractRenew: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_no,
            em_name,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender',
            em_dob,
            em_doj,
            em_mobile,
            em_email,
            branch_name,
            dept_name,
            sect_name,
            inst_emp_type,
            desg_name,
            doctype_desc,
            ecat_name,
            em_cont_start,
            em_cont_end,
            em_cont_renew_date,
            em_cont_compl_status,
            em_cont_renew,
            em_cont_close
            FROM hrm_emp_master
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            left join hrm_emp_contract_detl on hrm_emp_contract_detl.em_id=hrm_emp_master.em_id
            where em_cont_compl_status='C' and em_cont_renew='R' and em_cont_close='C' and hrm_branch.branch_slno IN (?) and hrm_department.dept_id IN(?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
            [
                data.branch_slno,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractRenewReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_no,
            em_name,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender',
            em_dob,
            em_doj,
            em_mobile,
            em_email,
            branch_name,
            dept_name,
            sect_name,
            inst_emp_type,
            desg_name,
            doctype_desc,
            ecat_name,
            em_cont_start,
            em_cont_end,
            em_cont_renew_date,
            em_cont_compl_status,
            em_cont_renew,
            em_cont_close
            FROM hrm_emp_master
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            left join hrm_emp_contract_detl on hrm_emp_contract_detl.em_id=hrm_emp_master.em_id
            where em_cont_compl_status='C' and em_cont_renew='R' and em_cont_close='C' and hrm_branch.branch_slno IN (?) and hrm_department.dept_id IN(?) and hrm_dept_section.sect_id IN (?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
            [
                data.branch_slno,
                data.dept_id,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getBranchContractRunning: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_contract_detl.em_no,
            em_name,
            em_dob,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender',
            em_mobile,
            em_email,
            branch_name,
            dept_name,
            sect_name,
            inst_emp_type,
            em_designation,
            ecat_name,
            em_doj,
            desg_name,
            em_cont_start,
            em_cont_end,
            em_cont_renew_date,
            em_cont_compl_status,
            em_cont_renew,
            em_cont_close
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_contract_detl.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where em_cont_compl_status is null and em_cont_close is null and em_cont_renew is null and branch_slno IN (?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDeptContractRunning: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_contract_detl.em_no,
            em_name,
            em_dob,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender',
            em_mobile,
            em_email,
            branch_name,
            dept_name,
            sect_name,
            inst_emp_type,
            em_designation,
            ecat_name,
            em_doj,
            desg_name,
            em_cont_start,
            em_cont_end,
            em_cont_renew_date,
            em_cont_compl_status,
            em_cont_renew,
            em_cont_close
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_contract_detl.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where em_cont_compl_status is null and em_cont_close is null and em_cont_renew is null and branch_slno IN (?) and hrm_department.dept_id= IN (?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
            [
                data.branch_slno,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractCurrentRunning: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_contract_detl.em_no,
            em_name,
            em_dob,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender',
            em_mobile,
            em_email,
            branch_name,
            dept_name,
            sect_name,
            inst_emp_type,
            em_designation,
            ecat_name,
            em_doj,
            desg_name,
            em_cont_start,
            em_cont_end,
            em_cont_renew_date,
            em_cont_compl_status,
            em_cont_renew,
            em_cont_close
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_contract_detl.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where em_cont_compl_status is null and em_cont_close is null and em_cont_renew is null and branch_slno IN (?) and hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN (?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
            [
                data.branch_slno,
                data.dept_id,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    oneYearCurrentRunningBranch: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_contract_detl.em_no,
            em_name,
            em_dob,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender',
            em_mobile,
            em_email,
            branch_name,
            dept_name,
            sect_name,
            inst_emp_type,
            ecat_name,
            em_doj,
            desg_name,
            em_cont_start,
            em_cont_end,
            em_cont_renew_date,
            em_cont_compl_status,
            em_cont_renew,
            em_cont_close
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_contract_detl.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category WHERE hrm_emp_contract_detl.em_id IN (
                SELECT hrm_emp_contract_detl.em_id
                FROM hrm_emp_contract_detl
                GROUP BY hrm_emp_contract_detl.em_id
                HAVING COUNT(*) >1
            ) and branch_slno IN (?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    oneYearCurrentRunningDept: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_contract_detl.em_no,
            em_name,
            em_dob,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender',
            em_mobile,
            em_email,
            branch_name,
            dept_name,
            sect_name,
            inst_emp_type,
            ecat_name,
            em_doj,
            desg_name,
            em_cont_start,
            em_cont_end,
            em_cont_renew_date,
            em_cont_compl_status,
            em_cont_renew,
            em_cont_close
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_contract_detl.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category WHERE hrm_emp_contract_detl.em_id IN (
                SELECT hrm_emp_contract_detl.em_id
                FROM hrm_emp_contract_detl
                GROUP BY hrm_emp_contract_detl.em_id
                HAVING COUNT(*) >1
            ) and branch_slno IN (?) and hrm_department.dept_id IN (?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
            [
                data.branch_slno,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    oneYearCurrentRunningRpt: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_contract_detl.em_no,
            em_name,
            em_dob,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender',
            em_mobile,
            em_email,
            branch_name,
            dept_name,
            sect_name,
            inst_emp_type,
            ecat_name,
            em_doj,
            desg_name,
            em_cont_start,
            em_cont_end,
            em_cont_renew_date,
            em_cont_compl_status,
            em_cont_renew,
            em_cont_close
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_contract_detl.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category WHERE hrm_emp_contract_detl.em_id IN (
                SELECT hrm_emp_contract_detl.em_id
                FROM hrm_emp_contract_detl
                GROUP BY hrm_emp_contract_detl.em_id
                HAVING COUNT(*) >1
            ) and branch_slno IN (?) and hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN (?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
            [
                data.branch_slno,
                data.dept_id,
                data.sect_id
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