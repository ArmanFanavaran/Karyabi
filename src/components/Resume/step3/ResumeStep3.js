import $ from 'jquery';
import {useEffect, useState} from "react";
import Style from "./ResumeStep3.module.css"
import NavbarResume from "../navbar/NavbarResume"
import {generateURL} from "../../global/Requests";
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";
import DatePicker from 'react-datepicker2';
import {useTranslation} from "react-i18next";
import * as queryString from "query-string";
import * as React from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {initializeTitlesWithValue} from "../../global/Titles";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {useHistory} from "react-router";
import {css} from "@emotion/react";
import {MoonLoader} from "react-spinners";
import FrameResume from "../frameResume/FrameResume"
import guide from "./imgs/guide.png"
import Modal from "react-modal";

export default function ResumeStep3() {
    const history = useHistory();
    const [resumeId, setResumeId] = useState([]);
    let [resume, setResume] = useState("");
    let [picFullAddress, setPicFullAddress] = useState([]);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("rgb(0,30,255)");
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
    const [modalIsOpen, setIsOpen] = React.useState(false);


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


    var axios = require('axios');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Resume | About Me")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("رزومه | درباره من")
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
                setResume(response.data.data)
                information = response.data.data;
            })
            .catch(function (error) {
            });

    }, [])

    function onSubmit() {
        setLoading(true)
        var axios = require('axios');
        var data = JSON.stringify({
            "mainJobTittle": $('#mainJobTittle').val(),
            "aboutMe": $('#aboutMe').val(),
            "mainJobTittleEnglish": $('#mainJobTittleEnglish').val(),
            "aboutMeEnglish": $('#aboutMeEnglish').val(),
            "id": parseInt(resumeId),

        });
        var config = {
            method: 'post',
            url: generateURL('/Resume/UpdateAboutMeSTP3'),
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

    return (
        <div>
            <main className={Style.main}>
                <NavbarResume step={3}/>
                <div className="container change-dir">
                    <div className={Style.formBox}>
                        <h2 className={Style.formTitle + " change-dir change-text px-3"}>
                            {t("resume.step3.aboutMe")}
                        </h2>
                        <div className="mx-auto">
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
                                                <button className={'btn btn-default float-right'} onClick={closeModal}>X</button>

                                            </div>

                                        </div>
                                        <FrameResume step={3}/>

                                    </Modal>
                                </div>
                            </div>

                            <div className={"row "+ Style.input}>
                                <div className={'col-12 col-lg-7'}>
                                    <div className={'row'}>
                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className="">{t("resume.step3.mainJobTittle")}</label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.mainJobTittle} id={'mainJobTittle'} type="text"
                                                       className="form-control dir-rtl"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className="">{t("resume.step3.mainJobTittleEnglish")}</label>
                                            </div>
                                            <div className="col-12">
                                                <input defaultValue={resume.mainJobTittleEnglish} id={'mainJobTittleEnglish'} type="text"
                                                       className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className="col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className="">{t("resume.step3.aboutMe")}</label>
                                            </div>
                                            <div className="col-12">
                                                <textarea defaultValue={resume.aboutMe} id={'aboutMe'} type="text"
                                                       className="form-control dir-rtl"/>
                                            </div>
                                        </div>
                                        <div className="col-12 py-2 change-dir change-text">
                                            <div className="col-12">
                                                <label htmlFor="" className="">{t("resume.step3.aboutMeEnglish")}</label>
                                            </div>
                                            <div className="col-12">
                                                <textarea defaultValue={resume.aboutMeEnglish} id={'aboutMeEnglish'} type="text"
                                                       className="form-control dir-ltr"/>
                                            </div>
                                        </div>
                                        <div className={'col-12'}>
                                            <button id={'submitAdd'} onClick={onSubmit}
                                                    className="btn change-float-reverse my-3 mx-3 btn-success">
                                                {t("resume.step1.submit")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={'col-12 col-lg-5 d-none d-lg-block embed-responsive-16by9'}>
                                    <FrameResume step={3}/>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button onClick={()=> history.push({
                                        pathname: getRoutesItems().resumeStep4.route,
                                        search: "lang=" + sp.get("lang"),

                                    })}  className="btn change-float-reverse my-3 mx-3 btn-info">
                                        {t("resume.step3.nextStep")}

                                    </button>
                                    <button onClick={()=> history.push({
                                        pathname: getRoutesItems().resumeStep2.route,
                                        search: "lang=" + sp.get("lang"),

                                    })} className="btn change-float my-3 mx-3 btn-danger">
                                        {t("resume.step3.previousStep")}

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
                <div className={'position-fixed d-xl-none'} style={{bottom: '20px', left: '20px'}}>
                    <img style={{border:"1px dashed #000",borderRadius:"50%"}} className={Style["filterButton"] + " p-1" } onClick={openModal} width={'60px'} height={'60px'}
                         src={guide}/>
                </div>
            </main>
            <NotificationContainer/>

        </div>
    )
}