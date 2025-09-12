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
                    holiday_type
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
}