import {Link, Route} from 'react-router-dom'
import {getRoutesItems} from "../../RoutesList/RoutesList";
import * as React from "react";
import {useEffect, useState} from "react";
import Style from './DashboardParentAdmin.module.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import {generateURL} from "../../global/Requests";
import {NotificationContainer, NotificationManager} from "react-notifications";
import queryString from "query-string";
import ProfileImage from '../../../assets/img/default-profile.jpg';
import $ from "jquery";
import Modal from "react-modal";
import filterImage from "../../employmentAdvertisement/imgs/filter.png";
import {getDashboardPagesAdmin} from "./dashboardPagesAdmin";

/**************** Page component *****************/
import HeroList from "../hero/HeroList";
import DegreeList from "../degree/DegreeList"
import Footer from "../footer/Footer";
import UpdateFooter from "../footer/UpdateFooter";
import PublicLinks from "../publicLinks/PublicLinkList";
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";
import EditPublicLink from "../publicLinks/EditPublicLink";
export default function DashboardParentAdmin() {
    const [user, setUser] = useState();
    const [language, setLanguage] = useState();
    const pages = getDashboardPagesAdmin();

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
        console.log(pathname)
        console.log(window.location.pathname)
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


    useEffect(function () {
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);
        let axios = require('axios');
        axios.defaults.withCredentials = true;

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
        console.log(config_data)

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
        })
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

                            <div className={" p-3"}>
                                <div className={"mt-3"}>
                                    <div className={"d-flex justify-content-center"}>
                                        <img className={Style.profileImage}
                                             src={user !== undefined && user.PicFullAddress.length > 0 ? user.PicFullAddress[0]
                                                 : ProfileImage}/>
                                    </div>
                                    {user !== undefined &&
                                    <h6 className={Style.profileName + " mt-3"}>
                                        {language === 'fa' ? user.FirstName + " " + user.LastName :
                                            user.FirstNameEnglish + " " + user.LastNameEnglish}
                                    </h6>

                                    }

                                    <p className={"text-center text-secondary"}>{user !== undefined && user.ResumePhone}</p>
                                    {/*<p className={"text-center text-secondary"}>{user !== undefined && user.ResumeEmail}</p>*/}
                                </div>
                                <hr/>
                                <ul className={"nav flex-column navItems dir-rtl " + Style.navItems}>
                                    {
                                        pages.user.map((item)=>(
                                            <li className={isNavActive(item.pathname)? "nav-item w-100 py-2 px-3 "+ Style.active : "nav-item w-100 py-2 px-3 "}
                                                onClick={(event)=>{checkIsActive(event, item.pathname)}}
                                            ><Link
                                                className={"text-center d-flex  text-secondary change-text"}
                                                to={{
                                                    pathname: item.pathname,
                                                    search: "lang=" +language,
                                                }}
                                            ><i className={item.iconClass}></i>
                                                <span className={'mx-2'}>{language==='fa' ? item.label : item.labelEng}</span></Link></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className={"row w-100 change-dir"}>
                    <div className={"col-xl-3 col-12 d-none d-xl-inline"}>
                        <div id={"fixed-class"} className={Style.nav + " p-3"}>
                            <div className={"mt-3"}>
                                <div className={"d-flex justify-content-center"}>
                                    <img className={Style.profileImage}
                                         src={user !== undefined && user.PicFullAddress.length > 0 ? user.PicFullAddress[0]
                                             : ProfileImage}/>
                                </div>
                                {user !== undefined &&
                                <h6 className={Style.profileName + " mt-3"}>
                                    {language === 'fa' ? user.FirstName + " " + user.LastName :
                                        user.FirstNameEnglish + " " + user.LastNameEnglish}
                                </h6>

                                }

                                <p className={"text-center text-secondary"}>{user !== undefined && user.ResumePhone}</p>
                                {/*<p className={"text-center text-secondary"}>{user !== undefined && user.ResumeEmail}</p>*/}
                            </div>
                            <ul className={"nav flex-column navItems " + Style.navItems}>
                                {
                                    pages.user.map((item)=>(
                                        <li className={isNavActive(item.pathname)? "nav-item w-100 py-2 px-3 "+ Style.active : "nav-item w-100 py-2 px-3 "}
                                            onClick={(event)=>{checkIsActive(event, item.pathname)}}
                                        ><Link
                                            className={"text-center d-flex  text-secondary change-text"}
                                            to={{
                                                pathname: item.pathname,
                                                search: "lang=" +language,
                                            }}
                                        ><i className={item.iconClass}></i>
                                            <span className={'mx-2'}>{language==='fa' ? item.label : item.labelEng}</span></Link></li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={"col-xl-9 col-12 py-4 px-0"}>
                        <Route path={getRoutesItems().DashboardParent.route} exact component={ProfileInfo}/>
                        <Route path={getRoutesItems().HeroList.route} exact component={HeroList}/>
                        <Route path={getRoutesItems().DegreeList.route} exact component={DegreeList}/>
                        <Route path={getRoutesItems().FooterSettings.route} exact component={Footer}/>
                        <Route path={getRoutesItems().UpdateFooterSettings.route} exact component={UpdateFooter}/>
                        <Route path={getRoutesItems().PublicLinks.route} exact component={PublicLinks}/>
                        <Route path={getRoutesItems().UpdatePublicLinks.route} exact component={EditPublicLink}/>
                    </div>
                </div>
            </div>


            <div className={'position-fixed d-xl-none'} style={{bottom: '20px', left: '20px',zIndex:"1"}}>
                <img className={Style["filterButton"]} onClick={() => {
                    setIsModalOpen(true)
                }} width={'60px'} height={'60px'}
                     src={filterImage}/>
            </div>
            <NotificationContainer/>

        </div>
    )
}

export function ProfileInfo() {
    return (<h4>Profile Info</h4>)
}