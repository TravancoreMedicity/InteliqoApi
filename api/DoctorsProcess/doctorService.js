const {
    format
} = require('date-fns');
const pool = require('../../config/database');

module.exports = {
    checkDoctorDutyplan: (data, callBack) => {
        pool.query(
            `SELECT 
  *
FROM
    doctor_dutyplan
WHERE
    DATE(duty_day) BETWEEN ? AND ?
        AND emp_id IN (?)
ORDER BY DATE(duty_day) ASC`,
            [
                data.start_date,
                data.end_date,
                data.empData
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertDutyplan: (data, callBack) => {
        pool.query(
            `insert  into doctor_dutyplan(
                duty_day, 
                emp_id,
                em_no,
                shift_id,
                holiday,
                holiday_name,
                holiday_slno,
                plan_create_user
            ) values ?`,
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
    createDoctorDuty: (data, callBack) => {
        pool.query(
            `INSERT INTO doctor_duty (
                duty_name,
                duty_status
            )
            VALUES (?,?)`,
            [
                data.duty_name,
                data.duty_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDutyList: (callBack) => {
        pool.query(
            `SELECT dutyslno,duty_name,duty_status FROM doctor_duty`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateDoctorduty: (data, callBack) => {
        pool.query(
            `UPDATE doctor_duty 
                SET duty_name = ?,
                duty_status =?
                WHERE dutyslno = ?`,
            [
                data.duty_name,
                data.duty_status,
                data.dutyslno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateDoctorDutyPlan: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `UPDATE doctor_dutyplan 
                        SET 
                            shift_id = ?,
                            doctor_dutyslno = ?,
                            offday_flag=?,
                            plan_update_user = ?
                        WHERE
                            dutyplan_slno = ?
                            AND attendance_update_flag != 1`,
                    [
                        val.shift_id,
                        val.dutySlno,
                        val.offday_flag,
                        val.plan_update_user,
                        val.dutyplan_slno
                    ],
                    (error, results, fields) => {


                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
    },
    getDutyplan: (data, callBack) => {
        pool.query(
            `SELECT 
                dutyplan_slno,
                emp_id,
                em_no,
                doctor_dutyslno,
                doctor_dutyplan.shift_id,
                duty_day,
                plan_create_user,
                attendance_update_flag,
                holiday,
                offday_flag,
                holiday_name,
                holiday_slno,
                plan_update_user,
                shft_desc as shiftName,
                duty_name as dutyName
            FROM
                doctor_dutyplan
                inner join hrm_shift_mast on hrm_shift_mast.shft_slno=doctor_dutyplan.shift_id
                left  join doctor_duty on doctor_duty.dutyslno=doctor_dutyplan.doctor_dutyslno
            WHERE
                DATE(duty_day) BETWEEN ? AND ?
	            AND emp_id IN (?)
                ORDER BY DATE(duty_day) ASC`,
            [
                data.start_date,
                data.end_date,
                data.empData
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDoctorById: (id, callBack) => {
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
                    em_branch,em_department,
                    em_dept_section,
                    em_institution_type,
                    em_designation,
                    em_doc_type,
                    em_category,
                    contract_status,
                    probation_status,
                    recomend_salary,
                    clinicaltype,
                    gross_salary,
                    doctor_status,
                    holiday_type,
                    nmc_regno
                FROM hrm_emp_master
                WHERE em_id = ?
                AND em_status=1 and doctor_status=1 `,
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
    getdoctorDept: (callBack) => {
        pool.query(
            `SELECT dept_id,
                dept_name,
                dept_alias,
                dept_status,
                dept_type,
                case when dept_type = 1 then 'Clinical' when  dept_type = 2 then 'Non Clinical' when  dept_type = 3 then 'Accademic' else 'Not Updated' end as 'descrp',
                if(dept_status = 1 ,'Yes','No') status,
                if(doctor_department=1,'Doctor Dept', 'General') docdept
            FROM hrm_department where doctor_department=1 order by dept_name ASC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDoctorSectionByDept: (id, callback) => {
        pool.query(
            `SELECT  sect_id,  sect_name  FROM hrm_dept_section 
        WHERE dept_id = ? and sect_status=1 ORDER BY sect_name `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },
    createDoctorPunch: (data, callBack) => {
        pool.query(
            `INSERT INTO doctor_punch_upload (
                attendance_id,
                punch_intime,
                punch_outtime,
                punch_status
            )
            VALUES ?`,
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
    getDoctorsByNMC: (data, callBack) => {
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
                gross_salary,
                IF(em_status = 1, 'Yes', 'No') emp_status,
                unauthorized_absent_status,
                holiday_type,
                nmc_regno
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
            WHERE   nmc_regno IN (?)
                    AND em_status=1  and em_id !=1 and em_no!=2 and doctor_status=1`,
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
    updateNMCpunch: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update doctor_punch_master 
                     set nmc_punchin=?, 
                     nmc_punchout=?, 
                     nmc_punch_status=? 
                     where duty_day=? 
                     and em_no=?`,
                    [
                        format(new Date(val.inTime), 'yyyy-MM-dd'),
                        format(new Date(val.outTime), 'yyyy-MM-dd'),
                        val.status,
                        val.duty_day,
                        val.em_no
                    ],
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
    getDoctorPunchmastData: (data, callBack) => {
        pool.query(
            `select punch_slno, duty_day,shift_id,doctor_punch_master.emp_id,doctor_punch_master.em_no,
            hrm_emp_master.em_name,dept_name,sect_name, gross_salary,punch_in,
            punch_out,shift_in,shift_out,hrs_worked,over_time,late_in,
            early_out,duty_status,holiday_status,leave_status,holiday_slno,
            lvereq_desc,duty_desc,lve_tble_updation_flag,hrm_emp_master.em_name,
            unauthorized_absent_status,manual_request_flag,nmc_punchin,nmc_punchout,nmc_punch_status
            from  doctor_punch_master
            left join hrm_emp_master on hrm_emp_master.em_no=doctor_punch_master.em_no
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            where doctor_punch_master.em_no IN (?)
            and date(duty_day) between ? and ?`,
            [
                data.em_no,
                data.from,
                data.to
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    logDoctorPunch: (data, callBack) => {
        pool.query(
            `INSERT INTO doctor_punch_upload_log (  last_update_user  )   VALUES (?)`,
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
    getDoctorpunchLog: (callBack) => {
        pool.query(
            `SELECT 
    last_update_date, last_update_user, em_name
FROM
    doctor_punch_upload_log
        INNER JOIN
    hrm_emp_master ON hrm_emp_master.em_id = doctor_punch_upload_log.last_update_user`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    activeDoctorsList: (callBack) => {
        pool.query(
            `SELECT 
    hrm_emp_master.em_no,
    em_name,
    em_dob,
    em_doj,
    em_mobile,
    em_email,
    branch_name,
    dept_name,
    sect_name,
    desg_name,
    ecat_name,
    inst_emp_type,
    gross_salary,
    addressPresent1,
    em_account_no,
    hrm_pin2,
    em_pan_no,
    addressPresent2,
    em_retirement_date,
    em_passport_no,
    em_adhar_no,
    IF(em_gender = 1, 'Male', 'Female') em_gender,
    IFNULL(em_pf_no, 0) em_pf_no,
    em_esi_no,
    lwfnumber,
    nmc_regno
FROM
    hrm_emp_master
        INNER JOIN
    hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
        INNER JOIN
    hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
        INNER JOIN
    hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
        INNER JOIN
    designation ON designation.desg_slno = hrm_emp_master.em_designation
        INNER JOIN
    hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
        INNER JOIN
    institution_type ON institution_type.inst_slno = hrm_emp_master.em_institution_type
        LEFT JOIN
    hrm_emp_personal ON hrm_emp_personal.em_id = hrm_emp_master.em_id
        LEFT JOIN
    hrm_emp_pfesi ON hrm_emp_pfesi.em_id = hrm_emp_master.em_id
WHERE
    (hrm_emp_master.em_status = 1
        AND hrm_emp_master.em_no != 1
        AND hrm_emp_master.em_no != 2
        AND doctor_status = 1)`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    clinicalDoctorsList: (callBack) => {
        pool.query(
            `SELECT 
    hrm_emp_master.em_no,
    em_name,
    em_dob,
    em_doj,
    em_mobile,
    em_email,
    branch_name,
    dept_name,
    sect_name,
    desg_name,
    ecat_name,
    inst_emp_type,
    gross_salary,
    addressPresent1,
    em_account_no,
    hrm_pin2,
    em_pan_no,
    addressPresent2,
    em_retirement_date,
    em_passport_no,
    em_adhar_no,
    IF(em_gender = 1, 'Male', 'Female') em_gender,
    IFNULL(em_pf_no, 0) em_pf_no,
    em_esi_no,
    lwfnumber
FROM
    hrm_emp_master
        INNER JOIN
    hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
        INNER JOIN
    hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
        INNER JOIN
    hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
        INNER JOIN
    designation ON designation.desg_slno = hrm_emp_master.em_designation
        INNER JOIN
    hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
        INNER JOIN
    institution_type ON institution_type.inst_slno = hrm_emp_master.em_institution_type
        LEFT JOIN
    hrm_emp_personal ON hrm_emp_personal.em_id = hrm_emp_master.em_id
        LEFT JOIN
    hrm_emp_pfesi ON hrm_emp_pfesi.em_id = hrm_emp_master.em_id
WHERE
    (hrm_emp_master.em_status = 1
        AND hrm_emp_master.em_no != 1
        AND hrm_emp_master.em_no != 2
        AND doctor_status = 1 AND clinicaltype=1)`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    accademicDoctorsList: (callBack) => {
        pool.query(
            `SELECT 
    hrm_emp_master.em_no,
    em_name,
    em_dob,
    em_doj,
    em_mobile,
    em_email,
    branch_name,
    dept_name,
    sect_name,
    desg_name,
    ecat_name,
    inst_emp_type,
    gross_salary,
    addressPresent1,
    em_account_no,
    hrm_pin2,
    em_pan_no,
    addressPresent2,
    em_retirement_date,
    em_passport_no,
    em_adhar_no,
    IF(em_gender = 1, 'Male', 'Female') em_gender,
    IFNULL(em_pf_no, 0) em_pf_no,
    em_esi_no,
    lwfnumber
FROM
    hrm_emp_master
        INNER JOIN
    hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
        INNER JOIN
    hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
        INNER JOIN
    hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
        INNER JOIN
    designation ON designation.desg_slno = hrm_emp_master.em_designation
        INNER JOIN
    hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
        INNER JOIN
    institution_type ON institution_type.inst_slno = hrm_emp_master.em_institution_type
        LEFT JOIN
    hrm_emp_personal ON hrm_emp_personal.em_id = hrm_emp_master.em_id
        LEFT JOIN
    hrm_emp_pfesi ON hrm_emp_pfesi.em_id = hrm_emp_master.em_id
WHERE
    (hrm_emp_master.em_status = 1
        AND hrm_emp_master.em_no != 1
        AND hrm_emp_master.em_no != 2
        AND doctor_status = 1 AND clinicaltype=3)`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDoctorpunch: ( callBack) => {
        pool.query(
            `SELECT 
    emp_code, em_name, nmc_regno, punch_time, em_no, branch_name,
    dept_name, sect_name,  desg_name
FROM
    punch_data
        LEFT JOIN
    hrm_emp_master ON hrm_emp_master.em_no = punch_data.emp_code
        INNER JOIN
    hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
        INNER JOIN
    hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
        INNER JOIN
    hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
        INNER JOIN
    designation ON designation.desg_slno = hrm_emp_master.em_designation
WHERE
    DATE(punch_time) = CURRENT_DATE()
        AND emp_code IN (SELECT 
            em_no
        FROM
            hrm_emp_master
        WHERE
            doctor_status = 1 AND em_status = 1)
GROUP BY em_no;`,
            [ ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    nmcDoctorPunch: (data, callBack) => {
        pool.query(
            `  SELECT em_no,em_name,branch_name,attendance_id,
     dept_name, sect_name,  desg_name
FROM doctor_punch_upload
LEFT JOIN hrm_emp_master
  ON hrm_emp_master.nmc_regno COLLATE utf8mb4_general_ci = doctor_punch_upload.attendance_id COLLATE utf8mb4_general_ci
    LEFT JOIN
   hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
        INNER JOIN
    hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
        INNER JOIN
    hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
        INNER JOIN
    designation ON designation.desg_slno = hrm_emp_master.em_designation
WHERE (DATE(punch_intime) = CURRENT_DATE() OR DATE(punch_outtime) = CURRENT_DATE())
  AND attendance_id IN (?) `,
            [
                data.id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
     gettodayPresentDoctor: ( callBack) => {
        pool.query(
            `SELECT doctor_punch_master.em_no,em_name,branch_name,
     dept_name, sect_name,  desg_name FROM doctor_punch_master 
LEFT JOIN
    hrm_emp_master ON hrm_emp_master.em_no = doctor_punch_master.em_no
        INNER JOIN
    hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
        INNER JOIN
    hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
        INNER JOIN
    hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
        INNER JOIN
    designation ON designation.desg_slno = hrm_emp_master.em_designation
where date(duty_day)=curdate() and (duty_desc='P' or nmc_punch_status='P') and doctor_punch_master.em_no IN 
(SELECT em_no FROM hrm_emp_master WHERE doctor_status = 1 AND em_status = 1)`,
            [ ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}