import {GoogleReCaptchaProvider, useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import $ from 'jquery';
import {useHistory} from "react-router";
import * as queryString from "query-string";
import Cookies from 'js-cookie';
import {css} from "@emotion/react";
import {useTranslation} from "react-i18next";
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
import Style from "./LoginStep1.module.css";
import {Link} from "react-router-dom";
import {MoonLoader} from "react-spinners";
import {useEffect, useState} from "react";
import {getRoutesItems} from "../../../RoutesList/RoutesList";


export default function LoginStep1() {

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={generateCaptcha()}>
            <LoginComponent/>
        </GoogleReCaptchaProvider>
    );
}

function LoginComponent() {
    const items = getRoutesItems();
    const {executeRecaptcha} = useGoogleReCaptcha();
    const history = useHistory();
    const [t, i18n] = useTranslation('main');
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("rgb(0,30,255)");
    var axios = require('axios');
    axios.defaults.withCredentials = true;
    const value = window.location.pathname;


    useEffect(() => {
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Login | UserName")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("ورود | نام کاربری")
        }
    }, [])
    /// Enter Key ////
    const enterKey = (event) => {
        if (event.keyCode === 13) {
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
        const recaptchaToken = await executeRecaptcha("login_page");
        let username = $("#username").val();
        if (username.indexOf("0") == 0) {
            let cleanNumber = username.substring(1); //removes first character = "1"
            console.log(cleanNumber)
            username=cleanNumber
        }
        setLoading(true)
        var data = JSON.stringify({
            "phoneOrUserName": username,
            "captchaToken": recaptchaToken
        });

        console.log(data)

        var config = {
            method: 'post',
            url: generateURL('/User/Login'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data.data)
                setLoading(false)
                NotificationManager.success(response.data.message, '', 500);
                let states = response.data.data.states;
                let bool = true;
                setTimeout(function () {
                    for (let key in states) {
                        if (states[key].name === "IsReadyToEnterPass") {
                            if (states[key].value === true) {
                                history.push({
                                    pathname: items.loginStep2.route,
                                    search: "lang=" + sp.get("lang") + "&" + "EmailOrPhone=" + username,

                                })
                                bool = false;
                            }
                        } else if (states[key].name === "IsReadyToEnterCode") {
                            history.push({
                                pathname: items.registerStep2.route,
                                search: "lang=" + sp.get("lang") + "&" + "EmailOrPhone=" + username,

                            })
                        }
                    }
                }, 1000)
            })
            .catch(function (error) {
                setLoading(false)
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i], '', 1000);
                        }
                    });

                } else if (error.response.data.message != null && error.response.data.message != undefined) {
                    NotificationManager.error(error.response.data.message, '', 2000);
                } else {
                    NotificationManager.error(error.response.data.Message, '', 2000);

                }
                if (error.response.data.data !== null && error.response.data.data !== undefined) {
                    setTimeout(function () {
                        let states = error.response.data.data.states;
                        for (let key in states) {
                            if (states[key].name === "IsReadyToEnterCode") {
                                history.push({
                                    pathname: items.registerStep2.route,
                                    search: "lang=" + sp.get("lang"),

                                })
                            }
                        }
                    }, 1500)
                }


            })


    }

    return (
        <div>
            <main className={Style.main + " text-center"} onKeyUp={(e) => enterKey(e)}>
                <div className="container">
                    <h4>{t("authentication.login.enter_your_information_step1")}</h4>

                    <div className={Style.inputs}>
                        <input autoComplete="username" name="username" id="username" type="text" className="form-control text-center"
                               placeholder={t("authentication.login.username_or_email")}/>

                        <button className={Style["btn-login"] + " btn d-block"} type="button"
                                onClick={onSubmitWithReCAPTCHA}>{t("authentication.login.login")}
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