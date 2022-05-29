import Style from "./SentResumes.module.css"
import {Link} from "react-router-dom";
import Edit from "../imgs/edit.png"
import Eye from "../imgs/eye.png"
import {useEffect, useState} from "react";
import {generateURL} from "../../global/Requests";
import {NotificationContainer, NotificationManager} from "react-notifications";
import queryString from "query-string";
import {serverTimeToNewsDate} from "../../global/TimeConverter";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import * as $ from 'jquery';
import {Table} from 'react-infinite-table';
import * as React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import Modal from "react-modal";
import {getResumeTemplates} from "../../global/resume/ResumeTemplates";
import {getResumeColors} from "../../global/resume/ResumeColors";

export default function SentResumes() {
    const [resumes, setResumes] = useState([]);
    const [language, setLanguage] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [count, setCount] = useState(0);

    /* Modal */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(0);
    const [myResumes, setMyResumes] = useState([]);
    const [resumeId, setResumeId] = useState();
    const [templateId, setTemplateId] = useState();
    const [colorId, setColorId] = useState();
    const [resumeCatId, setResumeCatId] = useState();
    const [updateAdId, setUpdateAdId] = useState();
    const resumeTemplates = getResumeTemplates();
    const resumeColors = getResumeColors();
    const modalStyle = {
        content: {
            direction: "rtl",
            top: '56%',
            left: '50%',
            width: '90%',
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
            maxHeight: '85vh',
            transform: 'translate(-50%, -50%)',
        }

    }

    const onOpenModal = (id) => {
        setIsModalOpen(true);
        setUpdateAdId(id)
        var axios = require('axios');
        axios.defaults.withCredentials = true;
        var config_resume_list = {
            method: 'post',
            url: generateURL("/Resume/GetMyResumeList"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {}
        };
        axios(config_resume_list)
            .then(function (response) {
                let resume_array = [];
                $(response.data.data).each(function (index, item) {
                    resume_array.push(item);
                });
                setMyResumes(resume_array);
                console.log(response.data.data)

            })
            .catch(function (error) {
                console.log(error);
            });


    }

    const onCloseModal = () => {
        setIsModalOpen(false)
        setUpdateAdId(null);
        setResumeId(null);
        setResumeCatId(null);
        $("#resume_description").val("");
        setModalStep(0);

    }

    const onselectResume = (e) => {
        setResumeId(parseInt(e.target.value));
        $("#step0_submit").addClass("d-block");
        $("#step0_submit").removeClass("d-none");
    }

    const onTemplateSelect = (category, template) => {
        setTemplateId(template);
        setResumeCatId(category);
        $("#step1_submit").addClass("d-block");
        $("#step1_submit").removeClass("d-none");
    }

    const onColorSelect = (id) => {
        setColorId(id);
        console.log(id)

        $("#step2_submit").addClass("d-block");
        $("#step2_submit").removeClass("d-none");

    }

    const submitModal = () => {
        let description = $("#resume_description").val();
        console.log(description)
        var axios = require('axios');
        axios.defaults.withCredentials = true;
        let data = {
            "id": updateAdId,
            "resumeId": resumeId,
            "designId": templateId,
            "colorId": colorId,
            "resumeCatId": resumeCatId,
            "description": description
        }
        let config = {
            method: 'post',
            url: generateURL("/JobOfferRequest/UpdateJobOfferRequest"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
        };
        console.log(data)
        axios(config).then(function (response) {
            setIsModalOpen(false);
            setModalStep(0);
            $("#step0_submit").addClass("d-none");
            $("#step0_submit").removeClass("d-block");
            $("#step1_submit").addClass("d-none");
            $("#step1_submit").removeClass("d-block");
            $("#step2_submit").addClass("d-none");
            $("#step2_submit").removeClass("d-block");

            NotificationManager.success(response.data.message, "", 2000);

            /** get Resumes */
            let config_data = {
                "roleId": 5,
                "heights": [
                    200
                ],
                "widths": [
                    200
                ],
                "qualities": [
                    90
                ],
                "page": 1,
                "pageSize": 100,
                "jobOfferOwner": "Company",
                "jobOfferOwnerId": 0,
                "jobofferId": 0,
                "userId": 0,
                "jobOfferTitle": "",
                "companyName": "",
                "userFNameOrLname": "",
                "fromDate": null,
                "toDate": null,
                "isSortByTimeDesc": false,
                "isSortByTimeAsec": false
            }
            let config = {
                method: 'post',
                url: generateURL("/JobOfferRequest/GetJobOfferRequestList"),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(config_data)
            };
            console.log(config_data)

            axios(config).then(function (response) {
                console.log(response.data)
                setResumes(response.data.data);
                setPage(1);

            }).catch(function (error) {
                console.log(error);
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


        }).catch(function (error) {
            console.log(error);
            setIsModalOpen(false);
            let errors = error.response.data.errors;
            if (errors != null) {
                Object.keys(errors).map((key, i) => {
                    for (var i = 0; i < errors[key].length; i++) {
                        NotificationManager.error(errors[key][i], "", 2000);
                    }
                });

            } else if (error.response.data.message != null && error.response.data.message != undefined) {
                NotificationManager.error(error.response.data.message , "", 2000);
            } else {
                NotificationManager.error(error.response.data.Message, "", 2000);
            }
        });
    }


    const getMoreResumes = () => {
        let axios = require('axios');
        axios.defaults.withCredentials = true;

        let config_data = {
            "roleId": 5,
            "heights": [
                200
            ],
            "widths": [
                200
            ],
            "qualities": [
                90
            ],
            "page": page + 1,
            "pageSize": pageSize,
            "jobOfferOwner": "Company",
            "jobOfferOwnerId": 0,
            "jobofferId": 0,
            "userId": 0,
            "jobOfferTitle": "",
            "companyName": "",
            "userFNameOrLname": "",
            "fromDate": null,
            "toDate": null,
            "isSortByTimeDesc": false,
            "isSortByTimeAsec": false
        }

        let config = {
            method: 'post',
            url: generateURL("/JobOfferRequest/GetJobOfferRequestList"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(config_data)
        };

        let lastPage = Math.ceil(count / pageSize); // the last page
        let next_page = page + 1;

        if (lastPage >= next_page) {

            /** get Resumes */
            axios(config).then(function (response) {
                let data = response.data.data;
                let resumesData = [...resumes]
                for (let i = 0; i < data.length; i++) {
                    resumesData.push(data[i])

                }//end for
                setResumes(resumesData);
                setPage(page + 1);
            }).catch(function (error) {
                console.log(error);
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i]);
                        }
                    });

                } else if (error.response.data.message != null) {
                    NotificationManager.error(error.response.data.message, '', 1000);
                } else {
                    NotificationManager.error(error.response.data.Message, '', 1000);

                }
            });

        }

    }

    useEffect(function (){
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);

        let axios = require('axios');
        axios.defaults.withCredentials = true;

        let config_data = {
            "roleId": 5,
            "heights": [
                200
            ],
            "widths": [
                200
            ],
            "qualities": [
                90
            ],
            "page": 1,
            "pageSize": 100,
            "jobOfferOwner": "Company",
            "jobOfferOwnerId": 0,
            "jobofferId": 0,
            "userId": 0,
            "jobOfferTitle": "",
            "companyName": "",
            "userFNameOrLname": "",
            "fromDate": null,
            "toDate": null,
            "isSortByTimeDesc": false,
            "isSortByTimeAsec": false
        }

        /** get Resumes */
        let config = {
            method: 'post',
            url: generateURL("/JobOfferRequest/GetJobOfferRequestList"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(config_data)
        };
        // console.log(config_data)

        axios(config).then(function (response) {
            // console.log(response.data)
            setResumes(response.data.data);
        }).catch(function (error) {
            console.log(error);
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

        /** get Count */
        let count_config = {
            method: 'post',
            url: generateURL("/JobOfferRequest/GetJobOfferRequestListCount"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(config_data)
        };
        // console.log(config_data)

        axios(count_config).then(function (response) {
            // console.log(response.data)
            setCount(response.data.data);
        }).catch(function (error) {
            console.log(error);
            let errors = error.response.data.errors;
            if (errors != null) {
                Object.keys(errors).map((key, i) => {
                    for (var i = 0; i < errors[key].length; i++) {
                        NotificationManager.error(errors[key][i]);
                    }
                });

            } else if (error.response.data.message != null) {
                NotificationManager.error(error.response.data.message, '', 1000);
            } else {
                NotificationManager.error(error.response.data.Message, '', 1000);

            }
        });


    }, []);

    return (
        <div>
            <h5 className={"change-dir change-text " + Style.pageTitle}>پیگیری رزومه‌های ارسالی</h5>
            <div className={"table-responsive change-dir mt-4"}>
                <table className={"table change-text " + Style.table}>
                    <thead>
                    <tr>
                        <th>عنوان شغل</th>
                        <th>نام شرکت</th>
                        <th>تاریخ ارسال</th>
                        <th>وضعیت بررسی</th>
                        <th>ویرایش</th>
                        <th>مشاهده</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        resumes.length > 0 ? resumes.map((item, index) => (
                            <tr>
                                <td><Link to={{
                                    pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                    search: "lang=" + language + "&" + "id=" + item.jobOfferId
                                }}>{language ==='fa' ? item.jobOfferTitle : item.jobOfferTitleEnglish}</Link></td>
                                <td>{language ==='fa' ? item.ownerName : item.ownerEnglishName}</td>
                                <td>{serverTimeToNewsDate(item.lastUpdate)}</td>
                                <td className={Style.approveStatus}>
                                    {item.isApproved && <span className={'bg-success rounded p-1'}>قبول شده</span>}
                                    {item.isRejected && <span className={'bg-danger rounded p-1'}>رد شده</span>}
                                    {(!item.isRejected && !item.isApproved)&& <span className={'bg-secondary rounded  p-1'}>درحال بررسی</span>}
                                </td>
                                <td><button className={"btn btn-warning " + Style.editBtn} onClick={()=>{onOpenModal(item.id)}}><img src={Edit}/></button></td>
                                <td><Link className={"btn btn-info " + Style.editBtn}><img src={Eye}/></Link></td>
                            </tr>
                        )):
                            <h5 className={'my-5 text-center text-secondary d-block'}>شما تا به حال رزومه‌ای ارسال نکرده‌اید</h5>
                    }
                    </tbody>
                </table>
                {/*<Table/>*/}
            </div>
            <Modal
                ariaHideApp={false}
                isOpen={isModalOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Example Modal"
            >
                <div className="">
                    <div className="modal-header ">
                        <button type="button" className="close"
                                onClick={onCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className="modal-title flex-grow-1 text-center pl-4" id="exampleModalLabel">ویرایش رزومه</h5>

                    </div>
                    <div>
                                { modalStep === 0 &&
                                <div>
                                    <div className="modal-body">
                                        <h6 className={"text-right my-4"}>انتخاب رزومه</h6>
                                        <select className={"form-control mb-4"} onChange={onselectResume}>
                                            <option selected={true} disabled={true} >انتخاب ...</option>
                                            {
                                                myResumes.length > 0 &&
                                                myResumes.map( (item, index) => (
                                                    <option value={item.id}>{item.title}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary d-none"  id={"step0_submit"}
                                                onClick={() => {setModalStep(modalStep + 1);}}>مرحله بعد</button>
                                    </div>
                                </div>}
                                { modalStep === 1 &&
                                <div>
                                    <div className="modal-body">
                                        <h6 className={"text-right my-4"}>انتخاب قالب</h6>

                                        <div className={Style.templatesContainer}>
                                            <Accordion allowZeroExpanded>
                                                {resumeTemplates.map((category) => (
                                                    <AccordionItem key={category.id}>
                                                        <AccordionItemHeading>
                                                            <AccordionItemButton>
                                                                <h6 className={"change-text py-2 px-3 " + Style.categoryTitle}>{language === 'fa' ? category.categoryName  : category.categoryNameEng}</h6>
                                                            </AccordionItemButton>
                                                        </AccordionItemHeading>
                                                        <AccordionItemPanel>
                                                            <div className={"row w-100 mb-4"}>
                                                                {
                                                                    category.templates.map((item, index) => (
                                                                        <div
                                                                            className={"col-12 col-xl-3 my-3"}>
                                                                            <img
                                                                                id={"template_" + item.id}
                                                                                className={item.id === templateId ? Style.resumeTemplateImage + " " + Style.focusedTemplate : Style.resumeTemplateImage}
                                                                                onClick={() => {
                                                                                    onTemplateSelect(category.id , item.id)
                                                                                }}/>
                                                                        </div>
                                                                    ))
                                                                }

                                                            </div>
                                                        </AccordionItemPanel>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>

                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal"
                                                onClick={function () {
                                                    if (modalStep !== 0)
                                                        setModalStep(modalStep-1)
                                                }}>قبلی
                                        </button>
                                        <button type="button" className="btn btn-primary d-none"  id={"step1_submit"}
                                                onClick={() => {setModalStep(modalStep + 1);}}>مرحله بعد</button>
                                    </div>
                                </div>}
                                { modalStep === 2 &&
                                <div>
                                    <div className="modal-body">
                                        <h6 className={"text-right my-4"}>انتخاب رنگ</h6>
                                        <div className={"row w-100"}>
                                            {
                                                resumeColors.map((item, index) => (
                                                    <div className={"col-6 col-xl-2 p-3"}>
                                                        <div className={item.id === colorId? Style.focusedTemplate +" d-flex "+ Style.templateColorBarParent: "d-flex "+ Style.templateColorBarParent} onClick={()=> {onColorSelect(item.id)}}>
                                                            <div className={"w-50 " + Style.templateColorBarRight} style={{backgroundColor: item.color1}}></div>
                                                            <div className={"w-50 " + Style.templateColorBarLeft} style={{backgroundColor: item.color2}}></div>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal"
                                                onClick={function () {
                                                    if (modalStep !== 0)
                                                        setModalStep(modalStep-1)
                                                }}>قبلی
                                        </button>
                                        <button type="button" className="btn btn-primary d-none"  id={"step2_submit"}
                                                onClick={() => {setModalStep(modalStep + 1);}}>مرحله بعد</button>
                                    </div>
                                </div>}
                                { modalStep === 3 &&
                                <div>
                                    <div className="modal-body">
                                        <h6 className={"text-right my-4"}>افزودن توضیحات</h6>
                                        <textarea className={"form-control " + Style.resumeDescription} id={"resume_description"}></textarea>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal"
                                                onClick={function () {
                                                    if (modalStep !== 0)
                                                        setModalStep(modalStep-1)
                                                }}>قبلی
                                        </button>
                                        <button type="button" className="btn btn-primary"
                                                onClick={submitModal}>ارسال رزومه</button>
                                    </div>
                                </div>}


                            </div>

                </div>

            </Modal>
            <NotificationContainer/>
        </div>
    )
}