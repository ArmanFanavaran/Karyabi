import Style from "./requests.module.css";
import {serverTimeToNewsDate} from "../../global/TimeConverter";
import {Link} from "react-router-dom";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {NotificationContainer} from "react-notifications";
import * as React from "react";
import {useEffect, useState} from "react";
import queryString from "query-string";
import {generateURL} from "../../global/Requests";


export default function Requests() {
    const [language, setLanguage] = useState();
    const [companies, setCompanies] = useState([]);


    useEffect(function (){
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);

        let axios = require('axios');
        axios.defaults.withCredentials = true;

        /* get my company requests*/
        let companies_data = {
            "roleId": 5,
            "page": 1,
            "pageSize": 100,
            "logoPicDetail": {
                "heights": [
                    200
                ],
                "widths": [
                    200
                ],
                "qualities": [
                    90
                ]
            },
            "mainPicDetail": {
                "heights": [
                    200
                ],
                "widths": [
                    200
                ],
                "qualities": [
                    90
                ]
            },
            "keyWord": "",
            "provinceIds": [],
            "cityIds": [],
            "companyCategoryIds": [],
            "economicCode": "",
            "fixedphone": "",
            "mobilePhone": "",
            "userId": 0,
            "isSortByInsertTimeAsc": false,
            "isSortByInsertTimeDesc": false,
            "isSortByScoreAsc": false,
            "isSortByScoreDesc": true,
            "fromRegisterationDate": null,
            "toRegisterationDate": null
        }
        let companies_config = {
            method: 'post',
            url: generateURL("/Company/GetCompanyListPanelSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(companies_data)
        };
        axios(companies_config).then(function (response) {
            console.log(response.data.data)
            setCompanies(response.data.data);

        }).catch(function (error) {
            console.log(error);
            console.log(error.response);
            // let errors = error.response.data.errors;
            // if (errors != null) {
            //     Object.keys(errors).map((key, i) => {
            //         for (var i = 0; i < errors[key].length; i++) {
            //             NotificationManager.error(errors[key][i]);
            //         }
            //     });
            //
            // } else if (error.response.data.message != null && error.response.data.message != undefined) {
            //     NotificationManager.error(error.response.data.message, '', 1000);
            // } else {
            //     NotificationManager.error(error.response.data.Message, '', 1000);
            //
            // }
        });

    }, []);

    return(
        <div>
            {   companies.length > 0 &&
                <div className={'w-100'}>
                    <h5 className={'change-text'}>درخواست‌های ثبت شرکت</h5>
                    <div className={"table-responsive change-dir mt-4"}>
                        <table className={"table change-text " + Style.table}>
                            <thead>
                            <tr>
                                <th>نام شرکت</th>
                                <th>وضعیت تایید</th>
                                <th>تاریخ ثبت</th>
                                <th>ویرایش شرکت</th>
                            </tr>
                            </thead>
                            <tbody>
                            { companies.map((item) => (
                                <tr>
                                    <td><h6>{language=='fa' ? item.name : item.englishName}</h6></td>
                                    <td>{
                                        item.isConfirmed ?
                                            <span className={'text-success font-weight-bold'}>تایید شده</span> :
                                            <span className={'text-danger font-weight-bold'}>تایید نشده</span>
                                    }</td>
                                    <td>{serverTimeToNewsDate(item.lastInsert)}</td>
                                    <td>
                                        <div className={'d-flex justify-content-center'}>
                                            <Link to={{
                                                pathname:getRoutesItems().updateCompany.route,
                                                search: "lang=" + language + "&company=" + item.id,
                                            }}
                                                  className={'btn btn-warning'}><i className="bi bi-pencil-square"></i></Link>
                                        </div>
                                    </td>

                                </tr>
                            ))
                            }


                            </tbody>
                        </table>
                    </div>
                </div>
            }
            <NotificationContainer/>

        </div>
    );
}