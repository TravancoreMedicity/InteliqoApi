const {
    checkTable,

} = require('../yearleaveprocess/yearllraveprocess.service');

module.exports = {
    checkprocesstable: (req, res) => {
        const body = req.body;
        checkTable(body, (err, results) => {


            console.log(results)

            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Data Created Successfully"
            });






        });
    },


}











