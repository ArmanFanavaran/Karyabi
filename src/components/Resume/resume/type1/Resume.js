import $ from 'jquery';
import {useEffect, useState} from "react";
import Style1 from "./ResumeType1.module.css"
import Style2 from "../ResumeType2.module.css"
import Style3 from "../ResumeType3.module.css"
import Style4 from "../ResumeType4.module.css"
import NavbarResume from "../../navbar/NavbarResume"
import {generateURL} from "../../../global/Requests";
import {getSizeImageItems} from "../../../SizeImageList/SizeImageList";
import {useTranslation} from "react-i18next";
import * as queryString from "query-string";
import * as React from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {initializeTitlesWithValue} from "../../../global/Titles";
import {getRoutesItems} from "../../../RoutesList/RoutesList";
import {useHistory} from "react-router";


///// Image Type 1 /////////
import bitbucketType1 from "./imgsType1/bitbucket.svg"
import gitLabType1 from "./imgsType1/gitlab.svg"
import gitHubType1 from "./imgsType1/github.svg"
import linkedinType1 from "./imgsType1/linkedin.svg"
import telegramType1 from "./imgsType1/telegram.svg"
import instagramType1 from "./imgsType1/instagram.svg"
import {RatingStar} from "rating-star";

export default function Resume(src, options) {
    var moment = require("moment-jalaali");
    const history = useHistory();
    const [resumeId, setResumeId] = useState([]);
    let [resume, setResume] = useState("");
    let [userInfoJson, setUserInfoJson] = useState([]);
    let [educationInfoListJson, setEducationInfoListJson] = useState([]);
    let [age, setAge] = useState(0);
    let [languageInfoListJson, setLanguageInfoListJson] = useState([]);
    let [skillInfoListJsonSoftware, setSkillInfoListJsonSoftware] = useState([]);
    let [skillInfoListJson, setSkillInfoListJson] = useState([]);
    let [projectInfoListJson, setProjectInfoListJson] = useState([]);
    let [workInfoListJson, setWorkInfoListJson] = useState([]);
    let [articleInfoListJson, setArticleInfoListJson] = useState([]);
    let [honerInfoListJson, setHonorInfoListJson] = useState([]);
    let [picFullAddress, setPicFullAddress] = useState([]);
    const [t, i18n] = useTranslation('main');
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);

    var axios = require('axios');
    axios.defaults.withCredentials = true;
    let sizeBreak = 1;

    function download() {
        var axios = require('axios');
        $('header').hide()
        $('footer').hide()
        $('#print').hide()
        $('#download').hide()
        $('#firstDiv').removeClass("mt-5")
        $('#firstDiv').removeClass("pt-5")
        $([document.documentElement, document.body]).animate({
            scrollTop: 0
        }, 1000);
        var prevRowHeight = 0;
        // $(".break").each(function () {
        //     // console.log($(this).height());
        //     var maxHeight = 1356 * sizeBreak;
        //     // console.log("position: " + $(this).offset().top + " Height: " + $(this).height())
        //
        //     var eachRowHeight = $(this).offset().top + $(this).height();
        //     // console.log("sub: " + eachRowHeight)
        //
        //     if ((prevRowHeight + eachRowHeight) > maxHeight) {
        //         sizeBreak += 1;
        //         $(this).before('<div style="page-break-before: always;" class="break-before"></div><div class="mt-5 pt-3"></div>');
        //         // $(this).before('<div style="border: 2px solid" ></div>');
        //         console.log("add page break before");
        //     }
        //     console.log("==============================================")
        //     prevRowHeight = $(this).height();
        // });
        var x = "<html>" + document.getElementsByTagName('html')[0].outerHTML + "</html>";
        // console.log($(this).height());
        $(".break-before").remove()

        let xy = "<div class=\"row\">\n" +
            "\t<div class=\"col-12\">\n" +
            "\t\t<div class=\"text-right\" style=\"text-align:center;padding-top:25px\">\n" +
            "\t\t\t<a href=\"www.karyabi.ceunion.ir\">www.karyabi.ceunion.ir</a>\n" +
            "\t\t</div>\n" +
            "\t</div>\n" +
            "</div>"
        console.log(x)
        var data = JSON.stringify({
            "htmlContent": x,
            "styleSheet": "https://karyabi.ceunion.ir/",
            "isStyleSheetInWeb": true,
            "isReadyToDownload": true,
            "pageBreaksEnhancedAlgorithm": true,
            "marginTop": 35,
            "marginLeft": 1,
            "marginRight": 1,
            "marginBottom": 0,
            "footerHeight": 50,
            "footerHtml": "<div class=\"row\">\n\t<div class=\"col-12\">\n\t\t<div class=\"text-right\" style=\"text-align:center;padding-top:25px\">\n\t\t\t<a href=\"www.karyabi.ceunion.ir\">www.karyabi.ceunion.ir</a>\n\t\t</div>\n\t</div>\n</div>",
            "footerBaseUrl": ""
        })
        $('header').show()
        $('footer').show()
        $('#print').show()
        $('#download').show()
        $('#firstDiv').addClass("mt-5")
        $('#firstDiv').addClass("pt-5")
        var config = {
            method: 'post',
            url: generateURL('/VisualOutPutGenerator/GetByteArrayFromHtmlStringViaSelectPdf'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        let information;
        axios(config)
            .then(function (response) {
                const linkSource = `data:application/pdf;base64,` + response.data;
                const downloadLink = document.createElement("a");
                const fileName = "abc.pdf";
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click()
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
                    NotificationManager.error(error.response.data.message);
                } else {
                    NotificationManager.error(error.response.data.Message);

                }
            });


    }

    useEffect(() => {
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Resume | Show Resume")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("رزومه | نمایش رزومه")
        }
        if (sp.get("preview") === "true") {
            $('header').addClass("d-none")
            $('footer').addClass("d-none")
            $('#print').addClass("d-none")
        }
        if (sp.get("scale") !== undefined && sp.get("scale") !== null) {
            $('#firstDiv').css('transform', 'scaleY(0.7)');
            $('#firstDiv').css('transform', 'scaleX(0.9)');
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

                setUserInfoJson(JSON.parse(response.data.data.userInfoJson))
                calculateAge(JSON.parse(response.data.data.userInfoJson).Birthday)
                console.log("user Info");
                console.log(JSON.parse(response.data.data.userInfoJson));
                console.log("=========================");

                setEducationInfoListJson(JSON.parse(response.data.data.educationInfoListJson))
                console.log("education");
                console.log(JSON.parse(response.data.data.educationInfoListJson));
                console.log("=========================");

                setLanguageInfoListJson(JSON.parse(response.data.data.languageInfoListJson))
                console.log("Language");
                console.log(JSON.parse(response.data.data.languageInfoListJson));
                console.log("=========================");

                if (response.data.data.skillInfoListJson.length !== 0) {
                    let skillInfoList = JSON.parse(response.data.data.skillInfoListJson)
                    // IsSoftWare
                    let dataSoft = []
                    let data = []
                    skillInfoList.forEach(function (i) {
                        if ((i.AreaOfInterestEnglish !== null && i.AreaOfInterestEnglish.IsSoftWare === true)) {
                            dataSoft.push(i)
                        } else if ((i.AreaOfInterestEnglish !== null && i.AreaOfInterestEnglish.IsSoftWare === false)) {
                            data.push(i)
                        }
                    });
                    dataSoft.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    data.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    setSkillInfoListJson(data)
                    setSkillInfoListJsonSoftware(dataSoft)
                } else {
                    setSkillInfoListJsonSoftware([])
                    setSkillInfoListJson([])
                }
                console.log("Skill");
                console.log(JSON.parse(response.data.data.skillInfoListJson));
                console.log("=========================");


                if (response.data.data.projectResumeInfoListJson.length !== 0) {
                    let data = JSON.parse(response.data.data.projectResumeInfoListJson)
                    // IsSoftWare
                    data.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    setProjectInfoListJson(data)
                } else {
                    setProjectInfoListJson([])
                }
                console.log("project Info");
                console.log(JSON.parse(response.data.data.projectResumeInfoListJson));
                console.log("=========================");

                if (response.data.data.jobResumeInfoListJson.length !== 0) {
                    let data = JSON.parse(response.data.data.jobResumeInfoListJson)
                    // IsSoftWare
                    data.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    setWorkInfoListJson(data)
                } else {
                    setWorkInfoListJson([])
                }
                console.log("Work Info");
                console.log(JSON.parse(response.data.data.jobResumeInfoListJson));
                console.log("=========================");

                if (response.data.data.articleInfoListJson.length !== 0) {
                    let data = JSON.parse(response.data.data.articleInfoListJson)
                    // IsSoftWare
                    data.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    setArticleInfoListJson(data)
                } else {
                    setArticleInfoListJson([])
                }
                console.log("Article Info");
                console.log(JSON.parse(response.data.data.articleInfoListJson));
                console.log("=========================");

                if (response.data.data.honorInfoListJson.length !== 0) {
                    let data = JSON.parse(response.data.data.honorInfoListJson)
                    // IsSoftWare
                    data.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    setHonorInfoListJson(data)
                } else {
                    setHonorInfoListJson([])
                }
                console.log("Honor Info");
                console.log(JSON.parse(response.data.data.honorInfoListJson));
                console.log("=========================");

                setResume(response.data.data)
                console.log("General Info");
                console.log(response.data.data);
                console.log("=========================");
                information = JSON.parse(response.data.data.userInfoJson);
                setPicFullAddress(JSON.parse(response.data.data.userInfoJson).PicFullAddress)
            })
            .catch(function (error) {
                console.log(error);
            });


    }, [])

    function calculateAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setAge(age)
        // return age;
    }

    function generatePDF(src, options) {
        $('#firstDiv').removeClass("pt-5")
        $('#firstDiv').removeClass("mt-5")
        $('#print').addClass("d-none")
        $('#download').addClass("d-none")
        document.title = 'My new title'
        var prevRowHeight = 0;
        $(".break").each(function () {
            // console.log($(this).height());
            var maxHeight = 1356 * sizeBreak;
            // console.log("position: " + $(this).offset().top + " Height: " + $(this).height())

            var eachRowHeight = $(this).offset().top + $(this).height();
            // console.log("sub: " + eachRowHeight)

            if ((prevRowHeight + eachRowHeight) > maxHeight) {
                sizeBreak += 1;
                $(this).before('<div style="page-break-before: always;" ></div>');
                // $(this).before('<div style="border: 2px solid" ></div>');
                console.log("add page break before");
            }
            console.log("==============================================")
            prevRowHeight = $(this).height();
        });
        window.print()
        $('#firstDiv').addClass("pt-5")
        $('#firstDiv').addClass("mt-5")
        $('#print').removeClass("d-none")
        $('#download').removeClass("d-none")

    }


    return (
        <div className={'container'}>
            <div className={'row'}>
                <div id={'firstDiv'} className={'mx-auto my-5 pt-5 w-100 ' + Style1.mainParent}>
                    <div id="test" className={Style1.main + " " + Style1.maxWidth + " " + Style1.maxHeight}>
                        <div className={Style1.header + " change-dir"}>
                            <h1>
                        <span>

                                {
                                    sp.get("lang") === "fa" ?
                                        userInfoJson.FirstName !== null && userInfoJson.FirstName !== undefined ? userInfoJson.FirstName : null :
                                        userInfoJson.FirstNameEnglish !== null && userInfoJson.FirstNameEnglish !== undefined ? userInfoJson.FirstNameEnglish : null

                                }

                        </span>
                                <span>  </span>
                                <span>
                                   {
                                       sp.get("lang") === "fa" ?
                                           userInfoJson.LastName !== null && userInfoJson.LastName !== undefined ? userInfoJson.LastName : null :
                                           userInfoJson.LastNameEnglish !== null && userInfoJson.LastNameEnglish !== undefined ? userInfoJson.LastNameEnglish : null

                                   }
                                </span>

                            </h1>
                            {
                                sp.get("lang") === "fa" ?
                                    <p>

                                        <span>
                                            {
                                                age !== null && age !== undefined ? age + " ساله - " : null
                                            }

                                        </span>

                                        <span>

                                            {
                                                resume.mainJobTittle !== null && resume.mainJobTittle !== undefined ? resume.mainJobTittle+" - " : null

                                            }
                                        </span>
                                    </p>
                                    :

                                    <p>

                                        {
                                            age !== null && age !== undefined ? age + " years old - " : null
                                        }
                                        {
                                            resume.mainJobTittleEnglish !== null && resume.mainJobTittleEnglish !== undefined ? resume.mainJobTittleEnglish : null
                                        }
                                    </p>
                            }
                        </div>
                        <div className={Style1.hero}>
                            <div className="row change-dir change-text">
                                <div className="col-4">
                                    <div className={Style1.waysOfCommunication}>
                                        {
                                            userInfoJson.FixedPhone !== null && userInfoJson.FixedPhone !== "" ?
                                                <div className={Style1.communication + " break"}>
                                                    <div className={Style1.icon}>
                                                        <i className="fas fa-phone"></i>
                                                    </div>
                                                    {
                                                        sp.get("lang") === "fa" ?
                                                            <p>
                                                                تلفن ثابت.
                                                                <a href={"tel:" + userInfoJson.FixedPhone}
                                                                   className="d-block">
                                                                    <span
                                                                        className="d-block">  {userInfoJson.FixedPhone}</span>
                                                                </a>
                                                            </p> :
                                                            <p>
                                                                FIXED PHONE.
                                                                <a href={"tel:" + userInfoJson.FixedPhone}
                                                                   className="d-block">
                                                                    <span
                                                                        className="d-block">  {userInfoJson.FixedPhone}</span>
                                                                </a>
                                                            </p>

                                                    }
                                                </div> : null
                                        }
                                        {
                                            userInfoJson.ResumePhone !== null && userInfoJson.ResumePhone !== "" ?
                                                <div className={Style1.communication + " break"}>
                                                    <div className={Style1.icon}>
                                                        <i className="fas fa-phone"></i>
                                                    </div>
                                                    {
                                                        sp.get("lang") === "fa" ?
                                                            <p>
                                                                تلفن همراه.
                                                                <a href={"tel:" + userInfoJson.ResumePhone}
                                                                   className="d-block">
                                                                    <span
                                                                        className="d-block"> {userInfoJson.ResumePhone}</span>
                                                                </a>
                                                            </p> :

                                                            <p>
                                                                PHONE.
                                                                <a href={"tel:" + userInfoJson.ResumePhone}
                                                                   className="d-block">
                                                                    <span
                                                                        className="d-block">{userInfoJson.ResumePhone}</span>
                                                                </a>
                                                            </p>
                                                    }
                                                </div> :
                                                null
                                        }
                                        {
                                            userInfoJson.ResumeEmail !== null && userInfoJson.ResumeEmail !== "" ?
                                                <div className={Style1.communication + " break"}>
                                                    <div className={Style1.icon}>
                                                        <i className="fas fa-envelope"></i>
                                                    </div>
                                                    {
                                                        sp.get("lang") === "fa" ?

                                                            <p>
                                                                ایمیل.
                                                                <a href={"mailto:" + userInfoJson.ResumeEmail}
                                                                   className="d-block">
                                                                    <span
                                                                        className="d-block">{userInfoJson.ResumeEmail}</span>
                                                                </a>
                                                            </p>

                                                            :
                                                            <p>
                                                                EMAIL .
                                                                <a href={"mailto:" + userInfoJson.ResumeEmail}
                                                                   className="d-block">
                                                                    <span
                                                                        className="d-block"> {userInfoJson.ResumeEmail}</span>
                                                                </a>
                                                            </p>
                                                    }
                                                </div> :
                                                null
                                        }

                                        {
                                            userInfoJson.ResumeBitBucket !== null && userInfoJson.ResumeBitBucket !== "" ?
                                                <div className={Style1.communication + " break"}>
                                                    <div className={Style1.icon}>
                                                        <img src={bitbucketType1} alt={"bitbucket"}/>
                                                    </div>
                                                    {
                                                        sp.get("lang") === "fa" ?

                                                            <p>
                                                                بیت باکت.
                                                                <span
                                                                    className="d-block">{userInfoJson.ResumeBitBucket}</span>
                                                            </p>

                                                            :
                                                            <p>
                                                                BITBUCKET .
                                                                <span
                                                                    className="d-block"> {userInfoJson.ResumeBitBucket}</span>
                                                            </p>
                                                    }
                                                </div> :
                                                null
                                        }
                                        {
                                            userInfoJson.ResumeGitLab !== null && userInfoJson.ResumeGitLab !== "" ?
                                                <div className={Style1.communication + " break"}>
                                                    <div className={Style1.icon}>
                                                        <img width={35} src={gitLabType1}/>
                                                    </div>
                                                    {
                                                        sp.get("lang") === "fa" ?

                                                            <p>
                                                                گیت لب.
                                                                <span
                                                                    className="d-block">{userInfoJson.ResumeGitLab}</span>
                                                            </p>

                                                            :
                                                            <p>
                                                                GITLAB .
                                                                <span
                                                                    className="d-block"> {userInfoJson.ResumeGitLab}</span>
                                                            </p>
                                                    }
                                                </div> :
                                                null
                                        }
                                        {
                                            userInfoJson.ResumeGithub !== null && userInfoJson.ResumeGithub !== "" ?
                                                <div className={Style1.communication + " break"}>
                                                    <div className={Style1.icon}>
                                                        <img width={35} src={gitHubType1}/>
                                                    </div>
                                                    {
                                                        sp.get("lang") === "fa" ?

                                                            <p>
                                                                گیت هاب.

                                                                <span
                                                                    className="d-block">{userInfoJson.ResumeGithub}</span>

                                                            </p>

                                                            :
                                                            <p>
                                                                GITHUB .

                                                                <span
                                                                    className="d-block"> {userInfoJson.ResumeGithub}</span>

                                                            </p>
                                                    }
                                                </div> :
                                                null
                                        }
                                        {
                                            userInfoJson.ResumeLinkedIn !== null && userInfoJson.ResumeLinkedIn !== "" ?
                                                <div className={Style1.communication + " break"}>
                                                    <div className={Style1.icon}>
                                                        <img width={30} src={linkedinType1}/>
                                                    </div>
                                                    {
                                                        sp.get("lang") === "fa" ?

                                                            <p>
                                                                لینکدین.

                                                                <span
                                                                    className="d-block">{userInfoJson.ResumeLinkedIn}</span>

                                                            </p>

                                                            :
                                                            <p>
                                                                LINKEDIN .

                                                                <span
                                                                    className="d-block"> {userInfoJson.ResumeLinkedIn}</span>

                                                            </p>
                                                    }
                                                </div> :
                                                null
                                        }
                                        {
                                            userInfoJson.ResumeTelegram !== null && userInfoJson.ResumeTelegram !== "" ?
                                                <div className={Style1.communication + " break"}>
                                                    <div className={Style1.icon}>
                                                        <img width={30} src={telegramType1}/>
                                                    </div>
                                                    {
                                                        sp.get("lang") === "fa" ?

                                                            <p>
                                                                تلگرام.

                                                                <span
                                                                    className="d-block">{userInfoJson.ResumeTelegram}</span>

                                                            </p>

                                                            :
                                                            <p>
                                                                TELEGRAM .

                                                                <span
                                                                    className="d-block"> {userInfoJson.ResumeTelegram}</span>

                                                            </p>
                                                    }
                                                </div> :
                                                null
                                        }
                                        {
                                            userInfoJson.ResumeInsta !== null && userInfoJson.ResumeInsta !== "" ?
                                                <div className={Style1.communication + " break"}>
                                                    <div className={Style1.icon}>
                                                        <img width={30} src={instagramType1}/>
                                                    </div>
                                                    {
                                                        sp.get("lang") === "fa" ?

                                                            <p>
                                                                اینستاگرام.

                                                                <span
                                                                    className="d-block">{userInfoJson.ResumeInsta}</span>

                                                            </p>

                                                            :
                                                            <p>
                                                                INSTAGRAM .

                                                                <span
                                                                    className="d-block"> {userInfoJson.ResumeInsta}</span>

                                                            </p>
                                                    }
                                                </div> :
                                                null
                                        }
                                        {/*<div className={Style1.communication + " break"}>*/}
                                        {/*    <div className={Style1.icon}>*/}
                                        {/*        <i className="fas fa-globe-europe"></i>*/}
                                        {/*    </div>*/}
                                        {/*    <p>*/}
                                        {/*        WEBSITE.*/}
                                        {/*        <span className="d-block">*/}
                                        {/*        www.reallygreatiste.com*/}
                                        {/*        </span>*/}
                                        {/*    </p>*/}
                                        {/*</div>*/}
                                        {(userInfoJson.Address !== null && userInfoJson.Address !== "" && sp.get("lang") === "fa") || (userInfoJson.AddressEnglish !== null && userInfoJson.AddressEnglish !== "" && sp.get("lang") !== "fa") ?
                                            <div className={Style1.communication + " break"}>
                                                <div className={Style1.icon}>
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </div>

                                                {
                                                    sp.get("lang") === "fa" ?

                                                        <p>
                                                            آدرس.

                                                            <span
                                                                className="d-block">{userInfoJson.Address}</span>

                                                        </p>

                                                        :
                                                        <p>
                                                            ADDRESS.

                                                            <span
                                                                className="d-block"> {userInfoJson.AddressEnglish}</span>

                                                        </p>
                                                }
                                            </div>
                                            : null
                                        }
                                    </div>
                                    {skillInfoListJson !== null && skillInfoListJson !== undefined && skillInfoListJson !== [] ?
                                        <div className={Style1.skills}>
                                            <h6 className={Style1.titlePart}>
                                                {
                                                    sp.get("lang") === "fa" ?
                                                        "مهارت های من" :
                                                        "my skills"
                                                }
                                            </h6>
                                            <div className="col-12 break">

                                                {skillInfoListJson !== undefined && skillInfoListJson !== [] && skillInfoListJson.map((value, index) => (

                                                    <div>
                                                        {/*<span>{value.LanguageString}</span>*/}
                                                        <ul className={'mb-0'}>
                                                            <li>
                                                                {
                                                                    sp.get("lang") === "fa" ?
                                                                        value.AreaOfInterestPersian !== null ? value.AreaOfInterestPersian.Name : null :
                                                                        value.AreaOfInterestEnglish !== null ? value.AreaOfInterestEnglish.Name : null
                                                                }
                                                            </li>
                                                        </ul>


                                                        {resume.skillInfoLevelShown ?
                                                            <div>
                                                                <RatingStar
                                                                    id="clickable"
                                                                    rating={value.Level}
                                                                />
                                                            </div> : null
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        </div> : null
                                    }
                                    {skillInfoListJsonSoftware !== null && skillInfoListJsonSoftware !== undefined && skillInfoListJsonSoftware !== [] ?
                                        <div className={Style1.skills}>
                                            <h6 className={Style1.titlePart}>
                                                {
                                                    sp.get("lang") === "fa" ?
                                                        "مهارت های نرم افزاری" :
                                                        "software skills"
                                                }
                                            </h6>
                                            <div className="col-12">
                                                {skillInfoListJsonSoftware !== undefined && skillInfoListJsonSoftware !== [] && skillInfoListJsonSoftware.map((value, index) => (

                                                    <div className={'break'}>
                                                        {/*<span>{value.LanguageString}</span>*/}
                                                        <ul className={'mb-0'}>
                                                            <li>{value.AreaOfInterestEnglish !== null ? value.AreaOfInterestEnglish.Name : null}</li>
                                                        </ul>


                                                        {resume.skillInfoLevelShown ?
                                                            <div>
                                                                <RatingStar
                                                                    id="clickable"
                                                                    rating={value.Level}
                                                                />
                                                            </div> : null
                                                        }

                                                    </div>
                                                ))}
                                            </div>
                                        </div> : null
                                    }
                                    {educationInfoListJson !== null && educationInfoListJson !== undefined && educationInfoListJson !== [] ?
                                        <div className={Style1.educations}>
                                            {
                                                sp.get("lang") === "fa" ?
                                                    <h6 className={Style1.titlePart}>
                                                        تحصیلات
                                                    </h6> :
                                                    <h6 className={Style1.titlePart}>
                                                        eduction
                                                    </h6>
                                            }
                                            {educationInfoListJson !== null && educationInfoListJson !== undefined && educationInfoListJson !== [] && educationInfoListJson.map((value, index) => (
                                                <div className={Style1.educationItem + " break"}>
                                                    <ul className={'mb-0'}>
                                                        <li>
                                                            <p>
                                                                {value.DegreeString} {sp.get("lang") === "fa" ? null : "of"} {(value.MajorString !== null && value.MajorString !== "") ? value.MajorString : sp.get("lang") === "fa" ? value.MajorNamePersian : value.MajorNameEnglish}
                                                                <span>
                                                        {(value.UniString !== null && value.UniString !== "") ? value.UniString : sp.get("lang") === "fa" ? value.UniNamePersian : value.UniNameEnglish} - {value.UniTypeString}
                                                                </span>
                                                                {sp.get("lang") === "en" ?
                                                                    <span>
                                                                    {moment(value.SDate).format('YYYY')} - {value.isEducation ? "Present" : moment(value.EDate).format('YYYY')}

                                                                </span> :
                                                                    <span>
                                                                    {moment(value.SDate).format('jYYYY')} - {value.isEducation ? "تاکنون (درحال تحصیل)" : moment(value.EDate).format('jYYYY')}

                                                                </span>
                                                                }

                                                            </p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))

                                            }

                                        </div> : null
                                    }
                                </div>
                                <div
                                    className={sp.get("lang") === "fa" ? Style1.lineSecondPersian + " col-7" : Style1.lineSecond + " col-7"}>
                                    <div className={Style1.profileInfo}>
                                        {
                                            resume.aboutMe !== null || resume.aboutMeEnglish !== null ?
                                                <div>
                                                    <h6 className={Style1.titlePart}>
                                                        {
                                                            sp.get("lang") === "fa" ?
                                                                "اطلاعات شخصی" :
                                                                "profile info"
                                                        }
                                                    </h6>
                                                    <p>
                                                        {
                                                            sp.get("lang") === "fa" ?
                                                                resume.aboutMe :
                                                                resume.aboutMeEnglish
                                                        }
                                                    </p>
                                                </div> : null
                                        }
                                        {languageInfoListJson !== null && languageInfoListJson !== undefined && languageInfoListJson !== [] ?
                                            <div className={Style1.languages + " pt-2"}>
                                                <h6 className={Style1.titlePart}>
                                                    {
                                                        sp.get("lang") === "fa" ?
                                                            "زبان :" :
                                                            "Language:"
                                                    }
                                                </h6>
                                                <div className={Style1.languageItem + " px-2 break"}>
                                                    <div className="row">
                                                        {languageInfoListJson !== undefined && languageInfoListJson !== [] && languageInfoListJson.map((value, index) => (
                                                            <div className="col-12">
                                                                {/*<span>{value.LanguageString}</span>*/}
                                                                <ul className={'mb-0'}>
                                                                    <li>{value.LanguageString}</li>
                                                                </ul>


                                                                {resume.languageInfoLevelShown ?
                                                                    <div>
                                                                        <RatingStar
                                                                            id="clickable"
                                                                            rating={value.Level}
                                                                        />
                                                                    </div> : null
                                                                }

                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>

                                            </div> : null
                                        }
                                    </div>
                                    {projectInfoListJson !== null && projectInfoListJson !== undefined && projectInfoListJson !== [] ?
                                        <div className={Style1.experiences + " pt-2"}>
                                            <h6 className={Style1.titlePart}>
                                                {
                                                    sp.get("lang") === "fa" ?
                                                        "پروژه ها :" :
                                                        "Project :"
                                                }
                                            </h6>
                                            {projectInfoListJson !== undefined && projectInfoListJson !== [] && projectInfoListJson.map((value, index) => (
                                                <div className={Style1.experienceItem + " break"}>
                                                <span>
                                                       {
                                                           sp.get("lang") === "fa" ?
                                                               value.Title :
                                                               value.TitleEnglish
                                                       }
                                                </span>
                                                    <span>
                                                       {sp.get("lang") === "en" ?
                                                           <span>
                                                                    {moment(value.SDate).format('YYYY')} - {value.IsDoing ? "Present" : moment(value.EDate).format('YYYY')}

                                                                </span> :
                                                           <span>
                                                                    {moment(value.SDate).format('jYYYY')} - {value.IsDoing ? "تاکنون (درحال توسعه)" : moment(value.EDate).format('jYYYY')}

                                                                </span>
                                                       }
                                                </span>
                                                    <ul className="pt-2">
                                                        <li>
                                                            {sp.get("lang") === "en" ?
                                                                "Website Address: " :
                                                                "ادرس وبسایت: "
                                                            }
                                                            <a href={value.WebAddress}>{value.WebAddress}</a>
                                                        </li>
                                                        <li>
                                                            {sp.get("lang") === "en" ?
                                                                value.CompleteInfoEnglish
                                                                : value.CompleteInfo
                                                            }
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))
                                            }
                                        </div> : null
                                    }
                                    {workInfoListJson !== null && workInfoListJson !== undefined && workInfoListJson !== [] ?
                                        <div className={Style1.experiences + " pt-2"}>
                                            <h6 className={Style1.titlePart}>
                                                {
                                                    sp.get("lang") === "fa" ?
                                                        "تجربه کاری :" :
                                                        "Work experience:"
                                                }
                                            </h6>
                                            {workInfoListJson !== undefined && workInfoListJson !== [] && workInfoListJson.map((value, index) => (
                                                <div className={Style1.experienceItem + " break"}>
                                                <span>
                                                       {
                                                           sp.get("lang") === "fa" ?
                                                               value.IsChief === true ? "مدیر ارشد" : value.IsExpert === true ? "متخصص" : value.IsManager === true ? "مدیر" : value.IsNewComer === true ? "تازه کار" : null :
                                                               value.IsChief === true ? "Chief" : value.IsExpert === true ? "Expert" : value.IsManager === true ? "Manager" : value.IsNewComer === true ? "NewComer" : null
                                                       }
                                                    {
                                                        sp.get("lang") === "fa" ?
                                                            " " + value.Position
                                                            : " " + value.PositionEnglish
                                                    }
                                                </span>
                                                    <span>
                                                       {sp.get("lang") === "en" ?
                                                           <span>
                                                                    {moment(value.SDate).format('YYYY')} - {value.isWorking ? "Present" : moment(value.EDate).format('YYYY')}, {" " + value.InstituteNameEnglish}

                                                                </span> :
                                                           <span>
                                                                    {moment(value.SDate).format('jYYYY')} - {value.isWorking ? "تاکنون (درحال کار)" : moment(value.EDate).format('jYYYY')}, {" " + value.InstituteName}

                                                                </span>
                                                       }
                                                </span>
                                                    <ul className="pt-2">
                                                        <li>
                                                            {sp.get("lang") === "en" ?
                                                                value.CompleteInfoEnglish
                                                                : value.CompleteInfo
                                                            }
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))
                                            }
                                        </div> : null
                                    }
                                    {articleInfoListJson !== null && articleInfoListJson !== undefined && articleInfoListJson !== [] ?
                                        <div className={Style1.references + " pt-2"}>
                                            <h6 className={Style1.titlePart}>
                                                {
                                                    sp.get("lang") === "fa" ?
                                                        "مقالات :" :
                                                        "Article :"
                                                }
                                            </h6>
                                            {articleInfoListJson !== undefined && articleInfoListJson !== [] && articleInfoListJson.map((value, index) => (
                                                <div className={Style1.experienceItem + " break"}>
                                                        <span>
                                                       {
                                                           sp.get("lang") === "fa" ?
                                                               value.Title :
                                                               value.TitleEnglish
                                                       }
                                                        </span>
                                                    <span>
                                                            {
                                                                sp.get("lang") === "fa" ?
                                                                    moment(value.ReleaseDate).format('jYYYY') + " , " + value.BookMaker :
                                                                    value.BookMakerEnglish + " ," + moment(value.ReleaseDate).format('YYYY')
                                                            }
                                                            </span>


                                                    <ul className="pt-2">
                                                        <li>
                                                            {
                                                                sp.get("lang") === "fa" ?
                                                                    value.CompleteInfo :
                                                                    value.CompleteInfoEnglish
                                                            }
                                                        </li>
                                                    </ul>
                                                </div>

                                            ))}
                                        </div> : null
                                    }
                                    {honerInfoListJson !== null && honerInfoListJson !== undefined && honerInfoListJson !== [] ?
                                        <div className={Style1.references + " pt-2"}>
                                            <h6 className={Style1.titlePart}>
                                                {
                                                    sp.get("lang") === "fa" ?
                                                        "افتخارات :" :
                                                        "Honor :"
                                                }
                                            </h6>
                                            {honerInfoListJson !== undefined && honerInfoListJson !== [] && honerInfoListJson.map((value, index) => (
                                                <div className={Style1.experienceItem + " break"}>
                                                        <span>
                                                       {
                                                           sp.get("lang") === "fa" ?
                                                               value.Title :
                                                               value.TitleEnglish
                                                       }
                                                        </span>
                                                    <span>
                                                            {
                                                                sp.get("lang") === "fa" ?
                                                                    moment(value.Date).format('jYYYY') :
                                                                    moment(value.Date).format('YYYY')
                                                            }
                                                            </span>


                                                    <ul className="pt-2">
                                                        <li>
                                                            {
                                                                sp.get("lang") === "fa" ?
                                                                    value.CompleteInfo :
                                                                    value.CompleteInfoEnglish
                                                            }
                                                        </li>
                                                    </ul>
                                                </div>

                                            ))}
                                        </div> : null
                                    }


                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={'row pb-5'}>

                <button id={'print'} className="btn btn-primary mx-3 py-2 px-5" onClick={generatePDF}>
                    {
                        sp.get("lang") === "fa" ?
                            "پرینت" :
                            "Print"
                    }
                </button>
                <button id={'download'} className="btn btn-primary mx-3 py-2 px-5" onClick={download}>
                    {
                        sp.get("lang") === "fa" ?
                            "دانلود" :
                            "download"
                    }

                </button>
            </div>
        </div>
    )

}