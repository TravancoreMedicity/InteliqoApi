const pool = require('../../config/database');

module.exports = {
    /** Branch wise permanent employee list */
    getPermanentEmpBranch: (data, callBack) => {
        pool.query(
            `SELECT
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
             hrm_branch.branch_name,
             hrm_emp_category.ecat_name,
            hrm_emp_master.em_doj,
            hrm_emp_contract_detl.em_cont_end
            FROM medi_hrm.hrm_emp_master
            LEFT JOIN hrm_department ON hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id 
            LEFT JOIN hrm_branch ON hrm_emp_master.em_branch = hrm_branch.branch_slno
            LEFT JOIN hrm_emp_category ON hrm_emp_master.em_category = hrm_emp_category.category_slno
            LEFT JOIN hrm_emp_contract_detl ON hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            WHERE hrm_branch.branch_slno IN (?) AND hrm_emp_master.em_status=1 AND hrm_emp_category.emp_type=1 and hrm_emp_category.des_type=3`,
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
    /** Branch, Department wise permanent employee */
    getpermanentEmpBranchDept: (data, callBack) => {
        pool.query(
            `SELECT
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
             hrm_branch.branch_name,
             hrm_emp_category.ecat_name,
            hrm_emp_master.em_doj,
            hrm_emp_contract_detl.em_cont_end
            FROM medi_hrm.hrm_emp_master
            LEFT JOIN hrm_department ON hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id 
            LEFT JOIN hrm_branch ON hrm_emp_master.em_branch = hrm_branch.branch_slno
            LEFT JOIN hrm_emp_category ON hrm_emp_master.em_category = hrm_emp_category.category_slno
            LEFT JOIN hrm_emp_contract_detl ON hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            WHERE hrm_branch.branch_slno IN (?) AND hrm_emp_master.em_status=1 AND hrm_emp_category.emp_type=1 and hrm_emp_category.des_type=3 and hrm_department.dept_id IN (?) `,
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
    /** Branch, department, dept section wise permanent employee list */
    getpermanentEmpDetails: (data, callBack) => {
        pool.query(
            `SELECT
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
             hrm_branch.branch_name,
             hrm_emp_category.ecat_name,
            hrm_emp_master.em_doj,
            hrm_emp_contract_detl.em_cont_end
            FROM medi_hrm.hrm_emp_master
            LEFT JOIN hrm_department ON hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id 
            LEFT JOIN hrm_branch ON hrm_emp_master.em_branch = hrm_branch.branch_slno
            LEFT JOIN hrm_emp_category ON hrm_emp_master.em_category = hrm_emp_category.category_slno
            LEFT JOIN hrm_emp_contract_detl ON hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            WHERE hrm_branch.branch_slno IN (?) AND hrm_emp_master.em_status=1 AND hrm_emp_category.emp_type=1 and hrm_emp_category.des_type=3 and hrm_department.dept_id IN (?) AND hrm_dept_section.sect_id IN (?) `,
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
    }
}