const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_yearly_leaves
             (  lvetype_slno_cl,
                max_allowed_count_cl,
                month_year_cl,
                lvetype_slno_sick,
                max_allowed_count_sick,
                month_year_sick,
                lvetype_slno_conference,
                max_allowed_count_conference,
                month_year_conference,
                lvetype_slno_lop,
                max_allowed_count_lop,
                month_year_lop,
                lvetype_slno_maternity,
                max_allowed_count_maternity,
                month_year_maternity,
                lvetype_slno_previlage,
                max_allowed_count_previlage,
                month_year_previlage,
                create_user
              
                )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.lvetype_slno_cl,
                data.max_allowed_count_cl,
                data.month_year_cl,
                data.lvetype_slno_sick,
                data.max_allowed_count_sick,
                data.month_year_sick,
                data.lvetype_slno_conference,
                data.max_allowed_count_conference,
                data.month_year_conference,
                data.lvetype_slno_lop,
                data.max_allowed_count_lop,
                data.month_year_lop,
                data.lvetype_slno_maternity,
                data.max_allowed_count_maternity,
                data.month_year_maternity,
                data.lvetype_slno_previlage,
                data.max_allowed_count_previlage,
                data.month_year_previlage,
                data.create_user


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
            `UPDATE hrm_yearly_leaves
                SET
                max_allowed_count_cl=?,
                month_year_cl=?,
                 max_allowed_count_sick=?,
                month_year_sick=?,
                 max_allowed_count_conference=?,
                month_year_conference=?,
                 max_allowed_count_lop=?,
                month_year_lop=?,
                max_allowed_count_maternity=?,
                month_year_maternity=?,
                max_allowed_count_previlage=?,
                month_year_previlage=?,
                edit_user =? 
                 WHERE com_slno = ?`,
            [

                data.max_allowed_count_cl,
                data.month_year_cl,
                data.max_allowed_count_sick,
                data.month_year_sick,
                data.max_allowed_count_conference,
                data.month_year_conference,
                data.max_allowed_count_lop,
                data.month_year_lop,
                data.max_allowed_count_maternity,
                data.month_year_maternity,
                data.max_allowed_count_previlage,
                data.month_year_previlage,
                data.edit_user,
                data.com_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteByID: (data, callBack) => {
        pool.query(
            `UPDATE hrm_yearly_leaves SET status = 0 WHERE  com_slno = ?`,
            [
                data.com_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getData: (callBack) => {
        pool.query(
            `SELECT com_slno,
                lvetype_slno_cl,
                max_allowed_count_cl,
                month_year_cl,
                lvetype_slno_sick,
                max_allowed_count_sick,
                month_year_sick,
                lvetype_slno_conference,
                max_allowed_count_conference,
                month_year_conference,
                lvetype_slno_lop,
                max_allowed_count_lop,
                month_year_lop,
                lvetype_slno_maternity,
                max_allowed_count_maternity,
                month_year_maternity,
                lvetype_slno_previlage,
                max_allowed_count_previlage,
                month_year_previlage
            FROM hrm_yearly_leaves`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDataById: (id, callBack) => {
        pool.query(
            `SELECT
            com_slno,
            lvetype_slno_cl,
            max_allowed_count_cl,
            month_year_cl,
            lvetype_slno_sick,
            max_allowed_count_sick,
            month_year_sick,
            lvetype_slno_conference,
            max_allowed_count_conference,
            month_year_conference,
            lvetype_slno_lop,
            max_allowed_count_lop,
            month_year_lop,
            lvetype_slno_maternity,
            max_allowed_count_maternity,
            month_year_maternity,
            lvetype_slno_previlage,
            max_allowed_count_previlage,
            month_year_previlage
            FROM hrm_yearly_leaves
            WHERE com_slno= ?`,
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
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT lvetype_slno_cl,lvetype_slno_sick,lvetype_slno_conference,lvetype_slno_lop,lvetype_slno_maternity,lvetype_slno_previlage
            FROM hrm_yearly_leaves 
                WHERE lvetype_slno_cl = ?`,
            [
                data.lvetype_slno_cl
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT lvetype_slno_cl,lvetype_slno_sick,lvetype_slno_conference,lvetype_slno_lop,lvetype_slno_maternity,lvetype_slno_previlage
                FROM hrm_yearly_leaves 
                WHERE lvetype_slno_cl = ? AND lvetype_slno_sick = ? AND lvetype_slno_conference = ? AND
                lvetype_slno_lop = ?  AND lvetype_slno_maternity = ? AND lvetype_slno_previlage = ? `,
            [
                data.lvetype_slno_cl,
                data.lvetype_slno_sick,
                data.lvetype_slno_conference,
                data.lvetype_slno_lop,
                data.lvetype_slno_maternity,
                data.lvetype_slno_previlage
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getcommonleave: (callBack) => {
        pool.query(
            `SELECT 
                lvetype_slno,
                lvetype_desc,
                leave_credit_policy_count 
            FROM 
                medi_hrm.hrm_leave_type 
            where 
                common_leave='1'`,
            [

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )

    }
}