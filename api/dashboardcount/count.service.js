const pool = require('../../config/database');

module.exports = {
    getResignCount: (callBack) => {
        pool.query(
            `select count(*) 'resignreqcount' from hrm_resignation_request
            where resign_status is null`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getContractCloseCount: (callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            dept_name,
            sect_name,
            desg_name,
            em_doj
             FROM hrm_emp_master
             INNER JOIN hrm_emp_contract_detl on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
             INNER JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
             INNER JOIN hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
             INNER JOIN designation on hrm_emp_master.em_designation=designation.desg_slno
             WHERE em_cont_close='C' and em_status=0; `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    OtRequestCount: (callBack) => {
        pool.query(
            `SELECT count(*) 'otcount'  from hrm_ot_master
            WHERE date(ot_date)<=CURDATE() AND ot_inch_status=0 AND ot_hod_status=0 
            AND ot_ceo_status=0 AND ot_hr_status=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    OtReqInchargeCount: (callBack) => {
        pool.query(
            ` SELECT count(*) 'otcountincharge' from hrm_ot_master
            WHERE date(ot_date)<=CURDATE() AND  ot_inch_require=1 AND ot_inch_status=0 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    OtReqHodCount: (callBack) => {
        pool.query(
            `SELECT count(*) 'othodcount' from hrm_ot_master
            WHERE date(ot_date)<=CURDATE() AND ot_hod_require=1 AND ot_hod_status=0 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    OtReqCEOCount: (callBack) => {
        pool.query(
            `SELECT count(*) 'otceocount' from hrm_ot_master
            WHERE date(ot_date)<=CURDATE()  AND ot_ceo_require=1 AND ot_ceo_status=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    OtReqHRCount: (callBack) => {
        pool.query(
            ` SELECT count(*) 'othrcount' from hrm_ot_master
            WHERE date(ot_date)<=CURDATE()  AND ot_hr_status=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    OtRequestCountID: (callBack) => {
        pool.query(
            ` SELECT count(*) 'otcount'  from hrm_ot_master
            WHERE date(ot_date)<=CURDATE() AND ot_inch_status=0 AND ot_hod_status=0 
            AND ot_ceo_status=0 AND ot_hr_status=0 AND emp_id=?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    LeaveReqInchargeCount: (callBack) => {
        pool.query(
            ` SELECT count(*) 'leaveinchargecount' from hrm_leave_request
            WHERE date(request_date)<=CURDATE() AND inc_apprv_req=1 AND  incapprv_status=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    LeaveReqHodCount: (callBack) => {
        pool.query(
            ` SELECT count(*) 'leavehodcount' from hrm_leave_request
            WHERE date(request_date)<=CURDATE() AND hod_apprv_req=1 AND  hod_apprv_status=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    LeaveReqCeoCount: (callBack) => {
        pool.query(
            `SELECT count(*)  'leaveceocount' from hrm_leave_request
            WHERE date(request_date)<=CURDATE() AND ceo_req_status=1 AND  ceo_apprv_status=0`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    LeaveReqHrCount: (callBack) => {
        pool.query(
            `SELECT COUNT(*) 'leavehrcount'
            FROM
            (
               SELECT cmp_off_reqid from comp_off_request
                        WHERE date(reqestdate)<=CURDATE() AND cf_hr_aprrv_requ=1 AND  cf_hr_apprv_status=0
                union all
             SELECT half_slno from hrm_halfdayrequest
                        WHERE date(requestdate)<=CURDATE() AND hf_hr_aprrv_requ=1 AND  hf_hr_apprv_status=0
                   union all
                    SELECT nopunch_slno from nopunchrequest
                        WHERE date(creteddate)<=CURDATE() AND np_hr_aprrv_requ=1 AND  np_hr_apprv_status=0
                        union all
                         SELECT leave_slno from hrm_leave_request
                        WHERE date(request_date)<=CURDATE() AND hr_aprrv_requ=1 AND  hr_apprv_status=0
            )    x  `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    OtRequestCountUser: (id, callBack) => {
        pool.query(
            `SELECT count(*) 'otusercount' from hrm_ot_master
            WHERE date(ot_date)<=CURDATE() AND ot_inch_status=0 OR ot_hod_status=0 OR ot_ceo_status=0
            OR ot_hr_status=0 AND emp_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    LeaveReqCountUser: (id, callBack) => {
        pool.query(
            `SELECT count(*) 'leaveusercount' from hrm_leave_request
            WHERE date(request_date)<=CURDATE() AND incapprv_status=0 AND hod_apprv_status=0 AND ceo_apprv_status=0
            AND hr_apprv_status=0 AND em_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    ResignReqInchargeCount: (callBack) => {
        pool.query(
            ` SELECT count(*) 'resigncountincharge' from hrm_resignation_request
            WHERE date(request_date)<=CURDATE() AND  incharge_required=1 AND inch_app_status=0 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    ResignReqHodCount: (callBack) => {
        pool.query(
            `SELECT count(*) 'resigncounthod' from hrm_resignation_request
            WHERE date(request_date)<=CURDATE() AND  hod_required=1 AND hod_app_status=0 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    ResignReqCeoCount: (callBack) => {
        pool.query(
            `SELECT count(*) 'resigncountceo' from hrm_resignation_request
            WHERE date(request_date)<=CURDATE() AND  ceo_required=1 AND ceo_appr_status=0 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    contractrenewalCount: (callBack) => {
        pool.query(
            `select count(*) 'Contractendcount' from hrm_emp_contract_detl
            where em_cont_end=curdate() and em_cont_close is null and em_cont_renew is null`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    trainingconformationCount: (callBack) => {
        pool.query(
            `select count(*) 'ProbationEndCount' from hrm_emp_master 
            where em_prob_end_date =CURDATE() `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getLeaveRequestID: (id, callBack) => {
        pool.query(
            ` SELECT leave_slno,
            DATE_FORMAT(request_date,'%d-%m-%Y ')request_date,
            DATE_FORMAT(leave_date,'%d-%m-%Y ')leave_date,
			leave_reason,
			(case when inc_apprv_req=1 and incapprv_status=0 then "Incharge Pending"  when hod_apprv_req=1 and hod_apprv_status=0 then "HOD Pending"
            when ceo_req_status=1 and ceo_apprv_status=0 then "CEO Pending" else  "HR Pending" end ) as who
            FROM hrm_leave_request
                  WHERE em_id=? `,
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
    RegistrationPending: (callBack) => {
        pool.query(
            `SELECT count(*) 'RegistrationRenewCount' FROM hrm_emp_qual 
            WHERE MONTH(em_exp_date) between MONTH( curdate() ) -1 and  MONTH( curdate() ) +1 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    RegistrationPendingList: (callBack) => {
        pool.query(
            `select emqual_slno,em_id,em_no,
            IFNULL( cour_desc, "NILL") cour_desc,                    
            IFNULL( spec_desc, "NILL") spec_desc,
            IFNULL( registration_name, "NILL") registration_name,
            IFNULL( em_reg_no, "NILL") em_reg_no,
            IFNULL( em_exp_date, "NILL") em_exp_date,
            IFNULL( em_chellan, "NILL") em_chellan,
            IFNULL( em_chellan_exp_date, "NILL") em_chellan_exp_date
             from hrm_emp_qual
             LEFT JOIN hrm_mast_course ON  hrm_mast_course.cour_slno = hrm_emp_qual.em_course 
            LEFT JOIN hrm_mast_specializtion ON hrm_mast_specializtion.spec_slno= hrm_emp_qual.em_specialization
            LEFT JOIN hrm_emp_registrationtype ON hrm_emp_registrationtype.reg_id= hrm_emp_qual.em_reg_type
                         where  MONTH(em_exp_date) between MONTH( curdate() ) -1 and  MONTH( curdate() ) +1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    probationEndCount: (callBack) => {
        pool.query(
            `select 
            hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj,
            ecat_name,
            em_prob_end_date as training_end,
            incharge,
            hod,
            hrm_department.dept_id as dept_id,
            hrm_dept_section.sect_id as sect_id
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            LEFT JOIN hrm_performance_apprsl ON hrm_emp_master.em_id=hrm_performance_apprsl.em_id
            where  em_prob_end_date<=curdate() and em_prob_end_date!="2000-01-01" AND ecat_prob=1
            and hrm_emp_master.em_status=1 and hrm_emp_master.em_id!=1 and probation_status=1 and appraisal_status is null`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    annualAppraisalCount: (callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            dept_name,
            desg_name,
            em_doj,
            sect_name,
             ecat_name
            FROM hrm_emp_master
            inner join hrm_emp_category on hrm_emp_master.em_category=hrm_emp_category.category_slno
            inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            inner join designation ON hrm_emp_master.em_designation=designation.desg_slno
            inner join hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_performance_apprsl on hrm_emp_master.em_id = hrm_performance_apprsl.em_id
            where (em_status=1 and emp_type=1) and hrm_emp_master.last_appraisal_date<=curdate() and appraisal_status is null ;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    trainingAppraisalCount: (callBack) => {
        pool.query(
            `select 
            hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            em_name,
            dept_name,
            desg_name,
            em_doj,
            ecat_name,
            em_prob_end_date as training_end,
            incharge,
            hod,
            hrm_department.dept_id as dept_id,
            hrm_dept_section.sect_id as sect_id
            from hrm_emp_master
            LEFT JOIN hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN designation ON hrm_emp_master.em_designation=designation.desg_slno
            LEFT JOIN hrm_emp_category on hrm_emp_master.em_category= hrm_emp_category.category_slno
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            LEFT JOIN hrm_performance_apprsl ON hrm_emp_master.em_id=hrm_performance_apprsl.em_id
            where des_type=2 and emp_type!=1 and em_prob_end_date<=curdate() and em_prob_end_date!="2000-01-01" 
            and hrm_emp_master.em_status=1 and hrm_emp_master.em_id!=1 and probation_status=1 and appraisal_status is null;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    contractEndCount: (callBack) => {
        pool.query(
            `select hrm_emp_contract_detl.em_id,
            hrm_emp_contract_detl.em_no,
            em_name,
            dept_name,
            sect_name,
            desg_name,
            em_status,
            em_doj,
            em_cont_start,
            em_cont_end, 
            hrm_dept_section.sect_id,
            hrm_department.dept_id,
            hod,
            incharge
            from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join designation on designation.desg_slno=hrm_emp_master.em_designation
            LEFT JOIN hrm_performance_apprsl ON hrm_emp_master.em_id=hrm_performance_apprsl.em_id
            where em_cont_close is null and em_cont_renew is null and contract_renew_appr=0 and em_cont_end<=CURDATE() 
            and em_status=1 and appraisal_status is null`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getActiveEmpCount: (callBack) => {
        pool.query(
            `SELECT LPAD(count(*),4,'0') 'ActiveEmpCount'  FROM hrm_emp_master where em_status = 1;`,
            [],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getpunchCount: (callBack) => {
        pool.query(
            `SELECT LPAD(count(distinct(emp_code)),4,'0') 'punchcount' FROM punch_data
            where DATE(punch_time) = curdate()`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    contractAppraisalCount: (callBack) => {
        pool.query(
            `select count(*) 'contractappraisalcount' from hrm_emp_contract_detl
            left join hrm_emp_master on hrm_emp_master.em_id=hrm_emp_contract_detl.em_id
            where em_cont_close is null and em_cont_renew is null and em_status=1 and contract_renew_appr!=1  
            and em_cont_end<=CURDATE() or (em_cont_end between DATEDIFF(CURDATE(),30) and  ADDDATE(CURDATE(),30)) ;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    esiNotAddedList: (callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_id,
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_mobile,
            hrm_emp_master.em_doj,
            dept_name,
            sect_name
             FROM hrm_emp_master
            inner join hrm_emp_category on hrm_emp_master.em_category=hrm_emp_category.category_slno
            inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
             WHERE NOT EXISTS (SELECT * FROM hrm_emp_pfesi
                      WHERE hrm_emp_pfesi.em_id=hrm_emp_master.em_id) 
            and em_status=1 and em_no!=1 and ecat_esi_allow=1`,
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