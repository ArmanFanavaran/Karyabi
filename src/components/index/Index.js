import Style from "./index.module.css";

import num1 from "./imgs/num1.png"
import num2 from "./imgs/num2.png"
import num3 from "./imgs/num3.png"
import num4 from "./imgs/num4.png"
import num5 from "./imgs/num5.png"
import num6 from "./imgs/num6.png"

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


    useEffect(function () {

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
                            <div className="col-12 col-md-4">
                                <div className={Style.marginQuide}>
                                    <img className={'w-100'} src={num1} alt=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className={Style.marginQuide}>
                                    <img className={'w-100'} src={num2} alt=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className={Style.marginQuide}>
                                    <img className={'w-100'} src={num3} alt=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className={Style.marginQuide}>
                                    <img className={'w-100'} src={num4} alt=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className={Style.marginQuide}>
                                    <img className={'w-100'} src={num5} alt=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className={Style.marginQuide}>
                                    <img className={'w-100'} src={num6} alt=""/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}