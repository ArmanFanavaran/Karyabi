import {Link, Route, useHistory} from 'react-router-dom'
import {getRoutesItems} from "../../RoutesList/RoutesList";
import * as React from "react";
import {useEffect, useState} from "react";
import Style from './DashboardParent.module.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import {generateURL} from "../../global/Requests";
import {NotificationManager} from "react-notifications";
import queryString from "query-string";
import ProfileImage from '../../../assets/img/default-profile.jpg';
import $ from "jquery";
import Modal from "react-modal";
import filterImage from "../../employmentAdvertisement/imgs/filter.png";
import {getDashboardPages} from "./dashboardPages";
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import AddJobOfferStep1 from "../AddJobOffer/addJobOfferStep1";
import AddJobOfferStep2 from "../AddJobOffer/addJobOfferStep2";
import JobOfferList from "../AddJobOffer/JobOfferList";
import JobOfferRequests from "../jobOfferRequests/JobOfferRequests";


export default function DashboardParentCompany() {
    const history = useHistory();
    const [user, setUser] = useState();
    const [companies, setCompanies] = useState([]);
    const [currentCompany, setCurrentCompany] = useState();
    const [isCompanyListExpanded, setIsCompanyListExpanded] = useState();

    const [language, setLanguage] = useState();
    const pages = getDashboardPages();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalStyle = {
        content: {
            // direction: "rtl",
            top: '16%',
            left: '0',
            width: '90%',
            maxWidth: '100%',
            right: '0',
            bottom: '0',
            margin: '0 auto',
            // marginRight: '-50%',
            zIndex: '1',
            boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            // padding: '20px',
            // marginTop:'30px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#6969dd #e0e0e0',
            minHeight: '35vh',
            border: 0,
            height: '80vh',
            // transform: 'translate(-50%, -50%)',
        }

    }


    const checkIsActive = (event, pathname) => {
        const activeItemStyle = "background-color: #f8f2ff;"
        const inactiveItemStyle = "background-color: #ffffff;"
        $(".navItems li").attr("style",inactiveItemStyle);
        $(event.currentTarget).attr("style",activeItemStyle);
    }
    const isNavActive = (pathname) => {
        if (window.location.pathname === pathname)
            return true;
    }

    /************** Scroll Filter *************/
    $(window).scroll(function () {
        if ($(this).scrollTop() > $('#fixed-class').outerHeight() + 200) {
            $('#fixed-class').addClass(Style["fixed-content"])
            $('#filter').css("max-height", " 90vh ")
            if ($(this).scrollTop() <= $('#advertisementList').outerHeight() - 100) {
                // $('#fixed-class').addClass(Style["fixed-content"])
                $(Style["fixed-content"]).animate({scrollTop: $('#fixed-class').height()}, 1000);
            }

        } else {
            $('#fixed-class').removeClass(Style["fixed-content"])
            $('#filter').css("max-height", " unset ")

        }
    })

    const onCompanyItemClicked = (item) => {
        setCurrentCompany(item);
        setIsCompanyListExpanded(false);
        history.replace({
            pathname:getRoutesItems().dashboardParentCompany.route,
            search: "lang=" +language + "&company=" + item.id,
        })
    }

    useEffect(function () {
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);
        let axios = require('axios');
        axios.defaults.withCredentials = true;


        /* get info */
        let config_data = {
            "heights": [
                getSizeImageItems().UserNavbarPic.Heights
            ],
            "widths": [
                getSizeImageItems().UserNavbarPic.Widths
            ],
            "qualities": [
                getSizeImageItems().UserNavbarPic.Qualities
            ]
        }
        let config = {
            method: 'post',
            url: generateURL("/Resume/GetLastResume"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(config_data)
        };
        axios(config).then(function (response) {
            console.log(response.data.data)
            let userInfo = JSON.parse(response.data.data.userInfoJson);
            setUser(userInfo);
            console.log(userInfo)

            // setResumes(response.data.data);
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

        /* get companies List */
        let list_data = {
            "roleId": 5,
            "page": 1,
            "pageSize": 100,
            "logoPicDetail": {
                "heights": [
                    200
                ],
                "widths": [
                    200
                ],
                "qualities": [
                    90
                ]
            },
            "mainPicDetail": {
                "heights": [
                    200
                ],
                "widths": [
                    200
                ],
                "qualities": [
                    90
                ]
            },
            "keyWord": "",
            "provinceIds": [],
            "cityIds": [],
            "companyCategoryIds": [],
            "economicCode": "",
            "fixedphone": "",
            "mobilePhone": "",
            "userId": 0,
            "isSortByInsertTimeAsc": false,
            "isSortByInsertTimeDesc": false,
            "isSortByScoreAsc": false,
            "isSortByScoreDesc": false,
            "fromRegisterationDate": null,
            "toRegisterationDate": null
        }
        let list_config = {
            method: 'post',
            url: generateURL("/Company/GetCompanyListPanelSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(list_data)
        };
        axios(list_config).then(function (response) {
            console.log(response.data.data)
            setCompanies(response.data.data);
            let current_company = response.data.data[0]
            setCurrentCompany(current_company);

            let url_search = "lang=" +url.lang + "&company=" + current_company.id;
            if (url.joboffer !== undefined) {
                url_search += "&joboffer=" + url.joboffer
            }
            history.replace({
                pathname: window.location.pathname,
                search: url_search,
            });



        }).catch(function (error) {
            console.log(error);
            console.log(error.response);
            // let errors = error.response.data.errors;
            // if (errors != null) {
            //     Object.keys(errors).map((key, i) => {
            //         for (var i = 0; i < errors[key].length; i++) {
            //             NotificationManager.error(errors[key][i]);
            //         }
            //     });
            //
            // } else if (error.response.data.message != null && error.response.data.message != undefined) {
            //     NotificationManager.error(error.response.data.message, '', 1000);
            // } else {
            //     NotificationManager.error(error.response.data.Message, '', 1000);
            //
            // }
        });

    }, []);
    return (
        <div className={Style.main}>
            <div className={"container my-4 "}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <Modal
                            isOpen={isModalOpen}
                            // onAfterOpen={afterOpenModal}
                            // onRequestClose={() => {setIsModalOpen(false)}}
                            style={modalStyle}
                            contentLabel="Example Modal"
                        >
                            <button className={'btn btn-default float-right'} onClick={() => {
                                setIsModalOpen(false)
                            }}>X
                            </button>

                            <div className={" p-3 change-dir"}>
                                <div className={"mt-3"}>
                                    <div className={"d-flex justify-content-center"}>
                                        <img className={Style.profileImage}
                                             src={currentCompany !== undefined ? currentCompany.logo
                                                 : ProfileImage}/>
                                    </div>
                                    {currentCompany !== undefined  && companies.length===1 &&
                                    <h6 className={Style.profileName + " mt-3"}>
                                        {language === 'fa' ? currentCompany.name :
                                            currentCompany.englishName}
                                    </h6>
                                    }
                                    { companies.length > 1 && currentCompany !== undefined &&
                                    <Accordion allowZeroExpanded className={Style.companyAccordion + " py-1 px-2 mt-3 mb-3"}>
                                        <AccordionItem dangerouslySetExpanded={isCompanyListExpanded}>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <h6 className={Style.profileName + " m-0 d-flex justify-content-center"}
                                                        onClick={()=>{
                                                            isCompanyListExpanded ?
                                                                setIsCompanyListExpanded(false) : setIsCompanyListExpanded(true)
                                                        }}>
                                                        {language === 'fa' ? currentCompany.name :
                                                            currentCompany.englishName}
                                                        <i className={'bi bi-caret-down-fill'}></i>
                                                    </h6>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                {
                                                    companies.map((item) => (
                                                        <div onClick={()=> {onCompanyItemClicked(item)}}
                                                             className={Style.companyItem + " change-dir change-text py-2 mx-3"}>
                                                            <i className="bi bi-box-arrow-in-left mx-1"></i>
                                                            {language === 'fa' ? item.name :
                                                                item.englishName}
                                                        </div>
                                                    ))
                                                }

                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    </Accordion>
                                    }


                                </div>
                                <ul className={"nav flex-column navItems " + Style.navItems}>
                                    {
                                        pages.company.map((item)=>(
                                            <li className={isNavActive(item.pathname)? "nav-item w-100 py-2 px-3 "+ Style.active : "nav-item w-100 py-2 px-3 "}
                                                onClick={(event)=>{checkIsActive(event, item.pathname)}}
                                            >{ currentCompany !== undefined &&
                                            <Link
                                                className={"text-center d-flex  text-secondary change-text"}
                                                to={{
                                                    pathname: item.pathname,
                                                    search: "lang=" +language +"&company=" + currentCompany.id,
                                                }}
                                            ><i className={item.iconClass}></i>
                                                <span className={'mx-2'}>{language==='fa' ? item.label : item.labelEng}</span></Link>
                                            }</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className={"row w-100 change-dir mx-0"}>
                    <div className={"col-xl-3 col-12 d-none d-xl-inline"}>
                        <div id={"fixed-class"} className={Style.nav + " p-3"}>
                            <div className={"mt-3"}>
                                <div className={"d-flex justify-content-center"}>
                                    <img className={Style.profileImage}
                                         src={currentCompany !== undefined ? currentCompany.logo
                                             : ProfileImage}/>
                                </div>
                                {currentCompany !== undefined  && companies.length===1 &&
                                <h6 className={Style.profileName + " mt-3"}>
                                    {language === 'fa' ? currentCompany.name :
                                        currentCompany.englishName}
                                </h6>
                                }
                                { companies.length > 1 && currentCompany !== undefined &&
                                <Accordion allowZeroExpanded className={Style.companyAccordion + " py-1 px-2 mt-3 mb-3"}>
                                        <AccordionItem dangerouslySetExpanded={isCompanyListExpanded}>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <h6 className={Style.profileName + " m-0 d-flex justify-content-center"}
                                                        onClick={()=>{
                                                            isCompanyListExpanded ?
                                                            setIsCompanyListExpanded(false) : setIsCompanyListExpanded(true)
                                                        }}>
                                                        {language === 'fa' ? currentCompany.name :
                                                            currentCompany.englishName}
                                                            <i className={'bi bi-caret-down-fill'}></i>
                                                    </h6>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                {
                                                    companies.map((item) => (
                                                        <div onClick={()=> {onCompanyItemClicked(item)}}
                                                            className={Style.companyItem + " change-dir change-text py-2 mx-3"}>
                                                            <i className="bi bi-box-arrow-in-left mx-1"></i>
                                                            {language === 'fa' ? item.name :
                                                                item.englishName}
                                                        </div>
                                                    ))
                                                }

                                            </AccordionItemPanel>
                                        </AccordionItem>
                                </Accordion>
                                }


                            </div>
                            <ul className={"nav flex-column navItems " + Style.navItems}>
                                {
                                    pages.company.map((item)=>(
                                        <li className={isNavActive(item.pathname)? "nav-item w-100 py-2 px-3 "+ Style.active : "nav-item w-100 py-2 px-3 "}
                                            onClick={(event)=>{checkIsActive(event, item.pathname)}}
                                        >{ currentCompany !== undefined &&
                                            <Link
                                                className={"text-center d-flex  text-secondary change-text"}
                                                to={{
                                                    pathname: item.pathname,
                                                    search: "lang=" +language +"&company=" + currentCompany.id,
                                                }}
                                            ><i className={item.iconClass}></i>
                                                <span className={'mx-2'}>{language==='fa' ? item.label : item.labelEng}</span></Link>
                                        }</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={"col-xl-9 col-12 py-4 px-0"}>

                        {/*<Route path={getRoutesItems().DashboardParent.route} exact component={ProfileInfo}/>*/}
                        <Route path={getRoutesItems().addJobOfferByCompany.route} exact component={AddJobOfferStep1}/>
                        <Route path={getRoutesItems().addJobOfferByCompanyStep2.route} exact component={AddJobOfferStep2}/>
                        <Route path={getRoutesItems().companyJobOffers.route} exact component={JobOfferList}/>
                        <Route path={getRoutesItems().companyReceivedResumes.route} exact component={JobOfferRequests}/>
                    </div>
                </div>
            </div>


            <div className={'position-fixed d-xl-none'} style={{bottom: '20px', left: '20px',zIndex:"1"}}>
                <img className={Style["filterButton"]} onClick={() => {
                    setIsModalOpen(true)
                }} width={'60px'} height={'60px'}
                     src={filterImage}/>
            </div>
        </div>
    )
}

export function ProfileInfo() {
    return (<h4>Profile Info</h4>)
}