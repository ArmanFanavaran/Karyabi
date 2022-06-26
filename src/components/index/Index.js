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

import heroPic from "./imgs/picture.png"

import {useEffect, useState} from "react";
import {generateURL} from "../global/Requests";
import * as queryString from "query-string";


export default function Index() {
    var axios = require('axios');
    axios.defaults.withCredentials = true;
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    const [hero, setHero] = useState([])
    const [language, setLanguage] = useState();


    useEffect(function () {
        setLanguage(queryStringes.lang)

        var config = {
            method: 'get',
            url: generateURL('/Hero/GetHeroClient'),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(config)
            .then(function (response) {
                setHero(response.data.data)
            })
            .catch(function (error) {
            });
    }, [])
    return (
        <main className="py-5">
            <section className={Style.hero + " container"} dir="rtl">
                <div className={Style.searchBox}>
                    <form>
                        <div className="row">
                            <div className="col-12 col-md-3 my-2">
                                <input type="text" className="form-control" placeholder="عنوان شرکت..."/>
                            </div>
                            <div className="col-12 col-md-3 my-2">
                                <input type="text" className="form-control w-100" placeholder="استان"/>
                            </div>
                            <div className="col-12 col-md-3 my-2">
                                <input type="text" className="form-control w-100" placeholder="دسته بندی"/>
                            </div>
                            <div className="col-12 col-md-3 my-2">
                                <input type="submit" className="form-control w-100" value="جستجو"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={"container " + Style.heroContent}>
                    <div className="row change-dir">
                        <div className="col-md-5">
                            <div className={Style.rightContent + " text-center mt-5"}>
                                <h2>به وبسایت کاریابی دانشگاه ”خلیج فارس“ خوش آمدید.</h2>
                                <div className=" mt-4">
                                    <p>  {hero.message}</p>
                                    <button className={'btn w-100'}>اطلاعات بیشتر</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className={Style.rightContent + " mt-4"}>
                                <img className={Style.w90} src={heroPic} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={Style.services + " container"}>
                <div className="text-center">
                    <h3>خدمات</h3>
                    <div className={" row"}>
                        <div className={Style.cardCustom + " col-12 col-md-4"}>
                            <div className={Style.marginCustom}>
                                <img className={Style.cardImgTop} src={service1} alt="Card image cap"/>
                                <div className={Style.cardBody}>
                                    <h5 className={Style.cardTitle}>جستجوی قالب مربوطه شغلی</h5>
                                    <p className={Style.cardText}>بر اساس رزومه قادر خواهید بود قالب های شغلی مربوطه را
                                        با
                                        توجه
                                        به سلیقه و درخواستتان انتخاب نمایید.</p>

                                </div>
                            </div>
                        </div>
                        <div className={Style.cardCustom + " col-12 col-md-4"}>
                            <div className={Style.marginCustom}>
                                <img className={Style.cardImgTop} src={service2}/>
                                <div className={Style.cardBody}>
                                    <h5 className={Style.cardTitle}>اطلاع رسانی موقعیت های شغلی</h5>
                                    <p className={Style.cardText}> بر اساس بیشترین میزان شباهت با رزومه ی خود به روش های
                                        الکترونیکی میتوانید از آگهی مدنظرتان مطلع شوید. </p>

                                </div>
                            </div>
                        </div>
                        <div className={Style.cardCustom + " col-12 col-md-4"}>
                            <div className={Style.marginCustom}>
                                <img className={Style.cardImgTop} src={service3}
                                     alt="Card image cap"/>
                                <div className={Style.cardBody}>
                                    <h5 className={Style.cardTitle}>ساخت رزومه های متعدد</h5>
                                    <p className={Style.cardText}>شما میتوانید در این بستر چندین رزومه مجزا از هم با
                                        موضوعات
                                        مختلف را بسازید.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="resumePaths container">
                <div className="text-center">
                    <h3>مراحل ساخت رزومه</h3>
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