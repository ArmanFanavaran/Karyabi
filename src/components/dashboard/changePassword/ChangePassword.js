import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import $ from 'jquery'
import {generateURL} from "../../global/Requests";
import {useState} from "react";
import {useHistory} from "react-router";
import Style from "./ChangePassword.module.css"
import {useTranslation} from "react-i18next";
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";
import {MoonLoader} from "react-spinners";
import {css} from "@emotion/react";
import {getRoutesItems} from "../../RoutesList/RoutesList";

export default function ChangePassword() {
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
    const onSubmit = async () => {
        setLoading(true)
        // const recaptchaToken = await executeRecaptcha("register_page");
        let password = $("#password").val();
        let newPassword = $("#newPassword").val();
        let repeatNewPassword = $("#repeatNewPassword").val();

        var data = JSON.stringify({
            "password": password,
            "newPassword": newPassword,
            "repeatNewPassword": repeatNewPassword,
            "heights":  [getSizeImageItems().UserNavbarPic.Heights],
            "widths":[getSizeImageItems().UserNavbarPic.Widths],
            "qualities": [getSizeImageItems().UserNavbarPic.Qualities]
        });

        console.log(data)
        var config = {
            method: 'post',
            url: generateURL('/User/ChangePass'),
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
                if (response.data.isSuccess) {
                    NotificationManager.success(response.data.message,700);
                    setTimeout(function () {
                        history.push({
                            pathname: getRoutesItems().mainPage.route,
                        })
                    }, 3000)
                } else
                    NotificationManager.error(response.data.message);

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
                    <h4>{t("authentication.change-pass.changePass")}</h4>
                        <div className={Style.inputs + " change-dir change-text"}>
                            <input type="password" id={'password'} className="form-control" placeholder={t("authentication.change-pass.password")}/>
                            <input type="password" id={'newPassword'} className="form-control" placeholder={t("authentication.change-pass.new_password")}/>
                            <input type="password" id={'repeatNewPassword'} className="form-control" placeholder={t("authentication.change-pass.re_new_password")}/>
                            <button onClick={onSubmit} className={Style.button + " btn d-block"}>{t("authentication.change-pass.send")}</button>
                            <div className={Style.passRules + " change-dir change-text"}>

                                <p>{t("authentication.change-pass.password_contain1")}</p>
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