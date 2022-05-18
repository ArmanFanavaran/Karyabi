import {Router, Switch, Route, Link} from 'react-router-dom'
import {getRoutesItems} from "../../RoutesList/RoutesList";
import ChangePassword from "../../authentication/changePassword/ChangePassword";
import Controller from "../../authentication/Helper/Controller";
import * as React from "react";
import Style from './DashboardParent.module.css'

import SentResumes from "../sentResumes/SentResumes";
import {useEffect} from "react";
import {generateURL} from "../../global/Requests";
import {NotificationManager} from "react-notifications";


export default function Dashboard() {
    useEffect(function (){
        let axios = require('axios');
        axios.defaults.withCredentials = true;

        let config_data = {
            "heights": [
                500
            ],
            "widths": [
                400
            ],
            "qualities": [
                60
            ]
        }

        let config = {
            method: 'post',
            url: generateURL("/Resume/GetLastResume"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(config_data)
        };
        console.log(config_data)

        axios(config).then(function (response) {
            console.log(response.data)
            // setResumes(response.data.data);
        }).catch(function (error) {
            console.log(error);
            let errors = error.response.data.errors;
            if (errors != null) {
                Object.keys(errors).map((key, i) => {
                    for (var i = 0; i < errors[key].length; i++) {
                        NotificationManager.error(errors[key][i]);
                    }
                });

            } else if (error.response.data.message != null && error.response.data.message != undefined) {
                NotificationManager.error(error.response.data.message, '', 1000);
            } else {
                NotificationManager.error(error.response.data.Message, '', 1000);

            }
        })
    } , []);
    return (
        <div className={Style.main}>
            <div className={"container my-4"}>
                <div className={"row w-100 change-dir"}>
                    <div className={"col-xl-3 col-12"}>
                        <div className={Style.nav + " p-3"}>
                            <div className={""}>
                                <div className={"d-flex justify-content-center"}>
                                    <img className={Style.profileImage}/>
                                </div>
                                <h6 className={Style.profileName + " mt-3"}>سیده مرضیه مهدوی مرتضوی</h6>
                                <p className={"text-center text-secondary"}>09223763054</p>
                            </div>
                            <hr/>
                            <ul className={"nav flex-column"}>
                                <li className={"nav-item w-100"}><Link className={"text-center d-flex justify-content-center text-secondary"} to={getRoutesItems().sentResumes.route}>رزومه‌های ارسال شده</Link></li>
                                <hr/>

                            </ul>
                        </div>
                    </div>
                    <div className={"col-xl-9 col-12 p-4"}>

                        <Route path={"/"} exact component={ProfileInfo}/>
                        <Route path={getRoutesItems().sentResumes.route} exact component={SentResumes}/>
                    </div>
                </div>
            </div>



        </div>
    )
}

export function ProfileInfo() {
    return (<h4>Profile Info</h4>)
}