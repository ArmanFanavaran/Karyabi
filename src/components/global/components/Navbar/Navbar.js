import Logo from "./imgs/logo.png";
import Style from "./Navbar.module.css";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {changeToEnglish, changeToPersian} from "../../language-configuration";
import Cookies from 'js-cookie';
import {useEffect, useState} from "react";
import $ from "jquery";
import ProfileImg from "./imgs/profile.png";
import {Logout} from "../../../authentication/Helper/Logout";
import {useHistory} from "react-router";
import {isAccessTokenExpired} from "../../../authentication/Helper/Auth";
import {generateAdminURL} from "../../Requests"
import {getCookiesItems} from "../../../CookiesList/CookiesList";
import {getRoutesItems} from "../../../RoutesList/RoutesList"
import * as React from "react";
import * as queryString from "query-string";

export default function Navbar() {
    const history = useHistory();
    const [t, i18n] = useTranslation('main');
    const [accessExpire, setAccessExpire] = useState();
    const [userName, setUserName] = useState("");
    const [admin, setAdmin] = useState("");
    const [adminOne, setAdminOne] = useState("");
    const [isCompany, setIsCompany] = useState("");
    const pathname = window.location.pathname;
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    const onPersianClick = () => {
        changeToPersian(i18n);
        // const value = window.location.pathname;
        // history.push(value)
        // window.location.reload(false);

    }
    const onEnglishClick = () => {
        changeToEnglish(i18n);
        // window.location.reload(false);


    }
    useEffect(() => {
        var axios = require('axios');
        if (Cookies.get(getCookiesItems().is_admin.nickName) !== null && Cookies.get(getCookiesItems().is_admin.nickName) !== undefined) {
            setAdmin(JSON.parse(Cookies.get(getCookiesItems().is_admin.nickName)))
        }
        if(Cookies.get(getCookiesItems().is_admin_one.nickName) !== null && Cookies.get(getCookiesItems().is_admin_one.nickName) !== undefined){
            setAdminOne(JSON.parse(Cookies.get(getCookiesItems().is_admin_one.nickName)))
        }
        if(Cookies.get(getCookiesItems().isCompany.nickName) !== null && Cookies.get(getCookiesItems().isCompany.nickName) !== undefined){
            setIsCompany(JSON.parse(Cookies.get(getCookiesItems().isCompany.nickName)))
        }
        setUserName(Cookies.get(getCookiesItems().firstName.nickName))
        setAccessExpire(!isAccessTokenExpired())
    }, [])
    ///// logout ////
    function Exit() {
        Logout();
    }

    //// Close Navbar Automatically ///
    $(document).ready(function () {
        $(document).click(function (event) {
            var clickover = $(event.target);
            var _opened = $(".navbar-collapse").hasClass("show");
            if (_opened === true && !clickover.hasClass("navbar-toggler")) {
                $(".navbar-toggler").click();
            }
        });
    });

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        //>=, not <=
        if (scroll >= 20) {
            //clearHeader, not clearheader - caps H
            $("#headerNav").addClass(Style.headerSection +" pb-0");
        } else {
            $("#headerNav").removeClass(Style.headerSection+"  pb-0");
        }
    }); //missing );
    return (
        <header className={ " position-fixed w-100 change-dir " + Style.zIndex} id={'headerNav'}>
            <nav className={"navbar navbar-expand-lg header-nav " + Style.headerSection}>
                {sp.get("lang") === "en" ?
                    <a onClick={onPersianClick} href="javascript:void(0);" className={ " px-3 d-none d-lg-block"}>
                        en<span className={'text-danger'}>/فا</span>
                    </a> :
                    <a onClick={onEnglishClick} href="javascript:void(0);" className={" px-3 d-none d-lg-block"}>
                        فا<span className={'text-danger'}>/en</span></a>
                }

                <div className="container">
                    <a href="" className={Style.navbarBrand}><img src={Logo}
                                                             alt=""/></a>
                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                            data-target="#toggle-menu" aria-controls="toggle-menu" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="fa fa-bars" style={{color: "#653394"}}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="toggle-menu">
                        <ul className="navbar-nav change-mx  mx-2 ">
                            <li className={Style.itemNav + " navbar-item my-lg-0 my-2 mx-auto mx-lg-2"}>
                                <Link className="navbar-link" to={{
                                    pathname: getRoutesItems().mainPage.route,
                                    search: "lang=" + sp.get("lang"),
                                }}>
                                    {t("global.navbar.home")}
                                </Link>
                            </li>
                           <li className={Style.itemNav + " navbar-item my-lg-0 my-2 mx-auto mx-lg-2"}>
                                <Link className="navbar-link" to={{
                                    pathname: getRoutesItems().employmentAdvertisementList.route,
                                    search: "lang=" + sp.get("lang"),
                                }}>
                                    {t("global.navbar.employmentAdvertisement")}
                                </Link>
                            </li>
                           <li className={Style.itemNav + " navbar-item my-lg-0 my-2 mx-auto mx-lg-2"}>
                                <Link className="navbar-link" to={{
                                    pathname: getRoutesItems().contentProductionList.route,
                                    search: "lang=" + sp.get("lang"),
                                }}>
                                    {t("global.navbar.contentProduction")}
                                </Link>
                            </li>
                           <li className={Style.itemNav + " navbar-item my-lg-0 my-2 mx-auto mx-lg-2"}>
                                <Link className="navbar-link" to={{
                                    pathname: getRoutesItems().companyList.route,
                                    search: "lang=" + sp.get("lang"),
                                }}>
                                    {t("global.navbar.companyList")}
                                </Link>
                            </li>
                            {sp.get("lang") === "en" ?
                                <a onClick={onPersianClick} href="javascript:void(0);" className={Style.itemNav + " navbar-item my-lg-0 my-2 mx-auto mx-lg-2 d-block d-lg-none"}>
                                    en<span className={'text-danger'}>/فا</span>
                                </a> :
                                <a onClick={onEnglishClick} href="javascript:void(0);" className={Style.itemNav + " navbar-item my-lg-0 my-2 mx-auto mx-lg-2 d-block d-lg-none"}>
                                    فا<span className={'text-danger'}>/en</span></a>
                            }
                        </ul>

                        <ul className="navbar-nav ">
                            {
                                accessExpire === true ?

                                    <div className={ Style.dropdown+" my-0 mx-auto"}>
                                        <a className={ "  nav-link dropdown-toggle"}
                                           id="navbarDropdownProfile" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className={'mx-2'}
                                                  htmlFor="">{Cookies.get(getCookiesItems().firstName.nickName) + " " + Cookies.get(getCookiesItems().lastName.nickName)}</span>
                                            <img className={'rounded-circle'} height={'25'} width={'25'}
                                                 src={localStorage.getItem(getCookiesItems().userPic.nickName) === "null" || localStorage.getItem(getCookiesItems().userPic.nickName) === "" ? ProfileImg : localStorage.getItem(getCookiesItems().userPic.nickName)}
                                                 alt=""/>
                                            {/*{localStorage.getItem(getCookiesItems().userPic.nickName)}*/}
                                        </a>
                                        <div className={Style.dropdownContent + "  text-center"} aria-labelledby="navbarDropdownProfile">
                                            <Link to={{
                                                pathname: getRoutesItems().DashboardParent.route,
                                                search: "lang=" + sp.get("lang"),
                                            }}
                                                  className={" dropdown-item text-dark"}>{t("global.navbar.profileSingle")}
                                            </Link>
                                            {admin || adminOne ?
                                                <Link to={{
                                                    pathname: getRoutesItems().DashboardParentAdmin.route,
                                                    search: "lang=" + sp.get("lang"),
                                                }}
                                                      className={" dropdown-item text-dark"}>{t("global.navbar.adminPanel")}
                                                </Link>:null
                                            }
                                            {admin || adminOne ?
                                                <Link to={{
                                                    pathname: getRoutesItems().dashboardParentCompany.route,
                                                    search: "lang=" + sp.get("lang"),
                                                }}
                                                      className={" dropdown-item text-dark"}>{t("global.navbar.companyPanel")}
                                                </Link>:null
                                            }
                                            <Link to={{
                                                pathname: getRoutesItems().changePassword.route,
                                                search: "lang=" + sp.get("lang"),
                                            }}
                                                  className={" dropdown-item text-dark"}>{t("global.navbar.changePassword")}
                                            </Link>
                                            <Link to={{
                                                pathname: getRoutesItems().resumeStep1.route,
                                                search: "lang=" + sp.get("lang"),
                                            }}
                                                  className={" dropdown-item text-dark"}>{t("global.navbar.createResume")}
                                            </Link>
                                            <Link to={{
                                                pathname: getRoutesItems().resume.route,
                                                search: "lang=" + sp.get("lang"),
                                            }}
                                                  className={" dropdown-item text-dark"}>{t("global.navbar.showResume")}
                                            </Link>
                                            {/*{ admin || adminOne ?*/}
                                            {/*    <a href={generateAdminURL()}*/}
                                            {/*       className={" dropdown-item text-dark"}>{t("global.navbar.adminPanel")}*/}
                                            {/*    </a>:null*/}
                                            {/*}*/}
                                            <a onClick={Exit} href="javascript:void(0);" className={" dropdown-item text-dark"}>
                                                {t("global.navbar.logOut")}
                                            </a>

                                        </div>
                                        {/*<a className={Style.shoppingBtn + " px-2"}><img width={'30'} height={'30'} src={shopIcon}*/}
                                        {/*                                                alt=""/>*/}
                                        {/*</a>*/}
                                    </div> :
                                    <div className={ "text-center my-0"}>
                                        <Link to={{
                                            pathname: getRoutesItems().loginStep1.route,
                                            search: "lang=" + sp.get("lang"),
                                        }}>
                                            <li className={Style.loginBtn + " nav-item btn my-2 my-lg-0 mx-lg-2 mx-auto px-4"}>{t("global.navbar.login")}</li>
                                        </Link>

                                    </div>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}