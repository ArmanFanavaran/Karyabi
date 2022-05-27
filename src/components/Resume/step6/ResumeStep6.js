import $ from 'jquery';
import {useEffect, useState} from "react";
import Style from "./ResumeStep6.module.css"
import NavbarResume from "../navbar/NavbarResume"
import {generateURL} from "../../global/Requests";
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";
import {RatingStar} from "rating-star";
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
import autocomplete from 'autocompleter';
import trash from "./imgs/trash.svg"
import edit from "./imgs/edit.svg"
import addImg from "./imgs/add.svg";
import minus from "./imgs/minus.svg";
import Modal from "react-modal";
import guide from "./imgs/guide.png"

export default function ResumeStep6() {
    var moment = require("moment-jalaali");
    const history = useHistory();
    const [resumeId, setResumeId] = useState(0);
    let [resume, setResume] = useState("");
    const [items, setItems] = React.useState([]);
    const [editItems, setEditItems] = React.useState([]);
    const [editItemsIndex, setEditItemsIndex] = React.useState([]);
    const [skillsName, setSkillsName] = React.useState([]);
    const [skillsNameVal, setSkillsNameVal] = React.useState([]);
    const [rating, setRating] = React.useState(0);
    let [language, setLanguage] = useState([]);
    let [add, setAdd] = useState([]);
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
            initializeTitlesWithValue("Resume | Software skills")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("رزومه | مهارت نرم افزاری")
        }
        onGetResume();
        // updateSkillName()
        var configLanguageList = {
            method: 'get',
            url: generateURL('/SideArray/GetLanguageEntityList'),
            headers: {}
        };

        axios(configLanguageList)
            .then(function (response) {
                console.log(JSON.stringify(response.data.data));
                setLanguage(response.data.data)
            })
            .catch(function (error) {
                // console.log(error);
            });

        // onGetMajor();

    }, [])

    function onSubmitAdd() {
        setLoading(true)
        if (add) {
            var data = JSON.stringify({
                "id": parseInt(resumeId),
                "level": parseInt(rating),
                "areaOfInterestPersianString": null,
                "areaOfInterestEnglishString": $('#skillName').val(),
                "isSoftware": true,
            });
            console.log(data)
            var config = {
                method: 'post',
                url: generateURL('/Resume/AddSkillInfoSTP6'),
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
        }else {
            var data = JSON.stringify({
                "id": parseInt(editItems.Id),
                "level": parseInt(rating),
                "areaOfInterestPersianString": null,
                "areaOfInterestEnglishString": $('#skillName').val(),
                "isSoftware": true,
            });
            console.log(data)
            var config = {
                method: 'post',
                url: generateURL('/Resume/UpdateSkillInfoSTP6'),
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
            url: generateURL('/Resume/ChangeSkillInfoOrderSTP6'),
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
            url: generateURL('/Resume/RemoveSkillInfoSTP6'),
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
        setEditItemsIndex(index)
        setEditItems(items[index])
        // $('#skillName').val(items[index].AreaOfInterestEnglish.Name)
        setSkillsNameVal(items[index].AreaOfInterestEnglish.Name)
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
    }

    const onRatingChange = val => {
        setRating(val);
        console.log(val)
    };

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
                console.log("Hi baby")
                console.log(response.data.data)
                setResumeId(response.data.data.id)
                setResume(response.data.data)
                console.log(JSON.parse(response.data.data.skillInfoListJson))
                // let data=JSON.parse(response.data.data.skillInfoListJson);

                if (response.data.data.skillInfoListJson.length !== 0) {
                    let skillInfoList = JSON.parse(response.data.data.skillInfoListJson)
                    // IsSoftWare
                    let data=[]
                    skillInfoList.forEach(function(i){
                        if((i.AreaOfInterestEnglish !==null && i.AreaOfInterestEnglish.IsSoftWare===true)){
                            data.push(i)
                        }
                    });
                    data.sort(function (a, b) {
                        return a.Order - b.Order;
                    });
                    setItems(data)
                } else {
                    setItems([])
                }

            })
            .catch(function (error) {
            });
    }

    //// Active Level Shown /////
    const onActiveLevel = (bool) => {
        setLoading(true)
        console.log(bool)
        var data = JSON.stringify({
            "id": parseInt(resumeId),
            "levelShown": bool
        });
        var config = {
            method: 'post',
            url: generateURL('/Resume/ChangeSkillLevelShownBoolSTP6'),
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

    //// Get sills suggestion /////
    const suggest = () => {
        console.log("Hello")
        var data = JSON.stringify({
            "name": document.getElementById("skillName").value
        });
        var config = {
            method: 'post',
            url: generateURL('/Side/GetSoftwareInterestListClientSide'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setLoading(false)
                // var suggestions = response.data.data.filter(n => n.name)
                setSkillsName(response.data.data)
                updateSkillName(response.data.data)
                console.log(response.data.data)
                // console.log(response.data.data)
                // NotificationManager.success(response.data.message, '', 1000);
                // onGetResume()
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

    function updateSkillName(skill) {
        var countries = [];
        var input = document.getElementById("skillName");
        console.log("+11")

        autocomplete({
            input: input,
            minLength: 1,
            // emptyMsg: 'No elements found',

            fetch: function (text, callback, trigger, cursorPos) {
                $(".del").remove();

                // text = text.toLowerCase();
                for (const x in skill) {
                    let tmp = {
                        label: skill[x].name,
                        value: skill[x].id
                    }
                    countries.push(tmp)
                }
                console.log(callback)
                var suggestions = countries.filter(n => n.label.startsWith(text))
                // var suggestions = [{ label: "United States", value: "US" }];
                callback(suggestions);

            },
            disableAutoSelect: true,
            keysToIgnore: "Up,Right, Left",
            className: " del " + Style.formSearch,
            onSelect: function (item) {
                input.value = item.label;
            }
        });


    }

    return (
        <div>
            <main className={Style.main}>
                <NavbarResume step={6}/>
                <div className="container change-dir">
                    <div className={Style.formBox}>
                        <div className="row">
                            <div className={'col-12'}>
                                <h2 className={Style.formTitle + " change-dir change-text px-3"}>
                                    {t("resume.step6.softwareSkills")}
                                </h2>
                                <p className={" change-dir change-text px-3"}>
                                    {t("resume.step6.levelShown")}
                                    <br/>
                                    {
                                        resume.skillInfoLevelShown ?
                                            <button className="btn btn-primary text-white"
                                                    onClick={() => {
                                                        onActiveLevel(false)
                                                    }}><i className="fas fa-toggle-on"></i></button>
                                            : <button className="btn btn-secondary text-white"
                                                      onClick={() => {
                                                          onActiveLevel(true)
                                                      }}><i className="fas fa-toggle-off"></i></button>
                                    }

                                </p>
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
                                        <FrameResume step={6}/>

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
                                                    <div className="col-xl-11 col-lg-11 col-md-10 col-9">
                                                        <div className="row my-1">
                                                            <div className="col-md-8 col-12">
                                                                <p className="change-text mt-3 text-muted">
                                                                    {value.AreaOfInterestEnglish.Name}
                                                                </p>
                                                                <RatingStar
                                                                    id={index + 1}
                                                                    rating={value.Level}
                                                                    // onRatingChange={onRatingChange}
                                                                />
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
                                    <FrameResume step={6}/>
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

                                        <div className="col-12 change-dir" id={'form'}>
                                            <div className={'row'}>
                                                <div className="col-md-6 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label htmlFor=""
                                                               className="">{t("resume.step6.selectSkills")}</label>
                                                    </div>
                                                    <div className={Style.selectPart + " " +Style.input}>
                                                        <input className={'dir-ltr'} autoComplete="off" onKeyUp={suggest} defaultValue={skillsNameVal} id="skillName" type="text"/>

                                                    </div>

                                                </div>
                                                <div className="col-md-6 col-12 py-2 change-dir change-text">
                                                    <div className="col-12">
                                                        <label>{t("resume.step6.level")}</label>
                                                    </div>
                                                    <div className={Style.selectPart}>
                                                        <RatingStar
                                                            id="clickable"
                                                            clickable
                                                            rating={rating}
                                                            onRatingChange={onRatingChange}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-12 text-center'}>
                                                    {
                                                        add === true ?
                                                            <button id={'submitAdd'} onClick={onSubmitAdd}
                                                                    className="btn my-3 btn-success">
                                                                {t("resume.step6.submit")}

                                                            </button> :
                                                            <button id={'submitEdit'} onClick={onSubmitAdd}
                                                                    className="btn my-3 btn-success">
                                                                {t("resume.step6.edit")}

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
                                        pathname: getRoutesItems().resumeStep7.route,
                                        search: "lang=" + sp.get("lang"),

                                    })}
                                            className="btn change-float-reverse my-3 mx-3 btn-info">
                                        {t("resume.step6.nextStep")}

                                    </button>
                                    <button onClick={() => history.push({
                                        pathname: getRoutesItems().resumeStep5.route,
                                        search: "lang=" + sp.get("lang"),

                                    })} className="btn change-float my-3 mx-3 btn-danger">
                                        {t("resume.step6.previousStep")}

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
                    <img style={{border:"1px dashed #000",borderRadius:"50%"}} className={Style["filterButton"] + " p-1 bg-warning" } onClick={openModalGuide} width={'60px'} height={'60px'}
                         src={guide}/>
                </div>
            </main>
            <NotificationContainer/>

        </div>
    )
}