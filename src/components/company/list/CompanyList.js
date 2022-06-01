import * as React from 'react';
import {useEffect, useState} from 'react';
import {generateURL} from "../../global/Requests";
import {Link} from "react-router-dom";
import $ from "jquery"

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
import InfiniteScroll from "react-infinite-scroll-component";
import guide from "../../Resume/step1/imgs/guide.png";


var axios = require('axios');
axios.defaults.withCredentials = false;


export default function CompaniesList() {
    const [isGrid, setIsGrid] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [companies, setCompanies] = useState([]);
    const [t, i18n] = useTranslation('main');
    const [hasMore, setHasMore] = useState(true);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    /**************** Keyword ***********/
    const [keyword, setKeyword] = React.useState("");

    /**************** Category ***********/
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [searchedCategory, setSearchedCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
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
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    const language = sp.get("lang")

    function openModal() {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';

    }

    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'visible';
    }

    const collapsibleContentStyle = {
        // display: "block",
        // overflow: "scroll",
        height: "180px"
    }

    /************** Category *************/
    /* change Height when search in Category */
    const onClickMoreCategory = () => {
        if ($('.collapsible-content-category').css("height") === "180px") {
            $('.collapsible-content-category').css("height", "250px")
            if (language === "fa") {
                $('#more-category').html("بسته")
                $('#more-category').addClass("text-danger").removeClass("text-success")

            } else {
                $('#more-category').html("close")
                $('#more-category').addClass("text-danger").removeClass("text-success")

            }

        } else {
            $('.collapsible-content-category').css("height", "180px")
            if (language === "fa") {
                $('#more-category').html("بیشتر")
                $('#more-category').removeClass("text-danger").addClass("text-success")

            } else {
                $('#more-category').html("open")
                $('#more-category').removeClass("text-danger").addClass("text-success")

            }

        }
    }
    /* search in Category */
    const onSearchCategory = (event) => {
        let value = $(event.target).val().trim();

        if (value === "") {
            setSearchedCategory(categoryFilters);
        } else {
            let searched = [];
            $(categoryFilters).each((indexes, item) => {
                if (language === "fa" && item.name.includes(value)) {
                    searched.push(item);
                    $(selectedCategory).each((index, num) => {
                        if (index.id === indexes.id)
                            $("#category_" + index.id).prop('checked', true); // Unchecks it
                    })
                } //end if
                else if (language === "en" && item.englishName.includes(value)) {
                    searched.push(item);
                }
            });
            setSearchedCategory(searched);
        } //end else
    }
    /* checked in Category */
    const onCategoryEdit = (event) => {
        let id = parseInt($(event.target).val());
        let checked = $(event.target).prop("checked");

        let selected_category = [...selectedCategory];

        let selected_ids = [];
        for (let i = 0; i < selectedCategory.length; i++) {
            selected_ids.push(selectedCategory[i].id);
        }
        /* changing selected array */
        if (checked) {
            let label = $(event.target).attr("data-text");
            let item = {
                id: id,
                label: label
            }
            selected_category.push(item);
            selected_ids.push(id);
        } else {
            for (let i = 0; i < selected_category.length; i++) {
                if (selected_category[i].id === id) {
                    selected_category.splice(i, 1);
                    break;
                } //end if
            }//end for
            for (let i = 0; i < selected_ids.length; i++) {
                if (selected_ids[i].id === id) {
                    selected_ids.splice(i, 1);
                    break;
                } //end if
            }//end for
        }//end else

        setSelectedCategory(selected_category);

    }
    /* Remove Tag in Category */
    const onRemoveCategoryTag = (id) => {
        let selected_category = [...selectedCategory];

        let selected_ids = [];
        for (let i = 0; i < selected_category.length; i++) {
            selected_ids.push(selected_category[i].id);
        }

        for (let i = 0; i < selected_category.length; i++) {
            if (selected_category[i].id === id) {
                selected_category.splice(i, 1);
                break;
            } //end if
        }//end for
        for (let i = 0; i < selected_ids.length; i++) {
            if (selected_ids[i] === id) {
                selected_ids.splice(i, 1);
                break;
            } //end if
        }//end for

        $("#category_" + id).prop('checked', false); // Unchecks it
        setSelectedCategory(selected_category);
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

        for (let i = 0; i < fullStars; i++)
            stars.push(FullStar);

        if (hasHalfStar)
            stars.push(HalfStar);

        for (let i = 0; i < emptyStars; i++)
            stars.push(EmptyStar);

        return stars;
    }

    /************** Get Data *************/
    const getCompanyList = () => {
        let lastPage = Math.ceil(count / pageSize); // the last page
        let next_page = page + 1;

        let categoryListSelect = [];

        selectedCategory.map((item, index) => (
            categoryListSelect.push(item.id)
        ))
        /* get Companies*/
        let list_data = {
            "roleId": 5,
            "page": next_page,
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
            "keyWord": keyword,
            "provinceIds": [],
            "cityIds": [],
            "companyCategoryIds": categoryListSelect,
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
        var list_config = {
            method: 'post',
            url: generateURL("/Company/GetCompanyListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };
        if (next_page <= lastPage) {

            axios(list_config)
                .then(function (response) {

                    let data = response.data.data;
                    let companyData = [...companies]
                    for (let i = 0; i < data.length; i++) {
                        companyData.push(data[i])

                    }//end for
                    setCompanies(companyData)
                    // setNewsList(newsData)
                    // let latest = [];
                    // for (let i = 0; i < data.length && i < 3; i++) {
                    //     latest.push(data[i]);
                    // }
                    // setLastNews(latest);

                    setPage(next_page);
                })
                .catch(function (error) {
                });
        } else {
            setHasMore(false)
        }


    }

    useEffect(function () {
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
            url: generateURL("/Company/GetCompanyListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(list_config).then((response) => {
            setCompanies(response.data.data)
            setPage(1);
            console.log(response.data.data)
        })
            .catch((error) => {
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
            setCategoryFilters(response.data.data);
            setSearchedCategory(response.data.data);
        })
            .catch((error) => {
                console.log(error)
            });
        var count_config = {
            method: 'post',
            url: generateURL("/Company/GetCompanyListClientSideCount"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
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
                    NotificationManager.error(error.response.data.message);
                } else {
                    NotificationManager.error(error.response.data.Message);

                }
            });
    }, [])

    useEffect(function () {
        let categoryListSelect = [];

        selectedCategory.map((item, index) => (
            categoryListSelect.push(item.id)
        ))

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
            "keyWord": keyword,
            "provinceIds": [],
            "cityIds": [],
            "companyCategoryIds": categoryListSelect,
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
            setPage(1);
            console.log(response.data.data)
        })
            .catch((error) => {
                console.log(error)
            });


        var count_config = {
            method: 'post',
            url: generateURL("/Company/GetCompanyListClientSideCount"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
                $([document.documentElement, document.body]).animate({
                    scrollTop: 0
                }, 500);
                let lastPage = Math.ceil(response.data.data / pageSize); // the last page
                if (1 < lastPage) {
                    setHasMore(true)
                } else {
                    setHasMore(false)
                }

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
                    NotificationManager.error(error.response.data.message);
                } else {
                    NotificationManager.error(error.response.data.Message);

                }
            });

    }, [selectedCategory, keyword]);

    return (
        <main className={Style.main + " text-center"}>
            <div className="container-fluid pb-5 pt-5">
                <h3>{t("company.title.company")}</h3>

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
                            <div className={' '}>
                                <div className="row mx-auto w-100 change-text change-dir">
                                    <div className={'col-12 change-text change-dir'}>
                                        {
                                            selectedCategory.length > 0 ?
                                                <span>{t("employmentAdvertisement.list.category")}:</span>:null
                                        }
                                        {
                                            selectedCategory.length > 0 ?
                                                selectedCategory.map((item, index) => (
                                                    <div
                                                        className={Style["branch-tags"] + " px-2 py-1 mx-1 change-dir change-text"}>
                                                            <span className={"mx-1 " + Style["pointer"]}
                                                                  onClick={() => {
                                                                      onRemoveCategoryTag(item.id)
                                                                  }}><img src={Delete} width={10}/></span>
                                                        {item.label}
                                                    </div>
                                                )) : null
                                        }
                                    </div>

                                    <div className={"col-12 change-dir " + Style.input} id={'form'}>
                                        <div className={Style["fields-div"] + " my-3"}>
                                            <div className={Style["fields-header"]}>
                                                <span>{t("contentProduction.list.search")}</span>
                                            </div>
                                            <div className={Style["search-in-results-div"]}>
                                                <input type="text" onChange={function (e) {
                                                    setKeyword(e.target.value)
                                                }} className={Style["search-in-results"]}
                                                       placeholder={t("contentProduction.list.search")}/>
                                            </div>
                                        </div>
                                        <div className={Style["fields-div"] + " my-3"}>
                                            <div className={Style["fields-header"]}>
                                                <span>{t("employmentAdvertisement.list.category")}</span>
                                                <input type="text" name="" id=""
                                                       placeholder={t("contentProduction.list.search")}
                                                       onChange={onSearchCategory}/>
                                            </div>
                                            <div className={'row '}>
                                                <div className={'col-12'}>
                                                    {
                                                        selectedCategory.length > 0 ?
                                                            selectedCategory.map((item, index) => (
                                                                <div
                                                                    className={Style["branch-tags"] + " px-2 py-1 mx-1 change-dir change-text"}>
                                                            <span className={"mx-1 " + Style["pointer"]}
                                                                  onClick={() => {
                                                                      onRemoveCategoryTag(item.id)
                                                                  }}><img src={Delete} width={10}/></span>
                                                                    {item.label}
                                                                </div>
                                                            )) : null
                                                    }
                                                </div>

                                            </div>
                                            <div className={Style["filters-list"] + " collapsible-content-category"}
                                                 style={collapsibleContentStyle}>
                                                {
                                                    searchedCategory.length > 0 ?
                                                        searchedCategory.map((item, i) => (
                                                            <div
                                                                className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                                <input className="form-check-input branches_select"
                                                                       data-text={language === "fa" ?
                                                                           item.name
                                                                           : item.englishName
                                                                       } onChange={onCategoryEdit}
                                                                       checked={selectedCategory.some(e => e.id === item.id)}
                                                                       type="checkbox" value={item.id}
                                                                       id={"category_" + item.id}/>
                                                                <label className="form-check-label px-4"
                                                                       htmlFor={"category_" + item.id}>
                                                                    {language === "fa" ?
                                                                        item.name
                                                                        : item.englishName
                                                                    }
                                                                </label>
                                                            </div>
                                                        )) : null
                                                }

                                            </div>
                                            {/*<div className={Style["fields-footer"]}>*/}
                                            {/*    <button className={Style["change-height"] + " btn text-success"}*/}
                                            {/*            id={'more-category'} onClick={onClickMoreCategory}>بیشتر <img*/}
                                            {/*        src="assets/imgs/Group (1).png" alt=""/>*/}
                                            {/*    </button>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>

                <div className={Style["sort-box"] + " row mb-3 d-none d-xl-flex"}>
                    <div className={Style["sort-imgs"] + " d-none d-xl-inline change-text-reverse "}>
                        <img src={GridIcon} alt="" onClick={onGridClick}/><img src={ListIcon} alt=""
                                                                               onClick={onListClick}/>
                    </div>
                    <div className={'d-none d-xl-block col-12 change-text change-dir'}>
                        {
                            selectedCategory.length > 0 ?
                                <span>{t("employmentAdvertisement.list.category")}:</span> : null
                        }
                        {
                            selectedCategory.length > 0 ?
                                selectedCategory.map((item, index) => (
                                    <div
                                        className={Style["branch-tags"] + " px-2 py-1 mx-1 change-dir change-text"}>
                                                            <span className={"mx-1 " + Style["pointer"]}
                                                                  onClick={() => {
                                                                      onRemoveCategoryTag(item.id)
                                                                  }}><img src={Delete} width={10}/></span>
                                        {item.label}
                                    </div>
                                )) : null
                        }
                    </div>


                </div>
                <div className="row change-dir w-100 mx-0">

                    {/** Desktop Category */}
                    <div className={"d-none d-lg-none d-xl-block col-xl-3 px-0 mt-2"}>
                        <div className={"px-0 "} id={"fixed-class"}>
                            <div className={Style["sticky-content"] + " change-dir-reverse w-100 px-3"} id={'filter'}>
                                <div className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text"}>
                                    <div className={Style["fields-header"]}>
                                        <span>{t("contentProduction.list.search")}</span>
                                    </div>
                                    <div className={Style["search-in-results-div"]}>
                                        <input type="text" onChange={function (e) {
                                            setKeyword(e.target.value)
                                        }} className={Style["search-in-results"]}
                                               placeholder={t("contentProduction.list.search")}/>
                                    </div>
                                </div>
                                <div className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text"}>
                                    <div className={Style["fields-header"]}>
                                        <span>{t("contentProduction.list.category")}</span>
                                        <input type="text" name="" id=""
                                               placeholder={t("contentProduction.list.search")}
                                               onChange={onSearchCategory}/>
                                    </div>
                                    <div className={'row '}>
                                        <div className={'col-12'}>
                                            {
                                                selectedCategory.length > 0 ?
                                                    selectedCategory.map((item, index) => (
                                                        <div
                                                            className={Style["branch-tags"] + " px-2 py-1 mx-1 change-dir change-text"}>
                                                            <span className={"mx-1 " + Style["pointer"]}
                                                                  onClick={() => {
                                                                      onRemoveCategoryTag(item.id)
                                                                  }}><img src={Delete} width={10}/></span>
                                                            {item.label}
                                                        </div>
                                                    )) : null
                                            }
                                        </div>

                                    </div>
                                    <div className={Style["filters-list"] + " collapsible-content-category"}
                                         style={collapsibleContentStyle}>
                                        {
                                            searchedCategory.length > 0 ?
                                                searchedCategory.map((item, i) => (
                                                    <div
                                                        className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                        <input className="form-check-input branches_select"
                                                               data-text={language === "fa" ?
                                                                   item.name
                                                                   : item.englishName
                                                               } onChange={onCategoryEdit}
                                                               checked={selectedCategory.some(e => e.id === item.id)}
                                                               type="checkbox" value={item.id}
                                                               id={"category_" + item.id}/>
                                                        <label className="form-check-label px-4"
                                                               htmlFor={"category_" + item.id}>
                                                            {language === "fa" ?
                                                                item.name
                                                                : item.englishName
                                                            }
                                                        </label>
                                                    </div>
                                                )) : null
                                        }

                                    </div>

                                </div>

                            </div>
                        </div>


                    </div>
                    <div className="col-12 col-xl-9 px-0">
                        {isGrid ?
                            <InfiniteScroll
                                dataLength={companies.length}
                                scrollThreshold={0.4}
                                next={getCompanyList}
                                hasMore={hasMore}
                                style={{overflow: 'hidden'}}
                                loader={<h4>Loading...</h4>}
                            >
                                <div className={'row w-100 px-xl-3 px-1 mx-0'}>
                                    {
                                        companies.length > 0 && companies.map((item) => (
                                            <div className={'col-12 col-xl-6 my-4'}>
                                                <div  className={Style.gridItemEven}>
                                                    <div className={'position-relative'}>
                                                        <img src={Background} className={Style.gridBackground}/>
                                                        <img src={item.logo !== "" ? item.logo : Logo}
                                                             className={"rounded img-thumbnail " + Style.gridLogo}/>
                                                        <div
                                                            className={'d-flex rounded px-2 py-2 change-dir ' + Style.gridRate}>
                                                            <span className={'mx-1'}>{item.totalScore}</span>
                                                            <span className={'mx-1'}><img src={FullStar}/></span>
                                                        </div>
                                                    </div>
                                                    <div className={'mt-5 px-4 pb-4 pt-2'}>
                                                        <Link to={item.name !== null && language === "fa" ? {
                                                                pathname: getRoutesItems().companySingle.route,
                                                                search: "lang=" + language + "&" + "id=" + item.id + "&" + "title=" + item.name.replace(/\s+/g, '-').toLowerCase()
                                                            } :
                                                            language === "fa" ? {
                                                                pathname: getRoutesItems().companySingle.route,
                                                                search: "lang=" + language + "&" + "id=" + item.id + "&" + "title=" + item.name
                                                            } : item.englishName !== null && language === "en" ? {
                                                                pathname: getRoutesItems().companySingle.route,
                                                                search: "lang=" + language + "&" + "id=" + item.id + "&" + "title=" + item.englishName.replace(/\s+/g, '-').toLowerCase()

                                                            } : language === "en" ? {
                                                                pathname: getRoutesItems().companySingle.route,
                                                                search: "lang=" + language + "&" + "id=" + item.id + "&" + "title=" + item.englishName
                                                            } : null
                                                        }>
                                                            <h5 className={'change-text ' + Style.gritTitle}>{language === 'fa' ? item.name : item.englishName}</h5>
                                                        </Link>

                                                        <div className={'d-flex row '}>
                                                            <div className={Style.dateSpan + " mx-1 mt-3"}>
                                                                {language === 'fa' ? item.province.name + " / " + item.city.name : item.province.englishName + " / " + item.city.englishName}
                                                            </div>
                                                            <div
                                                                className={Style.dateSpan + " mx-1 mt-3"}>{language === 'fa' ? item.companyCategory.name : item.companyCategory.englishName}</div>
                                                            {item.isRecruiting && <div
                                                                className={Style.locationSpan + " mx-1 mt-3"}>{t("company.list.hiring")}</div>}

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </InfiniteScroll>
                            :
                            <InfiniteScroll
                                dataLength={companies.length}
                                scrollThreshold={0.4}
                                next={getCompanyList}
                                hasMore={hasMore}
                                style={{overflow: 'hidden'}}
                                loader={<h4>Loading...</h4>}
                            >
                                <div className={'row mx-0 px-2 px-xl-3'}>
                                    {
                                        companies.length > 0 && companies.map((item) => (
                                            <div className={'col-12 mt-4'}>
                                                <div
                                                      className={Style.gridItemEven + " d-flex justify-content-between p-4"}>
                                                    <div className={'d-flex flex-grow-1'}>
                                                        <img src={item.logo !== "" ? item.logo : Logo}
                                                             className={"rounded img-thumbnail " + Style.listLogo}/>
                                                        <div className={'px-3 flex-grow-1'}>
                                                            <Link to={item.name !== null && language === "fa" ? {
                                                                    pathname: getRoutesItems().companySingle.route,
                                                                    search: "lang=" + language + "&" + "id=" + item.id + "&" + "title=" + item.name.replace(/\s+/g, '-').toLowerCase()
                                                                } :
                                                                language === "fa" ? {
                                                                    pathname: getRoutesItems().companySingle.route,
                                                                    search: "lang=" + language + "&" + "id=" + item.id + "&" + "title=" + item.name
                                                                } : item.englishName !== null && language === "en" ? {
                                                                    pathname: getRoutesItems().companySingle.route,
                                                                    search: "lang=" + language + "&" + "id=" + item.id + "&" + "title=" + item.englishName.replace(/\s+/g, '-').toLowerCase()

                                                                } : language === "en" ? {
                                                                    pathname: getRoutesItems().companySingle.route,
                                                                    search: "lang=" + language + "&" + "id=" + item.id + "&" + "title=" + item.englishName
                                                                } : null
                                                            }>
                                                                <h5 className={'change-text ' + Style.gritTitle}>{language === 'fa' ? item.name : item.englishName}</h5>
                                                            </Link>

                                                            <div className={'d-flex pt-2'}>
                                                                <div className={Style.dateSpan + " mx-1 "}>
                                                                    {language === 'fa' ? item.province.name + " / " + item.city.name : item.province.englishName + " / " + item.city.englishName}
                                                                </div>
                                                                <div
                                                                    className={Style.dateSpan + " mx-1 "}>{language === 'fa' ? item.companyCategory.name : item.companyCategory.englishName}</div>
                                                                {item.isRecruiting && <div
                                                                    className={Style.locationSpan + " mx-1"}>{t("company.list.hiring")}</div>}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div
                                                                className={Style.scoreText + " mt-4"}>{item.totalScore}</div>

                                                            <div className={'d-flex dir-ltr ' + Style.listStars}>
                                                                {
                                                                    calculateScoreStars(item.totalScore).map((item) => (
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
                            </InfiniteScroll>
                        }

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

            <NotificationContainer/>
        </main>
    )
}