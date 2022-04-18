import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import $ from 'jquery'
import {generateURL} from "../../../global/Requests";
import {useEffect, useState} from "react";
import queryString from "query-string";
import {useHistory} from "react-router";
import Style from "./RegisterStep3.module.css"
import {useTranslation} from "react-i18next";
import {getSizeImageItems} from "../../../SizeImageList/SizeImageList";
import {getCookiesItems} from "../../../../components/CookiesList/CookiesList";
import {MoonLoader} from "react-spinners";
import {css} from "@emotion/react";
import Cookies from "js-cookie";
import {getRoutesItems} from "../../../RoutesList/RoutesList";

export default function RegisterStep3() {
    const [t, i18n] = useTranslation('main');
    const history = useHistory();
    // const { executeRecaptcha } = useGoogleReCaptcha();
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("rgb(0,30,255)");
    // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css`
      display: flex;
      margin: 0 auto;
      border: 10px #ff0000;
      //z-index: 99999;
    `;
    /// Enter Key ////
    const enterKey = (event) => {
        if (event.keyCode === 13) {
            onSubmit();
        }
    }
    /// Lang ///
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    const onSubmit = async () => {
        setLoading(true)
        // const recaptchaToken = await executeRecaptcha("register_page");
        let newPassword = $("#newPassword").val();
        let repeatNewPassword = $("#repeatNewPassword").val();

        var data = JSON.stringify({
            "pass": newPassword,
            "repeatPass": repeatNewPassword,
            "heights": [getSizeImageItems().UserNavbarPic.Heights],
            "widths": [getSizeImageItems().UserNavbarPic.Widths],
            "qualities": [getSizeImageItems().UserNavbarPic.Qualities]
        });

        console.log(data)
        var config = {
            method: 'post',
            url: generateURL('/User/SetPass'),
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
                    history.push({
                        pathname: getRoutesItems().mainPage.route,
                        search: "lang=" + sp.get("lang")

                    })
                    window.location.reload();
                }, 1500);


            })
            .catch(function (error) {
                setLoading(false)
                console.log(error.response)
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

    return (
        <div>
            <main className={Style.main + " text-center"} onKeyUp={(e) => enterKey(e)}>
                <div className="container">
                    <h4>{t("authentication.signup.enter_your_information_step4")}</h4>
                    <div className={Style.inputs + " change-dir change-text"}>
                        <input type="password" id={'newPassword'} className="form-control"
                               placeholder={t("authentication.change-pass.new_password")}/>
                        <input type="password" id={'repeatNewPassword'} className="form-control"
                               placeholder={t("authentication.change-pass.re_new_password")}/>
                        <button onClick={onSubmit}
                                className={Style.button + " btn d-block"}>{t("authentication.change-pass.send")}</button>
                        <div className={Style.passRules + " change-dir change-text"}>

                            <p>* {t("authentication.signup.password_contain1")}</p>
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