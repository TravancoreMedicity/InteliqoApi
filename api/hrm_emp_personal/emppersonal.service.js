const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_emp_personal (
                em_id,
                em_no,
                em_per_address1,
                em_per_address2,
                em_per_pincode,
                em_pmnt_address1,
                em_pmnt_address2,
                em_pmnt_pincode,
                em_passport_no,
                em_pan_no,
                em_adhar_no,
                em_license_no,
                em_religion,
                em_bloodgroup,
                em_maritalstatus,
                em_spouse_guardian,
                em_cont_mobile,
                em_cont_phone,
                em_bank,
                em_account_no,
                em_ifsc,
                emp_dob,
                create_user,
                emp_email,
                em_region,
                hrm_region2,
                emp_yeargae,
                salarytype,
                em_bank_branch,
                relation,
                relative_name
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.em_per_address1,
                data.em_per_address2,
                data.em_per_pincode,
                data.em_pmnt_address1,
                data.em_pmnt_address2,
                data.em_pmnt_pincode,
                data.em_passport_no,
                data.em_pan_no,
                data.em_adhar_no,
                data.em_license_no,
                data.em_religion,
                data.em_bloodgroup,
                data.em_maritalstatus,
                data.em_spouse_guardian,
                data.em_cont_mobile,
                data.em_cont_phone,
                data.em_bank,
                data.em_account_no,
                data.em_ifsc,
                data.emp_dob,
                data.create_user,
                data.emp_email,
                data.em_region,
                data.hrm_region2,
                data.emp_yeargae,
                data.salarytype,
                data.em_bank_branch,
                data.relation,
                data.relative_name
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
            `UPDATE hrm_emp_personal 
                SET 
                em_per_address1=?,
                em_per_address2=?,
                em_per_pincode=?,
                em_pmnt_address1 =?,
                em_pmnt_address2=?, 
                em_pmnt_pincode=?,
                em_passport_no=?,
                em_pan_no=?,
                em_adhar_no =?,
                em_license_no =?,
                em_religion =?,
                em_bloodgroup =?,
                em_maritalstatus =?,
                em_spouse_guardian =?,
                em_cont_mobile =?,
                em_cont_phone =?,
                em_bank =?,
                em_account_no =?,
                em_ifsc =?,
                edit_user =?,
                salarytype=?,
                em_bank_branch=?,
                relation=?,
                relative_name=?
                WHERE em_no = ?`,
            [

                data.em_per_address1,
                data.em_per_address2,
                data.em_per_pincode,
                data.em_pmnt_address1,
                data.em_pmnt_address2,
                data.em_pmnt_pincode,
                data.em_passport_no,
                data.em_pan_no,
                data.em_adhar_no,
                data.em_license_no,
                data.em_religion,
                data.em_bloodgroup,
                data.em_maritalstatus,
                data.em_spouse_guardian,
                data.em_cont_mobile,
                data.em_cont_phone,
                data.em_bank,
                data.em_account_no,
                data.em_ifsc,
                data.create_user,
                data.salarytype,
                data.em_bank_branch,
                data.relation,
                data.relative_name,
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
    getDataBySlno: (id, callBack) => {
        pool.query(
            `SELECT 
            em_id,
              em_no,
              em_per_address1,
              em_per_address2,
              em_per_pincode,
              em_pmnt_address1,
              em_pmnt_address2,
              em_pmnt_pincode,
              em_passport_no,
              em_pan_no,
              em_adhar_no,
              em_license_no,
              em_religion,
              em_bloodgroup,
              em_maritalstatus,
              em_spouse_guardian,
              em_cont_mobile,
              em_cont_phone,
              em_bank,
              em_account_no,
              em_ifsc,
              emp_dob,
              create_user,
              emp_email,
              em_region,
              hrm_region2,
              emp_yeargae,
              em_bank_branch
          FROM hrm_emp_personal
          WHERE em_no = ?`,
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
    getDataById: (id, callBack) => {
        pool.query(
            `SELECT 
                emper_slno,
                em_no,
                em_per_address1,
                em_per_address2,
                em_per_address3,
                em_per_pincode,
                em_pmnt_address1,
                em_pmnt_address2,
                em_pmnt_address3,
                em_pmnt_pincode,
                em_passport_no,
                em_pan_no,
                em_adhar_no,
                em_license_no,
                em_nationality,
                em_religion,
                em_bloodgroup,
                em_maritalstatus,
                em_spouse_guardian,
                em_cont_mobile,
                em_cont_phone,
                em_notice_period,
                em_pers_remarks,
                em_bank,
                em_account_no,
                em_ifsc,
                create_user,
                edit_user,
                em_bank_branch
            FROM hrm_emp_personal
            WHERE emper_slno =? `,
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

    checkpersonaldata: (id, callBack) => {

        pool.query(
            `SELECT 
                emper_slno,
                em_no              
            FROM hrm_emp_personal
            WHERE em_no =? `,
            [
                id.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createFamilyDetails: (data, callBack) => {
        pool.query(
            `
            INSERT INTO 
            hrm_emp_family_details(
                employee_id,
                employee_no,
                relation_number,
                mrd_number,
                patient_name,
                patient_sex,
                patient_age,
                patient_mob,
                patient_address1,
                patient_address2
                )
            VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [
                data.employee_id,
                data.employee_no,
                data.relation_number,
                data.mrd_number,
                data.patient_name,
                data.patient_sex,
                data.patient_age,
                data.patient_mob,
                data.patient_address1,
                data.patient_address2
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDetailsbyId: (id, callBack) => {
        pool.query(
            `SELECT details_slno,relation_number,patient_name,mrd_number 
            FROM hrm_emp_family_details where employee_id=? `,
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
    deleteRow: (id, callBack) => {
        pool.query(
            `DELETE FROM hrm_emp_family_details WHERE details_slno = ?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    createLanguagesKnown: (data, callBack) => {
        pool.query(
            `INSERT INTO
            hrm_emp_languages_known(
                em_id,
                em_no,
                malayalam_speak,
                malayalam_read,
                malayalam_write,
                hindi_write,
                hindi_speak,
                hindi_read,
                english_write,
                english_speak,
                english_read,
                tamil_write,
                tamil_speak,
                tamil_read,
                arabic_write,
                arabic_speak,
                arabic_read
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_id,
                data.em_no,
                data.malayalam_speak,
                data.malayalam_read,
                data.malayalam_write,
                data.hindi_write,
                data.hindi_speak,
                data.hindi_read,
                data.english_write,
                data.english_speak,
                data.english_read,
                data.tamil_write,
                data.tamil_speak,
                data.tamil_read,
                data.arabic_write,
                data.arabic_speak,
                data.arabic_read
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkLangabyEmp: (id, callBack) => {
        pool.query(
            ` SELECT 
            row_slno,
            em_no              
        FROM hrm_emp_languages_known
        WHERE em_no =?   `,
            [
                id.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateLanguage: (data, callBack) => {
        pool.query(
            `UPDATE hrm_emp_languages_known 
                SET 
                malayalam_speak=?,
                malayalam_read=?,
                malayalam_write=?,
                hindi_write=?,
                hindi_speak=?,
                hindi_read=?,
                english_write=?,
                english_speak=?,
                english_read=?,
                tamil_write=?,
                tamil_speak=?,
                tamil_read=?,
                arabic_write=?,
                arabic_speak=?,
                arabic_read=?
                WHERE em_no = ?`,
            [
                data.malayalam_speak,
                data.malayalam_read,
                data.malayalam_write,
                data.hindi_write,
                data.hindi_speak,
                data.hindi_read,
                data.english_write,
                data.english_speak,
                data.english_read,
                data.tamil_write,
                data.tamil_speak,
                data.tamil_read,
                data.arabic_write,
                data.arabic_speak,
                data.arabic_read,
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
    getLangaugesByEmpno: (id, callBack) => {
        pool.query(
            `SELECT
            em_id,
         em_no,
         malayalam_speak,
         malayalam_read,
         malayalam_write,
         hindi_write,
         hindi_speak,
         hindi_read,
         english_write,
         english_speak,
         english_read,
         tamil_write,
         tamil_speak,
         tamil_read,
         arabic_write,
         arabic_speak,
         arabic_read
        FROM hrm_emp_languages_known where em_no=?`,
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
    checkAccountExist: (id, callBack) => {
        pool.query(
            `SELECT 
                emper_slno,
                em_no              
            FROM hrm_emp_personal
            WHERE em_account_no =? and em_id!=?    `,
            [
                id.em_account_no,
                id.em_id
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