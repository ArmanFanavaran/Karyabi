import $ from 'jquery';
import {useEffect, useState} from "react";
import Style from "./ResumeStep8.module.css"
import NavbarResume from "../navbar/NavbarResume"
import {generateURL} from "../../global/Requests";
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";
import {RatingStar} from "rating-star";
import {useTranslation} from "react-i18next";
import * as queryString from "query-string";
import * as React from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {RadioGroup, RadioButton} from 'react-radio-buttons';
import {initializeTitlesWithValue} from "../../global/Titles";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {useHistory} from "react-router";
import {css} from "@emotion/react";
import {MoonLoader} from "react-spinners";
import FrameResume from "../frameResume/FrameResume"
import {List, arrayMove} from 'react-movable';
import autocomplete from 'autocompleter';
import trash from "./imgs/trash.svg"
import edit from "./imgs/edit.svg"
import addImg from "./imgs/add.svg";
import minus from "./imgs/minus.svg";
import DatePicker from "react-datepicker2";
import Modal from "react-modal";
import guide from "./imgs/guide.png"

export default function ResumeStep8() {
    var moment = require("moment-jalaali");
    const history = useHistory();
    const [resumeId, setResumeId] = useState(0);
    let [resume, setResume] = useState("");
    const [items, setItems] = React.useState([]);
    let [add, setAdd] = useState(false);
    const [editItems, setEditItems] = React.useState([]);
    const [editItemsIndex, setEditItemsIndex] = React.useState([]);
    const [jobCategory, setJobCategory] = React.useState([]);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    const [sDate, setSDate] = useState(moment(today, 'YYYY/M/D'));
    const [newSDate, setNewSDate] = useState(moment(today, 'YYYY/M/D'));
    const [eDate, setEDate] = useState(moment(today, 'YYYY/M/D'));
    const [newEDate, setNewEDate] = useState(moment(today, 'YYYY/M/D'));
    const [rating, setRating] = React.useState(0);
    let [loading, setLoading] = useState(false);
    let [endDateStatus, setEndDateStatus] = useState(false);
    let [seniority, setSeniority] = useState({});
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
// Modal.setAppElement('#yourAppElement');
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';

    }

    const hideEndDate = () => {
        if ($('#isWorking').prop('checked')) {
            $('#endDate').addClass('d-none')
            setEndDateStatus(false)
        } else {
            $('#endDate').removeClass('d-none')
            setEndDateStatus(true)


        }
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
            initializeTitlesWithValue("Resume | work experience")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("رزومه | سوابق کاری")
        }
        onGetResume();
        var config = {
            method: 'get',
            url: generateURL('/Side/GetJobCategoryList'),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(config)
            .then(function (response) {
                console.log(response.data.data)
                setJobCategory(response.data.data)


            })
            .catch(function (error) {
            });

    }, [])

    function onSubmitAdd() {
        setLoading(true)
        if (add) {
            var data = JSON.stringify({
                "id": parseInt(resumeId),
                "instituteName": $('#instituteName').val(),
                "instituteNameEnglish": $('#instituteNameEnglish').val(),
                "position": $('#position').val(),
                "positionEnglish": $('#positionEnglish').val(),
                "sDate": newSDate,
                "eDate": newEDate,
                "completeInfo": $('#completeInfo').val(),
                "completeInfoEnglish": $('#completeInfoEnglish').val(),
                "isWorking": ($("#isWorking").val() === 'true'),
                "isNewComer": seniority.isNewComer,
                "isExpert":  seniority.isExpert,
                "isManager":  seniority.isManager,
                "isChief":  seniority.isChief,
                "jobCategoryId": parseInt($('#jobCategoryId').val()),
            });
            console.log(data)
            var config = {
                method: 'post',
                url: generateURL('/Resume/AddJobResumeInfoSTP7'),
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
        } else {
            var data = JSON.stringify({
                "id": parseInt(editItems.Id),
                "instituteName": $('#instituteName').val(),
                "instituteNameEnglish": $('#instituteNameEnglish').val(),
                "position": $('#position').val(),
                "positionEnglish": $('#positionEnglish').val(),
                "sDate": newSDate,
                "eDate": newEDate,
                "completeInfo": $('#completeInfo').val(),
                "completeInfoEnglish": $('#completeInfoEnglish').val(),
                "isWorking": ($("#isWorking").val() === 'true'),
                "isNewComer": seniority.isNewComer,
                "isExpert":  seniority.isExpert,
                "isManager":  seniority.isManager,
                "isChief":  seniority.isChief,
                "jobCategoryId": parseInt($('#jobCategoryId').val()),
            });
            console.log(data)
            var config = {
                method: 'post',
                url: generateURL('/Resume/UpdateJobResumeInfoSTP7'),
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
        closeModal()
    }

    ////// Update Index /////////
    const onUpdateOrder = (source, destination) => {
        setLoading(true)
        var data = JSON.stringify({
            "id": parseInt(resumeId),
            "sourceSideEntityId": parseInt(source),
            "destSideEntityId": parseInt(destination)
        });
        console.log(data)
        var config = {
            method: 'post',
            url: generateURL('/Resume/ChangeJobResumeInfoOrderSTP7'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
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

    ////// Delete Index /////////
    const onDelete = (id) => {
        setLoading(true)
        var data = JSON.stringify({
            "id": parseInt(id)
        });

        var config = {
            method: 'post',
            url: generateURL('/Resume/RemoveJobResumeInfoSTP7'),
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

    ///// Edit Index //////////
    const onEdit = (id) => {
        var index = -1
        for (var i = 0; i < items.length; i++) {
            if (items[i].Id === id) {
                index = i;
                break;
            }
        }
        console.log(index)
        console.log(items[index])
        setEditItemsIndex(index)
        setEditItems(items[index])
        if (items[index].isWorking) {
            setEndDateStatus(false)
        } else {
            setEndDateStatus(true)

        }
        setSeniority(
            {
                isNewComer:items[index].IsNewComer,
                isExpert: items[index].IsExpert,
                isManager:items[index].IsManager,
                isChief: items[index].IsChief,
            }
        )
        if (items[index].sDate !== "0001-01-01T00:00:00" && items[index].sDate !== null) {
            setSDate(moment(items[index].SDate, 'YYYY-MM-DD'))
        }
        if (items[index].eDate !== "0001-01-01T00:00:00" && items[index].eDate !== null) {
            setEDate(moment(items[index].EDate, 'YYYY-MM-DD'))
        }
        // $('#skillName').val(items[index].AreaOfInterestEnglish.Name)
        // $('#skillNamePersian').val(items[index].AreaOfInterestPersian.Name)
        setRating(items[index].Level)
        // onGetMajorWithId(items[index].MajorId)

        $('#open').addClass('d-none')
        $('#submitAdd').addClass('d-none')
        $('#close').removeClass('d-none')
        $('#form').removeClass('d-none')
        $('#submitEdit').removeClass('d-none')
        setAdd(false)
        openModal()
        // if (information.sDate !== "0001-01-01T00:00:00" && information.sDate !== null) {
        //     setSDate(moment(information.sDate, 'YYYY-MM-DD'))
        // }
        // if (information.eDate !== "0001-01-01T00:00:00" && information.eDate !== null) {
        //     setEDate(moment(information.eDate, 'YYYY-MM-DD'))
        // }
    }

    const setAddSkill = () => {
        $('#form').removeClass('d-none')
        $('#open').addClass('d-none')
        $('#close').removeClass('d-none')
        $('#submitAdd').removeClass('d-none')
        $('#submitEdit').addClass('d-none')
        setEndDateStatus(true)

        setEditItems([])
        setRating(0)
        setAdd(true)
        openModal()

    }
    const setCloseForm = () => {
        $('#form').addClass('d-none')
        $('#open').removeClass('d-none')
        $('#close').addClass('d-none')
        setRating(0)
        $('#languageId').val(0)
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
                setResume(response.data.data)
                console.log("Job Resume ")
                console.log(JSON.parse(response.data.data.jobResumeInfoListJson))
                // let data=JSON.parse(response.data.data.skillInfoListJson);

                if (response.data.data.jobResumeInfoListJson.length !== 0) {
                    let workExperienceList = JSON.parse(response.data.data.jobResumeInfoListJson)
                    // IsSoftWare
                    workExperienceList.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    console.log("worl")
                    console.log(workExperienceList)
                    setItems(workExperienceList)
                } else {
                    setItems([])
                }

            })
            .catch(function (error) {
            });
    }

    /////// Date function /////
    const onSubmitSDate = (value) => {
        // let date = value._i.slice(11, value._i.length);
        setNewSDate(value)
    }

    /////// Date function /////
    const onSubmitEDate = (value) => {
        // let date = value._i.slice(11, value._i.length);
        setNewEDate(value)
    }

    /////// Seniority //////
    const seniorityVal = ()=>{
        console.log(document.querySelector('input[name="seniorityLevel"]:checked').value)
        setSeniority(
            {
                isNewComer:document.querySelector('input[name="seniorityLevel"]:checked').value==="isNewComer"?true:false,
                isExpert: document.querySelector('input[name="seniorityLevel"]:checked').value==="isExpert"?true:false,
                isManager:document.querySelector('input[name="seniorityLevel"]:checked').value==="isManager"?true:false,
                isChief: document.querySelector('input[name="seniorityLevel"]:checked').value==="isChief"?true:false,
            }
        )
    }
    return (
        <div>
            <main className={Style.main}>
                <NavbarResume step={8}/>
                <div className="container change-dir">
                    <div className={Style.formBox}>
                        <div className="row">
                            <div className={'col-12'}>
                                <h2 className={Style.formTitle + " change-dir change-text px-3"}>
                                    {t("resume.step8.workExperience")}
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
                                        <FrameResume step={8}/>

                                    </Modal>
                                </div>
                            </div>

                            <div className="row">
                                <div className={'col-12 col-lg-7 px-5'}>
                                    <List
                                        values={items}
                                        onChange={({oldIndex, newIndex}) => {
                                            // console.log(items[oldIndex].Id)
                                            // console.log(items[newIndex].Id)

                                            onUpdateOrder(items[oldIndex].Id, items[newIndex].Id)
                                            setItems(arrayMove(items, oldIndex, newIndex))
                                        }}
                                        renderList={({children, props}) => <ul
                                            className="list-unstyled" {...props}>{children}</ul>}
                                        renderItem={({value, index, props}) =>
                                            <li {...props}>
                                                <div className={'row border my-2'}>
                                                    <div className="col-xl-1 col-lg-1 col-md-2 col-2 p-0 pl-1">
                                                        <div className="purple-color-bg text-white text-center py-4 ">
                                                            <p className="font-medium d-inline-flex">
                                                                {index + 1}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-11 col-lg-11 col-md-10 col-10">
                                                        <div className="row my-1">
                                                            <div className="col-12 col-md-6 change-text">
                                                                {
                                                                    sp.get("lang") === "en" ?
                                                                        <p className="text-left mt-3 text-muted">
                                                                            {value.PositionEnglish}
                                                                            <br/>
                                                                            {value.InstituteNameEnglish}
                                                                            <br/>
                                                                            {moment(value.SDate).format('YYYY')} - {value.isWorking ? "Present" : moment(value.EDate).format('YYYY')}
                                                                        </p>
                                                                        : <p className="text-right mt-3 text-muted">
                                                                            {value.Position}
                                                                            <br/>
                                                                            {value.InstituteName}
                                                                            <br/>
                                                                            {moment(value.SDate).format('jYYYY')} - {value.isWorking ? "تاکنون (مشغول به کار)" : moment(value.EDate).format('jYYYY')}

                                                                        </p>
                                                                }

                                                                {sp.get("lang") === "en" ?
                                                                    <p className="mt-2 change-text">


                                                                    </p> :
                                                                    <p className="mt-2 change-text">


                                                                    </p>
                                                                }
                                                            </div>
                                                            <div className={'col-12 col-md-6'}>
                                                                {
                                                                    sp.get("lang") === "en" ?
                                                                        <p className="text-right dir-rtl mt-3 text-muted">
                                                                            {value.Position}
                                                                            <br/>
                                                                            {value.InstituteName}
                                                                            <br/>
                                                                            {moment(value.SDate).format('jYYYY')} - {value.isWorking ? "تاکنون (مشغول به کار)" : moment(value.EDate).format('jYYYY')}

                                                                        </p>
                                                                        : <p className="text-left mt-3 text-muted">
                                                                            {value.PositionEnglish}
                                                                            <br/>
                                                                            {value.InstituteNameEnglish}
                                                                            <br/>
                                                                            <span>
                                                                            {moment(value.SDate).format('YYYY')} - {value.isWorking ? "Present" : moment(value.EDate).format('YYYY')}
                                                                            </span>
                                                                        </p>
                                                                }
                                                            </div>
                                                            <div className="col-12 change-text-reverse mt-2 mb-4">

                                                                <button onClick={() => {
                                                                    onEdit(value.Id)
                                                                }} className="btn btn-login" value={value.Id}><img
                                                                    src={edit}
                                                                    width={20}/>
                                                                </button>
                                                                <button onClick={() => {
                                                                    onDelete(value.Id)
                                                                }} className="btn btn-login" value={value.Id}><img
                                                                    src={trash}
                                                                    width={20}/></button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>}
                                    />
                                    <div className={'row'}>
                                        <div className={'col-12'}>
                                            <button id={'open'} onClick={setAddSkill}
                                                    className={'btn btn-login change-dir change-float'}><img
                                                width={30}
                                                src={addImg}/>
                                            </button>
                                            <button id={'close'} onClick={setCloseForm}
                                                    className={'btn btn-login change-dir d-none change-float'}><img
                                                width={30} src={minus}/></button>
                                        </div>
                                    </div>

                                </div>
                                <div className={'col-12 col-lg-5 d-none d-lg-block embed-responsive-16by9'}>
                                    <FrameResume step={8}/>
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
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step8.instituteNamePersian")}</label>
                                                    </div>
                                                    <div className={Style.selectPart + " " + Style.input}>
                                                        <input defaultValue={editItems.InstituteName}
                                                               className={'dir-rtl'} autoComplete="off"
                                                               id="instituteName" type="text"/>

                                                    </div>

                                                </div>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step8.instituteNameEnglish")}</label>
                                                    </div>
                                                    <div className={Style.selectPart + " " + Style.input}>
                                                        <input defaultValue={editItems.InstituteNameEnglish}
                                                               className={'dir-ltr'} autoComplete="off"
                                                               id="instituteNameEnglish" type="text"/>

                                                    </div>

                                                </div>
                                                <div className=" col-12 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step8.seniorityLevel")}</label>
                                                    </div>
                                                    <div>
                                                        <label className={Style.radio + " form-check form-check-inline"}>
                                                            <input defaultChecked={editItems.IsNewComer} onClick={seniorityVal} type="radio" id="isNewComer"  name="seniorityLevel"
                                                                   value="isNewComer" />
                                                            <span>{t("resume.step8.isNewComer")}</span>
                                                        </label>
                                                        <label className={Style.radio + " form-check form-check-inline"}>
                                                            <input defaultChecked={editItems.IsExpert} onClick={seniorityVal} type="radio" id="isExpert" name="seniorityLevel"
                                                                   value="isExpert"/>
                                                            <span>{t("resume.step8.isExpert")}</span>
                                                        </label>
                                                        <label className={Style.radio + " form-check form-check-inline"}>
                                                            <input defaultChecked={editItems.IsManager} onClick={seniorityVal} type="radio" id="isManager" name="seniorityLevel"
                                                                   value="isManager"/>
                                                            <span>{t("resume.step8.isManager")}</span>
                                                        </label>
                                                        <label className={Style.radio + " form-check form-check-inline"}>
                                                            <input defaultChecked={editItems.IsChief} onClick={seniorityVal} type="radio" id="isChief" name="seniorityLevel"
                                                                   value="isChief"/>
                                                            <span>{t("resume.step8.isChief")}</span>
                                                        </label>
                                                        {/*<RadioGroup  horizontal>*/}
                                                        {/*    <RadioButton value="isNewComer">*/}
                                                        {/*        {t("resume.step8.isNewComer")}*/}
                                                        {/*    </RadioButton>*/}
                                                        {/*    <RadioButton value="isExpert">*/}
                                                        {/*        {t("resume.step8.isExpert")}*/}
                                                        {/*    </RadioButton>*/}
                                                        {/*    <RadioButton value="isManager">*/}
                                                        {/*        {t("resume.step8.isManager")}*/}
                                                        {/*    </RadioButton>*/}
                                                        {/*    <RadioButton value="isChief">*/}
                                                        {/*        {t("resume.step8.isChief")}*/}
                                                        {/*    </RadioButton>*/}

                                                        {/*</RadioGroup>*/}

                                                    </div>

                                                </div>

                                                <div className={'col-12'}>
                                                    <hr/>
                                                </div>
                                            </div>
                                            <div className={'row'}>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step8.jobCategory")}</label>
                                                    </div>
                                                    <div className={Style.selectPart}>
                                                        <select id={'jobCategoryId'} className={Style.formSelect}
                                                                aria-label="Default select example">
                                                            {jobCategory !== undefined && jobCategory.map((value, index) => (
                                                                <option selected={editItems.JobCategoryId == value.id}
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
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step8.position")}</label>
                                                    </div>
                                                    <div className={Style.selectPart + " " + Style.input}>
                                                        <input defaultValue={editItems.Position} className={'dir-rtl'}
                                                               autoComplete="off" id="position"
                                                               type="text"/>

                                                    </div>

                                                </div>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step8.positionEnglish")}</label>
                                                    </div>
                                                    <div className={Style.selectPart + " " + Style.input}>
                                                        <input defaultValue={editItems.PositionEnglish}
                                                               className={'dir-ltr'} autoComplete="off"
                                                               id="positionEnglish"
                                                               type="text"/>

                                                    </div>

                                                </div>
                                                <div className={'col-12'}>
                                                    <hr/>
                                                </div>
                                            </div>
                                            <div className={'row'}>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor="" className="">{t("resume.step8.sDate")}</label>
                                                    </div>
                                                    <div className={Style.selectPart}>
                                                        {sp.get("lang") === "fa" ?
                                                            <DatePicker className={Style.formSelect}
                                                                        isGregorian={false}
                                                                        timePicker={false}
                                                                        value={sDate}
                                                                        onChange={onSubmitSDate}
                                                            /> :
                                                            <DatePicker className={Style.formSelect}
                                                                        isGregorian={true}
                                                                        timePicker={false}
                                                                        value={sDate}
                                                                        onChange={onSubmitSDate}
                                                            />
                                                        }

                                                    </div>
                                                </div>
                                                {endDateStatus ?
                                                    <div className="col-md-4 col-12 py-2 change-dir change-text"
                                                         id={'endDate'}>
                                                        <div className="col-12">
                                                            <label htmlFor=""
                                                                   className="">{t("resume.step8.eDate")}</label>
                                                        </div>
                                                        <div className={Style.selectPart}>
                                                            {sp.get("lang") === "fa" ?
                                                                <DatePicker className={Style.formSelect}
                                                                            isGregorian={false}
                                                                            timePicker={false}
                                                                            value={eDate}
                                                                            onChange={onSubmitEDate}
                                                                /> :
                                                                <DatePicker className={Style.formSelect}
                                                                            isGregorian={true}
                                                                            timePicker={false}
                                                                            value={eDate}
                                                                            onChange={onSubmitEDate}
                                                                />
                                                            }

                                                        </div>
                                                    </div>
                                                    : null
                                                }
                                                <div className="col-md-4 col-12 py-2 change-dir change-text pt-5">
                                                    <div className="form-check px-3">
                                                        <input onClick={hideEndDate} className="form-check-input"
                                                               type="checkbox" value="true"
                                                               id="isWorking" checked={editItems.isWorking}/>
                                                        <label className="form-check-label px-3" htmlFor="isWorking">
                                                            {t("resume.step8.isWorking")}
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className={'col-12'}>
                                                    <hr/>
                                                </div>
                                                <div className="col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step8.completeInfo")}</label>
                                                    </div>
                                                    <div className={Style.selectPart}>
                                                <textarea rows={'5'} defaultValue={editItems.CompleteInfo}
                                                          className="form-control dir-rtl" autoComplete="off"
                                                          id="completeInfo"
                                                          type="text"/>

                                                    </div>

                                                </div>
                                                <div className="col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step8.completeInfoEnglish")}</label>
                                                    </div>
                                                    <div className={Style.selectPart}>
                                                <textarea rows={'5'} defaultValue={editItems.CompleteInfoEnglish}
                                                          className="form-control dir-ltr" autoComplete="off"
                                                          id="completeInfoEnglish" type="text"/>

                                                    </div>

                                                </div>

                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-12'}>
                                                    {
                                                        add === true ?
                                                            <button id={'submitAdd'} onClick={onSubmitAdd}
                                                                    className="btn change-float-reverse my-3 mx-3 btn-success">
                                                                {t("resume.step8.submit")}

                                                            </button> :
                                                            <button id={'submitEdit'} onClick={onSubmitAdd}
                                                                    className="btn change-float-reverse my-3 mx-3 btn-success">
                                                                {t("resume.step8.edit")}

                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            <div className="row">

                                <div className="col-12">
                                    <button onClick={() => history.push({
                                        pathname: getRoutesItems().resumeStep9.route,
                                        search: "lang=" + sp.get("lang"),

                                    })}
                                            className="btn change-float-reverse my-3 mx-3 btn-info">
                                        {t("resume.step7.nextStep")}

                                    </button>
                                    <button onClick={() => history.push({
                                        pathname: getRoutesItems().resumeStep7.route,
                                        search: "lang=" + sp.get("lang"),

                                    })} className="btn change-float my-3 mx-3 btn-danger">
                                        {t("resume.step7.previousStep")}

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