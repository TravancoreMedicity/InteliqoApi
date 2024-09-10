const pool = require('../../config/database');

module.exports = {
    insertofferletter: (data, callBack) => {
        pool.query(
            `UPDATE hrm_candidate_selection 
            SET  Offer_letter_status=1 ,
            assigned_join_date=?,
            remark=?,
            call_accept_status=?,
            call_reject_status=?,
            call_hold_status=?,
            called_emid=?,
            saved_emid=?
            WHERE application_no = ?  AND  desg_id=? or changed_desg_id=?`,
            [
                data.date,
                data.remark,
                data.Select_status,
                data.Reject_status,
                data.Hold_status,
                data.emid,
                data.saved_emid,
                data.appno,
                data.desig_id,
                data.desig_id
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    insertrejectemp: (data, callBack) => {
        pool.query(
            `UPDATE hrm_candidate_selection 
            SET  Offer_letter_status=2 ,
            remark=?,
            call_accept_status=?,
            call_reject_status=?,
            call_hold_status=?,
            called_emid=?,
            saved_emid=?
            WHERE application_no = ?  AND  desg_id=? or changed_desg_id=?`,
            [
                data.remark,
                data.Select_status,
                data.Reject_status,
                data.Hold_status,
                data.emid,
                data.saved_emid,
                data.applicationno,
                data.desg,
                data.desg
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertrejectstatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  offer_letterstatus=2 
            WHERE application_no = ?  AND  desg_id=?`,
            [
                data.applicationno,
                data.desg,

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    insertSelectstatus: (data, callBack) => {
        pool.query(
            `UPDATE hrm_applicationform_status 
            SET  offer_letterstatus=1 
            WHERE application_no = ?  AND  desg_id=?`,
            [
                data.applicationno,
                data.desg,

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertem_noUpdate: (data, callBack) => {
        pool.query(
            `UPDATE hrm_candidate_selection 
            SET  empconvertionSts=1 ,
            em_id=?,
            em_no=?,
            salary=?,
            em_contract_end_date=?
            WHERE application_no = ?  AND  desg_id=? or changed_desg_id=?`,
            [
                data.em_id,
                data.em_no,
                data.Salary,
                data.em_cont_end,
                data.application_no,
                data.designation,
                data.designation,
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