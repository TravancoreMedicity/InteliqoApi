const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_yearly_holiday_list 
            (
            hld_desc,
            lvetype_slno,
            hld_date,
            hld_year,
            hld_status,
            create_user,
            special_type
            )
            VALUES (?,?,?,?,?,?,?)`,
            [
                data.hld_desc,
                data.lvetype_slno,
                data.hld_date,
                data.hld_year,
                data.hld_status,
                data.create_user,
                data.special_type
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
            `SELECT hld_desc,
                    hld_slno     
            FROM hrm_yearly_holiday_list
            WHERE hld_desc = ? AND hld_year = ? `,
            [
                data.hld_desc,
                data.hld_year
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
            `UPDATE hrm_yearly_holiday_list
                SET hld_desc = ?,
                    lvetype_slno =?,
                    hld_date =?,
                    hld_year =?,
                    hld_status =?,
                    edit_user = ?,
                    special_type=?
                WHERE hld_slno = ?`,
            [
                data.hld_desc,
                data.lvetype_slno,
                data.hld_date,
                data.hld_year,
                data.hld_status,
                data.edit_user,
                data.special_type,
                data.hld_slno
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
            `UPDATE hrm_yearly_holiday_list SET hld_status = 0 WHERE hld_slno = ?`,
            [
                data.hld_slno
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
            `SELECT 
            hld_slno,
            hld_desc,
            hrm_leave_type.lvetype_desc,
            hrm_leave_type.lvetype_code,
            hld_date,
            hld_year,
            hld_status,
            hrm_yearly_holiday_list.lvetype_slno,
            if(hld_status=1,'Yes','No')status,
            special_type
        FROM hrm_yearly_holiday_list
        LEFT JOIN hrm_leave_type ON hrm_leave_type.lvetype_slno = hrm_yearly_holiday_list.lvetype_slno
        ORDER BY hld_date DESC`,
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
                hld_slno,
                hld_desc,
                lvetype_slno,
                hld_date,
                hld_year,
                hld_status
            FROM hrm_yearly_holiday_list
            WHERE hld_slno = ? `,
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
    getSelect: (callBack) => {
        pool.query(
            `SELECT 
                hld_slno,
                hld_desc
            FROM hrm_yearly_holiday_list
            WHERE hld_status = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDatabyYear: (callBack) => {
        pool.query(
            `SELECT 
            hld_desc,
            DATE_FORMAT(hld_date,'%d %M')
            hld_year
        FROM hrm_yearly_holiday_list
        WHERE YEAR(CURDATE()) order by hld_date asc`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getHolidayByDate: (data, callBack) => {
        pool.query(
            `select hld_date from hrm_yearly_holiday_list
        where hld_date between ? and ?`,
            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getyearholiday: (data, callBack) => {
        pool.query(
            `SELECT hld_desc,DATE_FORMAT(hld_date,'%d %M')hld_year,special_type,hld_date
            FROM hrm_yearly_holiday_list
            WHERE hld_year = YEAR(CURDATE()) and hld_status=1 order by hld_date asc`,
            [
                data.hld_year
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