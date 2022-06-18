import React, {useEffect, useState} from 'react';
import Style from './addJobOffer.module.css'
import {generateURL} from "../../global/Requests";
import { MultiSelect } from "react-multi-select-component";
import queryString from "query-string";
import * as $ from 'jquery';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NotificationManager} from "react-notifications";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import {NotificationContainer} from "react-notifications";


export default function AddJobOfferStep2() {
    const [language, setLanguage] = useState();
    const [jobOfferId, setJobOfferId] = useState();
    const [companyId, setCompanyId] = useState();
    const [categories, setCategories] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [genders, setGenders] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [militaries, setMilitaries] = useState([]);
    const [skills, setSkills] = useState([]);
    const [majors, setMajors] = useState([]);
    const [jobOfferMajors, setJobOfferMajors] = useState([]);
    const [isSoftware, setIsSoftware] = useState(false);


    /* default data */
    const [description, setDescription] = useState();
    const [engDescription, setEngDescription] = useState();
    const [title, setTitle] = useState();
    const [titleEng, setTitleEng] = useState();
    const [category, setCategory] = useState();
    const [website, setWebsite] = useState();
    const [experience, setExperience] = useState();
    const [military, setMilitary] = useState();
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [degree, setDegree] = useState();
    const [gender, setGender] = useState();
    const [salary, setSalary] = useState();
    const [isEmergency, setIsEmergency] = useState(false);
    const [isFullTime, setIsFullTime] = useState(false);
    const [isPartTime, setIsPartTime] = useState(false);
    const [isRemote, setIsRemote] = useState(false);
    const [isInternship, setIsInternship] = useState(false);
    const [isPromotionPossible, setIsPromotionPossible] = useState(false);
    const [isInsurancePossible, setIsInsurancePossible] = useState(false);
    const [isCoursePossible, setIsCoursePossible] = useState(false);
    const [isFlexibleWorkTimePossible, setIsFlexibleWorkTimePossible] = useState(false);
    const [isCommutingServicePossible, setIsCommutingServicePossible] = useState(false);
    const [isFreeFoodPossible, setIsFreeFoodPossible] = useState(false);


    const  onSelectProvince = (event) => {
        let province_id = parseInt($(event.target).val());
        let axios = require('axios');
        let config = {
            method: 'get',
            url: generateURL("/SideArray/GetCitiesOfProvince?province_id=") + province_id,
            headers: {"Content-Type": "application/json"},
        };
        /* get cities for the province */
        axios(config)
            .then(function (response) {
                setCities(response.data.data)
            })
            .catch(function (error) {
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i], '', 1000);
                        }
                    });

                } else if (error.response.data.message != null && error.response.data.message != undefined) {
                    NotificationManager.error(error.response.data.message, '', 1000);
                } else {
                    NotificationManager.error(error.response.data.Message, '', 1000);

                }
            });


    }

    const onAddMajor = () => {
        let selected = parseInt($("#major_select").val());
        let axios = require('axios');

        let data = {
            "id": jobOfferId,
            "roleId": 8,
            "roleAccountId": companyId,
            "majorId": selected
        }
        let config = {
            method: 'post',
            url: generateURL("/JobOffer/AddMajor"),
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(data)
        };
        axios(config)
            .then(function (response) {
                let config = {
                    method: 'get',
                    url: generateURL("/Side/GetMajorSingle?id=") + selected,
                    headers: {'Content-Type': 'application/json'},
                };
                axios(config)
                    .then(function (response) {
                        let major_data = response.data.data;
                        let major = {
                            MajorId : major_data.id,
                            Major: {
                                Id: selected,
                                Name: major_data.name,
                                EnglishName: major_data.englishName,
                                Count: major_data.count
                            }
                        }
                        let joboffer_majors = [...jobOfferMajors];
                        joboffer_majors.push(major);
                        setJobOfferMajors(joboffer_majors)

                        $("#none_major").prop("selected", true);

                    })
                    .catch(function (error) {
                        console.log(error)
                    });


            })
            .catch(function (error) {
                let errors;
                if(error.response !== undefined) {
                    errors = error.response.data.errors;
                    if (errors != null) {
                        Object.keys(errors).map((key, i) => {
                            for (var i = 0; i < errors[key].length; i++) {
                                NotificationManager.error(errors[key][i], '', 1000);
                            }
                        });

                    } else if (error.response.data.message != null && error.response.data.message != undefined) {
                        NotificationManager.error(error.response.data.message, '', 1000);
                    } else {
                        NotificationManager.error(error.response.data.Message, '', 1000);

                    }
                }

            });
    }

    const onRemoveMajor = (id) => {

        let data = {
            "id": id,
            "role": 8,
            "roleAccountId": companyId,
            "roleId": 8
        }
        let axios = require('axios');
        let config = {
            method: 'post',
            url: generateURL("/JobOffer/RemoveMajor"),
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(data)
        };
        axios(config)
            .then(function (response) {
                let majors_array = [...jobOfferMajors];
                $(majors_array).each((index, item) => {
                    if (item.Id === id)
                        majors_array.splice(index, 1);
                });
                setJobOfferMajors(majors_array);
            })
            .catch(function (error) {
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i], '', 1000);
                        }
                    });

                } else if (error.response.data.message != null && error.response.data.message != undefined) {
                    NotificationManager.error(error.response.data.message, '', 1000);
                } else {
                    NotificationManager.error(error.response.data.Message, '', 1000);

                }
            });

    }

    const onAddSkill = () => {
        let axios = require('axios');

        let skill = $("#skill_input").val();
        let engSkill = $("#eng_skill_input").val();

        let data = {
            "id": jobOfferId,
            "roleId": 8,
            "roleAccountId": companyId,
            "areaOfInterestPersianString": skill,
            "areaOfInterestEnglishString": engSkill,
            "isSoftware": isSoftware
        }
        let config = {
            method: 'post',
            url: generateURL("/JobOffer/AddSkillInfo"),
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(data)
        };
        axios(config)
            .then(function (response) {

                let skills_array = [...skills];
                let data = response.data.data;
                let skill;
                if (data.areaOfInterestPersian === null && data.areaOfInterestEnglish.isSoftWare) {
                    skill = {
                        AreaOfInterestEnglish: {
                            Id: data.areaOfInterestEnglish.id,
                            IsSoftWare: true,
                            Name: data.areaOfInterestEnglish.name
                        },
                        AreaOfInterestPersian: null
                    }
                } //end if
                else {
                    skill = {
                        AreaOfInterestEnglish: {
                            Id: data.areaOfInterestEnglish.id,
                            IsSoftWare: data.areaOfInterestEnglish.IsSoftWare,
                            Name: data.areaOfInterestEnglish.name
                        },
                        AreaOfInterestPersian: {
                            Id: data.areaOfInterestPersian.id,
                            IsSoftWare: data.areaOfInterestPersian.IsSoftWare,
                            Name: data.areaOfInterestPersian.name
                        }
                    }
                } //end else
                skills_array.push(skill);
                setSkills(skills_array);

                $("#skill_input").val("");
                $("#eng_skill_input").val("");
            })
            .catch(function (error) {
                let errors;
                if(error.response !== undefined) {
                    errors = error.response.data.errors;
                    if (errors != null) {
                        Object.keys(errors).map((key, i) => {
                            for (var i = 0; i < errors[key].length; i++) {
                                NotificationManager.error(errors[key][i], '', 1000);
                            }
                        });

                    } else if (error.response.data.message != null && error.response.data.message != undefined) {
                        NotificationManager.error(error.response.data.message, '', 1000);
                    } else {
                        NotificationManager.error(error.response.data.Message, '', 1000);

                    }
                }

            });
    }

    const onRemoveSkill = (id) => {

        let data = {
            "id": id,
            "role": 8,
            "roleAccountId": companyId,
            "roleId": 8
        }
        let axios = require('axios');
        let config = {
            method: 'post',
            url: generateURL("/JobOffer/RemoveSkillInfo"),
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(data)
        };
        axios(config)
            .then(function (response) {
                let skills_array = [...skills];
                $(skills_array).each((index, item) => {
                    if (item.Id === id)
                        skills_array.splice(index, 1);
                });
                setSkills(skills_array);
            })
            .catch(function (error) {
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i], '', 1000);
                        }
                    });

                } else if (error.response.data.message != null && error.response.data.message != undefined) {
                    NotificationManager.error(error.response.data.message, '', 1000);
                } else {
                    NotificationManager.error(error.response.data.Message, '', 1000);

                }
            });

    }

    useEffect(function (){

        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);
        setCompanyId(parseInt(url.company));
        setJobOfferId(parseInt(url.joboffer));

        let axios = require('axios');
        axios.defaults.withCredentials = true;


        /************** Category List *************/
        let category_config = {
            method: 'get',
            url: generateURL("/Side/GetJobCategoryList"),
            headers: {}
        };
        axios(category_config)
            .then(function (response) {

                setCategories(response.data.data);
            })
            .catch(function (error) {
            });

        /************** Province List *************/
        let province_config = {
            method: 'get',
            url: generateURL("/SideArray/GetProvinceList"),
            headers: {}
        };
        axios(province_config)
            .then(function (response) {

                setProvinces(response.data.data);
            })
            .catch(function (error) {
            });

        /************* genderList *************/
        let gender_config = {
            method: 'get',
            url: generateURL("/SideArray/GetGenderList"),
            headers: {}
        };
        axios(gender_config)
            .then(function (response) {
                setGenders(response.data.data);
            })
            .catch(function (error) {
            });

        /************* salary status *************/
        let salary_config = {
            method: 'get',
            url: generateURL("/SideArray/GetSalaryStatusList"),
            headers: {}
        };
        axios(salary_config)
            .then(function (response) {
                setSalaries(response.data.data);
            })
            .catch(function (error) {
            });

        /************* min experience status *************/
        let experience_config = {
            method: 'get',
            url: generateURL("/SideArray/GetMinExperienceList"),
            headers: {}
        };
        axios(experience_config)
            .then(function (response) {
                setExperiences(response.data.data);
            })
            .catch(function (error) {
            });

        /************* degree list  *************/
        let degree_config = {
            method: 'get',
            url: generateURL("/Side/GetDegreeList"),
            headers: {}
        };
        axios(degree_config)
            .then(function (response) {
                setDegrees(response.data.data);
            })
            .catch(function (error) {
            });

        /************* military status *************/
        let military_config = {
            method: 'get',
            url: generateURL("/SideArray/GetMiltaryStatusList"),
            headers: {}
        };
        axios(military_config)
            .then(function (response) {
                setMilitaries(response.data.data);
            })
            .catch(function (error) {
            });

        /************* major list *************/
        let major_config = {
            method: 'get',
            url: generateURL("/Side/GetMajorList"),
            headers: {}
        };
        axios(major_config)
            .then(function (response) {
                setMajors(response.data.data);
            })
            .catch(function (error) {
            });

        /************* Job Offer data *************/
        let jobOfferData = {
            "id": parseInt(url.joboffer),
            "roleId": 8,
            "roleAccountId": parseInt(url.company),
            "owner": "Company",
            "logoPicDetail": {
                "heights": [
                    200
                ],
                "widths": [
                    200
                ],
                "qualities": [
                    90
                ]
            },
            "mainPicDetail": {
                "heights": [
                    200
                ],
                "widths": [
                    200
                ],
                "qualities": [
                    90
                ]
            }
        }
        let jobOffer_config = {
            method: 'post',
            url: generateURL("/JobOffer/GetJobOfferSinglePanelSide"),
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(jobOfferData)
        };
        axios(jobOffer_config)
            .then(function (response) {
                let data = response.data.data.jobOffer;
                console.log(response.data.data)

                /** set default skills */
                if (data.skillsJson !== null && data.skillsJson !== ""){
                    let skills_json = JSON.parse(data.skillsJson);
                    setSkills(skills_json);
                }

                /** set default majors*/
                if (data.majorsJson !== null && data.majorsJson !== ""){
                    let majors_json = JSON.parse(data.majorsJson);
                    setJobOfferMajors(majors_json);
                }

                setTitle(data.title);
                setTitleEng(data.titleEnglish);
                let category_json = JSON.parse(data.categoryJson)
                setCategory(parseInt(category_json.Id));
                setDescription(data.description);
                setEngDescription(data.descriptionEnglish);
                setWebsite(data.websiteLink);
                setExperience(); //TODO
                setMilitary(); //TODO
                setMilitary(); //TODO

                //TODO
            })
            .catch(function (error) {
                console.log(error)
                // let errors = error.response.data.errors;
                // if (errors != null) {
                //     Object.keys(errors).map((key, i) => {
                //         for (var i = 0; i < errors[key].length; i++) {
                //             NotificationManager.error(errors[key][i], '', 1000);
                //         }
                //     });
                //
                // } else if (error.response.data.message != null && error.response.data.message != undefined) {
                //     NotificationManager.error(error.response.data.message, '', 1000);
                // } else {
                //     NotificationManager.error(error.response.data.Message, '', 1000);
                //
                // }
            });

    }, []);

    return (
        <div>
            <h5 className={'change-text'}>ثبت آگهی جدید</h5>
            <div className={'row mx-0 w-100 mb-3 px-0'}>
                <div className={'col-12 mt-4'}>
                    <label className={'change-text d-block'}>عنوان آگهی (فارسی)</label>
                    <input type={"text"} className={'form-control'} id={'title_input'} defaultValue={title}/>
                </div>
                <div className={'col-12 mt-4'}>
                    <label className={'change-text d-block'}>عنوان آگهی (انگلیسی)</label>
                    <input type={"text"} className={'form-control'} id={'english_title_input'} defaultValue={titleEng}/>
                </div>
                <div className={'col-12 mt-4'}>
                    <label className={'change-text d-block'}>دسته‌بندی آگهی</label>
                    <select id={'category_select'} className="form-control">
                        <option disabled={true} >انتخاب...</option>
                        {
                            categories.map((item)=>(
                                <option value={item.id} selected={item.id===category}>{language==='fa'?item.name:item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12 mt-4'}>
                    <label className={'change-text d-block'}>توضیح کامل (فارسی)</label>
                    <CKEditor
                        config={ {
                            language:'ar'
                        } }
                        editor={ ClassicEditor }
                        data=""
                        onChange={ ( event, editor ) => {
                            setDescription(editor.getData())
                        } }
                    />
                </div>
                <div className={'col-12 mt-4'}>
                    <label className={'change-text d-block'}>توضیح کامل (انگلیسی)</label>
                    <CKEditor
                        config={ {
                            // language:'ar'
                        } }
                        editor={ ClassicEditor }
                        data=""
                        onChange={ ( event, editor ) => {
                            setEngDescription(editor.getData())
                        } }
                    />
                </div>
                <div className={'col-12 col-xl-6 mt-4'}>
                    <label className={'change-text d-block'}>آدرس وبسایت</label>
                    <input type={"text"} className={'form-control'} id={'english_description_input'}/>
                </div>
                <div className={'col-12 col-xl-6 mt-4'}>
                    <label className={'change-text d-block'}>حداقل سابقه کاری مورد نیاز</label>
                    <select id={'category_select'} className="form-control">
                        <option>مهم نیست</option>
                        {
                            experiences.map((item)=>(
                                <option value={item.id}>{language==='fa'?item.name:item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12 col-xl-6 mt-4'}>
                    <label className={'change-text d-block'}>استان</label>
                    <select id={'province_select'} className="form-control" onChange={onSelectProvince}>
                        <option disabled={true} >انتخاب...</option>
                        {
                            provinces.map((item)=>(
                                <option value={item.id}>{language==='fa'?item.name:item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12 col-xl-6 mt-4'}>
                    <label className={'change-text d-block'}>شهر</label>
                    <select id={'category_select'} className="form-control">
                        <option disabled={true} >انتخاب...</option>
                        {
                            cities.map((item)=>(
                                <option value={item.id}>{language==='fa'?item.name:item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12 col-xl-6 mt-4'}>
                    <label className={'change-text d-block'}>وضعیت نظام وظیفه</label>
                    <select id={'category_select'} className="form-control">
                        <option>مهم نیست</option>
                        {
                            militaries.map((item)=>(
                                <option value={item.id}>{language==='fa'?item.name:item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12 col-xl-6 mt-4'}>
                    <label className={'change-text d-block'}>مقطع</label>
                    <select id={'category_select'} className="form-control">
                        <option>مهم نیست</option>
                        {
                            degrees.map((item)=>(
                                <option value={item.id}>{language==='fa'?item.name:item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12 col-xl-6 mt-4'}>
                    <label className={'change-text d-block'}>جنسیت</label>
                    <select id={'category_select'} className="form-control">
                        <option>مهم نیست</option>
                        {
                            genders.map((item)=>(
                                <option value={item.id}>{language==='fa'?item.name:item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12 col-xl-6 mt-4'}>
                    <label className={'change-text d-block'}>وضعیت حقوق</label>
                    <select id={'category_select'} className="form-control">
                        {
                            salaries.map((item)=>(
                                <option value={item.id}>{language==='fa'?item.name:item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <hr/>
            <div className={"mt-4"}>
                <Accordion allowZeroExpanded>
                    <AccordionItem >
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <h6 className={'change-text change-dir'}>
                                    <span>مهارت‌های مورد نیاز</span>
                                    <i className={'bi bi-caret-down-fill'}></i>
                                </h6>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className={"  px-3 w-100 "}>
                                {
                                    language === 'fa' ?
                                            <div className={"w-100 d-flex row"}>
                                                {
                                                    skills.map((item) => (
                                                        <div className={Style.skillTag + " px-3 mx-2 my-2"}>
                                                            <span>{
                                                                item.AreaOfInterestEnglish !== null && item.AreaOfInterestEnglish.IsSoftWare ?
                                                                    item.AreaOfInterestEnglish.Name : item.AreaOfInterestPersian.Name
                                                            }</span>
                                                            <span>
                                                        <button className={'btn '} onClick={()=> {onRemoveSkill(item.Id)}}><i className={'bi bi-x-lg'}></i></button>
                                                    </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        :
                                        <div className={"w-100 d-flex row"}>
                                            {
                                                skills.map((item) => (
                                                    item.AreaOfInterestEnglish !== null &&
                                                    <div className={Style.skillTag + " px-3 mx-2 my-2"}>
                                                        <span>{item.AreaOfInterestEnglish.Name}</span>
                                                        <span>
                                                        <button className={'btn '} onClick={()=> {onRemoveSkill(item.Id)}}><i className={'bi bi-x-lg'}></i></button>
                                                    </span>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                }

                            </div>
                            <div className={"row mx-0 w-100 px-2 pt-3"}>
                                <div className={'col-12 mt-2 change-text change-dir py-2 px-0'}>
                                    {isSoftware ?
                                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                                onClick={() => {
                                                    setIsSoftware(false)
                                                }}><i className="fas fa-toggle-on"></i></button>:
                                        <button className={"mx-3 btn text-white btn-secondary "  }
                                                onClick={() => {
                                                    setIsSoftware(true)
                                                }}><i className="fas fa-toggle-on"></i></button>}

                                    <label>مربوط به حوزه برنامه نویسی</label>
                                </div>
                                {
                                    !isSoftware &&
                                    <div className={"col-12 col-xl-5 mt-2"}>
                                        <label className={Style.skillFieldLabel+ " change-text"}>عنوان فارسی</label>
                                        <input className={'form-control'} type={"text"} id={"skill_input"}/>
                                    </div>
                                }
                                <div className={"col-12 col-xl-5 mt-2"}>
                                    <label className={Style.skillFieldLabel+ " change-text"}>عنوان انگلیسی</label>
                                    <input className={'form-control text-left'} type={"text"} id={"eng_skill_input"}/>
                                </div>
                                <div className={"mt-3 col-6 col-xl-2"}>
                                    <button className={Style.addSkillBtn + " w-100 py-2 mt-4"} onClick={onAddSkill}>افزودن مهارت</button>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
            <hr/>
            <div className={"mt-4"}>
                <Accordion allowZeroExpanded>
                    <AccordionItem >
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <h6 className={'change-text change-dir'}>
                                    <span>رشته تحصیلی</span>
                                    <i className={'bi bi-caret-down-fill'}></i>
                                </h6>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className={"  px-3 w-100 "}>
                                {
                                    language === 'fa' ?
                                        <div className={"w-100 d-flex row"}>
                                            {
                                                jobOfferMajors.map((item) => (
                                                    <div className={Style.skillTag + " px-3 mx-2 my-2"}>
                                                            <span>{
                                                                item.Major.Name
                                                            }</span>
                                                        <span>
                                                        <button className={'btn '} onClick={()=> {onRemoveMajor(item.Id)}}><i className={'bi bi-x-lg'}></i></button>
                                                    </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        :
                                        <div className={"w-100 d-flex row"}>
                                            {
                                                jobOfferMajors.map((item) => (
                                                    item.AreaOfInterestEnglish !== null &&
                                                    <div className={Style.skillTag + " px-3 mx-2 my-2"}>
                                                        <span>{item.Major.Name}</span>
                                                        <span>
                                                        <button onClick={()=> {onRemoveMajor(item.Id)}} className={'btn '}><i className={'bi bi-x-lg'}></i></button>
                                                    </span>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                }

                            </div>
                            <div className={"row mx-0 w-100 px-2 pt-3"}>
                                <div className={"col-12 col-xl-6 mt-2"}>
                                    <select className={'form-control'}id={"major_select"}>
                                        <option disabled={true} selected={true} id={"none_major"}>انتخاب رشته... </option>

                                        {majors.map((item)=> (
                                            <option value={item.id}>{item.name}</option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div className={"mt-3 col-6 col-xl-2"}>
                                    <button className={Style.addSkillBtn + " w-100 py-2"} onClick={onAddMajor}>افزودن رشته</button>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
            <hr/>
            <h6 className={'change-text'}>نوع همکاری</h6>
            <div className={'row w-100 mx-0 change-dir change-text mt-4'}>
                <div className={'col-12 col-xl-4 mt-2'}>
                    {isFullTime ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn}
                                onClick={() => {
                                    setIsFullTime(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary"  }
                                onClick={() => {
                                    setIsFullTime(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>تمام وقت</label>
                </div>
                <div className={'col-12 col-xl-4 mt-2'}>
                    {isPartTime ?
                        <button className={"mx-3 btn text-white  "  + Style.toggleBtn}
                                onClick={() => {
                                    setIsPartTime(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary " }
                                onClick={() => {
                                    setIsPartTime(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>پاره وقت</label>
                </div>
                <div className={'col-12 col-xl-4 mt-2'}>
                    {isRemote ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setIsRemote(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setIsRemote(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>امکان دورکاری</label>
                </div>
                <div className={'col-12 col-xl-4 mt-2'}>
                    {isInternship ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setIsInternship(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setIsInternship(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>کاراموزی</label>
                </div>
            </div>
            <hr/>
            <h6 className={'change-text'}>مزایای کاری</h6>
            <div className={'row w-100 mx-0 change-dir change-text mt-4'}>
                <div className={'col-12 col-xl-4 mt-2'}>
                    {isPromotionPossible ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setIsPromotionPossible(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setIsPromotionPossible(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>امکان ترفیع شغلی</label>
                </div>
                <div className={'col-12 col-xl-4 mt-2'}>
                    {isInsurancePossible ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setIsInsurancePossible(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setIsInsurancePossible(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>بیمه</label>
                </div>
                <div className={'col-12 col-xl-4 mt-2'}>
                    {isCoursePossible ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setIsCoursePossible(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setIsCoursePossible(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>امکان برگزاری دوره</label>
                </div>
                <div className={'col-12 col-xl-4 mt-2'}>
                    {isFlexibleWorkTimePossible ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setIsFlexibleWorkTimePossible(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setIsFlexibleWorkTimePossible(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>زمان کاری منعطف</label>
                </div>
                <div className={'col-12 col-xl-4 mt-2'}>
                    {isCommutingServicePossible ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setIsCommutingServicePossible(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setIsCommutingServicePossible(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>سرویس رفت و آمد رایگان</label>
                </div>
                <div className={'col-12 col-xl-4 mt-2'}>
                    {isFreeFoodPossible ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setIsFreeFoodPossible(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setIsFreeFoodPossible(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>غدا با شرکت</label>
                </div>
            </div>
            <div className={'d-flex justify-content-center mt-4'}>
                {/*<button className={'btn btn-success py-2 px-5'} onClick={onSubmit}>مرحله بعد</button>*/}
            </div>

            <NotificationContainer/>
        </div>
    )

}