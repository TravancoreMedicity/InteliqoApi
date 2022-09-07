const pool = require("../../config/database");

module.exports = {

    create: (data, callBack) => {
        console.log(data);
        pool.query(
            `INSERT INTO hrm_hierarchylevel_master (
                highlevel_slno,
                sect_id)
            VALUES ?`,
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
    getExceptDeptSection: (callBack) => {
        pool.query(
            `SELECT hrm_dept_section.sect_id,hrm_dept_section.sect_name FROM medi_hrm.hrm_dept_section
            LEFT JOIN hrm_hierarchylevel_master ON hrm_dept_section.sect_id=hrm_hierarchylevel_master.sect_id
            WHERE hrm_hierarchylevel_master.sect_id IS NULL;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getLevel2Dept: (callBack) => {
        pool.query(
            `SELECT hrm_dept_section.sect_id,hrm_dept_section.sect_name FROM medi_hrm.hrm_dept_section
            LEFT JOIN hrm_hierarchylevel_master ON hrm_dept_section.sect_id=hrm_hierarchylevel_master.sect_id
            WHERE hrm_hierarchylevel_master.sect_id;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    level2_create: (data, callBack) => {
        pool.query(
            `INSERT INTO hrm_hierarchy_level2 (
                highlevel_slno,
                sect_id,level2_sect_id)
            VALUES ?;`,
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
    getLevel2Data: (callBack) => {
        pool.query(
            `select
            hierarchylevel_slno,
            highlevel_name,
             GROUP_CONCAT(hrm_dept_section.sect_name) as sect_name
           from
             hrm_hierarchylevel_master
           left join hrm_highlevel_master on hrm_hierarchylevel_master.highlevel_slno=hrm_highlevel_master.highlevel_slno
           left join hrm_dept_section on hrm_hierarchylevel_master.sect_id=hrm_dept_section.sect_id
           group by
             highlevel_name;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getLevel3Data: (callBack) => {
        pool.query(
            `SELECT level2_slno,
            hrm_highlevel_master.highlevel_name,
            hrm_hierarchy_level2.sect_id as sect_id,
            GROUP_CONCAT(hrm_dept_section.sect_name) as level2_sect_id
            FROM medi_hrm.hrm_hierarchy_level2
            left join hrm_dept_section on hrm_hierarchy_level2.level2_sect_id=hrm_dept_section.sect_id
            left join hrm_highlevel_master on hrm_hierarchy_level2.highlevel_slno=hrm_highlevel_master.highlevel_slno
            group by hrm_hierarchy_level2.sect_id ;`,
            [],
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
            `SELECT * FROM medi_hrm.hrm_hierarchylevel_master;`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

}