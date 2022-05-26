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
    generateCaptcha,
    generateURL,
} from "../../../global/Requests";
import {getSizeImageItems} from "../../../SizeImageList/SizeImageList"
import Style from "./LoginStep2.module.css";
import {Link} from "react-router-dom";
import {MoonLoader} from "react-spinners";
import {useEffect, useState} from "react";
import {getRoutesItems} from "../../../RoutesList/RoutesList";
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from "react-google-recaptcha-v3";

export default function LoginStep2() {

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={generateCaptcha()}>
            <LoginComponent2/>
        </GoogleReCaptchaProvider>
    );
}

function LoginComponent2() {
    const items = getRoutesItems();
    const history = useHistory();
    const [t, i18n] = useTranslation('main');
    let [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    let [color, setColor] = useState("rgb(0,30,255)");
    const {executeRecaptcha} = useGoogleReCaptcha();
    var axios = require('axios');
    axios.defaults.withCredentials = true;
    const value = window.location.pathname;

    useEffect(() => {
        // setLoading(true)

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

    function onSubmitWithReCAPTCHA() {
        let password = $("#password").val();
        setLoading(true)
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
                let states = response.data.data.states;
                console.log(response.data.data)
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

                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i]);
                        }
                    });

                } else if (error.response.data.message != null && error.response.data.message != undefined) {
                    NotificationManager.error(error.response.data.message);
                } else {
                    NotificationManager.error(error.response.data.Message);

                }

            });

    }


    function showPass() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const onResendCode = async () => {
        setLoading(true)
        const recaptchaToken = await executeRecaptcha("login_page");
        const url = queryString.parse(window.location.search);
        let phone = url.EmailOrPhone;
        var axios = require('axios');
        axios.defaults.withCredentials = true;
        var data = JSON.stringify({
            "isToVerify": false,
            "captchaToken": recaptchaToken,
            "phoneOrUserName": phone
        });


        var config = {
            method: 'post',
            url: generateURL("/User/SendVerificationCode"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                // NotificationManager.success(response.data.message);
                setComplete(false);
                setLoading(false)
                NotificationManager.success(response.data.message, '', 500);
                setTimeout(function () {
                history.push({
                    pathname: items.resetPasswordStep1.route,
                    search: "lang=" + sp.get("lang") + "&" + "EmailOrPhone=" + phone,

                })
                }, 1000)
                // console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            });

    }

    useEffect(() => {
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Login | Password")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("ورود | رمز عبور")
        }
    }, [])

    return (
        <div>
            <main className={Style.main + " text-center"} onKeyUp={(e) => enterKey(e)}>
                <div className="container">
                    <h4>{t("authentication.login.enter_your_information_step2")}</h4>

                    <div className={Style.inputs}>
                        <input id="password" type="password" className="form-control text-center"
                               placeholder={t("authentication.login.password")}/>
                        <div className={'change-dir '}>
                            <input id={"show_pass"} className={' mx-1'} type="checkbox" onClick={showPass}/>
                            <label htmlFor={"show_pass"} style={{fontSize:"14px"}}> {t("authentication.login.show_password")}</label>
                        </div>
                        <button className={Style["btn-login"] + " btn d-block"} type="button"
                                onClick={onSubmitWithReCAPTCHA}>{t("authentication.login.login")}
                        </button>
                        <div className={" "}>
                            <button onClick={onResendCode}
                                className={"btn btn-default change-dir change-text mx-auto"} style={{fontSize:"14px"}}>{t("authentication.login.forgot_password")}</button>
                        </div>
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