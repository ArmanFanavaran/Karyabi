import Style from "./addCompany.module.css";
import React, {useEffect, useState} from "react";
import {generateURL} from "../../global/Requests";
import queryString, {parse} from "query-string";
import * as $ from "jquery";
import {NotificationManager, NotificationContainer} from "react-notifications";
import {useHistory} from "react-router-dom";
import {getRoutesItems} from "../../RoutesList/RoutesList";


export default function AddCompanyCriticalInfo() {
    const history = useHistory();
    const [language, setLanguage] = useState();
    const [isKnowledge, setIsKnowledge] = useState(false);
    const [informPhone, setInformPhone] = useState(true);
    const [informEmail, setInformEmail] = useState(true);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);

    const onSubmit = () => {
        let name = $("#name_input").val();
        let eng_name = $("#eng_name_input").val();
        let address = $("#address_input").val();
        let phone = $("#phone_input").val();
        let email = $("#email_input").val();
        let province = $("#province_input").val();
        if (province === undefined || province === null){
            NotificationManager.error("لظفا استان را انتخاب کنید", "", 2000);
            return;
        }
        else province = parseInt(province);
        let city = parseInt($("#city_input").val());
        let min = $("#min_input").val();
        if (min === "") {
            NotificationManager.error("لطفا حداقل تعداد اعضا را مشخص کنید", "", 2000);
            return;
        }
        else min = parseInt(min);
        let max = $("#max_input").val();
        if (max === "") {
            NotificationManager.error("لطفا حداکثر تعداد اعضا را مشخص کنید", "", 2000);
            return;
        }
        else max = parseInt(max);
        let category = $("#category_input").val();
        if (category === undefined || category === null){
            NotificationManager.error("لظفا دسته‌بندی شرکت را انتخاب کنید", "", 2000);
            return;
        }
        else category = parseInt(category);

        let axios = require('axios');
        axios.defaults.withCredentials = true;

        let data = {
            "roleId": 5,
            "name": name,
            "englishName": eng_name,
            "address": address,
            "minMemberCount": min,
            "maxMemberCount": max,
            "cityId": city,
            "provinceId": province,
            "mobilePhone": phone,
            "email": email,
            "informViaEmail": informEmail,
            "informViaPhone": informPhone,
            "isKnowledgeBase": isKnowledge,
            "companyCategoryId": category,
            // "id": 0
        }

        let config = {
            method: 'post',
            url: generateURL("/company/AddCompany"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };
        console.log(data)

        axios(config).then(function (response) {
            console.log(response.data)
            let companyId = response.data.data;
            history.push({
                pathname: getRoutesItems().updateCompany.route,
                search: "lang=" + language + "&company=" + companyId
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


        let axios = require('axios');
        axios.defaults.withCredentials = true;

        /************** Category List *************/
        let category_config = {
            method: 'get',
            url: generateURL("/Side/GetCompanyCategoryList"),
            headers: {}
        };
        axios(category_config)
            .then(function (response) {
                console.log(response.data.data)
                setCategories(response.data.data);
            })
            .catch(function (error) {
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
            <h5 className={"change-text"}>ثبت شرکت</h5>
            <div className={'row w-100 mx-0'}>
                <div className={'col-12 col-xl-6 form-group change-dir mt-2'}>
                    <label className={'d-block change-text'}>نام شرکت (فارسی)</label>
                    <input type={'text'} className={'form-control'} id={'name_input'}/>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-2'}>
                    <label className={'d-block change-text'}>نام شرکت (انگلیسی)</label>
                    <input type={'text'} className={'form-control text-left'} dir={"ltr"} id={'eng_name_input'}/>
                </div>
                <div className={'col-12 form-group change-dir mt-2'}>
                    <label className={'d-block change-text'}>آدرس شرکت</label>
                    <input type={'text'} className={'form-control'} id={'address_input'}/>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-2'}>
                    <label className={'d-block change-text'}>استان</label>
                    <select className={'form-control'} id={'province_input'} onChange={onSelectProvince}>
                        <option selected={true} disabled={true}>انتخاب...</option>
                        {
                            provinces.map((item) => (
                                <option value={item.id} >{language === 'fa' ? item.name: item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-2'}>
                    <label className={'d-block change-text'}>شهر</label>
                    <select className={'form-control'} id={'city_input'}>
                        {
                            cities.map((item) => (
                                <option value={item.id} >{language === 'fa' ? item.name: item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-6 col-xl-3 form-group change-dir mt-2'}>
                    <label className={'d-block change-text'}>حداقل تعداد اعضا</label>
                    <input type={'number'} className={'form-control text-left'} id={'min_input'}/>
                </div>
                <div className={'col-6 col-xl-3 form-group change-dir mt-2'}>
                    <label className={'d-block change-text'}>حداکثر تعداد اعضا</label>
                    <input type={'number'} className={'form-control text-left'} id={'max_input'}/>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-2'}>
                    <label className={'d-block change-text'}>دسته‌بندی</label>
                    <select className={'form-control'} id={'category_input'}>
                        <option selected={true} disabled={true}>انتخاب...</option>
                        {
                            categories.map((item) => (
                                <option value={item.id} >{language === 'fa' ? item.name: item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-2'}>
                    <label className={'d-block change-text'}>شماره تلفن همراه</label>
                    <input type={'number'} className={'form-control text-left'} dir={"ltr"} id={'phone_input'}/>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-2'}>
                    <label className={'d-block change-text'}>ایمیل</label>
                    <input type={'email'} className={'form-control text-left'} dir={"ltr"} id={'email_input'}/>
                </div>
                <div className={'col-12 col-xl-4 mt-2 change-dir change-text'}>
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
                <div className={'col-12 col-xl-4 mt-2 change-dir change-text'}>
                    {informPhone ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setInformPhone(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setInformPhone(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>اطلاع‌رسانی از طریق پیامک</label>
                </div>
                <div className={'col-12 col-xl-4 mt-2 change-dir change-text'}>
                    {informEmail ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setInformEmail(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setInformEmail(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>اطلاع‌رسانی از طریق ایمیل</label>
                </div>
            </div>
            <div className={'d-flex justify-content-center mt-5'}>
                <button className={'btn btn-success py-2 px-5'} onClick={onSubmit}>ثبت شرکت</button>
            </div>
            <NotificationContainer/>
        </div>
    )
}