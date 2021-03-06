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
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";


export default function EmploymentAdvertisementSingle() {
    const history = useHistory();
    const [t, i18n] = useTranslation('main');

    const [accessExpire, setAccessExpire] = useState();


    const [language, setLanguage] = useState();
    const [companyName, setCompanyName] = useState({fa: "", eng: ""});
    const [companyShortDesc, setCompanyShortDesc] = useState({fa: "", eng: ""});
    const [companyLogo, setCompanyLogo] = useState("");
    const [companyDescription, setCompanyDescription] = useState({fa: "", eng: ""});
    const [jobCapacity, setJobCapacity] = useState();
    const [jobEmergency, setJobEmergency] = useState(false);
    const [websiteLink, setWebSiteLink] = useState();
    const [jobTitle, setJobTitle] = useState({fa: "", eng: ""});
    const [jobCategory, setJobCategory] = useState({fa: "", eng: ""});
    const [jobLocation, setJobLocation] = useState({fa: "", eng: ""});
    const [jobSalary, setJobSalary] = useState({fa: "", eng: ""});
    const [jobDescription, setJobDescription] = useState({fa: "", eng: ""});
    const [jobSkills, setJobSkills] = useState([]);
    const [jobExperience, setJobExperience] = useState();
    const [gender, setGender] = useState();
    const [advertisementId, setAdvertisementId] = useState();
    const [militaryStatus, setMilitaryStatus] = useState([]);
    const [advantages, setAdvantages] = useState([]);
    const [majors, setMajors] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [degree, setDegree] = useState();
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
            data: JSON.stringify(data)
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

            setTimeout(() => {
                history.push({
                    pathname: getRoutesItems().SentResumes.route,
                    search: "lang=" + language
                });
            });


        }).catch(function (error) {
            console.log(error);
            setIsModalOpen(false);
            if (error.response != null && error.response != undefined) {
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i], "", 2000);
                        }
                    });

                } else if (error.response.data.message != null && error.response.data.message != undefined) {
                    NotificationManager.error(error.response.data.message, "", 2000);
                } else {
                    NotificationManager.error(error.response.data.Message, "", 2000);
                    setTimeout(() => {
                        history.push({
                            pathname: getRoutesItems().SentResumes.route,
                            search: "lang=" + language
                        });
                    }, 2000);


                }
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
                    getSizeImageItems().companyLogo.Heights
                ],
                "widths": [
                    getSizeImageItems().companyLogo.Widths
                ],
                "qualities": [
                    getSizeImageItems().companyLogo.Qualities
                ]
            },
            "mainPicDetail": {
                "heights": [
                    getSizeImageItems().companyMainPic.Heights
                ],
                "widths": [
                    getSizeImageItems().companyMainPic.Widths
                ],
                "qualities": [
                    getSizeImageItems().companyMainPic.Qualities
                ]
            },
        });

        var config = {
            method: 'post',
            url: generateURL("/JobOffer/GetJobOfferSingleClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: config_data
        };
        console.log(config_data)

        axios(config)
            .then(function (response) {
                let data = response.data.data;
                console.log("data");
                console.log(data);
                // setJobOffer(data.jobOffer)
                setCompanyName({fa: data.company.name, eng: data.company.englishName});
                setCompanyDescription({fa: data.company.introduction, eng: data.company.introductionEnglish});
                setCompanyShortDesc({
                    fa: data.company.companyCategory.name,
                    eng: data.company.companyCategory.englishName
                });
                setJobCapacity(data.company.minMemberCount + "-" + data.company.maxMemberCount);
                setWebSiteLink(data.jobOffer.websiteLink);
                setCompanyLogo(data.company.logo);
                setJobEmergency(data.jobOffer.isEmergency);
                setJobTitle({fa: data.jobOffer.title, eng: data.jobOffer.titleEnglish});
                let category = JSON.parse(data.jobOffer.categoryJson);
                setJobCategory({fa: category.Name, eng: category.EnglishName});
                let city = JSON.parse(data.jobOffer.cityJson);
                let province = JSON.parse(data.jobOffer.provinceJson);
                setJobLocation({
                    fa: city.name + " / " + province.name,
                    eng: province.englishName + " / " + city.englishName,
                });
                let salary = JSON.parse(data.jobOffer.salaryStatusJson)
                setJobSalary({fa: salary.name, eng: salary.englishName});

                if (data.jobOffer.minExperienceJson !== null && data.jobOffer.minExperienceJson !== "") {
                    let min_experience = JSON.parse(data.jobOffer.minExperienceJson);
                    setJobExperience({fa: min_experience.name, eng: min_experience.englishName})
                }

                setJobDescription({fa: data.jobOffer.description, eng: data.jobOffer.descriptionEnglish});

                if (data.jobOffer.genderJson !== null && data.jobOffer.genderJson !== "") {
                    let gender_data = JSON.parse(data.jobOffer.genderJson);
                    setGender({fa: gender_data.name, eng: gender_data.englishName});
                }

                if (data.jobOffer.degreeJson !== null && data.jobOffer.degreeJson !== "") {
                    let degree_data = JSON.parse(data.jobOffer.degreeJson);
                    setDegree({fa: degree_data.Name, eng: degree_data.EnglishName});
                }

                let majors_data = JSON.parse(data.jobOffer.majorsJson);
                let majors_array = [];
                $(majors_data).each(function (i, item) {
                    majors_array.push({fa: item.Major.Name, eng: item.Major.EnglishName});
                })
                setMajors(majors_array);

                // let languages_data = JSON.parse(data.jobOffer.languagesJson);
                // let languages_array = [];
                // $(languages_data).each(function (i, item) {
                //     languages_array.push({fa: item.name, eng: item.englishName});
                // })
                // setLanguages(languages_array);


                let skills = JSON.parse(data.jobOffer.skillsJson);
                console.log("skills")
                console.log(skills)
                let skills_array = [];
                $(skills).each(function (i, item) {
                    if (item.AreaOfInterestPersian !== null)
                    skills_array.push({fa: item.AreaOfInterestPersian.Name, eng: item.AreaOfInterestEnglish.Name});
                    else
                        skills_array.push({fa: "", eng: item.AreaOfInterestEnglish.Name, isSoftware: item.AreaOfInterestEnglish.IsSoftWare});

                })
                setJobSkills(skills_array);
                console.log("skills")
                console.log(skills)

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
                    advantages_array.push({fa: "?????????? ?????????? ????????", eng: "Promotion possible"});
                if (data.jobOffer.isInsurancePossible)
                    advantages_array.push({fa: "????????", eng: "Insurance possible"});
                if (data.jobOffer.isCoursePossible)
                    advantages_array.push({fa: "?????????????? ????????", eng: "Courses"});
                if (data.jobOffer.isFlexibleWorkTimePossible)
                    advantages_array.push({fa: "???????? ???????? ??????????", eng: "Flexible work time"});
                if (data.jobOffer.isCommutingServicePossible)
                    advantages_array.push({fa: "?????????? ?????? ?? ?????? ????????????", eng: "Shuttle service"});
                if (data.jobOffer.isFreeFoodPossible)
                    advantages_array.push({fa: "?????? ???? ????????", eng: "Free Meal"});
                setAdvantages(advantages_array);

                let cooperation_array = [];
                if (data.jobOffer.isFullTime)
                    cooperation_array.push({fa: "???????? ??????", eng: "Full Time"});
                if (data.jobOffer.isPartTime)
                    cooperation_array.push({fa: "???????? ??????", eng: "Part Time"});
                if (data.jobOffer.isRemote)
                    cooperation_array.push({fa: "??????????????", eng: "Remote"});
                if (data.jobOffer.isInternship)
                    cooperation_array.push({fa: "????????????????", eng: "Internship"});
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
                            <img className={Style.companyImg + " mx-auto"} src={companyLogo}/>
                        </div>
                        <div className={"col-xl-10 col-12"}>

                            <div>
                                <div className={" pt-2 row  px-2"}>
                                    <div className={"w-100"}>
                                        <h3 className={"mt-2 text-sm-center display-block change-text pt-3 px-2 px-md-0"}>{language === 'fa' ? companyName.fa : companyName.eng} </h3>
                                        <div
                                            className={"d-flex w-100 pt-2 row justify-content-center justify-content-xl-start"}>
                                            <h6 className={"mx-2"}>{language === 'fa' ? companyShortDesc.fa : companyShortDesc.eng}</h6>
                                            <div
                                                className={" mx-2"}>{jobCapacity} {t("employmentAdvertisement.single.person")} </div>
                                            <Link className={" mx-2"} to={{pathname: "https://" + websiteLink}}
                                                  target={"_blank"}>{websiteLink}</Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"container w-100 mt-4"}>
                    <div className={"row w-100 change-dir change-text mx-0"}>
                        <div className={" col-12 col-xl-8 p-2"}>
                            <div className={Style.hero + " p-4"}>
                                <div className={'d-flex row w-100 mx-0 change-dir justify-content-between'}>
                                    <h4 className={Style.jobTitle + " change-text"}>{language === 'fa' ? jobTitle.fa : jobTitle.eng}</h4>
                                    {
                                        jobEmergency &&
                                        <div><span
                                            className={Style.listEmergency + " mx-2 "}>{t("employmentAdvertisement.list.emergency")}</span>
                                        </div>
                                    }
                                </div>
                                <hr/>
                                <div className={"row"}>
                                    <div className={"col-12 col-xl-6 mt-4"}>
                                        <div
                                            className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.jobCategory")}</div>
                                        <div
                                            className={Style.jobField + " mt-2"}>{language === 'fa' ? jobCategory.fa : jobCategory.eng}</div>
                                    </div>
                                    <div className={"col-12 col-xl-6  mt-4"}>
                                        <div
                                            className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.location")}</div>
                                        <div
                                            className={Style.jobField + " mt-2"}>{language === 'fa' ? jobLocation.fa : jobLocation.eng}</div>
                                    </div>
                                    <div className={"col-12 col-xl-6  mt-4"}>
                                        <div
                                            className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.militaryStatus")}</div>
                                        <div className={"d-flex row w-100 mx-0"}>
                                            {
                                                militaryStatus.length > 0 ? militaryStatus.map((item, index) => (
                                                        <div
                                                            className={Style.jobField + " mt-2 mx-1"}>{language === 'fa' ? item.name : item.englishName}</div>
                                                    )) :
                                                    <div
                                                        className={Style.jobField + " mt-2 mx-1"}>{t("employmentAdvertisement.single.notImportant")}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className={"col-12 col-xl-6  mt-4"}>
                                        <div
                                            className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.cooperationType")}</div>
                                        <div className={"d-flex row w-100 mx-0"}>
                                            {
                                                cooperationTypes.length > 0 ? cooperationTypes.map((item, index) => (
                                                    <div
                                                        className={Style.jobField + " mt-2 mx-1"}>{language === 'fa' ? item.fa : item.eng}</div>
                                                )) : <div
                                                    className={Style.jobField + " mt-2 mx-1"}>{t("employmentAdvertisement.single.notImportant")}</div>

                                            }
                                        </div>
                                    </div>
                                    <div className={"col-12 col-xl-6  mt-4"}>
                                        <div
                                            className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.salary")}</div>
                                        <div
                                            className={Style.jobField + " mt-2"}>{language === 'fa' ? jobSalary.fa : jobSalary.eng}</div>
                                    </div>
                                    <div className={"col-12 col-xl-6  mt-4"}>
                                        <div
                                            className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.experience")}</div>
                                        {
                                            jobExperience !== undefined ?
                                                <div
                                                    className={Style.jobField + " mt-2"}>{language === 'fa' ? jobExperience.fa : jobExperience.eng}</div> :
                                                <div
                                                    className={Style.jobField + " mt-2 mx-1"}>{t("employmentAdvertisement.single.notImportant")}</div>
                                        }

                                    </div>
                                </div>
                                <h5 className={"mt-5"}>{t("employmentAdvertisement.single.jobDescription")}</h5>
                                <HtmlComponent className={Style.jobDesc + " mt-4"}
                                               val={language === 'fa' ? jobDescription.fa : jobDescription.eng}/>

                                <div className={"col-12  mt-4 px-0"}>
                                    {advantages.length > 0 && <h5>{t("employmentAdvertisement.single.advantages")}</h5>}
                                    <div className={"d-flex row w-100 mx-0"}>
                                        {
                                            advantages.length > 0 && advantages.map((item, index) => (
                                                <div
                                                    className={Style.jobField + " mt-2 mx-1"}>{language === 'fa' ? item.fa : item.eng}</div>
                                            ))
                                        }

                                    </div>
                                </div>

                                <h5 className={"mt-5"}>{t("employmentAdvertisement.single.companyIntroduction")}</h5>
                                <HtmlComponent className={Style.jobDesc + " mt-4"}
                                               val={language === 'fa' ? companyDescription.fa : companyDescription.eng}/>

                                <div className={"row"}>
                                    <div className={"col-12 col-xl-6 mt-4"}>
                                        <div
                                            className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.neededSkills")}</div>
                                        <div className={"d-flex row mx-0"}>
                                            {
                                                jobSkills.length > 0 ? jobSkills.map((item, index) => (
                                                        <div>
                                                            {
                                                                item.isSoftware ?
                                                                    <div
                                                                        className={Style.jobField + " mt-2 mx-1"}>{item.eng}</div> :
                                                                    <div
                                                                        className={Style.jobField + " mt-2 mx-1"}>{language === 'fa'?item.fa:item.eng}</div>
                                                            }
                                                        </div>

                                                )) : <div
                                                    className={Style.jobField + " mt-2 mx-1"}>{t("employmentAdvertisement.single.notImportant")}</div>
                                            }

                                        </div>
                                    </div>
                                    <div className={"col-12 col-xl-6 mt-4"}>
                                        <div
                                            className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.degree")}</div>
                                        <div className={"d-flex row mx-0"}>
                                            {
                                                degree !== undefined ?
                                                    <div
                                                        className={Style.jobField + " mt-2"}>{language === 'fa' ? degree.fa : degree.eng}</div> :
                                                    <div
                                                        className={Style.jobField + " mt-2 mx-1"}>{t("employmentAdvertisement.single.notImportant")}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className={"col-12 col-xl-6 mt-4"}>
                                        <div
                                            className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.major")}</div>
                                        <div className={"d-flex row mx-0"}>
                                            {
                                                majors.length > 0 ? majors.map((item, index) => (
                                                    <div
                                                        className={Style.jobField + " mt-2 mx-1"}>{language === 'fa' ? item.fa : item.eng}</div>
                                                )) : <div
                                                    className={Style.jobField + " mt-2 mx-1"}>{t("employmentAdvertisement.single.notImportant")}</div>
                                            }

                                        </div>
                                    </div>
                                    <div className={"col-12 col-xl-6  mt-4"}>
                                        <div
                                            className={Style.jobFieldTitle}>{t("employmentAdvertisement.single.gender")}</div>
                                        {
                                            gender !== undefined ?
                                                <div
                                                    className={Style.jobField + " mt-2"}>{language === 'fa' ? gender.fa : gender.eng}</div> :
                                                <div
                                                    className={Style.jobField + " mt-2 mx-1"}>{t("employmentAdvertisement.single.notImportant")}</div>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={" col-12 col-xl-4 p-2"}>
                            <div className={"card w-100 p-4 " + Style.modalParent}>
                                <h5 className={"text-center "}>{t("employmentAdvertisement.single.joinNow")}</h5>
                                <button className={Style.shareResumeBtn + " py-2 mt-4"}
                                        onClick={onOpenModal}>{t("employmentAdvertisement.single.sendResume")}</button>
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
                                            <h5 className="modal-title flex-grow-1 text-center pl-4"
                                                id="exampleModalLabel">?????????? ??????????</h5>

                                        </div>
                                        {
                                            accessExpire ?

                                                <div>
                                                    {modalStep === 0 &&
                                                    <div>
                                                        <div className="modal-body">
                                                            <h6 className={"text-right my-4"}>???????????? ??????????</h6>
                                                            <select className={"form-control mb-4"}
                                                                    onChange={onselectResume}>
                                                                <option selected={true} disabled={true}>???????????? ...
                                                                </option>
                                                                {
                                                                    myResumes.length > 0 &&
                                                                    myResumes.map((item, index) => (
                                                                        <option value={item.id}>{item.title}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-primary d-none"
                                                                    id={"step0_submit"}
                                                                    onClick={() => {
                                                                        setModalStep(modalStep + 1);
                                                                    }}>?????????? ??????
                                                            </button>
                                                        </div>
                                                    </div>}
                                                    {modalStep === 1 &&
                                                    <div>
                                                        <div className="modal-body">
                                                            <h6 className={"text-right my-4"}>???????????? ????????</h6>

                                                            <div className={Style.templatesContainer}>
                                                                <Accordion allowZeroExpanded>
                                                                    {resumeTemplates.map((category) => (
                                                                        <AccordionItem key={category.id}>
                                                                            <AccordionItemHeading>
                                                                                <AccordionItemButton>
                                                                                    <h6 className={"change-text py-2 px-3 " + Style.categoryTitle}>{language === 'fa' ? category.categoryName : category.categoryNameEng}</h6>
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
                                                                                                        onTemplateSelect(category.id, item.id)
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
                                                                            setModalStep(modalStep - 1)
                                                                    }}>????????
                                                            </button>
                                                            <button type="button" className="btn btn-primary d-none"
                                                                    id={"step1_submit"}
                                                                    onClick={() => {
                                                                        setModalStep(modalStep + 1);
                                                                    }}>?????????? ??????
                                                            </button>
                                                        </div>
                                                    </div>}
                                                    {modalStep === 2 &&
                                                    <div>
                                                        <div className="modal-body">
                                                            <h6 className={"text-right my-4"}>???????????? ??????</h6>
                                                            <div className={"row w-100"}>
                                                                {
                                                                    resumeColors.map((item, index) => (
                                                                        <div className={"col-6 col-xl-2 p-3"}>
                                                                            <div
                                                                                className={item.id === colorId ? Style.focusedTemplate + " d-flex " + Style.templateColorBarParent : "d-flex " + Style.templateColorBarParent}
                                                                                onClick={() => {
                                                                                    onColorSelect(item.id)
                                                                                }}>
                                                                                <div
                                                                                    className={"w-50 " + Style.templateColorBarRight}
                                                                                    style={{backgroundColor: item.color1}}></div>
                                                                                <div
                                                                                    className={"w-50 " + Style.templateColorBarLeft}
                                                                                    style={{backgroundColor: item.color2}}></div>
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
                                                                            setModalStep(modalStep - 1)
                                                                    }}>????????
                                                            </button>
                                                            <button type="button" className="btn btn-primary d-none"
                                                                    id={"step2_submit"}
                                                                    onClick={() => {
                                                                        setModalStep(modalStep + 1);
                                                                    }}>?????????? ??????
                                                            </button>
                                                        </div>
                                                    </div>}
                                                    {modalStep === 3 &&
                                                    <div>
                                                        <div className="modal-body">
                                                            <h6 className={"text-right my-4"}>???????????? ??????????????</h6>
                                                            <textarea
                                                                className={"form-control " + Style.resumeDescription}
                                                                id={"resume_description"}></textarea>

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    data-dismiss="modal"
                                                                    onClick={function () {
                                                                        if (modalStep !== 0)
                                                                            setModalStep(modalStep - 1)
                                                                    }}>????????
                                                            </button>
                                                            <button type="button" className="btn btn-primary"
                                                                    onClick={submitModal}>?????????? ??????????
                                                            </button>
                                                        </div>
                                                    </div>}


                                                </div>

                                                :

                                                <div>
                                                    <div className="modal-body">
                                                        <p>???????? ???????? ?????? ?????? ????????</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary"
                                                                data-dismiss="modal">??????
                                                        </button>
                                                        <Link to={getRoutesItems().loginStep1.route}
                                                              className="btn btn-primary">????????? ??????</Link>
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