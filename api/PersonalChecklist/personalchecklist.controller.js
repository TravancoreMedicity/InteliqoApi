const { getData, getempdetails, getbiodetails, getinterviewmark, getPdfformat, EmpLangaugeKnown, EmpExperience, DataHighlight, GetPersonalexpdata, GetPersonalhighdata,
    EmpQualification, getPdfformatjoin, getVaccination, updatetdata, InsertData, getapplicationdata, GetPersonaldata, EmpLangaugeKnownupdate, EmpCredentialdata,
    DataHighlightupdate, Personaldataupdate, Personaldataformupdate, InsertCredentialdata, Getcredentialdata, EmpRegistration, EmpTraining, GetcredentialTraining,
    GetPersonaledudata, Personaldata, Personaldataform, Getcredentialveridataedu, Getcredentialregistration, GetTrainersData, getHODincharge, GetcredentialdocCertificate,
    GetTrainingData, InsertOrientationdata, Getorientationdata, EmpCredentialTraining, Empcertificate, PrivilegingData, Previlegedocdata, GetcredentialprivilageData,
    GetcredentialdocTraining, Getcredentialdocdetails, EmpCredentialnursingTraining, Empnursingcertificate, PrivilegingnursingData, nursingdata, GetcredentialnursingTraining,
    GetcredentialnursingCertificate, Getcredentialnursingdetails, GetcredentialnursingData, EmpCredentialparaTraining, Empcertificatepara, PrivilegingDatapara,
    Previlegedocdatapara, GetcredentialparaTraining, GetcredentialparaprivilageData, Getcredentialparadetails, GetcredentialparaCertificate, EmpCredentialotherTraining,
    Empcertificateother, PrivilegingDataother, Previlegedocdataother, GetcredentialotherTraining, GetcredentialotherCertificate, Getcredentialotherdetails,
    GetcredentialotherprivilageData, GetHodapprovalData, GetHodapprovalNurseData, GetHodapprovalParaData, GetHodapprovalotheraData, GetMSapprovalData, GetMSapprovalNurseData,
    GetMSapprovalParaData, GetMSapprovalotheraData, GetCPapprovalData, GetCPapprovalNurseData, GetCPapprovalParaData, GetCPapprovalotheraData, GetMDapprovalData,
    GetMDapprovalNurseData, GetMDapprovalParaData, GetMDapprovalotheraData, InsertCredHod, InsertCredNurseHod, InsertCredParaHod, InsertCredOtherHod,
    InsertCredMS, InsertCredNurseMS, InsertCredParaMS, InsertCredOtherMS, InsertCredDocCP, InsertCredNurseCP, InsertCredParaCP, InsertCredOtherCP, InsertCredDocMD,
    InsertCredNurseMD, InsertCredParaMD, InsertCredOtherMD } = require('../PersonalChecklist/personalchecklist.service');
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

    InsertCredentialDoc: (req, res) => {
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
                HrdNo: body.HrdNo,
                department: body.department,
                specialization: body.specialization,
                insuranceyes: body.insuranceyes,
                insuranceno: body.insuranceno,
                Outpatientyes: body.Outpatientyes,
                Outpatientno: body.Outpatientno,
                clinical: body.clinical,
                details: body.details,
                datesaved: body.datesaved,
                Admittingyes: body.Admittingyes,
                Admittingno: body.Admittingno,
                Operatingyes: body.Operatingyes,
                Operatingno: body.Operatingno,
                original: body.original,
                Copies: body.Copies,
                Registration: body.Registration,
                screenshot: body.screenshot,
                RegistrationCopies: body.RegistrationCopies,
                OriginalChecked: body.OriginalChecked,
                TrainingCopies: body.TrainingCopies

            }
            const { Operating, CertificateData, ExpData } = body;
            // const result = await EmpLangaugeKnown(newLangauge)
            // const { status, message } = result;
            // if (status === 1) {
            if (Object.keys(ExpData).length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'Please Enter the Training details'
                });
            } else {
                var values = ExpData.map((value, index) => {
                    return [value.training, value.conducted, value.em_no, value.em_id, value.department,]
                })
                const result = await EmpCredentialTraining(values)
                const { status, message } = result;
                if (status === 1) {
                    if (Object.keys(CertificateData).length === 0) {
                        return res.status(200).json({
                            success: 0,
                            message: 'Please Enter the certificate '
                        });
                    } else {
                        var values = CertificateData.map((value, index) => {
                            return [value.em_id, value.em_no, value.Certification, value.Year]
                        })
                        const result = await Empcertificate(values)
                        const { status, message } = result;

                        if (status === 1) {
                            if (Object.keys(empdetails).length === 0) {
                                return res.status(200).json({
                                    success: 0,
                                    message: 'Please Enter the Privileging Data '
                                });
                            } else {
                                const result = await PrivilegingData(empdetails)
                                const { status, message } = result;
                                if (status === 1) {
                                    var values = Operating.map((value, index) => {
                                        return [value.Name, value.NameU, value.NameS, value.NameI, value.em_no, value.em_id, value.department, value.Decision]
                                    })
                                    const result = await Previlegedocdata(values)
                                    const { status, message } = result;

                                    if (status === 1) {
                                        return res.status(200).json({
                                            success: 1,
                                            message: message
                                        });

                                    } else {
                                        return res.status(200).json({
                                            success: 0,
                                            message: message
                                        });
                                    }
                                } else {
                                    return res.status(200).json({
                                        success: 0,
                                        message: message
                                    });
                                }
                            }

                        } else {
                            return res.status(200).json({
                                success: 0,
                                message: message
                            });
                        }
                    }

                } else {
                    return res.status(200).json({
                        success: 0,
                        message: message
                    });
                }
            }



        }
        Func(body)
    },


    GetcredentialdocTraining: (req, res) => {
        const body = req.body;
        GetcredentialdocTraining(body, (err, results) => {
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

    GetcredentialdocCertificate: (req, res) => {
        const body = req.body;
        GetcredentialdocCertificate(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successcert: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successcert: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successcert: 1,
                datacert: results
            });
        });
    },

    Getcredentialdocdetails: (req, res) => {
        const body = req.body;
        Getcredentialdocdetails(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successdetails: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successdetails: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successdetails: 1,
                datadetails: results
            });
        });
    },

    GetcredentialprivilageData: (req, res) => {
        const body = req.body;
        GetcredentialprivilageData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successdata: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successdata: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successdata: 1,
                dataprivilege: results
            });
        });
    },


    InsertCredentialNursing: (req, res) => {
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
                HrdNo: body.HrdNo,
                department: body.department,
                specialization: body.specialization,
                datesaved: body.datesaved,
                original: body.original,
                Copies: body.Copies,
                Registration: body.Registration,
                screenshot: body.screenshot,
                RegistrationCopies: body.RegistrationCopies,
                OriginalChecked: body.OriginalChecked,
                TrainingCopies: body.TrainingCopies

            }
            const { List, CertificateData, ExpData } = body;
            // const result = await EmpLangaugeKnown(newLangauge)
            // const { status, message } = result;
            // if (status === 1) {
            if (Object.keys(ExpData).length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'Please Enter the Training details'
                });
            } else {
                var values = ExpData.map((value, index) => {
                    return [value.training, value.conducted, value.em_no, value.em_id, value.department,]
                })
                const result = await EmpCredentialnursingTraining(values)
                const { status, message } = result;
                if (status === 1) {
                    if (Object.keys(CertificateData).length === 0) {
                        return res.status(200).json({
                            success: 0,
                            message: 'Please Enter the certificate '
                        });
                    } else {
                        var values = CertificateData.map((value, index) => {
                            return [value.em_id, value.em_no, value.Certification, value.Year]
                        })
                        const result = await Empnursingcertificate(values)
                        const { status, message } = result;

                        if (status === 1) {
                            if (Object.keys(empdetails).length === 0) {
                                return res.status(200).json({
                                    success: 0,
                                    message: 'Please Enter the Privileging Data '
                                });
                            } else {
                                const result = await PrivilegingnursingData(empdetails)
                                const { status, message } = result;
                                if (status === 1) {
                                    var values = List.map((value, index) => {
                                        return [value.name, value.u, value.s, value.i, body.em_no, body.em_id, body.department, value.remark]
                                    })
                                    const result = await nursingdata(values)
                                    const { status, message } = result;

                                    if (status === 1) {
                                        return res.status(200).json({
                                            success: 1,
                                            message: message
                                        });

                                    } else {
                                        return res.status(200).json({
                                            success: 0,
                                            message: "Privileging Data Not Inserted"
                                        });
                                    }
                                } else {
                                    return res.status(200).json({
                                        success: 0,
                                        message: " Verification Status Not Inserted"
                                    });
                                }
                            }

                        } else {
                            return res.status(200).json({
                                success: 0,
                                message: message
                            });
                        }
                    }

                } else {
                    return res.status(200).json({
                        success: 0,
                        message: message
                    });
                }
            }



        }
        Func(body)
    },

    GetcredentialnursingTraining: (req, res) => {
        const body = req.body;
        GetcredentialnursingTraining(body, (err, results) => {
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
    GetcredentialnursingCertificate: (req, res) => {
        const body = req.body;
        GetcredentialnursingCertificate(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successcert: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successcert: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successcert: 1,
                datacert: results
            });
        });
    },

    Getcredentialnursingdetails: (req, res) => {
        const body = req.body;
        Getcredentialnursingdetails(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successdetails: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successdetails: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successdetails: 1,
                datadetails: results
            });
        });
    },

    GetcredentialnursingData: (req, res) => {
        const body = req.body;
        GetcredentialnursingData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successdata: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successdata: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successdata: 1,
                dataprivilege: results
            });
        });
    },

    InsertCredentialPara: (req, res) => {
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
                HrdNo: body.HrdNo,
                department: body.department,
                specialization: body.specialization,
                insuranceyes: body.insuranceyes,
                insuranceno: body.insuranceno,
                Outpatientyes: body.Outpatientyes,
                Outpatientno: body.Outpatientno,
                clinical: body.clinical,
                details: body.details,
                datesaved: body.datesaved,
                Admittingyes: body.Admittingyes,
                Admittingno: body.Admittingno,
                Operatingyes: body.Operatingyes,
                Operatingno: body.Operatingno,
                original: body.original,
                Copies: body.Copies,
                Registration: body.Registration,
                screenshot: body.screenshot,
                RegistrationCopies: body.RegistrationCopies,
                OriginalChecked: body.OriginalChecked,
                TrainingCopies: body.TrainingCopies

            }
            const { Operating, CertificateData, ExpData } = body;

            // const result = await EmpLangaugeKnown(newLangauge)
            // const { status, message } = result;
            // if (status === 1) {
            if (Object.keys(ExpData).length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'Please Enter the Training details'
                });
            } else {
                var values = ExpData.map((value, index) => {
                    return [value.training, value.conducted, value.em_no, value.em_id, body.department,]
                })
                const result = await EmpCredentialparaTraining(values)
                const { status, message } = result;
                if (status === 1) {
                    if (Object.keys(CertificateData).length === 0) {
                        return res.status(200).json({
                            success: 0,
                            message: 'Please Enter the certificate '
                        });
                    } else {
                        var values = CertificateData.map((value, index) => {
                            return [value.em_id, value.em_no, value.Certification, value.Year]
                        })
                        const result = await Empcertificatepara(values)
                        const { status, message } = result;

                        if (status === 1) {
                            if (Object.keys(empdetails).length === 0) {
                                return res.status(200).json({
                                    success: 0,
                                    message: 'Please Enter the Privileging Data '
                                });
                            } else {
                                const result = await PrivilegingDatapara(empdetails)
                                const { status, message } = result;
                                if (status === 1) {
                                    var values = Operating.map((value, index) => {
                                        return [value.Name, value.NameU, value.NameS, value.NameI, value.em_no, value.em_id, body.department, value.Decision]
                                    })
                                    const result = await Previlegedocdatapara(values)
                                    const { status, message } = result;

                                    if (status === 1) {
                                        return res.status(200).json({
                                            success: 1,
                                            message: message
                                        });

                                    } else {
                                        return res.status(200).json({
                                            success: 0,
                                            message: message
                                        });
                                    }
                                } else {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "Credential details data not Inserted"
                                    });
                                }
                            }

                        } else {
                            return res.status(200).json({
                                success: 0,
                                message: "Credential certification data not Inserted"
                            });
                        }
                    }

                } else {
                    return res.status(200).json({
                        success: 0,
                        message: "Credential Training data not Inserted"
                    });
                }
            }



        }
        Func(body)
    },

    GetcredentialparaTraining: (req, res) => {
        const body = req.body;
        GetcredentialparaTraining(body, (err, results) => {
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

    GetcredentialparaCertificate: (req, res) => {
        const body = req.body;
        GetcredentialparaCertificate(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successcert: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successcert: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successcert: 1,
                datacert: results
            });
        });
    },
    Getcredentialparadetails: (req, res) => {
        const body = req.body;
        Getcredentialparadetails(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successdetails: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successdetails: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successdetails: 1,
                datadetails: results
            });
        });
    },

    GetcredentialparaprivilageData: (req, res) => {
        const body = req.body;
        GetcredentialparaprivilageData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successdata: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successdata: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successdata: 1,
                dataprivilege: results
            });
        });
    },
    InsertCredentialOther: (req, res) => {
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
                HrdNo: body.HrdNo,
                department: body.department,
                specialization: body.specialization,
                insuranceyes: body.insuranceyes,
                insuranceno: body.insuranceno,
                Outpatientyes: body.Outpatientyes,
                Outpatientno: body.Outpatientno,
                clinical: body.clinical,
                details: body.details,
                datesaved: body.datesaved,
                Admittingyes: body.Admittingyes,
                Admittingno: body.Admittingno,
                Operatingyes: body.Operatingyes,
                Operatingno: body.Operatingno,
                original: body.original,
                Copies: body.Copies,
                Registration: body.Registration,
                screenshot: body.screenshot,
                RegistrationCopies: body.RegistrationCopies,
                OriginalChecked: body.OriginalChecked,
                TrainingCopies: body.TrainingCopies

            }
            const { Operating, CertificateData, ExpData } = body;

            // const result = await EmpLangaugeKnown(newLangauge)
            // const { status, message } = result;
            // if (status === 1) {
            if (Object.keys(ExpData).length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'Please Enter the Training details'
                });
            } else {
                var values = ExpData.map((value, index) => {
                    return [value.training, value.conducted, value.em_no, value.em_id, body.department]
                })
                const result = await EmpCredentialotherTraining(values)
                const { status, message } = result;
                if (status === 1) {
                    if (Object.keys(CertificateData).length === 0) {
                        return res.status(200).json({
                            success: 0,
                            message: 'Please Enter the certificate '
                        });
                    } else {
                        var values = CertificateData.map((value, index) => {
                            return [value.em_id, value.em_no, value.Certification, value.Year]
                        })
                        const result = await Empcertificateother(values)
                        const { status, message } = result;

                        if (status === 1) {
                            if (Object.keys(empdetails).length === 0) {
                                return res.status(200).json({
                                    success: 0,
                                    message: 'Please Enter the Privileging Data '
                                });
                            } else {
                                const result = await PrivilegingDataother(empdetails)
                                const { status, message } = result;
                                if (status === 1) {
                                    var values = Operating.map((value, index) => {
                                        return [value.Name, value.NameO, value.NameS, value.NameA, value.NameP, value.em_no, value.em_id, body.department, value.Decision]
                                    })
                                    const result = await Previlegedocdataother(values)
                                    const { status, message } = result;

                                    if (status === 1) {
                                        return res.status(200).json({
                                            success: 1,
                                            message: message
                                        });

                                    } else {
                                        return res.status(200).json({
                                            success: 0,
                                            message: "Credential Privilege data not Inserted"
                                        });
                                    }
                                } else {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "Credential details data not Inserted"
                                    });
                                }
                            }

                        } else {
                            return res.status(200).json({
                                success: 0,
                                message: "Credential certification data not Inserted"
                            });
                        }
                    }

                } else {
                    return res.status(200).json({
                        success: 0,
                        message: "Credential Training data not Inserted"
                    });
                }
            }



        }
        Func(body)
    },

    GetcredentialotherTraining: (req, res) => {
        const body = req.body;
        GetcredentialotherTraining(body, (err, results) => {
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
    GetcredentialotherCertificate: (req, res) => {
        const body = req.body;
        GetcredentialotherCertificate(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successcert: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successcert: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successcert: 1,
                datacert: results
            });
        });
    },
    Getcredentialotherdetails: (req, res) => {
        const body = req.body;
        Getcredentialotherdetails(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successdetails: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successdetails: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successdetails: 1,
                datadetails: results
            });
        });
    },
    GetcredentialotherprivilageData: (req, res) => {
        const body = req.body;
        GetcredentialotherprivilageData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    successdata: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    successdata: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                successdata: 1,
                dataprivilege: results
            });
        });
    },
    GetHodapprovalData: (req, res) => {
        const body = req.body;
        GetHodapprovalData(body, (err, results) => {
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

    GetHodapprovalNurseData: (req, res) => {
        const body = req.body;
        GetHodapprovalNurseData(body, (err, results) => {
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

    GetHodapprovalParaData: (req, res) => {
        const body = req.body;
        GetHodapprovalParaData(body, (err, results) => {
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
    GetHodapprovalotheraData: (req, res) => {
        const body = req.body;
        GetHodapprovalotheraData(body, (err, results) => {
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

    GetMSapprovalData: (req, res) => {
        const body = req.body;
        GetMSapprovalData(body, (err, results) => {
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

    GetMSapprovalNurseData: (req, res) => {
        const body = req.body;
        GetMSapprovalNurseData(body, (err, results) => {
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

    GetMSapprovalParaData: (req, res) => {
        const body = req.body;
        GetMSapprovalParaData(body, (err, results) => {
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


    GetMSapprovalotheraData: (req, res) => {
        const body = req.body;
        GetMSapprovalotheraData(body, (err, results) => {
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


    GetCPapprovalData: (req, res) => {
        const body = req.body;
        GetCPapprovalData(body, (err, results) => {
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



    GetCPapprovalNurseData: (req, res) => {
        const body = req.body;
        GetCPapprovalNurseData(body, (err, results) => {
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
    GetCPapprovalParaData: (req, res) => {
        const body = req.body;
        GetCPapprovalParaData(body, (err, results) => {
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
    GetCPapprovalotheraData: (req, res) => {
        const body = req.body;
        GetCPapprovalotheraData(body, (err, results) => {
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

    GetMDapprovalData: (req, res) => {
        const body = req.body;
        GetMDapprovalData(body, (err, results) => {
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

    GetMDapprovalNurseData: (req, res) => {
        const body = req.body;
        GetMDapprovalNurseData(body, (err, results) => {
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


    GetMDapprovalParaData: (req, res) => {
        const body = req.body;
        GetMDapprovalParaData(body, (err, results) => {
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



    GetMDapprovalotheraData: (req, res) => {
        const body = req.body;
        GetMDapprovalotheraData(body, (err, results) => {
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

    InsertCredHod: (req, res) => {
        const body = req.body;
        InsertCredHod(body, (err, results) => {
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
    InsertCredNurseHod: (req, res) => {
        const body = req.body;
        InsertCredNurseHod(body, (err, results) => {
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
    InsertCredParaHod: (req, res) => {
        const body = req.body;
        InsertCredParaHod(body, (err, results) => {
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

    InsertCredOtherHod: (req, res) => {
        const body = req.body;
        InsertCredOtherHod(body, (err, results) => {
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

    InsertCredMS: (req, res) => {
        const body = req.body;
        InsertCredMS(body, (err, results) => {
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

    InsertCredNurseMS: (req, res) => {
        const body = req.body;
        InsertCredNurseMS(body, (err, results) => {
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

    InsertCredParaMS: (req, res) => {
        const body = req.body;
        InsertCredParaMS(body, (err, results) => {
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

    InsertCredOtherMS: (req, res) => {
        const body = req.body;
        InsertCredOtherMS(body, (err, results) => {
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

    InsertCredDocCP: (req, res) => {
        const body = req.body;
        InsertCredDocCP(body, (err, results) => {
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

    InsertCredNurseCP: (req, res) => {
        const body = req.body;
        InsertCredNurseCP(body, (err, results) => {
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


    InsertCredParaCP: (req, res) => {
        const body = req.body;
        InsertCredParaCP(body, (err, results) => {
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

    InsertCredOtherCP: (req, res) => {
        const body = req.body;
        InsertCredOtherCP(body, (err, results) => {
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

    InsertCredDocMD: (req, res) => {
        const body = req.body;
        InsertCredDocMD(body, (err, results) => {
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

    InsertCredNurseMD: (req, res) => {
        const body = req.body;
        InsertCredNurseMD(body, (err, results) => {
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


    InsertCredParaMD: (req, res) => {
        const body = req.body;
        InsertCredParaMD(body, (err, results) => {
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

    InsertCredOtherMD: (req, res) => {
        const body = req.body;
        InsertCredOtherMD(body, (err, results) => {
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