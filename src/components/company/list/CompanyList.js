import * as React from 'react';
import {useEffect, useState} from 'react';
import {generateURL} from "../../global/Requests";
import {Link} from "react-router-dom";
import $ from "jquery"
import InfiniteScroll from "react-infinite-scroll-component";

import Style from "./companyList.module.css"

import GridIcon from "../../employmentAdvertisement/imgs/Group 106.png";
import ListIcon from "../../employmentAdvertisement/imgs/Group 107.png";
import Background from './../imgs/background.jpg';
import FullStar from './../imgs/full-star.png';
import EmptyStar from './../imgs/empty-star.png';
import HalfStar from './../imgs/half-star.png';
import Logo from './../imgs/sampleLogo.png';

import Delete from "../../employmentAdvertisement/imgs/delete.png";
import * as queryString from "query-string";
import {getRoutesItems} from "../../RoutesList/RoutesList"
import Modal from "react-modal";
import filterImage from "../../employmentAdvertisement/imgs/filter.png"
import {NotificationContainer, NotificationManager} from 'react-notifications';


/************ Float button ************/
import {useTranslation} from "react-i18next";
import {serverTimeToDaysAgo} from "../../global/TimeConverter";
import guide from "../../Resume/step3/imgs/guide.png";
import {parse} from "query-string";


var axios = require('axios');
axios.defaults.withCredentials = false;


export default function CompaniesList() {
    const [isGrid, setIsGrid] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [language, setLanguage] = useState('');
    const [companies, setCompanies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [categoryId, setCategoryId] = useState();
    const [t, i18n] = useTranslation('main');

    /**************** Modal ***********/
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const customStyles = {

        content: {
            top: '100px',
            left: '0',
            width: '100%',
            maxWidth: '90%',
            right: '0',
            bottom: '0',
            margin: '0 auto',
            // marginRight: '-50%',
            zIndex: '1',
            borderRadius: '15px',
            // padding: '20px',
            // marginTop:'30px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#6969dd #e0e0e0',
            minHeight: '35vh',
            // transform: 'translate(-50%, -50%)',

        },

        webkitScrollbar: {width: "1em"},
        webkitScrollbarTrack: {boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)"},
        webkitScrollbarThumb: {backgroundColor: "darkgrey", outline: "1px solid slategrey"}

    };

    function openModal() {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';

    }

    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'visible';
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

    const onGridClick = () => {
        setIsGrid(true);
    }

    const onListClick = () => {
        setIsGrid(false);
    }

    const calculateScoreStars = (score) => {
        let stars = [];

        let fullStars = parseInt(score);
        let hasHalfStar = score > fullStars;
        let emptyStars = parseInt(5 - score);

        for(let i=0;  i<fullStars; i++)
            stars.push(FullStar);

        if (hasHalfStar)
            stars.push(HalfStar);

        for(let i=0;  i<emptyStars; i++)
            stars.push(EmptyStar);

        return stars;
    }

    useEffect(function (){
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);
        let catId = url.category;
        let catName = url.catName;
        let catEngName = url.catEngName;
        if (catId !== undefined)
            setCategory({
                id:catId,
                name: catName,
                englishName:catEngName
            });
        else setCategory();


        /* get Companies*/
        let data = {
            "roleId": 5,
            "page": 1,
            "pageSize": pageSize,
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
            "companyCategoryIds": catId!==undefined ? [parseInt(catId)] : [],
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
            url: generateURL("/Company/GetCompanyListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(list_config).then((response) => {
            setCompanies(response.data.data)
            console.log(response.data.data)
        })
            .catch((error)=> {
                console.log(error)
            });

        /* get Categories */
        let category_config = {
            method: 'get',
            url: generateURL("/Side/GetCompanyCategoryList"),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(category_config).then((response) => {
            setCategories(response.data.data)
            console.log(response.data.data)
        })
            .catch((error)=> {
                console.log(error)
            });

    }, [categoryId]);

    return (
        <main className={Style.main + " text-center"}>
            <div className="container-fluid pb-5 pt-5">
                <h3>شرکت‌ها</h3>

                {/** Mobile Category */}
                <div className={'row d-xl-none'}>
                    <div className={'col-12'}>
                        <Modal
                            isOpen={modalIsOpen}
                            // onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <button className={'btn btn-default float-right'} onClick={closeModal}>X</button>
                            <div className={' pt-4'}>
                                <div className={Style.categories + " w-100 mt-4 "}>
                                    <div className={Style["fields-header"]}>
                                        <h6 className={'change-text my-0 ' + Style.categoriesTitle}>دسته‌بندی ها</h6>

                                    </div>

                                    <ul className="nav flex-column p-4">
                                        {
                                            categories.length > 0 &&
                                            categories.map((item)=> (
                                                <li className="nav-item">
                                                    <Link to={{
                                                        pathname: getRoutesItems().companyList.route,
                                                        search:"category=" + item.id +
                                                            "&&catName=" + item.name + "&&catEngName=" + item.englishName
                                                            + "&&lang="+ language
                                                    }}
                                                          onClick={()=>{setCategoryId(item.id)}}
                                                          className="nav-link change-text" href="#">
                                                        {language==='fa'? item.name : item.englishName}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>

                <div className={Style["sort-box"] + " row mb-3 d-flex"}>
                    <div className={Style["sort-imgs"] + " d-none d-xl-inline change-text-reverse "}>
                        <img src={GridIcon} alt="" onClick={onGridClick}/><img src={ListIcon} alt=""
                                                                               onClick={onListClick}/>
                    </div>
                    <div className={'flex-grow-1 d-flex change-dir'}>
                        {
                            category!== undefined &&
                            <div
                                className={Style["branch-tags"] + " px-3 py-1 mx-1 change-dir change-text"}>
                                <Link className={" px-1 " + Style["pointer"]}
                                      to={{
                                          pathname: getRoutesItems().companyList.route,
                                          search:"lang="+ language
                                      }}
                                onClick={()=>{setCategoryId()}}><img src={Delete} width={10}/></Link>
                                <span className={'px-3'}>{language==='fa' ? category.name : category.englishName}</span>
                            </div>
                        }

                    </div>



                </div>
                <div className="row change-dir">

                    {/** Desktop Category */}
                    <div className={"d-none d-lg-none d-xl-block col-xl-3"}>
                        <div className={Style.categories + " w-100 mt-4 "}>
                            <div className={Style["fields-header"]}>
                                <h6 className={'change-text my-0 ' + Style.categoriesTitle}>دسته‌بندی ها</h6>

                            </div>

                            <ul className="nav flex-column p-4">
                                {
                                    categories.length > 0 &&
                                        categories.map((item)=> (
                                            <li className="nav-item">
                                                <Link to={{
                                                    pathname: getRoutesItems().companyList.route,
                                                    search:"category=" + item.id +
                                                        "&&catName=" + item.name + "&&catEngName=" + item.englishName
                                                        + "&&lang="+ language
                                                }}
                                                      onClick={()=>{setCategoryId(item.id)}}
                                                    className="nav-link change-text" href="#">
                                                    {language==='fa'? item.name : item.englishName}
                                                </Link>
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>

                    </div>
                    <div className="col-xl-9">
                        {isGrid ?
                            <div className={'row w-100'}>
                                {
                                    companies.length > 0 && companies.map((item)=>(
                                        <div className={'col-12 col-xl-6 mt-4'}>
                                            <div className={Style.gridItemEven}>
                                                <div className={'position-relative'}>
                                                    <img src={Background} className={Style.gridBackground}/>
                                                    <img src={item.logo!== "" ? item.logo : Logo} className={"rounded img-thumbnail " + Style.gridLogo}/>
                                                    <div className={'d-flex rounded px-2 py-2 change-dir '+ Style.gridRate}>
                                                        <span className={'mx-1'}>{item.totalScore}</span>
                                                        <span className={'mx-1'}><img src={FullStar}/></span>
                                                    </div>
                                                </div>
                                                <div className={'mt-5 px-4 pb-4 pt-2'}>
                                                    <Link><h5 className={'change-text ' + Style.gritTitle}>{language==='fa' ? item.name : item.englishName}</h5></Link>
                                                    <div className={'d-flex row '}>
                                                        <div className={Style.dateSpan + " mx-1 mt-3"}>
                                                            {language==='fa' ? item.province.name + " / " + item.city.name : item.province.englishName + " / " + item.city.englishName}
                                                        </div>
                                                        <div className={Style.dateSpan + " mx-1 mt-3"}>{language==='fa' ? item.companyCategory.name : item.companyCategory.englishName}</div>
                                                        {item.isRecruiting && <div className={Style.locationSpan + " mx-1 mt-3"}>درحال استخدام</div>}

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                            :
                            <div className={'row w-100'}>
                                {
                                    companies.length > 0 && companies.map((item) => (
                                        <div className={'col-12 mt-4'}>
                                            <div className={Style.gridItemEven + " d-flex justify-content-between p-4"}>
                                                <div className={'d-flex flex-grow-1'}>
                                                    <img src={item.logo!== "" ? item.logo : Logo} className={"rounded img-thumbnail " + Style.listLogo}/>
                                                    <div className={'px-3 flex-grow-1'}>
                                                        <Link><h5 className={'change-text ' + Style.gritTitle}>{language==='fa' ? item.name : item.englishName}</h5></Link>
                                                        <div className={'d-flex pt-2'}>
                                                            <div className={Style.dateSpan + " mx-1 "}>
                                                                {language==='fa' ? item.province.name + " / " + item.city.name : item.province.englishName + " / " + item.city.englishName}
                                                            </div>
                                                            <div className={Style.dateSpan + " mx-1 "}>{language==='fa' ? item.companyCategory.name : item.companyCategory.englishName}</div>
                                                            {item.isRecruiting && <div className={Style.locationSpan + " mx-1"}>درحال استخدام</div>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className={Style.scoreText + " mt-4"}>{item.totalScore}</div>

                                                        <div className={'d-flex dir-ltr ' + Style.listStars}>
                                                            {
                                                                calculateScoreStars(item.totalScore).map((item)=> (
                                                                    <img src={item}/>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))

                                }

                            </div>
                        }

                    </div>
                </div>

            </div>
            <div className={'position-fixed d-xl-none'} style={{bottom: '20px', left: '20px', zIndex: "1"}}>
                <img className={Style["filterButton"]} onClick={openModal} width={'60px'} height={'60px'}
                     src={filterImage}/>
            </div>

            <NotificationContainer/>
        </main>
    )
}