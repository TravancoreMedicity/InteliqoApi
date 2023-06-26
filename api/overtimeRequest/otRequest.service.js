const pool = require('../../config/database');
module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_ot_master (
                emp_id,
                em_no,
                ot_date,
                ot_days,
                ot_shift_id,
                check_in,
                check_out,
                over_time,
                ot_reson,
                ot_remarks,
                ot_convert ,
                ot_amount,
                ot_inch_require,
                ot_hod_require,
                ot_hr_require,
                ot_ceo_require  ,
                ot_deptsec_id ,
                ot_inch_status,  
                ot_hod_status,
                ot_inch_remark,
                ot_hod_remark          
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [

                data.emp_id,
                data.em_no,
                data.ot_date,
                data.ot_days,
                data.ot_shift_id,
                data.check_in,
                data.check_out,
                data.over_time,
                data.ot_reson,
                data.ot_remarks,
                data.ot_convert,
                data.ot_amount,
                data.ot_inch_require,
                data.ot_hod_require,
                data.ot_hr_require,
                data.ot_ceo_require,
                data.ot_deptsec_id,
                data.ot_inch_status,
                data.ot_hod_status,
                data.ot_inch_remark,
                data.ot_hod_remark

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT ot_days         
                FROM hrm_ot_master
                WHERE ot_days = ? AND emp_id=? and ot_status=0`,
            [
                data.ot_days,
                data.emp_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkCoffInsertVal: (data, callBack) => {
        pool.query(
            `SELECT ot_days         
                FROM hrm_ot_coff_day
                WHERE ot_coff_slno=?`,
            [
                data.ot_coff_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    update: (data, callBack) => {
        pool.query(
            `UPDATE hrm_ot_master 
                SET ot_reson = ?,
                    ot_remarks = ?                    
                WHERE ot_slno= ?`,
            [
                data.ot_reson,
                data.ot_remarks,
                data.ot_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getOtByID: (id, callBack) => {
        pool.query(
            ` SELECT 
            ROW_NUMBER() OVER () as slno,
            ot_slno,
            DATE_FORMAT(ot_days,'%d-%m-%Y ')ot_days,
            DATE_FORMAT(ot_date,'%d-%m-%Y ')ot_date,
            hrm_shift_mast.shft_code,                 
            over_time,
            ot_reson,
            ot_remarks,
            (case when ot_status='1' then "Cancel" when ot_inch_status='2' then "Rejected" else "Pending" end ) as ot_status,
            (case when ot_inch_require=1 and ot_inch_status=0 then "Incharge Pending"  when ot_hod_require=1 and ot_hod_status=0 then "HOD Pending"
            when ot_ceo_require=1 and ot_ceo_status=0 then "CEO Pending" else  "HR Pending" end ) as who
            FROM hrm_ot_master
         LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno=hrm_ot_master.ot_shift_id 
         WHERE emp_id =? AND ot_convert= '0' `,
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
    getOtBySlno: (id, callBack) => {
        pool.query(
            ` SELECT 
                DATE_FORMAT(ot_days,'%d-%m-%Y ')ot_days,
                hrm_shift_mast.shft_code,  
                hrm_shift_mast.shft_chkin_time,
                hrm_shift_mast.shft_chkout_time, 
                check_in,     
                check_out,
                over_time,
                ot_reson,  
                ot_remarks
             FROM hrm_ot_master
             LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno=hrm_ot_master.ot_shift_id 
             WHERE ot_slno= ? `,
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
    //Incharge Approval
    getIncharge: (data, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            ot_slno,
            hrm_ot_master.em_no,
            hrm_ot_master.emp_id,
            hrm_emp_master.em_name,
            hrm_shift_mast.shft_code,
            shft_desc, 
            ot_days,
            ot_date,
            over_time,
            ot_reson,
            ot_inch_status,
            (case when ot_inch_status='1' then "Approved" when ot_inch_status='2' then "Rejected" else "Pending" end ) as inch_status,           
            ot_deptsec_id, 
            sect_name,
            check_in,
            check_out
         FROM medi_hrm.hrm_ot_master
         inner join hrm_emp_master ON hrm_emp_master.em_id=hrm_ot_master.emp_id
         inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
         inner join hrm_shift_mast ON hrm_shift_mast.shft_slno=hrm_ot_master.ot_shift_id
         WHERE ot_inch_require = 1 AND ot_inch_status=0 AND  ot_status=0 AND ot_deptsec_id IN (?) `,
            [
                data

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getinchargeBySlno: (id, callBack) => {
        pool.query(
            `SELECT 
            DATE_FORMAT(ot_days,'%d-%m-%Y ')ot_days,         
            if( ot_new_time is null ,  over_time ,  ot_new_time ) over_time, 
            ot_coff_type,
            ot_reson,
            ot_inch_status,
            ot_inch_remark,
            em_dept_section,
            emp_id,
            ot_inch_require,
            ot_hod_require,
            ot_ceo_require
         FROM hrm_ot_master
         LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=hrm_ot_master.emp_id
         WHERE ot_slno=? `,
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
    inchargeApprove: (data, callBack) => {
        pool.query(
            `UPDATE hrm_ot_master 
                SET ot_inch_status = ?,
                ot_inch_remark= ?,
                ot_inch_user=?,
                ot_coff_type=? ,
                ot_new_time=?  ,
                ot_status=?                
             WHERE ot_slno= ?`,
            [
                data.ot_inch_status,
                data.ot_inch_remark,
                data.ot_inch_user,
                data.ot_coff_type,
                data.ot_new_time,
                data.ot_status,
                data.ot_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //HOD Approval
    getHod: (data, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            ot_slno,
            hrm_ot_master.em_no,
            hrm_emp_master.em_name,
            hrm_ot_master.emp_id,
            hrm_shift_mast.shft_code,
            shft_desc, 
            ot_days,
            ot_date,
            ot_reson,
            over_time,
            ot_reson,
            ot_hod_status,
            (case when ot_hod_status='1' then "Approved" when ot_hod_status='2' then "Rejected" else "Pending" end ) as hod_status,           
            ot_deptsec_id,
            sect_name,
            ot_coff_type,
            ot_inch_status,
            ot_inch_remark,
            check_in,
            check_out
           FROM medi_hrm.hrm_ot_master
           inner join hrm_emp_master ON hrm_emp_master.em_id=hrm_ot_master.emp_id
           inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
           inner join hrm_shift_mast ON hrm_shift_mast.shft_slno=hrm_ot_master.ot_shift_id
           WHERE ot_hod_require = 1 AND  ot_status=0 AND ot_hod_status=0 AND ot_deptsec_id IN (?) `,
            [
                data,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    gethodBySlno: (id, callBack) => {
        pool.query(
            `SELECT 
            DATE_FORMAT(ot_days,'%d-%m-%Y ')ot_days,         
            if( ot_new_time is null ,  over_time ,  ot_new_time ) over_time, 
          	ot_reson,
            ot_new_time,
            ot_inch_status,              
			ot_inch_remark,
            ot_coff_type,
            ot_hod_status,
            ot_hod_remark,
            emp_id,
            ot_inch_require,
            ot_hod_require,
            ot_ceo_require
         FROM hrm_ot_master
         WHERE ot_slno = ? `,
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
    hodApprove: (data, callBack) => {
        pool.query(
            `UPDATE hrm_ot_master 
                SET ot_hod_status = ?,
                ot_hod_remark= ?,
                ot_hod_user=?,
                ot_coff_type=?,
                ot_new_time=? ,
                ot_status=?                   
             WHERE ot_slno= ?`,
            [
                data.ot_hod_status,
                data.ot_hod_remark,
                data.ot_hod_user,
                data.ot_coff_type,
                data.ot_new_time,
                data.ot_status,
                data.ot_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //HR Approval
    getHr: (data, callBack) => {
        pool.query(
            `SELECT 
            ot_slno,
            hrm_ot_master.em_no,
            hrm_emp_master.em_name,
            ot_days,
            ot_date,
             if( ot_new_time is null ,  over_time ,  ot_new_time ) over_time,
            ot_reson,
            (case when ot_hr_status='1' then "Approved" when ot_hr_status='2' then "Rejected" else "Pending" end ) as ot_hr_status,
            ot_deptsec_id,
            (case when ot_inch_require=1 and ot_inch_status=0 then "Incharge Pending"  when ot_hod_require=1 and ot_hod_status=0 then "HOD Pending"
            when ot_ceo_require=1 and ot_ceo_status=0 then "CEO Pending" when ot_hr_status=1 then "Approved" else  "HR Pending" end ) as who
         FROM medi_hrm.hrm_ot_master
         LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id=hrm_ot_master.emp_id
         WHERE ot_hr_require = 1 AND ot_status=0 AND ot_added=0 AND ot_deptsec_id IN (?) `,
            [
                data.dept_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    gethrBySlno: (id, callBack) => {
        pool.query(
            ` SELECT 
            DATE_FORMAT(ot_days,'%d-%m-%Y ')ot_days,         
            if( ot_new_time is null ,  over_time ,  ot_new_time ) over_time,            
			ot_reson,
            ot_coff_type,
            ot_inch_status,              
			ot_inch_remark,
            ot_hod_status,
            ot_hod_remark,
            ot_ceo_status,
            ot_ceo_remark,
            ot_inch_require,
            ot_hod_require,
            ot_ceo_require           
         FROM hrm_ot_master
         WHERE ot_slno=? `,
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
    hrApprove: (data, callBack) => {
        pool.query(
            `UPDATE hrm_ot_master 
                SET ot_hr_status = ?,
                ot_hr_remark= ? ,
                ot_hr_user=?,
                ot_coff_type=?,
                ot_new_time=? ,
                ot_status=?                   
             WHERE ot_slno= ?`,
            [
                data.ot_hr_status,
                data.ot_hr_remark,
                data.ot_hr_user,
                data.ot_coff_type,
                data.ot_new_time,
                data.ot_status,
                data.ot_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //CEO Approval
    getceo: (callBack) => {
        pool.query(
            `SELECT 
 ROW_NUMBER() OVER () as slno,
             ot_slno,
            hrm_ot_master.em_no,
            hrm_emp_master.em_name,
              hrm_ot_master.emp_id,
           hrm_shift_mast.shft_code,
           shft_desc, 
           ot_days,
           ot_date,
           ot_reson,
            if( ot_new_time is null ,  over_time ,  ot_new_time ) over_time,
            ot_reson,
            (case when ot_ceo_status='1' then "Approved" when ot_ceo_status='2' then "Rejected" else "Pending" end ) as ot_ceo_status,
            ot_deptsec_id,
              sect_name
         FROM medi_hrm.hrm_ot_master
        inner join hrm_emp_master ON hrm_emp_master.em_id=hrm_ot_master.emp_id
           inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
           inner join hrm_shift_mast ON hrm_shift_mast.shft_slno=hrm_ot_master.ot_shift_id
         WHERE ot_ceo_require = 1 AND ot_status=0 AND ot_hr_status=0`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getceoBySlno: (id, callBack) => {
        pool.query(
            ` SELECT 
            DATE_FORMAT(ot_days,'%d-%m-%Y ')ot_days,         
            if( ot_new_time is null ,  over_time ,  ot_new_time ) over_time,
            ot_coff_type, 
            ot_inch_status,              
			ot_inch_remark,
            ot_hod_status,
            ot_hod_remark,
			ot_reson,
            ot_inch_require,
            ot_hod_require,
            ot_ceo_require,
            emp_id
            FROM hrm_ot_master
           WHERE ot_slno=? `,
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
    ceoApprove: (data, callBack) => {
        pool.query(
            `UPDATE hrm_ot_master 
                SET ot_ceo_status = ?,
                ot_ceo_remark= ? ,
                ot_ceo_user=?,
                ot_coff_type=? ,
                ot_new_time=? ,
                ot_status=?                    
             WHERE ot_slno= ?`,
            [
                data.ot_ceo_status,
                data.ot_ceo_remark,
                data.ot_ceo_user,
                data.ot_coff_type,
                data.ot_new_time,
                data.ot_status,
                data.ot_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    inactiveOTRequest: (id, callBack) => {
        pool.query(
            `DELETE FROM hrm_ot_master WHERE ot_slno  = ?`,
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
    getcoff: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_ot_coff_day                  
             WHERE ot_coff_slno= ?`,
            [
                data.ot_coff_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertcoff: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_ot_coff_day (
                ot_time,
                emp_id,
                applied_cl,
                ot_coff_slno                        
                )
                VALUES (?,?,?,?)`,
            [
                data.ot_time,
                data.emp_id,
                data.applied_cl,
                data.ot_coff_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    updatecoff: (data, callBack) => {
        pool.query(
            `UPDATE hrm_ot_coff_day 
            SET ot_status =?                                   
            WHERE ot_coff_slno=?`,
            [
                data.ot_status,
                data.ot_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //Get OT for calculation (Approval)
    getOTforCalculation: (data, callBack) => {
        pool.query(
            `SELECT coff_slno,ot_days, ot_time ,ot_slno
            FROM hrm_ot_coff_day
            LEFT JOIN hrm_ot_master ON hrm_ot_master.ot_slno=hrm_ot_coff_day.ot_coff_slno
            WHERE hrm_ot_coff_day.ot_status=0 AND hrm_ot_coff_day.emp_id=? AND applied_cl= 0 `,
            [
                data.emp_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    //Leave calculated table data insert
    insertLeaveCalculated: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_leave_calculated (
                emp_id,
                credited,
                lvetype_slno,
                credited_date,
                approver_user,  
                ot_slno                         
            )VALUES ?`,
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
    //Dept section check for final approval
    getdeptSecCheck: (data, callBack) => {
        pool.query(
            `SELECT authorization_incharge,authorization_hod FROM hrm_dept_section
            WHERE sect_id = ? `,
            [
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateLeaveCalc: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_calculated
                SET credited = 1,
                approver_user = ?                    
                WHERE ot_slno= ?`,
            [
                data.credited,
                data.approver_user,
                data.ot_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateCoffApplaycl: (data, callBack) => {
        pool.query(
            `UPDATE hrm_ot_coff_day 
                SET applied_cl=?                               
                WHERE ot_coff_slno= ?`,
            [
                data.applied_cl,
                data.ot_coff_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateCoffTable: (data, callBack) => {
        pool.query(
            `UPDATE hrm_ot_coff_day 
               SET applied_cl=?                                
               WHERE ot_coff_slno= ?`,
            [
                data.applied_cl,
                data.ot_coff_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatecoffslno: (data) => {
        return new Promise((resolve, reject) => {
            data.ot_coff_slno.map((val) => {
                pool.query(
                    `update hrm_ot_coff_day
                    set applied_cl=1
                    where coff_slno in(?)`,
                    [
                        val
                    ],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(null, results);
                    }
                )
            })
        })
    },
    updateOTslno: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.ot_slno.map((val) => {
                pool.query(
                    `update hrm_ot_master
                    set ot_added=1
                    where ot_slno in(?)`,
                    [
                        val
                    ],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(null, results);
                    }
                )
            })
        })
    },
    inchargecancel: (data, callBack) => {
        pool.query(
            `UPDATE hrm_ot_master 
                SET ot_status = ? ,
                ot_cancel_reason = ?,
                ot_cancel_date=? ,
                ot_cancel_user=?                 
                WHERE ot_slno= ?`,
            [
                data.ot_status,
                data.ot_cancel_reason,
                data.ot_cancel_date,
                data.ot_cancel_user,
                data.ot_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    updatepunchmaster: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET punch_in=NULL,
            punch_out=NULL
            WHERE  duty_day=?
             AND emp_id=?`,
            [
                data.duty_day,
                data.emp_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPunchByDate: (id, callBack) => {
        pool.query(
            `SELECT punch_time,slno,punch_taken FROM medi_hrm.punch_data WHERE emp_code = ? AND punch_time BETWEEN ? AND ?`,
            [
                id.em_no, id.date2, id.date1
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getOTDetails: (id, callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            em_no,
            emp_id,
            ot_slno,
            ot_date,
            ot_days,
            over_time,
            ot_reson,
            ot_remarks,
            ot_shift_id,
            ot_inch_require ,
            ot_inch_status,
            ot_hod_require,
            ot_hod_status,
            hrm_shift_mast.shft_code,  
            hrm_shift_mast.shft_chkin_time,
            hrm_shift_mast.shft_chkout_time, 
            check_in,     
            check_out,
            (case when ot_inch_require=1 and ot_inch_status=0 then "Incharge Pending"  when ot_hod_require=1 and ot_hod_status=0 then "HOD Pending"
            when ot_ceo_require=1 and ot_ceo_status=0 then "CEO Pending" else  "HR Pending" end ) as who
            FROM medi_hrm.hrm_ot_master 
            inner join hrm_shift_mast ON hrm_shift_mast.shft_slno=hrm_ot_master.ot_shift_id
            where emp_id=?;`,
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
    getEmpShiftDetails: (data, callBack) => {
        pool.query(
            `SELECT 
            duty_day,
            punch_slno,
            punch_master.shift_id,
            hrm_shift_mast.shft_slno,
            hrm_shift_mast.shft_chkin_time,
            hrm_shift_mast.shft_chkout_time, 
            punch_in,
            punch_out,
            ot_amount
            FROM punch_master
            LEFT JOIN hrm_shift_mast ON hrm_shift_mast.shft_slno=punch_master.shift_id
            LEFT JOIN hrm_emp_master ON hrm_emp_master.em_id = punch_master.emp_id
             WHERE emp_id=? AND duty_day = ? `,
            [
                data.emp_id,
                data.duty_day
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAllHr: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            ot_slno,
            hrm_ot_master.em_no,
            hrm_emp_master.em_name,
            hrm_ot_master.emp_id,
            hrm_shift_mast.shft_code,
            shft_desc, 
            ot_days,
            ot_date,
            ot_reson,
            ot_inch_status,
            ot_inch_remark,
            ot_hod_status,
            ot_hod_remark,
            ot_ceo_status,
            ot_ceo_remark,
             over_time,
            (case when ot_hr_status='1' then "Approved" when ot_hr_status='2' then "Rejected" else "Pending" end ) as shr_status,
            ot_deptsec_id,
            (case when ot_inch_require=1 and ot_inch_status=0 then "Incharge Pending"  when ot_hod_require=1 and ot_hod_status=0 then "HOD Pending"
            when ot_ceo_require=1 and ot_ceo_status=0 then "CEO Pending" when ot_hr_status=1 then "Approved" else  "HR Pending" end ) as hr_status,
            ot_hr_status,
			sect_name,
            ot_coff_type,
            check_in,
            check_out
            FROM medi_hrm.hrm_ot_master
            inner join hrm_emp_master ON hrm_emp_master.em_id=hrm_ot_master.emp_id
            inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            inner join hrm_shift_mast ON hrm_shift_mast.shft_slno=hrm_ot_master.ot_shift_id
            WHERE ot_hr_require = 1 AND ot_status=0 AND ot_added=0 and ot_inch_status=1 and ot_hod_status=1 or ot_ceo_status=1`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getAllceo: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            ot_slno,
            hrm_ot_master.em_no,
            hrm_emp_master.em_name,
            hrm_ot_master.emp_id,
            hrm_shift_mast.shft_code,
            shft_desc, 
            ot_days,
            ot_date,
            ot_reson,
            over_time,
            ot_reson,
            ot_ceo_status,
            (case when ot_ceo_status='1' then "Approved" when ot_ceo_status='2' then "Rejected" else "Pending" end ) as ceo_status,
            ot_deptsec_id,
            sect_name,
            ot_coff_type,
            ot_inch_status,
            ot_inch_remark,
            ot_hod_status,
            ot_hod_remark,
            check_in,
            check_out
         FROM medi_hrm.hrm_ot_master
        inner join hrm_emp_master ON hrm_emp_master.em_id=hrm_ot_master.emp_id
           inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
           inner join hrm_shift_mast ON hrm_shift_mast.shft_slno=hrm_ot_master.ot_shift_id
         WHERE ot_ceo_require = 1 AND ot_status=0 AND ot_hr_status=0`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    updatePunchtaken: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` UPDATE punch_data 
                    SET punch_taken=?
                    WHERE slno = ?`,
                    [val.punch_taken, val.slno],
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
    resetPunchTaken: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` UPDATE punch_data 
                    SET punch_taken=0
                    WHERE emp_code = ? and punch_time=?`,
                    [val.emp_code, val.punch_time],
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
    OtupdationList: (callBack) => {
        pool.query(
            `SELECT 
            ROW_NUMBER() OVER () as slno,
            ot_slno,
            hrm_ot_master.em_no,
            hrm_ot_master.emp_id,
            hrm_emp_master.em_name,
            ot_days,
            ot_date,
            over_time,
            ot_reson,
            ot_inch_status,           
            ot_deptsec_id, 
            sect_name,
            check_in,
            check_out,
            ot_updation_status,
            ot_updation_date,
            format( hrm_ot_master.ot_amount,2) as ot_amount
         FROM medi_hrm.hrm_ot_master
         inner join hrm_emp_master ON hrm_emp_master.em_id=hrm_ot_master.emp_id
         inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
         WHERE  ot_hr_status=1 AND  ot_status=0 ;`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    updateOt: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` update hrm_ot_master
                    set ot_updation_status=1,
                    ot_updation_date=?
                    where emp_id=? and ot_days=?`,
                    [val.ot_updation_date, val.emp_id, val.ot_days],
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
    getEmpbyNo: (id, callBack) => {
        pool.query(
            `SELECT
            em_id, 
            em_no,
            em_name,
            em_branch,
            em_department,
            dept_name,
            em_dept_section,
            sect_name,
            em_category,
            em_prob_end_date,
            em_designation,
            desg_name,
            em_doj,
            em_contract_end_date,
            em_conf_end_date,
            contract_status,
            ot_amount
            FROM hrm_emp_master 
            inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            inner join designation on hrm_emp_master.em_designation=designation.desg_slno
            WHERE em_no=?`,
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
    createDirectReq: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_ot_master (
                emp_id,
                em_no,
                ot_date,
                ot_days,
                ot_shift_id,
                check_in,
                check_out,
                over_time,
                ot_reson,
                ot_remarks,
                ot_convert ,
                ot_amount,
                ot_inch_require,
                ot_hod_require,
                ot_hr_require,
                ot_ceo_require  ,
                ot_deptsec_id ,
                ot_inch_status,  
                ot_hod_status,
                ot_inch_remark,
                ot_hod_remark         
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [

                data.emp_id,
                data.em_no,
                data.ot_date,
                data.ot_days,
                data.ot_shift_id,
                data.check_in,
                data.check_out,
                data.over_time,
                data.ot_reson,
                data.ot_remarks,
                data.ot_convert,
                data.ot_amount,
                data.ot_inch_require,
                data.ot_hod_require,
                data.ot_hr_require,
                data.ot_ceo_require,
                data.ot_deptsec_id,
                data.ot_inch_status,
                data.ot_hod_status,
                data.ot_inch_remark,
                data.ot_hod_remark

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteOtUpdate: (data, callBack) => {
        pool.query(
            `update hrm_ot_master
            set ot_updation_status=0,
            ot_updation_date=null
            where emp_id=? and ot_slno=?`,
            [
                data.emp_id,
                data.ot_slno
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