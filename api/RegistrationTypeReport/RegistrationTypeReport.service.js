const pool = require('../../config/database');

module.exports = {
    RegistrationTypeReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_qual.em_no, 
            hrm_emp_master.em_name,
            hrm_branch.branch_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_registrationtype.registration_name,
            hrm_emp_qual.em_exp_date,
            if(DATEDIFF( em_exp_date,CURRENT_DATE())<0,"expired",DATEDIFF( em_exp_date,CURRENT_DATE())) as 'Remaining_days'
            FROM medi_hrm.hrm_emp_qual
            left join hrm_emp_master on hrm_emp_qual.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_emp_master.em_branch=hrm_branch.branch_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_emp_registrationtype on hrm_emp_qual.em_reg_type=hrm_emp_registrationtype.reg_id
            where em_status=1 and hrm_department.dept_id IN(?) and not registration_name is null and not registration_name='NOT REQUIRED' and hrm_dept_section.sect_id IN(?)`,
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
    DeptRegistrationTypeReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_qual.em_no, 
            hrm_emp_master.em_name,
            hrm_branch.branch_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_registrationtype.registration_name,
            hrm_emp_qual.em_exp_date,
            if(DATEDIFF( em_exp_date,CURRENT_DATE())<0,"expired",DATEDIFF( em_exp_date,CURRENT_DATE())) as 'Remaining_days'
            FROM medi_hrm.hrm_emp_qual
            left join hrm_emp_master on hrm_emp_qual.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_emp_master.em_branch=hrm_branch.branch_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_emp_registrationtype on hrm_emp_qual.em_reg_type=hrm_emp_registrationtype.reg_id
            where em_status=1 and hrm_department.dept_id IN(?) and not registration_name is null and not registration_name='NOT REQUIRED'`,
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
    EmpRegistrationTypeReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_branch.branch_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_qual.em_reg_no,
              hrm_emp_qual.em_exp_date,
              hrm_emp_registrationtype.registration_name,
             if(DATEDIFF( em_exp_date,CURRENT_DATE())<0,"expired",DATEDIFF( em_exp_date,CURRENT_DATE())) as 'Remaining_days'
            FROM medi_hrm.hrm_emp_master
            LEFT JOIN hrm_branch ON hrm_emp_master.em_branch=hrm_branch.branch_slno
            LEFT JOIN hrm_department ON hrm_emp_master.em_department=hrm_department.dept_id
            LEFT JOIN hrm_dept_section ON hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            LEFT JOIN hrm_emp_qual ON hrm_emp_master.em_id=hrm_emp_qual.em_id
            LEFT JOIN hrm_emp_registrationtype ON hrm_emp_qual.em_reg_type=hrm_emp_registrationtype.reg_id
            WHERE em_status=1 AND hrm_emp_registrationtype.reg_id IN(?)`,
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
    getRegistrTyp: (callBack) => {
        pool.query(
            `SELECT reg_id,registration_name FROM medi_hrm.hrm_emp_registrationtype WHERE NOT registration_name='NOT REQUIRED'`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    RegistrationNumberWiseReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_qual.em_no, 
            hrm_emp_master.em_name,
            hrm_branch.branch_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_registrationtype.registration_name,
            hrm_emp_qual.em_reg_no,
            hrm_emp_qual.em_exp_date,
            'Not Relevent' as em_chellan,
            'Not Relevent' as em_chellan_exp_date,
            if(DATEDIFF( em_exp_date,CURRENT_DATE())<0,"expired",DATEDIFF( em_exp_date,CURRENT_DATE())) as 'Remaining_days'
            FROM medi_hrm.hrm_emp_qual
            left join hrm_emp_master on hrm_emp_qual.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_emp_master.em_branch=hrm_branch.branch_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_emp_registrationtype on hrm_emp_qual.em_reg_type=hrm_emp_registrationtype.reg_id
            WHERE  hrm_emp_qual.em_reg_type !=0 AND hrm_emp_registrationtype.reg_id IN (?)`,
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
    ChellanWiseReport: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_qual.em_no, 
            hrm_emp_master.em_name,
            hrm_branch.branch_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_registrationtype.registration_name,
            'Not Relevent' as em_reg_no,
            'Not Relevent' as em_exp_date,
            hrm_emp_qual.em_chellan,
            hrm_emp_qual.em_chellan_exp_date,
            if(DATEDIFF( em_exp_date,CURRENT_DATE())<0,"expired",DATEDIFF( em_exp_date,CURRENT_DATE())) as 'Remaining_days'
            FROM medi_hrm.hrm_emp_qual
            left join hrm_emp_master on hrm_emp_qual.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_emp_master.em_branch=hrm_branch.branch_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_emp_registrationtype on hrm_emp_qual.em_reg_type=hrm_emp_registrationtype.reg_id
            WHERE  hrm_emp_registrationtype.reg_id IN (?) AND hrm_emp_qual.em_reg_type !=0`,
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
    /** Get registration number with expiry date */
    RegNumberWithDate: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_qual.em_no, 
            hrm_emp_master.em_name,
            hrm_branch.branch_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_registrationtype.registration_name,
            hrm_emp_qual.em_reg_no,
            hrm_emp_qual.em_exp_date,
            'Not Relevent' as em_chellan,
            'Not Relevent' as em_chellan_exp_date,
            if(DATEDIFF( em_exp_date,CURRENT_DATE())<0,"expired",DATEDIFF( em_exp_date,CURRENT_DATE())) as 'Remaining_days'
            FROM medi_hrm.hrm_emp_qual
            left join hrm_emp_master on hrm_emp_qual.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_emp_master.em_branch=hrm_branch.branch_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_emp_registrationtype on hrm_emp_qual.em_reg_type=hrm_emp_registrationtype.reg_id
            WHERE hrm_emp_registrationtype.reg_id IN (?) AND hrm_emp_qual.em_reg_type !=0  AND DATE(em_exp_date) between curdate() AND ?`,
            [
                data.reg_id,
                data.em_exp_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    /** Registration number only report */
    getRegisterOnly: (callBack) => {
        pool.query(
            `call medi_hrm.GET_REG_NUM_ONLY(); `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    /** Challan Number only report */
    getChallanOnly: (callBack) => {
        pool.query(
            `call medi_hrm.GET_CHALN_NUM_ONLY();`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getChallanRegistrationCombined: (callBack) => {
        pool.query(
            `call medi_hrm.GET_CHLN_AND_REG_NUM(); `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    /** Get challan number with expiry date */
    challanNumberWithDate: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_qual.em_no, 
            hrm_emp_master.em_name,
            hrm_branch.branch_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_registrationtype.registration_name,
            hrm_emp_qual.em_chellan,
            hrm_emp_qual.em_chellan_exp_date,
            'Not Relevent' as em_reg_no,
            'Not Relevent' as em_exp_date,
            if(DATEDIFF( em_exp_date,CURRENT_DATE())<0,"expired",DATEDIFF( em_exp_date,CURRENT_DATE())) as 'Remaining_days'
            FROM medi_hrm.hrm_emp_qual
            left join hrm_emp_master on hrm_emp_qual.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_emp_master.em_branch=hrm_branch.branch_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_emp_registrationtype on hrm_emp_qual.em_reg_type=hrm_emp_registrationtype.reg_id
            WHERE hrm_emp_registrationtype.reg_id IN (?) AND hrm_emp_qual.em_reg_type !=0  AND DATE(em_exp_date) between curdate() AND ?`,
            [
                data.reg_id,
                data.em_exp_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getCombinedRegType: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_qual.em_no, 
            hrm_emp_master.em_name,
            hrm_branch.branch_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_registrationtype.registration_name,
            hrm_emp_qual.em_reg_no,
            hrm_emp_qual.em_chellan,
            hrm_emp_qual.em_exp_date,
            hrm_emp_qual.em_chellan_exp_date,
            if(DATEDIFF( em_exp_date,CURRENT_DATE())<0,"expired",DATEDIFF( em_exp_date,CURRENT_DATE())) as 'Remaining_days'
            FROM medi_hrm.hrm_emp_qual
            left join hrm_emp_master on hrm_emp_qual.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_emp_master.em_branch=hrm_branch.branch_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_emp_registrationtype on hrm_emp_qual.em_reg_type=hrm_emp_registrationtype.reg_id
            WHERE (hrm_emp_qual.em_reg_no OR hrm_emp_qual.em_chellan) AND hrm_emp_qual.em_reg_type !=0 AND hrm_emp_registrationtype.reg_id IN (?) `,
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
    /** Both challan and registration number details with date, register type */
    getCombinedWithdate: (data, callBack) => {
        pool.query(
            `SELECT 
            hrm_emp_qual.em_no, 
            hrm_emp_master.em_name,
            hrm_branch.branch_name,
            hrm_department.dept_name,
            hrm_dept_section.sect_name,
            hrm_emp_registrationtype.registration_name,
            hrm_emp_qual.em_reg_no,
            hrm_emp_qual.em_chellan,
            hrm_emp_qual.em_exp_date,
            hrm_emp_qual.em_chellan_exp_date,
            if(DATEDIFF( em_exp_date,CURRENT_DATE())<0,"expired",DATEDIFF( em_exp_date,CURRENT_DATE())) as 'Remaining_days'
            FROM medi_hrm.hrm_emp_qual
            left join hrm_emp_master on hrm_emp_qual.em_id=hrm_emp_master.em_id
            left join hrm_branch on hrm_emp_master.em_branch=hrm_branch.branch_slno
            left join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            left join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            left join hrm_emp_registrationtype on hrm_emp_qual.em_reg_type=hrm_emp_registrationtype.reg_id
            WHERE (hrm_emp_qual.em_reg_no OR hrm_emp_qual.em_chellan) AND hrm_emp_qual.em_reg_type !=0 AND hrm_emp_registrationtype.reg_id IN (?) AND DATE(em_exp_date) between curdate() AND ? `,
            [
                data.reg_id,
                data.em_exp_date
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