import Style from "./index.module.css";

import E1 from "./imgs/englishFrames/E1.PNG";
import E2 from "./imgs/englishFrames/E2.PNG";
import E3 from "./imgs/englishFrames/E3.PNG";
import E4 from "./imgs/englishFrames/E4.PNG";
import E5 from "./imgs/englishFrames/E5.PNG";
import E6 from "./imgs/englishFrames/E6.PNG";

import P1 from "./imgs/persianFrames/p1.PNG";
import P2 from "./imgs/persianFrames/p2.PNG";
import P3 from "./imgs/persianFrames/p3.PNG";
import P4 from "./imgs/persianFrames/p4.PNG";
import P5 from "./imgs/persianFrames/p5.PNG";
import P6 from "./imgs/persianFrames/p6.PNG";


import service1 from "./imgs/service1.png"
import service2 from "./imgs/service2.png"
import service3 from "./imgs/service3.png"

import heroPicFa from "./imgs/picture.png"
import heroPicEn from "./imgs/heroEn.PNG"

import {useEffect, useState} from "react";
import {generateURL} from "../global/Requests";
import * as queryString from "query-string";
import {useTranslation} from "react-i18next";
import $ from 'jquery';
import {useHistory} from "react-router-dom";
import {getRoutesItems} from "../RoutesList/RoutesList";
import {parse} from "query-string";


export default function Index() {
    const history = useHistory();
    var axios = require('axios');
    axios.defaults.withCredentials = true;
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    const [hero, setHero] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [language, setLanguage] = useState();
    const [t, i18n] = useTranslation('main');

    const onSearchJobOffer = () => {

        let keyword = $("#skill_input").val().trim();
        let category = $("#category_select").val();
        if (category !== undefined && category !== null)
            category = parseInt(category);
        else category = null;
        let province = $("#province_select").val();
        if (province !== undefined && province !== null)
            province = parseInt(province);
        else province = null;

        history.push({
            pathname: getRoutesItems().employmentAdvertisementList.route,
            search: "lang=" + language + "&keyword=" + keyword + "&category=" + category + "&province=" + province
        });
    }



    useEffect(function () {
        setLanguage(queryStringes.lang)

        /************ get Hero ***********/
        var config = {
            method: 'get',
            url: generateURL('/Hero/GetHeroClient'),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(config)
            .then(function (response) {
                console.log(response.data.data)
                setHero(response.data.data)
            })
            .catch(function (error) {
            });

        /************ get Provinces ***********/
        var province_config = {
            method: 'get',
            url: generateURL('/SideArray/GetProvinceList'),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(province_config)
            .then(function (response) {
                console.log(response.data.data)
                setProvinces(response.data.data)
            })
            .catch(function (error) {
            });

        /************** Category List *************/
        var entity_config = {
            method: 'get',
            url: generateURL("/Side/GetJobCategoryList"),
            headers: {}
        };
        axios(entity_config)
            .then(function (response) {
                setCategories(response.data.data);
            })
            .catch(function (error) {
            });
    }, [])
    return (
        <main className="py-5">
            <section className={Style.hero + " container"} dir="rtl">
                <div className={Style.searchBox}>
                    <form>
                        <div className="row ">
                            <div className="col-12 col-md-3 my-2">
                                <input id={"skill_input"} type="text" className="form-control change-text change-dir" placeholder={t("index.skill")}/>
                            </div>
                            <div className="col-12 col-md-3 my-2">
                                <select id={"category_select"} className="form-control w-100 change-text change-dir">
                                    <option disabled={true} selected={true}>{t("index.jobCategory")}</option>
                                    {
                                        categories.map((item) => (
                                            <option value={item.id}>{language === 'fa'? item.name : item.englishName}</option>

                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-12 col-md-3 my-2">
                                <select id={"province_select"} className="form-control w-100 change-text change-dir">
                                    <option disabled={true} selected={true}>{t("index.province")}</option>
                                    {
                                        provinces.map((item) => (
                                            <option value={item.id}>{language === 'fa'? item.name : item.englishName}</option>

                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-12 col-md-3 my-2">
                                <button className={"form-control w-100 " + Style.searchbtn} onClick={onSearchJobOffer}>{t("index.search")}</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={"container " + Style.heroContent}>
                    <div className="row change-dir pt-5">
                        <div className="col-md-5">
                            <div className={Style.rightContent + " text-center mt-5"}>
                                <h2>{t("index.welcomeHero")}</h2>
                                <div className=" mt-4">
                                    <p>  {hero.message}</p>
                                    <button className={'btn w-100'}>{t("index.moreInfo")}</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className={Style.rightContent + " mt-4"}>
                                {
                                    language === 'fa' ?
                                        <img className={Style.w90} src={heroPicFa} alt=""/>:
                                        <img className={Style.w90} src={heroPicEn} alt=""/>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={Style.services + " container"}>
                <div className="text-center">
                    <h3>{t("index.services")}</h3>
                    <div className={" row"}>
                        <div className={Style.cardCustom + " col-12 col-md-4"}>
                            <div className={Style.marginCustom}>
                                <img className={Style.cardImgTop} src={service1} alt="Card image cap"/>
                                <div className={Style.cardBody}>
                                    <h5 className={Style.cardTitle}>{t("index.searchTemplatesTitle")}</h5>
                                    <p className={Style.cardText+ " change-text change-dir"}>{t("index.searchTemplatesText")}</p>

                                </div>
                            </div>
                        </div>
                        <div className={Style.cardCustom + " col-12 col-md-4"}>
                            <div className={Style.marginCustom}>
                                <img className={Style.cardImgTop} src={service2}/>
                                <div className={Style.cardBody}>
                                    <h5 className={Style.cardTitle}>{t("index.jobOfferAnnouncementsTitle")}</h5>
                                    <p className={Style.cardText+ " change-text change-dir"}>{t("index.jobOfferAnnouncementsText")}</p>

                                </div>
                            </div>
                        </div>
                        <div className={Style.cardCustom + " col-12 col-md-4"}>
                            <div className={Style.marginCustom}>
                                <img className={Style.cardImgTop} src={service3}
                                     alt="Card image cap"/>
                                <div className={Style.cardBody }>
                                    <h5 className={Style.cardTitle}>{t("index.multipleResumesTitle")}</h5>
                                    <p className={Style.cardText+ " change-text change-dir"}>{t("index.multipleResumesText")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="resumePaths container">
                <div className="text-center">
                    <h3>{t("index.buildResumeSteps")}</h3>
                    <div className="pathTable">
                        <div className="row">
                            <div className="col-12 col-md-4 p-0">
                                <div className={Style.marginQuide  + " " + Style.borderBottomGuild}>
                                    <img className={Style.frameImg} src={language === "fa" ? P1 : E1} alt=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 p-0">
                                <div className={Style.marginQuide  + " " + Style.borderBottomGuild}>
                                    <img className={Style.frameImg} src={language === "fa" ? P2 : E2} alt=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 p-0">
                                <div className={Style.marginQuide + " " + Style.noBorderGuild + " " + Style.borderBottomGuild}>
                                    <img className={Style.frameImg } src={language === "fa" ? P3 : E3} alt=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 p-0">
                                <div className={Style.marginQuide + " " + Style.borderBottomGuild_sm}>
                                    <img className={Style.frameImg} src={language === "fa" ? P4 : E4} alt=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 p-0">
                                <div className={Style.marginQuide + " " + Style.borderBottomGuild_sm }>
                                    <img className={Style.frameImg} src={language === "fa" ? P5 : E5} alt=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 p-0">
                                <div className={Style.marginQuide + " " + Style.noBorderGuild + " " + Style.borderBottomGuild_sm}>
                                    <img className={Style.frameImg } src={language === "fa" ? P6 : E6} alt=""/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}