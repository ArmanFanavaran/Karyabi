import {useEffect, useState} from 'react';
import {generateURL} from "../../global/Requests";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import advertisment from "./../imgs/advertisment.png"
import location from "./../imgs/location.png"
import $ from "jquery"
import InfiniteScroll from "react-infinite-scroll-component";

import Style from "./employmentAdvertisementList.module.css"
import Style2 from "./employmentAdvertisementList2.module.css"

import GridIcon from "../imgs/Group 106.png";
import ListIcon from "../imgs/Group 107.png";
import Delete from "../imgs/delete.png";
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";
import * as React from "react";
import * as queryString from "query-string";
import {getRoutesItems} from "../../RoutesList/RoutesList"
import Modal from "react-modal";
import {RatingStar} from "rating-star";
import filterImage from "../imgs/filter.png"
import addImg from "../../Resume/step5/imgs/add.svg";

/************ Float button ************/
import FloatingButtons from 'react-floating-buttons'
import {useTranslation} from "react-i18next";


var axios = require('axios');
axios.defaults.withCredentials = false;


export default function EmploymentAdvertisementList() {
    const [isGrid, setIsGrid] = useState(true);
    const [newsList, setNewsList] = useState([]);
    const [lastNews, setLastNews] = useState([]);
    const [entityFilters, setEntityFilters] = useState([]);
    const [orderFilters, setOrderFilters] = useState([]);
    const [t, i18n] = useTranslation('main');


    /**************** Filter ***********/
    const [isFullTime, setIsFullTime] = useState(false);
    const [isPartTime, setIsPartTime] = useState(false);
    const [isRemote, setIsRemote] = useState(false);
    const [isIntership, setIsIntership] = useState(false);
    const [isPremotionPossible, setIsPremotionPossible] = useState(false);
    const [isInsurancePossible, setIsInsurancePossible] = useState(false);
    const [isCoursePossible, setIsCoursePossible] = useState(false);
    const [isFlexibleWorkTimePossible, setIsFlexibleWorkTimePossible] = useState(false);
    const [isCommutingServicePossible, setIsCommutingServicePossible] = useState(false);
    const [isFreeFoodPossible, setIsFreeFoodPossible] = useState(false);
    const [isAdaptiveSalary, setIsAdaptiveSalary] = useState(false);

    /**************** Salary ***********/
    const [salaryList, setSalaryList] = useState([]);
    const [minSalary, setMinSalary] = useState([{id: 0}]);
    const [maxSalary, setMaxSalary] = useState([{id: 0}]);

    /**************** Keyword ***********/
    const [keyword, setKeyword] = React.useState("");

    /**************** Modal ***********/
    const [modalIsOpen, setIsOpen] = React.useState(false);

    /**************** Milatery ***********/
    const [milateryFilters, setMilateryFilters] = useState([]);
    const [searchedMilatery, setSearchedMilatery] = useState([]);
    const [selectedMilatery, setSelectedMilatery] = useState([]);

    /**************** Branch ***********/
    const [branchFilters, setBranchFilters] = useState([]);
    const [searchedBranches, setSearchedBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);

    /**************** Province ***********/
    const [provinceFilters, setProvinceFilters] = useState([]);
    const [searchedProvince, setSearchedProvince] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState([]);

    /**************** Category ***********/
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [searchedCategory, setSearchedCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    /**************** Gender ***********/
    const [genderList, setGenderList] = useState([]);
    const [gender, setGender] = useState([]);

    const [selectedEntity, setSelectedEntity] = useState([]);
    const [order, setOrder] = useState("");
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
        setSearchedProvince(provinceFilters)
        setSearchedBranches(branchFilters)
        setSearchedCategory(categoryFilters)

    }

    /************** Branch *************/
    /* change Height when search in branch */
    const onClickMoreMilatery = () => {
        if ($('.collapsible-content-milatery').css("height") === "180px") {
            $('.collapsible-content-milatery').css("height", "250px")
            $(this).text("close");
            if (sp.get("lang") === "fa") {
                $('#more-milatery').html("بسته")
                $('#more-milatery').addClass("text-danger").removeClass("text-success")
            } else {
                $('#more-milatery').html("close")
                $('#more-milatery').addClass("text-danger").removeClass("text-success")

            }
        } else {
            $('.collapsible-content-branch').css("height", "180px")
            if (sp.get("lang") === "fa") {
                $('#more-milatery').html("بیشتر")
                $('#more-milatery').removeClass("text-danger").addClass("text-success")
            } else {
                $('#more-milatery').html("open")
                $('#more-milatery').removeClass("text-danger").addClass("text-success")

            }
        }
    }
    /* search in branch */
    const onSearchMilatery = (event) => {
        let value = $(event.target).val().trim();
        if (value === "") {
            setSearchedMilatery(branchFilters);
        } else {
            let searched = [];
            $(milateryFilters).each((indexes, item) => {
                // console.log(index)
                if (sp.get("lang") === "fa" && item.name.includes(value)) {
                    searched.push(item);
                    $(selectedMilatery).each((index, num) => {
                        if (index.id === indexes.id)
                            $("#branch_" + index.id).prop('checked', true); // Unchecks it
                    })
                } //end if
                else if (sp.get("lang") === "en" && item.englishName.includes(value)) {
                    searched.push(item);
                }
            });
            setSearchedMilatery(searched);
        } //end else
    }
    /* checked in branch */
    const onMilateryEdit = (event) => {
        let id = parseInt($(event.target).val());
        let checked = $(event.target).prop("checked");

        let selected_milatery = [...selectedMilatery];

        let selected_ids = [];
        for (let i = 0; i < selected_milatery.length; i++) {
            selected_ids.push(selected_milatery[i].id);
        }
        /* changing selected array */
        if (checked) {
            let label = $(event.target).attr("data-text");
            let item = {
                id: id,
                label: label
            }
            selected_milatery.push(item);
            selected_ids.push(id);
        } else {
            for (let i = 0; i < selected_milatery.length; i++) {
                if (selected_milatery[i].id === id) {
                    selected_milatery.splice(i, 1);
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

        setSelectedMilatery(selected_milatery);

    }
    /* Remove Tag in branch */
    const onRemoveMilateryTag = (id) => {
        let selected_milatery = [...selectedMilatery];

        let selected_ids = [];
        for (let i = 0; i < selected_milatery.length; i++) {
            selected_ids.push(selected_milatery[i].id);
        }

        for (let i = 0; i < selected_milatery.length; i++) {
            if (selected_milatery[i].id === id) {
                selected_milatery.splice(i, 1);
                break;
            } //end if
        }//end for
        for (let i = 0; i < selected_ids.length; i++) {
            if (selected_ids[i] === id) {
                selected_ids.splice(i, 1);
                break;
            } //end if
        }//end for

        $("#milatery_" + id).prop('checked', false); // Unchecks it

        setSelectedMilatery(selected_milatery);
    }

    /************** Branch *************/
    /* change Height when search in branch */
    const onClickMoreBranches = () => {
        if ($('.collapsible-content-branch').css("height") === "180px") {
            $('.collapsible-content-branch').css("height", "250px")
            $(this).text("close");
            if (sp.get("lang") === "fa") {
                $('#more-branch').html("بسته")
                $('#more-branch').addClass("text-danger").removeClass("text-success")
            } else {
                $('#more-branch').html("close")
                $('#more-branch').addClass("text-danger").removeClass("text-success")

            }
        } else {
            $('.collapsible-content-branch').css("height", "180px")
            if (sp.get("lang") === "fa") {
                $('#more-branch').html("بیشتر")
                $('#more-branch').removeClass("text-danger").addClass("text-success")
            } else {
                $('#more-branch').html("open")
                $('#more-branch').removeClass("text-danger").addClass("text-success")

            }
        }
    }
    /* search in branch */
    const onSearchBranches = (event) => {
        let value = $(event.target).val().trim();

        if (value === "") {
            setSearchedBranches(branchFilters);
        } else {
            let searched = [];
            $(branchFilters).each((indexes, item) => {
                // console.log(index)
                if (sp.get("lang") === "fa" && item.name.includes(value)) {
                    searched.push(item);
                    $(selectedBranches).each((index, num) => {
                        if (index.id === indexes.id)
                            $("#branch_" + index.id).prop('checked', true); // Unchecks it
                    })
                } //end if
                else if (sp.get("lang") === "en" && item.englishName.includes(value)) {
                    searched.push(item);
                }
            });
            setSearchedBranches(searched);
        } //end else
    }
    /* checked in branch */
    const onBranchEdit = (event) => {
        let id = parseInt($(event.target).val());
        let checked = $(event.target).prop("checked");

        let selected_branches = [...selectedBranches];

        let selected_ids = [];
        for (let i = 0; i < selected_branches.length; i++) {
            selected_ids.push(selected_branches[i].id);
        }
        /* changing selected array */
        if (checked) {
            let label = $(event.target).attr("data-text");
            let item = {
                id: id,
                label: label
            }
            selected_branches.push(item);
            selected_ids.push(id);
        } else {
            for (let i = 0; i < selected_branches.length; i++) {
                if (selected_branches[i].id === id) {
                    selected_branches.splice(i, 1);
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

        setSelectedBranches(selected_branches);

    }
    /* Remove Tag in branch */
    const onRemoveBranchTag = (id) => {
        let selected_branches = [...selectedBranches];

        let selected_ids = [];
        for (let i = 0; i < selected_branches.length; i++) {
            selected_ids.push(selected_branches[i].id);
        }

        for (let i = 0; i < selected_branches.length; i++) {
            if (selected_branches[i].id === id) {
                selected_branches.splice(i, 1);
                break;
            } //end if
        }//end for
        for (let i = 0; i < selected_ids.length; i++) {
            if (selected_ids[i] === id) {
                selected_ids.splice(i, 1);
                break;
            } //end if
        }//end for

        $("#branch_" + id).prop('checked', false); // Unchecks it

        setSelectedBranches(selected_branches);
    }

    /************** Province *************/
    /* change Height when search in Province */
    const onClickMoreProvince = () => {
        if ($('.collapsible-content-province').css("height") === "180px") {
            $('.collapsible-content-province').css("height", "250px")
            if (sp.get("lang") === "fa") {
                $('#more-province').html("بسته")
                $('#more-province').addClass("text-danger").removeClass("text-success")

            } else {
                $('#more-province').html("close")
                $('#more-province').addClass("text-danger").removeClass("text-success")
            }

        } else {
            $('.collapsible-content-province').css("height", "180px")
            if (sp.get("lang") === "fa") {
                $('#more-province').html("بیشتر")
                $('#more-province').removeClass("text-danger").addClass("text-success")

            } else {
                $('#more-province').html("open")
                $('#more-province').removeClass("text-danger").addClass("text-success")


            }
        }

    }
    /* search in Province */
    const onSearchProvince = (event) => {
        let value = $(event.target).val().trim();

        if (value === "") {
            setSearchedProvince(provinceFilters);
        } else {
            let searched = [];
            $(provinceFilters).each((indexes, item) => {
                // console.log(index)
                if (sp.get("lang") === "fa" && item.name.includes(value)) {
                    searched.push(item);
                    $(selectedProvince).each((index, num) => {
                        if (index.id === indexes.id)
                            $("#province_" + index.id).prop('checked', true); // Unchecks it
                    })
                } //end if
                else if (sp.get("lang") === "en" && item.englishName.includes(value)) {
                    searched.push(item);
                }
            });
            setSearchedProvince(searched);
        } //end else
    }
    /* checked in branch */
    const onProvinceEdit = (event) => {
        let id = parseInt($(event.target).val());
        let checked = $(event.target).prop("checked");

        let selected_province = [...selectedProvince];

        let selected_ids = [];
        for (let i = 0; i < selected_province.length; i++) {
            selected_ids.push(selected_province[i].id);
        }
        /* changing selected array */
        if (checked) {
            let label = $(event.target).attr("data-text");
            let item = {
                id: id,
                label: label
            }
            selected_province.push(item);
            selected_ids.push(id);
        } else {
            for (let i = 0; i < selected_province.length; i++) {
                if (selected_province[i].id === id) {
                    selected_province.splice(i, 1);
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

        setSelectedProvince(selected_province);

    }
    /* Remove Tag in branch */
    const onRemoveProvinceTag = (id) => {
        let selected_Province = [...selectedProvince];

        let selected_ids = [];
        for (let i = 0; i < selected_Province.length; i++) {
            selected_ids.push(selected_Province[i].id);
        }

        for (let i = 0; i < selected_Province.length; i++) {
            if (selected_Province[i].id === id) {
                selected_Province.splice(i, 1);
                break;
            } //end if
        }//end for
        for (let i = 0; i < selected_ids.length; i++) {
            if (selected_ids[i] === id) {
                selected_ids.splice(i, 1);
                break;
            } //end if
        }//end for

        $("#province_" + id).prop('checked', false); // Unchecks it
        setSelectedProvince(selected_Province);
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
                // console.log(index)
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
        /*get news list*/
        console.log("scroll")
        let size = newsList.length / pageSize;
        // if()
        setPage(newsList.length)
        var list_data = JSON.stringify({
            "roleId": 2,
            "page": size + 1,
            "pageSize": pageSize,
            "heights": [200],
            "widths": [200],
            "qualities": [90],
            "keyword": null,
            "ownerId": 1,
            "owner": "Company",
            "genderIds": null,
            "isAdaptiveSalary": false,
            "minSalaryStatusId": 0,
            "maxSalaryStatusId": 12,
            "degreeIds": null,
            "typeId": 1,
            "provinceIds": null,
            "militaryStatusIds": null,
            "categoryIds": null,
            "isFullTime": false,
            "isPartTime": false,
            "isRemote": false,
            "isInternship": false,
            "isPromotionPossible": false,
            "isInsurancePossible": false,
            "isCoursePossible": false,
            "isFlexibleWorkTimePossible": false,
            "isCommutingServicePossible": false,
            "isFreeFoodPossible": false,
            "sortBye": 0
        });

        var list_config = {
            method: 'post',
            url: generateURL("/JobOffer/GetJobOfferListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };
        console.log("list client")

        axios(list_config)
            .then(function (response) {
                console.log(response.data.data)

                let data = response.data.data;
                let newsData = [...newsList]
                for (let i = 0; i < data.length; i++) {
                    newsData.push(data[i])

                }//end for
                console.log(newsData)
                setNewsList(newsData)
                // setNewsList(newsData)
                // let latest = [];
                // for (let i = 0; i < data.length && i < 3; i++) {
                //     latest.push(data[i]);
                // }
                // setLastNews(latest);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    /************** Scroll Filter *************/
    $(window).scroll(function () {
        if ($(this).scrollTop() > $('#fixed-class').outerHeight()+200) {
            $('#fixed-class').addClass(Style["fixed-content"])
            $('#filter').css("max-height", " 90vh ")
            if( $(this).scrollTop()<= $('#advertisementList').outerHeight()-100){
                // $('#fixed-class').addClass(Style["fixed-content"])
                $(Style["fixed-content"]).animate({ scrollTop: $('#fixed-class').height()}, 1000);
            }

        } else {
            $('#fixed-class').removeClass(Style["fixed-content"])
            $('#filter').css("max-height", " unset ")

        }
    })

    /************** Get Data *************/
    useEffect(() => {
        let categoryListSelect = [];
        let provinceListSelect = [];
        let branchListSelect = [];
        let genderList = [];
        let milateryList = [];
        selectedCategory.map((item, index) => (
            categoryListSelect.push(item.id)
        ))
        selectedProvince.map((item, index) => (
            provinceListSelect.push(item.id)
        ))
        selectedBranches.map((item, index) => (
            branchListSelect.push(item.id)
        ))
        gender.map((item, index) => (
            genderList.push(item.id)
        ))
        selectedMilatery.map((item, index) => (
            milateryList.push(item.id)
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
            "keyword": keyword,
            "ownerId": 1,
            "owner": "Company",
            "genderIds": genderList,
            "isAdaptiveSalary": isAdaptiveSalary,
            "minSalaryStatusId": parseInt(minSalary[0].id),
            "maxSalaryStatusId": parseInt(maxSalary[0].id),
            "degreeIds": branchListSelect,
            "typeId": 1,
            "provinceIds": provinceListSelect,
            "militaryStatusIds": milateryList,
            "categoryIds": categoryListSelect,
            "isFullTime": isFullTime,
            "isPartTime": isPartTime,
            "isRemote": isRemote,
            "isInternship": isIntership,
            "isPromotionPossible": isPremotionPossible,
            "isInsurancePossible": isInsurancePossible,
            "isCoursePossible": isCoursePossible,
            "isFlexibleWorkTimePossible": isFlexibleWorkTimePossible,
            "isCommutingServicePossible": isCommutingServicePossible,
            "isFreeFoodPossible": isFreeFoodPossible,
            "sortBye": 0
        });
        console.log(list_data)
        var list_config = {
            method: 'post',
            url: generateURL("/JobOffer/GetJobOfferListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };
        console.log("list client")
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
                console.log(error);
            });
    }, [isFreeFoodPossible,isCommutingServicePossible,isFlexibleWorkTimePossible,isCoursePossible,isInsurancePossible,isPremotionPossible])

    const onGridClick = () => {
        setIsGrid(true);
    }

    const onListClick = () => {
        setIsGrid(false);
    }

    const onOrderClick = (event) => {
        let value = $(event.target).text();

        $(".orders-parent a").removeClass(Style.active);
        $(event.target).addClass(Style.active)

        setOrder(value);
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
            "keyword": null,
            "ownerId": 1,
            "owner": "Company",
            "genderIds": null,
            "isAdaptiveSalary": false,
            "minSalaryStatusId": 0,
            "maxSalaryStatusId": 12,
            "degreeIds": null,
            "typeId": 1,
            "provinceIds": null,
            "militaryStatusIds": null,
            "categoryIds": null,
            "isFullTime": false,
            "isPartTime": false,
            "isRemote": false,
            "isInternship": false,
            "isPromotionPossible": false,
            "isInsurancePossible": false,
            "isCoursePossible": false,
            "isFlexibleWorkTimePossible": false,
            "isCommutingServicePossible": false,
            "isFreeFoodPossible": false,
            "sortBye": 0
        });
        var list_config = {
            method: 'post',
            url: generateURL("/JobOffer/GetJobOfferListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };
        axios(list_config)
            .then(function (response) {
                let data = response.data.data;
                setNewsList(data)
                // let latest = [];
                // for (let i = 0; i < data.length && i < 3; i++) {
                //     latest.push(data[i]);
                // }
                // setLastNews(latest);
            })
            .catch(function (error) {
                console.log(error);
            });

        /************** Category List *************/
        var entity_config = {
            method: 'get',
            url: generateURL("/Side/GetJobCategoryList"),
            headers: {}
        };
        axios(entity_config)
            .then(function (response) {
                setCategoryFilters(response.data.data);
                setSearchedCategory(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        /************** Province List *************/
        /* Get Province List */
        var entity_config = {
            method: 'get',
            url: generateURL("/SideArray/GetProvinceList"),
            headers: {}
        };
        axios(entity_config)
            .then(function (response) {
                setProvinceFilters(response.data.data);
                setSearchedProvince(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        /************** Branch List *************/
        /* Get Branch List */
        var entity_config = {
            method: 'get',
            url: generateURL("/Side/GetMajorList"),
            headers: {}
        };
        axios(entity_config)
            .then(function (response) {
                setBranchFilters(response.data.data);
                setSearchedBranches(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        /************** Milatery List *************/
        var milatery_config = {
            method: 'get',
            url: generateURL("/SideArray/GetMiltaryStatusList"),
            headers: {}
        };
        axios(milatery_config)
            .then(function (response) {
                setMilateryFilters(response.data.data);
                setSearchedMilatery(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        /************** gender List *************/
        var gender_config = {
            method: 'get',
            url: generateURL("/SideArray/GetGenderList"),
            headers: {}
        };
        axios(gender_config)
            .then(function (response) {
                setGenderList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        /************** salary List *************/
        var salary_config = {
            method: 'get',
            url: generateURL("/SideArray/GetSalaryStatusList"),
            headers: {}
        };
        axios(salary_config)
            .then(function (response) {
                setSalaryList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        /*get news count*/

        // var count_data = JSON.stringify({
        //     "LookingForEntity": [],
        //     "SubBranchIds": [],
        //     "title": "",
        //     "shortDescSearch": "",
        //     "orderBy": "",
        //     "pageSize": pageSize
        // });
        //
        // var count_config = {
        //     method: 'post',
        //     url: generateURL("News/GetNewsListCountClientSide"),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: count_data
        // };
        //
        // axios(count_config)
        //     .then(function (response) {
        //         setCount(response.data.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });


        /* get entity filter*/
        // var entity_config = {
        //     method: 'get',
        //     url: generateURL("News/getLookingFoEntityFilter"),
        //     headers: {}
        // };
        //
        // axios(entity_config)
        //     .then(function (response) {
        //         setEntityFilters(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        //
        // /*get order by Filters*/
        // var order_config = {
        //     method: 'get',
        //     url: generateURL("News/GetNewsListOrderByFilter"),
        //     headers: {}
        // };
        //
        // axios(order_config)
        //     .then(function (response) {
        //         setOrderFilters(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        /*get branch filters */
        // var config = {
        //     method: 'get',
        //     url: generateURL("HelpingData/GetBranches"),
        //     headers: {}
        // };
        //
        // axios(config)
        //     .then(function (response) {
        //         setBranchFilters(response.data.data);
        //         setSearchedBranches(response.data.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });


    }, []);

    return (
        <main className={Style.main + " text-center"}>
            <div className="container-fluid pb-5">
                <h3>اخبار</h3>
                <div className={Style.hero + " px-5"}>
                    <div className="container">
                        {
                            lastNews.length > 0 ?
                                <div className="row d-flex justify-content-center align-items-center">
                                    <div className="col-lg-6 pt-lg-4">
                                        <img src={lastNews[0].defImgSource} alt="" className="w-100"/>
                                    </div>
                                    <div className="col-lg-6 text-right">
                                        {
                                            lastNews.map((item, index) => (
                                                <div
                                                    className={Style["importent-news"] + " row py-2 d-flex justify-content-center align-items-center"}>
                                                    <div className="col-md-3 p-md-0 p-2">
                                                        <img src={item.defImgSource} alt="" className="rounded"/>
                                                    </div>
                                                    <div className="col-md-9 p-md-0 p-2">
                                                        <Link to={{
                                                            pathname: "/news/single",
                                                            search: "id=" + item.id + "&" + "entity=" + item.entity + "&" + "title=" + item.title
                                                        }}>
                                                            <p className="pr-md-4"><b>{item.title}</b>
                                                                <br/>{item.shortDesc}
                                                            </p>
                                                        </Link>

                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>

                                </div> : null
                        }

                    </div>
                </div>
                <div className={'row'}>
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

                                    <div className={"col-12 change-dir " + Style.input} id={'form'}>
                                        <div className={Style["fields-div"] + " my-3"}>
                                            <div className={Style["fields-header"]}>
                                                <span>جستجو در نتایج</span>
                                            </div>
                                            <div className={Style["search-in-results-div"]}>
                                                <input type="text" onChange={function (e){setKeyword(e.target.value)}} className={Style["search-in-results"]}
                                                       placeholder="جستجو"/>
                                            </div>
                                        </div>
                                        <div className={Style["fields-div"] + " my-3"}>
                                            <div className={Style["fields-header"]}>
                                                <span>دسته بندی</span>
                                                <input type="text" name="" id="" placeholder="جستجو"
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
                                            <div className={Style["fields-footer"]}>
                                                <button className={Style["change-height"] + " btn text-success"}
                                                        id={'more-category'} onClick={onClickMoreCategory}>بیشتر <img
                                                    src="assets/imgs/Group (1).png" alt=""/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={Style["fields-div"] + " my-3"}>
                                            <div className={Style["fields-header"]}>
                                                <span>رشته ها</span>
                                                <input type="text" name="" id="" placeholder="جستجو"
                                                       onChange={onSearchBranches}/>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-12'}>
                                                    {
                                                        selectedBranches.length > 0 ?
                                                            selectedBranches.map((item, index) => (
                                                                <div className={Style["branch-tags"] + " px-2 py-1 mx-1"}>
                                                            <span className={"mx-1 " + Style["pointer"]}
                                                                  onClick={() => {
                                                                      onRemoveBranchTag(item.id)
                                                                  }}><img src={Delete} width={10}/></span>
                                                                    {item.label}
                                                                </div>
                                                            )) : null
                                                    }
                                                </div>
                                            </div>
                                            <div className={Style["filters-list"] + " collapsible-content-branch"}
                                                 style={collapsibleContentStyle}>
                                                {
                                                    searchedBranches.length > 0 ?
                                                        searchedBranches.map((item, i) => (
                                                            <div
                                                                className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                                <input className="form-check-input branches_select"
                                                                       data-text={sp.get("lang") === "fa" ?
                                                                           item.name
                                                                           : item.englishName
                                                                       } onChange={onBranchEdit}
                                                                       checked={selectedBranches.some(e => e.id === item.id)}
                                                                       type="checkbox" value={item.id}
                                                                       id={"branch_" + item.id}/>
                                                                <label className="form-check-label px-4"
                                                                       htmlFor={"branch_" + item.id}>
                                                                    {sp.get("lang") === "fa" ?
                                                                        item.name
                                                                        : item.englishName
                                                                    }
                                                                </label>
                                                            </div>
                                                        )) : null
                                                }

                                            </div>
                                            <div className={Style["fields-footer"]}>
                                                <button id={'more-branch'}
                                                        className={Style["change-height"] + " btn text-success"}
                                                        onClick={onClickMoreBranches}>بیشتر <img
                                                    src="assets/imgs/Group (1).png" alt=""/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={Style["fields-div"] + " my-3"}>
                                            <div className={Style["fields-header"]}>
                                                <span>استان ها</span>
                                                <input type="text" name="" id="" placeholder="جستجو"
                                                       onChange={onSearchProvince}/>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-12'}>
                                                    {
                                                        selectedProvince.length > 0 ?
                                                            selectedProvince.map((item, index) => (
                                                                <div className={Style["branch-tags"] + " px-2 py-1 mx-1"}>
                                                            <span className={"mx-1 " + Style["pointer"]}
                                                                  onClick={() => {
                                                                      onRemoveProvinceTag(item.id)
                                                                  }}><img src={Delete} width={10}/></span>
                                                                    {item.label}
                                                                </div>
                                                            )) : null
                                                    }
                                                </div>

                                            </div>

                                            <div className={Style["filters-list"] + " collapsible-content-province"}
                                                 style={collapsibleContentStyle}>
                                                {
                                                    searchedProvince.length > 0 ?
                                                        searchedProvince.map((item, i) => (
                                                            <div
                                                                className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                                <input className="form-check-input branches_select"
                                                                       data-text={sp.get("lang") === "fa" ?
                                                                           item.name
                                                                           : item.englishName
                                                                       } onChange={onProvinceEdit}
                                                                       checked={selectedProvince.some(e => e.id === item.id)}
                                                                       type="checkbox" value={item.id}
                                                                       id={"province_" + item.id}/>
                                                                <label className="form-check-label px-4"
                                                                       htmlFor={"province_" + item.id}>
                                                                    {sp.get("lang") === "fa" ?
                                                                        item.name
                                                                        : item.englishName
                                                                    }
                                                                </label>
                                                            </div>
                                                        )) : null
                                                }

                                            </div>
                                            <div className={Style["fields-footer"]}>
                                                <button id={'more-province'}
                                                        className={Style["change-height"] + " btn text-success"}
                                                        onClick={onClickMoreProvince}>بیشتر <img
                                                    src="assets/imgs/Group (1).png" alt=""/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={Style["fields-div"] + " my-3 pb-2"}>
                                            <div className={Style["fields-header"]}>
                                                <span>{t("employmentAdvertisement.list.salaryStatus")}</span>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isAdaptiveSalary ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsAdaptiveSalary(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsAdaptiveSalary(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label> {t("employmentAdvertisement.list.consensusSalary")}</label>
                                                <br/>
                                            </div>

                                        </div>
                                        <div className={Style["fields-div"] + " my-3 pb-2"}>
                                            <div className={Style["fields-header"]}>
                                                <span>{t("employmentAdvertisement.list.minSalary")}</span>
                                            </div>
                                            <div className={Style["filters-list"] + " collapsible-content-province"}
                                                 style={collapsibleContentStyle}>
                                                {
                                                    salaryList.length > 0 ?
                                                        salaryList.map((item, i) => (
                                                            item.id !== 1 ?
                                                                <div
                                                                    className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                                    <input className="form-check-input milatery_select"
                                                                           data-text={sp.get("lang") === "fa" ?
                                                                               item.name
                                                                               : item.englishName
                                                                           } onChange={function () {
                                                                        if (minSalary[0].id !== item.id) {
                                                                            setMinSalary(
                                                                                [{
                                                                                    id: item.id
                                                                                }])
                                                                            if (minSalary[0].id > maxSalary[0].id) {
                                                                                setMaxSalary(
                                                                                    [{
                                                                                        id: 0
                                                                                    }])
                                                                            }
                                                                        } else {
                                                                            setMinSalary(
                                                                                [{
                                                                                    id: 0
                                                                                }])
                                                                        }
                                                                    }}
                                                                           checked={minSalary.some(e => e.id === item.id)}
                                                                           type="checkbox" value={item.id}
                                                                           id={"minSalary_" + item.id}/>
                                                                    <label className="form-check-label px-4"
                                                                           htmlFor={"minSalary_" + item.id}>
                                                                        {sp.get("lang") === "fa" ?
                                                                            item.name
                                                                            : item.englishName
                                                                        }
                                                                    </label>
                                                                </div> : null
                                                        )) : null
                                                }

                                            </div>
                                        </div>
                                        <div className={Style["fields-div"] + " my-3 pb-2"}>
                                            <div className={Style["fields-header"]}>
                                                <span>{t("employmentAdvertisement.list.maxSalary")}</span>
                                            </div>

                                            <div className={Style["filters-list"] + " collapsible-content-province"}
                                                 style={collapsibleContentStyle}>
                                                {
                                                    salaryList.length > 0 ?
                                                        salaryList.map((item, i) => (
                                                            item.id !== 1 && item.id > minSalary[0].id ?
                                                                <div
                                                                    className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                                    <input className="form-check-input milatery_select"
                                                                           data-text={sp.get("lang") === "fa" ?
                                                                               item.name.replace("از", "تا")
                                                                               : item.englishName
                                                                           } onChange={function () {
                                                                        if (maxSalary[0].id !== item.id) {
                                                                            setMaxSalary(
                                                                                [{
                                                                                    id: item.id
                                                                                }])
                                                                        } else {
                                                                            setMaxSalary(
                                                                                [{
                                                                                    id: 0
                                                                                }])
                                                                        }
                                                                    }}
                                                                           checked={maxSalary.some(e => e.id === item.id && e.id > minSalary[0].id)}
                                                                           type="checkbox" value={item.id}
                                                                           id={"maxSalary_" + item.id}/>
                                                                    <label className="form-check-label px-4"
                                                                           htmlFor={"maxSalary_" + item.id}>
                                                                        {sp.get("lang") === "fa" ?
                                                                            item.name.replace("از", "تا")
                                                                            : item.englishName
                                                                        }
                                                                    </label>
                                                                </div> : null

                                                        )) : null
                                                }

                                            </div>
                                        </div>
                                        <div className={Style["fields-div"] + " my-3"}>
                                            <div className={Style["fields-header"]}>
                                                <span>نظام وظیفه</span>
                                                <input type="text" name="" id="" placeholder="جستجو"
                                                       onChange={onSearchMilatery}/>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-12'}>
                                                    {
                                                        selectedMilatery.length > 0 ?
                                                            selectedMilatery.map((item, index) => (
                                                                <div className={Style["branch-tags"] + " px-2 py-1 mx-1"}>
                                                            <span className={"mx-1 " + Style["pointer"]}
                                                                  onClick={() => {
                                                                      onRemoveMilateryTag(item.id)
                                                                  }}><img src={Delete} width={10}/></span>
                                                                    {item.label}
                                                                </div>
                                                            )) : null
                                                    }
                                                </div>
                                            </div>
                                            <div className={Style["filters-list"] + " " + Style["overflow-hidden"]}>
                                                {
                                                    searchedMilatery.length > 0 ?
                                                        searchedMilatery.map((item, i) => (
                                                            <div
                                                                className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                                <input className="form-check-input milatery_select"
                                                                       data-text={sp.get("lang") === "fa" ?
                                                                           item.name
                                                                           : item.englishName
                                                                       } onChange={onMilateryEdit}
                                                                       checked={selectedMilatery.some(e => e.id === item.id)}
                                                                       type="checkbox" value={item.id}
                                                                       id={"milatery_" + item.id}/>
                                                                <label className="form-check-label px-4"
                                                                       htmlFor={"milatery_" + item.id}>
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
                                        <div className={Style["fields-div"] + " my-3"}>
                                            <div className={Style["fields-header"]}>
                                                <span>جنسیت</span>
                                            </div>
                                            <div className={Style["filters-list"] + " " + Style["overflow-hidden"]}
                                            >
                                                <div
                                                    className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                    <input className="form-check-input milatery_select"
                                                           data-text={sp.get("lang") === "fa" ?
                                                               "هردو"
                                                               : "Both"
                                                           } onChange={function () {
                                                        if (gender[0].id !== 0) {
                                                            setGender(
                                                                [{
                                                                    id: 0
                                                                }])
                                                        } else {
                                                            setGender(
                                                                [{
                                                                    id: -1
                                                                }])
                                                        }

                                                    }}
                                                           checked={gender.some(e => e.id === 0)}
                                                           type="checkbox" value={0}
                                                           id={"gender_" + 0}/>
                                                    <label className="form-check-label px-4"
                                                           htmlFor={"gender_" + 0}>
                                                        {sp.get("lang") === "fa" ?
                                                            "هردو"
                                                            : "Both"
                                                        }
                                                    </label>
                                                </div>
                                                {
                                                    genderList.length > 0 ?
                                                        genderList.map((item, i) => (
                                                            <div
                                                                className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                                <input className="form-check-input milatery_select"
                                                                       data-text={sp.get("lang") === "fa" ?
                                                                           item.name
                                                                           : item.englishName
                                                                       } onChange={function () {

                                                                    if (gender[0].id !== item.id) {
                                                                        setGender(
                                                                            [{
                                                                                id: item.id
                                                                            }])
                                                                    } else {
                                                                        setGender(
                                                                            [{
                                                                                id: -1
                                                                            }])
                                                                    }
                                                                }}
                                                                       checked={gender.some(e => e.id === item.id)}
                                                                       type="checkbox" value={item.id}
                                                                       id={"gender_" + item.id}/>
                                                                <label className="form-check-label px-4"
                                                                       htmlFor={"gender_" + item.id}>
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
                                        <div className={Style["fields-div"] + " my-3 pb-2"}>
                                            <div className={Style["fields-header"]}>
                                                <span>{t("employmentAdvertisement.list.typeOfCooperation")}</span>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isFullTime ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsFullTime(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsFullTime(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label>{t("employmentAdvertisement.list.isFullTime")}  </label>
                                                <br/>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isPartTime ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsPartTime(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsPartTime(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label>{t("employmentAdvertisement.list.isPartTime")}  </label>
                                                <br/>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isRemote ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsRemote(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsRemote(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label>{t("employmentAdvertisement.list.isRemote")}  </label>
                                            </div>
                                        </div>
                                        <div className={Style["fields-div"] + " my-3"}>
                                            <div className={Style["fields-header"]}>
                                                <span>{t("employmentAdvertisement.list.selectYourSeniorityLevel")}</span>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isIntership ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsIntership(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsIntership(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label>{t("employmentAdvertisement.list.isInternship")}  </label>
                                                <br/>
                                            </div>

                                        </div>
                                        <div className={Style["fields-div"] + " my-3 pb-2"}>
                                            <h6 className={' mx-3'}></h6>
                                            <div className={Style["fields-header"]}>
                                                <span>{t("employmentAdvertisement.list.advantages")}</span>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isPremotionPossible ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsPremotionPossible(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsPremotionPossible(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label>{t("employmentAdvertisement.list.isPromotionPossible")}  </label>
                                                <br/>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isInsurancePossible ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsInsurancePossible(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsInsurancePossible(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label>{t("employmentAdvertisement.list.isInsurancePossible")}  </label>
                                                <br/>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isCoursePossible ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsCoursePossible(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsCoursePossible(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label>{t("employmentAdvertisement.list.isCoursePossible")}  </label>
                                                <br/>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isFlexibleWorkTimePossible ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsFlexibleWorkTimePossible(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsFlexibleWorkTimePossible(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label>{t("employmentAdvertisement.list.isFlexibleWorkTimePossible")}  </label>
                                                <br/>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isCommutingServicePossible ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsCommutingServicePossible(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsCommutingServicePossible(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label>{t("employmentAdvertisement.list.isCommutingServicePossible")}  </label>
                                                <br/>
                                            </div>
                                            <div className={'mt-2'}>
                                                {
                                                    isFreeFoodPossible ?
                                                        <button className="mx-3 btn btn-primary text-white"
                                                                onClick={() => {
                                                                    setIsFreeFoodPossible(false)
                                                                }}><i className="fas fa-toggle-on"></i></button>
                                                        : <button className=" mx-3 btn btn-secondary text-white"
                                                                  onClick={() => {
                                                                      setIsFreeFoodPossible(true)
                                                                  }}><i className="fas fa-toggle-off"></i></button>
                                                }
                                                <label>{t("employmentAdvertisement.list.isFreeFoodPossible")}  </label>
                                                <br/>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className={Style["sort-box"] + " row mb-5"}>
                    <div className={Style["sort-items"] + " text-right d-inline col-6 col-md-10"}>
                        <span>مرتب سازی بر اساس :</span>
                        <div className="d-lg-inline d-none orders-parent">
                            {
                                orderFilters.length > 0 ?
                                    orderFilters.map((item, i) => (
                                        <a className="" onClick={onOrderClick}>{item}</a>
                                    )) : null
                            }
                            {/*<a href="" className={Style.active}>جدیدترین</a>*/}
                        </div>
                    </div>
                    <div className={Style["sort-imgs"] + " d-inline text-left col-6 col-md-2"}>
                        <img src={GridIcon} alt="" onClick={onGridClick}/><img src={ListIcon} alt=""
                                                                               onClick={onListClick}/>
                    </div>

                </div>
                <div className="row change-dir">
                    <div className={"d-none d-lg-none d-xl-block col-xl-3"}>
                        <div className={" "} id={"fixed-class"}>
                            <div className={Style["sticky-content"] + " change-dir-reverse w-100 px-3"} id={'filter'}>
                                <div className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text"}>
                                    <div className={Style["fields-header"]}>
                                        <span>جستجو در نتایج</span>
                                    </div>
                                    <div className={Style["search-in-results-div"]}>
                                        <input type="text" onChange={function (e){setKeyword(e.target.value)}} className={Style["search-in-results"]}
                                               placeholder="جستجو"/>
                                    </div>
                                </div>
                                <div className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text"}>
                                    <div className={Style["fields-header"]}>
                                        <span>دسته بندی</span>
                                        <input type="text" name="" id="" placeholder="جستجو"
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
                                    <div className={Style["fields-footer"]}>
                                        <button className={Style["change-height"] + " btn text-success"}
                                                id={'more-category'} onClick={onClickMoreCategory}>بیشتر <img
                                            src="assets/imgs/Group (1).png" alt=""/>
                                        </button>
                                    </div>
                                </div>
                                <div className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text"}>
                                    <div className={Style["fields-header"]}>
                                        <span>رشته ها</span>
                                        <input type="text" name="" id="" placeholder="جستجو"
                                               onChange={onSearchBranches}/>
                                    </div>
                                    <div className={'row'}>
                                        <div className={'col-12'}>
                                            {
                                                selectedBranches.length > 0 ?
                                                    selectedBranches.map((item, index) => (
                                                        <div className={Style["branch-tags"] + " px-2 py-1 mx-1"}>
                                                            <span className={"mx-1 " + Style["pointer"]}
                                                                  onClick={() => {
                                                                      onRemoveBranchTag(item.id)
                                                                  }}><img src={Delete} width={10}/></span>
                                                            {item.label}
                                                        </div>
                                                    )) : null
                                            }
                                        </div>
                                    </div>
                                    <div className={Style["filters-list"] + " collapsible-content-branch"}
                                         style={collapsibleContentStyle}>
                                        {
                                            searchedBranches.length > 0 ?
                                                searchedBranches.map((item, i) => (
                                                    <div
                                                        className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                        <input className="form-check-input branches_select"
                                                               data-text={sp.get("lang") === "fa" ?
                                                                   item.name
                                                                   : item.englishName
                                                               } onChange={onBranchEdit}
                                                               checked={selectedBranches.some(e => e.id === item.id)}
                                                               type="checkbox" value={item.id}
                                                               id={"branch_" + item.id}/>
                                                        <label className="form-check-label px-4"
                                                               htmlFor={"branch_" + item.id}>
                                                            {sp.get("lang") === "fa" ?
                                                                item.name
                                                                : item.englishName
                                                            }
                                                        </label>
                                                    </div>
                                                )) : null
                                        }

                                    </div>
                                    <div className={Style["fields-footer"]}>
                                        <button id={'more-branch'}
                                                className={Style["change-height"] + " btn text-success"}
                                                onClick={onClickMoreBranches}>بیشتر <img
                                            src="assets/imgs/Group (1).png" alt=""/>
                                        </button>
                                    </div>
                                </div>
                                <div className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text"}>
                                    <div className={Style["fields-header"]}>
                                        <span>استان ها</span>
                                        <input type="text" name="" id="" placeholder="جستجو"
                                               onChange={onSearchProvince}/>
                                    </div>
                                    <div className={'row'}>
                                        <div className={'col-12'}>
                                            {
                                                selectedProvince.length > 0 ?
                                                    selectedProvince.map((item, index) => (
                                                        <div className={Style["branch-tags"] + " px-2 py-1 mx-1"}>
                                                            <span className={"mx-1 " + Style["pointer"]}
                                                                  onClick={() => {
                                                                      onRemoveProvinceTag(item.id)
                                                                  }}><img src={Delete} width={10}/></span>
                                                            {item.label}
                                                        </div>
                                                    )) : null
                                            }
                                        </div>

                                    </div>

                                    <div className={Style["filters-list"] + " collapsible-content-province"}
                                         style={collapsibleContentStyle}>
                                        {
                                            searchedProvince.length > 0 ?
                                                searchedProvince.map((item, i) => (
                                                    <div
                                                        className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                        <input className="form-check-input branches_select"
                                                               data-text={sp.get("lang") === "fa" ?
                                                                   item.name
                                                                   : item.englishName
                                                               } onChange={onProvinceEdit}
                                                               checked={selectedProvince.some(e => e.id === item.id)}
                                                               type="checkbox" value={item.id}
                                                               id={"province_" + item.id}/>
                                                        <label className="form-check-label px-4"
                                                               htmlFor={"province_" + item.id}>
                                                            {sp.get("lang") === "fa" ?
                                                                item.name
                                                                : item.englishName
                                                            }
                                                        </label>
                                                    </div>
                                                )) : null
                                        }

                                    </div>
                                    <div className={Style["fields-footer"]}>
                                        <button id={'more-province'}
                                                className={Style["change-height"] + " btn text-success"}
                                                onClick={onClickMoreProvince}>بیشتر <img
                                            src="assets/imgs/Group (1).png" alt=""/>
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text pb-2"}>
                                    <div className={Style["fields-header"]}>
                                        <span>{t("employmentAdvertisement.list.salaryStatus")}</span>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isAdaptiveSalary ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsAdaptiveSalary(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsAdaptiveSalary(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label> {t("employmentAdvertisement.list.consensusSalary")}</label>
                                        <br/>
                                    </div>

                                </div>
                                <div
                                    className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text pb-2"}>
                                    <div className={Style["fields-header"]}>
                                        <span>{t("employmentAdvertisement.list.minSalary")}</span>
                                    </div>
                                    <div className={Style["filters-list"] + " collapsible-content-province"}
                                         style={collapsibleContentStyle}>
                                        {
                                            salaryList.length > 0 ?
                                                salaryList.map((item, i) => (
                                                    item.id !== 1 ?
                                                        <div
                                                            className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                            <input className="form-check-input milatery_select"
                                                                   data-text={sp.get("lang") === "fa" ?
                                                                       item.name
                                                                       : item.englishName
                                                                   } onChange={function () {
                                                                if (minSalary[0].id !== item.id) {
                                                                    setMinSalary(
                                                                        [{
                                                                            id: item.id
                                                                        }])
                                                                    if (minSalary[0].id > maxSalary[0].id) {
                                                                        setMaxSalary(
                                                                            [{
                                                                                id: 0
                                                                            }])
                                                                    }
                                                                } else {
                                                                    setMinSalary(
                                                                        [{
                                                                            id: 0
                                                                        }])
                                                                }
                                                            }}
                                                                   checked={minSalary.some(e => e.id === item.id)}
                                                                   type="checkbox" value={item.id}
                                                                   id={"minSalary_" + item.id}/>
                                                            <label className="form-check-label px-4"
                                                                   htmlFor={"minSalary_" + item.id}>
                                                                {sp.get("lang") === "fa" ?
                                                                    item.name
                                                                    : item.englishName
                                                                }
                                                            </label>
                                                        </div> : null
                                                )) : null
                                        }

                                    </div>
                                </div>
                                <div
                                    className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text pb-2"}>
                                    <div className={Style["fields-header"]}>
                                        <span>{t("employmentAdvertisement.list.maxSalary")}</span>
                                    </div>

                                    <div className={Style["filters-list"] + " collapsible-content-province"}
                                         style={collapsibleContentStyle}>
                                        {
                                            salaryList.length > 0 ?
                                                salaryList.map((item, i) => (
                                                    item.id !== 1 && item.id > minSalary[0].id ?
                                                        <div
                                                            className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                            <input className="form-check-input milatery_select"
                                                                   data-text={sp.get("lang") === "fa" ?
                                                                       item.name.replace("از", "تا")
                                                                       : item.englishName
                                                                   } onChange={function () {
                                                                if (maxSalary[0].id !== item.id) {
                                                                    setMaxSalary(
                                                                        [{
                                                                            id: item.id
                                                                        }])
                                                                } else {
                                                                    setMaxSalary(
                                                                        [{
                                                                            id: 0
                                                                        }])
                                                                }
                                                            }}
                                                                   checked={maxSalary.some(e => e.id === item.id && e.id > minSalary[0].id)}
                                                                   type="checkbox" value={item.id}
                                                                   id={"maxSalary_" + item.id}/>
                                                            <label className="form-check-label px-4"
                                                                   htmlFor={"maxSalary_" + item.id}>
                                                                {sp.get("lang") === "fa" ?
                                                                    item.name.replace("از", "تا")
                                                                    : item.englishName
                                                                }
                                                            </label>
                                                        </div> : null

                                                )) : null
                                        }

                                    </div>
                                </div>
                                <div className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text"}>
                                    <div className={Style["fields-header"]}>
                                        <span>نظام وظیفه</span>
                                        <input type="text" name="" id="" placeholder="جستجو"
                                               onChange={onSearchMilatery}/>
                                    </div>
                                    <div className={'row'}>
                                        <div className={'col-12'}>
                                            {
                                                selectedMilatery.length > 0 ?
                                                    selectedMilatery.map((item, index) => (
                                                        <div className={Style["branch-tags"] + " px-2 py-1 mx-1"}>
                                                            <span className={"mx-1 " + Style["pointer"]}
                                                                  onClick={() => {
                                                                      onRemoveMilateryTag(item.id)
                                                                  }}><img src={Delete} width={10}/></span>
                                                            {item.label}
                                                        </div>
                                                    )) : null
                                            }
                                        </div>
                                    </div>
                                    <div className={Style["filters-list"] + " " + Style["overflow-hidden"]}>
                                        {
                                            searchedMilatery.length > 0 ?
                                                searchedMilatery.map((item, i) => (
                                                    <div
                                                        className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                        <input className="form-check-input milatery_select"
                                                               data-text={sp.get("lang") === "fa" ?
                                                                   item.name
                                                                   : item.englishName
                                                               } onChange={onMilateryEdit}
                                                               checked={selectedMilatery.some(e => e.id === item.id)}
                                                               type="checkbox" value={item.id}
                                                               id={"milatery_" + item.id}/>
                                                        <label className="form-check-label px-4"
                                                               htmlFor={"milatery_" + item.id}>
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
                                <div className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text"}>
                                    <div className={Style["fields-header"]}>
                                        <span>جنسیت</span>
                                    </div>
                                    <div className={Style["filters-list"] + " " + Style["overflow-hidden"]}
                                    >
                                        <div
                                            className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                            <input className="form-check-input milatery_select"
                                                   data-text={sp.get("lang") === "fa" ?
                                                       "هردو"
                                                       : "Both"
                                                   } onChange={function () {
                                                if (gender[0].id !== 0) {
                                                    setGender(
                                                        [{
                                                            id: 0
                                                        }])
                                                } else {
                                                    setGender(
                                                        [{
                                                            id: -1
                                                        }])
                                                }

                                            }}
                                                   checked={gender.some(e => e.id === 0)}
                                                   type="checkbox" value={0}
                                                   id={"gender_" + 0}/>
                                            <label className="form-check-label px-4"
                                                   htmlFor={"gender_" + 0}>
                                                {sp.get("lang") === "fa" ?
                                                    "هردو"
                                                    : "Both"
                                                }
                                            </label>
                                        </div>
                                        {
                                            genderList.length > 0 ?
                                                genderList.map((item, i) => (
                                                    <div
                                                        className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>
                                                        <input className="form-check-input milatery_select"
                                                               data-text={sp.get("lang") === "fa" ?
                                                                   item.name
                                                                   : item.englishName
                                                               } onChange={function () {

                                                            if (gender[0].id !== item.id) {
                                                                setGender(
                                                                    [{
                                                                        id: item.id
                                                                    }])
                                                            } else {
                                                                setGender(
                                                                    [{
                                                                        id: -1
                                                                    }])
                                                            }
                                                        }}
                                                               checked={gender.some(e => e.id === item.id)}
                                                               type="checkbox" value={item.id}
                                                               id={"gender_" + item.id}/>
                                                        <label className="form-check-label px-4"
                                                               htmlFor={"gender_" + item.id}>
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
                                <div
                                    className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text pb-2"}>
                                    <div className={Style["fields-header"]}>
                                        <span>{t("employmentAdvertisement.list.typeOfCooperation")}</span>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isFullTime ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsFullTime(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsFullTime(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label>{t("employmentAdvertisement.list.isFullTime")}  </label>
                                        <br/>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isPartTime ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsPartTime(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsPartTime(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label>{t("employmentAdvertisement.list.isPartTime")}  </label>
                                        <br/>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isRemote ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsRemote(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsRemote(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label>{t("employmentAdvertisement.list.isRemote")}  </label>
                                    </div>
                                </div>
                                <div
                                    className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text"}>
                                    <div className={Style["fields-header"]}>
                                        <span>{t("employmentAdvertisement.list.selectYourSeniorityLevel")}</span>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isIntership ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsIntership(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsIntership(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label>{t("employmentAdvertisement.list.isInternship")}  </label>
                                        <br/>
                                    </div>

                                </div>
                                <div
                                    className={Style["fields-div"] + " my-3 d-md-block d-none change-dir change-text pb-2"}>
                                    <h6 className={' mx-3'}></h6>
                                    <div className={Style["fields-header"]}>
                                        <span>{t("employmentAdvertisement.list.advantages")}</span>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isPremotionPossible ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsPremotionPossible(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsPremotionPossible(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label>{t("employmentAdvertisement.list.isPromotionPossible")}  </label>
                                        <br/>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isInsurancePossible ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsInsurancePossible(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsInsurancePossible(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label>{t("employmentAdvertisement.list.isInsurancePossible")}  </label>
                                        <br/>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isCoursePossible ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsCoursePossible(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsCoursePossible(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label>{t("employmentAdvertisement.list.isCoursePossible")}  </label>
                                        <br/>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isFlexibleWorkTimePossible ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsFlexibleWorkTimePossible(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsFlexibleWorkTimePossible(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label>{t("employmentAdvertisement.list.isFlexibleWorkTimePossible")}  </label>
                                        <br/>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isCommutingServicePossible ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsCommutingServicePossible(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsCommutingServicePossible(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label>{t("employmentAdvertisement.list.isCommutingServicePossible")}  </label>
                                        <br/>
                                    </div>
                                    <div className={'mt-2'}>
                                        {
                                            isFreeFoodPossible ?
                                                <button className="mx-3 btn btn-primary text-white"
                                                        onClick={() => {
                                                            setIsFreeFoodPossible(false)
                                                        }}><i className="fas fa-toggle-on"></i></button>
                                                : <button className=" mx-3 btn btn-secondary text-white"
                                                          onClick={() => {
                                                              setIsFreeFoodPossible(true)
                                                          }}><i className="fas fa-toggle-off"></i></button>
                                        }
                                        <label>{t("employmentAdvertisement.list.isFreeFoodPossible")}  </label>
                                        <br/>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/*<div className={Style["fields-div"] + " my-3 d-md-block d-none"}>*/}
                        {/*    <div className={Style["fields-header"]}>*/}
                        {/*        <span>نویسنده ها</span>*/}
                        {/*    </div>*/}
                        {/*    <div className={Style["filters-list"]}>*/}

                        {/*        {*/}
                        {/*            entityFilters.length > 0 ?*/}
                        {/*                entityFilters.map((item, i) => (*/}
                        {/*                    <div*/}
                        {/*                        className={Style["filter-item"] + " form-check change-dir change-text mx-3"}>*/}
                        {/*                        <input className="form-check-input mx-0" onChange={onEntityEdit}*/}
                        {/*                               type="checkbox" value={item} id={"entity_" + item.id}/>*/}
                        {/*                        <label className="form-check-label px-4" htmlFor={"entity_" + item.id}>*/}
                        {/*                            {sp.get("lang") === "fa" ?*/}
                        {/*                                item.name*/}
                        {/*                                : item.englishName*/}
                        {/*                            }*/}
                        {/*                        </label>*/}
                        {/*                    </div>*/}
                        {/*                )) : null*/}
                        {/*        }*/}
                        {/*    </div>*/}
                        {/*</div>*/}


                    </div>
                    <div className="col-xl-9" id={'advertisementList'}>
                        {!isGrid ?
                            <div className={Style["news-list"]}>

                                <InfiniteScroll
                                    dataLength={newsList.length}
                                    next={getNewsList}
                                    hasMore={true}
                                    loader={<h4>Loading...</h4>}
                                >
                                    {
                                        newsList.length > 0 ?
                                            newsList.map((item, index) => (
                                                <Link
                                                    to={item.jobOffer.title !== null && sp.get("lang") === "fa" ? {
                                                            pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                            search: "lang=" + sp.get("lang") + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.title.replace(/\s+/g, '-').toLowerCase()
                                                        } :
                                                        sp.get("lang") === "fa" ? {
                                                            pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                            search: "lang=" + sp.get("lang") + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.title
                                                        } : item.jobOffer.titleEnglish !== null && sp.get("lang") === "en" ? {
                                                            pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                            search: "lang=" + sp.get("lang") + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.titleEnglish.replace(/\s+/g, '-').toLowerCase()

                                                        } : sp.get("lang") === "en" ? {
                                                            pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                            search: "lang=" + sp.get("lang") + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.titleEnglish
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
                                                                        src={item.company.logo !== null ? item.company.logo : advertisment}
                                                                        alt={sp.get("lang") === "fa" ?
                                                                            item.company.name :
                                                                            item.company.englishName
                                                                        }
                                                                        className=""/>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-7">
                                                                <div className={Style["news-item-text"]}>
                                                                    <div className="pl-md-5">


                                                                        <h6 className="change-text">
                                                                            {sp.get("lang") === "fa" ?
                                                                                item.jobOffer.title :
                                                                                item.jobOffer.titleEnglish
                                                                            }
                                                                        </h6>
                                                                        <p className={'change-text text-muted'}>
                                                                            {sp.get("lang") === "fa" ?
                                                                                item.company.name :
                                                                                item.company.englishName
                                                                            }
                                                                        </p>
                                                                        <p className="change-text">
                                                                            {sp.get("lang") === "fa" ?
                                                                                item.jobOffer.shortDesc :
                                                                                item.jobOffer.shortDescEnglish
                                                                            }
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
                                <div className="row change-dir px-2">
                                    {
                                        newsList.length > 0 ?
                                            newsList.map((item, index) => (
                                                <div
                                                    className={Style2["news"] + " " + (index % 2 === 0 ? Style2["news-even"] : Style2["news-odd"]) + " py-2 col-lg-4 col-md-6 col-12 mt-2"}>
                                                    <Link
                                                        to={item.jobOffer.title !== null && sp.get("lang") === "fa" ? {
                                                                pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                                search: "lang=" + sp.get("lang") + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.title.replace(/\s+/g, '-').toLowerCase()
                                                            } :
                                                            sp.get("lang") === "fa" ? {
                                                                pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                                search: "lang=" + sp.get("lang") + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.title
                                                            } : item.jobOffer.titleEnglish !== null && sp.get("lang") === "en" ? {
                                                                pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                                search: "lang=" + sp.get("lang") + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.titleEnglish.replace(/\s+/g, '-').toLowerCase()

                                                            } : sp.get("lang") === "en" ? {
                                                                pathname: getRoutesItems().employmentAdvertisementSingle.route,
                                                                search: "lang=" + sp.get("lang") + "&" + "id=" + item.jobOffer.id + "&" + "title=" + item.jobOffer.titleEnglish
                                                            } : null
                                                        } className={Style.mouse}>
                                                        <div className={Style2["container-item"] + " container"}>
                                                            <div className="row">
                                                                <div className={Style2["news-img"] + " col-12"}>
                                                                    <img
                                                                        src={item.company.logo !== null ? item.company.logo : advertisment}
                                                                        alt={sp.get("lang") === "fa" ?
                                                                            item.company.name :
                                                                            item.company.englishName
                                                                        }
                                                                        className=""/>
                                                                </div>
                                                                <div className={Style2["news-text"] + " col-12 mt-2"}>
                                                                    <h2 className="change-text">
                                                                        {sp.get("lang") === "fa" ?
                                                                            item.jobOffer.title :
                                                                            item.jobOffer.titleEnglish
                                                                        }
                                                                    </h2>
                                                                    <p className="change-text text-muted">
                                                                        {sp.get("lang") === "fa" ?
                                                                            item.company.name :
                                                                            item.company.englishName
                                                                        }
                                                                    </p>
                                                                    <p className="change-text">
                                                                        {sp.get("lang") === "fa" ?
                                                                            item.jobOffer.shortDesc :
                                                                            item.jobOffer.shortDescEnglish
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )) : null
                                    }
                                </div>
                            </div>
                        }

                    </div>
                </div>

            </div>
            <div className={'position-fixed'} style={{bottom: '20px', left: '20px'}}>
                <img className={Style["filterButton"]} onClick={openModal} width={'60px'} height={'60px'}
                     src={filterImage}/>
            </div>
        </main>
    )
}