const { log } = require('winston');
const pool = require('../../config/database');

module.exports = {

    insertapplicationform: (data, callBack) => {

        pool.query(
            `INSERT INTO hrm_application_form (
                salutation,
                first_name,
                last_name,
                middle_name,
                email,
                mobile_num,
                region,
                religion,
                dob,
                opportunity_status,
                vaccination_status,
                helath_status,
                health_details,
                hear_this_job,
                criminal_status,
                criminal_details,
                legal_obligation_status,
                legal_obligation_details,
                relatives_friends_status,
                relatives_friends_email,
                relatives_friends_name,
                relatives_friends_empNo,
                agree_status,
                agree_marketing_status,
                recruitment_status,
                recruitment_unit,
                application_no,
                Experience_details,
                Education_details,
                Job_applied
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.value, data.name, data.lname, data.mname, data.email, data.mobile, data.Region, data.Religion, data.dob, data.opportunity_status,
                data.vaccination_status, data.helath_status, data.Health, data.job, data.criminal_status, data.criminal, data.legal_obligation_status,
                data.obligation, data.relatives_friends_status, data.empemail, data.empname, data.empno,
                data.agree_status, data.agree_marketing_status, data.recruitment_sts,
                data.recruitment, data.applicationSlno, JSON.stringify(data.expdata), JSON.stringify(data.edudata), JSON.stringify(data.selectedVacancies)
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateapplicationslno: (data, callBack) => {
        pool.query(
            `update master_serialno set 
            serial_current=serial_current+1
            where 
            serial_slno=8`,
            [


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    vacancyList: (data, callBack) => {

        pool.query(
            `SELECT
             manpower_required_no,
             desg_id,
             desg_name
              FROM hrm_manpower_request
            LEFT JOIN designation ON hrm_manpower_request.desg_id = designation.desg_slno
           WHERE JSON_CONTAINS(qualification, '?')  `,
            [
                data.education
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getname: (data, callBack) => {

        pool.query(
            `SELECT
            edu_desc
              FROM hrm_mast_education
           WHERE edu_slno= ? `,
            [
                data.education
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getvacancy: (callBack) => {
        pool.query(
            `SELECT  
            hrm_manpower_request.dept_id,
            desg_id,
            manpower_required_no,
            dept_name,
            desg_name,
            qualification
              from  hrm_manpower_request
              LEFT JOIN hrm_department ON hrm_manpower_request.dept_id = hrm_department.dept_id
              LEFT JOIN designation ON hrm_manpower_request.desg_id = designation.desg_slno
            
               `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getapplication: (callBack) => {
        pool.query(
            `SELECT
            application_slno, 
            first_name,
            last_name,
            email,
            Education_details,
            Experience_details,
            Job_applied,
            application_no
              from  hrm_application_form
               `,
            [],
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
            `SELECT
            first_name,
            relg_name,
            reg_name,
            last_name,
            email,
            mobile_num,
            region,
            religion,
            dob,
            application_no,
            Education_details,
            Experience_details
              FROM hrm_application_form
               LEFT JOIN hrm_religion ON hrm_application_form.religion = hrm_religion.relg_slno
                LEFT JOIN hrm_region ON hrm_application_form.region = hrm_region.reg_slno
           WHERE application_no= ? `,
            [
                data.applicationno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    insertshortlistapprove: (data, callBack) => {

        pool.query(
            `INSERT INTO hrm_applicationform_status (
                desg_id,status,application_no
            )values (?,?,?) `,
            [
                data.desgid, data.Shortlist_status, data.application_no
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getstatus: (data, callBack) => {

        pool.query(
            `SELECT
            status
            from hrm_applicationform_status
           WHERE application_no= ? and desg_id=? `,
            [
                data.applicationno, data.desg
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getstatusdata: (data, callBack) => {

        pool.query(
            `SELECT
            *
            from hrm_applicationform_status
            `,
            [

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    insertcallletter: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` UPDATE hrm_applicationform_status 
                    SET  letter_status=? 
                    WHERE application_no = ? AND  desg_id=?`,
                    [val.letter_status, val.appslno, val.desigid],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })

        })
    },
}