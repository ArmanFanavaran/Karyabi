import $ from 'jquery';
import {useEffect, useState} from "react";
import Style from "./ResumeStep2.module.css"
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
import profileImgMan from "./imgs/man.svg";
import profileImgWoman from "./imgs/woman.svg";
import FrameResume from "../frameResume/FrameResume"

export default function ResumeStep2() {
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

    var axios = require('axios');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Resume | Update Profile Picture")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("رزومه | بروزرسانی عکس پروفایل")
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
                console.log(JSON.parse(response.data.data.userInfoJson));
                setResume(JSON.parse(response.data.data.userInfoJson))
                information = JSON.parse(response.data.data.userInfoJson);
                setPicFullAddress(JSON.parse(response.data.data.userInfoJson).PicFullAddress)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    //// Set Pic ////
    const onClickChangeImage = () => {
        $("#picture_input").click();
    }

    //// Set Pic ////
    const onSetPicture = (event) => {
        setLoading(true)
        var axios = require('axios');
        let file = event.target.files[0];
        // setPictureFile(file);
        let reader = new FileReader();
        let url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {

            // setPicturePreview(reader.result)

        }
        var FormData = require('form-data');
        var data = new FormData();
        data.append('id', resumeId);
        data.append('heights[0]', getSizeImageItems().UserPicPro.Heights);
        data.append('widths[0]', getSizeImageItems().UserPicPro.Widths);
        data.append('qualities[0]', getSizeImageItems().UserPicPro.Qualities);
        data.append('heights[1]',getSizeImageItems().UserNavbarPic.Heights)
        data.append('widths[1]', getSizeImageItems().UserNavbarPic.Widths)
        data.append('qualities[1]', getSizeImageItems().UserNavbarPic.Qualities)
        data.append('picFile', file);
        console.log(data)
        var config = {
            method: 'post',
            url: generateURL('/Resume/UpdateUserPicSTP2'),
            headers: {
                // ...data.getHeaders()
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                NotificationManager.success(response.data.message,1000);
                // if (response.data.data.picAddresses.length > 0) {
                //     if (response.data.data.picAddresses[0].length > 0) {
                //         localStorage.setItem(getCookiesItems().userPic.nickName, response.data.data.picAddresses[0]);
                //     }
                // }
                setLoading(false)
                setTimeout(function () {
                    window.location.reload();
                }, 1500);
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
                <NavbarResume step={2}/>
                <div className="container change-dir">
                    <div className={Style.formBox}>
                        <h2 className={Style.formTitle + " change-dir change-text px-3"}>
                            {t("resume.step2.profilePicture")}
                        </h2>
                        <div className="mx-auto">
                            <div className={"row "+ Style.input}>
                                <div className={'col-12 col-lg-7 text-center'}>
                                    <img className={Style.proImg + " rounded-circle mx-auto"}
                                         src={picFullAddress.length > 0 ? picFullAddress[0] : resume.GenderId === 1 ? profileImgMan : profileImgWoman}/>
                                    <br/>
                                    <button onClick={onClickChangeImage} className={'btn btn-light mt-3'}>
                                        {sp.get("lang") === "fa" ?
                                            <span>انتخاب تصویر</span>
                                            :
                                            <span>Select Picture</span>
                                        }
                                    </button>
                                    <input id="picture_input" type="file" accept="image/jpeg image/jpg"
                                           className="d-none"
                                           onChange={onSetPicture}/>
                                </div>
                                <div className={'col-12 col-lg-5 d-none d-lg-block'}>
                                    <FrameResume step={2}/>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button onClick={()=> history.push({
                                        pathname: getRoutesItems().resumeStep3.route,
                                        search: "lang=" + sp.get("lang"),

                                    })}
                                            className="btn change-float-reverse my-3 mx-3 btn-info">
                                        {t("resume.step2.nextStep")}

                                    </button>
                                    <button onClick={()=> history.push({
                                        pathname: getRoutesItems().resumeStep1.route,
                                        search: "lang=" + sp.get("lang"),

                                    })} className="btn change-float my-3 mx-3 btn-danger">
                                        {t("resume.step2.previousStep")}

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
            </main>
            <NotificationContainer/>

        </div>
    )
}