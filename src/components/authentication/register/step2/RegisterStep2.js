import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import $ from 'jquery'
import {generateCaptcha, generateCookieDomain, generateURL} from "../../../global/Requests";
import {useEffect, useState} from "react";
import queryString from "query-string";
import {useHistory} from "react-router";
import Cookies from "js-cookie";
import Style from "./RegisterStep2.module.css";
import Arrow from "../../changePassword/imgs/Arrow5.png"
import {Link} from "react-router-dom";
import Countdown from "react-countdown";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {getRoutesItems} from "../../../RoutesList/RoutesList"
import {useTranslation} from "react-i18next";
import {initializeTitlesWithValue} from "../../../global/Titles";
import {MoonLoader} from "react-spinners";
import {css} from "@emotion/react";

export default function RegisterStep2() {

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={generateCaptcha()}>
            <RegisterStep2Component/>
        </GoogleReCaptchaProvider>
    );
}

function RegisterStep2Component() {
    const history = useHistory();
    const [t, i18n] = useTranslation('main');
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [complete, setComplete] = useState(false);
    const queryStringes = queryString.parse(window.location.search);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("rgb(0,30,255)");
    const sp = new URLSearchParams(queryStringes);


    useEffect(() => {
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Register | Enter Code")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("ثبت نام | وارد کردن کد ارسالی")
        }
    }, [])

    // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css`
      display: flex;
      margin: 0 auto;
      border: 10px #ff0000;
      //z-index: 99999;
    `;


    const onResendCode = async () => {
        setLoading(true)
        const url = queryString.parse(window.location.search);
        let phone = url.EmailOrPhone;
        var axios = require('axios');
        const recaptchaToken = await executeRecaptcha("login_page");
        var data = JSON.stringify({
            "isToVerify": true,
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
                NotificationManager.success(response.data.message);
                setComplete(false);
                setLoading(false)
                setTimeout(function () {

                    window.location = window.location.pathname;
                }, 3000);

                // console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            });

    }

    /// Enter Key ////
    const enterKey = (event) => {
        if (event.keyCode === 13) {
            onSubmit();
        }
    }
    const onSubmit = async () => {
        setLoading(true)
        const url = queryString.parse(window.location.search);
        const recaptchaToken = await executeRecaptcha("login_page");
        let phone = url.phone;
        let code = $("#code").val();
        let data = JSON.stringify({
            "captchaToken": recaptchaToken,
            "code": $("#ssn-1").val() + $("#ssn-2").val() + $("#ssn-3").val() + $("#ssn-4").val() + $("#ssn-5").val() + $("#ssn-6").val(),
        });
        console.log(data)
        var config = {
            method: 'post',
            url: generateURL('/User/VerifyCode'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        let axios = require('axios');
        axios.defaults.withCredentials = true;
        axios(config)
            .then(function (response) {
                console.log(response);
                setLoading(false)
                NotificationManager.success(response.data.message, '', 500);
                let states = response.data.data.states;
                let bool = true;
                setTimeout(function () {
                    for (let key in states) {
                        if (states[key].name === "IsReadyToSetPass") {
                            if (states[key].value === true) {
                                history.push({
                                    pathname: getRoutesItems().registerStep3.route,
                                    search: "lang=" + sp.get("lang"),

                                })
                                bool = false;
                            }
                        }
                    }
                }, 1000)

            })
            .catch(function (error) {
                setLoading(false)
                console.log(error.response.data.Message)
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


    //// handle change input ////
    const numOfFields = 6;

    const handleChange = e => {

        const {maxLength, value, name} = e.target;
        const [fieldName, fieldIndex] = name.split("-");
        // Check if they hit the max character length
        if (value.length >= maxLength) {
            // Check if it's not the last input field
            if (parseInt(fieldIndex, 10) < 6) {
                // Get the next input field
                const nextSibling = document.querySelector(
                    `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                );

                // If found, focus the next field
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
        }
    }


    const renderTime = ({remainingTime}) => {
        if (remainingTime === 0) {
            return (
                <div className="timer">
                    <div className="text" style={{fontSize: "12px"}}>{t("authentication.signup.time_to_resend_code")}</div>
                    <div className="value">90</div>
                    <div className="text" style={{fontSize: "12px"}}>{t("authentication.signup.seconds")}</div>
                </div>
            )
        }

        return (
            <div className="timer">
                <div className="text" style={{fontSize: "12px"}}>{t("authentication.signup.time_to_resend_code")}</div>
                <div className="value">{remainingTime}</div>
                <div className="text" style={{fontSize: "12px"}}>{t("authentication.signup.seconds")}</div>
            </div>
        );
    };


    // Restart callBack //
    const onComplete = () => {
        setComplete(true);

        return [false, 1000]

    }
    return (
        <div>
            <main className={Style.main + " text-center"}>
                <div className="container">
                    <div className={Style.passwordBox}>
                        <h3>{t("authentication.signup.enter_your_information_step3")}</h3>
                        <div className={"row"} dir={'ltr'}>
                            <div className={Style.centerItem + " col-12 col-md-4 offset-md-4 w-100 mx-auto"}>

                                <div>
                                    <CountdownCircleTimer
                                        isPlaying
                                        size={180}
                                        duration={90}
                                        colors={[["#FF2B00", 0.20], ["#FFA700", 0.20], ["#FFE500", 0.20], ["#2D9600", 0.20], ["#0010DD", 0.20]]}
                                        onComplete={onComplete}
                                    >
                                        {renderTime}
                                    </CountdownCircleTimer>
                                </div>
                                {
                                    complete === true ?
                                        <a onClick={onResendCode}
                                           className={Style.sendAgain + " my-2"}>{t("authentication.signup.resendCode")}</a>
                                        : null
                                }


                            </div>
                        </div>
                        <div className={Style.passwordInput + " pt-2 dir-rtl"} onKeyUp={(e) => enterKey(e)}>
                            <button onClick={onSubmit} className="form-control d-inline btn mx-2">
                                <img src={Arrow} alt=""/>
                            </button>
                            <input id={"ssn-6"} name="ssn-6" maxLength="1" type="text" className="form-control d-inline"
                                   onChange={handleChange}/>
                            <span>-</span>
                            <input id={"ssn-5"} name="ssn-5" maxLength="1" type="text" className="form-control d-inline"
                                   onChange={handleChange}/>
                            <span>-</span>
                            <input id={"ssn-4"} name="ssn-4" maxLength="1" type="text" className="form-control d-inline"
                                   onChange={handleChange}/>
                            <span>-</span>
                            <input id={"ssn-3"} name="ssn-3" maxLength="1" type="text" className="form-control d-inline"
                                   onChange={handleChange}/>
                            <span>-</span>
                            <input id={"ssn-2"} name="ssn-2" maxLength="1" type="text" className="form-control d-inline"
                                   onChange={handleChange}/>
                            <span>-</span>
                            <input id={"ssn-1"} name="ssn-1" maxLength="1" type="text" className="form-control d-inline"
                                   onChange={handleChange}/>

                        </div>
                        <div className={Style.passwordHelp + " pt-2"}>
                            <Link to={{pathname: getRoutesItems().loginStep1.route}} href=""
                                  className={Style.editNumber + " change-dir change-text mx-auto"}>{t("authentication.signup.wrong_email_or_phone")}</Link>
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
    );
}