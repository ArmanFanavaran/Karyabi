import React, {useEffect, useState} from 'react';
import Style from './addJobOffer.module.css'
import {generateURL} from "../../global/Requests";
import { MultiSelect } from "react-multi-select-component";
import queryString, {parse} from "query-string";
import * as $ from 'jquery';
import {useHistory} from "react-router-dom";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {NotificationManager} from "react-notifications";
import {NotificationContainer} from "react-notifications";

export default function AddJobOfferStep1() {
    const history = useHistory()
    const [language, setLanguage] = useState();
    const [categories, setCategories] = useState([]);

    const onSubmit = () => {
        const url = queryString.parse(window.location.search);
        let companyId = url.company;

        let title = $("#title_input").val();
        let titleEng = $("#english_title_input").val();
        let category = $("#category_select").val();

        console.log(category)
        let axios = require('axios');
        let data = {
            "ownerId": 1,
            "owner": "Company",
            "roleId": 8,
            "roleAccountId": parseInt(companyId),
            "title": title,
            "titleEnglish": titleEng,
            "typeId": 1,
            "categoryId": parseInt(category)
        }
        console.log(data)
        let config = {
            method: 'post',
            url: generateURL("/JobOffer/AddJobOffer"),
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(data)
        };
        axios(config)
            .then(function (response) {
                NotificationManager.error(response.data.message, '', 1000);
                console.log(response.data)
                if (response.data.isSuccess)
                history.replace({
                    pathname: getRoutesItems().addJobOfferByCompanyStep2.route,
                    search: "lang=" + language + "&company=" + companyId + "&joboffer=" + response.data.data
                });
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
        setLanguage(url.lang)

        /************** Category List *************/
        let axios = require('axios');
        let category_config = {
            method: 'get',
            url: generateURL("/Side/GetJobCategoryList"),
            headers: {}
        };
        axios(category_config)
            .then(function (response) {

                setCategories(response.data.data);
            })
            .catch(function (error) {
            });
    }, []);

    return (
        <div>
            <h5 className={'change-text'}>ثبت آگهی جدید</h5>
            <div className={'row mx-0 w-100'}>
                <div className={'col-12 mt-4'}>
                    <label className={'change-text d-block'}>عنوان آگهی (فارسی)</label>
                    <input type={"text"} className={'form-control'} id={'title_input'}/>
                </div>
                <div className={'col-12 mt-4'}>
                    <label className={'change-text d-block'}>عنوان آگهی (انگلیسی)</label>
                    <input type={"text"} className={'form-control'} id={'english_title_input'}/>
                </div>
                {/*<div className={'col-12 mt-4'}>*/}
                {/*    <label className={'change-text d-block'}>توضیح کوتاه (فارسی)</label>*/}
                {/*    <input type={"text"} className={'form-control'} id={'description_input'}/>*/}
                {/*</div>*/}
                {/*<div className={'col-12 mt-4'}>*/}
                {/*    <label className={'change-text d-block'}>توضیح کوتاه (انگلیسی)</label>*/}
                {/*    <input type={"text"} className={'form-control'} id={'english_description_input'}/>*/}
                {/*</div>*/}
                <div className={'col-12 mt-4'}>
                    <label className={'change-text d-block'}>دسته‌بندی آگهی</label>
                    <select id={'category_select'} className="form-control">
                        <option disabled={true} >انتخاب...</option>
                        {
                            categories.map((item)=>(
                                <option value={item.id}>{language==='fa'?item.name:item.englishName}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className={'d-flex justify-content-center mt-4'}>
                <button className={'btn btn-success py-2 px-5'} onClick={onSubmit}>مرحله بعد</button>
            </div>
            <NotificationContainer/>
        </div>
    )

}