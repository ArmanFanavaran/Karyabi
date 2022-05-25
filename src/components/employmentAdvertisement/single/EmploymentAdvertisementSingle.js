import {useEffect, useState} from 'react';
import queryString from "query-string";


import Style from "./employmentAdvertisementSingle.module.css";
import {generateURL} from "../../global/Requests";
import HtmlComponent from "../../global/EditorToHTML";
import CloseIcon from "../imgs/cancel.png";
import {Link, useHistory} from "react-router-dom";
import * as $ from 'jquery';
import {isAccessTokenExpired} from "../../authentication/Helper/Auth";
import {RatingStar} from "rating-star";
import Modal from "react-modal";
import * as React from "react";
import {getResumeTemplates} from "../../global/resume/ResumeTemplates";
import {getResumeColors} from "../../global/resume/ResumeColors";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useTranslation} from "react-i18next";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import {getRoutesItems} from "../../RoutesList/RoutesList";




export default function EmploymentAdvertisementSingle() {
    const history = useHistory();
    const [t, i18n] = useTranslation('main');

    const [accessExpire, setAccessExpire] = useState();


    const [language, setLanguage] = useState();
    const [companyName, setCompanyName] = useState({fa: "", eng:""});
    const [companyShortDesc, setCompanyShortDesc] = useState({fa: "", eng:""});
    const [companyLogo, setCompanyLogo] = useState("");
    const [companyDescription, setCompanyDescription] = useState({fa: "", eng:""});
    const [jobCapacity, setJobCapacity] = useState();
    const [websiteLink, setWebSiteLink] = useState();
    const [jobTitle, setJobTitle] = useState({fa: "", eng:""});
    const [jobCategory, setJobCategory] = useState({fa: "", eng:""});
    const [jobLocation, setJobLocation] = useState({fa: "", eng:""});
    const [jobSalary, setJobSalary] = useState({fa: "", eng:""});
    const [jobDescription, setJobDescription] = useState({fa: "", eng:""});
    const [jobSkills, setJobSkills] = useState([]);
    const [gender, setGender] = useState({fa: "", eng:""});
    const [advertisementId, setAdvertisementId] = useState();
    const [militaryStatus, setMilitaryStatus] = useState([]);
    const [advantages, setAdvantages] = useState([]);
    const [cooperationTypes, setCooperationTypes] = useState([]);


    /* Modal */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(0);
    const [myResumes, setMyResumes] = useState([]);
    const [resumeId, setResumeId] = useState();
    const [templateId, setTemplateId] = useState();
    const [colorId, setColorId] = useState();
    const [resumeCatId, setResumeCatId] = useState();
    const resumeTemplates = getResumeTemplates();
    const resumeColors = getResumeColors();
    const modalStyle = {
        content: {
            direction: "rtl",
            top: '56%',
            left: '50%',
            width: '90%',
            maxWidth: '700px',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            zIndex: '1',
            borderRadius: '15px',
            padding: '20px',
            // marginTop:'30px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#6969dd #e0e0e0',
            maxHeight: '85vh',
            transform: 'translate(-50%, -50%)',
        }

    }

    const onOpenModal = () => {
        setIsModalOpen(true);
        if (accessExpire) {
            var axios = require('axios');
            axios.defaults.withCredentials = true;
            var config_resume_list = {
                method: 'post',
                url: generateURL("/Resume/GetMyResumeList"),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {}
            };
            axios(config_resume_list)
                .then(function (response) {
                    let resume_array = [];
                    $(response.data.data).each(function (index, item) {
                        resume_array.push(item);
                    });
                    setMyResumes(resume_array);
                    console.log(response.data.data)

                })
                .catch(function (error) {
                    console.log(error);
                });

        }

    }

    const onCloseModal = () => {
        setIsModalOpen(false)
    }

    const onselectResume = (e) => {
        setResumeId(parseInt(e.target.value));
        $("#step0_submit").addClass("d-block");
        $("#step0_submit").removeClass("d-none");
    }

    const onTemplateSelect = (category, template) => {
        setTemplateId(template);
        setResumeCatId(category);
        $("#step1_submit").addClass("d-block");
        $("#step1_submit").removeClass("d-none");
    }

    const onColorSelect = (id) => {
        setColorId(id);
        console.log(id)

        $("#step2_submit").addClass("d-block");
        $("#step2_submit").removeClass("d-none");

    }

    const submitModal = () => {
        let description = $("#resume_description").val();
        console.log(description)
        var axios = require('axios');
        axios.defaults.withCredentials = true;
        let data = {
            "id": advertisementId,
            "resumeId": resumeId,
            "designId": templateId,
            "colorId": colorId,
            "resumeCatId": resumeCatId,
            "description": description
        }
        let config = {
            method: 'post',
            url: generateURL("/JobOfferRequest/addJobOfferRequest"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
        };
        console.log(data)
        axios(config).then(function (response) {
            console.log(response.data)
            NotificationManager.success(response.data.message);
            setIsModalOpen(false);
            setModalStep(0);
            $("#step0_submit").addClass("d-none");
            $("#step0_submit").removeClass("d-block");
            $("#step1_submit").addClass("d-none");
            $("#step1_submit").removeClass("d-block");
            $("#step2_submit").addClass("d-none");
            $("#step2_submit").removeClass("d-block");

            NotificationManager.success(response.data.message, "", 2000);

            history.push(getRoutesItems().sentResumes.route + "/");


        }).catch(function (error) {
            console.log(error);
            setIsModalOpen(false);
            let errors = error.response.data.errors;
            if (errors != null) {
                Object.keys(errors).map((key, i) => {
                    for (var i = 0; i < errors[key].length; i++) {
                        NotificationManager.error(errors[key][i], "", 2000);
                    }
                });

            } else if (error.response.data.message != null && error.response.data.message != undefined) {
                NotificationManager.error(error.response.data.message , "", 2000);
            } else {
                NotificationManager.error(error.response.data.Message, "", 2000);
                history.push(getRoutesItems().sentResumes.route + "/")

            }
        });
    }



    useEffect(function () {

        const url = queryString.parse(window.location.search);
        const id = parseInt(url.id);
        setAdvertisementId(id);
        setLanguage(url.lang)
        var axios = require('axios');
        var config_data = JSON.stringify({
            "id": id,
            "roleId": 8,
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
        });

        var config = {
            method: 'post',
            url: generateURL("/JobOffer/GetJobOfferSingleClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : config_data
        };
        console.log(config_data)

        axios(config)
            .then(function (response) {
                let data = response.data.data;
                console.log(data);
                // setJobOffer(data.jobOffer)
                setCompanyName({fa:data.company.name, eng:data.company.englishName});
                setCompanyDescription({fa:data.company.introduction, eng:data.company.introductionEnglish});
                setCompanyShortDesc({fa:data.company.companyCategory.name, eng:data.company.companyCategory.englishName});
                setJobCapacity(data.company.minMemberCount + "-" + data.company.maxMemberCount);
                setWebSiteLink(data.jobOffer.websiteLink);
                setCompanyLogo(data.company.logo);
                setJobTitle({fa:data.jobOffer.title, eng:data.jobOffer.titleEnglish});
                let category = JSON.parse(data.jobOffer.categoryJson);
                setJobCategory({fa:category.Name, eng:category.EnglishName});
                let city = JSON.parse(data.jobOffer.cityJson);
                let province = JSON.parse(data.jobOffer.provinceJson);
                setJobLocation({
                    fa: city.name + " / " + province.name,
                    eng: province.englishName + " / " + city.englishName,
                });
                let salary = JSON.parse(data.jobOffer.salaryStatusJson)
                setJobSalary({fa:salary.name, eng:salary.englishName});

                setJobDescription({fa:data.jobOffer.description, eng:data.jobOffer.descriptionEnglish});
                let gender_data = JSON.parse(data.jobOffer.genderJson);
                setGender({fa:gender_data.name, eng:gender_data.englishName});

                let skills = JSON.parse(data.jobOffer.skillsJson);
                let skills_array = [];
                $(skills).each(function (i, item) {
                    skills_array.push({fa:item.AreaOfInterestPersian.Name, eng:item.AreaOfInterestEnglish.Name});
                })
                setJobSkills(skills_array);

                let military_array = [];
                if (data.jobOffer.miltaryStatus1Json !== "")
                    military_array.push(JSON.parse(data.jobOffer.miltaryStatus1Json));
                if (data.jobOffer.miltaryStatus2Json !== "")
                    military_array.push(JSON.parse(data.jobOffer.miltaryStatus2Json));
                if (data.jobOffer.miltaryStatus3Json !== "")
                    military_array.push(JSON.parse(data.jobOffer.miltaryStatus3Json));
                setMilitaryStatus(military_array);

                let advantages_array = [];
                if (data.jobOffer.isPromotionPossible)
                    advantages_array.push({fa:"امکان ترفیع شغلی", eng:"Promotion possible"});
                if (data.jobOffer.isInsurancePossible)
                    advantages_array.push({fa:"بیمه", eng:"Insurance possible"});
                if (data.jobOffer.isCoursePossible)
                    advantages_array.push({fa:"برگزاری دوره", eng:"Courses"});
                if (data.jobOffer.isFlexibleWorkTimePossible)
                    advantages_array.push({fa:"زمان کاری منعطف", eng:"Flexible work time"});
                if (data.jobOffer.isCommutingServicePossible)
                    advantages_array.push({fa:"سرویس رفت و آمد رایگان", eng:"Shuttle service"});
                if (data.jobOffer.isFreeFoodPossible)
                    advantages_array.push({fa:"غدا با شرکت", eng:"Free Meal"});
                setAdvantages(advantages_array);

                let cooperation_array = [];
                if (data.jobOffer.isFullTime)
                    cooperation_array.push({fa:"تمام وقت", eng:"Full Time"});
                if (data.jobOffer.isPartTime)
                    cooperation_array.push({fa:"پاره وقت", eng:"Part Time"});
                if (data.jobOffer.isRemote)
                    cooperation_array.push({fa:"دورکاری", eng:"Remote"});
                if (data.jobOffer.isInternship)
                    cooperation_array.push({fa:"کاراموزی", eng:"Internship"});
                setCooperationTypes(cooperation_array)

            })
            .catch(function (error) {
                console.log(error);
            });

        setAccessExpire(!isAccessTokenExpired())

    }, []);

    return (
        <main className={Style.main}>
            <div className="w-100 mb-5 pt-3">

                <div className={"container"}>
                    <div className={"row justify-content-center change-dir"}>
                        <div className={"col-7 col-xl-2 justify-content-center d-flex"}>
                            <img className={Style.companyImg  + " mx-auto"} src={companyLogo}/>
                        </div>
                        <div className={"col-xl-10 col-12"}>
                            <div className={"w-100"}>
                                <h3 className={"mt-2 text-sm-center display-block change-text pt-3"}>{language === 'fa' ?companyName.fa : companyName.eng} </h3>
                                <div className={"d-flex w-100 pt-2 row justify-content-center justify-content-xl-start"}>
                                    <h6 className={"mx-2"}>{language ==='fa'? companyShortDesc.fa : companyShortDesc.eng}</h6>
                                    <div className={ " mx-2"}>{jobCapacity} {t("employmentAdvertisement.single.person")} </div>
                                    <a className={ " mx-2"} href={"#"}>{websiteLink}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"container w-100 mt-4"}>
                    <div className={"row w-100 change-dir change-text mx-0"}>
                        <div className={ " col-12 col-xl-8 p-2"}>
                            <div className={Style.hero + " p-4"}>
                                <h4 className={Style.jobTitle + " d-block change-text"}>{language ==='fa'? jobTitle.fa : jobTitle.eng}</h4>
                                <hr/>
                                <div className={"row"}>
                                    <div className={"col-6 mt-4"}>
                                        <div className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.jobCategory")}</div>
                                        <div className={Style.jobField + " mt-2"}>{language ==='fa'? jobCategory.fa : jobCategory.eng}</div>
                                    </div>
                                    <div className={"col-6  mt-4"}>
                                        <div className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.location")}</div>
                                        <div className={Style.jobField + " mt-2"}>{language ==='fa'? jobLocation.fa : jobLocation.eng}</div>
                                    </div>
                                    <div className={"col-6  mt-4"}>
                                        <div className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.militaryStatus")}</div>
                                        <div className={"d-flex row w-100 mx-0"}>
                                            {
                                                militaryStatus.length > 0 && militaryStatus.map((item, index) => (
                                                    <div className={Style.jobField + " mt-2 mx-1"}>{language ==='fa'? item.name : item.englishName}</div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={"col-6  mt-4"}>
                                        <div className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.cooperationType")}</div>
                                        <div className={"d-flex row w-100 mx-0"}>
                                            {
                                                cooperationTypes.length > 0 && cooperationTypes.map((item, index) => (
                                                    <div className={Style.jobField + " mt-2 mx-1"}>{language ==='fa'? item.fa : item.eng}</div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={"col-6  mt-4"}>
                                        <div className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.salary")}</div>
                                        <div className={Style.jobField + " mt-2"}>{language ==='fa'? jobSalary.fa : jobSalary.eng}</div>
                                    </div>
                                </div>
                                <h5 className={"mt-5"}>{t("employmentAdvertisement.single.jobDescription")}</h5>
                                <HtmlComponent className={Style.jobDesc + " mt-4"} val={language ==='fa'? jobDescription.fa : jobDescription.eng}/>

                                <div className={"col-12  mt-4 px-0"}>
                                    {advantages.length > 0 && <h5>{t("employmentAdvertisement.single.advantages")}</h5>}
                                    <div className={"d-flex row w-100 mx-0"}>
                                        {
                                            advantages.length > 0 && advantages.map((item, index) => (
                                                <div className={Style.jobField + " mt-2 mx-1"}>{language ==='fa'? item.fa : item.eng}</div>
                                            ))
                                        }

                                    </div>
                                </div>

                                <h5 className={"mt-5"}>{t("employmentAdvertisement.single.companyIntroduction")}</h5>
                                <HtmlComponent className={Style.jobDesc + " mt-4"} val={language ==='fa'? companyDescription.fa : companyDescription.eng}/>

                                <div className={"row"}>
                                    <div className={"col-6 mt-4"}>
                                        <div className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.neededSkills")}</div>
                                        <div className={"d-flex row"}>
                                            {
                                                jobSkills.length > 0 && jobSkills.map((item, index) => (
                                                    <div className={Style.jobField + " mt-2 mx-1"}>{language ==='fa'? item.fa : item.eng}</div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                    <div className={"col-6  mt-4"}>
                                        <div className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.gender")}</div>
                                        <div className={Style.jobField + " mt-2"}>{language ==='fa'? gender.fa : gender.eng}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={ " col-12 col-xl-4 p-2"}>
                            <div className={"card w-100 p-4 " + Style.modalParent}>
                                <h5 className={"text-center "}>{t("employmentAdvertisement.single.joinNow")}</h5>
                                <button className={Style.shareResumeBtn + " py-2 mt-4"} onClick={onOpenModal}>{t("employmentAdvertisement.single.sendResume")}</button>
                                <Modal
                                    isOpen={isModalOpen}
                                    // onAfterOpen={afterOpenModal}
                                    // onRequestClose={closeModal}
                                    style={modalStyle}
                                    contentLabel="Example Modal"
                                >
                                    <div className="">
                                        <div className="modal-header ">
                                            <button type="button" className="close"
                                                    onClick={onCloseModal}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <h5 className="modal-title flex-grow-1 text-center pl-4" id="exampleModalLabel">ارسال رزومه</h5>

                                        </div>
                                        {
                                            accessExpire ?

                                                <div>
                                                    { modalStep === 0 &&
                                                    <div>
                                                        <div className="modal-body">
                                                            <h6 className={"text-right my-4"}>انتخاب رزومه</h6>
                                                            <select className={"form-control mb-4"} onChange={onselectResume}>
                                                                <option selected={true} disabled={true} >انتخاب ...</option>
                                                                {
                                                                    myResumes.length > 0 &&
                                                                    myResumes.map( (item, index) => (
                                                                        <option value={item.id}>{item.title}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-primary d-none"  id={"step0_submit"}
                                                                    onClick={() => {setModalStep(modalStep + 1);}}>مرحله بعد</button>
                                                        </div>
                                                    </div>}
                                                    { modalStep === 1 &&
                                                    <div>
                                                        <div className="modal-body">
                                                            <h6 className={"text-right my-4"}>انتخاب قالب</h6>

                                                            <div className={Style.templatesContainer}>
                                                                <Accordion allowZeroExpanded>
                                                                    {resumeTemplates.map((category) => (
                                                                        <AccordionItem key={category.id}>
                                                                            <AccordionItemHeading>
                                                                                <AccordionItemButton>
                                                                                    <h6 className={"change-text py-2 px-3 " + Style.categoryTitle}>{language === 'fa' ? category.categoryName  : category.categoryNameEng}</h6>
                                                                                </AccordionItemButton>
                                                                            </AccordionItemHeading>
                                                                            <AccordionItemPanel>
                                                                                <div className={"row w-100 mb-4"}>
                                                                                    {
                                                                                        category.templates.map((item, index) => (
                                                                                            <div
                                                                                                className={"col-12 col-xl-3 my-3"}>
                                                                                                <div>{category.id}</div>
                                                                                                <img
                                                                                                    id={"template_" + item.id}
                                                                                                    className={item.id === templateId ? Style.resumeTemplateImage + " " + Style.focusedTemplate : Style.resumeTemplateImage}
                                                                                                    onClick={() => {
                                                                                                        onTemplateSelect(category.id , item.id)
                                                                                                    }}/>
                                                                                            </div>
                                                                                        ))
                                                                                    }

                                                                                </div>
                                                                            </AccordionItemPanel>
                                                                        </AccordionItem>
                                                                    ))}
                                                                </Accordion>

                                                            </div>

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    data-dismiss="modal"
                                                                    onClick={function () {
                                                                        if (modalStep !== 0)
                                                                            setModalStep(modalStep-1)
                                                                    }}>قبلی
                                                            </button>
                                                            <button type="button" className="btn btn-primary d-none"  id={"step1_submit"}
                                                                    onClick={() => {setModalStep(modalStep + 1);}}>مرحله بعد</button>
                                                        </div>
                                                    </div>}
                                                    { modalStep === 2 &&
                                                    <div>
                                                        <div className="modal-body">
                                                            <h6 className={"text-right my-4"}>انتخاب رنگ</h6>
                                                            <div className={"row w-100"}>
                                                                {
                                                                    resumeColors.map((item, index) => (
                                                                        <div className={"col-6 col-xl-2 p-3"}>
                                                                            <div className={item.id === colorId? Style.focusedTemplate +" d-flex "+ Style.templateColorBarParent: "d-flex "+ Style.templateColorBarParent} onClick={()=> {onColorSelect(item.id)}}>
                                                                                <div className={"w-50 " + Style.templateColorBarRight} style={{backgroundColor: item.color1}}></div>
                                                                                <div className={"w-50 " + Style.templateColorBarLeft} style={{backgroundColor: item.color2}}></div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    data-dismiss="modal"
                                                                    onClick={function () {
                                                                        if (modalStep !== 0)
                                                                            setModalStep(modalStep-1)
                                                                    }}>قبلی
                                                            </button>
                                                            <button type="button" className="btn btn-primary d-none"  id={"step2_submit"}
                                                                    onClick={() => {setModalStep(modalStep + 1);}}>مرحله بعد</button>
                                                        </div>
                                                    </div>}
                                                    { modalStep === 3 &&
                                                    <div>
                                                        <div className="modal-body">
                                                            <h6 className={"text-right my-4"}>افزودن توضیحات</h6>
                                                            <textarea className={"form-control " + Style.resumeDescription} id={"resume_description"}></textarea>

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    data-dismiss="modal"
                                                                    onClick={function () {
                                                                        if (modalStep !== 0)
                                                                            setModalStep(modalStep-1)
                                                                    }}>قبلی
                                                            </button>
                                                            <button type="button" className="btn btn-primary"
                                                                    onClick={submitModal}>ارسال رزومه</button>
                                                        </div>
                                                    </div>}


                                                </div>

                                                :

                                                <div>
                                                    <div className="modal-body">
                                                        <p>همین حالا ثبت نام کنید</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary"
                                                                data-dismiss="modal">لغو
                                                        </button>
                                                        <Link to={getRoutesItems().loginStep1.route} className="btn btn-primary">‌ثبت نام</Link>
                                                    </div>
                                                </div>
                                        }
                                    </div>

                                </Modal>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <NotificationContainer/>

        </main>
    )
}