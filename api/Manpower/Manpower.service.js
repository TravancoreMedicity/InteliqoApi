const pool = require('../../config/database');

module.exports = {

    getEmpByDeptAndSection: (data, callBack) => {
        pool.query(
            `SELECT 
            DISTINCT designation.desg_name, 
            hrm_emp_master.em_designation AS em_designation_number,
            designation.desg_grade,
            g.grade_desc AS grade_desg
        FROM hrm_emp_master
        LEFT JOIN hrm_salutation ON hrm_salutation.sa_code = hrm_emp_master.em_salutation
        LEFT JOIN hrm_branch ON hrm_branch.branch_slno = hrm_emp_master.em_branch
        LEFT JOIN hrm_department ON hrm_department.dept_id = hrm_emp_master.em_department
        LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
        LEFT JOIN designation ON designation.desg_slno = hrm_emp_master.em_designation
        LEFT JOIN hrm_emp_category ON hrm_emp_category.category_slno = hrm_emp_master.em_category
        LEFT JOIN grade g ON designation.desg_grade = g.grade_slno
        WHERE hrm_department.dept_id = ?
            AND hrm_dept_section.sect_id = ?
            AND em_status = 1
            AND em_id != 1
            AND em_no != 2
        ORDER BY
            CASE
                WHEN grade_desg IS NULL THEN 1
                ELSE 0
            END, grade_desg
        
            `,
            [
                data.dept_id,
                data.sect_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    insertmanpowerplanning: (data, callBack) => {

        pool.query(
            `INSERT INTO hrm_manpowerplanning_master (
                dept,
                deptsection,
                desg_slno,
                mincount,
                maxcount
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
    getname: (data, callBack) => {
        pool.query(
            `SELECT  
            desg_name,
            grade_desc
            FROM designation
            LEFT JOIN grade ON designation.desg_grade = grade.grade_slno
            WHERE desg_slno = ?
            `,
            [
                data.designation
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        )
    },
    getdesignation: (data, callBack) => {
        pool.query(
            `SELECT  
            DISTINCT d.desg_name,
            mincount as MinCount, 
            maxcount  as MaxCount,
            m.desg_slno AS em_designation_number,
            d.desg_grade,
            g.grade_desc AS grade_desg
        FROM hrm_manpowerplanning_master m
        LEFT JOIN hrm_department ON hrm_department.dept_id = m.dept
        LEFT JOIN hrm_dept_section ON hrm_dept_section.sect_id = m.deptsection
        LEFT JOIN designation d ON d.desg_slno = m.desg_slno
        left join grade g on d.desg_grade=g.grade_slno
        WHERE hrm_department.dept_id = ?
            AND hrm_dept_section.sect_id = ?
            ORDER BY
            CASE
                WHEN grade_desg IS NULL THEN 1
                ELSE 0
            END, grade_desg
        
            `,
            [
                data.dept_id,
                data.sect_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // update data

    updatemanpowerplanning: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` update hrm_manpowerplanning_master 
                    set mincount=?,
                    maxcount=?
                    where
                 desg_slno=?`,
                    [val.MinCount, val.MaxCount, val.em_designation_number],
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
}