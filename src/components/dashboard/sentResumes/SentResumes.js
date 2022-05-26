import Style from "./SentResumes.module.css"
import {Link} from "react-router-dom";
import Edit from "../imgs/edit.png"
import Eye from "../imgs/eye.png"
import {useEffect, useState} from "react";
import {generateURL} from "../../global/Requests";
import {NotificationContainer, NotificationManager} from "react-notifications";
import queryString from "query-string";
import {serverTimeToNewsDate} from "../../global/TimeConverter";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {Table} from 'react-infinite-table';
import * as React from "react";

export default function SentResumes() {
    const [resumes, setResumes] = useState([]);
    const [language, setLanguage] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [count, setCount] = useState(0);

    // const tableCols = [
    //     {
    //         cellRenderer: ({ columnIndex, column, rowData, rowIndex, className }) => {
    //             return (
    //                 <td>
    //                     {rowData.xxx}
    //                 </td>
    //             )
    //         },
    //         headerRenderer: ({ columnIndex, column, className }) => {
    //             return (
    //                 <tr>
    //                     {column.name}
    //                 </tr>
    //             )
    //         }
    //     }
    // ]

    const getMoreResumes = () => {
        console.log("morrrrrrrrrrrrrrrrre")
        let axios = require('axios');
        axios.defaults.withCredentials = true;

        let config_data = {
            "roleId": 5,
            "heights": [
                200
            ],
            "widths": [
                200
            ],
            "qualities": [
                90
            ],
            "page": page + 1,
            "pageSize": pageSize,
            "jobOfferOwner": "Company",
            "jobOfferOwnerId": 0,
            "jobofferId": 0,
            "userId": 0,
            "jobOfferTitle": "",
            "companyName": "",
            "userFNameOrLname": "",
            "fromDate": null,
            "toDate": null,
            "isSortByTimeDesc": false,
            "isSortByTimeAsec": false
        }

        let config = {
            method: 'post',
            url: generateURL("/JobOfferRequest/GetJobOfferRequestList"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(config_data)
        };

        let lastPage = Math.ceil(count / pageSize); // the last page
        let next_page = page + 1;

        if (lastPage >= next_page) {

            /** get Resumes */
            axios(config).then(function (response) {
                let data = response.data.data;
                let resumesData = [...resumes]
                for (let i = 0; i < data.length; i++) {
                    resumesData.push(data[i])

                }//end for
                setResumes(resumesData);
                setPage(page + 1);
            }).catch(function (error) {
                console.log(error);
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i]);
                        }
                    });

                } else if (error.response.data.message != null) {
                    NotificationManager.error(error.response.data.message, '', 1000);
                } else {
                    NotificationManager.error(error.response.data.Message, '', 1000);

                }
            });

        }

    }

    useEffect(function (){
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);

        let axios = require('axios');
        axios.defaults.withCredentials = true;

        let config_data = {
            "roleId": 5,
            "heights": [
                200
            ],
            "widths": [
                200
            ],
            "qualities": [
                90
            ],
            "page": 1,
            "pageSize": 100,
            "jobOfferOwner": "Company",
            "jobOfferOwnerId": 0,
            "jobofferId": 0,
            "userId": 0,
            "jobOfferTitle": "",
            "companyName": "",
            "userFNameOrLname": "",
            "fromDate": null,
            "toDate": null,
            "isSortByTimeDesc": false,
            "isSortByTimeAsec": false
        }

        /** get Resumes */
        let config = {
            method: 'post',
            url: generateURL("/JobOfferRequest/GetJobOfferRequestList"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(config_data)
        };
        console.log(config_data)

        axios(config).then(function (response) {
            console.log(response.data)
            setResumes(response.data.data);
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
        });

        /** get Count */
        let count_config = {
            method: 'post',
            url: generateURL("/JobOfferRequest/GetJobOfferRequestListCount"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(config_data)
        };
        console.log(config_data)

        axios(count_config).then(function (response) {
            console.log(response.data)
            setCount(response.data.data);
        }).catch(function (error) {
            console.log(error);
            let errors = error.response.data.errors;
            if (errors != null) {
                Object.keys(errors).map((key, i) => {
                    for (var i = 0; i < errors[key].length; i++) {
                        NotificationManager.error(errors[key][i]);
                    }
                });

            } else if (error.response.data.message != null) {
                NotificationManager.error(error.response.data.message, '', 1000);
            } else {
                NotificationManager.error(error.response.data.Message, '', 1000);

            }
        });


    }, []);

    return (
        <div>
            <h5 className={"change-dir change-text " + Style.pageTitle}>رزومه‌های ارسال شده</h5>
            <div className={"table-responsive change-dir mt-4"}>
                <table className={"table change-text " + Style.table}>
                    <thead>
                    <tr>
                        <td>عنوان شغل</td>
                        <td>نام شرکت</td>
                        <td>تاریخ ارسال</td>
                        <td>ویرایش رزومه</td>
                        <td>مشاهده</td>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        resumes.length > 0 && resumes.map((item, index) => (
                            <tr>
                                <td><Link to={{
                                    pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                    search: "lang=" + language + "&" + "id=" + item.jobOfferId
                                }}>{language ==='fa' ? item.jobOfferTitle : item.jobOfferTitleEnglish}</Link></td>
                                <td>{language ==='fa' ? item.ownerName : item.ownerEnglishName}</td>
                                <td>{serverTimeToNewsDate(item.lastUpdate)}</td>
                                <td><Link className={"btn btn-warning " + Style.editBtn}><img src={Edit}/></Link></td>
                                <td><Link className={"btn btn-info " + Style.editBtn}><img src={Eye}/></Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {/*<Table/>*/}
            </div>
            <NotificationContainer/>
        </div>
    )
}