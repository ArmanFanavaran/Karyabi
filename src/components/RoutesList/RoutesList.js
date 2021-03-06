let Routes = {
    /************** LoginStep1 **************/
    "loginStep1": {
        "des": "ورود (وارد کردن شماره تلفن)",
        "enDes": "LoginStep1 (Enter Phone Number)",
        "route": "/login/step1"
    },
    "loginStep2": {
        "des": "ورود (وارد کردن رمز عبور)",
        "enDes": "LoginStep1 (Enter Password)",
        "route": "/login/step2"
    },
    "loginStep3": {
        "des": "ورود (وارد کردن رمز Google Auth)",
        "enDes": "LoginStep1 (Enter Google Auth pass)",
        "route": "/login/step3"
    },

    /************** Main Page **************/
    "mainPage": {
        "des": "صفحه اصلی",
        "enDes": "Main Page",
        "route": "/"
    },

    /************** Ticket Page **************/
    "ticket": {
        "des": "ارسال تیکت",
        "enDes": "ticket Page",
        "route": "/ticket"
    },


   /************** Main Page **************/
    "employmentAdvertisementList": {
       "des": "لیست آگهی ها",
       "enDes": "employmentAdvertisement List",
        "route": "/employmentAdvertisement/list"
    },
    "employmentAdvertisementSingle": {
        "des": "آگهی",
        "enDes": "employmentAdvertisement",
        "route": "/employmentAdvertisement/single"
    },


    /************** Register **************/
    // "registerStep1": {
    //     "des": "ثبت نام (انتخاب کشور)",
    //     "enDes": "Register (Select country)",
    //     "route": "/register/step1"
    // },
    "registerStep2": {
        "des": "ثبت نام (تایید کد پیامکی)",
        "enDes": "Register (Verify Phone number)",
        "route": "/register/step2"
    },
    "registerStep3": {
        "des": "ثبت نام (رمز عبور)",
        "enDes": "Register (Enter Password)",
        "route": "/register/step3"
    },
    /************** Profile **************/

    "profileSingle": {
        "des": "پروفایل",
        "enDes": "profile Single",
        "route": "/profile/single"
    },
    "profileEdit": {
        "des": "پروفایل",
        "enDes": "profile Single",
        "route": "/profile/edit"
    },
    "profilePic": {
        "des": "عکس پروفایل",
        "enDes": "profile picture",
        "route": "/profile/edit/pic"
    },

    /************* Dashboard **************/
    /*user*/
    "DashboardParent": {
        "des": "داشبورد",
        "enDes": "dashboard",
        "route": "/dashboard"
    },
    "SentResumes": {
        "des": "رزومه‌های ارسال شده",
        "enDes": "Sent Resumes",
        "route": "/dashboard/sentResumes"
    },
    "addCompany": {
        "des": "ثبت شرکت",
        "enDes": "Add Company",
        "route": "/dashboard/addCompany"
    },
    "updateCompany": {
        "des": "تکمیل اطلاعات شرکت",
        "enDes": "Update Company Info",
        "route": "/dashboard/updateCompany"
    },
    "updateCompanyCriticalInfo": {
        "des": "تغییر اطلاعات  پایه شرکت",
        "enDes": "Update Company Critical Info",
        "route": "/dashboard/updateCompanyCritical"
    },
    "dashboardRequests": {
        "des": "لیست درخواست ها",
        "enDes": "Requests",
        "route": "/dashboard/requests"
    },
    "dashboardChangePass": {
        "des": "ویرایش رمز عبور",
        "enDes": "Change Password",
        "route": "/dashboard/changePassword1"
    },

    /*company*/
    "dashboardParentCompany": {
        "des": "داشبورد شرکت",
        "enDes": "Company Dashboard",
        "route": "/company/dashboard"
    },
    "companyJobOffers": {
        "des": "فرصت‌های شغلی",
        "enDes": "Job Offers",
        "route": "/company/dashboard/jobOffers"
    },
    "addJobOfferByCompany": {
        "des": "افزودن فرصت شغلی",
        "enDes": "Add Job Offer",
        "route": "/company/dashboard/addJobOffer"
    },
    "addJobOfferByCompanyStep2": {
        "des": "افزودن فرصت شغلی",
        "enDes": "Add Job Offer",
        "route": "/company/dashboard/addJobOfferStep2"
    },
    "companyReceivedResumes": {
        "des": "رزومه های ارسالی",
        "enDes": "Received Resumes",
        "route": "/company/dashboard/receivedResumes"
    },

   /************* Dashboard Admin **************/
    /*Admin*/
    "DashboardParentAdmin": {
        "des": "پنل ادمین",
        "enDes": "panel admin",
        "route": "/admin/dashboard"
    },
    "HeroList": {
        "des": "لیست متن صفحه اصلی",
        "enDes": "Hero list",
        "route": "/admin/dashboard/hero/list"
    },
    "DegreeList": {
        "des": "لیست مقطع تحصیلی",
        "enDes": "Degree list",
        "route": "/admin/dashboard/degree/list"
    },
    "CreateNews": {
        "des": "ساخت خبر جدید",
        "enDes": "Create News",
        "route": "/admin/dashboard/create-news"
    },
    "FooterSettings": {
        "des": "تنظیمات فوتر",
        "enDes": "footer settings",
        "route": "/admin/dashboard/footerSettings"
    },
    "UpdateFooterSettings": {
        "des": "تنظیمات فوتر",
        "enDes": "footer settings",
        "route": "/admin/dashboard/footerSettings/update"
    },
    "PublicLinks": {
        "des": "پیوندها",
        "enDes": "public links",
        "route": "/admin/dashboard/publicLinks"
    },
    "UpdatePublicLinks": {
        "des": "ویرایش پیوند ",
        "enDes": "edit public link",
        "route": "/admin/dashboard/publicLinks/update"
    },
    "AddPublicLinks": {
        "des": "افزودن",
        "enDes": "add public link",
        "route": "/admin/dashboard/publicLinks/add"
    },

    /************** Change Password **************/
    "changePassword": {
        "des": "تغییر رمز عبور",
        "enDes": "change password",
        "route": "/change/password"
    },

    /************** reset Password **************/
    "resetPasswordStep1": {
        "des": "کد احراز هویت",
        "enDes": "reset password",
        "route": "/reset/password/step1"
    },
    "resetPasswordStep2": {
        "des": "وارد کردن رمز",
        "enDes": "reset password",
        "route": "/reset/password/step2"
    },
    // "resetPasswordStep3": {
    //     "des": "وارد کردن رمز",
    //     "enDes": "reset password",
    //     "route": "/reset/password/step3"
    // },
    // "resetPasswordStep4": {
    //     "des": "QR کد گوگل",
    //     "enDes": "reset password",
    //     "route": "/reset/password/step4"
    // },

    /************** Resume **************/
    "resume": {
        "des": "رزومه",
        "enDes": "Resume",
        "route": "/resume/show"
    },
    "resumeType2": {
        "des": "رزومه",
        "enDes": "Resume",
        "route": "/resume/show2"
    },
    "resumeStep1": {
        "des": "اطلاعات شخصی",
        "enDes": "Personal Information",
        "route": "/resume/step1"
    },
    "resumeStep2": {
        "des": "عکس پروفایل",
        "enDes": "Profile Picture",
        "route": "/resume/step2"
    },
    "resumeStep3": {
        "des": "درباره من",
        "enDes": "About Me",
        "route": "/resume/step3"
    },
    "resumeStep4": {
        "des": "سوابق تحصیلی",
        "enDes": "Educational background",
        "route": "/resume/step4"
    },
    "resumeStep5": {
        "des": "زبان",
        "enDes": "language",
        "route": "/resume/step5"
    },
    "resumeStep6": {
        "des": "مهارت نرم افزاری",
        "enDes": "Software skills",
        "route": "/resume/step6"
    },
    "resumeStep7": {
        "des": "مهارت",
        "enDes": "skills",
        "route": "/resume/step7"
    },
    "resumeStep8": {
        "des": "سوابق کاری",
        "enDes": "work experience",
        "route": "/resume/step8"
    },
    "resumeStep9": {
        "des": "پروژه ها",
        "enDes": "Project",
        "route": "/resume/step9"
    },
    "resumeStep10": {
        "des": "افتخارات",
        "enDes": "honor",
        "route": "/resume/step10"
    },
    "resumeStep11": {
        "des": "مقالات",
        "enDes": "article",
        "route": "/resume/step11"
    },
    "resumeStep12": {
        "des": "ترجیحات شغلی",
        "enDes": "Job Preferences",
        "route": "/resume/step12"
    },

    /************** Content Production **************/
    "contentProductionList": {
        "des": "لیست تولید محتوا",
        "enDes": "Content Production list",
        "route": "/content/list"
    },
    "contentProductionSingle": {
        "des": "تولید محتوا تک صفحه",
        "enDes": "Resume",
        "route": "/content/single"
    },

    /************* Company **************/
    "companyList": {
        "des": "لیست شرکت‌ها",
        "enDes": "Companies List",
        "route": "/companies/list"
    },
    "companySingle": {
        "des": "تک صفحه شرکت",
        "enDes": "Company Single",
        "route": "/companies/single"
    }
}

export function getRoutesItems() {
    return Routes;
}