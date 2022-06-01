import $ from 'jquery';
import * as React from "react";
import {useEffect, useState} from "react";
import Style from "./ResumeStep12.module.css"
import NavbarResume from "../navbar/NavbarResume"
import {generateURL} from "../../global/Requests";
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";
import {useTranslation} from "react-i18next";
import * as queryString from "query-string";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {initializeTitlesWithValue} from "../../global/Titles";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {useHistory} from "react-router";
import {css} from "@emotion/react";
import {MoonLoader} from "react-spinners";
import addImg from "./imgs/add.svg";
import minus from "./imgs/minus.svg";
import Modal from "react-modal";
import Delete from "./imgs/delete.png";
import trash from "./imgs/trash.svg"
import guide from "./imgs/guide.png"
import FrameResume from "../frameResume/FrameResume";

export default function ResumeStep12() {
    var moment = require("moment-jalaali");
    const history = useHistory();
    const [resumeId, setResumeId] = useState(0);
    let [resume, setResume] = useState([]);
    const [tmp, setTmp] = React.useState([]);
    let [loading, setLoading] = useState(false);
    let [statusProv, setStatusProv] = useState(false);
    let [type, setType] = useState("");
    let [province, setProvince] = useState([]);
    let [category, setCategory] = useState([]);
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
    const customStyles = {

        content: {
            top: '56%',
            left: '50%',
            width: '90%',
            maxWidth: '600px',
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
            minHeight: '35vh',
            transform: 'translate(-50%, -50%)',

        },

        "@media only screen and (max-width: 375px)": {
            backgroundColor: 'red'
        },

        webkitScrollbar: {width: "1em"},
        webkitScrollbarTrack: {boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)"},
        webkitScrollbarThumb: {backgroundColor: "darkgrey", outline: "1px solid slategrey"}

    };// Modal.setAppElement('#yourAppElement');
    const customStylesGuide = {

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
    const [modalIsOpenGuide, setIsOpenGuide] = React.useState(false);


    /************** Modal **************/

    function openModalGuide() {
        setIsOpenGuide(true);
        document.body.style.overflow = 'hidden';

    }
    function closeModalGuide() {
        setIsOpenGuide(false);
        document.body.style.overflow = 'visible';

    }
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';

    }


    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'visible';

        $('#open').removeClass('d-none')
        $('#close').addClass('d-none')
        $('#submitAdd').addClass('d-none')
        $('#submitEdit').removeClass('d-none')


    }

    var axios = require('axios');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Resume | Job Preferences")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("رزومه | ترجیحات شغلی")
        }
        onGetResume();

    }, [])

    function getProvinces(data) {
        var config = {
            method: 'get',
            url: generateURL('/SideArray/GetProvinceList'),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(config)
            .then(function (response) {
                let provDate = response.data.data
                var orginalData = [];
                let state = true;

                    for (var i = 0; i < provDate.length; i++) {
                        state = true
                        if(data!== null && data!==undefined) {
                            for (var j = 0; j < data.length; j++) {
                                if (provDate[i].id === data[j].ProvinceId) {
                                    state = false
                                }
                            }
                        }
                        if (state) {
                            orginalData.push(provDate[i])
                        }
                }
                setProvince(orginalData)
                console.log(orginalData)

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

    function getCategory(data) {
        var config = {
            method: 'get',
            url: generateURL('/Side/GetJobCategoryList'),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(config)
            .then(function (response) {
                let provDate = response.data.data
                var orginalData = [];
                let state = true;
                for (var i = 0; i < provDate.length; i++) {
                    state = true
                    if(data!== null && data!==undefined) {
                        for (var j = 0; j < data.length; j++) {
                            if (provDate[i].id === data[j].JobCategoryId) {
                                state = false
                            }
                        }
                    }
                    if (state) {
                        orginalData.push(provDate[i])
                    }
                }
                setCategory(orginalData)
                console.log(orginalData)

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

    function onSubmitAdd(type) {
        setLoading(true)
        console.log(type)
        if (type === "province") {
            var data = JSON.stringify({
                "id": parseInt(resumeId),
                "provinceId": parseInt($('#provinces').val())
            });
            console.log(data)
            var config = {
                method: 'post',
                url: generateURL('/Resume/AddUserJobInfoProvinceSTP11'),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    setLoading(false)
                    NotificationManager.success(response.data.message, '', 1000);
                    onGetResume();
                    $('#form').addClass('d-none')
                    $('#open').removeClass('d-none')
                    $('#close').addClass('d-none')
                    $('#skillName').val("")
                    // $([document.documentElement, document.body]).animate({
                    //     scrollTop: 0
                    // }, 1000);
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

        } else if (type === "category") {
            var data = JSON.stringify({
                "id": parseInt(resumeId),
                "jobCategoryId": parseInt($('#category').val())

            });
            console.log(data)
            var config = {
                method: 'post',
                url: generateURL('/Resume/AddUserJobInfoJobCategorySTP11'),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    setLoading(false)
                    NotificationManager.success(response.data.message, '', 1000);
                    onGetResume()
                    $('#form').addClass('d-none')
                    $('#open').removeClass('d-none')
                    $('#close').addClass('d-none')
                    // $([document.documentElement, document.body]).animate({
                    //     scrollTop: 0
                    // }, 1000);
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
        closeModal()
    }


    ////// Delete Index /////////
    const onDelete = (id, type) => {
        setLoading(true)
        if (type === "province") {
            var data = JSON.stringify({
                "id": parseInt(resumeId),
                "userJobInfoInProvinceId": parseInt(id)
            });
            console.log(data)
            var config = {
                method: 'post',
                url: generateURL('/Resume/RemoveUserJobInfoProvinceSTP11'),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    onGetResume();
                    setLoading(false)
                    NotificationManager.success(response.data.message, '', 1000);
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
        } else if (type === "category") {
            var data = JSON.stringify({
                "id": parseInt(resumeId),
                "userJobInJobCategoryId": parseInt(id)
            });
            console.log(data)
            var config = {
                method: 'post',
                url: generateURL('/Resume/RemoveUserJobInfoJobCategorySTP11'),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    onGetResume();
                    setLoading(false)
                    NotificationManager.success(response.data.message, '', 1000);
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

    }

    ///// Edit Index //////////

    const setAddSkill = (x) => {
        if (x === "province") {
            setType("province")
        } else {
            setType("category")
        }
        openModal()
    }
    const setCloseForm = () => {
        $('#openProvince').removeClass('d-none')
        $('#closeProvince').addClass('d-none')
        $([document.documentElement, document.body]).animate({
            scrollTop: 0
        }, 1000);
    }

    ///// Get Resume ///////
    const onGetResume = () => {
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
                // console.log(response.data.data)
                setResumeId(response.data.data.id)
                setResume(JSON.parse(response.data.data.userInfoJson).UserJobInfo)
                // tmp=JSON.parse(response.data.data.userInfoJson).UserJobInfo;
                setTmp(JSON.parse(response.data.data.userInfoJson).UserJobInfo)
                console.log("Job Resume ")
                console.log(JSON.parse(response.data.data.userInfoJson).UserJobInfo)
                getProvinces(JSON.parse(response.data.data.userInfoJson).UserJobInfo.UserJobInProvinces)
                getCategory(JSON.parse(response.data.data.userInfoJson).UserJobInfo.UserJobInJobCategories)
                // let data=JSON.parse(response.data.data.skillInfoListJson);

            })
            .catch(function (error) {
            });
    }

    ///// update info ////
    const update = (name, value) => {
        console.log(value)
        console.log(name)
        console.log(tmp.isFullTime)
        var data = JSON.stringify({
            "id": parseInt(resumeId),
            "isFullTime": (name === "isFullTime" ? String(value) === 'true' : tmp.IsFullTime),
            "isPartTime": (name === "isPartTime" ? String(value) === 'true' : tmp.IsPartTime),
            "isRemote": (name === "isRemote" ? String(value) === 'true' : tmp.IsRemote),
            "isInternship": (name === "isInternship" ? String(value) === 'true' : tmp.IsInternship),
            "isNewComer": (name === "isNewComer" ? String(value) === 'true' : tmp.IsNewComer),
            "isExpert": (name === "isExpert" ? String(value) === 'true' : tmp.IsExpert),
            "isManager": (name === "isManager" ? String(value) === 'true' : tmp.IsManager),
            "isChief": (name === "isChief" ? String(value) === 'true' : tmp.IsChief),
            "isPromotionPossible": (name === "isPromotionPossible" ? String(value) === 'true' : tmp.IsPromotionPossible),
            "isInsurancePossible": (name === "isInsurancePossible" ? String(value) === 'true' : tmp.IsInsurancePossible),
            "isCoursePossible": (name === "isCoursePossible" ? String(value) === 'true' : tmp.isCoursePossible),
            "isFlexibleWorkTimePossible": (name === "isFlexibleWorkTimePossible" ? String(value) === 'true' : tmp.IsFlexibleWorkTimePossible),
            "isCommutingServicePossible": (name === "isCommutingServicePossible" ? String(value) === 'true' : tmp.IsCommutingServicePossible),
            "isFreeFoodPossible": (name === "isFreeFoodPossible" ? String(value) === 'true' : tmp.IsFreeFoodPossible),
            "jobStatusId": parseInt("0"),
            "salaryStatus": parseInt("0"),
            "isReadyToWokInAllProvinces": (name === "isReadyToWokInAllProvinces" ? String(value) === 'true' : tmp.IsReadyToWokInAllProvinces),
        });
        console.log(data)
        var config = {
            method: 'post',
            url: generateURL('/Resume/CompleteUserJobInfoSTP11'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                setLoading(false)
                NotificationManager.success(response.data.message, '', 1000);
                setTmp(JSON.parse(data));
                console.log("tmp val")
                console.log(tmp)
                onGetResume()
                $('#form').addClass('d-none')
                $('#openProvince').removeClass('d-none')
                $('#closeProvince').addClass('d-none')
                // $([document.documentElement, document.body]).animate({
                //     scrollTop: 0
                // }, 1000);
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
                <NavbarResume step={12}/>
                <div className="container change-dir">
                    <div className={Style.formBox}>
                        <div className="row">
                            <div className={'col-12'}>
                                <h2 className={Style.formTitle + " change-dir change-text px-3"}>
                                    {t("resume.step12.jobPreferences")}
                                </h2>
                            </div>
                        </div>
                        <div className="mx-auto">
                            <div className={'row d-xl-none'}>
                                <div className={'col-12'}>
                                    <Modal
                                        isOpen={modalIsOpenGuide}
                                        // onAfterOpen={afterOpenModal}
                                        onRequestClose={closeModalGuide}
                                        style={customStylesGuide}
                                        contentLabel="Example Modal"
                                    >
                                        <div className={'row'}>
                                            <div className={'col-12'}>
                                                <button className={'btn btn-default float-right'} onClick={closeModalGuide}>X</button>

                                            </div>

                                        </div>
                                        <FrameResume step={12}/>

                                    </Modal>
                                </div>
                            </div>

                            <Modal
                                isOpen={modalIsOpen}
                                // onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <button className={'btn btn-default float-right'} onClick={closeModal}>X</button>
                                <div className={'container '}>
                                    <div className="row change-dir">

                                        <div className="col-12" id={'form'}>
                                            <div className={'row'}>
                                                {
                                                    type === "province" ?
                                                        <div className="col-md-6 col-12 py-2 change-dir change-text">
                                                            <div className="col-12">
                                                                <label htmlFor=""
                                                                       className="">{t("resume.step12.province")}</label>
                                                            </div>
                                                            <div className={Style.selectPart + " col-12 "}>
                                                                <select id={'provinces'} className={Style.formSelect}>
                                                                    {
                                                                        province.map((value, index) => (
                                                                            <option
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
                                                        </div> :
                                                        type === "category" ?

                                                            <div
                                                                className="col-md-6 col-12 py-2 change-dir change-text">
                                                                <div className="col-12">
                                                                    <label htmlFor=""
                                                                           className="">{t("resume.step12.addJobCategory")}</label>
                                                                </div>
                                                                <div className={Style.selectPart + " col-12 "}>
                                                                    <select id={'category'}
                                                                            className={Style.formSelect}>
                                                                        {
                                                                            category.map((value, index) => (
                                                                                <option
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
                                                            </div> :
                                                            null

                                                }


                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-12'}>
                                                    {
                                                        type === "province" ?
                                                            <button id={'submitAdd'} onClick={function () {
                                                                onSubmitAdd("province")
                                                            }}
                                                                    className="btn change-float-reverse my-3 mx-3 btn-success">
                                                                {t("resume.step12.addProvince")}

                                                            </button> :
                                                            <button id={'submitEdit'} onClick={function () {
                                                                onSubmitAdd("category")
                                                            }}
                                                                    className="btn change-float-reverse my-3 mx-3 btn-success">
                                                                {t("resume.step12.addJobCategory")}

                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            <div className="row change-dir change-text">
                                <div className={'col-12 mt-3'}>
                                    <hr/>
                                    <h6 className={' mx-3'}>{t("resume.step12.selectYourSeniorityLevel")}</h6>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsChief ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isChief", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isChief", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isChief")}</label>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsManager ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isManager", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isManager", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isManager")}</label>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsExpert ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isExpert", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isExpert", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isExpert")}</label>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsNewComer ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isNewComer", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isNewComer", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isNewComer")}</label>
                                </div>
                                <div className={'col-12 mt-3'}>
                                    <hr/>
                                    <h6 className={' mx-3'}>{t("resume.step12.typeOfCooperation")}</h6>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsRemote ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isRemote", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isRemote", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isRemote")}</label>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsPartTime ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isPartTime", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isPartTime", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isPartTime")}</label>
                                </div>
                                <div className={'col-12 mt-2 col-md-4 mt-2'}>
                                    {
                                        resume.IsFullTime ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isFullTime", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isFullTime", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isFullTime")}</label>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsInternship ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isInternship", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isInternship", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isInternship")}</label>
                                </div>
                                <div className={'col-12 mt-3'}>
                                    <hr/>
                                    <h6 className={' mx-3'}>{t("resume.step12.advantages")}</h6>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsPromotionPossible ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isPromotionPossible", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isPromotionPossible", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isPromotionPossible")}</label>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsInsurancePossible ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isInsurancePossible", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isInsurancePossible", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isInsurancePossible")}</label>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsFreeFoodPossible ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isFreeFoodPossible", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isFreeFoodPossible", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isFreeFoodPossible")}</label>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsFlexibleWorkTimePossible ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isFlexibleWorkTimePossible", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isFlexibleWorkTimePossible", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isFlexibleWorkTimePossible")}</label>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsCoursePossible ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isCoursePossible", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isCoursePossible", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isCoursePossible")}</label>
                                </div>
                                <div className={'col-12 col-md-4 mt-2'}>
                                    {
                                        resume.IsCommutingServicePossible ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isCommutingServicePossible", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isCommutingServicePossible", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isCommutingServicePossible")}</label>
                                </div>
                                <div className={'col-12 mt-3'}>
                                    <hr/>
                                    <h6 className={' mx-3'}>{t("resume.step12.provinceTitle")}</h6>
                                </div>
                                <div className={'col-12'}>
                                    {
                                        resume.IsReadyToWokInAllProvinces ?
                                            <button className="mx-3 btn btn-primary text-white"
                                                    onClick={() => {
                                                        // onActiveLevel(false)
                                                        update("isReadyToWokInAllProvinces", false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className=" mx-3 btn btn-secondary text-white"
                                                      onClick={() => {
                                                          // onActiveLevel(true)
                                                          update("isReadyToWokInAllProvinces", true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }
                                    <label>  {t("resume.step12.isReadyToWokInAllProvinces")}</label>
                                </div>
                                {
                                    !resume.IsReadyToWokInAllProvinces ?
                                        <div className={'col-12 '}>
                                            <div className={'row'}>
                                                <div className={'col-12 mx-2'}>

                                                    <button id={'openProvince'} onClick={function () {
                                                        setAddSkill("province")
                                                    }}
                                                            className={'btn btn-login change-dir change-float'}><img
                                                        width={30}
                                                        src={addImg}/>
                                                    </button>
                                                    <button id={'closeProvince'} onClick={setCloseForm}
                                                            className={'btn btn-login change-dir d-none change-float'}>
                                                        <img
                                                            width={30} src={minus}/></button>
                                                </div>
                                            </div>

                                        </div>:null
                                }
                                {
                                    !resume.IsReadyToWokInAllProvinces ?
                                        <div className={'col-12'}>
                                            <div className={'row mx-3'}>

                                                {
                                                    resume.UserJobInProvinces !== undefined && resume.UserJobInProvinces !== null ?
                                                        resume.UserJobInProvinces.map((item, i) => (
                                                            <div className={'col-12 col-md-4 mt-3 '}>
                                                                <div className={Style.borderProvince}>
                                                                    <button
                                                                        className={'btn btn-default change-float mx-3'}
                                                                        onClick={function () {
                                                                            onDelete(item.Id, "province")
                                                                        }}><img src={Delete} width={10}/>
                                                                    </button>
                                                                    {item.ProvinceString}
                                                                </div>
                                                            </div>

                                                        )) : null
                                                }


                                            </div>
                                        </div>:null
                                }
                                <div className={'col-12 mt-3'}>
                                    <hr/>
                                    <h6 className={' mx-3'}>{t("resume.step12.addJobCategory")}</h6>
                                </div>
                                <div className={'col-12 '}>
                                    <div className={'row'}>
                                        <div className={'col-12 mx-2'}>

                                            <button id={'openProvince'} onClick={function () {
                                                setAddSkill("category")
                                            }}
                                                    className={'btn btn-login change-dir change-float'}><img
                                                width={30}
                                                src={addImg}/>
                                            </button>
                                            <button id={'closeProvince'} onClick={setCloseForm}
                                                    className={'btn btn-login change-dir d-none change-float'}><img
                                                width={30} src={minus}/></button>
                                        </div>
                                    </div>

                                </div>
                                <div className={'col-12'}>
                                    <div className={'row mx-3'}>
                                        {
                                            resume.UserJobInJobCategories !== undefined && resume.UserJobInJobCategories !==null ?
                                                resume.UserJobInJobCategories.map((item, i) => (
                                                    <div className={'col-12 col-md-3 mt-3 '}>
                                                        <div className={Style.borderProvince}>
                                                            <button className={'btn btn-default change-float mx-1'}
                                                                    onClick={function () {
                                                                        onDelete(item.Id, "category")
                                                                    }}><img src={trash}/>
                                                            </button>
                                                            {item.JobCategoryString}
                                                        </div>
                                                    </div>

                                                )) : null
                                        }


                                    </div>
                                </div>

                                <div className="col-12">
                                    <button onClick={() => history.push({
                                        pathname: getRoutesItems().mainPage.route,
                                        search: "lang=" + sp.get("lang"),

                                    })}
                                            className="btn change-float-reverse my-3 mx-3 btn-info">
                                        {t("resume.step12.nextStep")}

                                    </button>
                                    <button onClick={() => history.push({
                                        pathname: getRoutesItems().resumeStep11.route,
                                        search: "lang=" + sp.get("lang"),

                                    })} className="btn change-float my-3 mx-3 btn-danger">
                                        {t("resume.step12.previousStep")}

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
                <div className={'position-fixed d-none'} style={{bottom: '20px', left: '20px', zIndex: "1"}}>
                    {modalIsOpen ?
                        <img style={{border: "1px dashed #000", borderRadius: "50%"}}
                             className={Style["filterButton"] + " p-1"} onClick={closeModal} width={'60px'} height={'60px'}
                             src={guide}/>
                        :
                        <img style={{border: "1px dashed #000", borderRadius: "50%"}}
                             className={Style["filterButton"] + " p-1"} onClick={openModal} width={'60px'} height={'60px'}
                             src={guide}/>
                    }

                </div>
            </main>
            <NotificationContainer/>

        </div>
    )
}