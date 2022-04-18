import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import $ from 'jquery';
import {useHistory} from "react-router";
import * as queryString from "query-string";
import Cookies from 'js-cookie';
import {css} from "@emotion/react";
import {useTranslation} from "react-i18next";
import {getCookiesItems} from "../../../CookiesList/CookiesList"
import {initializeTitlesWithValue} from "../../../global/Titles"
import {
    generateURL,
    generateCookieDomain,
    generateAdminURL,
    generateCAdminURL,
    generateTAdminURL,
    generateCookieBoolean,
    generateCaptcha, language
} from "../../../global/Requests";
import {getSizeImageItems} from "../../../SizeImageList/SizeImageList"
import Style from "./LoginStep3.module.css";
import {Link} from "react-router-dom";
import {MoonLoader} from "react-spinners";
import {useEffect, useState} from "react";
import {getRoutesItems} from "../../../RoutesList/RoutesList";


export default function LoginStep3() {
    const items = getRoutesItems();
    const history = useHistory();
    const [t, i18n] = useTranslation('main');
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("rgb(0,30,255)");
    var axios = require('axios');
    axios.defaults.withCredentials = true;
    const value = window.location.pathname;

    useEffect(() => {
        // setLoading(true)

    }, [])

    /// Enter Key ////
    const enterKey = (event) => {
        if (event.keyCode === 13) {
            console.log("hello")
            onSubmitWithReCAPTCHA();
        }
    }
    // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css`
      display: flex;
      margin: 0 auto;
      border: 10px #ff0000;
      //z-index: 99999;
    `;
    /// Lang ///
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    const onSubmitWithReCAPTCHA = async () => {
        let password = $("#password").val();
        setLoading(true)
        var axios = require('axios');
        var data = JSON.stringify({
            "pass": password,
            "heights": [getSizeImageItems().UserNavbarPic.Heights],
            "widths": [getSizeImageItems().UserNavbarPic.Widths],
            "qualities": [getSizeImageItems().UserNavbarPic.Qualities]
        });
        var config = {
            method: 'post',
            url: generateURL('/User/EnterPass'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                setLoading(false)
                console.log(response.data)
                let states = response.data.data.states;
                let bool = true;
                for (let key in states) {
                    if (states[key].name === "IsLogedIn") {
                        if (states[key].value === true) {
                            let accessExp = response.data.data.accessExp;
                            let refreshExp = response.data.data.refreshExp;
                            Cookies.set(getCookiesItems().accessExp.nickName, accessExp, {
                                domain: getCookiesItems().accessExp.domain,
                                expires: getCookiesItems().accessExp.expires
                            })
                            Cookies.set(getCookiesItems().refreshExp.nickName, refreshExp, {
                                domain: getCookiesItems().refreshExp.domain,
                                expires: getCookiesItems().refreshExp.expires
                            })
                            Cookies.set(getCookiesItems().is_admin.nickName, response.data.data.isAdmin, {
                                domain: getCookiesItems().is_admin.domain,
                                expires: getCookiesItems().is_admin.expires
                            })
                            Cookies.set(getCookiesItems().is_admin_one.nickName, response.data.data.isAdminOne, {
                                domain: getCookiesItems().is_admin_one.domain,
                                expires: getCookiesItems().is_admin_one.expires
                            })
                            Cookies.set(getCookiesItems().firstName.nickName, response.data.data.firstName, {
                                domain: getCookiesItems().firstName.domain,
                                expires: getCookiesItems().firstName.expires
                            })
                            Cookies.set(getCookiesItems().lastName.nickName, response.data.data.lastName, {
                                domain: getCookiesItems().lastName.domain,
                                expires: getCookiesItems().lastName.expires
                            })

                            localStorage.setItem(getCookiesItems().userPic.nickName, response.data.data.picAddresses);


                        }
                    }
                }
                NotificationManager.success(response.data.message, ' ', 700);

                setTimeout(function () {
                    for (let key in states) {
                        if (states[key].name === "IsReadyToEnterGoogleAuth") {
                            if (states[key].value === true) {
                                history.push({
                                    pathname: getRoutesItems().loginStep3.route,
                                    search: "lang=" + sp.get("lang")

                                })
                                bool = false;
                            }
                        }
                    }
                    if (bool) {//// enter Google Auth ////
                        history.push({
                            pathname: getRoutesItems().mainPage.route,
                            search: "lang=" + sp.get("lang")

                        })
                        window.location.reload();

                    }
                }, 1500);


            })
            .catch(function (error) {
                setLoading(false)

                if (error.response.data.message != null) {
                    NotificationManager.error(error.response.data.message, '', 1000);
                } else if (error.response.data.errors != null) {
                    Object.keys(error.response.data.errors).map((key, i) => {
                        for (var i = 0; i < error.response.data.errors[key].length; i++) {
                            NotificationManager.error(error.response.data.errors[key][i], '', 1000);
                        }
                    })
                }

            });

    }

    useEffect(() => {
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Login | Google Auth")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("ورود | رمز یکبارمصرف")
        }
    }, [])
    return (
        <div>
            <main className={Style.main + " text-center"} onKeyUp={(e) => enterKey(e)}>
                <div className="container">
                    <h4>{t("login.enter_your_information_step2")}</h4>

                    <div className={Style.inputs}>
                        <input id="password" type="password" className="form-control text-center"
                               placeholder={t("login.password")}/>

                        <button className={Style["btn-login"] + " btn d-block"} type="button"
                                onClick={onSubmitWithReCAPTCHA}>{t("login.login")}
                        </button>
                        <div className={'row'}>
                            <div className={'col-12 col-md-4 mx-auto'}>
                                <MoonLoader color={color} loading={loading} css={override} size={30}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <NotificationContainer/>
        </div>
    )
}