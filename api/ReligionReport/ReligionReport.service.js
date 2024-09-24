const pool = require('../../config/database');

module.exports = {

    getReligionWiseReport: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
                hrm_emp_master.em_name,
                hrm_emp_master.em_age_year,
                hrm_emp_master.em_mobile,
                bloodgroup.group_name,
                hrm_department.dept_name,
                hrm_dept_section.sect_name,
                hrm_branch.branch_name,
                institution_type.inst_emp_type,
                designation.desg_name,
                hrm_religion.relg_name,
                hrm_emp_master.em_doj,
                hrm_emp_category.ecat_name,
                case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender',
                case when hrm_emp_personal.em_maritalstatus = 1 then 'married' when  hrm_emp_personal.em_maritalstatus=2 then 'unmarried' else 'not updated' end as 'marital_status'
                FROM hrm_emp_master
                left join bloodgroup on  hrm_emp_master.blood_slno = bloodgroup.group_slno
                left join hrm_department on hrm_emp_master.em_department = hrm_department.dept_id
                left join hrm_dept_section on hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
                left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
                left join institution_type on hrm_emp_master.em_institution_type = institution_type.inst_slno
                left join designation on hrm_emp_master.em_designation = designation.desg_slno
                left join hrm_religion on  hrm_emp_master.hrm_religion = hrm_religion.relg_slno
                left join hrm_emp_category on hrm_emp_master.em_category = hrm_emp_category.category_slno
                left join hrm_emp_personal on hrm_emp_master.em_id = hrm_emp_personal.em_id 
                where hrm_religion.relg_slno IN (?) and hrm_emp_master.em_status = 1 and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2 and doctor_status=0`,
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
    getEmpWiseReport: (data, callBack) => {
        pool.query(
            `SELECT 
            emp_code,
            punch_time
        FROM punch_data
        left join hrm_emp_master on hrm_emp_master.em_no=punch_data.emp_code
        WHERE hrm_emp_master.em_status = 1 and  punch_time 
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
    getEmpWisePunchReport: (data, callBack) => {
        pool.query(
            ` SELECT 
            punch_slno,
            punch_master.em_no,
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
            FROM punch_master
			left join hrm_emp_master on hrm_emp_master.em_no=punch_master.em_no
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            left join hrm_shift_mast on hrm_shift_mast.shft_slno=punch_master.shift_id
            WHERE  hrm_emp_master.em_status = 1 and duty_day 
            BETWEEN ?  AND ?
            AND punch_master.em_no = ?`,
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
    getEmpWisePunchReportdep: (data, callBack) => {
        pool.query(
            ` SELECT 
            emp_code,
            punch_time
        FROM punch_data
        left join hrm_emp_master on hrm_emp_master.em_no=punch_data.emp_code
        WHERE hrm_emp_master.em_department=?
         and hrm_emp_master.em_dept_section=?
          AND hrm_emp_master.em_status = 1 and   punch_time
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
    getpunchReportmasterdep: (data, callBack) => {
        pool.query(
            ` SELECT 
            punch_master.em_no,
            shift_in,
            shift_out,
            duty_day ,
            em_name,
            dept_name,
            sect_name,
            shift_id,
            shft_desc,
            shft_cross_day
            FROM punch_master
			left join hrm_emp_master on hrm_emp_master.em_no=punch_master.em_no
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
			left join hrm_shift_mast on hrm_shift_mast.shft_slno=punch_master.shift_id
            WHERE hrm_emp_master.em_department=?
             and hrm_emp_master.em_dept_section=?
             and hrm_emp_master.em_status = 1 and  duty_day
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
    getSectionEmpPunch: (data, callBack) => {
        pool.query(
            ` SELECT 
            emp_code,
            punch_time
        FROM punch_data
        left join hrm_emp_master on hrm_emp_master.em_no=punch_data.emp_code
        WHERE  hrm_emp_master.em_dept_section=?
          AND hrm_emp_master.em_status = 1 and   punch_time
         BETWEEN ?  AND ?`,
            [
                data.deptsec, data.fromdate, data.todate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSectionPunchMast: (data, callBack) => {
        pool.query(
            ` SELECT 
            punch_master.em_no,
            shift_in,
            shift_out,
            duty_day ,
            em_name,
            dept_name,
            sect_name,
            shift_id,
            shft_desc,
            shft_cross_day
            FROM punch_master
			left join hrm_emp_master on hrm_emp_master.em_no=punch_master.em_no
            left join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
			left join hrm_shift_mast on hrm_shift_mast.shft_slno=punch_master.shift_id
            WHERE  hrm_emp_master.em_dept_section=?
             and hrm_emp_master.em_status = 1 and  duty_day
            BETWEEN ?  AND ? `,
            [
                data.deptsec, data.fromdate, data.todate
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