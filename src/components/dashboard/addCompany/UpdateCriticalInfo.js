import Style from "./addCompany.module.css";
import React, {useEffect, useState} from "react";
import {generateURL} from "../../global/Requests";
import queryString, {parse} from "query-string";
import * as $ from "jquery";
import {NotificationManager, NotificationContainer} from "react-notifications";
import {useHistory} from "react-router-dom";
import {getRoutesItems} from "../../RoutesList/RoutesList";


export default function UpdateCompanyCriticalInfo() {
    const history = useHistory();
    const [language, setLanguage] = useState();
    const [company, setCompany] = useState();
    const [isKnowledge, setIsKnowledge] = useState(false);
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();
    const [name, setName] = useState();
    const [engName, setEngName] = useState();

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const onSubmit = () => {
        let name_input = $("#name_input").val();
        let eng_name = $("#eng_name_input").val();
        let address_input = $("#address_input").val();

        let province_input = $("#province_input").val();
        if (province_input === undefined || province_input === null){
            NotificationManager.error("لظفا استان را انتخاب کنید", "", 2000);
            return;
        }
        else province_input = parseInt(province_input);
        let city_input = parseInt($("#city_input").val());


        let axios = require('axios');
        axios.defaults.withCredentials = true;

        let data = {
            "id": company,
            "roleId": 5,
            // "roleAccountId": company,
            "name": name_input,
            "englishName": eng_name,
            "address": address_input,
            "cityId": city_input,
            "provinceId": province_input,
            "isKnowledgeBase": isKnowledge
        }

        let config = {
            method: 'post',
            url: generateURL("/company/UpdateCompanyCriticalInfo"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };
        console.log(data)

        axios(config).then(function (response) {
            history.push({
                pathname: getRoutesItems().updateCompany.route,
                search: "lang=" + language + "&company=" + company
            });

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
                NotificationManager.error(error.response.data.message, '', 2000);
            } else {
                NotificationManager.error(error.response.data.Message, '', 2000);

            }
        })
    }

    const  onSelectProvince = (event) => {
        let province_id = parseInt($(event.target).val());
        let axios = require('axios');
        let config = {
            method: 'get',
            url: generateURL("/SideArray/GetCitiesOfProvince?province_id=") + province_id,
            headers: {"Content-Type": "application/json"},
        };
        /* get cities for the province */
        axios(config)
            .then(function (response) {
                setCities(response.data.data)
            })
            .catch(function (error) {
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

    useEffect(function (){
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);
        let company_id = parseInt(url.company);
        setCompany(company_id);


        let axios = require('axios');
        axios.defaults.withCredentials = true;

        /************** Default Data *************/
        let default_data = {
            "id": company_id,
            "roleId": 5,
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
            }
        }
        let default_config = {
            method: 'post',
            url: generateURL("/Company/GetCompanySinglePanelSide"),
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(default_data)
        };
        axios(default_config)
            .then(function (response) {
                let response_data = response.data.data;
                console.log(response.data.data)
                setName(response_data.name);
                setEngName(response_data.englishName);
                setProvince(response_data.province.id);
                setCity(response_data.city.id);
                setAddress(response_data.address);
                setIsKnowledge(response_data.isKnowledgeBase);

                /* get cities of province*/
                let cities_config = {
                    method: 'get',
                    url: generateURL("/SideArray/GetCitiesOfProvince?province_id=") + response_data.province.id,
                    headers: {"Content-Type": "application/json"},
                };
                axios(cities_config)
                    .then(function (response) {
                        console.log(cities_config)
                        setCities(response.data.data)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            })
            .catch(function (error) {
                if (error.response !== undefined) {
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


        /************** Province List *************/
        let province_config = {
            method: 'get',
            url: generateURL("/SideArray/GetProvinceList"),
            headers: {}
        };
        axios(province_config)
            .then(function (response) {

                setProvinces(response.data.data);
            })
            .catch(function (error) {
            });
    }, [])

    return(
        <div>
            <h5 className={"change-text"}>اطلاعات پایه شرکت</h5>
            <div className={'row w-100 mx-0'}>
                <div className={'col-12 col-xl-6 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>نام شرکت (فارسی)</label>
                    <input type={'text'} className={'form-control'} id={'name_input'} defaultValue={name}/>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>نام شرکت (انگلیسی)</label>
                    <input type={'text'} className={'form-control text-left'} dir={"ltr"} id={'eng_name_input'} defaultValue={engName}/>
                </div>
                <div className={'col-12 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>آدرس شرکت</label>
                    <input type={'text'} className={'form-control'} id={'address_input'} defaultValue={address}/>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>استان</label>
                    <select className={'form-control'} id={'province_input'} onChange={onSelectProvince}>
                        <option selected={true} disabled={true}>انتخاب...</option>
                        {
                            provinces.map((item) => (
                                <option value={item.id} selected={item.id === province}>{language === 'fa' ? item.name: item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>شهر</label>
                    <select className={'form-control'} id={'city_input'}>
                        {
                            cities.map((item) => (
                                <option value={item.id} selected={item.id === city}>{language === 'fa' ? item.name: item.englishName}</option>
                            ))
                        }
                    </select>
                </div>

                <div className={'col-12 col-xl-4 mt-4 change-dir change-text'}>
                    {isKnowledge ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setIsKnowledge(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setIsKnowledge(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>شرکت دانش بنیان</label>
                </div>

            </div>
            <div className={'d-flex justify-content-center mt-5'}>
                <button className={'btn btn-success py-2 px-5'} onClick={onSubmit}>ثبت تغییرات</button>
            </div>
            <NotificationContainer/>
        </div>
    )
}