const { getData, vaccinationInsert,vaccinationentry,annualvaccinationbooster,getannualvac, vaccinationBoosterInsert,annualvaccinationInsert, getVaccination,updateannualinsert, SeconddoseInsert, ThirddoseInsert,hicinsertseconddose,hicinsertboosterdose,hicinsertthirddose, getDataVaccination, hicinsertfirstdose,vaccinationInsertEntry, vaccinationInsertBooster } = require('../Vaccination/Vaccination.service');

module.exports = {
    getData: (req, res) => {

        getData((err, results) => {
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

    // date insertation first dose

    vaccinationInsert: (req, res) => {
        const body = req.body;
        vaccinationInsert(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },


    // vaccination booster dose

    vaccinationBoosterInsert: (req, res) => {
        const body = req.body;
        vaccinationBoosterInsert(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },
    // get vaccination detail of employee


    getVaccination: (req, res) => {

        const id = req.params.id;
        getVaccination(id, (err, results,) => {
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

    // seconddose boosterdose date
    SeconddoseInsert: (req, res) => {
        
        const body = req.body;
        SeconddoseInsert(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },
    // thirddose boosterdose date
    ThirddoseInsert: (req, res) => {
        
        const body = req.body;
        ThirddoseInsert(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },

    // api for taking vaccination
    getDataVaccination: (req, res) => {
        const id = req.params.id;
        getDataVaccination(id, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length === 0) {
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

    // vaccination entry page API
    vaccinationInsertEntry: (req, res) => {
        const body = req.body;
        vaccinationInsertEntry(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },

    vaccinationInsertBooster: (req, res) => {
        
        const body = req.body;
        vaccinationInsertBooster(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },

    // hicapi

     hicinsertfirstdose: (req, res) => {
        const body = req.body;
        hicinsertfirstdose(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },
 hicinsertseconddose: (req, res) => {
        const body = req.body;
        hicinsertseconddose(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },
hicinsertthirddose: (req, res) => {
        const body = req.body;
        hicinsertthirddose(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },
    hicinsertboosterdose: (req, res) => {
        const body = req.body;
        hicinsertboosterdose(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },

    // annual vaccination insert
 annualvaccinationInsert: (req, res) => {
        const body = req.body;
        annualvaccinationInsert(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
           else {
                updateannualinsert(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        return res.status(200).json({
                            success: 2,
                            message: "Record Not Found"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Created Successfully"
                    });

                });

            }
        })
    },
     annualvaccinationbooster: (req, res) => {
        const body = req.body;
        annualvaccinationbooster(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
           else {
                updateannualinsert(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        return res.status(200).json({
                            success: 2,
                            message: "Record Not Found"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Created Successfully"
                    });

                });

            }
        })
    },
 getannualvac: (req, res) => {
        const id = req.params.id;
        
        getannualvac(id, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length === 0) {
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
     vaccinationentry: (req, res) => {
        
        const body = req.body;
        vaccinationentry(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data Inserted Successfully"
            })
        })
    },

}