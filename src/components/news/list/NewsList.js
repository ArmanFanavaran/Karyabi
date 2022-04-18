import {useEffect, useState} from 'react';
import {generateURL} from "../../global/Requests";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";


import $ from "jquery"

import Style from "./news-list.module.css"
import Style2 from "./news-list2.module.css"

import GridIcon from "../imgs/Group 106.png";
import ListIcon from "../imgs/Group 107.png";
import CloseIcon from "../imgs/cancel.png";

var axios = require('axios');
axios.defaults.withCredentials = false;


export default function NewsList() {
    const [isGrid, setIsGrid] = useState(true);
    const [newsList, setNewsList] = useState([]);
    const [lastNews, setLastNews] = useState([]);
    const [entityFilters, setEntityFilters] = useState([]);
    const [orderFilters, setOrderFilters] = useState([]);
    const [branchFilters, setBranchFilters] = useState([]);
    const [searchedBranches, setSearchedBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [order, setOrder] = useState("");
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 12;
    const collapsibleContentStyle = {
        display: "block",
        overflow: "hidden",
        height: "300px"
    }

    const onClickMoreBranches = () => {
        let coll = document.getElementsByClassName("collapsible-content")[0];

        if (coll.style.height === "300px") {
            coll.style.height = "fit-content";
        } else {
            coll.style.height = "300px";
        }

    }

    const onSearchBranches = (event) => {
        let value = $(event.target).val().trim();
        if (value === "")
            setSearchedBranches(branchFilters);
        else {
            let searched = [];
            $(branchFilters).each((index , item) => {
                if (item.subBranchName.includes(value)) {
                    searched.push(item);
                } //end if
            });
            setSearchedBranches(searched);
        } //end else
    }

    const PaginationFunction = (page) => {
        /* sending data */
        let data = JSON.stringify({
            "LookingForEntity": selectedEntity,
            "SubBranchIds": selectedBranches,
            "TesxtSearch": searchTitle,
            "orderBy": order,
            "page": page,
            "pageSize": pageSize
        });

        let config = {
            method: 'post',
            url: generateURL("News/GetNewsListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setNewsList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onGridClick = () => {
        setIsGrid(true);
    }

    const onListClick = () => {
        setIsGrid(false);
    }

    const onSearch = (event) => {
        let value = $(event.target).val();
        /* sending data */
        let data = JSON.stringify({
            "LookingForEntity": selectedEntity,
            "SubBranchIds": selectedBranches,
            "TesxtSearch": value,
            "orderBy": order,
            "page": 1,
            "pageSize": pageSize
        });

        let config = {
            method: 'post',
            url: generateURL("News/GetNewsListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setNewsList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        let count_config = {
            method: 'post',
            url: generateURL("News/GetNewsListCountClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        setPage(1);
        setSearchTitle(value);

    }

    const onOrderClick = (event) => {
        let value = $(event.target).text();

        $(".orders-parent a").removeClass(Style.active);
        $(event.target).addClass(Style.active)

        /* sending data */
        let data = JSON.stringify({
            "LookingForEntity": selectedEntity,
            "SubBranchIds": selectedBranches,
            "TesxtSearch": searchTitle,
            "orderBy": value,
            "page": 1,
            "pageSize": pageSize
        });

        let config = {
            method: 'post',
            url: generateURL("News/GetNewsListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log((response.data));
                setNewsList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        setPage(1);
        setOrder(value);
    }

    const onEntityEdit = (event) => {
        let id = $(event.target).val();
        let checked = $(event.target).prop("checked");

        let selected_entity = [...selectedEntity];

        /* changing selected array */
        if (checked)
            selected_entity.push(id);
        else {
            for (let i = 0; i < selected_entity.length; i++) {
                if (selected_entity[i] === id) {
                    selected_entity.splice(i, 2);
                    break;
                } //end if
            }//end for
        }//end else


        /* sending data */
        let data = JSON.stringify({
            "LookingForEntity": selected_entity,
            "SubBranchIds": selectedBranches,
            "TesxtSearch": searchTitle,
            "orderBy": order,
            "page": 1,
            "pageSize": pageSize
        });

        let config = {
            method: 'post',
            url: generateURL("News/GetNewsListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log((response.data));
                setNewsList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        let count_config = {
            method: 'post',
            url: generateURL("News/GetNewsListCountClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        setPage(1);
        setSelectedEntity(selected_entity);
    }

    const onBranchEdit = (event) => {
        let id = parseInt($(event.target).val());
        let checked = $(event.target).prop("checked");

        let selected_branches = [...selectedBranches];

        let selected_ids = [];
        for (let i = 0; i<selected_branches.length; i++) {
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
        }

        else {
            for (let i = 0; i < selected_branches.length; i++) {
                if (selected_branches[i].id === id) {
                    selected_branches.splice(i, 1);
                    break;
                } //end if
            }//end for
            for (let i = 0; i < selected_ids.length; i++) {
                if (selected_ids[i].i === id) {
                    selected_ids.splice(i, 1);
                    break;
                } //end if
            }//end for
        }//end else


        /* sending data */
        let data = ({
            "LookingForEntity": selectedEntity,
            "SubBranchIds": selected_ids,
            "TesxtSearch": searchTitle,
            "orderBy": order,
            "page": 1,
            "pageSize": pageSize
        });

        let config = {
            method: 'post',
            url: generateURL("News/GetNewsListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
        };
        console.log(data)

        axios(config)
            .then(function (response) {
                console.log((response.data));
                setNewsList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        let count_config = {
            method: 'post',
            url: generateURL("News/GetNewsListCountClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        setPage(1);
        setSelectedBranches(selected_branches);

    }

    const onRemoveBranchTag = (id) => {
        let selected_branches = [...selectedBranches];

        let selected_ids = [];
        for (let i = 0; i<selected_branches.length; i++) {
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

        /* sending data */
        let data = ({
            "LookingForEntity": selectedEntity,
            "SubBranchIds": selected_ids,
            "TesxtSearch": searchTitle,
            "orderBy": order,
            "page": 1,
            "pageSize": pageSize
        });

        let config = {
            method: 'post',
            url: generateURL("News/GetNewsListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
        };
        console.log(data)

        axios(config)
            .then(function (response) {
                console.log((response.data));
                setNewsList(response.data.data);

                $("#branch_" + id).prop("checked", false)
            })
            .catch(function (error) {
                console.log(error);
            });


        let count_config = {
            method: 'post',
            url: generateURL("News/GetNewsListCountClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        setPage(1);
        setSelectedBranches(selected_branches);
    }


    useEffect(() => {

        /*get news list*/
        var list_data = JSON.stringify({
            "LookingForEntity": [],
            "SubBranchIds": [],
            "title": "",
            "shortDescSearch": "",
            "orderBy": "",
            "page": 1,
            "pageSize": pageSize
        });

        var list_config = {
            method: 'post',
            url: generateURL("News/GetNewsListClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {

                let data = response.data.data;
                setNewsList(data);
                let latest = [];
                for (let i = 0; i<data.length && i<3; i++) {
                    latest.push(data[i]);
                }
                setLastNews(latest);
                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });


        /*get news count*/

        var count_data = JSON.stringify({
            "LookingForEntity": [],
            "SubBranchIds": [],
            "title": "",
            "shortDescSearch": "",
            "orderBy": "",
            "pageSize": pageSize
        });

        var count_config = {
            method: 'post',
            url: generateURL("News/GetNewsListCountClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: count_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        /* get entity filter*/
        var entity_config = {
            method: 'get',
            url: generateURL("News/getLookingFoEntityFilter"),
            headers: {}
        };

        axios(entity_config)
            .then(function (response) {
                setEntityFilters(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        /*get order by Filters*/
        var order_config = {
            method: 'get',
            url: generateURL("News/GetNewsListOrderByFilter"),
            headers: {}
        };

        axios(order_config)
            .then(function (response) {
                setOrderFilters(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        /*get branch filters */
        var config = {
            method: 'get',
            url: generateURL("HelpingData/GetBranches"),
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setBranchFilters(response.data.data);
                setSearchedBranches(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


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
                    <div className="row px-3 mt-2">
                        {
                            selectedBranches.length > 0 ?
                                selectedBranches.map((item, index) => (
                                    <div className={Style["branch-tags"] + " px-3 py-2 mx-1"}>
                                        <span className="ml-2" onClick={() => {onRemoveBranchTag(item.id)}}><img width="10" src={CloseIcon}/></span>
                                        {item.label}
                                    </div>
                                )) : null
                        }

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className={Style["fields-div"] + " my-3 d-md-block d-none"}>
                            <div className={Style["fields-header"]}>
                                <span>رشته ها</span>
                                <input type="text" name="" id="" placeholder="جستجو" onChange={onSearchBranches}/>
                            </div>
                            <div className={Style["filters-list"] + " collapsible-content"} style={collapsibleContentStyle}>
                                {
                                    searchedBranches.length > 0 ?
                                        searchedBranches.map((item, i) => (
                                        <div className={Style["filter-item"] + " form-check"}>
                                            <input className="form-check-input branches_select" data-text={item.subBranchName} onChange={onBranchEdit} type="checkbox" value={item.id} id={"branch_" + item.id}/>
                                            <label className="form-check-label pr-4" htmlFor={"branch_" + item.id}>
                                                {item.subBranchName}
                                            </label>
                                        </div>
                                    )) : null
                                }

                            </div>
                            <div className={Style["fields-footer"]}>
                                <button className={Style["change-height"] + " btn"} onClick={onClickMoreBranches}>بیشتر <img
                                    src="assets/imgs/Group (1).png" alt=""/>
                                </button>
                            </div>
                        </div>
                        <div className={Style["fields-div"] + " my-3 d-md-block d-none"}>
                            <div className="fields-header">
                                <span>جستجو در نتایج</span>
                            </div>
                            <div className={Style["search-in-results-div"]}>
                                <input type="text" onChange={onSearch} className={Style["search-in-results"]} placeholder="جستجو"/>
                            </div>
                        </div>
                        <div className={Style["fields-div"] + " my-3 d-md-block d-none"}>
                            <div className={Style["fields-header"]}>
                                <span>نویسنده ها</span>
                            </div>
                            <div className={Style["filters-list"]}>

                                {
                                    entityFilters.length > 0 ?
                                        entityFilters.map((item, i) => (
                                            <div className={Style["filter-item"] + " form-check"}>
                                                <input className="form-check-input" onChange={onEntityEdit} type="checkbox" value={item} id={"entity_" + item}/>
                                                <label className="form-check-label pr-4" htmlFor={"entity_" + item}>
                                                    {item}
                                                </label>
                                            </div>
                                        )) : null
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        {!isGrid ?
                            <div className={Style["news-list"]}>
                                {
                                    newsList.length > 0 ?
                                        newsList.map((item, index) => (
                                            <div
                                                className={Style["news-item"] + " " + (index % 2 === 0 ? Style["news-item-even"] : Style["news-item-odd"]) + "  my-3"}>
                                                <div className="row d-flex justify-content-center align-items-center ">
                                                    <div className="col-12 col-lg-3 col-md-5">
                                                        <div className={Style["news-item-img"] + " text-center p-lg-4"}>
                                                            <img src={item.defImgSource} alt="" className=""/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-7">
                                                        <div className={Style["news-item-text"]}>
                                                            <div className="pl-md-5">
                                                                <h6 className="text-right">{item.title}</h6>
                                                                <p className="text-right">{item.shortDesc}</p>
                                                                <div className="text-left">
                                                                    <Link to={{
                                                                        pathname: "/news/single",
                                                                        search: "id=" + item.id + "&" + "entity=" + item.entity + "&" + "title=" + item.title
                                                                    }} className="btn">ادامه خبر ...</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : null
                                }

                            </div>
                            :
                            <div className={Style2["news-list"]}>
                                <div className="row">
                                    {
                                        newsList.length > 0 ?
                                            newsList.map((item, index) => (
                                                <div
                                                    className={Style2["news"] + " " + (index % 2 === 0 ? Style2["news-even"] : Style2["news-odd"]) + " py-2 col-lg-4 col-md-6 col-12"}>
                                                    <div className={Style2["container-item"] + " container"}>
                                                        <div className="row">
                                                            <div className={Style2["news-img"] + " col-12"}>
                                                                <img src={item.defImgSource} alt=""/>
                                                            </div>
                                                            <div className={Style2["news-text"] + " col-12"}>
                                                                <h2 className="py-2">{item.title}</h2>
                                                                <p className="text-right">{item.shortDesc}</p>
                                                                <div className="text-left">
                                                                    <Link to={{
                                                                        pathname: "/news/single",
                                                                        search: "id=" + item.id + "&" + "entity=" + item.entity + "&" + "title=" + item.title
                                                                    }}
                                                                        className="btn">ادامه خبر ...</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : null
                                    }
                                </div>
                            </div>
                        }
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={pageSize}
                            totalItemsCount={count}
                            // pageRangeDisplayed={5}
                            onChange={PaginationFunction}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                </div>

            </div>
        </main>
    )
}