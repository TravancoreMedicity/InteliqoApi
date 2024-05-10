const pool = require('../../config/database');

module.exports = {

    updateUploadStatus: (data, callBack) => {
        pool.query(
            `UPDATE training_questions SET 
            upload_status=1
            WHERE q_slno=?`,
            [
                data.q_slno
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