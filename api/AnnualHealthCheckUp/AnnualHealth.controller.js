const { AnnualHealthDocDetails, AnnualHealthIllnessDetails, GetHealthCheckUpData, GetHealthData, InsertAnnualHrd } = require('../AnnualHealthCheckUp/AnnualHealth.service');
const logger = require('../../logger/logger')
module.exports = {
    InsertHealthCheckUpData: (req, res) => {
        const body = req.body;
        if (Object.keys(body).length === 0) { // Object length zero return with no effect
            return res.status(200).json({
                success: 0,
                message: err
            });
        }
        const Func = async (body) => {
            const { formdata, List } = body;
            const { MRD_No, Unit, Pulse, Bp, Resp, Temp, Weight, Height, BMI, General_Examininations, DateOfSave, HBs_Ag_Titer,
                Blood_Grouping, Serology, Check_X_ray, Titer_Value_100, Titer_Value_12, Titer_Value_0, Vacination_first,
                Vacination_Second, Vacination_Third, Vacination_Booster, titer_yes, titer_no, Fitness_yes, Fitness_no, Other_Consultations } = formdata


            const empdetails = {
                em_no: body.em_no,
                em_id: body.em_id,
                doc_emid: body.doc_emid,
                department: body.department,
                MRD_No: MRD_No,
                Unit: Unit,
                Pulse: Pulse,
                Bp: Bp,
                Resp: Resp,
                Temp: Temp,
                Weight: Weight,
                Height: Height,
                BMI: BMI,
                General_Examininations: General_Examininations,
                DateOfSave: DateOfSave,
                HBs_Ag_Titer: HBs_Ag_Titer,
                Blood_Grouping: Blood_Grouping,
                Serology: Serology,
                Check_X_ray: Check_X_ray,
                Titer_Value_100: Titer_Value_100,
                Titer_Value_12: Titer_Value_12,
                Titer_Value_0: Titer_Value_0,
                Vacination_first: Vacination_first,
                Vacination_Second: Vacination_Second,
                Vacination_Third: Vacination_Third,
                Vacination_Booster: Vacination_Booster,
                titer_yes: titer_yes,
                titer_no: titer_no,
                Fitness_yes: Fitness_yes,
                Fitness_no: Fitness_no,
                Other_Consultations: Other_Consultations

            }
            if (Object.keys(formdata).length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'Please Enter the  details'
                });
            } else {

                const result = await AnnualHealthIllnessDetails(empdetails)
                const { status, message } = result;

                if (status === 1) {
                    if (Object.keys(List).length === 0) {
                        return res.status(200).json({
                            success: 0,
                            message: 'Please Enter the details '
                        });
                    } else {
                        var values = List.map((value, index) => {
                            return [body.em_id, body.em_no, value.name, value.history_yes, value.history_no, value.Long, value.Treatment_yes, value.Treatment_no, value.Medications
                                , body.doc_emid, body.department]
                        })
                        const result = await AnnualHealthDocDetails(values)
                        const { status, message } = result;

                        if (status === 1) {
                            return res.status(200).json({
                                success: 1,
                                message: message
                            });
                        } else {
                            return res.status(200).json({
                                success: 0,
                                message: "Details Not Entered"
                            });
                        }
                    }
                }
                else {
                    return res.status(200).json({
                        success: 0,
                        message: message
                    });
                }
            }
        }
        Func(body)
    },

    GetHealthCheckUpData: (req, res) => {
        const body = req.body
        GetHealthCheckUpData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data: []

                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    GetHealthData: (req, res) => {
        const body = req.body
        GetHealthData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successCheck: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    successCheck: 2,
                    message: "Record Not Found",
                    dataCheck: []

                });
            }

            return res.status(200).json({
                successCheck: 1,
                dataCheck: results
            });
        })
    },
    InsertAnnualHrd: (req, res) => {
        const body = req.body
        InsertAnnualHrd(body, (error, results) => {
            if (error) {
                logger.errorLogger(error)
                return res.status(200).json({
                    success: 0,
                    message: res.error
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    dataCheck: []

                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
}