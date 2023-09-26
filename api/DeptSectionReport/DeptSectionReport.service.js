const pool = require('../../config/database');

/** to get department type report */
module.exports = {
    getdeptSection: (data, callBack) => {
        pool.query(
            `SELECT 
        hrm_dept_section.sect_id,hrm_dept_section.sect_name FROM hrm_dept_section where dept_sub_sect IN (?)`,
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
    getSectionTypeDetl: (data, callBack) => {
        pool.query(
            `SELECT
            hrm_dept_section.sect_name,
            hrm_emp_master.em_name,
            hrm_emp_master.em_no,
            hrm_department.dept_name,
            hrm_branch.branch_name,
            hrm_emp_master.em_doj,
            hrm_emp_master.em_mobile,
            case when hrm_dept_section.dept_sub_sect = 1  then 'genral' when hrm_dept_section.dept_sub_sect = 2  then 'OT'  when hrm_dept_section.dept_sub_sect = 3 then 'ICU'  when hrm_dept_section.dept_sub_sect = 4 then 'ER'  end as 'section type'
            FROM hrm_dept_section
            left join hrm_emp_master on hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
             left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
            left join hrm_department on hrm_dept_section.dept_id = hrm_department.dept_id
            where em_status = 1 and hrm_dept_section.dept_sub_sect IN (?) and hrm_dept_section.sect_id IN(?) and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2`,
            [

                data.sectionType,
                data.section
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
}