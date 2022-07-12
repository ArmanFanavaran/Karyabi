import "./Footer.css";
import {useEffect, useState} from "react";
import queryString from "query-string";
import {generateURL} from "../../Requests";
import {NotificationManager} from "react-notifications";
import {getCategoriesJson} from "../../../dashboardAdmin/publicLinks/CategoryJson";
import {Link} from "react-router-dom";


export default function Footer() {
    const [language, setLanguage] = useState("");
    const [brand, setBrand] = useState("");
    const [brandSlogan, setBrandSlogan] = useState("");
    const [brandSloganEng, setBrandSloganEng] = useState("");
    const [developedBy, setDevelopedBy] = useState("");
    const [rights, setRights] = useState("");
    const [address, setAddress] = useState("");
    const [addressEng, setAddressEng] = useState("");
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [email, setEmail] = useState("");
    const [telegram, setTelegram] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");
    const [links, setLinks] = useState([]);
    const categories = getCategoriesJson();


    useEffect(function (){
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang)
        let axios = require('axios');
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

        let links_config = {
            method: 'get',
            url: generateURL("/PublicLink/GetPublicLinkList"),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(links_config).then(function (response) {
            console.log(response.data)
            setLinks(response.data.data);

        }).catch(function (error) {
            console.log(error);
            console.log(error.response);
            // let errors = error.response.data.errors;
            // if (errors != null) {
            //     Object.keys(errors).map((key, i) => {
            //         for (var i = 0; i < errors[key].length; i++) {
            //             NotificationManager.error(errors[key][i]);
            //         }
            //     });
            //
            // } else if (error.response.data.message != null && error.response.data.message != undefined) {
            //     NotificationManager.error(error.response.data.message, '', 1000);
            // } else {
            //     NotificationManager.error(error.response.data.Message, '', 1000);
            //
            // }
        });
    },[])
    return (
        <footer className="page-footer py-2">
            <div>
                <div className="container">
                    <div className="row py-4 d-flex align-items-center">
                        <div className="col-12 change-text mb-4 mb-md-0">
                            <h5 className="mx-3 mb-3">{brand}</h5>
                        </div>

                        <div className="col-12 text-center text-md-left social-medias">

                            <a href={telegram} className="fb-ic sm-icon mx-md-3">
                                <i className="fab fa-telegram-plane white-text"> </i>
                            </a>

                            <a href={whatsapp} className="fb-ic sm-icon mx-md-3">
                                <i className="fab fa-whatsapp white-text"> </i>
                            </a>

                            <a href={instagram} className="tw-ic sm-icon mx-md-3">
                                <i className="fab fa-instagram white-text"> </i>
                            </a>

                            <a href={linkedin} className="gplus-ic sm-icon mx-md-3">
                                <i className="fab fa-linkedin-in white-text"> </i>
                            </a>

                            <a href={youtube} className="tw-ic sm-icon mx-md-3">
                                <i className="fab fa-youtube white-text"> </i>
                            </a>

                            <a href={"mailto:"+email} className="gplus-ic sm-icon mx-md-3">
                                <i className="fa fa-envelope white-text"> </i>
                            </a>
                        </div>


                    </div>

                </div>
            </div>
            <div className="container text-center text-md-left mt-5">
                <div className="row columns mt-3 change-dir">
                    {
                        categories.map((categoryItem) => (
                            <div
                                className="col-md-6 text-center text-lg-left  col-lg-4 col-xl-3 mx-auto mb-4 change-text change-dir">
                                <h6 className="font-weight-bold mb-3">{language === 'fa' ? categoryItem.name : categoryItem.engName}</h6>
                                {
                                    links.map((linkItem) => (
                                        linkItem.categotryName === categoryItem.id &&
                                        <p>
                                            <Link to={linkItem.address}>{language === 'fa' ? linkItem.name : linkItem.englishName}</Link>
                                        </p>
                                    ))
                                }

                            </div>
                        ))
                    }

                    <div
                        className="col-md-6 text-center text-lg-right  col-lg-4 col-xl-3 mb-4 text-white">
                        <p className="address-footer change-text px-3 pb-3 text-white font-weight-bold">{language === 'fa' ? brandSlogan : brandSloganEng}</p>
                        { phone1 != null && phone1 !== "" &&
                        <p className="address-footer change-dir change-text">
                            <h6 className="d-inline"><i className="fas fa-phone"></i></h6>
                            <span className={'mx-3'}>{phone1}</span>
                        </p>
                        }
                        { phone2 != null && phone2 !== "" &&
                        <p className="address-footer change-dir change-text">
                            <h6 className="d-inline"><i className="fas fa-phone"></i></h6>
                            <span className={'mx-3'}>{phone2}</span>
                        </p>
                        }
                        <p className="address-footer change-dir change-text">
                            <h6 className="d-inline"><i className="fas fa-envelope"></i></h6>
                            <span className={'mx-3'}>{email}</span>
                        </p>
                        <p className="address-footer change-dir change-text">
                            <h6 className="d-inline"><i className="fas fa-map-marker-alt"></i></h6>
                            <span className={'mx-3'}>{language === 'fa' ? address : addressEng}</span>
                        </p>
                    </div>

                </div>
            </div>
            <div className="footer-copyright text-center py-3">
                <div className="row">
                    {/*<div className="col-lg-4 col-md mt-lg-0 my-2">*/}
                    {/*    <span>Terms of service</span>*/}
                    {/*</div>*/}
                    <div className="col-12 mt-lg-0 my-2">
                        <span>{developedBy}</span>
                        <br/>
                        <span>{rights}</span>
                    </div>

                </div>
            </div>
        </footer>
    )
}