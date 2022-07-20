import Style from './footer.module.css';
import {useEffect, useState} from "react";
import {generateURL} from "../../global/Requests";
import {NotificationManager} from "react-notifications";
import {NotificationContainer} from "react-notifications";
import queryString from "query-string";
import $ from 'jquery';
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {useHistory} from "react-router-dom";

export default function UpdateFooter() {
    const history = useHistory();
    const [language, setLanguage] = useState();
    const [brand, setBrand] = useState();
    const [brandSlogan, setBrandSlogan] = useState();
    const [brandSloganEng, setBrandSloganEng] = useState();
    const [developedBy, setDevelopedBy] = useState();
    const [rights, setRights] = useState();
    const [address, setAddress] = useState();
    const [addressEng, setAddressEng] = useState();
    const [phone1, setPhone1] = useState();
    const [phone2, setPhone2] = useState();
    const [email, setEmail] = useState();
    const [telegram, setTelegram] = useState();
    const [whatsapp, setWhatsapp] = useState();
    const [linkedin, setLinkedin] = useState();
    const [instagram, setInstagram] = useState();
    const [youtube, setYoutube] = useState();

    const onSubmitFooter = () => {
        var axios = require('axios');
        axios.defaults.withCredentials = true;

        let data = {
            "id": 0,
            "brand": $("#brand_input").val(),
            "brandSlogan": $("#brandSlogan_input").val(),
            "brandSloganEnglish": $("#brandSloganEng_input").val(),
            "address": $("#address_input").val(),
            "englishAddress": $("#addressEng_input").val(),
            "mapLocation": "",
            "phone1": $("#phone1_input").val(),
            "phone2": $("#phone2_input").val(),
            "email": $("#email_input").val(),
            "insta": $("#instagram_input").val(),
            "linkedIn": $("#linkedin_input").val(),
            "whatsApp": $("#whatsapp_input").val(),
            "youTube": $("#youtube_input").val(),
            "telegram": $("#telegram_input").val(),
            "developedBy": $("#developedBy_input").val(),
            "rightsReservedStatement": $("#rights_input").val()
        }
        var config = {
            method: 'post',
            url: generateURL('/Footer/UpdateFooter'),
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
            url: generateURL('/Footer/GetFooter'),
            headers: {
                'Content-Type': 'application/json'
            },
        };


        axios(config)
            .then(function (response) {
                console.log(response.data.data)
                let data = response.data.data;
                setBrand(data.brand);
                setBrandSlogan(data.brandSlogan);
                setBrandSloganEng(data.brandSloganEnglish);
                setDevelopedBy(data.developedBy);
                setEmail(data.email);
                setAddress(data.address);
                setAddressEng(data.englishAddress);
                setRights(data.rightsReservedStatement);
                setPhone1(data.phone1);
                setPhone2(data.phone2);
                setWhatsapp(data.whatsApp);
                setTelegram(data.telegram);
                setInstagram(data.insta);
                setLinkedin(data.linkedIn);
                setYoutube(data.youTube);
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
            <h5 className={'change-text'}>ویرایش تنظیمات فوتر</h5>

            <div className={"row w-100 mx-0"}>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>عنوان برند</label>
                    <input className={"form-control"} type={'text'} id={"brand_input"} defaultValue={brand}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>توسعه دهنده</label>
                    <input className={"form-control"} type={'text'} id={"developedBy_input"} defaultValue={developedBy}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>شعار برند (فارسی)</label>
                    <input className={"form-control"} type={'text'} id={"brandSlogan_input"} defaultValue={brandSlogan}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>شعار برند (انگلیسی)</label>
                    <input className={"form-control text-left"} dir={"ltr"} type={'text'} id={"brandSloganEng_input"} defaultValue={brandSloganEng}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>آدرس (فارسی)</label>
                    <input className={"form-control"} type={'text'} id={"address_input"} defaultValue={address}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>آدرس (انگلیسی)</label>
                    <input className={"form-control text-left"} dir={"ltr"} type={'text'} id={"addressEng_input"} defaultValue={addressEng}/>
                </div>
                <div className={'col-12  change-text change-dir mt-2'}>
                    <label className={"d-block"}>متن حقوق</label>
                    <input className={"form-control"} type={'text'} id={"rights_input"} defaultValue={rights}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>شماره تلفن اول</label>
                    <input className={"form-control text-left"} dir={"ltr"} type={'number'}  id={"phone1_input"} defaultValue={phone1}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>شماره تلفن دوم</label>
                    <input className={"form-control text-left"} dir={"ltr"} type={'number'}  id={"phone2_input"} defaultValue={phone2}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>ایمیل</label>
                    <input className={"form-control text-left"} dir={"ltr"} type={'email'} id={"email_input"} defaultValue={email}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>آدرس تلگرام</label>
                    <input className={"form-control text-left"} dir={"ltr"} type={'text'} id={"telegram_input"} defaultValue={telegram}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>آدرس واتساپ</label>
                    <input className={"form-control text-left"} dir={"ltr"} type={'text'} id={"whatsapp_input"} defaultValue={whatsapp}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>آدرس لینکدین</label>
                    <input className={"form-control text-left"} dir={"ltr"} type={'text'} id={"linkedin_input"} defaultValue={linkedin}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>آدرس اینستاگرام</label>
                    <input className={"form-control text-left"} dir={"ltr"} type={'text'} id={"instagram_input"} defaultValue={instagram}/>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-2'}>
                    <label className={"d-block"}>آدرس یوتیوب</label>
                    <input className={"form-control text-left"} dir={"ltr"} type={'text'} id={"youtube_input"} defaultValue={youtube}/>
                </div>
            </div>
            <div className={'d-flex w-100 justify-content-center mt-5'}>
                <button className={'btn btn-success py-2 px-4'} onClick={onSubmitFooter}>ثبت</button>
            </div>

            <NotificationContainer/>

        </div>
    )
}