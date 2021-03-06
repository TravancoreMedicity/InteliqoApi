const pool = require('../../config/database');
module.exports = {
    getattendancemark: (data, callBack) => {

        pool.query(
            `SELECT punch_slno, 
            duty_day,shift_in,shift_out, 
             emp_id, shift_id,
             em_no, 
             punch_in,
             punch_out,  
             duty_worked, 
             hrs_worked, 
             over_time,
             late_in, 
             early_out, 
             duty_status,
             ot_request_flag, mis_punch_flag,
             ifnull(lvreq_type,0)lvreq_type, leave_type,updation_flag,
             sublvreq_type 
             FROM medi_hrm.punch_master where emp_id=? and duty_day between ? and ?`,
            [data.emp_id, data.start, data.end
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getattendancetotal: (data, callBack) => {
        pool.query(
            `SELECT 
            emp_id,
            em_no,
            punch_in,
            punch_out, 
            em_no,  
           ifnull( sum(duty_worked),0) duty_worked,
            sum(hrs_worked)hrs_worked, 
            sum(over_time)over_time,
            count(if(ifnull(duty_status,0)=0,duty_status,null))duty_statuslop,
            count(if(leave_type!=0,leave_type,null))leave_type,
            sum(late_in)late_in, 
            sum(early_out)early_out, 
           ifnull( sum(duty_status),0)duty_status
            FROM medi_hrm.punch_master 
            where emp_id=? 
            and duty_day between ? and ?
             group by emp_id, em_no`,
            [data.emp_id, data.start, data.end
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getnightoffdata: (data, callBack) => {

        pool.query(
            `SELECT night_off_flag,shift_id,duty_status FROM medi_hrm.punch_master 
            left join hrm_shift_mast on punch_master.shift_id=hrm_shift_mast.shft_slno
            where emp_id=? and date(duty_day)between ? and ? and night_off_flag=1;`,
            [data.em_id, data.fromDate, data.todate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    updatenightoff: (data, callBack) => {

        pool.query(
            `update punch_master set lvreq_type=? , leave_type=?,duty_worked=1 where duty_day=? and emp_id=?`,
            [data.lvreq_type, data.leave_type, data.fordate, data.emp_id
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getattendancetotalEmployee: (data, callBack) => {
        pool.query(
            `SELECT 
            emp_id,
            punch_in,
            punch_out, 
            em_no,  
           ifnull( sum(duty_worked),0) duty_worked,
            sum(hrs_worked)hrs_worked, 
            sum(over_time)over_time,
            count(if(ifnull(duty_status,0)=0,duty_status,null))duty_statuslop,
            count(if(leave_type!=0,leave_type,null))leave_type,
            sum(late_in)late_in, 
            sum(early_out)early_out, 
           ifnull( sum(duty_status),0)duty_status
            FROM medi_hrm.punch_master 
            where emp_id IN(?) 
            and duty_day between ? and ?
             group by emp_id, em_no`,
            [data.emp_id,
            data.start,
            data.end
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