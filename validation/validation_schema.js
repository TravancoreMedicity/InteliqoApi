const Joi = require("joi");

const authSchema = Joi.object({
        first_name: Joi.string().uppercase().min(3).max(60).required(),
        email: Joi.string().email().lowercase().required(),
        email_verify: Joi.string().email().lowercase().required(),
        password: Joi.string().required().min(2)
});

// employee table data validation
const validateEmployee = Joi.object({
        emp_slno: Joi.optional(),
        emp_no: Joi.number().required(),
        emp_name: Joi.string().uppercase().required().max(65),
        emp_gender: Joi.string().max(1).required(),
        emp_dob: Joi.date().optional(),
        emp_permanent: Joi.string().optional(),
        emp_pincode_pres: Joi.string().optional(),
        emp_present: Joi.string().optional(),
        emp_pincode_perm: Joi.string().optional(),
        emp_mob: Joi.number().optional(),
        emp_phone: Joi.string().optional(),
        emp_email: Joi.string().optional(),
        emp_doj: Joi.date().optional(),
        emp_username: Joi.string().max(20),
        emp_password: Joi.string().required(),
        emp_dept_id: Joi.required(),
        emp_sect_id: Joi.required(),
        emp_branch_slno: Joi.required(),
        emp_status: Joi.required(),
});

// brqanch input validation

const validateBranch = Joi.object({
        branch_name: Joi.string().uppercase().min(1).max(60).message({
                'string.empty': 'Branch Name is required',
                'string.min': 'Department Name length must be at least 1 characters long',
                'string.max': 'Department Name length must be less than or equal to 60 characters long'
        }),
        branch_address: Joi.string().min(1).max(100).message({
                'string.empty': 'Branch Address Name is required',
        }),
        branch_email: Joi.string().email().min(1).max(45).message({
                'string.empty': 'Email Address Name is required',
        }),
        phoneNumber: Joi.string().min(1).max(45).optional().uppercase().message({
                'string.empty': 'Phone Number is required',
        }),
        branch_esi: Joi.string().min(1).max(45).uppercase().message({
                'string.empty': 'Esi Number is required',
        }),
        branch_pf: Joi.string().min(1).max(45).uppercase().message({
                'string.empty': 'PF Number is required',
        }),
        branch_status: Joi.number().min(0).max(1),
        branch_slno: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),

});

// Department input validation

const validateDepartment = Joi.object({
        dept_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Department Name is Required',
                        'string.min': 'Department Name length must be at least 3 characters long',
                        'string.max': 'Department Name length must be less than or equal to 45 characters long'
                }),
        dept_status: Joi.number().min(0).max(1),
        dept_alias: Joi.string().trim().min(1).max(5).required()
                .messages({
                        'string.empty': 'Alias Name is Required',
                        'string.min': 'Alias Name length must be at least 1 characters long',
                        'string.max': 'Alias Name length must be less than or equal to 5 characters long',
                }),
        dept_id: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

const validateSection = Joi.object({
        sect_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Department Section Name is Required',
                        'string.min': 'Department Section Name length must be at least 3 characters long',
                        'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
                }),
        sect_status: Joi.number().min(0).max(1),
        dept_id: Joi.number().required(),
        sect_id: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

const validateMenuName = Joi.object({
        menu_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Menu Name is Required',
                        'string.max': 'Menu Name length must be less than or equal to 45 characters long',
                        'string.min': 'Menu Name length must be at least 3 characters long',
                }),
        menu_module_name: Joi.string().min(1).max(1).required(),
        menu_slno: Joi.optional()
});

const validateGroupAssign = Joi.object({
        user_group_slno: Joi.string().min(1).max(1).required(),
        hrm_emp_slno: Joi.string().min(1).max(1).required(),
});

const validateInstitutionType = Joi.object({
        inst_slno: Joi.optional(),
        inst_emp_type: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Type Name is Required',
                        'string.max': 'Type length must be less than or equal to 45 characters long',
                        'string.min': 'Type length must be at least 3 characters long',
                }),
        inst_emp_status: Joi.number().max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

// employee Type
const validateEmployeeType = Joi.object({
        emptype_slno: Joi.optional(),
        emptype_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Type Name is Required',
                        'string.max': 'Type length must be less than or equal to 45 characters long',
                        'string.min': 'Type length must be at least 3 characters long',
                }),
        cont_period: Joi.number().required(),
        cont_grace: Joi.number().required(),
        el_aplicable: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),

});

// employee status
const validateEmployeeStatus = Joi.object({
        emstats_slno: Joi.optional(),
        empstat_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Name is Required',
                        'string.max': 'Name length must be less than or equal to 45 characters long',
                        'string.min': 'Name length must be at least 3 characters long',
                }),
        empstat_cl: Joi.number().min(0).max(1).required(),
        empstat_el: Joi.number().min(0).max(1).required(),
        empstat_hd: Joi.number().min(0).max(1).required(),
        empstat_esi: Joi.number().min(0).max(1).required(),
        empstat_pf: Joi.number().min(0).max(1).required(),
        empstat_period: Joi.number().min(0).required(),
        create_user: Joi.number().optional(),
        update_user: Joi.number().optional(),
});


const validateDesignation = Joi.object({
        desg_slno: Joi.optional(),
        desg_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Deignation Name is Required',
                        'string.max': 'Deignation length must be less than or equal to 45 characters long',
                        'string.min': 'Deignation length must be at least 3 characters long',
                }),
        desg_status: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

const validateBankMaster = Joi.object({
        bank_slno: Joi.optional(),
        bank_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Bank Name is Required',
                        'string.max': 'Bank Name length must be less than or equal to 45 characters long',
                        'string.min': 'Bank Name length must be at least 3 characters long',
                }),
        bank_ifsc: Joi.string().trim().uppercase().min(3).max(12).required()
                .messages({
                        'string.empty': 'IFSC code is Required',
                        'string.max': 'IFSC code length must be less than or equal to 12 characters long',
                        'string.min': 'IFSC code length must be at least 3 characters long',
                }),
        bank_address: Joi.string().trim().lowercase().min(3).max(45).optional()
                .messages({
                        'string.empty': 'Bank Address is Required',
                        'string.max': 'Bank Address length must be less than or equal to 45 characters long',
                        'string.min': 'Bank Address length must be at least 3 characters long',
                }),
        bank_status: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

const validateQualification = Joi.object({
        qual_slno: Joi.optional(),
        qual_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Qualification Name is Required',
                        'string.max': 'Qualification length must be less than or equal to 45 characters long',
                        'string.min': 'Qualification length must be at least 3 characters long',
                }),
        qual_status: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

const validateSpecialized = Joi.object({
        spec_slno: Joi.optional(),
        spec_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Specialized Name is Required',
                        'string.max': 'Specialized length must be less than or equal to 45 characters long',
                        'string.min': 'Specialized length must be at least 3 characters long',
                }),
        spec_status: Joi.number().min(1).max(1).required(),
});

const validateRegion = Joi.object({
        reg_slno: Joi.optional(),
        reg_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'Region Name is Required',
                        'string.max': 'Region length must be less than or equal to 45 characters long',
                        'string.min': 'Region length must be at least 3 characters long',
                }),
        reg_pincode: Joi.number().min(1).optional(),
        reg_dist_slno: Joi.number().min(1).required(),
        reg_status: Joi.number().max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

// VALIDATE UNIVERSITY
const validateunivercity = Joi.object({
        unver_slno: Joi.optional(),
        unver_alias: Joi.optional(),
        unver_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'University Name is Required',
                        'string.max': 'University length must be less than or equal to 45 characters long',
                        'string.min': 'University length must be at least 3 characters long',
                }),
        unver_status: Joi.number().min(0).max(1).required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
});

// Validation for the Employment 
const validationEmployment = Joi.object({
        emt_slno: Joi.optional(),
        emt_name: Joi.string().required().min(5).max(75).trim(),
        emptype_slno: Joi.number().required(),
        destype_slno: Joi.number().required(),
        contract: Joi.number().required(),
        contract_perd: Joi.optional(),
        training: Joi.number().required(),
        training_perd: Joi.optional(),
        probation: Joi.number().required(),
        probation_perd: Joi.optional(),
        esi_yes: Joi.number().required(),
        pf_yes: Joi.number().required(),
        el_yes: Joi.number().required(),
        cl_yes: Joi.number().required(),
        hl_yes: Joi.number().required(),
        sick_yes: Joi.number().required(),
        emp_status: Joi.number().required()
})

// BLOOD GROUP VALIDATION
const validatebloodgroup = Joi.object({
        group_slno: Joi.optional(),
        group_name: Joi.string().required().trim().uppercase(),
        group_status: Joi.number().required()
})

// VALIDATE GRADE MASTER
const validateGradeMast = Joi.object({
        grade_slno: Joi.optional(),
        grade_desc: Joi.string().required().trim().uppercase(),
        grade_status: Joi.number().required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})




// VALIDATE EARN TYPE
const validateEarnMast = Joi.object({

        earn_type: Joi.string().required().uppercase().trim(),
        deduction_status: Joi.number().required(),
        earntype_status: Joi.number().required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})


// VALIDATE DISTRICT
const validatedistrict = Joi.object({
        dist_name: Joi.string().required().trim().uppercase(),
        dist_state_slno: Joi.number().required(),
        dist_status: Joi.number().required(),
        dist_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATE EARNINGS
const validateearnings = Joi.object({
        earnded_name: Joi.string().required().trim().uppercase().max(45),
        include_esi: Joi.number().required(),
        include_lwf: Joi.number().required(),
        include_pf: Joi.number().required(),
        include_protax: Joi.number().required(),
        erning_type_id: Joi.number().required(),
        earnded_status: Joi.number().required(),
        earnded_id: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATE EMPLOYEE CATEGORY
const validateempcategory = Joi.object({
        ecat_name: Joi.string().required().trim().uppercase().max(45),
        emp_type: Joi.number().required(),
        des_type: Joi.number().required(),
        ecat_cont: Joi.number(),
        ecat_cont_period: Joi.number(),
        ecat_cont_type: Joi.string().trim().uppercase().min(1),
        ecat_prob: Joi.number(),
        ecat_prob_period: Joi.number(),
        ecat_prob_type: Joi.string().uppercase(),
        ecat_cl: Joi.number(),
        ecat_cl_max: Joi.number(),
        ecat_el: Joi.number(),
        ecat_el_max: Joi.number(),
        ecat_sl: Joi.number(),
        ecat_sl_max: Joi.number(),
        ecat_nh: Joi.number(),
        ecat_nh_max: Joi.number(),
        ecat_fh: Joi.number(),
        ecat_fh_max: Joi.number(),
        ecat_woff_allow: Joi.number(),
        ecat_doff_allow: Joi.number(),
        ecat_esi_allow: Joi.number(),
        ecat_confere: Joi.number(),
        ecat_confere_max: Joi.number(),
        ecat_lop: Joi.number(),
        ecat_lop_max: Joi.number(),
        ecat_mate: Joi.number(),
        ecat_mate_max: Joi.number(),
        ecat_status: Joi.number(),
        category_slno: Joi.number().optional(),
        empstat_period: Joi.number().optional(),
        cont_period: Joi.number().optional(),
        cont_grace: Joi.optional(),
        create_users: Joi.optional(),
        edit_user: Joi.optional(),
})

// VALIDATE REGISTRATON TYPE
const validateregistraiontype = Joi.object({
        registration_name: Joi.string().trim().uppercase().max(45),
        registration_status: Joi.number(),
        reg_id: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional()
})

//VALIDATE PROFESSIONAL TAX
const validateprofessionaltax = Joi.object({
        prof_tax_desc: Joi.string().trim().max(45).required(),
        prof_status: Joi.number().required(),
        salary_from: Joi.number().required(),
        salary_to: Joi.number().required(),
        tax_amt: Joi.number().required(),
        proftax_id: Joi.number().optional(),
});

// VALIDATE SHIFT MASTER
const validateshiftmaster = Joi.object({
        shft_desc: Joi.string().trim().uppercase().max(45).required(),
        shft_code: Joi.string().trim().uppercase().max(10).required(),
        shft_chkin_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        shft_chkout_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        shft_cross_day: Joi.number(),
        shft_chkin_start: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        shft_chkin_end: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        shft_chkout_start: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        shft_chkout_end: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        shft_duty_day: Joi.number(),
        shft_brk_start: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        shft_brk_end: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        shft_early_in_criteria: Joi.number(),
        shft_early_in_mints: Joi.string().regex(/^([0-9]{2})/).required(),
        shft_late_out_criteria: Joi.number(),
        shft_late_out_mints: Joi.string().regex(/^([0-9]{2})/).required(),
        shft_latein_allow_time: Joi.string().regex(/^([0-9]{2})/).required(),
        shft_earlyout_allow_time: Joi.string().regex(/^([0-9]{2})/).required(),
        first_half_in: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        first_half_out: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        second_half_in: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        second_half_out: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        shft_status: Joi.number(),
        shft_slno: Joi.number().optional()
})

// VALIDATE YEARLY HOLIDAY LIST
const validateyearlyholidaylist = Joi.object({
        hld_desc: Joi.string().trim().uppercase().max(45).required(),
        lvetype_slno: Joi.number().required(),
        hld_date: Joi.date().required(),
        hld_year: Joi.number().integer().min(2000).max(2050),
        hld_status: Joi.number().required(),
        hld_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional()
});

// VALIDATE YEARLY LEAVES
const validateyearyleaves = Joi.object({
        lvetype_slno_cl: Joi.number().required(),
        max_allowed_count_cl: Joi.number().required(),
        month_year_cl: Joi.required(),
        lvetype_slno_sick: Joi.number().required(),
        max_allowed_count_sick: Joi.number().required(),
        month_year_sick: Joi.required(),
        lvetype_slno_conference: Joi.number().required(),
        max_allowed_count_conference: Joi.number().required(),
        month_year_conference: Joi.required(),
        lvetype_slno_lop: Joi.number().required(),
        max_allowed_count_lop: Joi.number().required(),
        month_year_lop: Joi.required(),
        lvetype_slno_maternity: Joi.number().required(),
        max_allowed_count_maternity: Joi.number().required(),
        month_year_maternity: Joi.required(),
        lvetype_slno_previlage: Joi.number().required(),
        max_allowed_count_previlage: Joi.number().required(),
        month_year_previlage: Joi.required(),
        com_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional()
})

// VALIDATE LEAVE TYPE
const validateleavetype = Joi.object({
        lvetype_desc: Joi.string().trim().uppercase().max(20).required(),
        lvetype_code: Joi.string().max(4).trim().uppercase().required(),
        carryforward: Joi.number().required(),
        avail_on_traing_probation: Joi.number().required(),
        avail_on_after_confirm: Joi.number().optional(),
        half_day_allowed: Joi.number().optional(),
        leave_credit_policy: Joi.number().optional(),
        leave_credit_policy_count: Joi.number().optional(),
        status: Joi.number().required(),
        is_lop: Joi.number().optional(),
        is_holiday: Joi.number().optional(),
        is_leave: Joi.number().optional(),
        lvetype_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional()
})

// VAIDATE DOCOTOR TYPE
const validatedoctype = Joi.object({
        doctype_desc: Joi.string().max(45).trim().uppercase().required(),
        doctype_status: Joi.number().required(),
        doctype_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATE RELIDION
const validatereligion = Joi.object({
        relg_name: Joi.string().trim().max(45).uppercase().required(),
        relg_status: Joi.number().required(),
        relg_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATE EMPLOYEE MASTER
const validateempmaster = Joi.object({
        em_no: Joi.number().required(),
        em_id: Joi.number().required(),
        em_salutation: Joi.number().min(1).required(),
        em_name: Joi.string().trim().uppercase().required().max(60),
        em_gender: Joi.number().min(1).required(),
        em_dob: Joi.date().required(),
        em_age_year: Joi.number().optional(),
        em_age_month: Joi.number().optional(),
        em_age_day: Joi.number().optional(),
        em_doj: Joi.date().required(),
        hrm_religion: Joi.number().min(1).required(),
        em_mobile: Joi.number().min(10).required(),
        em_phone: Joi.number().optional(),
        em_email: Joi.string().email().required(),
        em_region: Joi.number().min(1).required(),
        hrm_region2: Joi.number().min(1).required(),
        em_branch: Joi.number().min(1).required(),
        em_department: Joi.number().min(1).required(),
        em_dept_section: Joi.number().min(1).required(),
        em_institution_type: Joi.number().min(1).required(),
        em_designation: Joi.number().min(1).required(),
        em_doc_type: Joi.number().min(1).required(),
        em_category: Joi.number().min(1).required(),
        em_prob_end_date: Joi.date().optional(),
        em_conf_end_date: Joi.date().optional(),
        em_retirement_date: Joi.date().optional(),
        em_contract_end_date: Joi.date().optional(),
        em_status: Joi.number().min(1).required(),
        create_user: Joi.number().required(),
        create_date: Joi.date().optional(),
        addressPresent1: Joi.string().trim().uppercase().required(),
        addressPresent2: Joi.string().trim().uppercase().required(),
        presPincode: Joi.number().required(),
        addressPermnt1: Joi.string().trim().uppercase().required(),
        addressPermnt2: Joi.string().trim().uppercase().required(),
        perPincode: Joi.number().required(),
        blood_slno: Joi.number().min(1).required(),
})
// VALIDATE EMPLOYEupdate
const validateempmasterupdate = Joi.object({
        em_no: Joi.number().required(),
        em_id: Joi.number().required(),
        emp_dob: Joi.date().required(),
        emp_yeargae: Joi.number().optional(),
        em_age_month: Joi.number().optional(),
        em_age_day: Joi.number().optional(),
        em_religion: Joi.number().min(1).required(),
        em_cont_mobile: Joi.number().min(10).required(),
        em_cont_phone: Joi.number().optional(),
        em_email: Joi.string().email().required(),
        em_region: Joi.number().min(1).required(),
        hrm_region2: Joi.number().min(1).required(),
        create_user: Joi.number().optional(),
        em_per_address1: Joi.string().trim().uppercase().required(),
        em_per_address2: Joi.string().trim().uppercase().required(),
        em_per_pincode: Joi.number().required(),
        em_pmnt_address1: Joi.string().trim().uppercase().required(),
        em_pmnt_address2: Joi.string().trim().uppercase().required(),
        em_pmnt_pincode: Joi.number().required(),
        em_bloodgroup: Joi.number().min(1).required(),
        em_passport_no: Joi.number().optional(),
        em_pan_no: Joi.number().optional(),
        em_adhar_no: Joi.number().optional(),
        em_license_no: Joi.number().optional(),
        em_bank: Joi.number().optional(),
        em_account_no: Joi.number().optional(),
        em_ifsc: Joi.number().optional(),
        em_maritalstatus: Joi.number().min(1).required(),
})

// VALIDATE EMPLOYEE CONTRACT DETAILS
const validateempcontract = Joi.object({
        em_no: Joi.number().required(),
        em_id: Joi.number().required(),
        em_cont_start: Joi.date().optional(),
        em_cont_end: Joi.date().optional(),
        em_cont_compl_status: Joi.string().optional().max(1),
        em_cont_renew: Joi.string().max(1).optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        create_date: Joi.date().optional(),
        update_date: Joi.date().optional(),
        em_cont_renew_date: Joi.date().optional(),
        em_cont_close: Joi.string().max(1).optional(),
        em_cont_close_date: Joi.date().optional()


})

// VALIDATE EMPOLYEE EARN AND DEDUCTION
const validateearndeduction = Joi.object({
        em_no: Joi.number().optional(),
        em_id: Joi.number().optional(),
        em_salary_desc: Joi.number().min(1).required(),
        em_earning_type: Joi.number().min(1).optional(),
        em_amount: Joi.number().optional(),
        em_start_date: Joi.date().optional(),
        em_end_date: Joi.date().optional(),
        em_status: Joi.string().max(1).optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        ernded_slno: Joi.number().optional(),
        last_wage: Joi.number().optional(),
        new_wage: Joi.number().optional(),

});

// VALIDATE EMPLOYEE EXPERIENCE DETAILS
const validateempexperience_ = Joi.object({
        em_no: Joi.number().optional(),
        em_institution: Joi.string().max(45).required(),
        em_designation: Joi.number().required(),
        em_from: Joi.date().optional(),
        em_to: Joi.date().optional(),
        em_total_year: Joi.number().optional(),
        em_salary: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        emexp_slno: Joi.number().optional()
})

// VALIDATE EMPLOYEE EXPERIENCE DETAILS
const validatesalaryIncrement = Joi.object({
        em_no: Joi.number().optional(),
        em_id: Joi.number().optional(),
        incr_start_date: Joi.date().required(),
        em_salary_desc: Joi.number().required(),
        incre_type: Joi.number().max(1).required(),
        incre_amount: Joi.number().required(),
        last_amount: Joi.number().optional(),
        incre_process_status: Joi.string().optional(),
        incre_process_date: Joi.number().optional(),
        incre_process_user: Joi.number().optional(),
        incre_last_changed_date: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        incre_slno: Joi.number().optional()
})

// VALIDATE EMPLOYEE PERSIONAL DETAILS
const validateeemployeepersonal = Joi.object({
        em_no: Joi.number().required(),
        em_id: Joi.number().required(),
        em_per_address1: Joi.string().max(75).required(),
        em_per_address2: Joi.string().max(75).required(),
        em_per_address3: Joi.string().optional(),
        em_per_pincode: Joi.string().max(10),
        em_pmnt_address1: Joi.string().max(75).required(),
        em_pmnt_address2: Joi.string().max(75).required(),
        em_pmnt_address3: Joi.string().optional(),
        em_pmnt_pincode: Joi.string().max(10),
        em_passport_no: Joi.string().max(12).optional(),
        em_pan_no: Joi.string().max(12).optional(),
        em_adhar_no: Joi.number().max(9999999999).optional(),
        em_license_no: Joi.string().max(20),
        //em_nationality: Joi.number().optional(),
        em_religion: Joi.number().required(),
        em_bloodgroup: Joi.number().min(1).required(),
        em_maritalstatus: Joi.number().min(1).required(),
        em_spouse_guardian: Joi.string().optional(),
        em_cont_mobile: Joi.number().min(10).required(),
        em_cont_phone: Joi.number().min(11).optional(),
        //em_notice_period: Joi.number().optional(),
        em_pers_remarks: Joi.string().max(45).optional(),
        em_bank: Joi.number().min(1).required(),
        em_account_no: Joi.number().max(999999999).required(),
        em_ifsc: Joi.string().max(10).optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        emper_slno: Joi.number().optional(),
        emp_dob: Joi.date().required(),
        em_email: Joi.string().email().required(),
        emp_yeargae: Joi.number().optional(),
        em_region: Joi.number().min(1).required(),
        hrm_region2: Joi.number().min(1).required()
})

// VALIDATE EMPLOYEE ESI AND PF
const validateempesipf = Joi.object({
        esi_slno: Joi.number().optional(),
        em_no: Joi.number().optional(),
        em_id: Joi.number().optional(),
        em_pf_status: Joi.number().required().max(1),
        em_pf_no: Joi.string().max(20).optional(),
        em_uan_no: Joi.string().max(20).optional(),
        em_esi_status: Joi.number().required().max(1),
        em_esi_no: Joi.string().max(20).optional(),
        em_grade: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        esi_slno: Joi.number().optional(),
})

// VALIDATE EMPOYEE QUALIFICATION
const validateempqualification = Joi.object({
        em_no: Joi.number().optional(),
        em_id: Joi.number().optional(),
        em_education: Joi.number().min(1).required(),
        em_course: Joi.number().min(1).required(),
        em_specialization: Joi.number().min(1).required(),
        em_univ_institute: Joi.number().min(1).required(),
        em_year: Joi.date().optional(),
        em_mark_grade: Joi.optional(),
        em_reg_type: Joi.number().max(9999999).required(),
        em_reg_no: Joi.string().max(20),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        emqual_slno: Joi.number().optional(),
})

// VALIDATE COURSE
const validatecourse = Joi.object({
        cour_desc: Joi.string().max(45).required().uppercase().trim(),
        edu_slno: Joi.number().max(99999).required().required(),
        cour_status: Joi.number().max(1.).required(),
        cour_slno: Joi.number().optional(),
        cour_created: Joi.number().max(999999999).optional(),
        cour_edit: Joi.number().max(999999999).optional(),
})

// VALIDATE EDUCATION
const validateeducation = Joi.object({
        edu_desc: Joi.string().max(45).required().uppercase().trim(),
        edu_status: Joi.number().max(1).required(),
        edu_create: Joi.number().max(999999999).optional(),
        edu_slno: Joi.number().optional(),
        edu_edit: Joi.number().optional()
})

//SPECIALIZATION 
const validatespecialization = Joi.object({
        spec_desc: Joi.string().max(45).uppercase().trim().required(),
        cour_slno: Joi.number().required(),
        spec_status: Joi.number().required(),
        spec_slno: Joi.number().optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// VALIDATION MODULE GROUP MASTER
const validatemodulegroupmaster = Joi.object({
        module_group_name: Joi.string().max(45).trim().uppercase().required(),
        module_slno: Joi.optional(),
        mdgrp_slno: Joi.number().optional()
})
// VALIDATE STATE
const validatestate = Joi.object({
        state_name: Joi.string().required().trim().uppercase(),
        state_nat_slno: Joi.number().required(),
        state_status: Joi.number().required(),
        state_slno: Joi.optional(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
})

// user Gorup Master
const validateUserGroup = Joi.object({
        user_group_name: Joi.string().trim().uppercase().min(3).max(45).required()
                .messages({
                        'string.empty': 'UserGroup Name is Required',
                        'string.min': 'UserGroup Name length must be at least 3 characters long',
                        'string.max': 'UserGroup Name length must be less than or equal to 45 characters long'
                }),
        user_group_status: Joi.number().max(1),
        user_grp_slno: Joi.optional()
});

//validation Fine deduction master
const validatefineded = Joi.object({
        fine_desc: Joi.string().required().trim().uppercase(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),

})

//Validation employee fine deduction master
const validatefinededuction = Joi.object({
        fine_slno: Joi.number().optional(),
        fine_emp_no: Joi.number().optional(),
        fine_emp_id: Joi.number().optional(),
        fine_type: Joi.number().min(1).required(),
        fine_descp: Joi.string().required(),
        fine_amount: Joi.number().required(),
        fine_status: Joi.number().optional(),
        fine_start: Joi.date().required(),
        fine_end: Joi.date().required(),
        fine_period: Joi.number().required(),
        fine_remark: Joi.string().required(),
        fine_create_user: Joi.number().optional(),
        fine_edit_user: Joi.number().optional(),
})

//validation company details updation in employee master
validateempmastercompanyupdate = Joi.object({
        em_branch: Joi.number().required(),
        em_department: Joi.number().required(),
        em_dept_section: Joi.number().required(),
        em_institution_type: Joi.number().required(),
        em_category: Joi.number().required(),
        em_no: Joi.number().required(),
        com_category: Joi.number().required(),
        com_category_new: Joi.number().required(),
        create_user: Joi.number().optional(),
        edit_user: Joi.number().optional(),
        em_id: Joi.number().optional(),

})


module.exports = {
        authSchema,  //authSchema:authSchema
        validateEmployee,
        validateBranch,
        validateDepartment,
        validateSection,
        validateUserGroup,
        validateMenuName,
        validateGroupAssign,
        validateInstitutionType,
        validateEmployeeType,
        validateEmployeeStatus,
        validateDesignation,
        validateBankMaster,
        validateQualification,
        validateSpecialized,
        validateRegion,
        validateunivercity,
        validationEmployment,
        validatebloodgroup,
        validateGradeMast,
        validatedistrict,
        validateearnings,
        validateempcategory,
        validateregistraiontype,
        validateprofessionaltax,
        validateshiftmaster,
        validateyearlyholidaylist,
        validateyearyleaves,
        validateleavetype,
        validatedoctype,
        validatereligion,
        validateempmaster,
        validateempmasterupdate,
        validateempcontract,
        validateearndeduction,
        validateempexperience_,
        validateeemployeepersonal,
        validateempesipf,
        validateempqualification,
        validatecourse,
        validateeducation,
        validatespecialization,
        validatemodulegroupmaster,
        validatestate,
        validateEarnMast,
        validatefineded,
        validatefinededuction,
        validatesalaryIncrement,
        validateempmastercompanyupdate
}