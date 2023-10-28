const pool = require('../../config/database');

module.exports = {
    getData: (data, callBack) => {

        pool.query(
            ` SELECT * from file_checklist where emid=?
           `,
            [
                data.em_id,
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