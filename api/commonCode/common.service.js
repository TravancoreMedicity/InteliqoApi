const pool = require('../../config/database');

module.exports = {
    getDepartmentName: (callBack) => {
        pool.query(
            `
            SELECT 
                dept_id, dept_name
            FROM
                hrm_department
            WHERE
                dept_status = '1'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    getDistrictName: (callBack) => {
        pool.query(
            `
            SELECT dist_name,dist_slno FROM medi_hrm.hrm_district where  dist_status ='1'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    getSaluationNamelist: (callBack) => {
        pool.query(
            `SELECT sa_code,sal_name FROM hrm_salutation WHERE sal_status = '1'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        )
    },
    getNationNames: (callBack) => {
        pool.query(
            `SELECT nat_slno,nat_name FROM hrm_nation`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getStateName: (callBack) => {
        pool.query(
            `SELECT state_slno,state_name FROM hrm_state`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //GET THE SIDE MAIN MENU DETAILS  USING THE USER DEFINDED MODULES
    getMainSideMenuByUser: (id, callBack) => {
        pool.query(
            `SELECT 
                tag_name,
                module_name,
                to_route,
                icon,
                children,
                classname,
                status
            FROM module_desc
            WHERE status = ?`,
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
    // GET THE MODULE NAME LIST FORM THE DB
    getModuleNameList: (callBack) => {
        pool.query(
            `SELECT 
                module_slno,
                module_name
            FROM module_name`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //GET USER MODULE RIGHTS
    getUserModuleRights: (data, callBack) => {
        pool.query(
            `SELECT 
                    module_group_mast.module_slno
                FROM
                    module_group_user_rights
                LEFT JOIN
                    module_group_mast ON module_group_mast.mdgrp_slno = module_group_user_rights.mdgrp_slno
                WHERE
                    module_group_user_rights.emp_slno = ?`,
            [
                data.emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //GET BANK DETAILS
    getBankName: (callBack) => {
        pool.query(
            `SELECT 
                bank_slno,
                bank_name
            FROM hrm_bank
            WHERE bank_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //get leave type
    getLeaveType: (callBack) => {
        pool.query(
            `SELECT 
            lvetype_slno,
            lvetype_desc
            FROM medi_hrm.hrm_leave_type
            where lvetype_desc='NATIONAL HOLIDAY' or lvetype_desc='FESTIVAL LEAVE'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    //get grade type
    getGrades: (callBack) => {
        pool.query(
            `SELECT 
                grade_slno,
                grade_desc
                FROM grade
                WHERE grade_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSerialno: (callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.master_serialno where serial_slno=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getleaverequwestslno: (callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.master_serialno where serial_slno=5`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getSerialnoempno: (callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.master_serialno where serial_slno=2`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    //get education list
    getEducation: (callBack) => {
        pool.query(
            `SELECT 
            edu_slno,
            edu_desc
            FROM  hrm_mast_education
            where edu_status=1 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    //get Course list
    getCourse: (callBack) => {
        pool.query(
            `SELECT 
            cour_slno,
            cour_desc
            FROM  hrm_mast_course
            where cour_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    //get Course By ID
    getCourseById: (id, callBack) => {
        pool.query(
            `SELECT 
        cour_slno,
        cour_desc
        FROM  hrm_mast_course WHERE edu_slno =?`,
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

    //get Specialization By ID
    getSpecById: (id, callBack) => {
        pool.query(
            `SELECT 
            spec_slno,
            spec_desc
            FROM  hrm_mast_specializtion WHERE cour_slno =?`,
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

    //get University list
    getUniversity: (callBack) => {
        pool.query(
            `SELECT 
            unver_slno,
            unver_name
            FROM  hrm_university
            where unver_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //Get Registration Type
    getRegistrationType: (callBack) => {
        pool.query(
            `SELECT 
            reg_id,
            registration_name
            FROM hrm_emp_registrationtype`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    //Get Wage description (earnded_name) from hrm_earning_deduction
    getWageDescription: (callBack) => {
        pool.query(
            `SELECT earnded_id,
            earnded_name 
            FROM hrm_earning_deduction`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    //Get details from hrm_earning_deduction depands on wage description
    getEarnings: (id, callBack) => {
        pool.query(
            `SELECT
            hrm_earning_type.earning_type_name ,
            hrm_earning_deduction.erning_type_id,
            include_esi,
            include_pf,
            include_lwf,
            include_protax
                   FROM hrm_earning_deduction 
                   LEFT  JOIN  hrm_earning_type ON hrm_earning_deduction.erning_type_id = hrm_earning_type.erning_type_id
                   WHERE earnded_id=?`,
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

    getpersonalData: (id, callBack) => {
        pool.query(
            `SELECT 
            ifnull(hrm_emp_master.em_no,'')em_no,
            ifnull(hrm_emp_master.em_id,'')em_id,
            ifnull(em_salutation,'0')em_salutation,
            ifnull(em_name,'')em_name,
            ifnull( em_gender,'0')em_gender,
            ifnull(em_dob,'')em_dob,
            ifnull(em_age_year,'')em_age_year,
            ifnull(em_age_month,'')em_age_month,
            em_age_day,
            ifnull(em_doj,'')em_doj,
            ifnull(em_mobile,0)em_mobile,
            ifnull(hrm_emp_personal.em_cont_phone,0 ) em_phone,
            ifnull(em_email,'')em_email,
            ifnull(addressPermnt1,'')addressPermnt1,
            ifnull(addressPermnt2,'')addressPermnt2, 
            ifnull(hrm_pin1,'')hrm_pin1,
            ifnull(hrm_emp_master.em_region,'0')em_region,
            ifnull(addressPresent1,'')addressPresent1,
            ifnull(hrm_emp_master.addressPresent2,'')addressPresent2,
            ifnull(hrm_emp_master.hrm_pin2,'')hrm_pin2, 
            ifnull(hrm_emp_master.hrm_region2,'')hrm_region2, 
            ifnull(hrm_emp_master.blood_slno,'0')blood_slno,
            ifnull(hrm_emp_master.hrm_religion,'0')hrm_religion,
            ifnull(em_bank,0)em_bank,
			ifnull(em_account_no,'')em_account_no,
            ifnull(em_maritalstatus,0)em_maritalstatus,
			ifnull(em_ifsc,'')em_ifsc,
			ifnull(em_license_no,'')em_license_no,
			ifnull(em_adhar_no,'')em_adhar_no,
			ifnull(em_pan_no,'')em_pan_no,
			ifnull(em_passport_no,'')em_passport_no
                FROM hrm_emp_master
                left join  hrm_emp_personal on  hrm_emp_master.em_no= hrm_emp_personal.em_no
                WHERE hrm_emp_master.em_no = ?` ,
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
    //get fine /deduction list
    getFineded: (callBack) => {
        pool.query(
            `SELECT 
            fine_slno,
            fine_desc
            FROM  hrm_fine_master `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    //Get salary Information Of Fixed wages
    GetFixedWagesSalry: (id, callBack) => {
        pool.query(
            `SELECT ernded_slno,
            hrm_earning_deduction.earnded_name,hrm_emp_earn_deduction.em_salary_desc,
            hrm_earning_type.earning_type_name,
             em_amount
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              WHERE em_no = ? and earning_type_name='FIXED WAGES'`,
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
    //Get salary Information Of Earnings
    GetEarningsSalry: (id, callBack) => {
        pool.query(
            `SELECT ernded_slno,
            hrm_earning_deduction.earnded_name,hrm_emp_earn_deduction.em_salary_desc,
            hrm_earning_type.earning_type_name,
             em_amount
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              WHERE em_no = ? and earning_type_name='EARNINGS'`,
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
    //Get salary Information Of deduction
    GetDeductionSalry: (id, callBack) => {
        pool.query(
            `SELECT ernded_slno,
            hrm_earning_deduction.earnded_name,hrm_emp_earn_deduction.em_salary_desc,
            hrm_earning_type.earning_type_name,
             em_amount
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              WHERE em_no = ? and earning_type_name='DEDUCTION'`,
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
    //Get Last Changed wage imformation
    GetLastChangedSalary: (id, callBack) => {
        pool.query(
            `SELECT wagelog_slno,em_salary_desc,last_wage,new_wage,
            DATE_FORMAT(changed_date, '%d-%m-%Y')changed_date,emp_id,hrm_earning_deduction.earnded_name,
            (new_wage-last_wage)new_change
            FROM medi_hrm.hrm_emp_wage_log
            left join hrm_earning_deduction
            on hrm_emp_wage_log.em_salary_desc=hrm_earning_deduction.earnded_id
            where emp_id=? and last_wage is not null`,
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

    getFineSlno: (callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.master_serialno where serial_slno=3`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getprocess: (callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.master_serialno where serial_slno=4`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    // get data for processstart
    getannprocess: (id, callBack) => {
        pool.query(
            `SELECT em_category,
                em_contract_end_date,
                em_retirement_date,
                em_conf_end_date,
                em_prob_end_date,
                ecat_cont,
                ecat_prob,
                ecat_cl,
                ecat_el,
                ecat_nh,
                ecat_fh,
                ecat_woff_allow,
                ecat_doff_allow,
                ecat_esi_allow,
                ecat_confere,
                ecat_lop,ecat_sl,em_doj,
                ecat_mate
              FROM hrm_emp_master,hrm_emp_category 
              where hrm_emp_master.em_id=? 
              and hrm_emp_master.em_category = hrm_emp_category.category_slno`,
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

    // get data for casualleave
    getcasual: (id, callBack) => {

        pool.query(
            `SELECT 
                hrm_cl_slno, 
                em_no, 
                em_id,DATE_FORMAT(cl_lv_mnth, "%M")cl_lv_mnth , 
                cl_lv_year, 
                cl_lv_allowed, 
                cl_lv_credit, 
                cl_lv_taken, 
                lv_process_slno, 
                update_user, 
                update_date 
            FROM hrm_leave_cl where em_id=? and cl_lv_active='0'`,
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

    // get data for earnleave
    getearnleave: (id, callBack) => {

        pool.query(
            `SELECT DATE_FORMAT(ernlv_mnth, "%M")ernlv_mnth,ernlv_allowed,
            ernlv_credit,ernlv_taken FROM hrm_leave_earnlv where em_id=? and earn_lv_active=0`,
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
    // get data for leave holiday list
    getleaveholiday: (id, callBack) => {
        pool.query(
            `SELECT hrm_hl_slno,em_no,hd_slno,hl_lv_year,hl_date,hl_lv_credit,hl_lv_taken,
            lv_process_slno,em_id,hld_desc,hl_lv_allowed
            FROM hrm_leave_holiday 
            left join hrm_yearly_holiday_list on hrm_leave_holiday.hd_slno=hrm_yearly_holiday_list.hld_slno
            where em_id=? and hl_lv_active='0'`,
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
    // get data for leave common list
    getleavecommon: (id, callBack) => {
        pool.query(
            `SELECT hrm_lv_cmn,
            em_no, lvetype_desc,
            cmn_lv_allowed,
            cmn_lv_taken,
            cmn_lv_balance,
            Iv_process_slno, 
            em_id, 
            cmn_lv_year,
            cmn_lv_allowedflag 
            FROM hrm_leave_common
            left join hrm_leave_type on hrm_leave_common.llvetype_slno=hrm_leave_type.lvetype_slno where em_id=?`,
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

    //get Company Details
    getCompanyById: (id, callBack) => {
        pool.query(
            `SELECT      em_name,
            em_branch,
            em_department,
            em_dept_section,
            em_institution_type,
            em_category,
            em_prob_end_date,
            em_designation
            FROM hrm_emp_master 
            WHERE em_no=?`,
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
    //get Company Details for table from log table
    getcompanylogId: (id, callBack) => {
        pool.query(
            ` SELECT 
                    DATE_FORMAT(update_date, '%d-%m-%Y %h:%i:%s')update_date,
                    hrm_emp_category.ecat_name,
                    hrm_emp_company_log.edit_user
              FROM hrm_emp_company_log
              LEFT JOIN hrm_emp_category ON hrm_emp_category.category_slno=hrm_emp_company_log.com_category_new
              WHERE em_no=?`,
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
    //getEmployee Allowance Details
    GetEmployeeAllowanceDetails: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_earn_deduction.em_id,hrm_emp_earn_deduction.em_salary_desc,
            hrm_emp_earn_deduction.em_no,
            hrm_emp_master.em_name,
            hrm_earning_deduction.earnded_name,
            hrm_earning_type.earning_type_name,
            em_amount,
            em_start_date
            FROM hrm_emp_earn_deduction
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=hrm_emp_earn_deduction.em_id
            LEFT JOIN hrm_earning_deduction ON hrm_earning_deduction.earnded_id=hrm_emp_earn_deduction.em_salary_desc
            LEFT JOIN hrm_earning_type ON hrm_earning_type.erning_type_id=hrm_emp_earn_deduction.em_earning_type
            WHERE hrm_emp_master.em_department=?
            AND hrm_emp_master.em_dept_section=?
            AND  hrm_emp_earn_deduction.em_earning_type=?
            AND hrm_emp_earn_deduction.em_salary_desc=?;`,
            [
                data.em_department,
                data.em_dept_section,
                data.em_earning_type,
                data.em_salary_desc
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmployeeID: (id, callBack) => {
        pool.query(
            `SELECT emp_id FROM hrm_employee
            WHERE emp_no=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getEmployeeDetailsByEmpID: (id, callBack) => {
        pool.query(
            `SELECT em_id,em_no,em_name,em_department,em_dept_section,em_category,
            em_designation,dept_name,sect_name,desg_name
            from hrm_emp_master
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join designation on hrm_emp_master.em_designation=designation.desg_slno
            where em_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    //Shift details for OT
    getShiftdetails: (data, callBack) => {
        pool.query(
            `SELECT duty_day,punch_slno,mis_punch_flag,
                punch_master.shift_id,
                hrm_shift_mast.shft_slno,
                hrm_shift_mast.shft_chkin_time,
                hrm_shift_mast.shft_chkout_time, 
                punch_in,
                punch_out,
                ot_amount,ot_request_flag
            FROM punch_master
            LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno=punch_master.shift_id
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id = punch_master.emp_id
             WHERE emp_id=? AND duty_day = ? `,
            [
                data.emp_id,
                data.duty_day
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getCasualLeave: (id, callBack) => {
        pool.query(
            `select MONTH(cl_lv_mnth)cl_lv_mnth, hrm_cl_slno,em_no from hrm_leave_cl
            where em_id in (?) and cl_lv_credit != 1 and cl_lv_active=0`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    //get Board By Education
    getBoardById: (id, callBack) => {
        pool.query(
            `SELECT 
            board_slno,
            board_name
        FROM  medi_hrm.hrm_board WHERE education_slno =? `,
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

    //get Employee Name based on department section
    getEmpName: (id, callBack) => {
        pool.query(
            `SELECT 
            em_name,
        em_id
         FROM medi_hrm.hrm_emp_master
         WHERE em_dept_section =?
         and em_status=1 `,
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
    getUserDetl: (id, callBack) => {
        pool.query(
            `select hod, incharge
            from hrm_emp_master
            where em_id =? `,
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
    getDeptsectIncharge: (id, callBack) => {
        pool.query(
            `select dept_section, sect_name from 
            hrm_authorization_assign
            left join hrm_dept_section on hrm_dept_section.sect_id = hrm_authorization_assign.dept_section
            where emp_id =?
            and auth_post = 2`,
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
    getDeptsecthod: (id, callBack) => {
        pool.query(
            `select dept_section, sect_name from 
            medi_hrm.hrm_authorization_assign
            left join hrm_dept_section on hrm_dept_section.sect_id = hrm_authorization_assign.dept_section
            where emp_id =?
            and auth_post = 1`,
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
    getCEOlevel: (id, callBack) => {
        pool.query(
            `select co_assign from hrm_co_assign
            where emp_id =? `,
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
    getDeptsectHOD: (id, callBack) => {
        pool.query(
            `select dept_section, sect_name from 
            hrm_authorization_assign
            left join hrm_dept_section on hrm_dept_section.sect_id = hrm_authorization_assign.dept_section
            where emp_id =?
            and auth_post = 1`,
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
    getShiftdata: (id, callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.punch_data where emp_code =? and date(punch_time)between ? and ? `,
            [
                id.em_no, id.date1, id.date2
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //get active employees
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
            where hrm_employee.emp_status=1 and em_branch=? and em_department=? and em_dept_section=?
            and em_doj between ? and ?`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section,
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
    //get in active employeess list
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
             where  em_branch=? and em_department=? and em_dept_section=?
             union all
             select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
            sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
            em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(hrm_employee.emp_status=0,'Resigned',null)status
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
            where hrm_employee.emp_status=0 and em_branch=? and em_department=? and em_dept_section=?`,
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
    getResignedEmployess: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_id,hrm_emp_master.em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
           sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,em_contract_end_date,em_adhar_no,
           em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(hrm_employee.emp_status=0,'Resigned',null)status
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
           where hrm_employee.emp_status=0 and em_branch=? and em_department=? and em_dept_section=?`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractClosedEmp: (data, callBack) => {
        pool.query(
            `select hrm_emp_contract_log.em_id,old_emno as em_no,em_name,em_dob,if(em_gender=1,'Male','Female')em_gender,em_doj,em_mobile,em_email,branch_name,dept_name,
                        sect_name,inst_emp_type,desg_name,doctype_desc,ecat_name,contract_end_date,em_adhar_no,
                        em_retirement_date,addressPresent1,addressPresent2,hrm_pin2,if(contract_end_date is not null,'Resigned',null)status
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
                        where em_branch=? and em_department=? and em_dept_section=?`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getotwage: (id, callBack) => {
        pool.query(
            `SELECT
                ot_amount
            FROM hrm_emp_master
            WHERE em_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    //get compansatory leave
    getCompansatoryLeave: (id, callBack) => {
        pool.query(
            `select 
                calculated_date,
                credited,
                taken
            from hrm_leave_calculated
                where emp_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    //get leave count
    getLeaveCount: (id, callBack) => {
        pool.query(
            `call medi_hrm.GET_LEAVECOUNT(?)`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    //get Employee Name based on department section
    getENameLeaveCarry: (id, callBack) => {
        pool.query(
            `SELECT 
            em_name,
            em_no,
            em_id
         FROM medi_hrm.hrm_emp_master
         WHERE  em_id =? `,
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
    getEmployeeProfileInformation: (id, callBack) => {
        pool.query(
            `call medi_hrm.GET_PROFILE_INFORM(?)`,
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
    getCoffDetails: (id, callBack) => {
        pool.query(
            `
            select hrm_calc_holiday,calculated_date,credited from hrm_leave_calculated
            where emp_id=? and taken=0`,
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

    getfrndenddata: (id, callBack) => {
        pool.query(
            ` select sum(sumamount) fineamunt,sum(plan_slno) dutyplan from (
                SELECT 0 sumamount,count(plan_slno) plan_slno FROM medi_hrm.hrm_duty_plan where emp_id=? and  MONTH((duty_day))  = MONTH(CURDATE()) and YEAR((duty_day))  = YEAR(CURDATE()) and shift_id=0
                union all
                SELECT ifnull(sum(fine_amount),0) sumamount,0 FROM medi_hrm.hrm_emp_fine_mast where fine_emp_id=? and fine_status='0')a`,
            [
                id, id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    //get Employee Name based on department section
    EmpNameCategory: (id, callBack) => {
        pool.query(
            `SELECT 
            em_name,         
            em_id,
            hrm_emp_category.emp_type
           FROM medi_hrm.hrm_emp_master
           LEFT JOIN hrm_emp_category on hrm_emp_category.category_slno=hrm_emp_master.em_category
           WHERE em_dept_section =? `,
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

    //punch time check in punch master for deleting
    getdutydaycheck: (data, callBack) => {
        pool.query(
            `SELECT
             duty_day
              FROM punch_master
               WHERE punch_in=? 
            OR punch_out=?
                AND emp_id= ?`,
            [
                data.punch_in,
                data.punch_out,
                data.emp_id

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getCarryDetails: (id, callBack) => {
        pool.query(
            `select carry_cl 'Credited', carry_cl 'Taken' ,'Casual Leave' name from hrm_leave_carry_count
            where emp_id=?
            union all
            select carry_el 'Credited', carry_el 'Taken','Earn Leave' name from hrm_leave_carry_count
            where emp_id=?
            union all
            select carry_sl 'Credited', carry_sl 'Taken','Sick Leave' name from hrm_leave_carry_count
            where emp_id=?
            union all
            select carry_hdl 'Credited', carry_hdl 'Taken','Holiday Leave' name from hrm_leave_carry_count
            where emp_id=?`,
            [
                id, id, id, id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmpLeaveProcessDates: (id, callBack) => {
        pool.query(
            `CALL GET_EMP_PROCESS_DETAILS(?)`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    getEmployeeSection: (data, callBack) => {
        pool.query(
            `select em_id,em_name,em_no from hrm_emp_master
            where em_dept_section IN(?) and em_status=1`,
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
    getadvancerequestSlno: (callBack) => {
        pool.query(
            `SELECT * FROM medi_hrm.master_serialno where serial_slno=6`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getContractDetl: (id, callBack) => {
        pool.query(
            `select em_cont_start,em_cont_end from hrm_emp_contract_detl
            where em_cont_compl_status is null and em_cont_close is null and em_id=?`,
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
    getApprovalLevel: (id, callBack) => {
        pool.query(
            `select hod,incharge,authorization_incharge,authorization_hod,ifnull(co_assign,0)co_assign
            from hrm_emp_master
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join hrm_co_assign on hrm_co_assign.emp_id=hrm_emp_master.em_id
            where em_id=?;`,
            [
                id, id, id, id
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

