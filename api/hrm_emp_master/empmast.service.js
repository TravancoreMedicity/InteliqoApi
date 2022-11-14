const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_master (
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
                contract_status,
                probation_status
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
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
                data.contractflag,
                data.probationStatus
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateEmpRegister: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master
                SET           
                em_salutation=?,
                em_name=?,
                em_gender=?,
                em_dob=?,
                em_age_year=?,
                em_age_month=?,
                em_age_day=?,
                em_doj=?,
                em_mobile=?,
                em_phone=?,
                em_email=?,
                em_branch=?,
                em_department=?,
                em_dept_section=?,
                em_institution_type=?,
                em_designation=?,
                em_doc_type=?,
                em_category=?,
                em_prob_end_date=?,
                em_conf_end_date=?,
                em_retirement_date=?,
                em_contract_end_date=?,
                em_status=?,
                create_user=?,
                addressPermnt1=?,
                addressPermnt2=?, 
                hrm_pin1=?,
                em_region=?,
                addressPresent1=?,
                addressPresent2=?,
                hrm_pin2=?, 
                hrm_region2=?, 
                blood_slno=?,
                hrm_religion=?,
                contract_status=?,
                probation_status=?
                WHERE em_no = ?`,
            [
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
                data.contractflag,
                data.probationStatus,
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
    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master
                SET           
                    em_dob = ?,
                    em_mobile = ?,
                    em_phone = ?,
                    em_email = ?,
                    edit_user = ?,
                    addressPresent1=?,
                    addressPresent2=?, 
                    hrm_pin1=?,
                    em_region=?,
                    addressPermnt1=?,
                    addressPermnt2=?,
                    hrm_region2=?,
                    hrm_pin2=?, 
                    blood_slno=?,
                    hrm_religion=?
                WHERE em_no = ?`,
            [
                data.emp_dob,
                data.em_cont_mobile,
                data.em_cont_phone,
                data.em_email,
                data.create_user,
                data.em_pmnt_address1,
                data.em_pmnt_address2,
                data.em_pmnt_pincode,
                data.em_region,
                data.em_per_address1,
                data.em_per_address2,
                data.hrm_region2,
                data.em_per_pincode,
                data.em_bloodgroup,
                data.em_religion,
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
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master SET  em_status = 0 WHERE hrm_emp_master = ?`,
            [
                data.em_slno
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
            `    SELECT 
                    em_slno,
                    em_no,
                    em_id,
                    hrm_salutation.sal_name,
                    em_name,
                    if(em_gender = 1 ,'Male','Female') gender,
                    em_dob,
                    em_age_year,
                    em_age_month,
                    em_age_day,
                    em_doj,
                    em_mobile,
                    em_phone,
                    em_email,
                    hrm_region.reg_name,
                    hrm_branch.branch_name,
                    hrm_department.dept_name,
                    hrm_dept_section.sect_name,
                    institution_type.inst_emp_type,
                    designation.desg_name,
                    doctor_type.doctype_desc,
                    hrm_emp_category.ecat_name,
                    if(em_status = 1 ,'Yes','No' ) emp_status 
                FROM hrm_emp_master
                LEFT JOIN hrm_salutation ON hrm_salutation.sa_code = hrm_emp_master.em_salutation
                LEFT JOIN hrm_region ON hrm_region.reg_slno = hrm_emp_master.em_region
                LEFT JOIN hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
                LEFT JOIN hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
                LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
                LEFT JOIN institution_type ON institution_type.inst_slno = hrm_emp_master.em_institution_type
                LEFT JOIN designation ON designation.desg_slno = hrm_emp_master.em_designation
                LEFT JOIN doctor_type ON doctor_type.doctype_slno = hrm_emp_master.em_doc_type
                LEFT JOIN hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category`,
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
                ifnull(em_no,'')em_no,
                ifnull(em_id,'')em_id,
                ifnull(em_salutation,'0')em_salutation,
                ifnull(em_name,'')em_name,
                ifnull( em_gender,'0')em_gender,
                ifnull(em_dob,'')em_dob,
                ifnull(em_age_year,'')em_age_year,
                ifnull(em_age_month,'')em_age_month,
                em_age_day,
                em_prob_end_date,
                em_conf_end_date,
                em_retirement_date,
                em_contract_end_date,
                ifnull(em_doj,'')em_doj,
                ifnull(em_mobile,'')em_mobile,
                ifnull(em_phone,'')em_phone,
                ifnull(em_email,'')em_email,
                ifnull(addressPermnt1,'')addressPermnt1,
                ifnull(addressPermnt2,'')addressPermnt2, 
                ifnull(hrm_pin1,'')hrm_pin1,
                ifnull(em_region,'0')em_region,
                ifnull(addressPresent1,'')addressPresent1,
                ifnull(addressPresent2,'')addressPresent2,
                ifnull(hrm_pin2,'')hrm_pin2, 
                ifnull(hrm_region2,'0')hrm_region2, 
                ifnull(blood_slno,'0')blood_slno,
                ifnull(hrm_religion,'0')hrm_religion,
                em_branch,
                em_department,
                em_dept_section,
                em_institution_type,
                em_designation,
                em_doc_type,
                em_category
            FROM hrm_emp_master
            WHERE em_no = ?
            AND em_status=1 `,
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
            em_id,
                em_name
            FROM hrm_emp_master
            WHERE em_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmpByDeptAndSection: (data, callBack) => {
        pool.query(
            `SELECT 
                em_no,
                em_id,
                CONCAT(hrm_salutation.sal_name, '.', em_name) AS emp_name,
                IF(em_gender = 1, 'Male', 'Female') gender,
                em_dob,
                em_age_year,
                em_doj,
                em_mobile,
                hrm_branch.branch_name,
                hrm_department.dept_name,
                hrm_dept_section.sect_name,
                designation.desg_name,
                IF(em_status = 1, 'Yes', 'No') emp_status
            FROM
                hrm_emp_master
                    LEFT JOIN
                hrm_salutation ON hrm_salutation.sa_code = hrm_emp_master.em_salutation
                    LEFT JOIN
                hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
                    LEFT JOIN
                hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
                    LEFT JOIN
                hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
                    LEFT JOIN
                designation ON designation.desg_slno = hrm_emp_master.em_designation
                    LEFT JOIN
                hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
            WHERE
                hrm_department.dept_id = ?
                    AND hrm_dept_section.sect_id = ?
                    AND em_status=1  and em_id !=1 and em_no!=2`,
            [
                data.dept_id,
                data.sect_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getInactiveEmpByDeptAndSection: (data, callBack) => {
        pool.query(
            `SELECT 
                em_no,
                em_id,
                CONCAT(hrm_salutation.sal_name, '.', em_name) AS emp_name,
                IF(em_gender = 1, 'Male', 'Female') gender,
                em_dob,
                em_age_year,
                em_doj,
                em_mobile,
                hrm_branch.branch_name,
                hrm_department.dept_name,
                hrm_dept_section.sect_name,
                designation.desg_name,
                IF(em_status = 1, 'Yes', 'No') emp_status
            FROM
                hrm_emp_master
                    LEFT JOIN
                hrm_salutation ON hrm_salutation.sa_code = hrm_emp_master.em_salutation
                    LEFT JOIN
                hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
                    LEFT JOIN
                hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
                    LEFT JOIN
                hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
                    LEFT JOIN
                designation ON designation.desg_slno = hrm_emp_master.em_designation
                    LEFT JOIN
                hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
            WHERE
                hrm_department.dept_id = ?
                    AND hrm_dept_section.sect_id = ?
                    AND em_status=0 and em_id !=1 and em_no!=2`,
            [
                data.dept_id,
                data.sect_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmpBybranch: (data, callBack) => {
        pool.query(
            `SELECT 
                em_no,
                em_id,
                CONCAT(hrm_salutation.sal_name, '.', em_name) AS emp_name,
                IF(em_gender = 1, 'Male', 'Female') gender,
                em_dob,
                em_age_year,
                em_doj,
                em_mobile,
                hrm_branch.branch_name,
                hrm_department.dept_name,
                hrm_dept_section.sect_name,
                designation.desg_name,
                IF(em_status = 1, 'Yes', 'No') emp_status
            FROM
                hrm_emp_master
                    LEFT JOIN
                hrm_salutation ON hrm_salutation.sa_code = hrm_emp_master.em_salutation
                    LEFT JOIN
                hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
                    LEFT JOIN
                hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
                    LEFT JOIN
                hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
                    LEFT JOIN
                designation ON designation.desg_slno = hrm_emp_master.em_designation
                    LEFT JOIN
                hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
            WHERE
                    hrm_branch.branch_slno = ?
                    AND em_status=1 and em_id!=1 and em_no!=2`,
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
    getEmpByDeptartment: (data, callBack) => {
        pool.query(
            `SELECT 
                em_no,
                em_id,
                CONCAT(hrm_salutation.sal_name, '.', em_name) AS emp_name,
                IF(em_gender = 1, 'Male', 'Female') gender,
                em_dob,
                em_age_year,
                em_doj,
                em_mobile,
                hrm_branch.branch_name,
                hrm_department.dept_name,
                hrm_dept_section.sect_name,
                designation.desg_name,
                IF(em_status = 1, 'Yes', 'No') emp_status
            FROM
                hrm_emp_master
                    LEFT JOIN
                hrm_salutation ON hrm_salutation.sa_code = hrm_emp_master.em_salutation
                    LEFT JOIN
                hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
                    LEFT JOIN
                hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
                    LEFT JOIN
                hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
                    LEFT JOIN
                designation ON designation.desg_slno = hrm_emp_master.em_designation
                    LEFT JOIN
                hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
            WHERE
                hrm_department.dept_id = ?
                AND em_status=1 and em_id!=1 and em_no!=2`,
            [
                data.dept_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateserialnum: (callBack) => {
        pool.query(
            `update master_serialno set serial_current=serial_current+1 where serial_slno=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    createCompanyInfo: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_company_log(
                com_branch,
                com_dept,
                com_deptsec,
                com_institution_type,
                com_category,
                com_category_new,
                create_user,
                edit_user,
                em_id,
                em_no,
                com_designation,
                com_designation_new,
                ineffective_date,
                category_ineffect_date
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section,
                data.em_institution_type,
                data.com_category,
                data.em_category,
                data.create_user,
                data.edit_user,
                data.em_id,
                data.em_no,
                data.com_designation,
                data.com_designation_new,
                data.ineffective_date,
                data.category_ineffect_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    updateCompanyInfo: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master
                SET           
                em_branch = ?,
                em_department = ?,
                em_dept_section = ?,
                em_institution_type = ?,
                em_category = ?,
                contract_status=?,
                em_prob_end_date=?,
                probation_status=?,
                em_designation=?
                WHERE em_no = ?`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section,
                data.em_institution_type,
                data.em_category,
                data.contract_status,
                data.em_prob_end_date,
                data.probation_status,
                data.em_designation,
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
    updatecategory: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master
                SET           
                em_category = ?
                WHERE em_no = ?`,
            [
                data.em_category,
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
    getDepartmentSectEmployye: (data, callBack) => {
        pool.query(
            `select em_id,em_name
            from hrm_emp_master
            where em_dept_section=?
            and em_department=?
            and em_branch=1
            and em_status=1 and em_id!=1 and em_no!=2;`,
            [
                data.em_dept_section,
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

    checkidvaluedate: (data, callback) => {
        pool.query(
            `select em_id,em_name
            from hrm_emp_master
            where em_no=?`,
            [
                data.em_no

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getCategoryType: (id, callBack) => {
        pool.query(
            `  select emp_type,des_type from hrm_emp_category where category_slno= ?`,
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

    updateDeptSec: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_master SET em_dept_section=? WHERE em_id= ?`,
            [
                data.em_dept_section,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    //Inactiving Employee By Hr
    InActiveEmpHR: (data, callBack) => {
        pool.query(
            `update hrm_emp_master
            set em_status=0
            where em_id=?`,
            [
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDataByEmpno: (id, callBack) => {
        pool.query(
            `SELECT 
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
                FROM hrm_emp_master
                WHERE em_no = ? `,
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
    getDataByEmpID: (id, callBack) => {
        pool.query(
            `SELECT 
                em_id,
                em_no,
                em_category
                from hrm_emp_master
            WHERE em_id = ? `,
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


}