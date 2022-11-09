const pool = require('../../config/database');

module.exports = {
    getBranchActiveEmployees: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,contract_status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where (hrm_emp_master.em_status=1 and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2) and (hrm_branch.branch_slno IN (?))`,
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
    getDeptActiveEmployees: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,contract_status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where (hrm_emp_master.em_status=1 and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2) and (hrm_branch.branch_slno IN (?) and hrm_department.dept_id IN (?))`,
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
    getActiveEmployees: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,contract_status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where (hrm_emp_master.em_status=1 and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2) and (hrm_branch.branch_slno IN (?) AND hrm_department.dept_id IN (?) AND hrm_dept_section.sect_id IN (?))`,
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
    getBranchActiveEmpDate: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,contract_status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where (hrm_emp_master.em_status=1 and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2) and (hrm_branch.branch_slno IN (?) and em_doj between ? and ?)`,
            [
                data.branch_slno,
                data.date_of_join_start,
                data.date_of_join_end
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDeptActiveEmpDate: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,contract_status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where (hrm_emp_master.em_status=1 and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2) and (hrm_branch.branch_slno IN (?) and hrm_department.dept_id IN (?) and em_doj between ? and ?)`,
            [
                data.branch_slno,
                data.dept_id,
                data.date_of_join_start,
                data.date_of_join_end
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getActiveEmployeesDate: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,contract_status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where (hrm_emp_master.em_status=1 and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2) and (hrm_branch.branch_slno IN (?) and hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN (?)
            and em_doj between ? and ?)`,
            [
                data.branch_slno,
                data.dept_id,
                data.sect_id,
                data.date_of_join_start,
                data.date_of_join_end
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getBranchInActiveEmployees: (data, callBack) => {
        pool.query(
            `select hrm_emp_contract_log.em_id,old_emno as em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(contract_end_date is not null,'Contract Closed',null)status
            from hrm_emp_contract_log
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_log.em_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
             where hrm_branch.branch_slno IN (?)
             union all
             select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(hrm_emp_master.em_status=0,'Resigned',null)status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where hrm_emp_master.em_status=0 and hrm_branch.branch_slno IN (?)`,
            [
                data,
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
    getDeptInActiveEmployees: (data, callBack) => {
        pool.query(
            `select hrm_emp_contract_log.em_id,old_emno as em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(contract_end_date is not null,'Contract Closed',null)status
            from hrm_emp_contract_log
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_log.em_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
             where em_branch IN (?) and em_department IN(?)
             union all
             select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(hrm_emp_master.em_status=0,'Resigned',null)status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where hrm_emp_master.em_status=0 and em_branch IN (?) and em_department IN(?)`,
            [
                data.em_branch,
                data.em_department,
                data.em_branch,
                data.em_department
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getInActiveEmployees: (data, callBack) => {
        pool.query(
            `select hrm_emp_contract_log.em_id,old_emno as em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(contract_end_date is not null,'Contract Closed',null)status
            from hrm_emp_contract_log
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_log.em_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
             where  em_branch  IN (?) and em_department IN (?) and em_dept_section IN (?)
             union all
             select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(hrm_emp_master.em_status=0,'Resigned',null)status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where hrm_emp_master.em_status=0 and em_branch IN (?) and em_department IN (?) and em_dept_section IN (?)`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section,
                data.em_branch,
                data.em_department,
                data.em_dept_section
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getBranchResignedEmployees: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(hrm_emp_master.em_status=0,'Resigned',null)status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where hrm_emp_master.em_status=0 and hrm_branch.branch_slno IN (?)`,
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
    getDeptResignedEmployees: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(hrm_emp_master.em_status=0,'Resigned',null)status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where hrm_emp_master.em_status=0 and hrm_branch.branch_slno IN (?) and hrm_department.dept_id IN (?)`,
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
    getResignedEmployees: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(hrm_emp_master.em_status=0,'Resigned',null)status
            from hrm_emp_master
            left join hrm_employee on hrm_emp_master.em_id=hrm_employee.emp_id
            left join hrm_emp_personal on hrm_emp_personal.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_branch.branch_slno=hrm_emp_master.em_branch
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join institution_type on institution_type.inst_slno=hrm_emp_master.em_institution_type
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            left join doctor_type on doctor_type.doctype_slno=hrm_emp_master.em_doc_type
            left join hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
            where hrm_emp_master.em_status=0 and hrm_branch.branch_slno IN (?) and hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN (?)`,
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