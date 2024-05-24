const pool = require('../../config/database');
const moment = require('moment');
module.exports = {
    getReport: (data, callBack) => {

        pool.query(
            `
            SELECT 
            punch_master.em_no,
            shift_in,
            shift_out,
            duty_day ,
            em_name,
            dept_name,
            sect_name,
            shift_id,
            shft_desc,
            duty_desc,
            shft_cross_day
            FROM punch_master
			left join hrm_emp_master on hrm_emp_master.em_no=punch_master.em_no
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join hrm_shift_mast on hrm_shift_mast.shft_slno=punch_master.shift_id
            WHERE  hrm_emp_master.em_status = 1 and duty_day 
            BETWEEN ?  AND ?
            AND punch_master.em_no = ?
            `,
            [data.fromdate, data.todate, data.empno,],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPunchMasterDataSectionWise: (data, callBack) => {
        pool.query(
            `SELECT 
            punch_slno,
            duty_day,
            shift_id,
            emp_id,
            punch_master.em_no,
            punch_in,
            punch_out,
            shift_in,
            shift_out,
            hrs_worked,
            late_in,
            early_out,
            duty_desc,
            duty_status,
            holiday_status,
            leave_status,
            lvereq_desc,
             em_name,
        dept_name,
        sect_name,
            lve_tble_updation_flag
        FROM punch_master 
        left join hrm_emp_master on hrm_emp_master.em_no=punch_master.em_no
        left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
        left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
        WHERE duty_day >= ?
        AND duty_day <= ?
        AND punch_master.em_no =?`,
            [
                data.fromdate,
                data.todate,
                data.empno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDutyPlanBySection: (data, callBack) => {

        pool.query(
            `SELECT 
                plan_slno,
                em_no,
                date(duty_day)  as duty_day,
                shift_id,
                holiday,
                holiday_name,
                holiday_slno
            FROM hrm_duty_plan  
            WHERE date(duty_day) BETWEEN ? AND ? 
            AND em_no = ?`,
            [
                data.fromdate,
                data.todate,
                data.empno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPunchDataEmCodeWiseDateWise: (data, callBack) => {
        pool.query(
            `SELECT 
                emp_code,
                punch_time,
                punch_state
            FROM punch_data
            WHERE punch_time  >= ?
             AND punch_time  <= ? AND emp_code =? `,
            [
                data.fromdate,
                data.todate,
                data.empno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getPunchDataDptWiseDateWise: (data, callBack) => {
        pool.query(
            `SELECT 
            emp_code,
            punch_time,
            punch_state
        FROM punch_data
         left join hrm_emp_master on hrm_emp_master.em_no=punch_data.emp_code
        WHERE punch_time 
       BETWEEN ? AND ?
        AND em_department =? and em_dept_section=? `,
            [
                data.fromdate,
                data.todate,
                data.deptName,
                data.deptSecName
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getPunchMasterDataDeptWise: (data, callBack) => {
        pool.query(
            ` SELECT 
            punch_slno,
            duty_day,
            shift_id,
            emp_id,
            punch_master.em_no,
            punch_in,
            punch_out,
            shift_in,
            shift_out,
            hrs_worked,
            late_in,
            early_out,
            duty_desc,
            duty_status,
            holiday_status,
            leave_status,
            lvereq_desc,
             em_name,
        dept_name,
        sect_name,
            lve_tble_updation_flag
        FROM punch_master 
        left join hrm_emp_master on hrm_emp_master.em_no=punch_master.em_no
        left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
        left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
        WHERE duty_day 
        BETWEEN ? AND ?
        AND em_department =? and em_dept_section=?`,
            [
                data.fromdate,
                data.todate,
                data.deptName,
                data.deptSecName
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPunchmastData: (data, callBack) => {
        pool.query(
            `SELECT 
            punch_slno,
            duty_day,
            shift_id,
            emp_id,
            punch_master.em_no,
            punch_in,
            punch_out,
            shift_in,
            shift_out,
            hrs_worked,
            late_in,
            early_out,
            duty_desc,
            duty_status,
            holiday_status,
            leave_status,
            lvereq_desc,
             em_name,
        dept_name,
        sect_name,
            lve_tble_updation_flag
        FROM punch_master 
        left join hrm_emp_master on hrm_emp_master.em_no=punch_master.em_no
        left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
        left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
        WHERE duty_day >= ?
        AND duty_day <= ?
        AND punch_master.em_no IN (?)`,
            [

                data.fromdate,
                data.todate,
                data.empno,
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