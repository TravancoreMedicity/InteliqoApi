const { getData, getempdetails, getbiodetails, getinterviewmark, getPdfformat, EmpLangaugeKnown, EmpExperience, DataHighlight, GetPersonalexpdata, GetPersonalhighdata,
    EmpQualification, getPdfformatjoin, getVaccination, updatetdata, InsertData, getapplicationdata, GetPersonaldata, EmpLangaugeKnownupdate, EmpCredentialdata,
    DataHighlightupdate, Personaldataupdate, Personaldataformupdate, InsertCredentialdata, Getcredentialdata, EmpRegistration, EmpTraining, GetcredentialTraining,
    GetPersonaledudata, Personaldata, Personaldataform, Getcredentialveridataedu, Getcredentialregistration, GetTrainersData, getHODincharge, GetTrainingData, InsertOrientationdata, Getorientationdata } = require('../PersonalChecklist/personalchecklist.service');
const logger = require('../../logger/logger')
module.exports = {
    getData: (req, res) => {

        const body = req.body;
        getData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getempdetails: (req, res) => {

        const body = req.body;
        getempdetails(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getbiodetails: (req, res) => {

        const body = req.body;
        getbiodetails(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getinterviewmark: (req, res) => {

        const body = req.body;
        getinterviewmark(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getPdfformat: (req, res) => {
        const body = req.body;
        getPdfformat(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getPdfformatjoin: (req, res) => {
        const body = req.body;
        getPdfformatjoin(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getVaccination: (req, res) => {
        const body = req.body;
        getVaccination(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    InsertData: (req, res) => {
        const body = req.body;
        InsertData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getapplicationdata: (req, res) => {
        const body = req.body;
        getapplicationdata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    applicationsuccess: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    applicationsuccess: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                applicationsuccess: 1,
                applicationdata: results
            });
        });
    },
    updatetdata: (req, res) => {
        const body = req.body;
        updatetdata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    InsertPersonaldata: (req, res) => {
        const body = req.body;
        if (Object.keys(body).length === 0) { // Object length zero return with no effect
            return res.status(200).json({
                success: 0,
                message: err
            });
        }

        const Func = async (body) => {
            const { Value, ExpData } = body;
            const newLangauge = {
                em_no: body.em_no,
                em_id: body.em_id,
                MalayalamWrt: body.MalayalamWrt,
                EngWrt: body.EngWrt,
                HindiWrt: body.HindiWrt,
                OthrWrt: body.OthrWrt,
                Malayalamspk: body.Malayalamspk,
                Engspk: body.Engspk,
                Hindispk: body.Hindispk,
                Othrspk: body.Othrspk,
                Malayalamrd: body.Malayalamrd,
                Engrd: body.Engrd,
                Hindird: body.Hindird,
                Othrsrd: body.Othrsrd,
                other: body.other,
            }
            const dataHighlight = {
                em_no: body.em_no,
                em_id: body.em_id,
                assignment: body.assignment,
                archieved: body.archieved,
                Current: body.Current,
                Others: body.Others,
                MonthlySalary: body.MonthlySalary,
                requiredtoJoin: body.requiredtoJoin,
                CareerGoals: body.CareerGoals,
                Hobbies: body.Hobbies,
                skill: body.skill,
                Demands: body.Demands,
                datesaved: body.datesaved,
                computer: body.computer
            }
            const personaldata = {
                em_no: body.em_no,
                em_id: body.em_id,
                Permanentaddrs: body.Permanentaddrs,
                Permanentaddrs1: body.Permanentaddrs1,
                Presentaddrs: body.Presentaddrs,
                Presentaddrs1: body.Presentaddrs1,
                em_phone: body.em_phone,
                em_mobile: body.em_mobile,
                em_email: body.em_email,
                em_gender: body.em_gender,
                em_dob: body.em_dob,
                relg_name: body.relg_name,
                em_passport_no: body.em_passport_no,
                em_license_no: body.em_license_no,
                em_account_no: body.em_account_no,
                em_fathers_name: body.em_fathers_name,
            }
            const result = await EmpLangaugeKnown(newLangauge)
            const { status, message } = result;
            if (status === 1) {
                if (Object.keys(Value).length === 0) {
                    return res.status(200).json({
                        success: 0,
                        message: 'Please Enter the Qualification'
                    });
                } else {
                    var values = Value.map((value, index) => {
                        return [value.em_id, value.em_no, value.education, value.course, value.Specialization, value.university, value.SslcYear, value.SslcRank, value.board,
                        value.SslcInsti]
                    })
                    const result = await EmpQualification(values)
                    const { status, message } = result;
                    if (status === 1) {
                        if (Object.keys(ExpData).length === 0) {
                            return res.status(200).json({
                                success: 0,
                                message: 'Please Enter the Experience'
                            });
                        } else {
                            var values = ExpData.map((value, index) => {
                                return [value.em_id, value.em_no, value.instiname, value.dateFrom, value.dateto, value.Salery, value.position]
                            })
                            const result = await EmpExperience(values)
                            const { status, message } = result;
                            if (status === 1) {
                                const result = await DataHighlight(dataHighlight)
                                const { status, message } = result;

                                if (status === 1) {
                                    const result = await Personaldata(personaldata)
                                    const { status, message } = result;

                                    if (status === 1) {
                                        const result = await Personaldataform(personaldata)
                                        const { status, message } = result;
                                        if (status === 1) {
                                            return res.status(200).json({
                                                success: 1,
                                                message: message
                                            });
                                        }
                                    }
                                }
                            }
                        }

                    }
                }


            } else {
                return res.status(200).json({
                    success: 0,
                    message: 'Details not saved' + message
                });
            }
        }
        Func(body)
    },
    GetPersonaldata: (req, res) => {
        const body = req.body;
        GetPersonaldata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    GetPersonaledudata: (req, res) => {
        const body = req.body;
        GetPersonaledudata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successedu: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successedu: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successedu: 1,
                dataedu: results
            });
        });
    },

    GetPersonalexpdata: (req, res) => {
        const body = req.body;
        GetPersonalexpdata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successexp: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successexp: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successexp: 1,
                dataexp: results
            });
        });
    },

    GetPersonalhighdata: (req, res) => {
        const body = req.body;
        GetPersonalhighdata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successhigh: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successhigh: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successhigh: 1,
                datahigh: results
            });
        });
    },

    UpdatePersonaldata: (req, res) => {
        const body = req.body;
        if (Object.keys(body).length === 0) { // Object length zero return with no effect
            return res.status(200).json({
                success: 0,
                message: err
            });
        }

        const Func = async (body) => {
            // const { Value, ExpData } = body;
            const newLangauge = {
                em_no: body.em_no,
                em_id: body.em_id,
                MalayalamWrt: body.MalayalamWrt,
                EngWrt: body.EngWrt,
                HindiWrt: body.HindiWrt,
                OthrWrt: body.OthrWrt,
                Malayalamspk: body.Malayalamspk,
                Engspk: body.Engspk,
                Hindispk: body.Hindispk,
                Othrspk: body.Othrspk,
                Malayalamrd: body.Malayalamrd,
                Engrd: body.Engrd,
                Hindird: body.Hindird,
                Othrsrd: body.Othrsrd,
                other: body.other,
            }
            const dataHighlight = {
                em_no: body.em_no,
                em_id: body.em_id,
                assignment: body.assignment,
                archieved: body.archieved,
                Current: body.Current,
                Others: body.Others,
                MonthlySalary: body.MonthlySalary,
                requiredtoJoin: body.requiredtoJoin,
                CareerGoals: body.CareerGoals,
                Hobbies: body.Hobbies,
                skill: body.skill,
                Demands: body.Demands,
                datesaved: body.datesaved,
                computer: body.computer
            }
            const personaldata = {
                em_no: body.em_no,
                em_id: body.em_id,
                Permanentaddrs: body.Permanentaddrs,
                Permanentaddrs1: body.Permanentaddrs1,
                Presentaddrs: body.Presentaddrs,
                Presentaddrs1: body.Presentaddrs1,
                em_phone: body.em_phone,
                em_mobile: body.em_mobile,
                em_email: body.em_email,
                em_gender: body.em_gender,
                em_dob: body.em_dob,
                relg_name: body.relg_name,
                em_passport_no: body.em_passport_no,
                em_license_no: body.em_license_no,
                em_account_no: body.em_account_no,
                em_fathers_name: body.em_fathers_name,
            }
            const result = await EmpLangaugeKnownupdate(newLangauge)
            const { status, message } = result;

            if (status === 1) {

                const result = await DataHighlightupdate(dataHighlight)
                const { status, message } = result;

                if (status === 1) {
                    const result = await Personaldataupdate(personaldata)
                    const { status, message } = result;

                    if (status === 1) {
                        const result = await Personaldataformupdate(personaldata)
                        const { status, message } = result;
                        if (status === 1) {
                            return res.status(200).json({
                                success: 1,
                                message: message
                            });
                        }
                    }
                }
            } else {
                return res.status(200).json({
                    success: 0,
                    message: 'Details not saved' + message
                });
            }
        }
        Func(body)
    },

    InsertCredentialdata: (req, res) => {
        const body = req.body;
        InsertCredentialdata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    Getcredentialdata: (req, res) => {
        const body = req.body;
        Getcredentialdata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    Credentialinsertdata: (req, res) => {
        const body = req.body;
        if (Object.keys(body).length === 0) { // Object length zero return with no effect
            return res.status(200).json({
                success: 0,
                message: err
            });
        }

        const Func = async (body) => {
            const empdetails = {
                em_no: body.em_no,
                em_id: body.em_id,
                original: body.original,
                Copies: body.Copies,
                Registration: body.Registration,
                screenshot: body.screenshot,
                RegistrationCopies: body.RegistrationCopies,
                OriginalChecked: body.OriginalChecked,
                TrainingCopies: body.TrainingCopies,
                datesaved: body.datesaved,
                Declarationdate: body.Declarationdate,
                HrdNo: body.HrdNo,
            }
            const { trainData, ExpData } = body;
            const result = await EmpCredentialdata(empdetails)
            const { status, message } = result;
            if (status === 1) {
                if (Object.keys(ExpData).length === 0) {
                    return res.status(200).json({
                        success: 0,
                        message: 'Please Enter the Registration Details'
                    });
                } else {
                    var values = ExpData.map((value, index) => {
                        return [value.em_id, value.em_no, value.NameOfReg, value.RegIssuing, value.RegNo, value.RegDate, value.Validity]
                    })

                    const result = await EmpRegistration(values)
                    const { status, message } = result;

                    if (status === 1) {
                        if (Object.keys(trainData).length === 0) {
                            return res.status(200).json({
                                success: 0,
                                message: 'Please Enter the Training Details'
                            });
                        } else {
                            var values = trainData.map((value, index) => {
                                return [value.em_no, value.em_id, value.NameOfpgrm, value.from, value.to, value.conducted]
                            })
                            const result = await EmpTraining(values)
                            const { status, message } = result;
                            if (status === 1) {
                                return res.status(200).json({
                                    success: 1,
                                    message: message
                                });
                            } else {
                                return res.status(200).json({
                                    success: 0,
                                    message: 'Training Details not Submitted'
                                });
                            }
                        }

                    } else {
                        return res.status(200).json({
                            success: 0,
                            message: 'Registration Details not Submitted'
                        });
                    }
                }


            } else {
                return res.status(200).json({
                    success: 0,
                    message: 'Details not saved' + message
                });
            }
        }
        Func(body)
    },

    Getcredentialveridataedu: (req, res) => {
        const body = req.body;
        Getcredentialveridataedu(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    Getcredentialregistration: (req, res) => {
        const body = req.body;
        Getcredentialregistration(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successreg: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successreg: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successreg: 1,
                datareg: results
            });
        });
    },

    GetcredentialTraining: (req, res) => {
        const body = req.body;
        GetcredentialTraining(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successtrain: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successtrain: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successtrain: 1,
                datatrain: results
            });
        });
    },

    getHODincharge: (req, res) => {

        const body = req.body;
        getHODincharge(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    InsertOrientationdata: (req, res) => {
        const body = req.body;
        InsertOrientationdata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    Getorientationdata: (req, res) => {
        const body = req.body;
        Getorientationdata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    orintsuccess: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    orintsuccess: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                orintsuccess: 1,
                orientdata: results
            });
        });
    },

    GetTrainingData: (req, res) => {
        const body = req.body;
        GetTrainingData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successTraining: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successTraining: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successTraining: 1,
                dataTraining: results
            });
        });
    },
    GetTrainersData: (req, res) => {
        const body = req.body;
        GetTrainersData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
}