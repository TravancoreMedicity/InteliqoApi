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
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_emp_master.em_institution_type,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            hrm_emp_exp.em_institution,
            designation.desg_name,
            TIMESTAMPDIFF( YEAR, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM hrm_emp_master
			left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join designation on hrm_emp_master.em_designation=designation.desg_slno
            left join hrm_emp_exp on hrm_emp_master.em_id=hrm_emp_exp.em_id
			where  hrm_emp_master.em_status=1  and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2 and hrm_department.dept_id IN (?);`,
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
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_emp_master.em_institution_type,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            hrm_emp_exp.em_institution,
            designation.desg_name,
            TIMESTAMPDIFF( YEAR, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM hrm_emp_master
			left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join designation on hrm_emp_master.em_designation=designation.desg_slno
            left join hrm_emp_exp on hrm_emp_master.em_id=hrm_emp_exp.em_id
			where  hrm_emp_master.em_status=1  and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2 and hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN (?);`,
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
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_emp_master.em_institution_type,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            hrm_emp_exp.em_institution,
            designation.desg_name,
            TIMESTAMPDIFF( YEAR, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM hrm_emp_master
			left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join designation on hrm_emp_master.em_designation=designation.desg_slno
            left join hrm_emp_exp on hrm_emp_master.em_id=hrm_emp_exp.em_id
			where  (hrm_emp_master.em_status=1  and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2) and hrm_department.dept_id IN (?)  and hrm_dept_section.sect_id IN (?) and hrm_emp_master.em_id IN (?);`,
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
    getDeptSectByID: (id, callback) => {
        pool.query(
            `
            SELECT 
                hrm_dept_section.sect_id,
                hrm_dept_section.sect_name,
                hrm_department.dept_id,
                hrm_department.dept_name
            FROM hrm_dept_section LEFT JOIN hrm_department ON hrm_dept_section.dept_id = hrm_department.dept_id
            WHERE sect_status=1 
            ORDER BY sect_name ASC
            `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },
    noExperienceReport: (data, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno, 
            hrm_emp_master.em_no,
            hrm_emp_master.em_id,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            designation.desg_name,
            hrm_emp_master.em_doj 
            FROM hrm_emp_master
            inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            inner join designation on hrm_emp_master.em_designation=designation.desg_slno
            WHERE NOT EXISTS (SELECT * FROM hrm_emp_exp
            WHERE hrm_emp_exp.em_id=hrm_emp_master.em_id) 
            and hrm_emp_master.em_status=1 and hrm_emp_master.em_no!=1 
            and hrm_emp_master.em_no!=2 and hrm_department.dept_id IN (?);`,
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
    noExpDeptSectReport: (data, callBack) => {
        pool.query(
            `SELECT  hrm_emp_master.em_no,
            hrm_emp_master.em_name,
             hrm_department.dept_name,
             hrm_dept_section.sect_name,
              designation.desg_name,
              hrm_emp_master.em_doj FROM hrm_emp_master
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
          left join designation on hrm_emp_master.em_designation=designation.desg_slno
          WHERE NOT EXISTS (SELECT * FROM hrm_emp_exp
          WHERE hrm_emp_exp.em_id=hrm_emp_master.em_id) 
          and hrm_emp_master.em_status=1 and hrm_emp_master.em_no!=1 
          and hrm_emp_master.em_no!=2 and hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN (?);`,
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
    experienceSummaryReport: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_emp_master.em_institution_type,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            hrm_emp_exp.em_institution,
            designation.desg_name,
           sum(em_total_year)  as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM hrm_emp_master
			left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join designation on hrm_emp_master.em_designation=designation.desg_slno
            left join hrm_emp_exp on hrm_emp_master.em_id=hrm_emp_exp.em_id
			where  hrm_emp_master.em_status=1  and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2 and hrm_department.dept_id IN (?)
            group by hrm_emp_exp.em_no`,
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
    expSummaryDeptSectReport: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_emp_master.em_institution_type,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            hrm_emp_exp.em_institution,
            designation.desg_name,
           sum(em_total_year)  as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM hrm_emp_master
			left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join designation on hrm_emp_master.em_designation=designation.desg_slno
            left join hrm_emp_exp on hrm_emp_master.em_id=hrm_emp_exp.em_id
			where  hrm_emp_master.em_status=1  and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2 and hrm_department.dept_id IN (?) and hrm_dept_section.sect_id IN (?)
            group by hrm_emp_exp.em_no;`,
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
    expSummaryEmpnameReport: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_department.dept_name,
            hrm_emp_master.em_institution_type,
            hrm_dept_section.sect_name,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
            hrm_emp_exp.em_institution,
            designation.desg_name,
            sum(em_total_year)  as 'year',
            TIMESTAMPDIFF( MONTH, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 12 as 'month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_exp.em_from, hrm_emp_exp.em_to ) % 30.4375 ) as 'day'
            FROM hrm_emp_master
			left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join designation on hrm_emp_master.em_designation=designation.desg_slno
            left join hrm_emp_exp on hrm_emp_master.em_id=hrm_emp_exp.em_id
			where  (hrm_emp_master.em_status=1  and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2) and hrm_department.dept_id IN (?)  and hrm_dept_section.sect_id IN (?) and hrm_emp_master.em_id IN (?)`,
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