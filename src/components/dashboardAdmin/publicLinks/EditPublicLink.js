import {useEffect, useState} from "react";
import {generateURL} from "../../global/Requests";
import {NotificationManager} from "react-notifications";
import {NotificationContainer} from "react-notifications";
import queryString from "query-string";
import $ from 'jquery';
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {useHistory} from "react-router-dom";

export default function EditPublicLink() {
    const history = useHistory();
    const [language, setLanguage] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [nameEng, setNameEng] = useState();
    const [category, setCategory] = useState();
    const [categoryEng, setCategoryEng] = useState();
    const [address, setAddress] = useState();

    const onSubmitFooter = () => {
        var axios = require('axios');
        axios.defaults.withCredentials = true;

        let data = {
            "id": id,
            "name": "string",
            "englishName": "string",
            "address": "string",
            "categotryName": "string",
            "categotryNameEnglish": "string"
        }
        var config = {
            method: 'post',
            url: generateURL('/PublicLink/UpdatePublicLink'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };


        axios(config)
            .then(function (response) {
                console.log(response.data)
                NotificationManager.success(response.data.message, "", 2000);
                setTimeout(() => {
                    history.push({
                        pathname: getRoutesItems().FooterSettings.route,
                        search: "lang=" + language
                    })
                })

            })
            .catch(function (error) {
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

    useEffect(function () {
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);

        var axios = require('axios');
        axios.defaults.withCredentials = true;
        var config = {
            method: 'get',
            url: generateURL('/PublicLink/GetPublicLinkSingle'),
            headers: {
                'Content-Type': 'application/json'
            },
        };


        axios(config)
            .then(function (response) {
                console.log(response.data.data)
                let data = response.data.data;
                setName(data.name)

            })
            .catch(function (error) {
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
    }, []);

    return (
        <div>
            <h5 className={'change-text'}>ویرایش پیوند</h5>

            <div className={"row w-100 mx-0"}>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>عنوان فارسی</label>
                    <input className={"form-control"} type={'text'} id={"name_input"} />
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>عنوان انگلیسی</label>
                    <input className={"form-control"} type={'text'} id={"nameEng_input"} />
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>عنوان فارسی دسته‌بندی</label>
                    <input className={"form-control"} type={'text'} id={"category_input"} />
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>عنوان انگلیسی دسته‌بندی</label>
                    <input className={"form-control"} type={'text'} id={"categoryEng_input"} />
                </div>
                <div className={'col-12  change-text change-dir mt-4'}>
                    <label className={"d-block"}>آدرس</label>
                    <input className={"form-control"} type={'text'} id={"address_input"} />
                </div>

            </div>
            <div className={'d-flex w-100 justify-content-center mt-5'}>
                <button className={'btn btn-success py-2 px-4'} onClick={onSubmitFooter}>ثبت</button>
            </div>

            <NotificationContainer/>

        </div>
    )
}