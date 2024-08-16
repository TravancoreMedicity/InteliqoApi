const pool = require('../../config/database');

module.exports = {
    getData: (data, callBack) => {

        pool.query(
            ` SELECT * from file_checklist where emid=?
           `,
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
    getempdetails: (data, callBack) => {
        pool.query(
            `SELECT e.em_no,
            em_name,
            em_department,
            desg_name,
            em_dept_section,
            hrm_candidate_selection.application_no,
            em_gender,
            em_dob,
            em_age_year,
            em_doj,
            em_mobile,
            e.em_id,
            em_phone,
            em_email,
            addressPermnt1,
            addressPermnt2,
            addressPresent1,
            addressPresent2,
            relatives_friends_name,
            recruitment_unit,
            dept_name,
            recomend_salary,
            e.em_contract_end_date,
            ecat_name,
            hrm_pin2,
            hrm_pin1,
            group_name,
            hrm_religion,
            relg_name,
            em_passport_no,
            em_license_no,
            em_account_no,
            em_fathers_name,
            Education_details,
            Experience_details,
            state,
            nation,
            stateCondact,
            nationcondact,
            group_concat(hrm_mast_education.edu_desc) as edu_desc
            from hrm_emp_master e
             LEFT JOIN designation ON designation.desg_slno =  e.em_designation
            LEFT JOIN hrm_candidate_selection ON hrm_candidate_selection.em_no =  e.em_no
            LEFT JOIN hrm_emp_personal ON hrm_emp_personal.em_no =  e.em_no
            LEFT JOIN hrm_emp_qual ON hrm_emp_qual.em_no =  e.em_no
            LEFT JOIN hrm_mast_education ON hrm_mast_education.edu_slno =  hrm_emp_qual.em_education
            LEFT JOIN hrm_application_form ON hrm_application_form.application_no =  hrm_candidate_selection.application_no
            LEFT JOIN hrm_department ON hrm_department.dept_id =  e.em_department
            LEFT JOIN hrm_emp_category ON hrm_emp_category.category_slno =  e.em_category
            LEFT JOIN bloodgroup ON bloodgroup.group_slno =  e.blood_slno
            LEFT JOIN hrm_religion ON hrm_religion.relg_slno =  e.hrm_religion
            LEFT JOIN hrm_antecedent_form ON hrm_antecedent_form.em_no =  e.em_no
             where e.em_no=? group by e.em_no,e.em_name,designation.desg_name,e.em_department,
             hrm_candidate_selection.application_no,e.em_gender,e.em_dob,e.em_age_year,e.em_doj,e.em_mobile,hrm_application_form.recruitment_unit,
             e.em_phone,e.em_email,e.addressPermnt1,e.addressPermnt2,hrm_application_form.relatives_friends_name,hrm_department.dept_name,e.recomend_salary,e.em_contract_end_date,
             hrm_emp_category.ecat_name,e.hrm_pin2,e.hrm_pin1,e.em_id,e.addressPresent1,e.addressPresent2,Experience_details,Education_details;`,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    getbiodetails: (data, callBack) => {

        pool.query(
            `SELECT hrm_emp_master.em_no,
            em_name,
            relg_name,
            reg_name,
            em_email,
            em_mobile,
            em_region,
            hrm_religion,
            em_dob,
            Education_details,
            Experience_details,
            salutation,
            gender,
            addressPermnt1,
            addressPermnt2,
            hrm_pin1,   
           hrm_candidate_selection.application_no
              FROM hrm_emp_master
                LEFT JOIN hrm_candidate_selection ON hrm_candidate_selection.em_no =  hrm_emp_master.em_no
                 LEFT JOIN hrm_application_form ON hrm_application_form.application_no = hrm_candidate_selection.application_no
                   LEFT JOIN hrm_religion ON hrm_emp_master.hrm_religion = hrm_religion.relg_slno
                LEFT JOIN hrm_region ON hrm_emp_master.em_region = hrm_region.reg_slno
           WHERE hrm_emp_master.em_no= ?;`,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    getinterviewmark: (data, callBack) => {

        pool.query(
            `  SELECT 
            hrm_emp_master.em_no,
             em_name,
            desg_name,
            dept_name,
            hrm_candidate_selection.application_no,
             em_designation,
            total_Incharge_inter_mark,
            Hod_interview_mark,
            subject_mark,
            exp_mark,edu_mark,technical_mark,presentation_mark,analytical_mark,communication_mark,
            attitude_mark,confidence_mark,bodylang_mark,Ms_Interview_Mark,Dms_Interview_Mark,
            Operation_Interview_Mark,Ceo_Interview_Mark,Hr_Interview_Mark, Hod_interview_mark,
             Hod_sub_mark,
             Hod_exp_mark,
             Hod_edu_mark,
             Hod_tech_mark,
             Hod_pre_mark,
             Hod_analy_mark,
             Hod_commu_mark,
             Hod_atti_mark,
             Hod_confi_mark,
             Hod_bodylang_mark,
              Ms_Interview_Mark,
             Ms_sub_mark,
             Ms_exp_mark,
             Ms_edu_mark,
             Ms_tech_mark,
             Ms_pre_mark,
             Ms_analy_mark,
             Ms_commu_mark,
             Ms_atti_mark,
             Ms_confi_mark,
             Ms_bodylang_mark,
             Dms_sub_mark,
             Dms_exp_mark,
             Dms_edu_mark,
             Dms_tech_mark,
             Dms_pre_mark,
             Dms_analy_mark,
             Dms_commu_mark,
             Dms_atti_mark,
             Dms_confi_mark,
             Dms_bodylang_mark,
              Op_sub_mark,
             Op_exp_mark,
             Op_edu_mark,
             Op_tech_mark,
             Op_pre_mark,
             Op_analy_mark,
             Op_commu_mark,
             Op_atti_mark,
             Op_confi_mark,
             Op_bodylang_mark,
               Ceo_sub_mark,
             Ceo_exp_mark,
             Ceo_edu_mark,
             Ceo_tech_mark,
             Ceo_pre_mark,
             Ceo_analy_mark,
             Ceo_commu_mark,
             Ceo_atti_mark,
             Ceo_confi_mark,
             Ceo_bodylang_mark,
               Hr_sub_mark,
             Hr_exp_mark,
             Hr_edu_mark,
             Hr_tech_mark,
             Hr_pre_mark,
             Hr_analy_mark,
             Hr_commu_mark,
             Hr_atti_mark,
             Hr_confi_mark,
             Hr_bodylang_mark,
             Hr_remark,
             incharge_remark,
             hod_remark,
             ms_remark,
             dms_remark,
             operation_remark,
             selected_status,
             ceo_remark,
             interview_status
               FROM hrm_emp_master
                LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
                  LEFT JOIN hrm_department ON hrm_department.dept_id =  hrm_emp_master.em_department
                  LEFT JOIN hrm_candidate_selection ON hrm_candidate_selection.em_no =  hrm_emp_master.em_no 
                   LEFT JOIN hrm_applicationform_status ON hrm_applicationform_status.application_no =  hrm_candidate_selection.application_no and hrm_emp_master.em_designation =hrm_applicationform_status.desg_id
            WHERE hrm_emp_master.em_no=?`,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    getPdfformat: (data, callBack) => {
        pool.query(
            `SELECT 
            appmt_pdf_format
              FROM hrm_emp_master
                 LEFT JOIN hrm_candidate_selection ON hrm_candidate_selection.em_no =  hrm_emp_master.em_no 
                  LEFT JOIN hrm_applicationform_status ON hrm_applicationform_status.application_no =  hrm_candidate_selection.application_no and hrm_emp_master.em_designation =hrm_applicationform_status.desg_id
           WHERE hrm_emp_master.em_no=? `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    getPdfformatjoin: (data, callBack) => {
        pool.query(
            `SELECT 
            join_ltr_pdf_format
              FROM hrm_emp_master
                 LEFT JOIN hrm_candidate_selection ON hrm_candidate_selection.em_no =  hrm_emp_master.em_no 
                  LEFT JOIN hrm_applicationform_status ON hrm_applicationform_status.application_no =  hrm_candidate_selection.application_no and hrm_emp_master.em_designation =hrm_applicationform_status.desg_id
           WHERE hrm_emp_master.em_no=? `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    getVaccination: (data, callBack) => {

        pool.query(
            `SELECT 
            vaccination_master.em_id,
            vaccination_master.em_no,
            CONCAT(UPPER(SUBSTRING(a.em_name,1,1)),LOWER(SUBSTRING(a.em_name,2)))  as 'em_name',
            sect_name,
            a.em_status,
            group_name,
            a.em_mobile,                
            DATE_FORMAT(hic_first_dose_date, '%d/%m/%Y') AS 'hic_first_dose_date',
            DATE_FORMAT(hic_second_dose_date, '%d/%m/%Y') AS 'hic_second_dose_date',
            DATE_FORMAT(hic_thirdt_dose_date, '%d/%m/%Y') AS 'hic_thirdt_dose_date',
            DATE_FORMAT(hic_boostert_dose_date, '%d/%m/%Y') AS 'hic_boostert_dose_date',
            hic_frst_dose_status,
            hic_second_dose_status,
            hic_third_dose_status,
            hic_booster_dose_status,
            a.em_dob,
            a.em_doj,
            a.em_age_year,
            a.em_designation,
            a.em_gender,
            CONCAT(UPPER(SUBSTRING(dept_name,1,1)),LOWER(SUBSTRING(dept_name,2)))  as 'dept_name',
            CONCAT(UPPER(SUBSTRING(b.desg_name,1,1)),LOWER(SUBSTRING(b.desg_name,2)))  as 'desg_name',
             hic_emid_first_verified,
             hic_emid_second_verified,
             hic_emid_third_verified,
             hic_emid_booster_verified,
             first_vacc_emid,
             second_vacc_emid,
             third_vacc_emid,
             booster_vacc_emid,
            DATE_FORMAT(firstdose_date, '%d/%m/%Y') AS 'firstdose_date',
            DATE_FORMAT(second_dose_given_date, '%d/%m/%Y') AS 'second_dose_given_date',
            DATE_FORMAT(third_dose_given_date, '%d/%m/%Y') AS 'third_dose_given_date',
            DATE_FORMAT(booster_dose_given_date, '%d/%m/%Y') AS 'booster_dose_given_date',
             CONCAT(UPPER(SUBSTRING(a1.em_name,1,1)),LOWER(SUBSTRING(a1.em_name,2)))  as 'em_name_first_verified',
             CONCAT(UPPER(SUBSTRING(a2.em_name,1,1)),LOWER(SUBSTRING(a2.em_name,2)))  as 'em_name_second_verified',
             CONCAT(UPPER(SUBSTRING(a3.em_name,1,1)),LOWER(SUBSTRING(a3.em_name,2)))  as 'em_name_third_verified',
             CONCAT(UPPER(SUBSTRING(a4.em_name,1,1)),LOWER(SUBSTRING(a4.em_name,2)))  as 'em_name_booster_verified',
             CONCAT(UPPER(SUBSTRING(a5.em_name,1,1)),LOWER(SUBSTRING(a5.em_name,2)))  as 'first_verified',
             CONCAT(UPPER(SUBSTRING(a6.em_name,1,1)),LOWER(SUBSTRING(a6.em_name,2)))  as 'second_verified',
             CONCAT(UPPER(SUBSTRING(a7.em_name,1,1)),LOWER(SUBSTRING(a7.em_name,2)))  as 'third_verified',
             CONCAT(UPPER(SUBSTRING(a8.em_name,1,1)),LOWER(SUBSTRING(a8.em_name,2)))  as 'booster_verified',
             CONCAT(UPPER(SUBSTRING(b1.desg_name,1,1)),LOWER(SUBSTRING(b1.desg_name,2)))  as 'firstdesg',
             CONCAT(UPPER(SUBSTRING(b2.desg_name,1,1)),LOWER(SUBSTRING(b2.desg_name,2)))  as 'secdesg',
             CONCAT(UPPER(SUBSTRING(b3.desg_name,1,1)),LOWER(SUBSTRING(b3.desg_name,2)))  as 'thirddesg',
             CONCAT(UPPER(SUBSTRING(b4.desg_name,1,1)),LOWER(SUBSTRING(b4.desg_name,2)))  as 'boosterdesg'

             FROM vaccination_master
             INNER JOIN hrm_emp_master a ON vaccination_master.em_id =a.em_id
             LEFT JOIN hrm_emp_master a1 ON a1.em_id = vaccination_master.hic_emid_first_verified AND vaccination_master.hic_emid_first_verified <> 0
             LEFT JOIN hrm_emp_master a2 ON a2.em_id = vaccination_master.hic_emid_second_verified AND vaccination_master.hic_emid_second_verified <> 0
             LEFT JOIN hrm_emp_master a3 ON a3.em_id = vaccination_master.hic_emid_third_verified AND vaccination_master.hic_emid_third_verified <> 0
             LEFT JOIN hrm_emp_master a4 ON a4.em_id = vaccination_master.hic_emid_booster_verified AND vaccination_master.hic_emid_booster_verified <> 0
             LEFT JOIN hrm_emp_master a5 ON a5.em_id = vaccination_master.first_vacc_emid AND vaccination_master.first_vacc_emid <> 0
             LEFT JOIN hrm_emp_master a6 ON a6.em_id = vaccination_master.second_vacc_emid AND vaccination_master.second_vacc_emid <> 0
             LEFT JOIN hrm_emp_master a7 ON a7.em_id = vaccination_master.third_vacc_emid AND vaccination_master.third_vacc_emid <> 0
             LEFT JOIN hrm_emp_master a8 ON a8.em_id = vaccination_master.booster_vacc_emid AND vaccination_master.booster_vacc_emid <> 0
             LEFT JOIN designation b1 ON a1.em_designation = b1.desg_slno
             LEFT JOIN designation b2 ON a2.em_designation = b2.desg_slno
             LEFT JOIN designation b3 ON a3.em_designation = b3.desg_slno
             LEFT JOIN designation b4 ON a4.em_designation = b4.desg_slno
             INNER JOIN hrm_department ON a.em_department = hrm_department.dept_id
             INNER JOIN hrm_dept_section ON a.em_dept_section = hrm_dept_section.sect_id
             INNER JOIN bloodgroup ON a.blood_slno = bloodgroup.group_slno
             INNER JOIN designation b ON a.em_designation=b.desg_slno
             WHERE vaccination_master.em_no   = ? `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertData: (data, callBack) => {

        pool.query(
            `INSERT INTO application_for_emp_form (
                Emp_No,
                Application_No,
                Relative_DesgId,
                Relative_Dept,
                Place,
                Date_of_Form,
                Old_DeptId,
                Relative_name
               
                )
                VALUES (?,?,?,?,?,?,?)`,
            [
                data.emno, data.applicationNo, data.desg, data.dept, data.Place, data.date, data.oldDept, data.RelativeName

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getapplicationdata: (data, callBack) => {

        pool.query(
            `SELECT 
            Relative_DesgId,
            Relative_Dept,
            Place,
            Old_DeptId,
            Date_of_Form,
            Relative_name,
            desg_name,
            hrm_department.dept_name,
            old_dept.dept_name as old_dept_name
            FROM application_for_emp_form
            LEFT JOIN designation ON designation.desg_slno =  application_for_emp_form.Relative_DesgId
            LEFT JOIN hrm_department ON hrm_department.dept_id =  application_for_emp_form.Relative_Dept
			LEFT JOIN hrm_department as old_dept ON old_dept.dept_id =  application_for_emp_form.Old_DeptId
           WHERE application_for_emp_form.Emp_No=?; `,
            [
                data.emno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    updatetdata: (data, callBack) => {
        pool.query(
            `UPDATE application_for_emp_form 
            SET  Relative_DesgId=? ,
            Relative_Dept=?,
            Place=?,
            Date_of_Form=?,
            Old_DeptId=?,
            Relative_name=?
            WHERE Emp_No=? `,
            [
                data.desg, data.dept, data.Place, data.date, data.oldDept, data.RelativeName, data.emno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    EmpLangaugeKnown: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO hrm_emp_languages_known
            (
                em_id,
                em_no,
                malayalam_write,
                malayalam_speak,
                malayalam_read, 
                hindi_write, 
                hindi_speak,
                hindi_read,
                english_write,
                english_speak,
                english_read,
                other_langauge,
                other_speak,
                other_write,
                other_read
           )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    data.em_id,
                    data.em_no,
                    data.MalayalamWrt,
                    data.Malayalamspk,
                    data.Malayalamrd,
                    data.HindiWrt,
                    data.Hindispk,
                    data.Hindird,
                    data.EngWrt,
                    data.Engspk,
                    data.Engrd,
                    data.other,
                    data.Othrspk,
                    data.OthrWrt,
                    data.Othrsrd,

                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },
    EmpQualification: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO hrm_emp_qual
            (
                em_id,
                em_no,
                em_education,
                em_course,
                em_specialization,
                em_univ_institute,
                em_year,
                em_mark_grade,
                em_board ,
                institution_name
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },
    EmpExperience: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO hrm_emp_exp
            (
                em_id,
                em_no,
                em_institution,
                em_from,
                em_to,
                em_salary,
                em_position
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },
    DataHighlight: (data) => {

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO hrm_personal_data_highlight
            (
                em_id,
                em_no,
                Details_of_Assignment,
                Key_result_areas,
                Current_salary,
                Others,
                Expected_Monthly_Salary,
                required_to_Join_date,
                Career_Goals,
                Interests_Hobbies,
                skills,
                Demands,
                personal_data_save,
                computer_awareness
           )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    data.em_id,
                    data.em_no,
                    data.assignment,
                    data.archieved,
                    data.Current,
                    data.Others,
                    data.MonthlySalary,
                    data.requiredtoJoin,
                    data.CareerGoals,
                    data.Hobbies,
                    data.skill,
                    data.Demands,
                    data.datesaved,
                    data.computer
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },
    Personaldata: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `  update hrm_emp_master 
                set
                 em_email=?,
                em_mobile=?,
                em_phone=?,
                addressPermnt1=?,
				addressPermnt2=?,
				addressPresent1=?,
				addressPresent2=?,
                em_dob=?
                where em_no=?;
                `,
                [
                    data.em_email,
                    data.em_mobile,
                    data.em_phone,
                    data.Permanentaddrs,
                    data.Permanentaddrs1,
                    data.Presentaddrs,
                    data.Presentaddrs1,
                    data.em_dob,
                    data.em_no
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },
    Personaldataform: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `  update hrm_emp_personal 
                set
                 em_per_address1=?,
                em_per_address2=?,
                em_pmnt_address1=?,
                em_pmnt_address2=?,
				em_passport_no=?,
				em_license_no=?,
				em_cont_mobile=?,
                em_cont_phone=?,
                em_account_no=?,
                emp_email=?,
                em_fathers_name=?,
                emp_dob=?
                where em_no=?;
                `,
                [

                    data.Permanentaddrs,
                    data.Permanentaddrs1,
                    data.Presentaddrs,
                    data.Presentaddrs1,
                    data.em_passport_no,
                    data.em_license_no,
                    data.em_mobile,
                    data.em_phone,
                    data.em_account_no,
                    data.em_email,
                    data.em_fathers_name,
                    data.em_dob,
                    data.em_no
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'successfully upload' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },
    GetPersonaldata: (data, callBack) => {
        pool.query(
            `
            SELECT 
                malayalam_write,
                malayalam_speak,
                malayalam_read, 
                hindi_write, 
                hindi_speak,
                hindi_read,
                english_write,
                english_speak,
                english_read,
                other_langauge,
                other_speak,
                other_write,
                other_read FROM hrm_emp_languages_known where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetPersonaledudata: (data, callBack) => {
        pool.query(
            `
            SELECT 
            em_year,
            em_mark_grade,
            institution_name,
            edu_desc,
            cour_desc,
            spec_desc,
            unver_name,
            board_name
            FROM hrm_emp_qual
            LEFT JOIN hrm_mast_education ON hrm_mast_education.edu_slno =  hrm_emp_qual.em_education
            LEFT JOIN hrm_mast_course ON hrm_mast_course.cour_slno =  hrm_emp_qual.em_course
            LEFT JOIN hrm_mast_specializtion ON hrm_mast_specializtion.spec_slno =  hrm_emp_qual.em_specialization
            LEFT JOIN hrm_university ON hrm_university.unver_slno =  hrm_emp_qual.em_univ_institute
			LEFT JOIN hrm_board ON hrm_board.board_slno =  hrm_emp_qual.em_board
            where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    GetPersonalexpdata: (data, callBack) => {
        pool.query(
            `
            select   
            em_institution,
            em_from,
            em_to,
            em_salary,
            em_position  FROM hrm_emp_exp where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    GetPersonalhighdata: (data, callBack) => {
        pool.query(
            `
            select 
            Details_of_Assignment,
            Key_result_areas,
            Current_salary,
            Others,
            Expected_Monthly_Salary,
            required_to_Join_date,
            Career_Goals,
            Interests_Hobbies,
            skills,
            Demands,
            computer_awareness,
            personal_data_save
             from hrm_personal_data_highlight where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    //update personal data form
    EmpLangaugeKnownupdate: (data) => {

        return new Promise((resolve, reject) => {
            pool.query(
                `update  hrm_emp_languages_known
            set 
               
                malayalam_write=?,
                malayalam_speak=?,
                malayalam_read=?, 
                hindi_write=?, 
                hindi_speak=?,
                hindi_read=?,
                english_write=?,
                english_speak=?,
                english_read=?,
                other_langauge=?,
                other_speak=?,
                other_write=?,
                other_read=?
           
                where em_id=? and
            em_no=?
            `,
                [

                    data.MalayalamWrt,
                    data.Malayalamspk,
                    data.Malayalamrd,
                    data.HindiWrt,
                    data.Hindispk,
                    data.Hindird,
                    data.EngWrt,
                    data.Engspk,
                    data.Engrd,
                    data.other,
                    data.Othrspk,
                    data.OthrWrt,
                    data.Othrsrd,
                    data.em_id,
                    data.em_no,

                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    DataHighlightupdate: (data) => {

        return new Promise((resolve, reject) => {
            pool.query(
                `Update  hrm_personal_data_highlight
            set
              
                Details_of_Assignment=?,
                Key_result_areas=?,
                Current_salary=?,
                Others=?,
                Expected_Monthly_Salary=?,
                required_to_Join_date=?,
                Career_Goals=?,
                Interests_Hobbies=?,
                skills=?,
                Demands=?,
                personal_data_save=?,
                computer_awareness=?
                where   em_id=? and
                em_no=?`,
                [

                    data.assignment,
                    data.archieved,
                    data.Current,
                    data.Others,
                    data.MonthlySalary,
                    data.requiredtoJoin,
                    data.CareerGoals,
                    data.Hobbies,
                    data.skill,
                    data.Demands,
                    data.datesaved,
                    data.computer,
                    data.em_id,
                    data.em_no,
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    Personaldataupdate: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `  update hrm_emp_master 
                set
                 em_email=?,
                em_mobile=?,
                em_phone=?,
                addressPermnt1=?,
				addressPermnt2=?,
				addressPresent1=?,
				addressPresent2=?,
                em_dob=?
                where em_no=?;
                `,
                [
                    data.em_email,
                    data.em_mobile,
                    data.em_phone,
                    data.Permanentaddrs,
                    data.Permanentaddrs1,
                    data.Presentaddrs,
                    data.Presentaddrs1,
                    data.em_dob,
                    data.em_no
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    Personaldataformupdate: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `  update hrm_emp_personal 
                set
                 em_per_address1=?,
                em_per_address2=?,
                em_pmnt_address1=?,
                em_pmnt_address2=?,
				em_passport_no=?,
				em_license_no=?,
				em_cont_mobile=?,
                em_cont_phone=?,
                em_account_no=?,
                emp_email=?,
                em_fathers_name=?,
                emp_dob=?
                where em_no=?;
                `,
                [

                    data.Permanentaddrs,
                    data.Permanentaddrs1,
                    data.Presentaddrs,
                    data.Presentaddrs1,
                    data.em_passport_no,
                    data.em_license_no,
                    data.em_mobile,
                    data.em_phone,
                    data.em_account_no,
                    data.em_email,
                    data.em_fathers_name,
                    data.em_dob,
                    data.em_no
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'Successfully Updated' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    InsertCredentialdata: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_antecedent_form (
                em_id,
                 em_no,
                 state,
                 nation,
                 stateCondact,
                 nationcondact,
                disciplinary,
                 Witness_name,
                Declarationdate,
                Witnessdate,
                datesaved,
                HrdNo,
                Certificates,
                 Copies,
                Reference,
                Continuous
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id, data.em_no, data.state, data.Nation, data.stateCondact, data.NationCondact, data.disciplinary, data.Witness,
                data.Declarationdate, data.Witnessdate, data.datesaved, data.HrdNo, data.Certificates, data.Copies, data.Reference, data.Continuous

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    Getcredentialdata: (data, callBack) => {
        pool.query(
            `
            SELECT 
            state, nation, stateCondact, nationcondact, disciplinary, Witness_name, Declarationdate,
            Witnessdate, datesaved, HrdNo, Certificates, Copies, Reference, Continuous,em_name,
            nation.nat_name as nat_name1,hrm_nation.nat_name as nat_name2,hrm_state.state_name as stname1,state.state_name
            FROM hrm_antecedent_form 
           LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  hrm_antecedent_form.HrdNo
           LEFT JOIN hrm_nation as nation ON nation.nat_slno =  hrm_antecedent_form.nation
           LEFT JOIN hrm_nation ON hrm_nation.nat_slno =  hrm_antecedent_form.nationcondact
            LEFT JOIN hrm_state ON hrm_state.state_slno =  hrm_antecedent_form.state
           LEFT JOIN hrm_state as state ON state.state_slno =  hrm_antecedent_form.stateCondact
            where hrm_antecedent_form.em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    EmpCredentialdata: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO hrm_credential_form
            (
                 em_no, em_id, original_certificates, Copies, Registration, screenshot,
                RegistrationCopies, OriginalChecked, TrainingCopies, datesaved, Declarationdate, HrdNo
           )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
                [data.em_no,
                data.em_id,
                data.original,
                data.Copies,
                data.Registration,
                data.screenshot,
                data.RegistrationCopies,
                data.OriginalChecked,
                data.TrainingCopies,
                data.datesaved,
                data.Declarationdate,
                data.HrdNo
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    EmpRegistration: (data) => {

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO hrm_credential_registration
            (
             em_id,em_no,NameOfReg,RegAuthority,RegNo,RegDate,Validity
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    EmpTraining: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO hrm_credential_training_details
            (
             em_no,em_id,NameOfpgrm,from_date,to_date,conducted
           )
            VALUES ?`,
                [
                    data

                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: error })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    Getcredentialveridataedu: (data, callBack) => {

        pool.query(
            `
            SELECT 
            original_certificates,Copies,Registration,screenshot,RegistrationCopies,OriginalChecked,
            TrainingCopies,datesaved,Declarationdate,HrdNo,em_name
            FROM hrm_credential_form
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  hrm_credential_form.HrdNo
            where hrm_credential_form.em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    Getcredentialregistration: (data, callBack) => {
        pool.query(
            `
            SELECT 
            registration_sl_no,NameOfReg, RegAuthority, RegNo, RegDate, Validity FROM hrm_credential_registration where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    GetcredentialTraining: (data, callBack) => {

        pool.query(
            `
            SELECT 
            Training_sl_no, NameOfpgrm, from_date, to_date, conducted FROM hrm_credential_training_details where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    getHODincharge: (data, callBack) => {

        pool.query(
            `SELECT emp_id,em_name ,auth_post FROM hrm_authorization_assign
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id =  hrm_authorization_assign.emp_id
              WHERE dept_section =? AND auth_post=1;`,
            [
                data.dept_sec,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertOrientationdata: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_orientation_checklists (
                em_id,
                em_no,
                WorkStation,
                DepartmentalPolices,
                Duties,
                DepartmentalObjective,
                PerformanceEvaluation,
                QualityManagment,
                FireFighting,
                GroomingStandards,
                emp_date,
                hod_datesaved
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id, data.emno, data.WorkStation, data.DepartmentalPolices, data.Duties, data.DepartmentalObjective, data.PerformanceEvaluation, data.QualityManagment,
                data.FireFighting, data.GroomingStandards, data.datesaved, data.date

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    Getorientationdata: (data, callBack) => {

        pool.query(
            `
            SELECT 
            WorkStation, DepartmentalPolices, Duties, DepartmentalObjective,
             PerformanceEvaluation, QualityManagment, FireFighting, GroomingStandards, emp_date, hod_datesaved
             FROM hrm_orientation_checklists where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetTrainingData: (data, callBack) => {

        pool.query(
            `
            SELECT ROW_NUMBER() OVER () as int_slno, indct_emp_no, schedule_no,hrm_emp_master.em_id,hrm_emp_master.em_no,
             training_induction_schedule.schedule_type,training_induction_schedule.schedule_topic,training_induction_schedule.trainers,
             training_induction_schedule.induction_date,
             training_topic.topic_slno,training_topic.training_topic_name,training_topic.hours,
             training_induction_pretest.mark as induct_pre_mark,training_induct_posttest.mark as induct_post_mark,
             training_induction_retest.retest_mark as induct_retest_mark,
             training_induction_emp_details.question_count as induct_quest_count,training_induction_emp_details.training_status,
             training_induction_emp_details.online_mode,training_induction_emp_details.offline_mode,training_induction_emp_details.retest,
             training_induction_emp_details.pretest_status,training_induction_emp_details.posttest_status,
             
               hrm_department.dept_id,hrm_department.dept_name,hrm_dept_section.sect_id,hrm_dept_section.sect_name,
             designation.desg_slno,designation.desg_name,hrm_authorization_assign.auth_post
             
             FROM training_induction_emp_details
             LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN training_induction_schedule ON training_induction_schedule.schedule_slno=training_induction_emp_details.schedule_no
             LEFT JOIN training_topic ON training_topic.topic_slno=training_induction_schedule.schedule_topic
             LEFT JOIN training_induction_pretest ON training_induction_pretest.emp_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN training_induct_posttest ON training_induct_posttest.emp_id=training_induction_emp_details.indct_emp_no
             LEFT JOIN training_induction_retest ON training_induction_retest.retest_em_no=training_induction_emp_details.indct_emp_no
             
              LEFT JOIN hrm_department ON hrm_department.dept_id=training_induction_emp_details.induct_emp_dept
             LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id=training_induction_emp_details.induct_emp_sec
             LEFT JOIN designation ON designation.desg_slno=hrm_emp_master.em_designation
             left join hrm_authorization_assign on hrm_authorization_assign.dept_section=training_induction_emp_details.induct_emp_sec
             LEFT JOIN hrm_emp_master HO ON HO.em_id=hrm_authorization_assign.emp_id
             
             WHERE hrm_emp_master.em_id=? and hrm_authorization_assign.auth_post=1
            `,
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

    GetTrainersData: (data, callBack) => {
        pool.query(
            `
            select GROUP_CONCAT(em_name) as emname
            from hrm_emp_master
            where em_id in(?);
            `,
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

    EmpCredentialTraining: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_doc_training
            (
            Training_name, Condcuted, em_no, em_id, department
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the Training details' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    Empcertificate: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_doc_certification
            (
                em_id, em_no, Certification, certification_date
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the certificate ' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    PrivilegingData: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_doc_details (
                 specialization,
                 Orginal_Certificates,
                 Registration,
                  Orginal,
                 Copies,
                 Screenshot,
                 copies_Training,
                 Registration_Copies,
                 em_no,
                 em_id,
                 department,
                 staff_hrd,
                 date_saved,
                 insurance_yes,
                 insurance_no,
                 details,
                 Outpatient_yes,
                 Outpatient_no,
                 Request_clinical,
                 Admitting_yes,
                 Admitting_no,
                 Operating_yes,
                 Operating_no
                    )
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [

                    data.specialization, data.original, data.Registration, data.OriginalChecked, data.Copies, data.screenshot, data.TrainingCopies, data.RegistrationCopies,
                    data.em_no, data.em_id, data.department, data.HrdNo, data.datesaved, data.insuranceyes, data.insuranceno, data.details, data.Outpatientyes, data.Outpatientno
                    , data.clinical, data.Admittingyes, data.Admittingno, data.Operatingyes, data.Operatingno
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the Privileging Data ' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    Previlegedocdata: (data) => {

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_doc_privilege
            (
                name_procedure, procedure_unsupervised, supervision, interested, em_no, em_id, department, decision
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please enter the all details' })
                    } else {
                        resolve({ status: 1, message: 'Data inserted Sucessfully' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    GetcredentialdocTraining: (data, callBack) => {
        pool.query(
            `
            SELECT  Training_name, Condcuted, em_no, em_id FROM credential_doc_training where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetcredentialdocCertificate: (data, callBack) => {
        pool.query(
            `
            SELECT  em_id, em_no, Certification, certification_date FROM credential_doc_certification where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    Getcredentialdocdetails: (data, callBack) => {
        pool.query(
            `
          SELECT specialization,
            Orginal_Certificates,
            Registration, Orginal,
            Copies, Screenshot,
            copies_Training,
            Registration_Copies,
            credential_doc_details.em_no,
            credential_doc_details.em_id,
            department,
            staff_hrd,
             date_saved,
            insurance_yes,
            insurance_no,
            details,
             Outpatient_yes,
             Outpatient_no,
            Request_clinical,
            Admitting_yes,
            Admitting_no,
             Operating_yes,
             Operating_no,
             hrm_emp_master.em_name,
             Hod_doc_approvalDate,
             Hod_comments,
             MS_doc_approvalDate,
             MS_comments,
            e.em_name as MsApproval_name,
            CP_doc_approvalDate,
            CP_comments,
            f.em_name as CpApproval_name,
            MD_Doc_approvalDate,
            Md_comments,
            g.em_name as MdApproval_name
            FROM credential_doc_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=credential_doc_details.approval_id_hod
			LEFT JOIN hrm_emp_master as e ON e.em_id=credential_doc_details.approval_id_ms
			LEFT JOIN hrm_emp_master as f ON f.em_id=credential_doc_details.approval_id_cp
            LEFT JOIN hrm_emp_master as g ON g.em_id=credential_doc_details.approval_id_md
            where credential_doc_details.em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetcredentialprivilageData: (data, callBack) => {
        pool.query(
            `
            SELECT  name_procedure,
             procedure_unsupervised,
              supervision,
            interested,
            em_no,
            em_id,
            department,
             decision
            FROM credential_doc_privilege where em_no=?;

            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    EmpCredentialnursingTraining: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_nurse_training
            (
            Training_name, Condcuted, em_no, em_id, department
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the Training details' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },


    Empnursingcertificate: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_nursing_certification
            (
                em_id, em_no, Certification, certification_date
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the Training details' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },
    PrivilegingnursingData: (data) => {

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_nursing_details (
                 specialization,
                 Orginal_Certificates,
                 Registration,
                  Orginal,
                 Copies,
                 Screenshot,
                 copies_Training,
                 Registration_Copies,
                 em_no,
                 em_id,
                 department,
                 staff_hrd,
                 date_saved
                    )
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [

                    data.specialization, data.original, data.Registration, data.OriginalChecked, data.Copies, data.screenshot, data.TrainingCopies, data.RegistrationCopies,
                    data.em_no, data.em_id, data.department, data.HrdNo, data.datesaved
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the Privileging Data ' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },
    nursingdata: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_nursing_privilege
            (
                name_procedure, procedure_unsupervised, supervision, interested, em_no, em_id, department, decision
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please enter the all details' })
                    } else {
                        resolve({ status: 1, message: 'Data inserted Sucessfully' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    GetcredentialnursingTraining: (data, callBack) => {
        pool.query(
            `
            SELECT  Training_name, Condcuted, em_no, em_id FROM credential_nurse_training where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetcredentialnursingCertificate: (data, callBack) => {
        pool.query(
            `
            SELECT  em_id, em_no, Certification, certification_date FROM credential_nursing_certification where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    Getcredentialnursingdetails: (data, callBack) => {
        pool.query(
            `
             SELECT
             specialization,
            Orginal_Certificates,
            Registration, Orginal,
            Copies, Screenshot,
            copies_Training,
            Registration_Copies,
            credential_nursing_details.em_no,
             credential_nursing_details.em_id,
            department,
            staff_hrd,
             date_saved,
            hrm_emp_master.em_name,
             Hod_doc_approvalDate,
             Hod_comments,
            MS_Nurse_approvalDate,
            MS_comments,
            e.em_name as MsApproval_name,
            CP_doc_approvalDate,
            CP_comments,
            e.em_name as CpApproval_name,
            MD_Nurse_approvalDate,
            Md_comments,
              g.em_name as MdApproval_name
            FROM credential_nursing_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=credential_nursing_details.approval_id_hod
            LEFT JOIN hrm_emp_master as e ON e.em_id=credential_nursing_details.approval_id_ms
            LEFT JOIN hrm_emp_master as f ON f.em_id=credential_nursing_details.approval_id_cp
            LEFT JOIN hrm_emp_master as g ON g.em_id=credential_nursing_details.approval_id_md
            where credential_nursing_details.em_no=?
            ;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    GetcredentialnursingData: (data, callBack) => {
        pool.query(
            `
            SELECT  name_procedure,
             procedure_unsupervised,
              supervision,
            interested,
            em_no,
            em_id,
            department,
             decision
            FROM credential_nursing_privilege where em_no=?;

            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    EmpCredentialparaTraining: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_para_training
            (
            Training_name, Condcuted, em_no, em_id, department
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the Training details' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    Empcertificatepara: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_para_certification
            (
                em_id, em_no, Certification, certification_date
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the Training details' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },


    PrivilegingDatapara: (data) => {

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_para_details (
                 specialization,
                 Orginal_Certificates,
                 Registration,
                  Orginal,
                 Copies,
                 Screenshot,
                 copies_Training,
                 Registration_Copies,
                 em_no,
                 em_id,
                 department,
                 staff_hrd,
                 date_saved
                    )
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [

                    data.specialization, data.original, data.Registration, data.OriginalChecked, data.Copies, data.screenshot, data.TrainingCopies, data.RegistrationCopies,
                    data.em_no, data.em_id, data.department, data.HrdNo, data.datesaved
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the Privileging Data ' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    Previlegedocdatapara: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_para_privilege
            (
                name_procedure, procedure_unsupervised, supervision, interested, em_no, em_id, department, decision
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {

                    if (error) {
                        reject({ status: 0, message: 'Please enter the all details' })
                    } else {
                        resolve({ status: 1, message: 'Data inserted Sucessfully' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    GetcredentialparaTraining: (data, callBack) => {
        pool.query(
            `
            SELECT  Training_name, Condcuted, em_no, em_id FROM credential_para_training where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    GetcredentialparaCertificate: (data, callBack) => {
        pool.query(
            `
            SELECT  em_id, em_no, Certification, certification_date FROM credential_para_certification where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    Getcredentialparadetails: (data, callBack) => {
        pool.query(
            `
            SELECT
             specialization,
            Orginal_Certificates,
            Registration, Orginal,
            Copies, Screenshot,
            copies_Training,
            Registration_Copies,
            credential_para_details.em_no,
             credential_para_details.em_id,
            department,
            staff_hrd,
             date_saved,
              hrm_emp_master.em_name,
             Hod_para_approvalDate,
             Hod_comments,
            MS_Para_approvalDate,
             MS_comments,
            e.em_name as MsApproval_name,
            CP_Para_approvalDate,
            CP_comments,
            f.em_name as CpApproval_name,
            MD_Para_approvalDate,
            Md_comments,
            g.em_name as MdApproval_name
            FROM credential_para_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=credential_para_details.approval_id_hod
            LEFT JOIN hrm_emp_master as e ON e.em_id=credential_para_details.approval_id_ms
            LEFT JOIN hrm_emp_master as f ON f.em_id=credential_para_details.approval_id_cp
            LEFT JOIN hrm_emp_master as g ON g.em_id=credential_para_details.approval_id_md
            where credential_para_details.em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    GetcredentialparaprivilageData: (data, callBack) => {
        pool.query(
            `
            SELECT  name_procedure,
             procedure_unsupervised,
              supervision,
            interested,
            em_no,
            em_id,
            department,
             decision
            FROM credential_para_privilege where em_no=?;

            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    EmpCredentialotherTraining: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_other_training
            (
            Training_name, Condcuted, em_no, em_id, department
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the Training details' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    Empcertificateother: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_other_certification
            (
                em_id, em_no, Certification, certification_date
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the certificate ' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    PrivilegingDataother: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_other_details (
                 specialization,
                 Orginal_Certificates,
                 Registration,
                  Orginal,
                 Copies,
                 Screenshot,
                 copies_Training,
                 Registration_Copies,
                 em_no,
                 em_id,
                 department,
                 staff_hrd,
                 date_saved,
                 insurance_yes,
                 insurance_no,
                 details,
                 Outpatient_yes,
                 Outpatient_no,
                 Request_clinical,
                 Admitting_yes,
                 Admitting_no,
                 Operating_yes,
                 Operating_no
                    )
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [

                    data.specialization, data.original, data.Registration, data.OriginalChecked, data.Copies, data.screenshot, data.TrainingCopies, data.RegistrationCopies,
                    data.em_no, data.em_id, data.department, data.HrdNo, data.datesaved, data.insuranceyes, data.insuranceno, data.details, data.Outpatientyes, data.Outpatientno
                    , data.clinical, data.Admittingyes, data.Admittingno, data.Operatingyes, data.Operatingno
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please Enter the Privileging Data ' })
                    } else {
                        resolve({ status: 1, message: 'success' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    Previlegedocdataother: (data) => {

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO credential_other_privilege
            (
              name_procedure, Observer, supervision, Procedures, Perform_procedure, em_no, em_id, department, decision
           )
            VALUES ?`,
                [
                    data
                ],
                (error, results, feilds) => {
                    if (error) {
                        reject({ status: 0, message: 'Please enter the all details' })
                    } else {
                        resolve({ status: 1, message: 'Data inserted Sucessfully' })
                    }
                }
            )
        }).then((result) => {
            return result
        }).catch((error) => {
            return { status: 0 }
        })
    },

    GetcredentialotherTraining: (data, callBack) => {
        pool.query(
            `
            SELECT  Training_name, Condcuted, em_no, em_id FROM credential_other_training where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetcredentialotherCertificate: (data, callBack) => {
        pool.query(
            `
            SELECT  em_id, em_no, Certification, certification_date FROM credential_other_certification where em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    Getcredentialotherdetails: (data, callBack) => {
        pool.query(
            `
            SELECT specialization,
            Orginal_Certificates,
            Registration, Orginal,
            Copies, Screenshot,
            copies_Training,
            Registration_Copies,
            credential_other_details.em_no,
             credential_other_details.em_id,
            department,
            staff_hrd,
             date_saved,
            insurance_yes,
            insurance_no,
            details,
             Outpatient_yes,
             Outpatient_no,
            Request_clinical,
            Admitting_yes,
            Admitting_no,
             Operating_yes,
             Operating_no,
             Hod_Other_approvalDate,
             Hod_comments,
              hrm_emp_master.em_name,
             MS_Other_approvalDate,
             MS_comments,
            e.em_name as MsApproval_name,
            CP_Other_approvalDate,
            CP_comments,
             f.em_name as CpApproval_name,
             MD_comments,
             MD_Other_approvalDate,
            g.em_name as MdApproval_name
            FROM credential_other_details
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=credential_other_details.approval_id_hod
            LEFT JOIN hrm_emp_master as e ON e.em_id=credential_other_details.approval_id_ms
             LEFT JOIN hrm_emp_master as f ON f.em_id=credential_other_details.approval_id_cp
            LEFT JOIN hrm_emp_master as g ON g.em_id=credential_other_details.approval_id_md
            where credential_other_details.em_no=?;
            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetcredentialotherprivilageData: (data, callBack) => {
        pool.query(
            `
            SELECT
            name_procedure,
            Observer,
            supervision,
            Procedures,
            Perform_procedure,
            department,
            decision
             
            FROM credential_other_privilege where em_no=?;

            `,
            [
                data.em_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetHodapprovalData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_doc_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_doc_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_doc_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_doc_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where department=? and required_hod_status=0;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetHodapprovalNurseData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_nursing_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_nursing_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_nursing_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_nursing_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where department=? and required_hod_status=0;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetHodapprovalParaData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_para_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_para_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_para_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_para_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where department=? and required_hod_status=0;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetHodapprovalotheraData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_other_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_other_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_other_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_other_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where department=? and required_hod_status=0;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetMSapprovalData: (data, callBack) => {
        pool.query(
            `
              SELECT
            credential_doc_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_doc_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_doc_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_doc_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where required_ms_status=0 and required_hod_status=1;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    GetMSapprovalNurseData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_nursing_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_nursing_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_nursing_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_nursing_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where required_ms_status=0 and required_hod_status=1;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    GetMSapprovalParaData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_para_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_para_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_para_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_para_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where required_ms_status=0 and required_hod_status=1;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    GetMSapprovalotheraData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_other_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_other_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_other_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_other_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where  required_ms_status=0 and required_hod_status=1;
            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },



    GetCPapprovalData: (data, callBack) => {
        pool.query(
            `
              SELECT
            credential_doc_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_doc_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_doc_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_doc_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where required_cp_status=0 and required_ms_status=1;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetCPapprovalNurseData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_nursing_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_nursing_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_nursing_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_nursing_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where required_cp_status=0 and required_ms_status=1;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    GetCPapprovalParaData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_para_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_para_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_para_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_para_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where required_cp_status=0 and required_ms_status=1;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    GetCPapprovalotheraData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_other_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_other_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_other_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_other_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where  required_cp_status=0 and required_ms_status=1;
            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },



    GetMDapprovalData: (data, callBack) => {
        pool.query(
            `
              SELECT
            credential_doc_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_doc_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_doc_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_doc_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where required_md_status=0 and required_cp_status=1;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetMDapprovalNurseData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_nursing_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_nursing_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_nursing_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_nursing_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where required_md_status=0 and required_cp_status=1;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetMDapprovalParaData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_para_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_para_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_para_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_para_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where required_md_status=0 and required_cp_status=1;

            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    GetMDapprovalotheraData: (data, callBack) => {
        pool.query(
            `
            SELECT
            credential_other_details.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name
            FROM credential_other_details
			LEFT JOIN hrm_emp_master ON hrm_emp_master.em_no =  credential_other_details.em_no
			LEFT JOIN hrm_department ON hrm_department.dept_id =  credential_other_details.department
			LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id =  hrm_emp_master.em_dept_section
			LEFT JOIN designation ON designation.desg_slno =  hrm_emp_master.em_designation
            where  required_md_status=0  and required_cp_status=1;
            `,
            [
                data.department,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertCredHod: (data, callBack) => {
        pool.query(
            `UPDATE credential_doc_details 
            SET  required_hod_status=1 ,
            approval_id_hod=?,
            Hod_doc_approvalDate=?,
            Hod_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.Hoddatesaved, data.HodRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    InsertCredNurseHod: (data, callBack) => {
        pool.query(
            `UPDATE credential_nursing_details 
            SET  required_hod_status=1 ,
            approval_id_hod=?,
            Hod_doc_approvalDate=?,
            Hod_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.Hoddatesaved, data.HodRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    InsertCredParaHod: (data, callBack) => {
        pool.query(
            `UPDATE credential_para_details 
            SET  required_hod_status=1 ,
            approval_id_hod=?,
            Hod_para_approvalDate=?,
            Hod_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.Hoddatesaved, data.HodRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    InsertCredOtherHod: (data, callBack) => {
        pool.query(
            `UPDATE credential_other_details 
            SET  required_hod_status=1 ,
            approval_id_hod=?,
            Hod_Other_approvalDate=?,
            Hod_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.Hoddatesaved, data.HodRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    InsertCredMS: (data, callBack) => {
        pool.query(
            `UPDATE credential_doc_details 
            SET  required_ms_status=1 ,
            approval_id_ms=?,
            MS_doc_approvalDate=?,
            MS_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertCredNurseMS: (data, callBack) => {
        pool.query(
            `UPDATE credential_nursing_details 
            SET  required_ms_status=1 ,
            approval_id_ms=?,
            MS_Nurse_approvalDate=?,
            MS_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertCredParaMS: (data, callBack) => {
        pool.query(
            `UPDATE credential_para_details 
            SET  required_ms_status=1 ,
            approval_id_ms=?,
            MS_Para_approvalDate=?,
            MS_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertCredOtherMS: (data, callBack) => {
        pool.query(
            `UPDATE credential_other_details 
            SET  required_ms_status=1 ,
            approval_id_ms=?,
            MS_Other_approvalDate =?,
            MS_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertCredDocCP: (data, callBack) => {
        pool.query(
            `UPDATE credential_doc_details 
            SET  required_cp_status=1 ,
            approval_id_cp=?,
            CP_doc_approvalDate=?,
            CP_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertCredNurseCP: (data, callBack) => {
        pool.query(
            `UPDATE credential_nursing_details 
            SET  required_cp_status=1 ,
            approval_id_cp=?,
            CP_doc_approvalDate=?,
            CP_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertCredParaCP: (data, callBack) => {
        pool.query(
            `UPDATE credential_para_details 
            SET  required_cp_status=1 ,
            approval_id_cp=?,
            CP_Para_approvalDate=?,
            CP_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertCredOtherCP: (data, callBack) => {
        pool.query(
            `UPDATE credential_other_details 
            SET  required_cp_status=1 ,
            approval_id_cp=?,
            CP_Other_approvalDate=?,
            CP_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertCredDocMD: (data, callBack) => {
        pool.query(
            `UPDATE credential_doc_details 
            SET  required_md_status=1 ,
            approval_id_md=?,
            MD_Doc_approvalDate=?,
            Md_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    InsertCredNurseMD: (data, callBack) => {
        pool.query(
            `UPDATE credential_nursing_details 
            SET  required_md_status=1 ,
            approval_id_md=?,
            MD_Nurse_approvalDate=?,
            Md_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },


    InsertCredParaMD: (data, callBack) => {
        pool.query(
            `UPDATE credential_para_details 
            SET  required_md_status=1 ,
            approval_id_md=?,
            MD_Para_approvalDate=?,
            Md_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },

    InsertCredOtherMD: (data, callBack) => {

        pool.query(
            `UPDATE credential_other_details 
            SET  required_md_status=1 ,
            approval_id_md=?,
            MD_Other_approvalDate=?,
            MD_comments=?
            WHERE em_no=? `,
            [
                data.em_id, data.MSdatesaved, data.MSRemark, data.em_no
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