const pool = require('../../config/database');

module.exports = {

    getEmpNameByDeptSection: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_emp_master where em_status=1`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    experienceReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_exp.em_no,
            hrm_emp_master.em_name,
            designation.desg_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_institution,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            TIMESTAMPDIFF( YEAR, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM medi_hrm.hrm_emp_exp
            left join hrm_emp_master on hrm_emp_exp.em_id=hrm_emp_master.em_id
            left join designation on hrm_emp_exp.em_designation=designation.desg_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.dept_id
            where hrm_emp_master.em_status=1 and hrm_department.dept_id IN (?)`,
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
    DeptSectReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_exp.em_no,
            hrm_emp_master.em_name,
            designation.desg_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_institution,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            TIMESTAMPDIFF( YEAR, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM medi_hrm.hrm_emp_exp
            left join hrm_emp_master on hrm_emp_exp.em_id=hrm_emp_master.em_id
            left join designation on hrm_emp_exp.em_designation=designation.desg_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.dept_id
            where hrm_emp_master.em_status=1 and hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN (?)`,
            [
                data.dept_id,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    EmpNameReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_exp.em_no,
            hrm_emp_master.em_name,
            designation.desg_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_institution,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            TIMESTAMPDIFF( YEAR, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM medi_hrm.hrm_emp_exp
            left join hrm_emp_master on hrm_emp_exp.em_id=hrm_emp_master.em_id
            left join designation on hrm_emp_exp.em_designation=designation.desg_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.dept_id
            where hrm_emp_master.em_status=1 and hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN (?) and hrm_emp_master.em_id IN (?)`,
            [
                data.dept_id,
                data.sect_id,
                data.em_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDeptSectByID: (id, callback) => {
        pool.query(
            `SELECT * FROM hrm_dept_section`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },
    experienceReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_exp.em_no,
            hrm_emp_master.em_name,
            designation.desg_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_institution,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            TIMESTAMPDIFF( YEAR, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM medi_hrm.hrm_emp_exp
            left join hrm_emp_master on hrm_emp_exp.em_id=hrm_emp_master.em_id
            left join designation on hrm_emp_exp.em_designation=designation.desg_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where  hrm_department.dept_id IN (?) and hrm_emp_master.em_status=1`,
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
    DeptSectReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_exp.em_no,
            hrm_emp_master.em_name,
            designation.desg_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_institution,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            TIMESTAMPDIFF( YEAR, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM medi_hrm.hrm_emp_exp
            left join hrm_emp_master on hrm_emp_exp.em_id=hrm_emp_master.em_id
            left join designation on hrm_emp_exp.em_designation=designation.desg_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where  hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN(?) and hrm_emp_master.em_status=1 `,
            [
                data.dept_id,
                data.sect_id

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    EmpNameReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_exp.em_no,
            hrm_emp_master.em_name,
            designation.desg_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_institution,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            TIMESTAMPDIFF( YEAR, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM medi_hrm.hrm_emp_exp
            left join hrm_emp_master on hrm_emp_exp.em_id=hrm_emp_master.em_id
            left join designation on hrm_emp_exp.em_designation=designation.desg_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            where  hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN(?) and hrm_emp_master.em_id IN (?) and hrm_emp_master.em_status=1`,
            [
                data.dept_id,
                data.sect_id,
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
}