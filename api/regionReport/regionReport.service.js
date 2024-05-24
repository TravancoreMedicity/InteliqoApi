const pool = require('../../config/database');

module.exports = {

    getRegion: (callBack) => {
        pool.query(
            `SELECT * FROM hrm_region`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }, getRegionById: (id, callBack) => {
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
            hrm_region.reg_name,
            hrm_district.dist_name,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender'
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
            left join hrm_region on hrm_emp_master.hrm_region2=hrm_region.reg_slno
            left join hrm_district on hrm_region.reg_dist_slno=hrm_district.dist_slno
            where hrm_region.reg_slno=? and hrm_emp_master.em_status = 1 and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2 and doctor_status=0`,
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
    getDistrictById: (data, callBack) => {
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
            hrm_region.reg_name,
            hrm_district.dist_name,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender'
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
            left join hrm_region on hrm_emp_master.hrm_region2=hrm_region.reg_slno
            left join hrm_district on hrm_region.reg_dist_slno=hrm_district.dist_slno
            where hrm_district.dist_slno IN (?) and hrm_emp_master.em_status = 1 and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2 and doctor_status=0`,
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
    getDistRegion: (data, callBack) => {
        pool.query(
            `SELECT reg_slno, reg_name FROM hrm_region where reg_dist_slno IN (?)`,
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
    getDistRegionById: (data, callBack) => {
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
            hrm_region.reg_name,
            hrm_district.dist_name,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'gender'
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
            left join hrm_region on hrm_emp_master.hrm_region2=hrm_region.reg_slno
            left join hrm_district on hrm_region.reg_dist_slno=hrm_district.dist_slno
            where hrm_district.dist_slno IN (?) 
            and hrm_region.reg_slno IN (?) and hrm_emp_master.em_status = 1 and hrm_emp_master.em_no!=1 and hrm_emp_master.em_no!=2 and doctor_status=0`,
            [
                data.district,
                data.region
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getRegionBypin: (id, callBack) => {
        pool.query(
            `SELECT reg_slno,reg_name,reg_pincode,reg_dist_slno FROM hrm_region where reg_pincode=? `,
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
}