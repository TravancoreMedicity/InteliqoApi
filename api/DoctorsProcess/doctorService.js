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
                     set nmc_regno=?,
                     nmc_punchin=?, 
                     nmc_punchout=?, 
                     nmc_punch_status=? 
                     where duty_day=? 
                     and em_no=?`,
                    [
                        val.attendanceId,
                        val.inTime,
                        val.outTime,
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
    getDoctorpunch: (callBack) => {
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
            [],
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
    gettodayPresentDoctor: (callBack) => {
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
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT duty_name
                FROM doctor_duty
                WHERE duty_name = ?`,
            [
                data.duty_name,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDutyplanByDate: (data, callBack) => {
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
                DATE(duty_day) = ?
	            AND emp_id IN (?)
                ORDER BY DATE(duty_day) ASC`,
            [
                data.duty_date,
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
    createRights: (data, callBack) => {
        pool.query(
            `INSERT INTO doctor_employeerights (
                em_id,
                department,
                right_status
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
    checkEmployeeHasRights: (data, callBack) => {
        pool.query(
            `SELECT *
                FROM doctor_employeerights
                WHERE em_id = ? and department=?`,
            [
                data.em_id,
                data.department
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getEmployeeDocDepartments: (callBack) => {
        pool.query(
            `SELECT right_slno,doctor_employeerights.em_id, em_name, dept_name, department, right_status,
                em_no 
                FROM doctor_employeerights 
                left join hrm_emp_master on hrm_emp_master.em_id=doctor_employeerights.em_id
                left join hrm_department on hrm_department.dept_id=doctor_employeerights.department`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateDeptRights: (data, callBack) => {
        pool.query(
            `UPDATE doctor_employeerights 
                SET em_id = ?,
                department =?,
                right_status=?
                WHERE right_slno = ?`,
            [
                data.em_id,
                data.department,
                data.right_status,
                data.right_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmployeeDepartments: (data, callBack) => {
        pool.query(
            `SELECT em_id,department, dept_id, dept_name
                FROM doctor_employeerights
                INNER JOIN hrm_department on doctor_employeerights.department=hrm_department.dept_id
                WHERE em_id = ?`,
            [
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    createDoctorCoff: (data, callBack) => {
        pool.query(
            `INSERT INTO doctor_comp_off_request (
                duty_type,
                special_duty_type,
                request_status,
                leave_date,
                em_id,
                em_no,
                em_department,
                em_dept_section,
                shift_id,
                cf_reason,
                duty_taken_date,
                duty_shift
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.duty_type,
                data.special_duty_type,
                1,
                data.leave_date,
                data.em_id,
                data.em_no,
                data.em_department,
                data.em_dept_section,
                data.shift_id,
                data.cf_reason,
                data.duty_taken_date,
                data.duty_shift
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatePunchMasterLeave: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                            doctor_punch_master
                        SET leave_status = 1,
                        duty_status=1,
                        lvereq_desc = ?,
                        duty_desc = ?,
                        lve_tble_updation_flag = 1,
                        late_in=0,
                        early_out=0
                        WHERE em_no = ? 
                        AND duty_day = ?`,
                    [
                        data.lvereq_desc,
                        data.duty_desc,
                        data.emno,
                        data.leave_dates
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        }))
    },
    doctorLeaveRequestUniquNumer: () => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT serial_current FROM master_serialno where serial_slno=8`,
                [],
                (error, results, fields) => {
                    if (error) {
                        reject({
                            status: 0,
                            data: [],
                            error
                        });
                    } else {
                        resolve({
                            status: 1,
                            data: JSON.parse(JSON.stringify(results))
                        });
                    }
                }
            );
        }).then((result) => {
            return {
                status: 1,
                data: result.data[0].serial_current
            }; // Forward the result to the next .then() handler
        }).catch((error) => {
            throw error; // Rethrow the error for further handling
        });
    },
    checkDoctorLeaveexist: async (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT 
            COUNT(leave_slno) CNT
        FROM doctor_leave_request R
        INNER JOIN doctor_leave_request_detl D ON D.lve_uniq_no = R.lve_uniq_no AND R.em_no = ?
        WHERE D.leave_dates BETWEEN ? AND ? and  lv_cancel_status!=1`,
                [
                    data.em_no,
                    data.fromDate,
                    data.toDate
                ],
                (error, results, fields) => {
                    if (error) {
                        reject({
                            status: 0
                        });
                    } else {
                        resolve({
                            status: 1,
                            data: JSON.parse(JSON.stringify(results))
                        });
                    }
                }
            );
        }).then((result) => {
            return {
                status: 1,
                data: result.data
            };
        }).catch((error) => {
            return {
                status: 0,
                data: error
            };
        });
    },
    saveLeaveRequest: (data) => {
        return new Promise((resolve, reject) => {

            pool.query(
                `INSERT INTO doctor_leave_request 
                    (
                        lve_uniq_no,
                        em_id,
                        em_no,
                        dept_id,
                        dept_section,
                        leave_date,
                        leavetodate,
                        rejoin_date,
                        request_status,
                        leave_reason,
                        no_of_leave
                    )
                VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    data.leaveid,
                    data.em_id,
                    data.em_no,
                    data.em_department,
                    data.em_dept_section,
                    data.leavefrom_date,
                    data.leavetodate,
                    data.rejoin_date,
                    data.request_status,
                    data.resonforleave,
                    data.no_of_leave
                ],
                (error, results, feilds) => {
                    if (error) {
                        return reject({
                            status: 0,
                            message: error
                        });
                    }
                    return resolve({
                        status: 1,
                        message: 'success'
                    });
                }
            )
        }).then((result) => {
            return result;
        }).catch((error) => {
            return ({
                status: 0,
                message: error
            })
        });
    },
    saveLeaveDetailedTable: async (data) => { //INSERTING DETAILED TABLE LEAVE REQUEST
        const promises = data ?.map((e) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `INSERT INTO doctor_leave_request_detl (
                        lve_uniq_no,
                        leave_dates,
                        leave_processid,
                        leave_typeid,
                        leave_status,
                        leavetype_name,                
                        leave_name,
                        no_days,
                        sl_leave,
                        leaveCount
                    )
                    VALUES (?)`,
                    [e],
                    (error, results, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });
        });

        try {
            const result = await Promise.all(promises);
            return {
                status: 1,
                message: 'success'
            };
        } catch (error) {
            return {
                status: 0,
                message: error
            };
        }
    },
    cancelDoctorLeaveReqMaster: async (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE hrm_leave_request
                    SET lv_cancel_status = 1,
                        lv_cancel_cmnt= 'error insert detl table',
                        lv_cancel_date= NOW(),
                        lv_cancel_us_code= ?
                WHERE lve_uniq_no = ?`,
                [
                    data.em_no,
                    data.leaveid,
                ],
                (error, results, fields) => {
                    if (error) {
                        reject({
                            status: 0
                        });
                    } else {
                        resolve({
                            status: 1
                        });
                    }
                }
            );
        }).then((result) => {
            return {
                status: 1
            };
        }).catch((error) => {
            return {
                status: 0,
                data: error
            };
        });
    },
    getSelectedDateShift: (data, callBack) => {
        pool.query(
            `SELECT 
                dutyplan_slno,
                emp_id,
                doctor_dutyplan.shift_id,
                shft_desc,
                shft_chkin_time,
                shft_chkout_time,
                first_half_in,
                first_half_out,
                second_half_in,
                second_half_out,
                holiday,
                night_off_flag,
                coff_flag,
                attendance_update_flag,
                shft_cross_day,
                gross_salary
            FROM doctor_dutyplan
            LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno = doctor_dutyplan.shift_id 
            inner join hrm_emp_master on hrm_emp_master.em_id=doctor_dutyplan.emp_id
            WHERE duty_day= ? AND emp_id=?`,
            [data.startDate, data.em_id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    updateCOFFLeave: (data, callBack) => {
        pool.query(
            `UPDATE 
                doctor_punch_master
                SET leave_status = 1,
                duty_status=1,
                lvereq_desc = 'COFF',
                duty_desc = 'COFF',
                lve_tble_updation_flag = 1,
                late_in=0,
                early_out=0
                WHERE em_no = ? 
                AND duty_day = ?`,
            [
                data.em_no,
                data.leave_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDoctorsPunchData: (data, callBack) => {
        pool.query(
            `SELECT 
            emp_code,
            punch_time
        FROM punch_data
        left join hrm_emp_master on hrm_emp_master.em_no=punch_data.emp_code
        WHERE hrm_emp_master.em_department=?
        and hrm_emp_master.em_dept_section=?
        AND hrm_emp_master.em_status = 1 and hrm_emp_master.doctor_status=1 and punch_time
        BETWEEN ?  AND ?`,
            [
                data.deptno, data.deptsec, data.fromdate, data.todate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
     getDoctorPunchMaster: (data, callBack) => {
        pool.query(
            ` SELECT 
            doctor_punch_master.em_no,
            shift_in,
            shift_out,
            duty_day ,
            em_name,
            dept_name,
            sect_name,
            shift_id,
            shft_desc,
            shft_cross_day
            FROM doctor_punch_master
			left join hrm_emp_master on hrm_emp_master.em_no=doctor_punch_master.em_no
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
			left join hrm_shift_mast on hrm_shift_mast.shft_slno=doctor_punch_master.shift_id
            WHERE hrm_emp_master.em_department=?
             and hrm_emp_master.em_dept_section=?
             and hrm_emp_master.em_status = 1 and hrm_emp_master.doctor_status=1 and duty_day
            BETWEEN ?  AND ? `,
            [
                data.deptno, data.deptsec, data.fromdate, data.todate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
     getSingleDoctorPunch: (data, callBack) => {
        pool.query(
            `SELECT 
            emp_code,
            punch_time
        FROM punch_data
        left join hrm_emp_master on hrm_emp_master.em_no=punch_data.emp_code
        WHERE hrm_emp_master.em_status = 1 and doctor_status=1 and punch_time 
        BETWEEN ?  AND ? AND emp_code = ?`,
            [
                data.fromdate, data.todate, data.empno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSingleDoctorPunchmast: (data, callBack) => {
        
        pool.query(
            ` SELECT 
            punch_slno,
            doctor_punch_master.em_no,
            hrm_emp_master.em_id,
            shift_in,
            shift_out,
            duty_day ,
            em_name,
            dept_name,
            sect_name,
            shift_id,
            shft_desc,
            lvereq_desc,
            duty_desc,
            shft_cross_day,
            leave_status
            FROM doctor_punch_master
			left join hrm_emp_master on hrm_emp_master.em_no=doctor_punch_master.em_no
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join hrm_shift_mast on hrm_shift_mast.shft_slno=doctor_punch_master.shift_id
            WHERE  hrm_emp_master.em_status = 1 and duty_day 
            BETWEEN ?  AND ?
            AND doctor_punch_master.em_no = ?`,
            [
                data.fromdate, data.todate, data.empno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getLeaveRequest: (data, callBack) => {
        pool.query(
            `SELECT 
                leave_slno,
                dept_section,
                doctor_leave_request.lve_uniq_no,
                leave_date,
                doctor_leave_request.em_no,
                dept_name,
                em_name,
                sect_name,
            	leavetodate,
                leave_reason,
                no_of_leave,
                request_date,
                doctor_leave_request.dept_id
            FROM
                doctor_leave_request
                    INNER JOIN
                hrm_emp_master ON doctor_leave_request.em_no = hrm_emp_master.em_no
                    INNER JOIN
                hrm_department ON doctor_leave_request.dept_id = hrm_department.dept_id
                    INNER JOIN
                hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            WHERE
                lv_cancel_status = 0 and leave_date between ? and ?
            ORDER BY leave_date DESC`,
            [
                data.fromdate, data.todate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDoctorCoff: (data, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as rslno,
            doc_cmp_off_reqid,
            duty_type,
            special_duty_type,
            shift_id,
            duty_shift,
            duty_taken_date,
			doctor_comp_off_request.em_no,
            em_name,
            doctor_comp_off_request.em_id,
			doctor_comp_off_request.em_dept_section,
			dept_name,
            leave_date,
            sect_name,
            cf_reason,
            reqestdate,
            shift_id,
            doctor_comp_off_request.em_department
            FROM doctor_comp_off_request 
            left join hrm_emp_master on  doctor_comp_off_request.em_no =hrm_emp_master.em_no
            left join hrm_department on  doctor_comp_off_request.em_department =hrm_department.dept_id
            inner join hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
            where  lv_cancel_status=0 and leave_date between ? and ?`,
            [
                data.fromdate, data.todate
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