import * as React from 'react';
import {useEffect, useState} from 'react';
import {generateURL} from "../../global/Requests";
import {Link} from "react-router-dom";
import advertisment from "./../imgs/content.png"
import $ from "jquery"
import InfiniteScroll from "react-infinite-scroll-component";

import Style from "./ContentProductionList.module.css"
import Style2 from "./ContentProductionList2.module.css"

import GridIcon from "../imgs/Group 106.png";
import ListIcon from "../imgs/Group 107.png";
import Delete from "../imgs/delete.png";
import * as queryString from "query-string";
import {getRoutesItems} from "../../RoutesList/RoutesList"
import Modal from "react-modal";
import filterImage from "../imgs/filter.png"
import {NotificationContainer, NotificationManager} from 'react-notifications';


/************ Float button ************/
import {useTranslation} from "react-i18next";
import {serverTimeToDaysAgo} from "../../global/TimeConverter";
import guide from "../../Resume/step1/imgs/guide.png";


var axios = require('axios');
axios.defaults.withCredentials = false;


export default function ContentProductionList() {
    const [isGrid, setIsGrid] = useState(true);
    const [newsList, setNewsList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [t, i18n] = useTranslation('main');


    /**************** Keyword ***********/
    const [keyword, setKeyword] = React.useState("");

    /**************** Modal ***********/
    const [modalIsOpen, setIsOpen] = React.useState(false);


    /**************** Category ***********/
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [searchedCategory, setSearchedCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);


    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    const pageSize = 6;
    const collapsibleContentStyle = {
        // display: "block",
        // overflow: "scroll",
        height: "180px"
    }

    /************** Modal **************/
    const customStyles = {

        content: {
            top: '100px',
            left: '0',
            width: '100%',
            maxWidth: '100%',
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


        "@media only screen and (max-width: 375px)": {
            backgroundColor: 'red'
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
        // $('#open').removeClass('d-none')
        // $('#close').addClass('d-none')
        // $('#submitAdd').addClass('d-none')
        // $('#submitEdit').removeClass('d-none')

        setSearchedCategory(categoryFilters)

    }


    /************** Category *************/
    /* change Height when search in Category */
    const onClickMoreCategory = () => {
        if ($('.collapsible-content-category').css("height") === "180px") {
            $('.collapsible-content-category').css("height", "250px")
            if (sp.get("lang") === "fa") {
                $('#more-category').html("بسته")
                $('#more-category').addClass("text-danger").removeClass("text-success")

            } else {
                $('#more-category').html("close")
                $('#more-category').addClass("text-danger").removeClass("text-success")

            }

        } else {
            $('.collapsible-content-category').css("height", "180px")
            if (sp.get("lang") === "fa") {
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
                if (sp.get("lang") === "fa" && item.name.includes(value)) {
                    searched.push(item);
                    $(selectedCategory).each((index, num) => {
                        if (index.id === indexes.id)
                            $("#province_" + index.id).prop('checked', true); // Unchecks it
                    })
                } //end if
                else if (sp.get("lang") === "en" && item.englishName.includes(value)) {
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

    /************** Get Data *************/
    const getNewsList = () => {
        let lastPage = Math.ceil(count / pageSize); // the last page
        let next_page = page + 1;

        let categoryListSelect = [];

        selectedCategory.map((item, index) => (
            categoryListSelect.push(item.id)
        ))

        var list_data = JSON.stringify({
            "roleId": 2,
            "page": next_page,
            "pageSize": pageSize,
            "heights": [200],
            "widths": [200],
            "qualities": [90],
            "catIds": categoryListSelect,
            "keyWord": keyword,
            "isOrderByInsertTimeDes": true,
            "isOrderByInsertTimeAsec": false,
            "isOrderByUpdateTimeDes": false,
            "isOrderByUpdateTimeAsec": false,
            "isVisible": true,
            "isAllTypeOfVisiblity": true,
            "isConfirmed": true,
            "isAllTypeOfConfirmation": true
        });

        var list_config = {
            method: 'post',
            url: generateURL("/News/GetNewsListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };
        if (next_page <= lastPage) {

            axios(list_config)
                .then(function (response) {

                    let data = response.data.data;
                    let newsData = [...newsList]
                    for (let i = 0; i < data.length; i++) {
                        newsData.push(data[i])

                    }//end for
                    setNewsList(newsData)
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

    /************** Get Data *************/
    useEffect(() => {
        let categoryListSelect = [];

        selectedCategory.map((item, index) => (
            categoryListSelect.push(item.id)
        ))


        /************** News List *************/
        /*get news list*/
        var list_data = JSON.stringify({
            "roleId": 2,
            "page": 1,
            "pageSize": 6,
            "heights": [200],
            "widths": [200],
            "qualities": [90],
            "catIds": categoryListSelect,
            "keyWord": keyword,
            "isOrderByInsertTimeDes": true,
            "isOrderByInsertTimeAsec": false,
            "isOrderByUpdateTimeDes": false,
            "isOrderByUpdateTimeAsec": false,
            "isVisible": true,
            "isAllTypeOfVisiblity": true,
            "isConfirmed": true,
            "isAllTypeOfConfirmation": true
        });
        var list_config = {
            method: 'post',
            url: generateURL("/News/GetNewsListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };
        axios(list_config)
            .then(function (response) {

                setPage(1);

                let data = response.data.data;
                setNewsList(data)
                // let latest = [];
                // for (let i = 0; i < data.length && i < 3; i++) {
                //     latest.push(data[i]);
                // }
                // setLastNews(latest);
            })
            .catch(function (error) {
            });

        var count_config = {
            method: 'post',
            url: generateURL("/News/GetNewsListClientSideCount"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
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

    }, [selectedCategory, keyword])

    const onGridClick = () => {
        setIsGrid(true);
    }

    const onListClick = () => {
        setIsGrid(false);
    }


    useEffect(() => {
        /************** News List *************/
        /*get news list*/
        var list_data = JSON.stringify({
            "roleId": 2,
            "page": 1,
            "pageSize": 6,
            "heights": [200],
            "widths": [200],
            "qualities": [90],
            "catIds": [],
            "keyWord": "",
            "isOrderByInsertTimeDes": true,
            "isOrderByInsertTimeAsec": false,
            "isOrderByUpdateTimeDes": false,
            "isOrderByUpdateTimeAsec": false,
            "isVisible": true,
            "isAllTypeOfVisiblity": true,
            "isConfirmed": true,
            "isAllTypeOfConfirmation": true
        });
        var list_config = {
            method: 'post',
            url: generateURL("/News/GetNewsListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };
        axios(list_config)
            .then(function (response) {
                console.log(response.data.data)
                let data = response.data.data;
                setNewsList(data)
                // let latest = [];
                // for (let i = 0; i < data.length && i < 3; i++) {
                //     latest.push(data[i]);
                // }
                // setLastNews(latest);
            })
            .catch(function (error) {
            });

        /************** Category List *************/
        var entity_config = {
            method: 'get',
            url: generateURL("/Side/GetNewsCategoryList"),
            headers: {}
        };
        axios(entity_config)
            .then(function (response) {
                setCategoryFilters(response.data.data);
                setSearchedCategory(response.data.data);
            })
            .catch(function (error) {
            });

        var count_config = {
            method: 'post',
            url: generateURL("/News/GetNewsListClientSideCount"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
                console.log(response.data.data)
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
    }, []);

    return (
        <main className={Style.main + " text-center"}>
            <div className="container-fluid pb-5 pt-5">
                <h3>{t("contentProduction.title.contentProduction")}</h3>

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
                                                                       data-text={sp.get("lang") === "fa" ?
                                                                           item.name
                                                                           : item.englishName
                                                                       } onChange={onCategoryEdit}
                                                                       checked={selectedCategory.some(e => e.id === item.id)}
                                                                       type="checkbox" value={item.id}
                                                                       id={"category_" + item.id}/>
                                                                <label className="form-check-label px-4"
                                                                       htmlFor={"category_" + item.id}>
                                                                    {sp.get("lang") === "fa" ?
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
                <div className={Style["sort-box"] + " row mb-5 d-none d-xl-flex"}>

                    <div className={Style["sort-imgs"] + " d-inline change-text-reverse col-12 "}>
                        <img src={GridIcon} alt="" onClick={onGridClick}/><img src={ListIcon} alt=""
                                                                               onClick={onListClick}/>
                    </div>
                    <div className={'d-none d-xl-block col-12 change-text change-dir'}>
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
                </div>
                <div className="row change-dir">
                    <div className={"d-none d-lg-none d-xl-block col-xl-3"}>
                        <div className={" "} id={"fixed-class"}>
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
                                                               data-text={sp.get("lang") === "fa" ?
                                                                   item.name
                                                                   : item.englishName
                                                               } onChange={onCategoryEdit}
                                                               checked={selectedCategory.some(e => e.id === item.id)}
                                                               type="checkbox" value={item.id}
                                                               id={"category_" + item.id}/>
                                                        <label className="form-check-label px-4"
                                                               htmlFor={"category_" + item.id}>
                                                            {sp.get("lang") === "fa" ?
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
                    <div className="col-xl-9" id={'advertisementList'}>
                        {!isGrid ?
                            <div className={Style["news-list"]}>

                                <InfiniteScroll
                                    dataLength={newsList.length}
                                    scrollThreshold={0.4}
                                    next={getNewsList}
                                    hasMore={hasMore}
                                    style={{overflow: 'hidden'}}
                                    loader={<h4>Loading...</h4>}
                                >
                                    {
                                        newsList.length > 0 ?
                                            newsList.map((item, index) => (
                                                <Link
                                                    to={item.title !== null && sp.get("lang") === "fa" ? {
                                                            pathname: getRoutesItems().contentProductionSingle.route,
                                                            search: "lang=" + sp.get("lang") + "&" + "id=" + item.id + "&" + "title=" + item.title.replace(/\s+/g, '-').toLowerCase()
                                                        } :
                                                        sp.get("lang") === "fa" ? {
                                                            pathname: getRoutesItems().contentProductionSingle.route,
                                                            search: "lang=" + sp.get("lang") + "&" + "id=" + item.id + "&" + "title=" + item.title
                                                        } : item.englishTitle !== null && sp.get("lang") === "en" ? {
                                                            pathname: getRoutesItems().contentProductionSingle.route,
                                                            search: "lang=" + sp.get("lang") + "&" + "id=" + item.id + "&" + "title=" + item.englishTitle.replace(/\s+/g, '-').toLowerCase()

                                                        } : sp.get("lang") === "en" ? {
                                                            pathname: getRoutesItems().contentProductionSingle.route,
                                                            search: "lang=" + sp.get("lang") + "&" + "id=" + item.id + "&" + "title=" + item.englishTitle
                                                        } : null
                                                    } className={Style.mouse}>
                                                    <div
                                                        className={Style["news-item"] + " " + (index % 2 === 0 ? Style["news-item-even"] : Style["news-item-odd"]) + " mx-2 my-4"}>
                                                        <div
                                                            className="row d-flex justify-content-center align-items-center ">
                                                            <div className="col-12 col-lg-3 col-md-5">
                                                                <div
                                                                    className={Style["news-item-img"] + " text-center p-lg-4"}>
                                                                    <img
                                                                        src={item.coverImage.length > 0 ? item.coverImage[0] : advertisment}
                                                                        alt={sp.get("lang") === "fa" ?
                                                                            item.title :
                                                                            item.englishTitle
                                                                        }
                                                                        className=""/>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-7">
                                                                <div className={Style["news-item-text"]}>
                                                                    <div className="pl-md-5">
                                                                        <h6 className="change-text">
                                                                            {sp.get("lang") === "fa" ?
                                                                                item.title :
                                                                                item.englishTitle
                                                                            }
                                                                        </h6>
                                                                        <p className={'change-text text-muted d-flex change-dir justify-content-between'}>
                                                                            {sp.get("lang") === "fa" ?
                                                                                item.shortDesc :
                                                                                item.englishShortDesc
                                                                            }
                                                                        </p>
                                                                        <p className="change-text d-flex change-dir">
                                                                            <span className={Style.dateSpan + " mx-2"}>
                                                                                {sp.get("lang") === "fa" ?
                                                                                    serverTimeToDaysAgo(item.insertTime) + " روز پیش" :
                                                                                    serverTimeToDaysAgo(item.insertTime) + " days ago"}
                                                                            </span>

                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )) : null
                                    }
                                </InfiniteScroll>
                            </div>
                            :
                            <div className={Style2["news-list"]}>
                                <InfiniteScroll
                                    dataLength={newsList.length}
                                    scrollThreshold={0.4}
                                    next={getNewsList}
                                    hasMore={hasMore}
                                    style={{overflow: 'hidden'}}
                                    loader={<h4>Loading...</h4>}
                                >
                                    <div className="row change-dir px-2">
                                        {
                                            newsList.length > 0 ?
                                                newsList.map((item, index) => (
                                                    <div
                                                        className={Style2["news"] + " col-4 " + (index % 2 === 0 ? Style2["news-even"] : Style2["news-odd"]) + " py-2 col-lg-4 col-md-6 col-12 mt-2"}>
                                                        <Link
                                                            to={item.title !== null && sp.get("lang") === "fa" ? {
                                                                    pathname: getRoutesItems().contentProductionSingle.route,
                                                                    search: "lang=" + sp.get("lang") + "&" + "id=" + item.id + "&" + "title=" + item.title.replace(/\s+/g, '-').toLowerCase()
                                                                } :
                                                                sp.get("lang") === "fa" ? {
                                                                    pathname: getRoutesItems().contentProductionSingle.route,
                                                                    search: "lang=" + sp.get("lang") + "&" + "id=" + item.id + "&" + "title=" + item.title
                                                                } : item.englishTitle !== null && sp.get("lang") === "en" ? {
                                                                    pathname: getRoutesItems().contentProductionSingle.route,
                                                                    search: "lang=" + sp.get("lang") + "&" + "id=" + item.id + "&" + "title=" + item.englishTitle.replace(/\s+/g, '-').toLowerCase()

                                                                } : sp.get("lang") === "en" ? {
                                                                    pathname: getRoutesItems().contentProductionSingle.route,
                                                                    search: "lang=" + sp.get("lang") + "&" + "id=" + item.id + "&" + "title=" + item.englishTitle
                                                                } : null
                                                            } className={Style.mouse}>
                                                            <div className={Style2["container-item"] + " container"}>
                                                                <div className="row">
                                                                    <div className={Style2["news-img"] + " col-12"}>
                                                                        <img
                                                                            src={item.coverImage.length > 0 ? item.coverImage[0] : advertisment}
                                                                            alt={sp.get("lang") === "fa" ?
                                                                                item.title :
                                                                                item.englishTitle
                                                                            }
                                                                            className=""/>
                                                                    </div>
                                                                    <div
                                                                        className={Style2["news-text"] + " col-12 mt-2"}>
                                                                        <h2 className="change-text">
                                                                            {sp.get("lang") === "fa" ?
                                                                                item.title :
                                                                                item.englishTitle
                                                                            }
                                                                        </h2>
                                                                        <p className="change-text text-muted">
                                                                            {sp.get("lang") === "fa" ?
                                                                                item.shortDesc :
                                                                                item.englishShortDesc
                                                                            }
                                                                        </p>
                                                                        <p className="change-text d-flex change-dir justify-content-between mt-3 pb-3">
                                                                            <span className={Style.dateSpan}>
                                                                                {sp.get("lang") === "fa" ?
                                                                                    serverTimeToDaysAgo(item.insertTime) + " روز پیش" :
                                                                                    serverTimeToDaysAgo(item.insertTime) + " days ago"}
                                                                            </span>

                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )) : null
                                        }
                                    </div>
                                </InfiniteScroll>

                            </div>
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