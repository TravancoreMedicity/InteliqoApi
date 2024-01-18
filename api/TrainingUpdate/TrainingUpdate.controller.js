const { TrainingUpdateGet } = require('./TrainingUpdate.service');

module.exports = {

    TrainingUpdateGet: (req, res) => {
        const id = req.params.id;
        TrainingUpdateGet(id, (err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    }
}
