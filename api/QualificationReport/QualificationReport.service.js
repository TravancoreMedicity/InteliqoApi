const pool = require('../../config/database');

/** to get education wise report */
module.exports = {
    getEducation: (callBack) => {
        pool.query(
            `SELECT edu_slno, edu_desc FROM medi_hrm.hrm_mast_education`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEducationById: (data, callBack) => {
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
            hrm_mast_education.edu_desc,
            hrm_mast_course.cour_desc,
            hrm_mast_specializtion.spec_desc,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'Gender'
            FROM medi_hrm.hrm_emp_master
            left join bloodgroup on  hrm_emp_master.blood_slno = bloodgroup.group_slno
            left join hrm_department on hrm_emp_master.em_department = hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
            left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
            left join institution_type on hrm_emp_master.em_institution_type = institution_type.inst_slno
            left join designation on hrm_emp_master.em_designation = designation.desg_slno
            left join hrm_religion on  hrm_emp_master.hrm_religion = hrm_religion.relg_slno
            left join hrm_emp_category on hrm_emp_master.em_category = hrm_emp_category.category_slno
            left join hrm_emp_personal on hrm_emp_master.em_id = hrm_emp_personal.em_id
            left join hrm_emp_qual on   hrm_emp_master.em_id = hrm_emp_qual.em_id
            left join hrm_mast_education on  hrm_emp_qual.em_education = hrm_mast_education.edu_slno
            left join hrm_mast_course on hrm_emp_qual.em_course = hrm_mast_course.cour_slno
            left join hrm_mast_specializtion on hrm_emp_qual.em_specialization = hrm_mast_specializtion.spec_slno
            where hrm_mast_education.edu_slno IN (?) and hrm_emp_master.em_status = 1 ` ,
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

    /** to get course wise report */
    getCourseById: (data, callBack) => {
        pool.query(
            //`SELECT cour_slno, cour_desc FROM medi_hrm.hrm_mast_course where edu_slno IN (?) `,
            `SELECT * FROM medi_hrm.hrm_mast_course`,
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
    getCourse: (data, callBack) => {
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
            hrm_mast_education.edu_desc,
            hrm_mast_course.cour_desc,
            hrm_mast_specializtion.spec_desc,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'Gender'
            FROM medi_hrm.hrm_emp_master
            left join bloodgroup on  hrm_emp_master.blood_slno = bloodgroup.group_slno
            left join hrm_department on hrm_emp_master.em_department = hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
            left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
            left join institution_type on hrm_emp_master.em_institution_type = institution_type.inst_slno
            left join designation on hrm_emp_master.em_designation = designation.desg_slno
            left join hrm_religion on  hrm_emp_master.hrm_religion = hrm_religion.relg_slno
            left join hrm_emp_category on hrm_emp_master.em_category = hrm_emp_category.category_slno
            left join hrm_emp_personal on hrm_emp_master.em_id = hrm_emp_personal.em_id
            left join hrm_emp_qual on   hrm_emp_master.em_id = hrm_emp_qual.em_id
            left join hrm_mast_education on  hrm_emp_qual.em_education = hrm_mast_education.edu_slno
            left join hrm_mast_course on hrm_emp_qual.em_course = hrm_mast_course.cour_slno
            left join hrm_mast_specializtion on hrm_emp_qual.em_specialization = hrm_mast_specializtion.spec_slno
            where  hrm_mast_education.edu_slno IN (?)  and   hrm_mast_course.cour_slno IN (?) and hrm_emp_master.em_status = 1 `,
            [
                data.education,
                data.course
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    /** to get specilization wise report */
    getSpecializationById: (data, callBack) => {
        pool.query(
            // `SELECT spec_slno,spec_desc FROM medi_hrm.hrm_mast_specializtion  where cour_slno IN (?)`,
            ` SELECT * FROM medi_hrm.hrm_mast_specializtion`,
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
    getSpecialization: (data, callBack) => {
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
            hrm_mast_education.edu_desc,
            hrm_mast_course.cour_desc,
            hrm_mast_specializtion.spec_desc,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'Gender'
            FROM medi_hrm.hrm_emp_master
            left join bloodgroup on  hrm_emp_master.blood_slno = bloodgroup.group_slno
            left join hrm_department on hrm_emp_master.em_department = hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
            left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
            left join institution_type on hrm_emp_master.em_institution_type = institution_type.inst_slno
            left join designation on hrm_emp_master.em_designation = designation.desg_slno
            left join hrm_religion on  hrm_emp_master.hrm_religion = hrm_religion.relg_slno
            left join hrm_emp_category on hrm_emp_master.em_category = hrm_emp_category.category_slno
            left join hrm_emp_personal on hrm_emp_master.em_id = hrm_emp_personal.em_id
            left join hrm_emp_qual on   hrm_emp_master.em_id = hrm_emp_qual.em_id
            left join hrm_mast_education on  hrm_emp_qual.em_education = hrm_mast_education.edu_slno
            left join hrm_mast_course on hrm_emp_qual.em_course = hrm_mast_course.cour_slno
            left join hrm_mast_specializtion on hrm_emp_qual.em_specialization = hrm_mast_specializtion.spec_slno
            where hrm_mast_specializtion.spec_slno IN (?) and   hrm_mast_course.cour_slno  IN (?) and  hrm_mast_education.edu_slno IN(?) and  hrm_emp_master.em_status = 1 `,
            [
                data.specialization,
                data.course,
                data.education
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