const pool = require('../../config/database');

module.exports = {
    getCatogery: (callBack) => {
        pool.query(
            `Select category_slno,CONCAT(UPPER(SUBSTRING(ecat_name,1,1)),LOWER(SUBSTRING(ecat_name,2))) AS ecat_name from hrm_emp_category;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getCategorybyId: (data, callBack) => {
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
                case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'Gender',
                case when hrm_emp_personal.em_maritalstatus = 1 then 'married' when  hrm_emp_personal.em_maritalstatus=2 then 'unmarried' else 'not updated' end as 'marital_status'
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
                where hrm_emp_category.category_slno IN (?)`,
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
    getDesignation: (callBack) => {
        pool.query(
            `select desg_slno,desg_name FROM designation `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDesignationById: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
                hrm_emp_master.em_name,
                hrm_emp_master.em_age_year,
                hrm_emp_master.em_mobile,
                bloodgroup.group_name,
                hrm_department.dept_name,
                hrm_dept_section.sect_name,
                designation.desg_name,
                hrm_branch.branch_name,
                institution_type.inst_emp_type,
                designation.desg_name,
                hrm_religion.relg_name,
                hrm_emp_master.em_doj,
                hrm_emp_category.ecat_name,
                case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'Gender',
                case when hrm_emp_personal.em_maritalstatus = 1 then 'married' when  hrm_emp_personal.em_maritalstatus=2 then 'unmarried' else 'not updated' end as 'marital_status'
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
                where hrm_emp_master.em_status = 1 and designation.desg_slno IN (?)`,
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
        console.log(data);
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
    getCourseById: (data, callBack) => {
        pool.query(
            `SELECT cour_slno, cour_desc FROM medi_hrm.hrm_mast_course where edu_slno IN (?) `,
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

    getSpecializationById: (data, callBack) => {
        pool.query(
            `SELECT spec_slno,spec_desc FROM medi_hrm.hrm_mast_specializtion  where cour_slno IN (?)`,
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
    },
    getDesignationExp: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
            bloodgroup.group_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            designation.desg_name,
            hrm_branch.branch_name,
            institution_type.inst_emp_type,
            designation.desg_name,
            hrm_religion.relg_name,
            hrm_emp_master.em_doj,
            hrm_emp_category.ecat_name,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'Gender',
            case when hrm_emp_personal.em_maritalstatus = 1 then 'married' when  hrm_emp_personal.em_maritalstatus=2 then 'unmarried' else 'not updated' end as 'marital_status'
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
            left join hrm_emp_exp on designation.desg_slno =  hrm_emp_exp.em_designation
            where hrm_emp_master.em_status = 1 and   hrm_emp_exp.em_designation IN (?)`,
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
    getdeptSection: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_dept_section.sect_id,hrm_dept_section.sect_name FROM medi_hrm.hrm_dept_section where dept_sub_sect IN (?)`,
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
            FROM medi_hrm.hrm_dept_section
            left join hrm_emp_master on hrm_dept_section.sect_id = hrm_emp_master.em_dept_section
             left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
            left join hrm_department on hrm_dept_section.dept_id = hrm_department.dept_id
            where em_status = 1 and hrm_dept_section.dept_sub_sect IN (?) and hrm_dept_section.sect_id IN(?)`,
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
    },

}
