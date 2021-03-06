import {useEffect, useState} from "react";
import {generateURL} from "../../global/Requests";
import {NotificationManager} from "react-notifications";
import {NotificationContainer} from "react-notifications";
import queryString from "query-string";
import $ from 'jquery';
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {useHistory} from "react-router-dom";
import {getCategoriesJson} from "./CategoryJson";

export default function EditPublicLink() {
    const history = useHistory();
    const [language, setLanguage] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [nameEng, setNameEng] = useState();
    const [category, setCategory] = useState();
    const [address, setAddress] = useState();
    const categories = getCategoriesJson();

    const onSubmitFooter = () => {
        var axios = require('axios');
        axios.defaults.withCredentials = true;



        let data = {
            "id": id,
            "name": $("#name_input").val(),
            "englishName": $("#nameEng_input").val(),
            "address": $("#address_input").val(),
            "categotryName": $("#category_input").val(),
            "categotryNameEnglish": $("#category_input").val()
        }
        var config = {
            method: 'post',
            url: generateURL('/PublicLink/UpdatePublicLink'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };


        console.log(data)
        axios(config)
            .then(function (response) {
                console.log(response.data)
                NotificationManager.success(response.data.message, "", 2000);
                setTimeout(() => {
                    history.push({
                        pathname: getRoutesItems().PublicLinks.route,
                        search: "lang=" + language
                    })
                });

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
        let id = parseInt((url.id));
        setId(id)

        var axios = require('axios');
        axios.defaults.withCredentials = true;
        var config = {
            method: 'get',
            url: generateURL('/PublicLink/GetPublicLinkSingle?id=') + id,
            headers: {
                'Content-Type': 'application/json'
            },
        };


        axios(config)
            .then(function (response) {
                console.log(response.data.data)
                let data = response.data.data;
                setName(data.name);
                setNameEng(data.englishName);
                setAddress(data.address);
                setCategory(data.categotryName);

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
            <h5 className={'change-text'}>???????????? ??????????</h5>

            <div className={"row w-100 mx-0"}>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>?????????? ??????????</label>
                    <input className={"form-control"} type={'text'} id={"name_input"} defaultValue={name}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>?????????? ??????????????</label>
                    <input className={"form-control"} type={'text'} id={"nameEng_input"} defaultValue={nameEng}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>???????????????????</label>
                    <select className={"form-control"}  id={"category_input"}>
                        {
                            categories.map((item) => (
                                <option value={item.id} selected={category === item.id}>{language === 'fa' ? item.name: item.engName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'col-12  change-text change-dir mt-4'}>
                    <label className={"d-block"}>????????</label>
                    <input className={"form-control"} type={'text'} id={"address_input"} defaultValue={address}/>
                </div>

            </div>
            <div className={'d-flex w-100 justify-content-center mt-5'}>
                <button className={'btn btn-success py-2 px-4'} onClick={onSubmitFooter}>??????</button>
            </div>

            <NotificationContainer/>

        </div>
    )
}