const pool = require('../../config/database');

module.exports = {

    updateUploadStatus: (data, callBack) => {
        pool.query(
            `UPDATE medi_hrm.training_topic SET 
            upload_status=1,
            pdf_time=1
            WHERE topic_slno=?`,
            [
                data.topic_slno
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