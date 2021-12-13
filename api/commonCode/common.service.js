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
            FROM  hrm_mast_education `,
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
            FROM  hrm_mast_course`,
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
            FROM  hrm_university`,
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
            ifnull(em_mobile,'')em_mobile,
            ifnull(em_phone,'')em_phone,
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
            ifnull(em_bank,'')em_bank,
			ifnull(em_account_no,'')em_account_no,
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
            hrm_earning_deduction.earnded_name,
            hrm_earning_type.earning_type_name,
             em_amount,DATE_FORMAT(changed_date, '%d-%m-%Y')changed_date
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              LEFT JOIN hrm_emp_wage_log on hrm_emp_earn_deduction.em_salary_desc=hrm_emp_wage_log.em_salary_desc
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
            hrm_earning_deduction.earnded_name,
            hrm_earning_type.earning_type_name,
             em_amount,DATE_FORMAT(changed_date, '%d-%m-%Y')changed_date
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              LEFT JOIN hrm_emp_wage_log on hrm_emp_earn_deduction.em_salary_desc=hrm_emp_wage_log.em_salary_desc
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
            hrm_earning_deduction.earnded_name,
            hrm_earning_type.earning_type_name,
             em_amount,DATE_FORMAT(changed_date, '%d-%m-%Y')changed_date
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              LEFT JOIN hrm_emp_wage_log on hrm_emp_earn_deduction.em_salary_desc=hrm_emp_wage_log.em_salary_desc
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
            `SELECT wagelog_slno,em_salary_desc,wage_type,last_wage,new_wage,
            DATE_FORMAT(changed_date, '%d-%m-%Y')changed_date,emp_id,hrm_earning_deduction.earnded_name,
            (new_wage-last_wage)new_change
            FROM medi_hrm.hrm_emp_wage_log
            left join hrm_earning_deduction
            on hrm_emp_wage_log.em_salary_desc=hrm_earning_deduction.earnded_id
            where emp_id=?`,
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


}



