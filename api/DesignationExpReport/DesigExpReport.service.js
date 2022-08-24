const pool = require('../../config/database');

module.exports = {
    /** to get designation report  */
    getDesignationExpDetl: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
             TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
             TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
             FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day', 
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
            where hrm_emp_master.em_status = 1 and  designation.desg_slno IN (?)`,
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
    /** to get less than experience */
    getDesignationExpLessthan: (data, callBack) => {
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
            TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1 and hrm_emp_exp.em_total_year < ? and designation.desg_slno IN (?) `,
            [

                data.em_total_year,
                data.desg_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get greter or equal experience */
    getDesignationExpGreater: (data, callBack) => {
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
            TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1 and   hrm_emp_exp.em_total_year >= ? and designation.desg_slno IN (?)`,
            [

                data.em_total_year,
                data.desg_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get non tmch  experience */
    getExpdetlnonTmch: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.is_tmch,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
            bloodgroup.group_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            designation.desg_name,
            hrm_branch.branch_name,
            institution_type.inst_emp_type,
            TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1 and hrm_emp_exp.is_tmch = 0 and designation.desg_slno IN (?)`,
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
    /** to get tmch experience */
    getExpdetlTmch: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
             TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
             TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
             FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and hrm_emp_exp.is_tmch = 1 and designation.desg_slno IN (?)`,
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
    /** to get current experience */
    getCurrentExp: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_total_year,
            hrm_emp_exp.em_to,
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
            where hrm_emp_master.em_status = 1  and designation.desg_slno IN (?)`,
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
    /** to get current tmch experience */
    getCurrentTmchExp: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            sum((TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE()))+ em_total_year) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and designation.desg_slno IN (?) and is_tmch = 1`,
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
    /** to get current and previous experience */
    getCurrentPrevious: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            sum((TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE()))+ em_total_year) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and designation.desg_slno IN (?) and is_tmch = 0`,
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
    /** to get total experience */
    getTotalExp: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
            sum( TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) + em_total_year) as 'exp_year',
             TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
             FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and hrm_emp_exp.is_tmch = 1 and designation.desg_slno IN (?)`,
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
    /** to get tmch less than experience */
    getTmchLessExp: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
             TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
             TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
             FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and hrm_emp_exp.is_tmch = 1 and designation.desg_slno IN (?) and hrm_emp_exp.em_total_year < ?`,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get tmch greter or equal experience */
    getTmchGreaterExp: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
             TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
             TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
             FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and hrm_emp_exp.is_tmch = 1 and designation.desg_slno IN (?) and hrm_emp_exp.em_total_year >= ?`,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get  non tmch Less experience */
    getNonTmchLessExp: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
             TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
             TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
             FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and hrm_emp_exp.is_tmch = 0 and designation.desg_slno IN (?) and hrm_emp_exp.em_total_year < ?`,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get nontmch greter or equal experience */
    getNonTmchGreaterExp: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
             TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
             TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
             FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and hrm_emp_exp.is_tmch = 0 and designation.desg_slno IN (?) and hrm_emp_exp.em_total_year >= ?`,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    /** to get current less experience */
    getCurrentExpLess: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_total_year,
            hrm_emp_exp.em_to,
            bloodgroup.group_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            designation.desg_name,
            hrm_branch.branch_name,
            institution_type.inst_emp_type,
            designation.desg_name,
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
            left join hrm_emp_category on hrm_emp_master.em_category = hrm_emp_category.category_slno
            left join hrm_emp_personal on hrm_emp_master.em_id = hrm_emp_personal.em_id
            left join hrm_emp_exp on designation.desg_slno =  hrm_emp_exp.em_designation
            where hrm_emp_master.em_status = 1  and designation.desg_slno IN (?) and hrm_emp_exp.em_total_year < ?`,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get current greter or equal experience */
    getCurrentExpGreater: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_total_year,
            hrm_emp_exp.em_to,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            designation.desg_name,
            hrm_branch.branch_name,
            institution_type.inst_emp_type,
            designation.desg_name,
            hrm_emp_master.em_doj,
            hrm_emp_category.ecat_name,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'Gender',
            case when hrm_emp_personal.em_maritalstatus = 1 then 'married' when  hrm_emp_personal.em_maritalstatus=2 then 'unmarried' else 'not updated' end as 'marital_status'
            FROM medi_hrm.hrm_emp_master
            left join hrm_department on hrm_emp_master.em_department = hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
            left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
            left join institution_type on hrm_emp_master.em_institution_type = institution_type.inst_slno
            left join designation on hrm_emp_master.em_designation = designation.desg_slno
            left join hrm_emp_category on hrm_emp_master.em_category = hrm_emp_category.category_slno
            left join hrm_emp_personal on hrm_emp_master.em_id = hrm_emp_personal.em_id
            left join hrm_emp_exp on designation.desg_slno =  hrm_emp_exp.em_designation
            where hrm_emp_master.em_status = 1  and designation.desg_slno IN (?) and hrm_emp_exp.em_total_year >= ?`,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get current and previous less experience */
    getCurrentPreviousLess: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            sum((TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE()))+ em_total_year) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE()) % 30.4375 ) as 'exp_day',
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            designation.desg_name,
            hrm_branch.branch_name,
            institution_type.inst_emp_type,
            designation.desg_name
            hrm_emp_master.em_doj,
            hrm_emp_category.ecat_name,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'Gender',
            case when hrm_emp_personal.em_maritalstatus = 1 then 'married' when  hrm_emp_personal.em_maritalstatus=2 then 'unmarried' else 'not updated' end as 'marital_status'
            FROM medi_hrm.hrm_emp_master
            left join hrm_department on hrm_emp_master.em_department = hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
            left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
            left join institution_type on hrm_emp_master.em_institution_type = institution_type.inst_slno
            left join designation on hrm_emp_master.em_designation = designation.desg_slno
            left join hrm_emp_category on hrm_emp_master.em_category = hrm_emp_category.category_slno
            left join hrm_emp_personal on hrm_emp_master.em_id = hrm_emp_personal.em_id
            left join hrm_emp_exp on designation.desg_slno =  hrm_emp_exp.em_designation
            where hrm_emp_master.em_status = 1  and designation.desg_slno IN (?) and is_tmch = 0 and hrm_emp_exp.em_total_year < ?`,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get current and previous greter or equal experience */
    getCurrentPreviousGreter: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            sum((TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE()))+ em_total_year) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_branch.branch_name,
            institution_type.inst_emp_type,
            designation.desg_name,
            hrm_emp_master.em_doj,
            hrm_emp_category.ecat_name,
            case when em_gender = 1 then 'male'when  em_gender = 2 then 'female' else 'Not Updated' end as 'Gender',
            case when hrm_emp_personal.em_maritalstatus = 1 then 'married' when  hrm_emp_personal.em_maritalstatus=2 then 'unmarried' else 'not updated' end as 'marital_status'
            FROM medi_hrm.hrm_emp_master
            left join hrm_department on hrm_emp_master.em_department = hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section = hrm_dept_section.sect_id
            left join hrm_branch on hrm_emp_master.em_branch = hrm_branch.branch_slno
            left join institution_type on hrm_emp_master.em_institution_type = institution_type.inst_slno
            left join designation on hrm_emp_master.em_designation = designation.desg_slno
            left join hrm_emp_category on hrm_emp_master.em_category = hrm_emp_category.category_slno
            left join hrm_emp_personal on hrm_emp_master.em_id = hrm_emp_personal.em_id
             left join hrm_emp_exp on designation.desg_slno =  hrm_emp_exp.em_designation
            where hrm_emp_master.em_status = 1  and designation.desg_slno IN (?) and is_tmch = 0 and hrm_emp_exp.em_total_year >= ?`,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get current tmch less experience */
    getcurrentTmchLess: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            sum((TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE()))+ em_total_year) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and designation.desg_slno IN (?) and is_tmch = 1 and hrm_emp_exp.em_total_year < ? `,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get current tmch greter or equal experience */
    getcurrentTmchGreater: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            sum((TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE()))+ em_total_year) as 'exp_year',
            TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
            FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and designation.desg_slno IN (?) and is_tmch = 1 and hrm_emp_exp.em_total_year >= ? `,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get total experience is less */
    getTotalExpLess: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
            sum( TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) + em_total_year) as 'exp_year',
             TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
             FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and hrm_emp_exp.is_tmch = 1 and designation.desg_slno IN (?) and hrm_emp_exp.em_total_year < ?`,
            [
                data.desg_slno,
                data.em_total_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    /** to get total experience is greter or equal */
    getTotalExpGreater: (data, callBack) => {
        pool.query(
            `SELECT hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_age_year,
            hrm_emp_master.em_mobile,
            hrm_emp_exp.em_from,
            hrm_emp_exp.em_to,
             hrm_emp_exp.em_total_year,
            sum( TIMESTAMPDIFF( YEAR, hrm_emp_master.em_doj, CURRENT_DATE() ) + em_total_year) as 'exp_year',
             TIMESTAMPDIFF( MONTH, hrm_emp_master.em_doj, CURRENT_DATE() ) % 12 as 'exp_month',
             FLOOR( TIMESTAMPDIFF( DAY, hrm_emp_master.em_doj, CURRENT_DATE() ) % 30.4375 ) as 'exp_day',
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
            where hrm_emp_master.em_status = 1  and hrm_emp_exp.is_tmch = 1 and designation.desg_slno IN (?) and hrm_emp_exp.em_total_year >= ?`,
            [
                data.desg_slno,
                data.em_total_year
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
