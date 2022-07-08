const pool = require('../../config/database');

module.exports = {
    InsertAdvanceSettings: (data, callBack) => {
        pool.query(
            `INSERT INTO advance_settings 
                (service_from,
                service_to,
                adv_eligibility,
                monthly_installments,
                create_user) 
                VALUES (?,?,?,?,?)`,
            [
                data.service_from,
                data.service_to,
                data.adv_eligibility,
                data.monthly_installments,
                data.create_user,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateAdvanceSettings: (data, callBack) => {
        pool.query(
            `UPDATE advance_settings 
                SET service_from=?,
                service_to=?,
                adv_eligibility=?,
                monthly_installments=?,
                edit_user=?
                WHERE adv_settings_Slno = ?`,
            [
                data.service_from,
                data.service_to,
                data.adv_eligibility,
                data.monthly_installments,
                data.edit_user,
                data.adv_settings_Slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAdvanceSettings: (callBack) => {
        pool.query(
            `SELECT 
            adv_settings_Slno,
            service_from,
            service_to,
            adv_eligibility,
            monthly_installments
            FROM medi_hrm.advance_settings `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAdvanceSettingsById: (id, callback) => {
        pool.query(
            `SELECT 
            adv_settings_Slno,
            service_from,
            service_to,
            adv_eligibility,
            monthly_installments
            FROM advance_settings 
            WHERE adv_settings_Slno = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    }
}