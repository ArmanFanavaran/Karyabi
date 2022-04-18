import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import $ from 'jquery'
import {generateURL} from "../global/Requests";
import {useEffect} from "react";
import queryString from "query-string";
import {useHistory} from "react-router";
import Style from "./Contact.module.css"

export default function ContactAdmin() {
    const history = useHistory();
    // const { executeRecaptcha } = useGoogleReCaptcha();

    const onSubmit = async () => {

        // const recaptchaToken = await executeRecaptcha("register_page");
        let senderEmail = $("#senderEmail").val();
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let subject = $("#subject").val();
        let messege = $("#messege").val();


        let data = JSON.stringify({
            "senderEmail": senderEmail,
            "firstName": firstName,
            "lastName": lastName,
            "subject": subject,
            "messege": messege
        });
        console.log(data)
        var config = {
            method: 'post',
            url: generateURL('user/contactAdmin'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        let axios = require('axios');
        axios(config)
            .then(function (response) {
                console.log(response);
                if (response.data.isSuccess) {
                    NotificationManager.success(response.data.message);
                    setTimeout(function () {
                        history.push({
                            pathname: "/",
                        })
                    }, 3000)
                } else
                    NotificationManager.error(response.data.message);
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error.response)
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i]);
                        }
                    });
                } else
                    NotificationManager.error(error.response.data.Message);


            });
    }

    return (
        <div>
            <main className={Style.main + " text-center"}>
                <div className="container">
                    <h4>ارتباط با ادمین</h4>
                    <form className={'col-12 col-md-8 mx-auto'} action="">
                        <div className={Style.inputs + " row"}>
                            <div className={'col-12 col-md-6'}>
                                <input id="firstName" type="text" className="form-control" placeholder="نام"/>
                            </div>
                            <div className={'col-12 col-md-6'}>
                                <input id="lastName" type="text" className="form-control"
                                       placeholder="نام خانوادگی"/>
                            </div>
                            <div className={'col-12 col-md-6'}>
                                <input id="senderEmail" type="text" className="form-control"
                                       placeholder="ایمیل"/>
                            </div>
                            <div className={'col-12 col-md-6'}>
                                <input id="subject" type="text" className="form-control" placeholder="موضوع"/>
                            </div>
                            <div className={'col-12'}>
                            <textarea className={'form-control'} placeholder={'پیام...'} id={'messege'}
                                      rows={'7'}></textarea>
                            </div>
                            <div className="w-100 text-center mt-4 py-1">
                                <button onClick={onSubmit} type="button" className={Style.button+ " btn d-block"} data-toggle="modal"
                                        data-target="#exampleModalCenter">ارسال
                                </button>
                            </div>


                        </div>
                    </form>
                </div>
                <div id="myModal" className="modal">

                    <div className="modal-content">
                        <p>کد تایید به ایمیل شما فرستاده شد !</p>
                    </div>
                </div>

            </main>
            <NotificationContainer/>
        </div>
    );
}