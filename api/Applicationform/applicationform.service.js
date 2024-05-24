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
                Job_applied,
                address1,
                address2,
                bloodgrp,
                gender
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.value, data.name, data.lname, data.mname, data.email, data.mobile, data.Region, data.Religion, data.dob, data.opportunity_status,
                data.vaccination_status, data.helath_status, data.Health, data.job, data.criminal_status, data.criminal, data.legal_obligation_status,
                data.obligation, data.relatives_friends_status, data.empemail, data.empname, data.empno,
                data.agree_status, data.agree_marketing_status, data.recruitment_sts,
                data.recruitment, data.applicationSlno, JSON.stringify(data.expdata), JSON.stringify(data.edudata), JSON.stringify(data.selectedVacancies),
                data.addressPermnt1, data.addressPermnt2, data.gender, data.bloodgrp
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

    getselectionedu: (data, callBack) => {
        const conditions = data.map(() => 'JSON_CONTAINS(qualification, CAST(? AS JSON))').join(' OR ');

        pool.query(
            `SELECT
                manpower_required_no,
                desg_id,
                desg_name
             FROM hrm_manpower_request
             LEFT JOIN designation ON hrm_manpower_request.desg_id = designation.desg_slno
             WHERE ${conditions}`,
            data,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
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
              where announcement_status=1
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

    getempselect: (callBack) => {
        pool.query(
            `SELECT  
            em_name,
            em_no
              from  hrm_emp_master
              where em_department=24 and em_status=1 
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
            application_no,
            mobile_num,
            salutation,
            religion,
            region,
            sal_name,
            reg_name,
            reg_pincode,
            relg_name,
            dob
              from  hrm_application_form
              LEFT JOIN hrm_salutation ON hrm_salutation.sa_code = hrm_application_form.salutation
              LEFT JOIN hrm_region ON hrm_region.reg_slno = hrm_application_form.region
              LEFT JOIN hrm_religion ON hrm_religion.relg_slno = hrm_application_form.religion

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
            Experience_details,
            salutation,
            gender,
            address1,
            address2
              FROM hrm_application_form
               LEFT JOIN hrm_religion ON hrm_application_form.religion = hrm_religion.relg_slno
                LEFT JOIN hrm_region ON hrm_application_form.region = hrm_region.reg_slno
           WHERE application_no= ?  `,
            [
                data.applicationno,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getlogindata: (data, callBack) => {
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
            Experience_details,
            Job_applied
              FROM hrm_application_form
               LEFT JOIN hrm_religion ON hrm_application_form.religion = hrm_religion.relg_slno
                LEFT JOIN hrm_region ON hrm_application_form.region = hrm_region.reg_slno
           WHERE application_no= ? and mobile_num=?`,
            [
                data.application_no,
                data.num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getloginselect: (data, callBack) => {

        pool.query(
            `
            SELECT
            Job_applied,
           desg_name,
            desg_slno
       FROM hrm_application_form
       LEFT JOIN designation on JSON_CONTAINS(hrm_application_form.Job_applied,cast(designation.desg_slno as json),'$')
       WHERE application_no = ?
      
            `,
            [
                data.application_no,

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
    insertinterview: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  interview_status=? ,
            mark=?
            WHERE application_no = ? and desg_id=?`,
            [
                data.interview_status, data.crtanswer, data.application_no, data.desigid
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertInchargeinterview: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  incharge_interview_status=? ,
            total_Incharge_inter_mark=?,
            subject_mark=?,
            exp_mark=?,
            edu_mark=?,
            technical_mark=?,
            presentation_mark=?,
            analytical_mark=?,
            communication_mark=?,
            attitude_mark=?,
            confidence_mark=?,
            bodylang_mark=?,
            incharge_remark=?
            WHERE application_no = ? and desg_id=?`,
            [
                data.incharge_interview_status,
                data.totalmark,
                data.subjectmark,
                data.expmark,
                data.edumark,
                data.techmark,
                data.presentationmark,
                data.analyticalmark,
                data.communicationmark,
                data.attitudeark,
                data.confidencemark,
                data.bodylanmark,
                data.remark,
                data.application_no,
                data.desg_id,
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertHodinterview: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  Hod_Interview_status=? ,
            Hod_interview_mark=?,
            Hod_sub_mark=?,
            Hod_exp_mark=?,
            Hod_edu_mark=?,
            Hod_tech_mark=?,
            Hod_pre_mark=?,
            Hod_analy_mark=?,
            Hod_commu_mark=?,
            Hod_atti_mark=?,
            Hod_confi_mark=?,
            Hod_bodylang_mark=?,
            hod_remark=?
            WHERE application_no = ? and desg_id=?`,
            [
                data.incharge_interview_status,
                data.totalmark,
                data.subjectmark,
                data.expmark,
                data.edumark,
                data.techmark,
                data.presentationmark,
                data.analyticalmark,
                data.communicationmark,
                data.attitudeark,
                data.confidencemark,
                data.bodylanmark,
                data.remark,
                data.application_no,
                data.desg_id,
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertMsinterview: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  Ms_Interview_status=? ,
            Ms_Interview_Mark=?,
            Ms_sub_mark=?,
            Ms_exp_mark=?,
            Ms_edu_mark=?,
            Ms_tech_mark=?,
            Ms_pre_mark=?,
            Ms_analy_mark=?,
            Ms_commu_mark=?,
            Ms_atti_mark=?,
            Ms_confi_mark=?,
            Ms_bodylang_mark=?,
            ms_remark=?
            WHERE application_no = ? and desg_id=?`,
            [
                data.incharge_interview_status,
                data.totalmark,
                data.subjectmark,
                data.expmark,
                data.edumark,
                data.techmark,
                data.presentationmark,
                data.analyticalmark,
                data.communicationmark,
                data.attitudeark,
                data.confidencemark,
                data.bodylanmark,
                data.remark,
                data.application_no,
                data.desg_id,
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertDmsinterview: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  Dms_Interview_status=? ,
            Dms_Interview_Mark=?,
            Dms_sub_mark=?,
            Dms_exp_mark=?,
            Dms_edu_mark=?,
            Dms_tech_mark=?,
            Dms_pre_mark=?,
            Dms_analy_mark=?,
            Dms_commu_mark=?,
            Dms_atti_mark=?,
            Dms_confi_mark=?,
            Dms_bodylang_mark=?,
            dms_remark=?
            WHERE application_no = ? and desg_id=?`,
            [
                data.incharge_interview_status,
                data.totalmark,
                data.subjectmark,
                data.expmark,
                data.edumark,
                data.techmark,
                data.presentationmark,
                data.analyticalmark,
                data.communicationmark,
                data.attitudeark,
                data.confidencemark,
                data.bodylanmark,
                data.remark,
                data.application_no,
                data.desg_id,
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertOperationinterview: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  Operation_Interview_status=? ,
            Operation_Interview_Mark=?,
            Op_sub_mark=?,
            Op_exp_mark=?,
            Op_edu_mark=?,
            Op_tech_mark=?,
            Op_pre_mark=?,
            Op_analy_mark=?,
            Op_commu_mark=?,
            Op_atti_mark=?,
            Op_confi_mark=?,
            Op_bodylang_mark=?,
            operation_remark=?
            WHERE application_no = ? and desg_id=?`,
            [
                data.incharge_interview_status,
                data.totalmark,
                data.subjectmark,
                data.expmark,
                data.edumark,
                data.techmark,
                data.presentationmark,
                data.analyticalmark,
                data.communicationmark,
                data.attitudeark,
                data.confidencemark,
                data.bodylanmark,
                data.remark,
                data.application_no,
                data.desg_id,
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertCeointerview: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  Ceo_Interview_status=? ,
            Ceo_Interview_Mark=?,
            Ceo_sub_mark=?,
            Ceo_exp_mark=?,
            Ceo_edu_mark=?,
            Ceo_tech_mark=?,
            Ceo_pre_mark=?,
            Ceo_analy_mark=?,
            Ceo_commu_mark=?,
            Ceo_atti_mark=?,
            Ceo_confi_mark=?,
            Ceo_bodylang_mark=?,
            ceo_remark=?
            WHERE application_no = ? and desg_id=?`,
            [
                data.incharge_interview_status,
                data.totalmark,
                data.subjectmark,
                data.expmark,
                data.edumark,
                data.techmark,
                data.presentationmark,
                data.analyticalmark,
                data.communicationmark,
                data.attitudeark,
                data.confidencemark,
                data.bodylanmark,
                data.remark,
                data.application_no,
                data.desg_id,
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertHrinterview: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  Hr_interview_status=? ,
            Hr_Interview_Mark=?,
            Hr_sub_mark=?,
            Hr_exp_mark=?,
            Hr_edu_mark=?,
            Hr_tech_mark=?,
            Hr_pre_mark=?,
            Hr_analy_mark=?,
            Hr_commu_mark=?,
            Hr_atti_mark=?,
            Hr_confi_mark=?,
            Hr_bodylang_mark=?,
            Hr_remark=?
            WHERE application_no = ? and desg_id=?`,
            [
                data.incharge_interview_status,
                data.totalmark,
                data.subjectmark,
                data.expmark,
                data.edumark,
                data.techmark,
                data.presentationmark,
                data.analyticalmark,
                data.communicationmark,
                data.attitudeark,
                data.confidencemark,
                data.bodylanmark,
                data.remark,
                data.application_no,
                data.desg_id,
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertselection: (data, callBack) => {

        pool.query(
            `INSERT INTO hrm_candidate_selection (
                desg_id,application_no,select_status,reject_status,hold_status,pending_status,changed_desg_id,remark_desg_chang,applicationform_id
            )values (?,?,?,?,?,?,?,?,?) `,
            [
                data.desg_id,
                data.application_no,
                data.Select_status,
                data.Reject_status,
                data.Hold_status,
                data.Pending_status,
                data.changed_desgid,
                data.remark,
                data.applicationform_id
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateselection: (data, callBack) => {

        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  desg_id=? ,
            selected_status=?
            WHERE application_no = ? AND  desg_id=? `,
            [
                data.changed_desgid,
                data.Select_status,
                data.application_no,
                data.desg_id
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
            //     `SELECT
            //     status
            //     from hrm_applicationform_status
            //    WHERE application_no= ? and desg_id=? `,
            ` SELECT
            status,
            assigned_join_date,
            salary,
            em_contract_end_date,
            em_no
            from hrm_applicationform_status
			LEFT JOIN hrm_candidate_selection ON hrm_applicationform_status.application_no = hrm_candidate_selection.application_no and 
            hrm_applicationform_status.desg_id=hrm_candidate_selection.desg_id or hrm_candidate_selection.changed_desg_id
           WHERE hrm_applicationform_status.application_no= ? and hrm_applicationform_status.desg_id=?`,
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

    getselectionStatus: (data, callBack) => {

        pool.query(
            `SELECT
            select_status,reject_status,hold_status,pending_status
            from hrm_candidate_selection
           WHERE application_no= ? and desg_id=? `,
            [
                data.application_no, data.desg_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getselectdesgstatus: (data, callBack) => {

        pool.query(
            `SELECT
            status
            from hrm_applicationform_status
           WHERE application_no= ? and desg_id=? `,
            [
                data.application_no, data.desgid
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getinitialstatus: (data, callBack) => {

        pool.query(
            `SELECT
            interview_status
            from hrm_applicationform_status
           WHERE application_no= ? and desg_id=? `,
            [
                data.application_no, data.desigid
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
            hrm_applicationform_status.*,
            desg_name
            from hrm_applicationform_status
              LEFT JOIN designation ON designation.desg_slno =  hrm_applicationform_status.desg_id
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
                    SET  letter_status=? ,
                    date_assigned=?,
                    time_assigned=?,
                    phonecall_status=?,
                    remark=?
                    WHERE application_no = ? AND  desg_id=?`,
                    [val.letter_status, val.date, val.time, val.phonecall_status, val.remark, val.appslno, val.desigid],
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

    getquestion: (id, callBack) => {
        pool.query(
            `SELECT
            department_id,
                designation_no,
                question,
                choice1,
                choice2,
                choice3,
                choice4,
                correct_answer,
                mark
            FROM interview_question_mast 
            where designation_no=? and status=1
            ORDER BY RAND() 
            LIMIT 10
               `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertappointmentdata: (data, callBack) => {

        pool.query(
            `INSERT INTO hrm_appointment_letter (
                date_appointment,
                application_no,
                em_no,
                name,
                desg_id,
                desg_name,
                date_of_join,
                department,
                salary,
                probation_end,
                appointment_status
            )values (?,?,?,?,?,?,?,?,?,?,?) `,
            [
                data.date,
                data.applicationno,
                data.em_no,
                data.name,
                data.desg,
                data.desgname,
                data.dateofjoing,
                data.deptname,
                data.salary,
                data.em_cont_end,
                data.status,

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getpdfdata: (data, callBack) => {
        pool.query(
            `SELECT  
            date_appointment,
            name,
            desg_name,
            date_of_join,
            department,
            salary,
            probation_end,
            appointment_status
              from  hrm_appointment_letter
              where  application_no= ? and desg_id= ?
               `,
            [
                data.application_no,
                data.desgid
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertJoining: (data, callBack) => {

        pool.query(
            `INSERT INTO hrm_joining_letter (
                date_Joiningletter,
                application_no,
                em_no,
                name,
                desg_id,
                desg_name,
                department,
                date_of_join,
                salary,
                joiningletter_status
            )values (?,?,?,?,?,?,?,?,?,?) `,
            [
                data.date,
                data.applicationno,
                data.em_no,
                data.name,
                data.desg,
                data.desgname,
                data.deptname,
                data.dateofjoing,
                data.salary,
                data.status,

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getJoinpdfdata: (data, callBack) => {
        pool.query(
            `SELECT  
            date_Joiningletter,
            name,
            desg_name,
            date_of_join,
            department,
            salary,
            em_no
              from  hrm_joining_letter
              where  application_no= ? and desg_id= ?
               `,
            [
                data.application_no,
                data.desgid
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertAppmtstatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  appointment_status=1,
            appmt_pdf_format=? 
            WHERE application_no = ?  AND  desg_id=?`,
            [
                data.value,
                data.application_no,
                data.desgid,

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertJoinstatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  joining_status=1 ,
            join_ltr_pdf_format=?
            WHERE application_no = ?  AND  desg_id=?`,
            [
                data.value,
                data.application_no,
                data.desgid,

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertAppmtcancelstatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  appmt_ltr_cancel_status=1,
            appmt_ltr_cancel_remark=?
            WHERE application_no = ?  AND  desg_id=?`,
            [
                data.remark,
                data.application_no,
                data.desgid,

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertjoincancelstatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  join_ltr_cancel_status=1,
            join_ltr_cancel_remark=?
            WHERE application_no = ?  AND  desg_id=?`,
            [
                data.remark,
                data.application_no,
                data.desgid,

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