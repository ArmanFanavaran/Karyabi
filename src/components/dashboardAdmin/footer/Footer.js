import Style from './footer.module.css';
import {useEffect, useState} from "react";
import {generateURL, language} from "../../global/Requests";
import {NotificationManager} from "react-notifications";
import {NotificationContainer} from "react-notifications";
import {Link} from "react-router-dom";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import queryString from "query-string";

export default function Footer() {

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
            <h5 className={'change-text'}>تنظیمات فوتر</h5>
            <div className={"row w-100 mx-0"}>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>عنوان برند</label>
                    <p className={"w-100"}>{brand}</p>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>توسعه دهنده</label>
                    <p className={"w-100"}>{developedBy}</p>
                </div>
                <div className={'col-12  change-text change-dir mt-4'}>
                    <label className={"d-block"}>شعار برند (فارسی)</label>
                    <p className={"w-100"}>{brandSlogan}</p>
                </div>
                <div className={'col-12  change-text change-dir mt-4'}>
                    <label className={"d-block"}>شعار برند (انگلیسی)</label>
                    <p className={"w-100"}>{brandSloganEng}</p>
                </div>
                <div className={'col-12  change-text change-dir mt-4'}>
                    <label className={"d-block"}>متن حقوق</label>
                    <p className={"w-100"}>{rights}</p>
                </div>
                <div className={'col-12 change-text change-dir mt-4'}>
                    <label className={"d-block"}>آدرس (فارسی)</label>
                    <p className={"w-100"}>{address}</p>
                </div>
                <div className={'col-12 change-text change-dir mt-4'}>
                    <label className={"d-block"}>آدرس (انگلیسی)</label>
                    <p className={"w-100"}>{addressEng}</p>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>شماره تلفن اول</label>
                    <p className={"w-100"}>{phone1}</p>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>شماره تلفن دوم</label>
                    <p className={"w-100"}>{phone2}</p>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>ایمیل</label>
                    <p className={"w-100"}>{email}</p>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>آدرس تلگرام</label>
                    <p className={"w-100"}>{telegram}</p>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>آدرس واتساپ</label>
                    <p className={"w-100"}>{whatsapp}</p>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>آدرس لینکدین</label>
                    <p className={"w-100"}>{linkedin}</p>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>آدرس اینستاگرام</label>
                    <p className={"w-100"}>{instagram}</p>
                </div>
                <div className={'col-12 col-xl-6 change-text change-dir mt-4'}>
                    <label className={"d-block"}>آدرس یوتیوب</label>
                    <p className={"w-100"}>{youtube}</p>
                </div>
            </div>
            <div className={'d-flex w-100 justify-content-center mt-5'}>
                <Link to={{
                    pathname: getRoutesItems().UpdateFooterSettings.route,
                    search: "lang=" + language
                }} className={'btn btn-warning py-2 px-4'}
                >ویرایش</Link>
            </div>

            <NotificationContainer/>

        </div>
    )
}