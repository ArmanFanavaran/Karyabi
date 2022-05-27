import Style from "./index.module.css";

import HandLogo from "./imgs/hand logo (2).png";
import Feature9 from "./imgs/Feature_9.png";
import NewsSample from "./imgs/newsSample.png";
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
        <main className="container-fluid">
            <div className={Style.hero}>
                <div className="container">
                    <div className={Style["hero-row"]}>
                        <div className={Style["hero-text"] + " col-12 col-md-6 order-md-1 order-2 change-dir change-text"}>
                            <h1 className={'mt-5 mt-md-0'}>
                                {sp.get("lang") === "fa" ?
                                    "به وبسایت کاریابی دانشگاه خلیج فارس خوش آمدید" :
                                    "Welcome to the job search website of Persian Gulf University"
                                }
                            </h1>
                            <p className={'change-dir change-text'}>
                                {hero.message}
                            </p>
                            <button className="btn">
                                {sp.get("lang") === "fa" ?
                                    "اطلاعات بیشتر" :
                                    "More Details"
                                }
                            </button>
                        </div>
                        <div className={Style["hero-img"] + " col-12 d-none d-md-block col-md-6 order-md-2 order-1"}>
                            <img src={HandLogo} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className={Style.clubs + " py-3 container text-center"}>*/}
            {/*    <h3 className="py-4">انجمن های موثر</h3>*/}
            {/*    <div className="row">*/}
            {/*        <div className={Style["uni-logo"] + " col-lg-2 col-md-6"}><img src={AnjomanRazi}*/}
            {/*                                                         alt=""*/}
            {/*                                                         className=""/></div>*/}
            {/*        <div className={Style["uni-logo"] + " col-lg-2 col-md-6"}><img src={AnjomanKhajenasir} alt="" className=""/>*/}
            {/*        </div>*/}
            {/*        <div className={Style["uni-logo"] + " col-lg-2 col-md-6"}><img src={LogoTransparent} alt=""*/}
            {/*                                                         className=""/></div>*/}
            {/*        <div className={Style["uni-logo"] + " col-lg-2 col-md-6"}><img src={PersianGulf} alt=""*/}
            {/*                                                         className=""/>*/}
            {/*        </div>*/}
            {/*        <div className={Style["uni-logo"] + " col-lg-2 col-md-6"}><img src={ItLogo}*/}
            {/*                                                         alt=""*/}
            {/*                                                         className=""/></div>*/}
            {/*        <div className={Style["uni-logo"] + " col-lg-2 col-md-6"}><img src={AnjomanGilan}*/}
            {/*                                                         alt=""*/}
            {/*                                                         className=""/></div>*/}
            {/*    </div>*/}
            {/*    <div className={Style.dots + " text-center pt-1"}>*/}
            {/*        <span className={Style.dot}></span>*/}
            {/*        <span className={Style.dot}></span>*/}
            {/*        <span className={Style.dot + " " + Style.acitve}></span>*/}
            {/*        <span className={Style.dot}></span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={Style.courses}>*/}
            {/*    <div className="container">*/}
            {/*        <h3 className="text-center pt-4">دوره های اتحادیه</h3>*/}
            {/*        <div className="row py-2">*/}

            {/*            <div className="offset-md-6  col-md-6  text-md-right text-center py-2 order-1">*/}
            {/*                <div className={Style["courses-btn-group"] + " btn-group rounded"} role="group" aria-label="Basic example">*/}
            {/*                    <button type="button" className={Style["courses-btn"] + " btn " + Style.acitve}>آخرین دوره ها</button>*/}
            {/*                    <button type="button" className={Style["courses-btn"] + " btn "}>علاقه مندی ها</button>*/}
            {/*                    <button type="button" className={Style["courses-btn"] + " btn "}>پر بازدید ترین ها</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className={Style["courses-text"] + " col-md-6 py-2 order-md-2 order-3"}>*/}
            {/*                <h2 className="m-md-0 mx-auto  text-right">متن ساختگی با تولید لورم ایپسوم</h2>*/}
            {/*                <p className="m-md-0 mx-auto  text-right">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از*/}
            {/*                    صنعت*/}
            {/*                    چاپ و با استفاده از طراحان گرافیک است.</p>*/}
            {/*                <div className="text-md-right">*/}
            {/*                    <button className={Style["courses-text-btn"] + " btn"}>اطلاعات بیشتر</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className={Style["courses-img"] + " col-md-6 text-center text-md-left py-2 order-md-3 order-2"}>*/}
            {/*                <img src={Img1} alt=""/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={Style.dots + " text-center"}>*/}
            {/*            <span className={Style.dot}></span>*/}
            {/*            <span className={Style.dot}></span>*/}
            {/*            <span className={Style.dot + " " + Style.acitve}></span>*/}
            {/*            <span className={Style.dot}></span>*/}
            {/*        </div>*/}
            {/*        <div className={Style["more-news"] + " text-left"}>*/}
            {/*            <a href="">نمایش تمامی دوره ها<i className="px-1 fas fa-arrow-left"></i></a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={Style.advertising}>
                <div className="container mt-5">
                    <h3 className="text-center">آگهی های استخدامی</h3>
                    <div className="row py-4">

                        <div className="offset-md-6  col-md-6  text-md-right text-center py-2">
                            <div className={Style["advertising-btn-group"] + " btn-group rounded"} role="group"
                                 aria-label="Basic example">
                                <button type="button"
                                        className={Style["advertising-btn"] + " btn " + Style["acitve"]}>آخرین دوره ها
                                </button>
                                <button type="button" className={Style["advertising-btn"] + " btn "}>علاقه مندی ها
                                </button>
                            </div>
                        </div>
                        <div className={Style["advertising-img"] + " col-md-6 text-center text-md-right  py-2"}>
                            <img src={Feature9} alt=""/>
                        </div>
                        <div className={Style["courses-text"] + " col-md-6 py-2 order-md-2 order-3"}>
                            <h2 className="m-md-0 mx-auto  text-right">متن ساختگی با تولید لورم ایپسوم</h2>
                            <p className="m-md-0 mx-auto  text-right">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                                صنعت
                                چاپ و با استفاده از طراحان گرافیک است.</p>
                            <div className="text-md-right">
                                <button className={Style["courses-text-btn"] + " btn"}>اطلاعات بیشتر</button>
                            </div>
                        </div>
                    </div>
                    <div className={Style.dots + " text-center"}>
                        <span className={Style.dot}></span>
                        <span className={Style.dot}></span>
                        <span className={Style.dot + " " + Style.acitve}></span>
                        <span className={Style.dot}></span>
                    </div>
                    <div className={Style["more-news"] + " text-left"}>
                        <a href="">نمایش تمامی آگهی ها<i className="px-1 fas fa-arrow-left"></i></a>
                    </div>
                </div>
            </div>
            <div className={Style.news}>
                <div className="container text-center">
                    <h3>اخبار</h3>
                    <div className="row">
                        <div className={Style["news-item"] + " col-lg-3 col-md-6"}>
                            <img className="rounded" src={NewsSample}
                                 alt=""/>
                            <h6>دستاوردهای اصلی</h6>
                            <p className="">از طراحان گرافیک است. چاپگر ها و متون سادگی نامفهوم از صنعت چاپ و با استفاده
                                لورم ایپسوم متن ساختگی با تولید</p>
                        </div>
                        <div className={Style["news-item"] + " col-lg-3 col-md-6"}>
                            <img className="rounded" src={NewsSample} alt=""/>
                            <h6>دستاوردهای اصلی</h6>
                            <p>از طراحان گرافیک است. چاپگر ها و متون سادگی نامفهوم از صنعت چاپ و با استفاده لورم
                                ایپسوم متن ساختگی با تولید</p>
                        </div>
                        <div className={Style["news-item"] + " col-lg-3 col-md-6"}>
                            <img className="rounded" src={NewsSample} alt=""/>
                            <h6>دستاوردهای اصلی</h6>
                            <p className="">از طراحان گرافیک است. چاپگر ها و متون سادگی نامفهوم از صنعت چاپ و با استفاده
                                لورم ایپسوم متن ساختگی با تولید</p>
                        </div>
                        <div className={Style["news-item"] + " col-lg-3 col-md-6"}>
                            <img className="rounded" src={NewsSample} alt=""/>
                            <h6>دستاوردهای اصلی</h6>
                            <p>از طراحان گرافیک است. چاپگر ها و متون سادگی نامفهوم از صنعت چاپ و با استفاده لورم
                                ایپسوم متن ساختگی با تولید</p>
                        </div>
                    </div>
                    <div className={Style.dots + " text-center"}>
                        <span className={Style.dot}></span>
                        <span className={Style.dot}></span>
                        <span className={Style.dot + " " + Style.acitve}></span>
                        <span className={Style.dot}></span>
                    </div>
                    <div className={Style["more-news"] + " text-left"}>
                        <a href="">نمایش کل اخبار<i className="px-1 fas fa-arrow-left"></i></a>
                    </div>
                </div>
            </div>
            {/*</div>*/}
            <div className={Style["statistics"] + " container"}>
                <div className="row text-center py-4">
                    <div className="col-lg-4 col-12 pt-2">
                        <h5>+30</h5>
                        <p>تعداد شرکت کننده های عضو اتحادیه</p>
                    </div>
                    <div className="col-lg-4 col-12 pt-2">
                        <h5>+43,000</h5>
                        <p>تعداد کل اعضای اتحادیه</p>
                    </div>
                    <div className="col-lg-4 col-12 pt-2">
                        <h5>+100</h5>
                        <p>تعداد انجمن های عضو اتحادیه</p>
                    </div>
                </div>
            </div>
        </main>
    )
}