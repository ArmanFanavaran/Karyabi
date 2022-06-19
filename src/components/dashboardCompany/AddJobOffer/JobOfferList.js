import Style from "./addJobOffer.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {Link} from "react-router-dom";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {serverTimeToNewsDate} from "../../global/TimeConverter";
import Edit from "../../dashboard/sentResumes/imgs/edit.png";
import Eye from "../../dashboard/sentResumes/imgs/eye.png";
import * as React from "react";
import {useEffect, useState} from "react";
import queryString from "query-string";
import {generateURL} from "../../global/Requests";
import {NotificationManager} from "react-notifications";
import {NotificationContainer} from "react-notifications";
import Swal from 'sweetalert2';



export default function JobOfferList() {
    const [language, setLanguage] = useState();
    const [companyId, setCompanyId] = useState();
    const [jobOffers, setJobOffers] = useState([]);

    const onSetVisible = (id, index) => {
        let axios = require('axios');
        axios.defaults.withCredentials = true;
        let data = {
            "id": id,
            "roleId": 8,
            "roleAccountId": companyId,
            "status": true
        }
        let config = {
            method: 'post',
            url: generateURL("/JobOffer/setIsVisible"),
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(data)
        };
        axios(config)
            .then(function (response) {
                console.log(response.data)
                let job_offers = [...jobOffers];
                job_offers[index].jobOffer.isVisible = true;
                setJobOffers(job_offers);
                // setJobOffers(response.data.data);

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
    }

    const onSetUnVisible = (id, index) => {
        let axios = require('axios');
        axios.defaults.withCredentials = true;
        let data = {
            "id": id,
            "roleId": 8,
            "roleAccountId": companyId,
            "status": false
        }
        let config = {
            method: 'post',
            url: generateURL("/JobOffer/setIsVisible"),
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(data)
        };
        axios(config)
            .then(function (response) {
                console.log(response.data)
                let job_offers = [...jobOffers];
                job_offers[index].jobOffer.isVisible = false;
                setJobOffers(job_offers);
                // setJobOffers(response.data.data);

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
    }

    const onSetEmergency = (id, index) => {
        let axios = require('axios');
        axios.defaults.withCredentials = true;
        let data = {
            "id": id,
            "roleId": 8,
            "roleAccountId": companyId,
            "status": true
        }
        let config = {
            method: 'post',
            url: generateURL("/JobOffer/setIsEmergency"),
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(data)
        };
        axios(config)
            .then(function (response) {
                console.log(response.data)
                let job_offers = [...jobOffers];
                job_offers[index].jobOffer.isEmergency = true;
                setJobOffers(job_offers);

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
    }

    const onSetUnEmergency = (id, index) => {
        let axios = require('axios');
        axios.defaults.withCredentials = true;
        let data = {
            "id": id,
            "roleId": 8,
            "roleAccountId": companyId,
            "status": false
        }
        let config = {
            method: 'post',
            url: generateURL("/JobOffer/setIsEmergency"),
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(data)
        };
        axios(config)
            .then(function (response) {
                console.log(response.data)
                let job_offers = [...jobOffers];
                job_offers[index].jobOffer.isEmergency = false;
                setJobOffers(job_offers);

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
    }

    const onRemoveClicked = (id, index) => {
        Swal.fire({
            title: 'آیا از حذف این آگهی اطمینان دارید؟',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#8d8d8d',
            confirmButtonText: 'بله',
            cancelButtonText: 'لغو',
        }).then((result) => {
            if (result.isConfirmed) {

                /* remove jobOffer */
                let axios = require('axios');
                axios.defaults.withCredentials = true;
                let data = {
                    "id": id,
                    "roldeId": 8,
                    "roleAccountId": companyId,
                    "heights": [
                        600,
                        500
                    ],
                    "widths": [
                        400,
                        300
                    ],
                    "qualities": [
                        70,
                        60
                    ]
                }
                let config = {
                    method: 'post',
                    url: generateURL("/JobOffer/RemoveJobOffer"),
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify(data)
                };
                axios(config)
                    .then(function (response) {
                        console.log(response.data)
                        let job_offers = [...jobOffers];
                        job_offers.splice(index, 1);
                        setJobOffers(job_offers);
                        NotificationManager.success("آگهی با موفقیت حذف شد.", '', 2000);

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

            }
        })
    }

    useEffect(function (){
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);
        setCompanyId(parseInt(url.company));

        let axios = require('axios');
        axios.defaults.withCredentials = true;

        /* get job offers list */
        let jobOfferData = {
            "roleId": 8,
            "roleAccountId": parseInt(url.company),
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
            "ownerId": parseInt(url.company),
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
                console.log(data)
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
    }, [])

    return (
        <div className={"change-dir"}>
            <div className={"d-flex change-dir"}><Link to={{
                pathname:getRoutesItems().addJobOfferByCompany.route,
                search: "lang=" +language + "&company=" + companyId
            }}
                className={'btn ' + Style.addJobOfferBtn}>
                <span>ثبت آگهی جدید</span>
                <i className={'bi bi-plus-lg mx-1'}></i>
            </Link></div>
            <div className={"table-responsive change-dir mt-4"}>
                <table className={"table change-text " + Style.table}>
                    <thead>
                    <tr>
                        <th>عنوان آگهی</th>
                        <th>آخرین تغییر</th>
                        <th>ویرایش</th>
                        <th>آکهی فوری</th>
                        <th>نمایش/عدم‌نمایش</th>
                        <th>حذف</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        jobOffers.map((item, index) => (
                            <tr>
                                <td><h6>{language === 'fa'  ? item.jobOffer.title : item.jobOffer.titleEnglish}</h6></td>
                                <td>{serverTimeToNewsDate(item.jobOffer.timeOrder)}</td>
                                <td><Link to={{
                                    pathname:getRoutesItems().addJobOfferByCompanyStep2.route,
                                    search: "lang=" +language + "&company=" + companyId + "&joboffer=" + item.jobOffer.id,
                                }}
                                    className={'btn btn-warning'}><i className="bi bi-pencil-square"></i></Link></td>
                                <td><div className={'d-flex justify-content-center'}>
                                    {item.jobOffer.isEmergency ?
                                        <button className='btn btn-danger' onClick={()=>onSetUnEmergency(item.jobOffer.id, index)}><i className="bi bi-lightbulb-fill"></i></button>:
                                        <button className='btn btn-outline-danger' onClick={()=>onSetEmergency(item.jobOffer.id, index)}><i className="bi bi-lightbulb"></i></button>
                                    }
                                </div></td>
                                <td><div className={'d-flex justify-content-center'}>
                                    {item.jobOffer.isVisible ?
                                        <button className={'btn btn-primary'} onClick={()=>onSetUnVisible(item.jobOffer.id, index)}><i className="bi bi-toggle-on"></i></button>:
                                        <button className={'btn btn-secondary'} onClick={()=>onSetVisible(item.jobOffer.id, index)}><i className="bi bi-toggle-off"></i></button>
                                    }
                                </div></td>
                                <td><button className={'btn btn-danger'} onClick={()=>onRemoveClicked(item.jobOffer.id, index)}><i className="bi bi-trash"></i></button></td>
                            </tr>
                        ))
                    }


                    </tbody>
                </table>
            </div>
            <NotificationContainer/>
        </div>
    )
}