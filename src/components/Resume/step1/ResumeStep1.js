import $ from 'jquery';
import * as React from "react";
import {useEffect, useState} from "react";
import Style from "./ResumeStep1.module.css"
import NavbarResume from "../navbar/NavbarResume"
import {generateURL} from "../../global/Requests";
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";
import DatePicker from 'react-datepicker2';
import {useTranslation} from "react-i18next";
import * as queryString from "query-string";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import FrameResume from "../frameResume/FrameResume"
/////////////// Icon ///////////
import instagram from "./imgs/instagram.svg"
import linkedin from "./imgs/linkedin.svg"
import telegram from "./imgs/telegram.svg"
import gitHub from "./imgs/github.svg"
import gitLab from "./imgs/gitlab.svg"
import bitBucket from "./imgs/bitbucket.svg"
import phone from "./imgs/phone.svg"
import smartPhone from "./imgs/smartphone.svg"
import gmail from "./imgs/gmail.svg"
import navigation from "./imgs/navigation.svg"
import {initializeTitlesWithValue} from "../../global/Titles";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {useHistory} from "react-router";
import {css} from "@emotion/react";
import {MoonLoader} from "react-spinners";
import Modal from "react-modal";
import guide from "./imgs/guide.png"
import addImg from "../step4/imgs/add.svg";
import minus from "../step4/imgs/minus.svg";

export default function ResumeStep1() {
    var moment = require("moment-jalaali");
    const history = useHistory();

    let [resume, setResume] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [city, setCity] = useState([]);
    const [CityId, setCityId] = useState("");
    const [cities, setCities] = useState([]);
    const [gender, setGender] = useState([]);
    const [military, setMilitary] = useState([]);
    const [marriage, setMarriage] = useState([]);
    const [resumeId, setResumeId] = useState([]);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("rgb(0,30,255)");
    const [modalIsOpen, setIsOpen] = React.useState(false);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    const [date, setDate] = useState(moment(today, 'YYYY/M/D'));
    const [newDate, setNewDate] = useState(moment(today, 'YYYY/M/D'));
    const [t, i18n] = useTranslation('main');
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);

    // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css`
      display: flex;
      margin: 0 auto;
      border: 10px #ff0000;
      //z-index: 99999;
    `;

    var axios = require('axios');
    axios.defaults.withCredentials = true;

    /************** Modal **************/
    const customStyles = {

        content: {
            top: '56%',
            left: '50%',
            width: '90%',
            maxWidth: '1000px',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            zIndex: '1',
            borderRadius: '15px',
            padding: '20px',
            // marginTop:'30px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#6969dd #e0e0e0',
            height: '85vh',
            transform: 'translate(-50%, -50%)',

        },

        "@media only screen and (max-width: 375px)": {
            backgroundColor: 'red'
        },

        webkitScrollbar: {width: "1em"},
        webkitScrollbarTrack: {boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)"},
        webkitScrollbarThumb: {backgroundColor: "darkgrey", outline: "1px solid slategrey"}

    };

    function openModal() {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';

    }

    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'visible';

    }

    // Can be a string as well. Need to ensure each key-value pair ends with ;
    const overrideLoading = css`
      display: flex;
      margin: 0 auto;
      border: 10px #ff0000;
      //z-index: 99999;
    `;
    const customStylesLoading = {

        content: {
            top: '56%',
            left: '50%',
            width: '100%',
            // maxWidth: '1000px',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            zIndex: '1',
            borderRadius: '15px',
            padding: '20px',
            opacity: 0.75,

            // marginTop:'30px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#6969dd #e0e0e0',
            height: '90vh',
            transform: 'translate(-50%, -50%)',

        },

        "@media only screen and (max-width: 375px)": {
            backgroundColor: 'red'
        },

        webkitScrollbar: {width: "1em"},
        webkitScrollbarTrack: {boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)"},
        webkitScrollbarThumb: {backgroundColor: "darkgrey", outline: "1px solid slategrey"}

    };

    const [modalIsOpenLoading, setIsOpenLoading] = React.useState(false);

    function openModalLoading() {
        setIsOpenLoading(true);
        document.body.style.overflow = 'hidden';
        setLoading(true)

    }

    function closeModalLoading() {
        setIsOpenLoading(false);
        document.body.style.overflow = 'visible';
        setLoading(false)

    }

    useEffect(() => {
        openModalLoading()
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Resume | Personal information")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("رزومه | اطلاعات شخصی")
        }
        var axios = require('axios');
        var data = JSON.stringify({
            "heights": [getSizeImageItems().UserPicPro.Heights],
            "widths": [getSizeImageItems().UserPicPro.Widths],
            "qualities": [getSizeImageItems().UserPicPro.Qualities]
        });

        var config = {
            method: 'post',
            url: generateURL('/Resume/GetLastResume'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        let information;
        axios(config)
            .then(function (response) {
                setResumeId(response.data.data.id)
                setResume(JSON.parse(response.data.data.userInfoJson))
                information = JSON.parse(response.data.data.userInfoJson);
                closeModalLoading()
                if (information.Birthday !== "0001-01-01T00:00:00" && information.Birthday !== null) {
                    setDate(moment(information.Birthday, 'YYYY-MM-DD'))
                }
            })
            .then(function () {
                //////////// provinces API ///////////
                var configProvinces = {
                    method: 'get',
                    url: generateURL('/SideArray/GetProvinceList'),
                    headers: {}
                };
                axios(configProvinces)
                    .then(function (response) {
                        setProvinces(response.data.data)
                        $.each(response.data.data, function (key, value) {
                            if (value.id === information.ProvinceId) {
                                setCityId(value.id)
                                getCityAPIWithoutEvent(value.id, information)
                            }
                        });

                    })
                    .catch(function (error) {
                    });
            })
            .catch(function (error) {
            });

        //////////// Gender API ///////////
        var configGender = {
            method: 'get',
            url: generateURL('/SideArray/GetGenderList'),
            headers: {}
        };

        axios(configGender)
            .then(function (response) {
                setGender(response.data.data)
            })
            .catch(function (error) {
            });

        //////////// Military Status API ///////////

        var configMilitary = {
            method: 'get',
            url: generateURL('/SideArray/GetMiltaryStatusList'),
            headers: {}
        };

        axios(configMilitary)
            .then(function (response) {
                setMilitary(response.data.data)
            })
            .catch(function (error) {
            });

        //////////// Marriage Status API ///////////

        var configMarriage = {
            method: 'get',
            url: generateURL('/SideArray/GetMarriageStatusList'),
            headers: {}
        };

        axios(configMarriage)
            .then(function (response) {
                setMarriage(response.data.data)
            })
            .catch(function (error) {
            });

    }, [])

    function onSubmit() {
        setLoading(true)
        var axios = require('axios');
        var data = JSON.stringify({
            "id": parseInt(resumeId),
            "resumePhone": $('#resumePhone').val(),
            "resumeEmail": $('#resumeEmail').val(),
            "resumeInsta": $('#resumeInsta').val(),
            "resumeLinkedIn": $('#resumeLinkedIn').val(),
            "resumeTelegram": $('#resumeTelegram').val(),
            "resumeGithub": $('#resumeGithub').val(),
            "resumeGitLab": $('#resumeGitLab').val(),
            "resumeBitBucket": $('#resumeBitBucket').val(),
            "fixedPhone": $('#fixedPhone').val(),
            "firstNameEnglish": $('#firstNameEnglish').val(),
            "lastNameEnglish": $('#lastNameEnglish').val(),
            "firstName": $('#firstName').val(),
            "lastName": $('#lastName').val(),
            "genderId": parseInt($("#genderId").val()),
            "birthday": newDate,
            "marriageStatus": parseInt($("#marriageStatus").val()),
            "miltaryStatus": parseInt($("#miltaryStatus").val()),
            "province": parseInt($("#province").val()),
            "city": parseInt($("#city").val()),
            "address": $('#address').val(),
            "addressEnglish": $('#addressEnglish').val(),
        });
        console.log(newDate)
        var config = {
            method: 'post',
            url: generateURL('/Resume/CompleteUserInfoSTP1'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                setLoading(false)
                NotificationManager.success(response.data.message, '', 1000);
                $([document.documentElement, document.body]).animate({
                    scrollTop: 0
                }, 1000);
                // setTimeout(function () {
                //     history.push({
                //         pathname: getRoutesItems().resumeStep2.route,
                //         search: "lang=" + sp.get("lang"),
                //
                //     })
                // }, 1500);
            })
            .catch(function (error) {
                setLoading(false)
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i]);
                        }
                    });

                } else if (error.response.data.message != null && error.response.data.message != undefined) {
                    NotificationManager.error(error.response.data.message);
                } else {
                    NotificationManager.error(error.response.data.Message);

                }
            });

    }

    // ///// Date function /////
    const onSubmitDate = (value) => {
        // let date = value._i.slice(11, value._i.length);
        setNewDate(value._d)
        var now = value._d;
        var dd = String(now.getDate()).padStart(2, '0');
        var mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = now.getFullYear();
        now = yyyy + '/' + mm + '/' + dd;
        console.log(now)
    }


    ///// Get City List API  //////
    function getCityAPIWithoutEvent(id, information) {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: generateURL('/SideArray/GetCitiesOfProvince?province_id=' + id),
            headers: {}
        };
        axios(config)
            .then(function (response) {
                setCity(response.data.data)
                let citiesArray = [];
                $.each(response.data.data, function (key, value) {
                    citiesArray.push(<option selected={information.CityId == value.id}
                                             value={value.name}>{value.name}</option>)
                })
                setCities(citiesArray);
            })
            .catch(function (error) {
            });


    }

    ///// Get City List API Event //////
    function getCityAPI(event) {
        var axios = require('axios');

        var optionBack = $(event).find('option[value="' + event.value + '"]')
        var id = $(optionBack).attr("idCity");
        var config = {
            method: 'get',
            url: generateURL('/SideArray/GetCitiesOfProvince?province_id=' + id),
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setCity(response.data.data)
                let citiesArray = [];
                $.each(response.data.data, function (key, value) {
                    citiesArray.push(<option selected={resume.CityId == value.id}
                                             value={value.name}>{value.name}</option>)
                })
                setCities(citiesArray);
            })
            .catch(function (error) {
            });


    }

    return (
        <div>
            <main className={Style.main}>
                <NavbarResume step={1}/>
                <div className="container change-dir">
                    <div className={Style.formBox}>
                        <h2 className={Style.formTitle + " change-dir change-text px-3"}>
                            {t("resume.step1.title")}
                        </h2>
                        <div className="mx-auto">
                            <div className={'row d-xl-none'}>
                                <div className={'col-12'}>
                                    <Modal
                                        isOpen={modalIsOpenLoading}
                                        // onAfterOpen={afterOpenModal}
                                        onRequestClose={closeModalLoading}
                                        style={customStylesLoading}
                                        contentLabel="Example Modal"
                                    >
                                        {/*<button className={'btn btn-default float-right'} onClick={closeModalLoading}>X</button>*/}
                                        <div className={'container '}>
                                            <div className="row">
                                                <div className="col-12 mx-auto mt-4 text-center"
                                                     style={{paddingTop: "30vh", opacity: "1"}} dir={"ltr"} id={'form'}>
                                                    <MoonLoader color={color} loading={loading} css={override}
                                                                size={30}/>
                                                    <h3 className={"mt-4"}>Loading...</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div className={'row d-xl-none'}>
                                <div className={'col-12'}>
                                    <Modal
                                        isOpen={modalIsOpen}
                                        // onAfterOpen={afterOpenModal}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    >
                                        <div className={'row'}>
                                            <div className={'col-12'}>
                                                <button className={'btn btn-default float-right'}
                                                        onClick={closeModal}>X
                                                </button>

                                            </div>

                                        </div>
                                        <FrameResume step={1}/>

                                    </Modal>
                                </div>
                            </div>
                            <div className="row">
                                <div className={'col-12 col-lg-7'}>
                                    <div className={'row ' + Style.input}>
                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className="">{t("resume.step1.firstName")}</label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.FirstName} id={'firstName'} type="text"
                                                       className="form-control dir-rtl"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className="">{t("resume.step1.lastName")}</label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.LastName} id={'lastName'} type="text"
                                                       className="form-control dir-rtl"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor=""
                                                       className="">{t("resume.step1.firstNameEnglish")}</label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.FirstNameEnglish} id={'firstNameEnglish'}
                                                       type="text" className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor=""
                                                       className="">{t("resume.step1.lastNameEnglish")}</label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.LastNameEnglish} id={'lastNameEnglish'}
                                                       type="text" className="form-control dir-ltr"/>
                                            </div>
                                        </div>


                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className="">{t("resume.step1.gender")}</label>
                                            </div>
                                            <div className={Style.selectPart + " col-12 "}>
                                                <select id={'genderId'} className={Style.formSelect}
                                                        aria-label="Default select example">
                                                    {gender !== undefined && gender.map((value, index) => (
                                                        <option selected={resume.GenderId == value.id}
                                                                value={value.id}>
                                                            {sp.get("lang") === "fa" ?
                                                                value.name :
                                                                value.englishName
                                                            }
                                                        </option>
                                                    ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className="">{t("resume.step1.birthday")}</label>
                                            </div>
                                            <div className={Style.selectPart + " col-12 "}>
                                                {sp.get("lang") === "fa" ?
                                                    <DatePicker className={Style.formSelect}
                                                                isGregorian={false}
                                                                timePicker={false}
                                                                value={date}
                                                                onChange={onSubmitDate}
                                                    /> :
                                                    <DatePicker className={Style.formSelect}
                                                                isGregorian={true}
                                                                timePicker={false}
                                                                value={date}
                                                                onChange={onSubmitDate}
                                                    />
                                                }

                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor=""
                                                       className="">{t("resume.step1.marriageStatus")}</label>
                                            </div>
                                            <div className={Style.selectPart + " col-12 "}>
                                                <select id={'marriageStatus'} className={Style.formSelect}
                                                        aria-label="Default select example">
                                                    {marriage !== undefined && marriage.map((value, index) => (
                                                        <option selected={resume.MarriageStatusId == value.id}
                                                                value={value.id}>
                                                            {sp.get("lang") === "fa" ?
                                                                value.name :
                                                                value.englishName
                                                            }
                                                        </option>
                                                    ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor=""
                                                       className="">{t("resume.step1.militaryStatus")}</label>
                                            </div>
                                            <div className={Style.selectPart + " col-12 "}>
                                                <select id={'miltaryStatus'} className={Style.formSelect}
                                                        aria-label="Default select example">
                                                    {military !== undefined && military.map((value, index) => (
                                                        <option selected={resume.MiltaryStatusId == value.id}
                                                                value={value.id}>
                                                            {sp.get("lang") === "fa" ?
                                                                value.name :
                                                                value.englishName
                                                            }
                                                        </option>
                                                    ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className="">{t("resume.step1.province")}</label>
                                            </div>
                                            <div className={Style.selectPart + " col-12 "}>
                                                <select id={'province'} className={Style.formSelect}
                                                        onChange={(event) => getCityAPI(event.target)}
                                                        onLoad={() => {
                                                            getCityAPIWithoutEvent(CityId)
                                                        }}>
                                                    {
                                                        provinces.map((value, index) => (
                                                            <option
                                                                selected={resume.ProvinceId == value.id}
                                                                value={value.id}
                                                                idCity={value.id}>
                                                                {sp.get("lang") === "fa" ?
                                                                    value.name :
                                                                    value.englishName
                                                                }
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className="">{t("resume.step1.city")}</label>
                                            </div>
                                            <div className={Style.selectPart + " col-12 "}>
                                                <select id={'city'} className={Style.formSelect}
                                                        aria-label="Default select example">
                                                    {city !== undefined && city.map((value, index) => (
                                                        <option selected={resume.CityId == value.id}
                                                                value={value.id}>
                                                            {sp.get("lang") === "fa" ?
                                                                value.name :
                                                                value.englishName
                                                            }
                                                        </option>
                                                    ))
                                                    }
                                                </select>

                                            </div>
                                        </div>
                                        <hr/>

                                        <hr/>

                                    </div>
                                </div>
                                <div className={'col-12 col-lg-5 d-none d-lg-block'}>
                                    <FrameResume step={1}/>
                                </div>
                                <div className={'col-12'}>
                                    <div className={'row'}>


                                        <div className="col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className=""><img src={navigation}
                                                                                    width={25}/> {t("resume.step1.address")}
                                                </label>
                                            </div>
                                            <div className="col-12">
                                            <textarea defaultValue={resume.Address} id={'address'} type="text"
                                                      className="form-control dir-rtl"/>
                                            </div>
                                        </div>
                                        <div className="col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor=""
                                                       className=""><img src={navigation}
                                                                         width={25}/> {t("resume.step1.addressEnglish")}
                                                </label>
                                            </div>
                                            <div className="col-12">
                                            <textarea defaultValue={resume.AddressEnglish} id={'addressEnglish'}
                                                      type="text" className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className=""><img src={smartPhone}
                                                                                    width={25}/> {t("resume.step1.phoneNumber")}
                                                </label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.ResumePhone} id={'resumePhone'} type="text"
                                                       className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className=""><img src={gmail}
                                                                                    width={25}/> {t("resume.step1.email")}
                                                </label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.ResumeEmail} id={'resumeEmail'} type="text"
                                                       className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className=""> <img src={instagram}
                                                                                     width={25}/> {t("resume.step1.instagram")}
                                                </label>

                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.ResumeInsta} id={'resumeInsta'} type="text"
                                                       className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className=""><img src={linkedin}
                                                                                    width={25}/> {t("resume.step1.linkedIn")}
                                                </label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.ResumeLinkedIn} id={'resumeLinkedIn'}
                                                       type="text" className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className=""><img src={telegram}
                                                                                    width={25}/> {t("resume.step1.telegram")}
                                                </label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.ResumeTelegram} id={'resumeTelegram'}
                                                       type="text" className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className=""><img src={gitHub}
                                                                                    width={25}/> {t("resume.step1.github")}
                                                </label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.ResumeGithub} id={'resumeGithub'}
                                                       type="text"
                                                       className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className=""><img src={gitLab}
                                                                                    width={25}/> {t("resume.step1.gitLab")}
                                                </label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.ResumeGitLab} id={'resumeGitLab'}
                                                       type="text"
                                                       className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className=""><img src={bitBucket}
                                                                                    width={25}/> {t("resume.step1.bitBucket")}
                                                </label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.ResumeBitBucket} id={'resumeBitBucket'}
                                                       type="text" className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className=""><img src={phone}
                                                                                    width={25}/> {t("resume.step1.fixedPhone")}
                                                </label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.FixedPhone} id={'fixedPhone'} type="text"
                                                       className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-12'}>
                                    <button id={'submitAdd'} onClick={onSubmit}
                                            className="btn change-float-reverse my-3 mx-3 btn-success">
                                        {t("resume.step1.submit")}
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button onClick={() => history.push({
                                        pathname: getRoutesItems().resumeStep2.route,
                                        search: "lang=" + sp.get("lang"),

                                    })}
                                            className="btn change-float-reverse my-3 mx-3 btn-info">
                                        {t("resume.step1.nextStep")}

                                    </button>
                                    <button onClick={() => history.push({
                                        pathname: getRoutesItems().resumeStep1.route,
                                        search: "lang=" + sp.get("lang"),

                                    })} className="btn change-float my-3 mx-3 btn-danger">
                                        {t("resume.step1.previousStep")}

                                    </button>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-12 col-md-4 mx-auto'}>
                                    <MoonLoader color={color} loading={loading} css={override} size={30}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'position-fixed d-xl-none'} style={{bottom: '20px', left: '20px', zIndex: "1"}}>
                    {modalIsOpen ?
                        <img style={{border: "1px dashed #000", borderRadius: "50%"}}
                             className={Style["filterButton"] + " p-1"} onClick={closeModal} width={'60px'}
                             height={'60px'}
                             src={guide}/>
                        :
                        <img style={{border: "1px dashed #000", borderRadius: "50%"}}
                             className={Style["filterButton"] + " p-1"} onClick={openModal} width={'60px'}
                             height={'60px'}
                             src={guide}/>
                    }

                </div>
            </main>
            <NotificationContainer/>

        </div>
    )
}