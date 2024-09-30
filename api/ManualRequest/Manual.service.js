const pool = require('../../config/database');

module.exports = {
    getManualReqstBtwDate: (data, callBack) => {
        pool.query(
            `SELECT 
            manual_request_log.em_no,
            em_name, dept_name,
            sect_name, duty_date,lvereq_desc,remrk
             FROM manual_request_log 
             left join hrm_emp_master on hrm_emp_master.em_id=manual_request_log.em_id
             inner join hrm_department on hrm_department.dept_id=hrm_emp_master.em_department
             inner join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
             where duty_date between ? and ? and delete_status=0`,
            [
                data.fromdate,
                data.todate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },



}