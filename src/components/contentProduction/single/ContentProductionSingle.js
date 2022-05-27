import * as React from 'react';
import {useEffect, useState} from 'react';
import queryString from "query-string";


import Style from "./ContentProductionSingle.module.css";
import {generateURL} from "../../global/Requests";
import HtmlComponent from "../../global/EditorToHTML";
import {useHistory} from "react-router-dom";
import {isAccessTokenExpired} from "../../authentication/Helper/Auth";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import {useTranslation} from "react-i18next";
import {serverTimeToDaysAgo} from "../../global/TimeConverter";
import alarm from "./../imgs/alarm.svg"
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {Link} from "react-router-dom";

export default function ContentProductionSingle() {
    const history = useHistory();
    const [t, i18n] = useTranslation('main');

    const [accessExpire, setAccessExpire] = useState();

    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    const [language, setLanguage] = useState();
    const [authorName, setAuthorName] = useState({fa: "", eng: ""});
    const [authorLastName, setAuthorLastName] = useState({fa: "", eng: ""});
    const [description, setDescription] = useState({fa: "", eng: ""});
    const [shortDescription, setShortDescription] = useState({fa: "", eng: ""});
    const [title, setTitle] = useState({fa: "", eng: ""});
    const [category, setCategory] = useState([]);
    const [images, setImages] = useState([]);
    const [time, setTime] = useState([]);


    useEffect(function () {

        const url = queryString.parse(window.location.search);
        const id = parseInt(url.id);
        setLanguage(url.lang)
        var axios = require('axios');
        var config_data = JSON.stringify({
            "id": id,
            "roleId": 8,
            "heights": [
                200
            ],
            "widths": [
                200
            ],
            "qualities": [
                90
            ]
        });

        var config = {
            method: 'post',
            url: generateURL("/News/GetNewsSingleClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: config_data
        };
        console.log(config_data)

        axios(config)
            .then(function (response) {
                let data = response.data.data;
                console.log(data);
                setAuthorName({fa: data.authorName, eng: data.authorNameEnglish})
                setAuthorLastName({fa: data.authorLastName, eng: data.authorLastNameEnglish})
                setDescription({fa: data.description, eng: data.englishDescription})
                setShortDescription({fa: data.shortDesc, eng: data.englishShortDesc})
                setTitle({fa: data.title, eng: data.englishTitle})
                setCategory([data.newsCategory])
                console.log(data.newsCategory)
                setImages(data.images)
                setTime(data.insertTime)

            })
            .catch(function (error) {
                console.log(error);
            });

        setAccessExpire(!isAccessTokenExpired())

    }, []);

    return (
        <main className={Style.main}>
            <div className="w-100 mb-5 pt-3">
                <div className={"container w-100 mt-4"}>
                    <div className={"row w-100 change-dir change-text mx-0"}>
                        <div className={"col-12 col-xl-10 p-2"}>
                            <div className={" px-4"}>
                                <div className={'row'}>
                                    <div className={'col-12'}>

                                        <h1 style={{fontSize: "38.5px"}}><a href={window.location.href}
                                                                            className={Style.jobTitle + " d-block change-text"}>{language === 'fa' ? title.fa : title.eng}</a>
                                        </h1>
                                        <time className={Style.dateSpan + " badge badge-primary px-3 py-2 mx-1"}
                                              style={{fontWeight: "normal", fontSize: "75%"}}>
                                            {sp.get("lang") === "fa" ?
                                                serverTimeToDaysAgo(time) + " روز پیش" :
                                                serverTimeToDaysAgo(time) + " days ago"}
                                        </time>
                                        <span className={Style.dateSpan + " badge badge-success px-3 py-2 mx-1"}
                                              style={{fontWeight: "normal", fontSize: "75%"}}>
                                                {sp.get("lang") === "fa" ?
                                                    authorName.fa + " " + authorLastName.fa :
                                                    authorName.eng + " " + authorLastName.eng
                                                }
                                        </span>
                                        <hr/>
                                        <h2 className={'text-center'}
                                            style={{fontSize: "29px",fontWeight:"bold"}}>{language === 'fa' ? title.fa : title.eng}
                                        </h2>
                                        <HtmlComponent className={Style.jobDesc}
                                                       val={language === 'fa' ? shortDescription.fa : shortDescription.eng}/>
                                        <div
                                            className={Style.alert3 + " " + Style.bgAlert3 + " " + Style.alert3Primary + " mt-4"}>

                                            <div data-nosnippet="true">
                                                <img src={alarm} width={40} className={'px-2'}/>
                                                {
                                                    accessExpire === true ?
                                                        <Link
                                                            to={{
                                                                pathname: getRoutesItems().DashboardParent.route,
                                                                search: "lang=" + sp.get("lang")}}
                                                            target="_blank">
                                                            {sp.get("lang") === "fa" ?
                                                                " برای دریافت اخبار و اطلاع از آگهی های استخدام بانک ها و سازمانهای دولتی و خصوصی در ایمیل و گوشی همراه خود اینجا کلیک کنید." :
                                                                "Click here to receive news and information about employment advertisements of banks and public and private organizations in your email and mobile phone."
                                                            }
                                                        </Link> : <Link
                                                            to={{
                                                                pathname: getRoutesItems().loginStep1.route,
                                                                search: "lang=" + sp.get("lang")}}
                                                            target="_blank">
                                                            {sp.get("lang") === "fa" ?
                                                                " برای دریافت اخبار و اطلاع از آگهی های استخدام بانک ها و سازمانهای دولتی و خصوصی در ایمیل و گوشی همراه خود اینجا کلیک کنید." :
                                                                "Click here to receive news and information about employment advertisements of banks and public and private organizations in your email and mobile phone."
                                                            }
                                                        </Link>
                                                }
                                            </div>
                                        </div>
                                        <h4 className={'mt-4'} style={{fontSize: "18px", fontWeight: "bold"}}>
                                            {language === 'fa' ? "فهرست مطالب مهم  " : "List of important contents"}
                                        </h4>
                                        <hr/>

                                        <HtmlComponent className={Style.jobDesc + " mb-4"}
                                                       val={language === 'fa' ? description.fa : description.eng}/>
                                        <hr/>
                                    </div>
                                </div>
                            </div>

                            <div className={"row px-4"}>
                                <div className={"col-12 col-xl-6 "}>
                                    <div
                                        className={Style.jobFieldTitle}>{t("contentProduction.single.category")}</div>
                                    <div className={"d-flex w-100 mx-0"}>
                                        {
                                            category.length > 0 && category.map((item, index) => (
                                                <div className={Style.jobField + " mt-2 mx-1"}>{language === 'fa' ? item.name : item.englishName}</div>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className={" col-12 col-xl-2 p-2"}>
                            {/*<div className={"card w-100 p-4 " + Style.modalParent}>*/}
                            {/*    <h5 className={"text-center "}>{t("employmentAdvertisement.single.joinNow")}</h5>*/}


                            {/*</div>*/}
                        </div>
                    </div>
                </div>

            </div>
            <NotificationContainer/>

        </main>
    )
}