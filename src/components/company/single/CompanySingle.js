import Style from './companySingle.module.css';
import MainPic from './../imgs/sampleaminpic.jpg';
import queryString from "query-string";
import {generateURL} from "../../global/Requests";
import * as $ from "jquery";
import {useEffect, useState} from "react";
import Logo from './../imgs/sampleaminpic.jpg';
import {getRoutesItems} from "../../RoutesList/RoutesList";
import advertisment from "../../employmentAdvertisement/imgs/advertisment.png";
import {serverTimeToDaysAgo} from "../../global/TimeConverter";
import {Link} from "react-router-dom";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";


export default function CompanySingle() {
    const [t, i18n] = useTranslation('main');
    const [language, setLanguage] = useState();
    const [company, setCompany] = useState();
    const [jobOffers, setJobOffers] = useState([]);

    const TabItemActive = {
        backgroundColor: "#f1e1fd",
        color: "#1b1e21",
    }

    const TabItemActiveString = "background-color: #f1e1fd; color: #1b1e21;"



    const onIntroductionClick = () => {
        $("#introduction_item").attr("style", TabItemActiveString);
        $("#jobs_item").attr("style", "");

        $("#introduction_container").removeClass("d-none");
        $("#jobs_container").addClass("d-none");
    }

    const onJobsClick = () => {
        $("#introduction_item").attr("style", "");
        $("#jobs_item").attr("style", TabItemActiveString);

        $("#introduction_container").addClass("d-none");
        $("#jobs_container").removeClass("d-none");
    }

    useEffect(function () {
            const url = queryString.parse(window.location.search);
            const id = parseInt(url.id);
            setLanguage(url.lang)
            var axios = require('axios');

            /* get company info*/
            var config_data = JSON.stringify({
                "id": id,
                "roleId": 5,
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
                url: generateURL("/Company/GetCompanySingleClientSide"),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: config_data
            };
            console.log(config_data)

            axios(config)
                .then(function (response) {
                    let data = response.data.data;
                    setCompany(data);
                    console.log(data);


                });

            /*get company joboffers */
        var jobs_data = JSON.stringify({
            "roleId": 5,
            "roleAccountId": 0,
            "page": 1,
            "pageSize": 50,
            "heights": [
                200
            ],
            "widths": [
                200
            ],
            "qualities": [
                90
            ],
            "keyword": null,
            "ownerId": id,
            "owner": "Company",
            "genderIds": null,
            "isAdaptiveSalary": false,
            "minSalaryStatusId": 0,
            "maxSalaryStatusId": 12,
            "degreeIds": null,
            "typeId": 1,
            "provinceIds": null,
            "militaryStatusIds": null,
            "categoryIds": null,
            "isFullTime": false,
            "isPartTime": false,
            "isRemote": false,
            "isInternship": false,
            "isPromotionPossible": false,
            "isInsurancePossible": false,
            "isCoursePossible": false,
            "isFlexibleWorkTimePossible": false,
            "isCommutingServicePossible": false,
            "isFreeFoodPossible": false,
            "sortBye": 0
        });
        var jobs_config = {
            method: 'post',
            url: generateURL("/JobOffer/GetJobOfferListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: jobs_data
        };

        axios(jobs_config)
            .then(function (response) {
                let data = response.data.data;
                setJobOffers(data);
                console.log(data);


            });

        }, []);

    return(
        <main className={Style.main}>
            <div className={'position-relative w-100 ' + Style.coverDiv}>
                {/*<img src={Cover} className={Style.coverImg}/>*/}

                {/* header info desktop*/}
                <div className={'w-75 d-xl-flex d-none row justify-content-center change-dir change-header-info ' + Style.headerInfo}>
                    <img src={company !== undefined && company.logo !== "" ? company.logo : Logo} className={"rounded img-thumbnail " + Style.logo}/>
                    <div className={'flex-grow-1 py-3'}>
                        {      company !== undefined &&
                            <h5 className={Style.name + " change-text mx-3 pb-2"}>
                                {language === 'fa' ? company.name : company.englishName}
                            </h5>
                        }
                        {
                            company !== undefined &&
                            <div className={'d-flex change-dir text-white row w-100  mx-0 ' + Style.foundationContainer}>
                                <div className={'mx-3'}>{t("company.single.foundIn")} {company.foundationYear}</div>
                                <div className={'mx-3'}>{language === 'fa' ? company.companyCategory.name : company.companyCategory.englishName}</div>
                                <div className={'mx-3'}>{company.minMemberCount} - {company.maxMemberCount} {t("company.single.person")} </div>
                                <a className={Style.websiteAddress + ' mx-3'} href={company.webSiteAddress}>{company.webSiteAddress}</a>
                            </div>
                        }
                    </div>
                </div>
                {/* header info mobile*/}
                <div className={'container-fluid d-block d-xl-none row justify-content-center change-dir pt-4'}>
                    <div className={'d-flex justify-content-center'}>
                        <img src={company !== undefined && company.logo !== "" ? company.logo : Logo} className={"rounded img-thumbnail mx-auto " + Style.logoMobile}/>
                    </div>
                    <div className={'flex-grow-1 py-3'}>
                        {   company !== undefined &&
                            <h5 className={Style.name + " text-center  pb-2"}>
                                {language === 'fa' ? company.name : company.englishName}
                            </h5>
                        }
                        {
                            company !== undefined &&
                            <div className={'d-flex change-dir text-white row w-100  mx-0 ' + Style.foundationContainer}>
                                <div className={'mx-3'}>{t("company.single.foundIn")} {company.foundationYear}</div>
                                <div className={'mx-3'}>{language === 'fa' ? company.companyCategory.name : company.companyCategory.englishName}</div>
                                <div className={'mx-3'}>{company.minMemberCount} - {company.maxMemberCount} {t("company.single.person")} </div>
                                <a className={Style.websiteAddress + ' mx-3'} href={company.webSiteAddress}>{company.webSiteAddress}</a>
                            </div>
                        }
                    </div>
                </div>

            </div>
            <div className={Style.tabsContainer + ' w-100 px-xl-5 my-0'}>
                <nav className={" container px-xl-5" }>
                    <ul className="nav  change-dir px-xl-5 mx-xl-5">
                        <li onClick={onIntroductionClick} className={"nav-item py-3 px-3 " + Style.tabItem} style={TabItemActive} id={"introduction_item"}>
                            <div className="nav-link" >{t("company.single.introduction")}</div>
                        </li>
                        <li onClick={onJobsClick} className={"nav-item py-3 px-3 " + Style.tabItem} id={"jobs_item"}>
                            <div className="nav-link d-flex" ><span>{t("company.single.jobOffers")}</span>
                                <div className={Style.jobCounter + " px-2 py-1 mx-2"}>{jobOffers.length}</div>
                                {
                                    company !== undefined && company.isRecruiting &&
                                        <div className={Style.isRecruiting + " px-2 py-1 mx-1"}>{t("company.single.recruiting")}</div>
                                }
                            </div>

                        </li>
                    </ul>
                </nav>
            </div>
            <div className={'w-100 bg-light mt-0 pt-4 pb-5'}>
                <div id={'jobs_container'} className={'container d-none'}>
                    {
                        jobOffers.length > 0 && jobOffers.map((item)=> (
                                <div
                                    className={Style["news-item"] + " " + Style["news-item-even"] + " mx-2 mb-4 change-dir"}>
                                    <div
                                        className="row d-flex justify-content-center align-items-center ">
                                        <div className="col-12 col-lg-3 col-md-5">
                                            <div
                                                className={Style["news-item-img"] + " text-center p-lg-4"}>
                                                <img
                                                    src={item.jobOffer.coverImgs.length > 0 ? item.jobOffer.coverImgs[0] : advertisment}
                                                    alt={language === "fa" ?
                                                        item.company.name :
                                                        item.company.englishName
                                                    }
                                                    className=" mx-0"/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-9 col-md-7">
                                            <div className={Style["news-item-text"]}>
                                                <div className="pl-md-5">

                                                    <Link target="_blank" className={Style.mouse} to={item.jobOffer.title !== null && language === "fa" ? {
                                                            pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                            search: "lang=" + language + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.title.replace(/\s+/g, '-').toLowerCase()
                                                        } :
                                                        language === "fa" ? {
                                                            pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                            search: "lang=" + language + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.title
                                                        } : item.jobOffer.titleEnglish !== null && language === "en" ? {
                                                            pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                            search: "lang=" + language + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.titleEnglish.replace(/\s+/g, '-').toLowerCase()

                                                        } : language === "en" ? {
                                                            pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                            search: "lang=" + language + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.titleEnglish
                                                        } : null
                                                    }>
                                                        <h6 className="change-text">
                                                            {language === "fa" ?
                                                                item.jobOffer.title :
                                                                item.jobOffer.titleEnglish
                                                            }
                                                        </h6>
                                                    </Link>

                                                    <p className={'change-text text-muted d-flex change-dir justify-content-between'}>
                                                        {language === "fa" ?
                                                            item.company.name :
                                                            item.company.englishName
                                                        }
                                                    </p>
                                                    <p className="change-text d-flex change-dir row w-100 mx-0">
                                                                            <span className={Style.locationSpan + " mt-2"}>
                                                                                {language === "fa" ?
                                                                                    JSON.parse(item.jobOffer.cityJson).name + " / " + JSON.parse(item.jobOffer.provinceJson).name :
                                                                                    JSON.parse(item.jobOffer.cityJson).englishName + " / " + JSON.parse(item.jobOffer.provinceJson).englishName
                                                                                }
                                                                            </span>
                                                        <span className={Style.dateSpan + " mx-2 mt-2"}>
                                                                                {language === "fa" ?
                                                                                    serverTimeToDaysAgo(item.jobOffer.timeOrder) + " روز پیش" :
                                                                                    serverTimeToDaysAgo(item.jobOffer.timeOrder) + " days ago"}
                                                                            </span>

                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        ))
                    }
                </div>
                <div id={'introduction_container'} className={'container'}>
                    <div className={'row w-100 mx-0 change-dir'}>
                        {/* main pic*/}
                        {
                            company !== undefined &&
                            <div className={'col-12 col-xl-7'}>
                                <div className={'w-100 position-relative'}>
                                    <img src={company.mainPic !== ""? company.mainPic : MainPic} className={Style.mainPic + " rounded d-none d-xl-block"}/>
                                    {company.mainPic !== "" &&
                                    <img src={company.mainPic} className={Style.mainPic + " rounded d-block d-xl-none"}/>
                                    }
                                    <p className={Style.culture + " change-text change-dir p-3 m-0 d-none d-xl-block"}>{language==='fa' ? company.workCulture : company.workCultureEnglish}</p>
                                    <p className={Style.cultureMobile + " change-text change-dir p-3 my-4 d-block d-xl-none rounded"}>{language==='fa' ? company.workCulture : company.workCultureEnglish}</p>

                                </div>
                            </div>
                        }
                        {/* location*/}
                        {
                            company !== undefined &&
                            <div className={'col-12 col-xl-5'}>
                                <div className={Style.locationContainer}>
                                    <iframe className={Style.mapIframe} height="300" id="gmap_canvas"
                                            src={company.mapLocation}
                                            frameBorder="0" scrolling="no" marginHeight="0"
                                            marginWidth="0"></iframe>
                                    <div className={Style.companyLocation + " p-4"}>
                                        <label className={'change-dir change-text d-block'}>{t("company.single.location")}:</label>
                                            <div className={'mt-2 text-center'}>
                                                {language==='fa'? company.province.name : company.province.englishName} / {language==='fa'? company.city.name : company.city.englishName}
                                            </div>

                                    </div>

                                </div>
                            </div>
                        }

                        {/* introduction*/}
                        {
                            company !== undefined &&
                            <div className={'col-12 change-dir change-text mt-5'}>
                                <h5 className={'change-text ' + Style.paraTitle}>{t("company.single.introductionToUs")}</h5>

                                <p className={Style.introduction}>{language === 'fa' ? company.introduction : company.introductionEnglish}</p>
                            </div>
                        }
                        {/* cooperation benefits */}
                        {
                            company !== undefined &&
                            <div className={'col-12 mt-5 change-text change-dir'}>
                                <h5 className={'change-text ' + Style.paraTitle}>{t("company.single.ourCooperation")}</h5>
                                <p className={Style.introduction}>{language === 'fa' ? company.cooperationBenefits : company.cooperationBenefitsEnglish}</p>

                            </div>
                        }


                    </div>
                </div>
            </div>
        </main>
    )
}