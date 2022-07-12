import $ from 'jquery';
import {useEffect, useState} from "react";
import Style from "./ResumeStep4.module.css"
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
import {List, arrayMove} from 'react-movable';
import trash from "./imgs/trash.svg"
import edit from "./imgs/edit.svg"
import addImg from "./imgs/add.svg";
import minus from "./imgs/minus.svg";
import Modal from 'react-modal';
import guide from "./imgs/guide.png"
import Select from "react-select";

export default function ResumeStep4() {
    var moment = require("moment-jalaali");
    const history = useHistory();
    const [resumeId, setResumeId] = useState([]);
    let [resume, setResume] = useState("");
    const [items, setItems] = React.useState([]);
    const [editItems, setEditItems] = React.useState([]);
    const [countryEditName, setCountryEditName] = React.useState([]);
    const [editItemsIndex, setEditItemsIndex] = React.useState([]);
    let [countryList, setCountryList] = useState([]);
    let [countrySelect, setCountrySelect] = useState([]);
    let [uniType, setUniType] = useState([]);
    let [uniList, setUniList] = useState([]);
    let [uniSelect, setUniSelect] = useState(0);
    let [degree, setDegree] = useState([]);
    let [majorSelect, setMajorSelect] = useState(0);
    let [majorList, setMajorList] = useState([]);
    let [loading, setLoading] = useState(false);
    let [endDateStatus, setEndDateStatus] = useState(false);
    let [add, setAdd] = useState(false);
    let [color, setColor] = useState("rgb(0,30,255)");
    const [t, i18n] = useTranslation('main');
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    const [sDate, setSDate] = useState(moment(today, 'YYYY/M/D'));
    const [newSDate, setNewSDate] = useState(moment(today, 'YYYY/M/D'));
    const [eDate, setEDate] = useState(moment(today, 'YYYY/M/D'));
    const [newEDate, setNewEDate] = useState(moment(today, 'YYYY/M/D'));

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


    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'visible';

        $('#open').removeClass('d-none')
        $('#close').addClass('d-none')
        $('#submitAdd').addClass('d-none')
        $('#submitEdit').removeClass('d-none')


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

    var axios = require('axios');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Resume | Educational background")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("رزومه | سوابق تحصیلی")
        }
        onGetResume();
        var configCountry = {
            method: 'get',
            url: generateURL('/SideArray/GetCountryList'),
            headers: {}
        };

        axios(configCountry)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                let countryList = response.data.data
                // IsSoftWare
                let data = []
                countryList.forEach(function (i) {
                    let tmp;
                    tmp = {value: i.id, label: i.name}

                    data.push(tmp)

                });
                setCountryList(data)
            })
            .catch(function (error) {
                // console.log(error);
            });


        var configUniTypeInList = {
            method: 'get',
            url: generateURL('/SideArray/GetUniTypeInList'),
            headers: {}
        };

        axios(configUniTypeInList)
            .then(function (response) {
                // console.log(JSON.stringify(response.data.data));
                setUniType(response.data.data)
            })
            .catch(function (error) {
                // console.log(error);
            });

        var configUnivercityList = {
            method: 'get',
            url: generateURL('/Side/GetUnivercityList'),
            headers: {}
        };

        axios(configUnivercityList)
            .then(function (response) {
                // console.log(JSON.stringify(response.data.data));
                // console.log(JSON.stringify(response.data.data));
                let uniList = response.data.data
                // IsSoftWare
                let data = []
                uniList.forEach(function (i) {
                    let tmp;
                    if (sp.get("lang") === "fa") {
                        tmp = {value: i.id, label: i.name}
                    } else {
                        tmp = {value: i.id, label: i.englishName}
                    }

                    data.push(tmp)

                });
                setUniList(data)
            })
            .catch(function (error) {
                // console.log(error);
            });

        var configDegreeList = {
            method: 'get',
            url: generateURL('/Side/GetDegreeList'),
            headers: {}
        };

        axios(configDegreeList)
            .then(function (response) {
                // console.log(JSON.stringify(response.data.data));
                setDegree(response.data.data)
            })
            .catch(function (error) {
                // console.log(error);
            });

        // onGetMajor();

    }, [])

    function onSubmitAdd() {
        setLoading(true)

        var EndDate = new Date(newEDate)
        var dd = String(EndDate.getDate()).padStart(2, '0');
        var mm = String(EndDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = EndDate.getFullYear();
        EndDate = yyyy + '-' + mm + '-' + dd;

        var SDate = new Date(newSDate);// x is now a date object

        var dd = String(SDate.getDate()).padStart(2, '0');
        var mm = String(SDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = SDate.getFullYear();
        SDate = yyyy + '-' + mm + '-' + dd;


        if (add) {
            let total = 0;
            if ($('#totalAverageVal').val() !== null && $('#totalAverageVal').val() !== "" && $('#totalAverageVal').val() !== NaN) {
                total = parseFloat($('#totalAverageVal').val())
            }


            var data = JSON.stringify({
                "id": parseInt(resumeId),
                "countryName": countrySelect,
                "completeInfoPersian": $('#completeInfoPersian').val(),
                "completeInfoEnglish": $('#completeInfoEnglish').val(),
                "majorNamePersian": $('#majorNamePersian').val(),
                "majorNameEnglish": $('#majorNameEnglish').val(),
                "totalAverage": total,
                "sDate": SDate,
                "eDate": EndDate,
                "isEducation": document.getElementById("isEducation").checked === true,
                "degreeId": parseInt($('#DegreeId').val()),
                "majorId": majorSelect !== null ? parseInt(majorSelect) : 0,
                "uniId": parseInt(uniSelect),
                "uniTypeId": $('#uniTypeId').val() !== null ? parseInt($('#uniTypeId').val()) : 0,
                "uniNamePersian": $('#uniNamePersian').val(),
                "uniNameEnglish": $('#uniNameEnglish').val(),

            });
            console.log(data)
            var config = {
                method: 'post',
                url: generateURL('/Resume/AddEducationInfoSTP4'),
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
            let total = 0;
            if ($('#totalAverageVal').val() !== null && $('#totalAverageVal').val() !== "" && $('#totalAverageVal').val() !== NaN) {
                total = parseFloat($('#totalAverageVal').val())
            }
            console.log(total)
            var data = JSON.stringify({
                "id": parseInt(editItems.Id),
                "countryName": countrySelect,
                "completeInfoPersian": $('#completeInfoPersian').val(),
                "completeInfoEnglish": $('#completeInfoEnglish').val(),
                "majorNamePersian": $('#majorNamePersian').val(),
                "majorNameEnglish": $('#majorNameEnglish').val(),
                "totalAverage": total,
                "sDate": SDate,
                "eDate": EndDate,
                "isEducation": document.getElementById("isEducation").checked === true,
                "degreeId": parseInt($('#DegreeId').val()),
                "majorId": majorSelect !== null ? parseInt(majorSelect) : 0,
                "uniId": parseInt(uniSelect),
                "uniTypeId": $('#uniTypeId').val() !== null ? parseInt($('#uniTypeId').val()) : 0,
                "uniNamePersian": $('#uniNamePersian').val(),
                "uniNameEnglish": $('#uniNameEnglish').val(),

            });
            console.log(data)
            // console.log(data)
            var config = {
                method: 'post',
                url: generateURL('/Resume/UpdateEducationInfoSTP4'),
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


/////// Date function /////
    const onSubmitSDate = (value) => {
        // let date = value._i.slice(11, value._i.length);
        // setNewSDate(value.slice(0,value.indexOf("T")))
        setNewSDate(value)
        // console.log(value.toString())
        // // let value23 =value.toString().slice(0,value.toString.indexOf("T"))
        // console.log(value)
        // // console.log(value23)
    }

/////// Date function /////
    const onSubmitEDate = (value) => {
        // let date = value._i.slice(11, value._i.length);
        setNewEDate(value)
    }

/////// Get Major ///////////
    const onGetMajor = (event) => {
        var optionBack = $(event).find('option[value="' + event.value + '"]')
        var id = $(optionBack).attr("value");
        // console.log(id)
        if (id === "2") {
            $("#uniId").prop("disabled", true);
        } else {
            $("#uniId").prop("disabled", false);
        }
        var configDegreeList = {
            method: 'get',
            url: generateURL('/Side/GetMajorList'),
            headers: {}
        };

        axios(configDegreeList)
            .then(function (response) {
                // console.log(JSON.stringify(response.data.data));
                let majorList = response.data.data
                // IsSoftWare
                let data = []
                majorList.forEach(function (i) {
                    let tmp;
                    if (sp.get("lang") === "fa") {
                        tmp = {value: i.id, label: i.name}
                    } else {
                        tmp = {value: i.id, label: i.englishName}
                    }

                    data.push(tmp)

                });
                setMajorList(data)
            })
            .catch(function (error) {
                // console.log(error);
            });

    }
    const onGetMajorWithId = (id) => {
        // console.log(id)
        if (id === "2") {
            $("#uniId").prop("disabled", true);
        } else {
            $("#uniId").prop("disabled", false);
        }
        var configDegreeList = {
            method: 'get',
            url: generateURL('/Side/GetMajorList'),
            headers: {}
        };

        axios(configDegreeList)
            .then(function (response) {
                // console.log(JSON.stringify(response.data.data));
                let majorList = response.data.data
                // IsSoftWare
                let data = []
                majorList.forEach(function (i) {
                    let tmp;
                    if (sp.get("lang") === "fa") {
                        tmp = {value: i.id, label: i.name}
                    } else {
                        tmp = {value: i.id, label: i.englishName}
                    }

                    data.push(tmp)

                });
                setMajorList(data)
            })
            .catch(function (error) {
                // console.log(error);
            });

    }

////// Update Index /////////
    const onUpdateOrder = (source, destination) => {
        setLoading(true)
        var data = JSON.stringify({
            "id": parseInt(resumeId),
            "sourceSideEntityId": parseInt(source),
            "destSideEntityId": parseInt(destination)
        });
        // console.log(data)
        var config = {
            method: 'post',
            url: generateURL('/Resume/ChangeEducationInfoOrderSTP4'),
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
            url: generateURL('/Resume/RemoveEducationInfoSTP4'),
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
                    NotificationManager.error(error.response.data.message, '', 1000);
                } else {
                    NotificationManager.error(error.response.data.Message, '', 1000);

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
        // console.log(items[index])
        setEditItemsIndex(index)
        setEditItems(items[index])

        console.log(countryList)
        countryList.forEach((val) => {
            console.log("sasa")
            if (val.label === items[index].CountryName) {
                setCountryEditName(val.label)
            }
        });
        if (items[index].isEducation) {
            setEndDateStatus(false)
        } else {
            setEndDateStatus(true)

        }
        onGetMajorWithId(items[index].MajorId)
        if (items[index].sDate !== "0001-01-01T00:00:00" && items[index].sDate !== null) {
            setSDate(moment(items[index].SDate, 'YYYY-MM-DD'))
        }
        if (items[index].eDate !== "0001-01-01T00:00:00" && items[index].eDate !== null) {
            setEDate(moment(items[index].EDate, 'YYYY-MM-DD'))
        }
        $('#open').addClass('d-none')
        $('#submitAdd').addClass('d-none')
        $('#close').removeClass('d-none')
        $('#form').removeClass('d-none')
        $('#submitEdit').removeClass('d-none')
        setAdd(false)
        openModal()

    }

    const setAddEducation = () => {
        // $('#form').removeClass('d-none')
        $('#open').addClass('d-none')
        $('#close').removeClass('d-none')
        $('#submitAdd').removeClass('d-none')
        $('#submitEdit').addClass('d-none')
        setEditItems([])
        setMajorSelect([])
        setSDate(moment(today, 'YYYY/M/D'))
        setNewSDate(moment(today, 'YYYY/M/D'))
        setEDate(moment(today, 'YYYY/M/D'))
        setNewEDate(moment(today, 'YYYY/M/D'))
        $('#completeInfoPersian').val(null)
        $('#completeInfoEnglish').val(null)
        setEndDateStatus(true)
        setAdd(true)
        openModal()
    }
    const setCloseForm = () => {
        $('#form').addClass('d-none')
        $('#open').removeClass('d-none')
        $('#close').addClass('d-none')
        $([document.documentElement, document.body]).animate({
            scrollTop: 0
        }, 1000);
        closeModal()
    }

    const setAddMajor = () => {
        $('#defaultMajor').removeClass('d-none')
        $('#openMajor').addClass('d-none')
        $('#closeMajor').removeClass('d-none')
    }
    const setCloseMajor = () => {
        $('#defaultMajor').addClass('d-none')
        $('#openMajor').removeClass('d-none')
        $('#closeMajor').addClass('d-none')
    }

    const setAddUni = () => {
        $('#defaultUniName').removeClass('d-none')
        $('#openUniName').addClass('d-none')
        $('#closeUniName').removeClass('d-none')
    }
    const setCloseUni = () => {
        $('#defaultUniName').addClass('d-none')
        $('#openUniName').removeClass('d-none')
        $('#closeUniName').addClass('d-none')
    }

    const hideEndDate = () => {
        if ($('#isEducation').prop('checked')) {
            $('#endDate').addClass('d-none')
            setEndDateStatus(false)
        } else {
            $('#endDate').removeClass('d-none')
            setEndDateStatus(true)


        }
    }
    ///// Get Resume ///////
    const onGetResume = () => {
        openModalLoading()
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
                closeModalLoading()
                console.log(response.data.data.educationInfoListJson)
                setResumeId(response.data.data.id)
                if (response.data.data.educationInfoListJson.length !== 0) {
                    let educationList = JSON.parse(response.data.data.educationInfoListJson)
                    educationList.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    setItems(educationList)

                } else {
                    setItems([])
                }

                // setResume(JSON.parse(response.data.data.educationInfoListJson))
                // information = JSON.parse(response.data.data.educationInfoListJson);
                // if (information.sDate !== "0001-01-01T00:00:00" && information.sDate !== null) {
                //     setSDate(moment(information.sDate, 'YYYY-MM-DD'))
                // }
                // if (information.eDate !== "0001-01-01T00:00:00" && information.eDate !== null) {
                //     setEDate(moment(information.eDate, 'YYYY-MM-DD'))
                // }
            })
            .catch(function (error) {
            });
    }

    //// Handel Select ///
    function majorSelectFunc(data) {
        setMajorSelect(data.value);
    }

    function uniSelectFunc(data) {
        setUniSelect(data.value);
    }

    function countrySelectFunc(data) {
        setCountrySelect(data.label);
    }

    return (
        <div>
            <main className={Style.main + " " + Style.input}>
                <NavbarResume step={4}/>
                <div className="container change-dir">
                    <div className={Style.formBox}>
                        <h2 className={Style.formTitle + " change-dir change-text px-3"}>
                            {t("resume.step4.EducationalBackground")}
                        </h2>
                        <div className="mx-auto ">
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
                                        isOpen={modalIsOpenGuide}
                                        // onAfterOpen={afterOpenModal}
                                        onRequestClose={closeModalGuide}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    >
                                        <div className={'row'}>
                                            <div className={'col-12'}>
                                                <button className={'btn btn-default float-right'}
                                                        onClick={closeModalGuide}>X
                                                </button>

                                            </div>

                                        </div>
                                        <FrameResume step={4}/>

                                    </Modal>
                                </div>
                            </div>
                            <div className="row ">
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
                                                            <div className="col-md-8 col-12">
                                                                <p className="change-text mt-3 text-muted">
                                                                    {value.DegreeString}
                                                                    {sp.get("lang") === "en" ?
                                                                        <i className={Style.pathIcon + " fas fa-chevron-right mx-2"}></i>
                                                                        :
                                                                        <i className={Style.pathIcon + " fas fa-chevron-left mx-2"}></i>
                                                                    }
                                                                    {value.MajorString !== null ?
                                                                        value.MajorString :
                                                                        sp.get("lang") === "en" ?
                                                                            value.MajorNameEnglish :
                                                                            value.MajorNamePersian
                                                                    }
                                                                    {sp.get("lang") === "en" ?
                                                                        <i className={Style.pathIcon + " fas fa-chevron-right mx-2"}></i>
                                                                        :
                                                                        <i className={Style.pathIcon + " fas fa-chevron-left mx-2"}></i>
                                                                    }
                                                                    {value.UniString !== null ?
                                                                        value.UniString :
                                                                        sp.get("lang") === "en" ?
                                                                            value.UniNameEnglish :
                                                                            value.UniNamePersian
                                                                    }
                                                                    {sp.get("lang") === "en" ?
                                                                        <i className={Style.pathIcon + " fas fa-chevron-right mx-2"}></i>
                                                                        :
                                                                        <i className={Style.pathIcon + " fas fa-chevron-left mx-2"}></i>
                                                                    }
                                                                    {value.UniTypeString}


                                                                </p>
                                                                <p className="mt-2 change-text">
                                                                    {sp.get("lang") === "en" ?
                                                                        value.CompleteInfoEnglish :
                                                                        value.CompleteInfoPersian

                                                                    }

                                                                </p>
                                                                {sp.get("lang") === "en" ?
                                                                    <p className="mt-2 change-text">

                                                                        {moment(value.SDate).format('YYYY/M')} to {value.isEducation ? "Present" : moment(value.EDate).format('YYYY/M')}

                                                                    </p> :
                                                                    <p className="mt-2 change-text">

                                                                        {moment(value.SDate).format('jYYYY/jM')} تا {value.isEducation ? "تاکنون (درحال تحصیل)" : moment(value.EDate).format('jYYYY/jM')}

                                                                    </p>
                                                                }
                                                            </div>
                                                            <div
                                                                className="col-md-4 text-right text-md-center col-12 mt-2 mb-4">

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

                                            <button id={'open'} onClick={setAddEducation}
                                                    className={'btn btn-login change-dir change-float'}><img
                                                width={30}
                                                src={addImg}/></button>

                                            <button id={'close'}
                                                    className={'btn btn-login change-dir d-none change-float'}>
                                                <img
                                                    width={30} src={minus}/></button>

                                        </div>
                                    </div>

                                </div>
                                <div className={'col-12 col-lg-5 d-none d-lg-block embed-responsive-16by9'}>
                                    <FrameResume step={4}/>
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
                                    <div className="row">
                                        <div className="col-12 mx-auto mt-4 change-dir" id={'form'}>
                                            <div className={'row'}>
                                                <div className={'col-12'}>
                                                    <h6 className={'change-text text-muted'}>{t("resume.step4.alert2")}</h6>
                                                </div>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.degree")}</label>
                                                    </div>

                                                    <div className={Style.selectPart + " col-12 form-group"}>
                                                        <select onChange={(event) => onGetMajor(event.target)}
                                                                id={'DegreeId'}
                                                                className={Style.formSelect}
                                                                aria-label="Default select example">
                                                            <option
                                                                value={0}>
                                                                {t("resume.step4.select")}
                                                            </option>
                                                            {degree !== undefined && degree.map((value, index) => (
                                                                <option selected={editItems.DegreeId === value.id}
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
                                                        <label htmlFor="" className="">{t("resume.step4.major")}</label>
                                                    </div>
                                                    <div className={Style.selectPart + " col-12 "}>

                                                        <div className={" col-12 form-group"}>

                                                            {sp.get("lang") === "fa" ?
                                                                <Select
                                                                    options={majorList}
                                                                    placeholder="دانشگاه را انتخاب کنید"
                                                                    isSearchable={true}
                                                                    onChange={majorSelectFunc}
                                                                    defaultValue={{
                                                                        value: editItems.MajorId,
                                                                        label: editItems.MajorString
                                                                    }}
                                                                /> :

                                                                <Select
                                                                    options={majorList}
                                                                    placeholder="Select Major"
                                                                    isSearchable={true}
                                                                    onChange={majorSelectFunc}
                                                                    defaultValue={{
                                                                        value: editItems.MajorId,
                                                                        label: editItems.MajorString
                                                                    }}
                                                                />
                                                            }
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className={'col-md-4 col-12 change-dir change-text pt-3 mt-3'}>
                                                    <button id={'openMajor'} onClick={setAddMajor}
                                                            className={'btn btn-login change-dir change-float'}><img
                                                        width={30}
                                                        src={addImg}/>
                                                    </button>
                                                    <button id={'closeMajor'} onClick={setCloseMajor}
                                                            className={'btn btn-login change-dir d-none change-float'}>
                                                        <img
                                                            width={30} src={minus}/></button>
                                                </div>
                                            </div>
                                            <div className={'row d-none'} id={"defaultMajor"}>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.majorNamePersian")}</label>
                                                    </div>
                                                    <div className={"col-12 " + Style.input}>
                                                        <input defaultValue={editItems.MajorNamePersian}
                                                               id={'majorNamePersian'}
                                                               type="text"
                                                               className="form-control dir-rtl"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.majorNameEnglish")}</label>
                                                    </div>
                                                    <div className={"col-12 " + Style.input}>
                                                        <input defaultValue={editItems.MajorNameEnglish}
                                                               id={'majorNameEnglish'}
                                                               type="text"
                                                               className="form-control dir-ltr"/>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className={'row'}>
                                                <div className={'col-12'}>
                                                    <hr/>
                                                    <h6 className={'change-text text-muted'}>{t("resume.step4.alert1")}</h6>
                                                </div>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.university")}</label>
                                                    </div>
                                                    <div className={Style.selectPart + " col-12 "}>
                                                        {/*<select id={'uniId'} className={Style.formSelect}*/}
                                                        {/*        aria-label="Default select example">*/}

                                                        {/*    <option*/}
                                                        {/*        value={0}>*/}
                                                        {/*        {t("resume.step4.select")}*/}
                                                        {/*    </option>*/}
                                                        {/*    {uni !== undefined && uni.map((value, index) => (*/}
                                                        {/*        <option selected={editItems.UniId === value.id}*/}
                                                        {/*                value={value.id}>*/}
                                                        {/*            {sp.get("lang") === "fa" ?*/}
                                                        {/*                value.name :*/}
                                                        {/*                value.englishName*/}
                                                        {/*            }*/}
                                                        {/*        </option>*/}
                                                        {/*    ))*/}
                                                        {/*    }*/}
                                                        {/*</select>*/}
                                                        {sp.get("lang") === "fa" ?
                                                            <Select
                                                                options={uniList}
                                                                placeholder="دانشگاه را انتخاب کنید"
                                                                isSearchable={true}
                                                                onChange={uniSelectFunc}
                                                                defaultValue={{
                                                                    value: editItems.UniId,
                                                                    label: editItems.UniString
                                                                }}
                                                            /> :
                                                            <Select
                                                                options={uniList}
                                                                placeholder="Select University"
                                                                isSearchable={true}
                                                                onChange={uniSelectFunc}
                                                                defaultValue={{
                                                                    value: editItems.UniId,
                                                                    label: editItems.UniString
                                                                }}
                                                            />
                                                        }

                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.uniType")}</label>
                                                    </div>
                                                    <div className={Style.selectPart + " col-12 "}>
                                                        <select id={'uniTypeId'} className={Style.formSelect}
                                                                aria-label="Default select example">
                                                            {uniType !== undefined && uniType.map((value, index) => (
                                                                <option selected={editItems.UniTypeId == value.id}
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
                                                <div className={'col-md-4 col-12 change-dir change-text pt-3 mt-3'}>
                                                    <button id={'openUniName'} onClick={setAddUni}
                                                            className={'btn btn-login change-dir change-float'}><img
                                                        width={30}
                                                        src={addImg}/>
                                                    </button>
                                                    <button id={'closeUniName'} onClick={setCloseUni}
                                                            className={'btn btn-login change-dir d-none change-float'}>
                                                        <img
                                                            width={30} src={minus}/></button>
                                                </div>

                                            </div>
                                            <div className={'row d-none'} id={"defaultUniName"}>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.uniNamePersian")}</label>
                                                    </div>
                                                    <div className={"col-12 " + Style.input}>
                                                        <input defaultValue={editItems.UniNamePersian}
                                                               id={'uniNamePersian'}
                                                               type="text"
                                                               className="form-control dir-rtl"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.uniNameEnglish")}</label>
                                                    </div>
                                                    <div className={"col-12 " + Style.input}>
                                                        <input defaultValue={editItems.UniNameEnglish}
                                                               id={'uniNameEnglish'}
                                                               type="text"
                                                               className="form-control dir-ltr"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-12'}>
                                                    <hr/>
                                                </div>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor="" className="">{t("resume.step4.sDate")}</label>
                                                    </div>
                                                    <div className={Style.selectPart + " col-12 "}>
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
                                                {
                                                    endDateStatus ?
                                                        <div className="col-md-4 col-12 py-2 change-dir change-text"
                                                             id={"endDate"}>
                                                            <div className="col-12">
                                                                <label htmlFor=""
                                                                       className="">{t("resume.step4.eDate")}</label>
                                                            </div>
                                                            <div className={Style.selectPart + " col-12 "}>
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
                                                        </div> :
                                                        null
                                                }

                                                <div className="col-md-4 col-12 py-2 change-dir change-text pt-5">
                                                    <div className="form-check px-3">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="isEducation" onClick={hideEndDate}
                                                               defaultChecked={editItems.isEducation}/>
                                                        <label className="form-check-label px-4" htmlFor="isEducation">
                                                            {t("resume.step4.study")}
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-12'}>
                                                    <hr/>
                                                </div>
                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.country")}</label>
                                                    </div>
                                                    <div className={Style.selectPart + " col-12 "}>
                                                        {sp.get("lang") === "fa" ?
                                                            <Select
                                                                options={countryList}
                                                                placeholder="کشور را انتخاب کنید"
                                                                isSearchable={true}
                                                                onChange={countrySelectFunc}
                                                                defaultValue={{
                                                                    value: editItems.CountryName,
                                                                    label: countryEditName
                                                                }}
                                                            /> :
                                                            <Select
                                                                options={countryList}
                                                                placeholder="Select Country"
                                                                isSearchable={true}
                                                                onChange={countrySelectFunc}
                                                                defaultValue={{
                                                                    value: editItems.CountryName,
                                                                    label: countryEditName
                                                                }}
                                                            />
                                                        }

                                                    </div>
                                                </div>


                                                <div className="col-md-4 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.totalAverage")}</label>
                                                    </div>
                                                    <div className={"col-12 " + Style.input}>
                                                        <input defaultValue={editItems.TotalAverage}
                                                               id={'totalAverageVal'}
                                                               type="text"
                                                               className="form-control dir-ltr"/>
                                                    </div>
                                                </div>

                                                <div className={'col-12'}>
                                                    <hr/>
                                                </div>
                                                <div className="col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.completeInfoPersian")}</label>
                                                    </div>
                                                    <div className="col-12">
                                                <textarea defaultValue={editItems.CompleteInfoPersian}
                                                          id={'completeInfoPersian'} type="text"
                                                          className="form-control dir-rtl"/>
                                                    </div>
                                                </div>
                                                <div className="col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step4.completeInfoEnglish")}</label>
                                                    </div>
                                                    <div className="col-12">
                                                <textarea defaultValue={editItems.CompleteInfoEnglish}
                                                          id={'completeInfoEnglish'} type="text"
                                                          className="form-control dir-ltr"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-12'}>
                                                    {
                                                        add === true ?
                                                            <button id={'submitAdd'} onClick={onSubmitAdd}
                                                                    className="btn change-float-reverse my-3 mx-3 btn-success">
                                                                {t("resume.step4.submit")}

                                                            </button> :
                                                            <button id={'submitEdit'} onClick={onSubmitAdd}
                                                                    className="btn change-float-reverse my-3 mx-3 btn-success">
                                                                {t("resume.step4.edit")}

                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            <div className={'row'}>
                                <div className="col-12">
                                    <button onClick={() => history.push({
                                        pathname: getRoutesItems().resumeStep5.route,
                                        search: "lang=" + sp.get("lang"),

                                    })}
                                            className="btn change-float-reverse my-3 mx-3 btn-info">
                                        {t("resume.step4.nextStep")}

                                    </button>
                                    <button onClick={() => history.push({
                                        pathname: getRoutesItems().resumeStep3.route,
                                        search: "lang=" + sp.get("lang"),

                                    })} className="btn change-float my-3 mx-3 btn-danger">
                                        {t("resume.step4.previousStep")}

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
                    {modalIsOpenGuide ?
                        <img style={{border: "1px dashed #000", borderRadius: "50%"}}
                             className={Style["filterButton"] + " p-1"} onClick={closeModalGuide} width={'60px'}
                             height={'60px'}
                             src={guide}/>
                        :
                        <img style={{border: "1px dashed #000", borderRadius: "50%"}}
                             className={Style["filterButton"] + " p-1"} onClick={openModalGuide} width={'60px'}
                             height={'60px'}
                             src={guide}/>
                    }

                </div>
            </main>
            <NotificationContainer/>

        </div>
    )
}