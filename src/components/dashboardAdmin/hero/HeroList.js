import {useEffect, useState} from "react";
import * as React from "react";
import {NotificationContainer, NotificationManager} from "react-notifications";
import Pagination from "react-js-pagination";
import {useHistory} from "react-router";
import {initializeTitlesWithValue} from "../../global/Titles";
import {generateURL} from "../../global/Requests";
import {Link} from "react-router-dom";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {useTranslation} from "react-i18next";
import * as queryString from "query-string";
import $ from "jquery";
import {css} from "@emotion/react";
import Modal from "react-modal";
import addImg from "./imgs/add.svg";

export default function HeroList() {
    const [DataHero, setDataHero] = useState([])
    const [editItems, setEditItems] = React.useState([]);
    const [editId, setEditId] = React.useState([]);
    const [deleteItems, setDeleteItems] = React.useState([]);
    const [deleteId, setDeleteId] = React.useState([]);
    const history = useHistory();
    // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css`
      display: flex;
      margin: 0 auto;
      border: 10px #ff0000;
      //z-index: 99999;
    `;


    /************** Modal Delete **************/
    const [modalIsOpenDelete, setIsOpenDelete] = React.useState(false);
    const customStylesDelete = {

        content: {
            top: '56%',
            left: '50%',
            width: '70%',
            maxWidth: '400px',
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
            height: '40vh',
            transform: 'translate(-50%, -50%)',

        },

        "@media only screen and (max-width: 375px)": {
            backgroundColor: 'red'
        },

        webkitScrollbar: {width: "1em"},
        webkitScrollbarTrack: {boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)"},
        webkitScrollbarThumb: {backgroundColor: "darkgrey", outline: "1px solid slategrey"}

    };

    function openModalDelete(id) {
        setIsOpenDelete(true);
        document.body.style.overflow = 'hidden';
        setDeleteId(id)
        var index = -1
        for (var i = 0; i < DataHero.length; i++) {
            if (DataHero[i].id === id) {
                index = i;
                break;
            }
        }
        // console.log(items[index])
        setDeleteItems(DataHero[index])
    }

    function closeModalDelete() {
        setIsOpenDelete(false);
        document.body.style.overflow = 'visible';

    }

    /************** Modal Edit **************/
    const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);
    const customStylesEdit = {

        content: {
            top: '56%',
            left: '50%',
            width: '85%',
            maxWidth: '700px',
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
            height: '55vh',
            transform: 'translate(-50%, -50%)',

        },

        "@media only screen and (max-width: 375px)": {
            backgroundColor: 'red'
        },

        webkitScrollbar: {width: "1em"},
        webkitScrollbarTrack: {boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)"},
        webkitScrollbarThumb: {backgroundColor: "darkgrey", outline: "1px solid slategrey"}

    };

    function openModalEdit(id) {
        setIsOpenEdit(true);
        document.body.style.overflow = 'hidden';
        setDeleteId(id)
        var index = -1
        for (var i = 0; i < DataHero.length; i++) {
            if (DataHero[i].id === id) {
                index = i;
                break;
            }
        }
        // console.log(items[index])
        setEditItems(DataHero[index])
        setEditId(DataHero[index].id)
    }

    function closeModalEdit() {
        setIsOpenEdit(false);
        document.body.style.overflow = 'visible';

    }

    /************** Modal Add **************/
    const [modalIsOpenAdd, setIsOpenAdd] = React.useState(false);

    function openModalAdd(id) {
        setIsOpenAdd(true);
        document.body.style.overflow = 'hidden';
    }

    function closeModalAdd() {
        setIsOpenAdd(false);
        document.body.style.overflow = 'visible';

    }


    var axios = require('axios');
    axios.defaults.withCredentials = true;
    var $ = require('jquery');
    const [t, i18n] = useTranslation('main');
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);

    useEffect(function () {
        if (sp.get("lang") === "en") {
            initializeTitlesWithValue("Admin | Hero | list")
        } else if (sp.get("lang") === "fa") {
            initializeTitlesWithValue("ادمین | متن اصلی | لیست")
        }
        var configHero = {
            method: 'get',
            url: generateURL('/Hero/GetAll'),
            headers: {
                'Content-Type': 'application/json'
            },
        };


        axios(configHero)
            .then(function (response) {
                setDataHero(response.data.data)

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
                    NotificationManager.error(error.response.data.message,'',1000);
                } else {
                    NotificationManager.error(error.response.data.Message,'',1000);

                }
            });

    }, [])


    ///// get Data Table /////
    function requestData() {

        var configHero = {
            method: 'get',
            url: generateURL('/Hero/GetAll'),
            headers: {
                'Content-Type': 'application/json'
            },
        };


        axios(configHero)
            .then(function (response) {
                setDataHero(response.data.data)
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
                    NotificationManager.error(error.response.data.message,'',1000);
                } else {
                    NotificationManager.error(error.response.data.Message,'',1000);

                }
            });
    }

    ///// Delete function //////
    function Delete(id) {

        var configDelete = {
            method: 'get',
            url: generateURL('/Hero/Remove?id=' +id),
            headers: {}
        };
        axios(configDelete)
            .then(function (response) {
                NotificationManager.success(response.data.message, '', 1000);
                requestData();
                closeModalDelete()
                setDeleteItems([])
                setDeleteId([])
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
                    NotificationManager.error(error.response.data.message,'',1000);
                } else {
                    NotificationManager.error(error.response.data.Message,'',1000);

                }
            });
    }

    ///// Change Status ////////
    const onInActiveHero = (id) => {
        var config = {
            method: 'get',
            url: generateURL('/Hero/ChangeStatus?id=' + id + '&status=false'),
            headers: {}
        };

        axios(config)
            .then(function (response) {
                NotificationManager.success(response.data.message, '', 1000);
                requestData();
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
                    NotificationManager.error(error.response.data.message,'',1000);
                } else {
                    NotificationManager.error(error.response.data.Message,'',1000);

                }
            });

    }

    const onActiveHero = (id) => {
        var config = {
            method: 'get',
            url: generateURL('/Hero/ChangeStatus?id=' + id + '&status=true'),
            headers: {}
        };

        axios(config)
            .then(function (response) {
                NotificationManager.success(response.data.message, '', 1000);
                requestData();

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
                    NotificationManager.error(error.response.data.message,'',1000);
                } else {
                    NotificationManager.error(error.response.data.Message,'',1000);

                }
            });


    }

    ///// Edit Index //////////
    const edit = (id) => {
        var dataHero = JSON.stringify({
            "message": document.getElementById('message').value,
            "messageLangs": document.getElementById('messageEnglish').value,
            "heroId":parseInt(id)
        });
        var configHero = {
            method: 'post',
            url: generateURL('/Hero/Update'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataHero
        };


        axios(configHero)
            .then(function (response) {

                NotificationManager.success(response.data.message, '', 1000);
                requestData()
                closeModalEdit()
                setEditItems([])
                setEditId([])
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
                    NotificationManager.error(error.response.data.message,'',1000);
                } else {
                    NotificationManager.error(error.response.data.Message,'',1000);

                }
            });

    }

    ///// Add //////////
    const add = () => {
        var dataHero = JSON.stringify({
            "message": document.getElementById('message').value,
            "messageLangs": document.getElementById('messageEnglish').value,
        });
        var configHero = {
            method: 'post',
            url: generateURL('/Hero/Add'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataHero
        };


        axios(configHero)
            .then(function (response) {

                NotificationManager.success(response.data.message, '', 1000);
                requestData()
                closeModalAdd()
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
                    NotificationManager.error(error.response.data.message,'',1000);
                } else {
                    NotificationManager.error(error.response.data.Message,'',1000);

                }
            });

    }

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-12'}>
                    <h1 className={'change-dir change-text'}
                        style={{fontSize: "20px", fontWeight: "bold"}}>  {t("admin.hero.list.listHero")}</h1>
                    <div >
                        <button id={'open'} onClick={openModalAdd}
                                className={'btn btn-login change-dir change-float'}><img
                            width={30}
                            src={addImg}/></button>
                    </div>
                    <div className={' table-responsive'}>
                        <table className="table table-responsive w-100 d-block d-md-table font-IranSans">
                            <thead>
                            <tr className={'text-center'}>
                                <th>
                                    {t("admin.hero.list.message")}
                                </th>
                                <th>
                                    {t("admin.hero.list.messageEnglish")}
                                </th>
                                <th>
                                    {t("admin.hero.list.status")}
                                </th>
                                <th>
                                    {t("admin.hero.list.edit")}

                                </th>
                                <th>
                                    {t("admin.hero.list.delete")}

                                </th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                DataHero.map((value, index) => (
                                    <tr className={'text-cnter'}>

                                        <td className={'text-center'}>{value.message}</td>
                                        <td className={'text-center'}>{value.messageLangs}</td>
                                        <td className={'text-center'}>
                                            {
                                                value.isActivate ?
                                                    <button className="btn btn-primary text-white" data-id={value.id}
                                                            onClick={() => {
                                                                onInActiveHero(value.id)
                                                            }}><i className="fas fa-toggle-on"></i></button>
                                                    :
                                                    <button className="btn btn-secondary text-white" data-id={value.id}
                                                            onClick={() => {
                                                                onActiveHero(value.id)
                                                            }}><i className="fas fa-toggle-off"></i></button>
                                            }

                                        </td>

                                        <td className="text-center font-small-1">
                                            <button onClick={() => {
                                                openModalEdit(value.id)
                                            }} type="button" className="btn btn-success"
                                                    value={value.id}>{t("admin.hero.list.edit")}

                                            </button>
                                        </td>
                                        <td className="text-center font-small-1">
                                            <button onClick={() => {
                                                openModalDelete(value.id)
                                            }} type="button" className="btn btn-danger"
                                                    value={value.id}> {t("admin.hero.list.delete")}
                                            </button>
                                        </td>


                                    </tr>
                                ))
                            }

                            </tbody>
                        </table>

                    </div>

                </div>
            </div>


            <Modal
                isOpen={modalIsOpenDelete}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModalDelete}
                style={customStylesDelete}
                contentLabel="Example Modal"
            >
                <div className={'row'}>
                    <div className={'col-12 change-dir change-text'}>
                        <button className={'btn btn-default '} onClick={closeModalDelete}>X</button>
                        <br/>
                        <h4>   {t("admin.hero.list.deleteRequest")}</h4>
                        <hr/>
                        {sp.get("lang") === "fa" ?
                            <p>آیا میخواهید پیام {deleteItems.title}را حذف کنید؟
                            </p> :
                            <p>Do you want to delete {deleteItems.title} message?
                            </p>
                        }
                        {sp.get("lang") === "fa" ?
                            deleteItems.message :
                            deleteItems.messageLangs
                        }
                        <br/>
                        <div className={'change-text-reverse'}>
                            <button onClick={()=>{Delete(deleteId)}} className={'btn btn-danger change-text'}> {t("admin.hero.list.delete")}</button>
                        </div>
                    </div>

                </div>

            </Modal>

            <Modal
                isOpen={modalIsOpenEdit}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModalEdit}
                style={customStylesEdit}
                contentLabel="Example Modal"
            >
                <div className={'row'}>
                    <div className={'col-12 change-dir change-text'}>
                        <button className={'btn btn-default '} onClick={closeModalEdit}>X</button>
                        <br/>
                        <h4>   {t("admin.hero.list.editRequest")}</h4>
                        <hr/>
                        {sp.get("lang") === "fa" ?
                            <p>آیا میخواهید پیام {deleteItems.title}را ویرایش کنید؟
                            </p> :
                            <p>Do you want to Edit {deleteItems.title} message?
                            </p>
                        }


                    </div>
                </div>
                    <div className={'row'}>
                        <div className={'col-12 mt-2 change-text'}>
                            <label> {t("admin.hero.list.message")}</label>
                            <input className={'form-control change-text change-dir'} id={'message'} defaultValue={editItems.message}/>

                        </div>
                        <div className={'col-12 mt-2 change-text'}>
                            <label> {t("admin.hero.list.messageEnglish")}</label>
                            <input className={'form-control'} id={'messageEnglish'}
                                   defaultValue={editItems.messageLangs}/>

                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className={'change-text-reverse mt-3'}>
                                <button onClick={()=>{edit(editId)}} className={'btn btn-success change-text'}> {t("admin.hero.list.edit")}</button>
                            </div>
                        </div>
                    </div>
            </Modal>
            <Modal
                isOpen={modalIsOpenAdd}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModalAdd}
                style={customStylesEdit}
                contentLabel="Example Modal"
            >
                <div className={'row'}>
                    <div className={'col-12 change-dir change-text'}>
                        <button className={'btn btn-default '} onClick={closeModalAdd}>X</button>
                        <br/>
                        <h4>   {t("admin.hero.list.editRequest")}</h4>
                        <hr/>
                        {sp.get("lang") === "fa" ?
                            <p>پیام خود را اضافه کنید
                            </p> :
                            <p>Add your Message
                            </p>
                        }


                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-12 mt-2 change-text'}>
                        <label> {t("admin.hero.list.message")}</label>
                        <input className={'form-control change-text change-dir'} id={'message'}/>

                    </div>
                    <div className={'col-12 mt-2 change-text'}>
                        <label> {t("admin.hero.list.messageEnglish")}</label>
                        <input className={'form-control'} id={'messageEnglish'}/>

                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <div className={'change-text-reverse mt-3'}>
                            <button onClick={()=>{add()}} className={'btn btn-success change-text'}> {t("admin.hero.list.add")}</button>
                        </div>
                    </div>
                </div>
            </Modal>


        </div>

    )
}