import Style from "./publicLinks.Module.css";
import {serverTimeToNewsDate} from "../../global/TimeConverter";
import {Link} from "react-router-dom";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {NotificationContainer} from "react-notifications";
import * as React from "react";
import {useEffect, useState} from "react";
import queryString from "query-string";
import {generateURL} from "../../global/Requests";


export default function PublicLinks() {
    const [language, setLanguage] = useState();
    const [links, setLinks] = useState([]);


    useEffect(function (){
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);

        let axios = require('axios');
        axios.defaults.withCredentials = true;

        let config = {
            method: 'get',
            url: generateURL("/PublicLink/GetPublicLinkList"),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(config).then(function (response) {
            console.log(response.data)
            setLinks(response.data.data);

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
            <div className={'w-100'}>
                <h5 className={'change-text'}>درخواست‌های ثبت شرکت</h5>
                <div className={"table-responsive change-dir mt-4"}>
                    <table className={"table change-text " + Style.table}>
                        <thead>
                        <tr>
                            <th>عنوان فارسی</th>
                            <th>عنوان انگلیسی</th>
                            <th>آدرس</th>
                            <th>عنوان فارسی دسته‌بندی</th>
                            <th>عنوان انگلیسی دسته‌بندی</th>
                            <th>ویرایش</th>
                        </tr>
                        </thead>
                        <tbody>
                        { links.map((item) => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.englishName}</td>
                                <td>{item.address}</td>
                                <td>{item.categotryName}</td>
                                <td>{item.categotryNameEnglish}</td>
                                <td>
                                    <div className={'d-flex justify-content-center'}>
                                        <Link to={{
                                            pathname:getRoutesItems().UpdatePublicLinks.route,
                                            search: "lang=" + language + "&id=" + item.id,
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
            <NotificationContainer/>

        </div>
    );
}