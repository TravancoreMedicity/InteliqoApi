
const pool = require('../../config/database');


module.exports = {
    empDeptdata: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_no,gross_salary,em_name FROM hrm_emp_master
             WHERE em_branch=? and em_department=? and em_status=1`,
            [
                data.em_branch,
                data.em_department
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    empDeptSecdata: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_no,gross_salary,em_name FROM hrm_emp_master WHERE em_branch=? 
            and em_department=? and em_dept_section=? and em_status=1`,
            [
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
    empNameBasedata: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_no,gross_salary,em_name FROM hrm_emp_master WHERE em_branch=?
             and em_department=? and em_dept_section=? and em_id=? and em_status=1`,
            [
                data.em_branch,
                data.em_department,
                data.em_dept_section,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getFixedByEmid: (id, callBack) => {
        pool.query(
            ` SELECT 
            ernded_slno,
            hrm_earning_deduction.earnded_name,           
             em_amount
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              WHERE em_id =?  and em_earning_type=1 `,
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
    getTotalFixedByEmid: (id, callBack) => {
        pool.query(
            `     SELECT 
            ernded_slno,em_id,
           sum(em_amount)total_fixed
             FROM medi_hrm.hrm_emp_earn_deduction
			WHERE em_id =?  and em_earning_type=1`,
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
    getTotalEarningsByEmid: (id, callBack) => {
        pool.query(
            `     SELECT 
            ernded_slno,em_id,
           sum(em_amount)total_fixed
             FROM medi_hrm.hrm_emp_earn_deduction
			WHERE em_id =?  and em_earning_type=2`,
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
    getEarningByEmid: (id, callBack) => {
        pool.query(
            ` SELECT 
            ernded_slno,
            hrm_earning_deduction.earnded_name,           
             em_amount
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              WHERE em_id =?  and em_earning_type=2 `,
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
    getTotalFineByEmid: (data, callBack) => {
        pool.query(
            `SELECT ifnull(sum(fine_amount),0) as fine_sum from hrm_emp_fine_detl 
            where fine_date between ? and ? AND fine_emp_id=? `,
            [
                data.startDate,
                data.endDate,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getTotalDeductionByEmid: (id, callBack) => {
        pool.query(
            `     SELECT 
            ernded_slno,em_id,
           ifnull(sum(em_amount),0)total_deduction
             FROM medi_hrm.hrm_emp_earn_deduction
			WHERE em_id =? and em_earning_type=3`,
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
    getDeductionByEmid: (id, callBack) => {
        pool.query(
            ` SELECT 
            ernded_slno,
            hrm_earning_deduction.earnded_name,           
             ifnull(em_amount,0)em_amount
             FROM medi_hrm.hrm_emp_earn_deduction
              LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
              LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
              WHERE em_id =?  and em_earning_type=3`,
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
    getLopByEmid: (data, callBack) => {
        pool.query(
            `select ifnull(total_lop,0)lop from hrm_attendance_marking
            where attendance_marking_month=? and em_id=? `,
            [
                data.month,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getTotalGrosssalaryById: (id, callBack) => {
        pool.query(
            ` SELECT 
            ernded_slno,em_id,
            ifnull(sum(em_amount),0)gross_salary
             FROM medi_hrm.hrm_emp_earn_deduction
			WHERE em_id =?  and em_earning_type IN(1,2)`,
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
    GetPfStatus: (id, callBack) => {
        pool.query(
            `select em_id from hrm_emp_pfesi
            where em_pf_status=1 and em_id=?`,
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
    getPFcalcalculatingamt: (id, callBack) => {
        pool.query(
            `SELECT em_id,sum(em_amount)em_amount
         FROM medi_hrm.hrm_emp_earn_deduction
          LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
          LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
          WHERE em_id =? and em_earning_type IN (1,2) and include_pf=1`,
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
    GetEsiStatus: (id, callBack) => {
        pool.query(
            `select em_id from hrm_emp_pfesi
            where em_esi_status=1 and em_id=?`,
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
    getESIcalculatingamt: (id, callBack) => {
        pool.query(
            `SELECT em_id,sum(em_amount)em_amount
         FROM medi_hrm.hrm_emp_earn_deduction
          LEFT JOIN  hrm_earning_deduction ON hrm_earning_deduction.earnded_id= hrm_emp_earn_deduction.em_salary_desc
          LEFT JOIN   hrm_earning_type ON  hrm_earning_deduction.erning_type_id= hrm_earning_type.erning_type_id 
          WHERE em_id =? and em_earning_type IN (1,2) and include_esi=1`,
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
    createAttendanceManual: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_attendance_marking (
                em_no,
                em_id,
                dept_id,
                sect_id,
                attendance_marking_month,
                attnd_mark_startdate,
                attnd_mark_enddate,
                total_working_days,
                tot_days_present,
                calculated_worked,
                off_days,
                total_leave,
                total_lwp,
                total_lop,
                calculated_lop,
                total_days,
                total_holidays,
                holiday_worked,
                process_status
                )
            VALUES ?;`,
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
    getPaySlipTableData: (data, callBack) => {
        pool.query(
            `SELECT 
            em_name,
            total_working_days,
            calculated_worked,
            total_days,
            hrm_emp_master.em_no,
            hrm_emp_master.em_id
            FROM medi_hrm.hrm_attendance_marking
            inner join hrm_emp_master on hrm_attendance_marking.em_no=hrm_emp_master.em_no
            where dept_id=? and sect_id=? and attendance_marking_month=?`,
            [
                data.dept_id,
                data.sect_id,
                data.attendance_marking_month
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getEmpEarningData: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_earn_deduction.em_no,
            earning_type_name,
            earnded_name,
            em_salary_desc,
            em_amount
             from hrm_emp_earn_deduction
             inner join hrm_earning_deduction on hrm_emp_earn_deduction.em_salary_desc=hrm_earning_deduction.earnded_id
             inner join hrm_earning_type on hrm_earning_deduction.erning_type_id=hrm_earning_type.erning_type_id
             inner join hrm_emp_master on hrm_emp_earn_deduction.em_no=hrm_emp_master.em_no
             where  hrm_earning_deduction.erning_type_id=2 and hrm_emp_master.em_department=? and hrm_emp_master.em_dept_section=?;`,
            [
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
    getEmpFixedWageData: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_earn_deduction.em_no,
            earning_type_name,
            earnded_name,
            em_salary_desc,
            em_amount
             from hrm_emp_earn_deduction
             inner join hrm_earning_deduction on hrm_emp_earn_deduction.em_salary_desc=hrm_earning_deduction.earnded_id
             inner join hrm_earning_type on hrm_earning_deduction.erning_type_id=hrm_earning_type.erning_type_id
             inner join hrm_emp_master on hrm_emp_earn_deduction.em_no=hrm_emp_master.em_no
             where  hrm_earning_deduction.erning_type_id=1 and hrm_emp_master.em_department=? and hrm_emp_master.em_dept_section=?;`,
            [
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
    getEmpDeductionData: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_earn_deduction.em_no,
            earning_type_name,
            earnded_name,
            em_salary_desc,
            em_amount
             from hrm_emp_earn_deduction
             inner join hrm_earning_deduction on hrm_emp_earn_deduction.em_salary_desc=hrm_earning_deduction.earnded_id
             inner join hrm_earning_type on hrm_earning_deduction.erning_type_id=hrm_earning_type.erning_type_id
             inner join hrm_emp_master on hrm_emp_earn_deduction.em_no=hrm_emp_master.em_no
             where  hrm_earning_deduction.erning_type_id=3 and hrm_emp_master.em_department=? and hrm_emp_master.em_dept_section=?;`,
            [
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
    getAllEarnData: (data, callBack) => {
        pool.query(
            `select 
            hrm_emp_earn_deduction.em_no,
            hrm_emp_earn_deduction.em_id,
           earning_type_name,
           em_earning_type,
           earnded_name,
           em_salary_desc,
           em_amount,
           include_esi,
           include_lwf,
           include_pf,
           include_protax,
           em_name,
           total_working_days,
           calculated_worked,
            total_days,
            em_pf_status,
            em_esi_status
             from hrm_emp_earn_deduction
             inner join hrm_earning_deduction on hrm_emp_earn_deduction.em_salary_desc=hrm_earning_deduction.earnded_id
             inner join hrm_earning_type on hrm_earning_deduction.erning_type_id=hrm_earning_type.erning_type_id
             inner join hrm_emp_master on hrm_emp_earn_deduction.em_no=hrm_emp_master.em_no
            inner join hrm_attendance_marking on hrm_emp_earn_deduction.em_no=hrm_attendance_marking.em_no
            left join hrm_emp_pfesi on hrm_emp_pfesi.em_no=hrm_emp_earn_deduction.em_no
             where hrm_emp_master.em_department=? and hrm_emp_master.em_dept_section=? and attendance_marking_month=? `,
            [
                data.em_department,
                data.em_dept_section,
                data.attendance_marking_month
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createPayrollpayslip: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_payroll_payslip (
                em_no,
                em_id,
                dept_id,
                sect_id,
                total_working_days,
                total_days,
                fixed_wages,
                earning_wages,
                deduct_wages,
                gross_amount,
                net_amount,
                attendance_marking_month,
                esi_employee,
                esi_employer,
                pf_employee,
                pf_employer
                )
            VALUES ?;`,
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
    createPayrollpayslipDetl: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_payroll_payslip_detl (
                em_no,
                em_id,
                em_earning_type,
                earning_type_name,
                em_amount,
                em_salary_desc,
                total_working_days,
                total_days,
                worked_amount,
                attendance_marking_month
                )
            VALUES ?;`,
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
    checkAttendanceProcess: (data, callBack) => {
        pool.query(
            `
            SELECT * FROM medi_hrm.hrm_attendance_marking where attendance_marking_month=?;
            `,
            [
                data.attendance_marking_month
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPunchdata: (data, callBack) => {
        pool.query(
            `SELECT 
            duty_day,
            shift_id,
            emp_id,
            em_no,
            punch_in,
            punch_out,
            shift_in,
            shift_out,
            hrs_worked,
            over_time,
            late_in,
            early_out,
            duty_status,
            holiday_status,
            leave_status,
            lvereq_desc,
            duty_desc
            FROM
                punch_master
            WHERE
            DATE(duty_day) BETWEEN ? AND ? 
            AND emp_id IN (?)
                ORDER BY DATE(duty_day) ASC
            `,
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
    getattendancemark: (data, callBack) => {
        pool.query(
            `SELECT 
            duty_day,
            shift_id,
            emp_id,
            em_no,
            punch_in,
            punch_out,
            shift_in,
            shift_out,
            hrs_worked,
            over_time,
            late_in,
            early_out,
            duty_status,
            holiday_status,
            leave_status,
            lvereq_desc,
            duty_desc
            FROM
                punch_master
            WHERE  emp_id =? and
            DATE(duty_day) BETWEEN ? AND ? 
            
                ORDER BY DATE(duty_day) ASC;`,
            [
                data.emp_id,
                data.start,
                data.end
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