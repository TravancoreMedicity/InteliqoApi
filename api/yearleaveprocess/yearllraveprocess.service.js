const pool = require('../../config/database');

module.exports = {
    getLeaveProccedData: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_leave_process WHERE em_no = ?  and hrm_process_status ='A' AND year(next_updatedate) = ?`,
            [
                data.em_no,
                data.year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    inactiveLastYearProcessData: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_process SET hrm_process_status = 'N' WHERE lv_process_slno = ?`,
            [
                data.lv_process_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkTable: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_leave_process
                WHERE em_id = ?  and hrm_process_status ='A' AND year(next_updatedate) = year(curdate());`,
            [data.em_no],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    insertprocesstable: (data, callBack) => {
        pool.query(
            `insert  into hrm_leave_process(
                lv_process_slno,
                em_no,
                category_slno, 
                process_user,  
                em_id,
                hrm_clv,
                hrm_ern_lv, 
                hrm_hld,
                hrm_cmn,
                hrm_calcu,
                hrm_process_status,
                next_updatedate)
                 values (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.lv_process_slno,
                data.em_no,
                data.category_slno,
                data.process_user,
                data.em_id,
                data.hrm_clv,
                data.hrm_ern_lv,
                data.hrm_hld,
                data.hrm_cmn,
                data.hrm_calcu,
                data.hrm_process_status,
                data.next_updatedate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )



    },
    update: (data, callBack) => {
        pool.query(
            `update hrm_leave_process set 
            hrm_process_status='N' 
            where 
            lv_process_slno=?`,
            [
                data.lv_process_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    checkprocessdone: (data, callBack) => {
        pool.query(
            `update hrm_leave_process set 
            hrm_process_status='N' 
            where 
            lv_process_slno=?`,
            [
                data.lv_process_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getdataById: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_leave_process where lv_process_slno=?;`,
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
    // insert casual leave 
    insertcasualleave: (data, callBack) => {
        pool.query(
            `insert  into hrm_leave_cl(
                em_no, em_id,
                cl_lv_mnth, 
                cl_lv_year,
                cl_lv_allowed, 
                cl_lv_credit, 
                cl_lv_taken,
                lv_process_slno,
                update_user) values ?`,
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
    // insert earn leave
    insertearnleave: (data, callBack) => {
        pool.query(
            `insert  into hrm_leave_earnlv(
                em_no,
                ernlv_mnth, 
                ernlv_year,
                ernlv_allowed, 
                ernlv_credit,
                ernlv_taken,
                lv_process_slno,
                update_user,
                em_id) values ?`,
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

    // get holiday list
    getholidaylist: (callBack) => {
        pool.query(
            `SELECT * FROM hrm_yearly_holiday_list  where  year(hld_date) = year(current_date())`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    // insert holiday
    insertHoliday: (data, callBack) => {
        pool.query(
            `insert  into hrm_leave_holiday(
                em_no, 
                hd_slno,
                hl_lv_year,
                hl_date,
                hl_lv_credit,
                hl_lv_taken,
                hl_lv_allowed,
                lv_process_slno,
                update_user,
                em_id,
                special_type) 
                values ?`,
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
    // updatecasual leave
    updatecasualleave: (data, callBack) => {

        pool.query(
            `update hrm_leave_process set 
            hrm_clv='1' 
            where 
            lv_process_slno=?`,
            [
                data.lv_proce
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // update holiday
    updateholiday: (data, callBack) => {

        pool.query(
            `update hrm_leave_process set 
            hrm_hld='1' 
            where 
            lv_process_slno=?`,
            [
                data.lv_proce

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // update earn leave
    updateearnleave: (data, callBack) => {
        pool.query(
            `update hrm_leave_process set 
            hrm_ern_lv='1' 
            where 
            lv_process_slno=?`,
            [
                data.lv_proce

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // update common
    updatecommon: (data, callBack) => {
        pool.query(
            `update hrm_leave_process set 
            hrm_cmn='1' 
            where 
            lv_process_slno=?`,
            [
                data.lv_proce

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    // update processslno
    updateprocessslno: (data, callBack) => {
        pool.query(
            `update master_serialno set 
            serial_current=serial_current+1
            where 
            serial_slno=4`,
            [


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    // inser common leave
    insertCommonleave: (data, callBack) => {
        pool.query(
            `insert  into hrm_leave_common(
                em_no, 
                llvetype_slno,
                cmn_lv_allowedflag,
                cmn_lv_allowed, 
                cmn_lv_taken, 
                cmn_lv_balance, 
                Iv_process_slno,
                update_user,
                em_id,
                cmn_lv_year
                ) 
                values ?`,
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
    // update common process slno
    updatecasualleaveupdateslno: (data, callBack) => {
        pool.query(
            //Update casual leave inactive (as "1" ) // inactive status --> "1" consider for the leave carry forward
            `update hrm_leave_cl 
                set cl_lv_active='1'
                where 
                lv_process_slno=? and cl_lv_active='0'`,
            [
                data.oldprocessslno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //Update Holiday Leave inactive (as "1" ) // inactive status --> "1" consider for the leave carry forward
    updateholidayupdateslno: (data, callBack) => {
        pool.query(
            `update hrm_leave_holiday 
                set hl_lv_active='1'
            where 
                lv_process_slno=? 
            and  hl_lv_active='0'`,
            [
                data.oldprocessslno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    // Update earn leave slno inactive (as "1" ) // inactive status --> "1" consider for the leave carry forward
    updateeanleaveupdate: (data, callBack) => {
        pool.query(
            `update hrm_leave_earnlv set 
            earn_lv_active='1'
                where 
                lv_process_slno=? and  earn_lv_active='0'`,
            [
                data.oldprocessslno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //CREDIT CASUAL ON LEAVE REQUEST IF CL IS NOT CREDITED
    creditCasualLeave: (data, callBack) => {
        pool.query(
            `update hrm_leave_cl
            set cl_lv_credit=1
            where hrm_cl_slno=?`,
            [
                data.hrm_cl_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //getting casual leave allowed to a comployye
    allowableCasualLeave: (data, callBack) => {
        pool.query(
            `select 
                hrm_cl_slno,
                em_no,
                em_id,
                cl_lv_year,
                MONTHNAME(cl_lv_mnth)cl_lv_mnth,
                cl_bal_leave,
                hl_lv_tkn_status,
                cl_lv_taken,
                special_remark
            From hrm_leave_cl
            where cl_lv_credit=1 and em_no = ? and cl_lv_taken < 1
            and year(cl_lv_mnth) = year(curdate()) and cl_lv_active=0`,
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

    //getting holiday allowed to a comployye
    allowableholiday: (data, callBack) => {
        pool.query(
            `SELECT 
                hrm_hl_slno,
                hd_slno,
                hld_desc,
                hl_lv_taken,
                lvetype_slno,
                hl_lv_tkn_status
            FROM hrm_leave_holiday
            left join hrm_yearly_holiday_list on hrm_yearly_holiday_list.hld_slno=hrm_leave_holiday.hd_slno
            where  em_no= ? and  hl_lv_active = 0 and hl_lv_taken < 1
            and year( hl_lv_year ) = year(curdate())`,
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
    //getting festival holiday allowed to a comployye
    allowablefesitval: (data, callBack) => {
        pool.query(
            `SELECT hrm_hl_slno,
            hd_slno,
            hld_desc,
            hl_lv_taken
             FROM hrm_leave_holiday
             left join hrm_yearly_holiday_list 
             on hrm_yearly_holiday_list.hld_slno=hrm_leave_holiday.hd_slno
              where lvetype_slno=4 and em_id=? and  hl_lv_active=0`,
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

    allowableearnleave: (data, callBack) => {
        pool.query(
            `SELECT 
                hrm_ernlv_slno,
                em_no,
                em_id,
                ernlv_mnth,
                MONTHNAME(ernlv_mnth)ernlv_mnth,
                ernlv_taken,
                ernlv_year,
                hl_lv_tkn_status,
                special_remark
            FROM hrm_leave_earnlv
            WHERE ernlv_credit=1 
            AND em_no = ?
            AND ernlv_taken < 1
            AND earn_lv_active=0
            AND credit_year = year(curdate())`,
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
    allowableconleave: (data, callBack) => {
        pool.query(
            `SELECT 
                hrm_lv_cmn,
                llvetype_slno, 
                hrm_leave_type.lvetype_desc,
                cmn_lv_allowed, 
                cmn_lv_taken, 
                cmn_lv_balance,
                em_no
            FROM hrm_leave_common 
            LEFT JOIN hrm_leave_type ON hrm_leave_type.lvetype_slno = hrm_leave_common.llvetype_slno
            WHERE em_no  = ?
            AND year(cmn_lv_year) = year(curdate()) and cmn_status=0`,
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
    dataannualcalculation: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_name,hrm_emp_master.em_no,ecat_el,ecat_cl,
            SUM(duty_status) duty_day,ecat_sl,ecat_nh,
            ecat_fh,ecat_esi_allow,ecat_confere ,em_gender,
            ecat_cont,ecat_doff_allow,ecat_lop,ecat_mate,ecat_woff_allow,em_category
            FROM punch_master
            LEFT JOIN hrm_emp_master ON punch_master.emp_id=hrm_emp_master.em_id 
            LEFT JOIN hrm_emp_category ON hrm_emp_master.em_category=hrm_emp_category.category_slno 
            WHERE DATE(duty_day) between ? AND ? and em_dept_section=? and em_status=1
             GROUP BY  em_id,em_name,hrm_emp_master.em_no,ecat_el;`,
            [
                data.startdate,
                data.endate,
                data.dp_sec
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    holidaylistyear: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_yearly_holiday_list where DATE(hld_date) between ? AND ? `,
            [
                data.startdate,
                data.endate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    //insert yearly leave process data

    insertyearly: (data, callBack) => {
        pool.query(
            `insert  into yearly_leave_process(
                em_no,
                em_id,
                proceeuser,
                year_of_process,
                year
                ) values (?,?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.processUser,
                data.currentYear,
                data.year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    select_yearlyprocess: (data, callBack) => {
        pool.query(
            `SELECT * FROM yearly_leave_process where year(year_of_process) = ? and em_no= ?`,
            [
                data.em_no,
                data.currentYear,
            ],
            (error, results, feilds) => {


                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    dataannualcalculationEmployee: (data, callBack) => {
        pool.query(
            `SELECT em_id,em_name,hrm_emp_master.em_no,ecat_el,ecat_cl,
            SUM(duty_status) duty_day,ecat_sl,ecat_nh,
            ecat_fh,ecat_esi_allow,ecat_confere ,em_gender,
            ecat_cont,ecat_doff_allow,ecat_lop,ecat_mate,ecat_woff_allow,em_category
            FROM punch_master
            LEFT JOIN hrm_emp_master ON punch_master.emp_id=hrm_emp_master.em_id 
            LEFT JOIN hrm_emp_category ON hrm_emp_master.em_category=hrm_emp_category.category_slno 
            WHERE DATE(duty_day) between ? AND ? and emp_id=? and em_status=1
             GROUP BY  em_id,em_name,hrm_emp_master.em_no,ecat_el;`,
            [
                data.startdate,
                data.endate,
                data.emp_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    creditPrivilegeLeave: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_earnlv SET credit_status = 1 ,ernlv_credit=1,credit_year = ?  WHERE year(ernlv_year) = ? AND em_no = ?`,
            [
                data.currentYear,
                data.creditYear,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    inactiveCasualLeave: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_cl SET cl_lv_active = 1 WHERE year(cl_lv_mnth) = ? AND em_no = ?`,
            [
                data.lastYear,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    inactiveHoliday: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_holiday SET hl_lv_active = 1 WHERE year(hl_date) = ? AND em_no = ?`,
            [
                data.lastYear,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    inactiveCommonLeave: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_common SET cmn_status = 1 WHERE year(cmn_lv_year) = ? AND em_no = ? `,
            [
                data.lastYear,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    inactiveEarnLeave: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_earnlv SET earn_lv_active = 1 WHERE year(ernlv_year) = ? AND em_no = ? AND credit_status = 1`,
            [
                data.lastYear,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEsiPfDetails: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_emp_pfesi where em_no=?;`,
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
    getleaveProcessData: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_leave_common where em_no=? and cmn_status=0`,
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
    inactiveSickLeave: (data, callBack) => {
        pool.query(
            `UPDATE hrm_leave_common SET cmn_status = 1 WHERE hrm_lv_cmn=?`,
            [
                data.hrm_lv_cmn
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertStatutoryCommonleave: (data, callBack) => {
        pool.query(
            `insert  into hrm_leave_common(
                em_no, 
                llvetype_slno,
                cmn_lv_allowedflag,
                cmn_lv_allowed, 
                cmn_lv_taken, 
                cmn_lv_balance, 
                Iv_process_slno,
                update_user,
                em_id,
                cmn_lv_year
                ) 
                values (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_no,
                data.llvetype_slno,
                data.cmn_lv_allowedflag,
                data.cmn_lv_allowed,
                data.cmn_lv_taken,
                data.cmn_lv_balance,
                data.Iv_process_slno,
                data.update_user,
                data.em_id,
                data.cmn_lv_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertSickLeave: (data, callBack) => {
        pool.query(
            `insert  into hrm_leave_common(
                em_no, 
                llvetype_slno,
                cmn_lv_allowedflag,
                cmn_lv_allowed, 
                cmn_lv_taken, 
                cmn_lv_balance, 
                Iv_process_slno,
                update_user,
                em_id,
                cmn_lv_year
                ) 
                values (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.em_no,
                data.llvetype_slno,
                data.cmn_lv_allowedflag,
                data.cmn_lv_allowed,
                data.cmn_lv_taken,
                data.cmn_lv_balance,
                data.Iv_process_slno,
                data.update_user,
                data.em_id,
                data.cmn_lv_year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateCommonUpdateSlno: (data, callBack) => {
        pool.query(
            `update hrm_leave_common set cmn_status='1' where Iv_process_slno=? and  cmn_status='0'`,
            [
                data.oldprocessslno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getLeavecountbyDate: (data, callBack) => {
        pool.query(
            `select 
            em_no,
            em_name,
            Clcredit,
            takenCL,
            (Clcredit - takenCL) BalanceCL,
            ELcredit,
            takenEl,
            (ELcredit - takenEl) BalanceEL,
            SLcredit,
            takenSL,
            (SLcredit - takenSL) BalanceSL,
            dept_name,
            sect_name
        from (
        select 
            c.em_no,
            f.em_name,
            sum(clcredit) CLcredit,
            sum(takenCL) takenCL,
            sum(ELcredit) ELcredit,
            sum(takenEL) takenEL,
            sum(SLallowed) SLcredit,
            sum(takenSL) takenSL,
             g.dept_name,
             h.sect_name
        from(
            select 
                em_no,
                sum(cl_lv_allowed) clallowed,
                sum(cl_lv_credit) clcredit,
                0 takenCL,
                0 ELallowed,
                0 ELcredit,
                0 takenEL,
                0 SLallowed,
                0 takenSL
            from hrm_leave_cl where cl_lv_active = 0 and year(cl_lv_mnth) =year(?)
            group by em_no
            union all
            select 
                b.em_no,
                0 clallowed,
                0 clcredit,
                sum(coalesce(a.leaveCount,0)) takenCL,
                0 ELallowed,
                0 ELcredit,
                0 takenEL,
                0 SLallowed,
                0 takenSL
            from hrm_leave_request_detl a
            left join hrm_leave_request b on b.lve_uniq_no = a.lve_uniq_no
            where a.leave_typeid = 1 and a.leave_cancel is null and a.leave_status = 1
            and b.lv_cancel_status=0 and b.lv_cancel_status_user=0
            and a.leave_dates >= ? and a.leave_dates <= ?
            group by b.em_no 
             union all
            select 
                 a.em_no,
                0 clallowed,
                 0 clcredit,
                  ROUND(count(a.month)/2, 1) AS takenCL,
                 0 ELallowed,
                0 ELcredit,
                 0 takenEL,
                 0 SLallowed,
                 0 takenSL
             from hrm_halfdayrequest a
             where lv_cancel_status=0 and lv_cancel_req_status_user=0 
             and  hf_hr_apprv_status!=2 and  hf_hr_apprv_status!=0
             and a.leavedate >= ? and a.leavedate <= ?
             group by a.em_no 
            union all
            select 
                em_no,
                0 Clallowed,
                0 CLcredit,
                0 takenCL,
                sum(ernlv_allowed) ELallowed,
                sum(ernlv_credit) ELcredit,
                0 takenEL,
                0 SLallowed,
                0 takenSL
            from hrm_leave_earnlv where earn_lv_active = 0 and credit_year = year(?)
            group by em_no
            union all
            select 
                b.em_no,
                0 Clallowed,
                0 CLcredit,
                0 takenCL,
                0 ELallowed,
                0 ELcredit,
                count(a.leave_status) takenEL,
                0 SLallowed,
                0 takenSL
            from hrm_leave_request_detl a
            left join hrm_leave_request b on b.lve_uniq_no = a.lve_uniq_no
            where a.leave_typeid = 8 and a.leave_cancel is null and a.leave_status = 1
            and a.leave_dates >= ? and a.leave_dates <= ? 
            group by b.em_no
            union all
            select 
                em_no,
                0 Clallowed,
                0 CLcredit,
                0 takenCL,
                0 ELallowed,
                0 ELcredit,
                0 takenEL,
                cmn_lv_allowed SLallowed,
                0 takenSL
                from hrm_leave_common 
            where llvetype_slno = 7 and year(cmn_lv_year) = year(?) and cmn_status=0
            union all
            select 
                b.em_no,
                0 Clallowed,
                0 CLcredit,
                0 takenCL,
                0 ELallowed,
                0 ELcredit,
                0 takenEL,
                0 SLallowed,
                count(a.leave_status) takenSL
            from hrm_leave_request_detl a
            left join hrm_leave_request b on b.lve_uniq_no = a.lve_uniq_no
            where a.leave_typeid = 7 and a.leave_cancel is null and a.leave_status = 1
            and a.leave_dates >= ? and a.leave_dates <= ?
            group by b.em_no
        ) as c right join hrm_emp_master f on c.em_no = f.em_no
        right join hrm_department g on f.em_department=g.dept_id
        right join hrm_dept_section h on f.em_dept_section=h.sect_id
        where f.em_status = 1
        group by 1 ) tble `,
            [
                data.currentyear,
                data.fromDate1,
                data.toDate1,
                data.fromDate1,
                data.toDate1,
                data.currentyear,
                data.fromDate1,
                data.toDate1,
                data.currentyear,
                data.fromDate1,
                data.toDate1,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getYearlyLeaveCount: (data, callBack) => {
        pool.query(
            `select 
            em_no,
            em_name,
            Clcredit,
            takenCL,
            (Clcredit - takenCL) BalanceCL,
            ELcredit,
            takenEl,
            (ELcredit - takenEl) BalanceEL,
            SLcredit,
            takenSL,
            (SLcredit - takenSL) BalanceSL,
            dept_name,
            sect_name,
            dept_id,
            sect_id
        from (
        select 
            c.em_no,
            f.em_name,
            sum(clcredit) CLcredit,
            sum(takenCL) takenCL,
            sum(ELcredit) ELcredit,
            sum(takenEL) takenEL,
            sum(SLallowed) SLcredit,
            sum(takenSL) takenSL,
             g.dept_name,
             h.sect_name,
             g.dept_id,
             h.sect_id
        from(
            select 
                em_no,
                sum(cl_lv_allowed) clallowed,
                sum(cl_lv_credit) clcredit,
                0 takenCL,
                0 ELallowed,
                0 ELcredit,
                0 takenEL,
                0 SLallowed,
                0 takenSL
            from hrm_leave_cl where  year(cl_lv_mnth) =year(?)
            group by em_no
            union all
            select 
                b.em_no,
                0 clallowed,
                0 clcredit,
                sum(coalesce(a.leaveCount,0)) takenCL,
                0 ELallowed,
                0 ELcredit,
                0 takenEL,
                0 SLallowed,
                0 takenSL
            from hrm_leave_request_detl a
            left join hrm_leave_request b on b.lve_uniq_no = a.lve_uniq_no
            where a.leave_typeid = 1 and a.leave_cancel is null and a.leave_status = 1
            and b.lv_cancel_status=0 and b.lv_cancel_status_user=0
            and a.leave_dates >= ? and a.leave_dates <= ?
            group by b.em_no 
             union all
            select 
                 a.em_no,
                0 clallowed,
                 0 clcredit,
                  ROUND(count(a.month)/2, 1) AS takenCL,
                 0 ELallowed,
                0 ELcredit,
                 0 takenEL,
                 0 SLallowed,
                 0 takenSL
             from hrm_halfdayrequest a
             where lv_cancel_status=0 and lv_cancel_req_status_user=0 
             and  hf_hr_apprv_status!=2 and  hf_hr_apprv_status!=0
             and a.leavedate >= ? and a.leavedate <= ?
             group by a.em_no 
            union all
            select 
                em_no,
                0 Clallowed,
                0 CLcredit,
                0 takenCL,
                sum(ernlv_allowed) ELallowed,
                sum(ernlv_credit) ELcredit,
                0 takenEL,
                0 SLallowed,
                0 takenSL
            from hrm_leave_earnlv where  credit_year = year(?)
            group by em_no
            union all
            select 
                b.em_no,
                0 Clallowed,
                0 CLcredit,
                0 takenCL,
                0 ELallowed,
                0 ELcredit,
                count(a.leave_status) takenEL,
                0 SLallowed,
                0 takenSL
            from hrm_leave_request_detl a
            left join hrm_leave_request b on b.lve_uniq_no = a.lve_uniq_no
            where a.leave_typeid = 8 and a.leave_cancel is null and a.leave_status = 1
            and a.leave_dates >= ? and a.leave_dates <= ?
            group by b.em_no
            union all
            select 
                em_no,
                0 Clallowed,
                0 CLcredit,
                0 takenCL,
                0 ELallowed,
                0 ELcredit,
                0 takenEL,
                cmn_lv_allowed SLallowed,
                0 takenSL
                from hrm_leave_common 
            where llvetype_slno = 7 and year(cmn_lv_year) = year(?) 
             group by em_no
            union all
            select 
                b.em_no,
                0 Clallowed,
                0 CLcredit,
                0 takenCL,
                0 ELallowed,
                0 ELcredit,
                0 takenEL,
                0 SLallowed,
                count(a.leave_status) takenSL
            from hrm_leave_request_detl a
            left join hrm_leave_request b on b.lve_uniq_no = a.lve_uniq_no
            where a.leave_typeid = 7 and a.leave_cancel is null and a.leave_status = 1
            and a.leave_dates >= ? and a.leave_dates <= ?
            group by b.em_no
        ) as c right join hrm_emp_master f on c.em_no = f.em_no
        right join hrm_department g on f.em_department=g.dept_id
        right join hrm_dept_section h on f.em_dept_section=h.sect_id
        where f.em_status = 1
        group by 1 ) tble`,
            [
                data.currentyear,
                data.fromDate1,
                data.toDate1,
                data.fromDate1,
                data.toDate1,
                data.currentyear,
                data.fromDate1,
                data.toDate1,
                data.currentyear,
                data.fromDate1,
                data.toDate1,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getYearlyCasualLeaveCount: (data, callBack) => {
        pool.query(
            `select 
            em_no,
            em_id,
            em_name,
            credited,
            taken,
             (credited - taken) balance,
             carryforward,
            dept_name,
            sect_name,
           dept_id,
             sect_id,
             lv_process_slno
        from (
        select 
        f.em_id,
            c.em_no,
            f.em_name,
            sum(clcredit) credited,
            sum(takenCL) taken,
            sum(carryforward) carryforward,
             g.dept_name,
             h.sect_name,
             g.dept_id,
             h.sect_id,
             lv_process_slno
        from(
            select 
                t.em_no,
                sum(cl_lv_allowed) credited,
                sum(cl_lv_credit) clcredit,
                sum(cl_lv_taken) takenCL,
                sum(carryforward_status) carryforward,
                p.lv_process_slno
            from hrm_leave_cl t
              right join hrm_leave_process p on p.em_no=t.em_no
            where  year(cl_lv_mnth) =year(?) and p.hrm_process_status='A'
            group by em_no
        ) as c right join hrm_emp_master f on c.em_no = f.em_no
        right join hrm_department g on f.em_department=g.dept_id
        right join hrm_dept_section h on f.em_dept_section=h.sect_id
        where f.em_status = 1
        group by 1 ) tble`,
            [
                data.currentyear
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getYearlySickLeaveCount: (data, callBack) => {
        pool.query(
            `select 
            em_id,
            em_no,
            em_name,
            credited,
            taken,
            (credited - taken) balance,
            carryforward,
            dept_name,
            sect_name,
            dept_id,
            sect_id
        from (
        select 
        f.em_id,
            c.em_no,
            f.em_name,
            sum(SLallowed) credited,
            sum(cmn_lv_taken) taken,
            carryforward_status as carryforward,
             g.dept_name,
             h.sect_name,
             g.dept_id,
             h.sect_id
        from(
            select 
                em_no,
                cmn_lv_allowed SLallowed,
               cmn_lv_taken,
               carryforward_status
                from hrm_leave_common 
            where llvetype_slno = 7 and year(cmn_lv_year) = year(?) 
             group by em_no
        ) as c right join hrm_emp_master f on c.em_no = f.em_no
        right join hrm_department g on f.em_department=g.dept_id
        right join hrm_dept_section h on f.em_dept_section=h.sect_id
        where f.em_status = 1
        group by 1 ) tble`,
            [
                data.currentyear,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getYearlyEarnLeaveCount: (data, callBack) => {
        pool.query(
            `select 
             em_id,
             em_no,
             em_name,
             credited,
             taken,
             (credited - taken) balance,
             carryforward,
             dept_name,
             sect_name,
             dept_id,
             sect_id,
             lv_process_slno
             from (
                select 
                f.em_id,
                c.em_no,
                f.em_name,
                sum(ELcredit) credited,
                sum(takenEL) taken,
                sum(carryforward) carryforward,
                g.dept_name,
                h.sect_name,
                g.dept_id,
                h.sect_id,
                lv_process_slno
                from (
                    select 
                    t.em_no,
                    sum(ernlv_allowed) ELallowed,
                    sum(ernlv_credit) ELcredit,
                    sum(ernlv_taken) takenEL,
                    sum(carryforward_status) carryforward,
                    p.lv_process_slno
                    from hrm_leave_earnlv t
                    right join hrm_leave_process p on p.em_no=t.em_no
                    where  credit_year = ?   and p.hrm_process_status='A'
                    group by em_no
                    ) as c right join hrm_emp_master f on c.em_no = f.em_no
                    right join hrm_department g on f.em_department=g.dept_id
                    right join hrm_dept_section h on f.em_dept_section=h.sect_id
                    where f.em_status = 1 
                    group by 1 ) tble `,
            [
                data.currentyear
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatePreviousLeave: (body) => {
        return new Promise((resolve, reject) => {
            body.map((val) => {
                pool.query(
                    `UPDATE hrm_leave_common 
                       SET cmn_lv_allowed = cmn_lv_allowed + ?, 
                      cmn_lv_balance=cmn_lv_balance + ? 
                       WHERE year(cmn_lv_year) = ? AND em_no = ? and llvetype_slno=7`,
                    [val.balance, val.balance, val.cmn_lv_year, val.em_no],
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

    insertPreviousearnLeave: (data, callBack) => {
        pool.query(
            `insert  into hrm_leave_earnlv(
                em_no,
                ernlv_mnth, 
                ernlv_year,
                ernlv_allowed, 
                ernlv_credit,
                ernlv_taken,
                lv_process_slno,
                update_user,
                em_id,
                credit_status,
                credit_year,
                special_remark
                ) values ?`,
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

    insertPreviouscasualleave: (data, callBack) => {
        pool.query(
            `insert  into hrm_leave_cl(
                em_no, em_id,
                cl_lv_mnth, 
                cl_lv_year,
                cl_lv_allowed, 
                cl_lv_credit, 
                cl_lv_taken,
                lv_process_slno,
                update_user,
                special_remark)
                values ?`,
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
    updatecarryforwardEl: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `update hrm_leave_earnlv set 
                    carryforward_status='1'
                        where 
                        credit_year=? and  em_id=? and ernlv_taken=0`,
                    [
                        val.carry_year,
                        val.em_id
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updatecarryforwardCl: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE hrm_leave_cl SET carryforward_status = 1 
                    WHERE year(cl_lv_mnth) = ? AND em_id = ? and  cl_lv_taken=0`,
                    [
                        val.carry_year,
                        val.em_id
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updatecarryforwardSl: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE hrm_leave_common SET carryforward_status = 1 
                    WHERE year(cmn_lv_year) = ? AND em_id = ? and llvetype_slno=7;`,
                    [
                        val.carry_year,
                        val.em_id
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
}