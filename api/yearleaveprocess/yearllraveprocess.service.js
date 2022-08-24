const pool = require('../../config/database');

module.exports = {

    checkTable: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_leave_process
            WHERE em_id = ?  and hrm_process_status ='A'`,
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
            `SELECT * FROM medi_hrm.hrm_leave_process where lv_process_slno=?;`,
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
            `SELECT * FROM medi_hrm.hrm_yearly_holiday_list  where hld_date>current_date()`,
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
                em_id) 
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
                em_id
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
        // console.log(data)
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
            `update hrm_leave_holiday set 
            hl_lv_active='1'
                where 
                lv_process_slno=? and  hl_lv_active='0'`,
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
            `select hrm_cl_slno,em_no,em_id,MONTHNAME(cl_lv_mnth)cl_lv_mnth
            From hrm_leave_cl
            where cl_lv_credit=1 and em_id=? and cl_lv_taken=0`,
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
            `SELECT hrm_hl_slno,hd_slno,hld_desc,hl_lv_taken FROM hrm_leave_holiday
            left join hrm_yearly_holiday_list on hrm_yearly_holiday_list.hld_slno=hrm_leave_holiday.hd_slno
             where lvetype_slno=3 and em_id=? and  hl_lv_active=0`,
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
        console.log(data)
        pool.query(
            `select hrm_ernlv_slno,em_no,em_id,MONTHNAME(ernlv_mnth)ernlv_mnth,ernlv_taken
            From hrm_leave_earnlv
            where ernlv_credit=0 and em_id=? and ernlv_taken=0 and earn_lv_active=0`,
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
            `SELECT  hrm_lv_cmn,llvetype_slno, cmn_lv_allowed, cmn_lv_taken, cmn_lv_balance 
            FROM medi_hrm.hrm_leave_common where em_id='?' and llvetype_slno='?'`,
            [
                data.em_id,
                data.value
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
            FROM medi_hrm.punch_master
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
            `SELECT * FROM medi_hrm.hrm_yearly_holiday_list where DATE(hld_date) between ? AND ? `,
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
                year_of_process
                ) values (?,?,?,?)`,
            [
                data.em_no,
                data.em_id,
                data.proceeuser,
                data.year_of_process
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
            `SELECT * FROM medi_hrm.yearly_leave_process where DATE(year_of_process) between ? AND ? and em_id=? `,
            [
                data.startdate,
                data.endate,
                data.emp_no

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