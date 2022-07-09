import Style from "./SentResumes.module.css"
import {Link} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {generateURL} from "../../global/Requests";
import {NotificationContainer, NotificationManager} from "react-notifications";
import queryString from "query-string";
import {serverTimeToNewsDate} from "../../global/TimeConverter";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import $ from 'jquery';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2'


export default function JobOfferRequests() {
    const [company, setCompany] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [jobOffers, setJobOffers] = useState([]);
    const [jobOfferFilter, setJobOfferFilter] = useState(-1);
    const [nameFilter, setNameFilter] = useState("");
    const [language, setLanguage] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [count, setCount] = useState(0);

    const getResumesByFilter = (jobOfferId, name) => {
        let axios = require('axios');
        axios.defaults.withCredentials = true;


        /** get received Resumes */
        let config_data = {
            "roleId": 8,
            "roleAccountId": company,
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
            "pageSize": 10000,
            "jobOfferOwner": "Company",
            "jobOfferOwnerId": company,
            "jobofferId": jobOfferId,
            "userId": 0,
            "jobOfferTitle": "",
            "companyName": "",
            "userFNameOrLname": name,
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
        // console.log(config_data)

        axios(config).then(function (response) {
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

    }

    const onChangeJobOfferFilter = () => {
        let value = parseInt($("#joboffer_select").val());
        setJobOfferFilter(value);

        getResumesByFilter(value, nameFilter);
    }

    const onChangeNameFilter = () => {
        let value = $("#name_input").val();
        setNameFilter(value);

        getResumesByFilter(jobOfferFilter, value);
    }

    const onApprove = (id, index) => {
        let axios = require('axios');
        axios.defaults.withCredentials = true;
        /** get received Resumes */

        Swal.fire({
            title: 'آیا از تایید این رزومه اطمینان دارید؟',
            text: "پیغامی برای متقاضی بگذارید",
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'تایید و ارسال',
            cancelButtonText: 'لغو',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                let message = result.value;
                let axios = require('axios');
                axios.defaults.withCredentials = true;

                /* get job offers list */
                let data = {
                    "id": id,
                    "roleId": 8,
                    "roleAccountId": company,
                    "status": true,
                    "message": message
                }
                let config = {
                    method: 'post',
                    url: generateURL("/JobOfferRequest/ChangeApproveOrRejectStatus"),
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify(data)
                };
                axios(config)
                    .then(function (response) {
                        console.log(response.data)
                        let array = [...resumes];
                        array[index].isApproved = true;
                        setResumes(array);

                    })
                    .catch(function (error) {
                        console.log(error)
                        if (error.response !== null && error.response.undefined) {
                            let errors = error.response.data.errors;
                            if (errors != null) {
                                Object.keys(errors).map((key, i) => {
                                    for (var i = 0; i < errors[key].length; i++) {
                                        NotificationManager.error(errors[key][i], '', 1000);
                                    }
                                });

                            } else if (error.response.data.message != null && error.response.data.message != undefined) {
                                NotificationManager.error(error.response.data.message, '', 1000);
                            } else {
                                NotificationManager.error(error.response.data.Message, '', 1000);

                            }
                        }

                    });
            }
        })

    }

    const onReject = (id, index) => {
        let axios = require('axios');
        axios.defaults.withCredentials = true;
        /** get received Resumes */

        Swal.fire({
            title: 'آیا از رد کردن این رزومه اطمینان دارید؟',
            text: "پیغامی برای متقاضی بگذارید",
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'ردکردن و ارسال',
            cancelButtonText: 'لغو',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                let message = result.value;
                let axios = require('axios');
                axios.defaults.withCredentials = true;

                /* get job offers list */
                let data = {
                    "id": id,
                    "roleId": 8,
                    "roleAccountId": company,
                    "status": false,
                    "message": message
                }
                let config = {
                    method: 'post',
                    url: generateURL("/JobOfferRequest/ChangeApproveOrRejectStatus"),
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify(data)
                };
                axios(config)
                    .then(function (response) {
                        console.log(response.data)
                        let array = [...resumes];
                        array[index].isRejected = true;
                        setResumes(array);

                    })
                    .catch(function (error) {
                        console.log(error)
                        if (error.response !== null && error.response.undefined) {
                            let errors = error.response.data.errors;
                            if (errors != null) {
                                Object.keys(errors).map((key, i) => {
                                    for (var i = 0; i < errors[key].length; i++) {
                                        NotificationManager.error(errors[key][i], '', 1000);
                                    }
                                });

                            } else if (error.response.data.message != null && error.response.data.message != undefined) {
                                NotificationManager.error(error.response.data.message, '', 1000);
                            } else {
                                NotificationManager.error(error.response.data.Message, '', 1000);

                            }
                        }

                    });
            }
        })
    }

    useEffect(function (){
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);
        let companyId = parseInt(url.company);
        setCompany(companyId);

        let axios = require('axios');
        axios.defaults.withCredentials = true;

        /* get job offers list */
        let jobOfferData = {
            "roleId": 8,
            "roleAccountId": companyId,
            "page": 1,
            "pageSize": 1000,
            "heights": [
                200
            ],
            "widths": [
                200
            ],
            "qualities": [
                90
            ],
            "keyword": null,
            "ownerId": companyId,
            "owner": "Company",
            "genderIds": null,
            "isAdaptiveSalary": false,
            "minSalaryStatusId": 0,
            "maxSalaryStatusId": 12,
            "degreeIds": null,
            "typeId": 1,
            "provinceIds": null,
            "militaryStatusIds": null,
            "categoryIds": null,
            "isFullTime": false,
            "isPartTime": false,
            "isRemote": false,
            "isInternship": false,
            "isPromotionPossible": false,
            "isInsurancePossible": false,
            "isCoursePossible": false,
            "isFlexibleWorkTimePossible": false,
            "isCommutingServicePossible": false,
            "isFreeFoodPossible": false,
            "sortBye": 0
        }
        let jobOffer_config = {
            method: 'post',
            url: generateURL("/JobOffer/GetJobOfferListPanelSide"),
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(jobOfferData)
        };
        axios(jobOffer_config)
            .then(function (response) {
                let data = response.data.data;
                setJobOffers(data);

            })
            .catch(function (error) {
                console.log(error)
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i], '', 1000);
                        }
                    });

                } else if (error.response.data.message != null && error.response.data.message != undefined) {
                    NotificationManager.error(error.response.data.message, '', 1000);
                } else {
                    NotificationManager.error(error.response.data.Message, '', 1000);

                }
            });

        /** get received Resumes */
        let config_data = {
            "roleId": 8,
            "roleAccountId": companyId,
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
            "pageSize": 10000,
            "jobOfferOwner": "Company",
            "jobOfferOwnerId": companyId,
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
        // console.log(config_data)

        axios(config).then(function (response) {
            console.log("resumes")
            console.log(response.data.data)
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
        // console.log(config_data)

        axios(count_config).then(function (response) {
            // console.log(response.data)
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
            <h5 className={"change-dir change-text " + Style.pageTitle}>رزومه‌های دریافت شده</h5>
            <div className={"change-dir change-text w-100 row mt-5"}>
                <label className={Style.filterLabel + "  col-xl-3"}>فیلتر بر اساس آگهی:</label>
                <select id={"joboffer_select"} className={'form-control col-12 col-xl-7'} onChange={onChangeJobOfferFilter}>
                    <option value={0}>همه آگهی‌ها</option>
                    {
                        jobOffers.map((item) => (
                            <option value={item.jobOffer.id}>
                                {language === 'fa'  ? item.jobOffer.title : item.jobOffer.titleEnglish}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className={"change-dir change-text w-100 row mt-3"}>
                <label className={Style.filterLabel + "  col-12 col-xl-3"}>فیلتر بر اساس نام متقاضی:</label>
                <input id={"name_input"} type={"text"} className={'form-control col-12 col-xl-7'} onChange={onChangeNameFilter}/>


            </div>
            <div className={"table-responsive change-dir mt-4"}>
                <table className={"table change-text " + Style.table}>
                    <thead>
                    <tr>
                        <th>نام متقاضی</th>
                        <th>عنوان شغل</th>
                        <th>تاریخ ارسال رزومه</th>
                        <th>وضعیت تایید</th>
                        <th>تایید/رد</th>
                        <th>مشاهده</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        resumes.length > 0 ? resumes.map((item, index) => (
                                <tr>
                                    <td>{language ==='fa' ? item.userFirstName + " " + item.userLastName :  item.userFirstNameEnglish + " " + item.userLastNameEnglish}</td>
                                    <td><Link to={{
                                        pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                        search: "lang=" + language + "&id=" + item.jobOfferId
                                    }}>{language ==='fa' ? item.jobOfferTitle : item.jobOfferTitleEnglish}</Link></td>
                                    <td>{serverTimeToNewsDate(item.lastUpdate)}</td>
                                    <td className={Style.approveStatus}>
                                        {item.isApproved && <span className={'bg-success rounded p-1'}>قبول شده</span>}
                                        {item.isRejected && <span className={'bg-danger rounded p-1'}>رد شده</span>}
                                        {(!item.isRejected && !item.isApproved)&& <span className={'bg-secondary rounded  p-1'}>بررسی نشده</span>}
                                    </td>
                                    <td>
                                        { (!item.isRejected && !item.isApproved)&&
                                            <div className={"d-flex "}>
                                                <button className={"btn btn-success mx-2"} onClick={() =>onApprove(item.id, index)}><i className="bi bi-check-lg"></i></button>
                                                <button className={"btn btn-danger mx-2"} onClick={() => onReject(item.id, index)}><i className="bi bi-x-lg"></i></button>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        <button className={"btn btn-info mx-2"}><i className="bi bi-eye-fill"></i></button>
                                    </td>

                                </tr>
                            )):
                            <h5 className={'my-5 text-center text-secondary d-block'}>شما تا به حال رزومه‌ای دریافت نکرده‌اید</h5>
                    }
                    </tbody>
                </table>
                {/*<Table/>*/}
            </div>
            <NotificationContainer/>
        </div>
    )
}