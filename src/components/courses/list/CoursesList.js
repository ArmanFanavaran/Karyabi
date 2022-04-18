import Style from "./courses-list.module.css";
import Style2 from "./courses-list2.module.css";

import GridIcon from "../imgs/Group 106.png";
import ListIcon from "../imgs/Group 107.png";
import CloseIcon from "../../news/imgs/cancel.png";

import {useEffect, useState, useRef} from 'react';
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";
import {generateURL} from "../../global/Requests";
import Multiselect from 'multiselect-react-dropdown';

import $ from "jquery";

let axios = require('axios');


export default function CoursesList() {
    const branchRef = useRef();
    const subbranchRef = useRef();
    const majorRef = useRef();
    const [isGrid, setIsGrid] = useState(true);
    const [coursesList, setCoursesList] = useState([]);
    const [lastCourses, setLastCourses] = useState([]);
    const [orderFilters, setOrderFilters] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [degree, setDegree] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [branch, setBranch] = useState([]);
    const [branches, setBranches] = useState([]);
    const [subbranch, setSubbranch] = useState([]);
    const [subbranches, setSubbranches] = useState([]);
    const [major, setMajor] = useState([]);
    const [majors, setMajors] = useState([]);
    const [university, setUniversity] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [sortDate, setSortData] = useState("");
    const [sortView, setSortView] = useState("");
    const [sortSoldOut, setSortSoldOut] = useState("");
    const [sortPrice, setSortPrice] = useState("");
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 12;
    const multiSelectStyle = {
        background: "#00ff00 !important",
        borderRadius: "10px",
        height: "30px",
        border: "none",
        outline: "none",
        padding: "5px 20px",
        margin: " 0 auto",
        width: "100%"
    }

    const onSelectUniversity = (selectedList, selectedItem) => {
        let selected_IDs = [];
        for (let i=0; i< selectedList.length; i++) {
            selected_IDs.push(selectedList[i].id);
        }

        setUniversity(selected_IDs);

        /*getting courses*/
        let list_data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": searchKey,
            "UniversityIds": selected_IDs,
            "DegreeIds": degree,
            "BranchIds": subbranch,
            "SubBranchIds": subbranch,
            "MajorIds": major,
            "SortByDate": sortDate,
            "SortByView": sortView,
            "SortBySoldOut": sortSoldOut,
            "SortByPrice": sortPrice,
            "ByProvider": "",
            "ProviderId": 0
        });

        let list_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {
                setCoursesList(response.data.data);

                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        var count_config = {
            method: 'post',
            url: generateURL("course/getCourseCountClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    const onSelectMajor = (selectedList, selectedItem) => {
        let selected_IDs = [];
        for (let i=0; i< selectedList.length; i++) {
            selected_IDs.push(selectedList[i].id);
        }

        setMajor(selected_IDs);

        /*getting courses*/
        let list_data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": searchKey,
            "UniversityIds": university,
            "DegreeIds": degree,
            "BranchIds": subbranch,
            "SubBranchIds": subbranch,
            "MajorIds": selected_IDs,
            "SortByDate": sortDate,
            "SortByView": sortView,
            "SortBySoldOut": sortSoldOut,
            "SortByPrice": sortPrice,
            "ByProvider": "",
            "ProviderId": 0
        });

        let list_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {
                setCoursesList(response.data.data);

                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        var count_config = {
            method: 'post',
            url: generateURL("course/getCourseCountClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const onRemoveMajor = (selectedList, removedItem) => {
        let selected_IDs = [];
        for (let i=0; i< selectedList.length; i++) {
            selected_IDs.push(selectedList[i].id);
        }

        setMajor(selected_IDs);

        /*getting courses*/
        let list_data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": searchKey,
            "UniversityIds": university,
            "DegreeIds": degree,
            "BranchIds": branch,
            "SubBranchIds": subbranch,
            "MajorIds": major,
            "SortByDate": sortDate,
            "SortByView": sortView,
            "SortBySoldOut": sortSoldOut,
            "SortByPrice": sortPrice,
            "ByProvider": "",
            "ProviderId": 0
        });

        let list_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {
                setCoursesList(response.data.data);

                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        let count_config = {
            method: 'post',
            url: generateURL("course/getCourseCountClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        //TODO Reset other select boxes
    }

    const onSelectSubbranch = (selectedList, selectedItem) => {
        let selected_IDs = [];
        for (let i=0; i< selectedList.length; i++) {
            selected_IDs.push(selectedList[i].id);
        }

        setSubbranch(selected_IDs);

        /*getting courses*/
        let list_data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": searchKey,
            "UniversityIds": university,
            "DegreeIds": degree,
            "BranchIds": subbranch,
            "SubBranchIds": selected_IDs,
            "MajorIds": major,
            "SortByDate": sortDate,
            "SortByView": sortView,
            "SortBySoldOut": sortSoldOut,
            "SortByPrice": sortPrice,
            "ByProvider": "",
            "ProviderId": 0
        });

        let list_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {
                setCoursesList(response.data.data);

                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        var count_config = {
            method: 'post',
            url: generateURL("course/getCourseCountClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        /*getting majors*/
        let data = JSON.stringify({
            "subBranchIds": selected_IDs
        });

        let config = {
            method: 'post',
            url: generateURL("HelpingData/GetMajorNameList"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setMajors(response.data.data);
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const onRemoveSubbranch = (selectedList, removedItem) => {
        let selected_IDs = [];
        for (let i=0; i< selectedList.length; i++) {
            selected_IDs.push(selectedList[i].id);
        }

        setSubbranch(selected_IDs);

        /*getting courses*/
        let list_data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": searchKey,
            "UniversityIds": university,
            "DegreeIds": degree,
            "BranchIds": branch,
            "SubBranchIds": selected_IDs,
            "MajorIds": [],
            "SortByDate": sortDate,
            "SortByView": sortView,
            "SortBySoldOut": sortSoldOut,
            "SortByPrice": sortPrice,
            "ByProvider": "",
            "ProviderId": 0
        });

        let list_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {
                setCoursesList(response.data.data);

                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        let count_config = {
            method: 'post',
            url: generateURL("course/getCourseCountClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        /*getting majors*/
        let data = JSON.stringify({
            "subBranchIds": selected_IDs
        });

        var config = {
            method: 'post',
            url: generateURL("HelpingData/GetMajorNameList"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setMajors(response.data.data);
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        setMajor([]);
        majorRef.current.resetSelectedValues();
    }

    const onSelectBranch = (selectedList, selectedItem) =>  {
        let selected_IDs = [];
        for (let i=0; i< selectedList.length; i++) {
            selected_IDs.push(selectedList[i].id);
        }

        setBranch(selected_IDs);

        /*getting courses*/
        let list_data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": searchKey,
            "UniversityIds": university,
            "DegreeIds": degree,
            "BranchIds": selected_IDs,
            "SubBranchIds": subbranch,
            "MajorIds": major,
            "SortByDate": sortDate,
            "SortByView": sortView,
            "SortBySoldOut": sortSoldOut,
            "SortByPrice": sortPrice,
            "ByProvider": "",
            "ProviderId": 0
        });

        let list_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {
                setCoursesList(response.data.data);

                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        var count_config = {
            method: 'post',
            url: generateURL("course/getCourseCountClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        /*getting subbranches*/
        let data = JSON.stringify({
            "BranchIds": selected_IDs
        });

        let config = {
            method: 'post',
            url: generateURL("HelpingData/GetSubBranchLis"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setSubbranches(response.data.data);
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const onRemoveBranch = (selectedList, removedItem) => {
        let selected_IDs = [];
        for (let i=0; i< selectedList.length; i++) {
            selected_IDs.push(selectedList[i].id);
        }

        setBranch(selected_IDs);

        /*getting courses*/
        let list_data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": searchKey,
            "UniversityIds": university,
            "DegreeIds": degree,
            "BranchIds": selected_IDs,
            "SubBranchIds": [],
            "MajorIds": [],
            "SortByDate": sortDate,
            "SortByView": sortView,
            "SortBySoldOut": sortSoldOut,
            "SortByPrice": sortPrice,
            "ByProvider": "",
            "ProviderId": 0
        });

        let list_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {
                setCoursesList(response.data.data);

                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        let count_config = {
            method: 'post',
            url: generateURL("course/getCourseCountClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        /*getting subbranches*/
        let data = JSON.stringify({
            "BranchIds": selected_IDs
        });

        var config = {
            method: 'post',
            url: generateURL("HelpingData/GetSubBranchLis"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setSubbranches(response.data.data);
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        setSubbranch([]);
        setMajor([]);
        subbranchRef.current.resetSelectedValues();
        majorRef.current.resetSelectedValues();
    }

    const onSelectDegree = (selectedList, selectedItem) => {
        let selected_IDs = [];
        for (let i=0; i< selectedList.length; i++) {
            selected_IDs.push(selectedList[i].id);
        }

        setDegree(selected_IDs);

        /*getting courses*/
        let list_data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": searchKey,
            "UniversityIds": university,
            "DegreeIds": selected_IDs,
            "BranchIds": branch,
            "SubBranchIds": subbranch,
            "MajorIds": major,
            "SortByDate": sortDate,
            "SortByView": sortView,
            "SortBySoldOut": sortSoldOut,
            "SortByPrice": sortPrice,
            "ByProvider": "",
            "ProviderId": 0
        });

        let list_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {
                setCoursesList(response.data.data);

                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        let count_config = {
            method: 'post',
            url: generateURL("course/getCourseCountClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        /*getting branches*/
        let data = JSON.stringify({
            "degreeIds": selected_IDs
        });

        let config = {
            method: 'post',
            url: generateURL("HelpingData/GetBranchList"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setBranches(response.data.data);
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const onRemoveDegree = (selectedList, removedItem) => {
        let selected_IDs = [];
        for (let i=0; i< selectedList.length; i++) {
            selected_IDs.push(selectedList[i].id);
        }

        setDegree(selected_IDs);

        /*getting courses*/
        let list_data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": searchKey,
            "UniversityIds": university,
            "DegreeIds": selected_IDs,
            "BranchIds": [],
            "SubBranchIds": [],
            "MajorIds": [],
            "SortByDate": sortDate,
            "SortByView": sortView,
            "SortBySoldOut": sortSoldOut,
            "SortByPrice": sortPrice,
            "ByProvider": "",
            "ProviderId": 0
        });

        let list_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {
                setCoursesList(response.data.data);

                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        let count_config = {
            method: 'post',
            url: generateURL("course/getCourseCountClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        /*getting branches*/
        let data = JSON.stringify({
            "degreeIds": selected_IDs
        });

        let config = {
            method: 'post',
            url: generateURL("HelpingData/GetBranchList"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setBranches(response.data.data);
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        setBranch([]);
        setSubbranch([]);
        setMajor([]);
        branchRef.current.resetSelectedValues();
        subbranchRef.current.resetSelectedValues();
        majorRef.current.resetSelectedValues();
    }

    const onSearch = (event) => {
        let value = $(event.target).val();

        /* sending data */
        let data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": value,
            "UniversityIds": university,
            "DegreeIds": degree,
            "BranchIds": branch,
            "SubBranchIds": subbranch,
            "MajorIds": major,
            "SortByDate": sortDate,
            "SortByView": sortView,
            "SortBySoldOut": sortSoldOut,
            "SortByPrice": sortPrice,
            "ByProvider": "",
            "ProviderId": 0
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
                setCoursesList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        let count_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
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
        setSearchKey(value);

    }

    const onClickMoreBranches = () => {
        let coll = document.getElementsByClassName("collapsible-content")[0];

        if (coll.style.height === "300px") {
            coll.style.height = "fit-content";
        } else {
            coll.style.height = "300px";
        }

    }

    const PaginationFunction = (page) => {
        /* sending data */

    }

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

        /*get data*/


        setPage(1);
    }

    useEffect(() => {

        $(".multiselect-container").attr("style", "float: unset !important")

        /*get courses list*/
        let list_data = JSON.stringify({
            "Page": 1,
            "PageSize": pageSize,
            "SearchKey": "",
            "UniversityIds": [],
            "DegreeIds": [],
            "BranchIds": [],
            "SubBranchIds": [],
            "MajorIds": [],
            "SortByDate": "",
            "SortByView": "",
            "SortBySoldOut": "",
            "SortByPrice": "",
            "ByProvider": "",
            "ProviderId": 0
        });

        let list_config = {
            method: 'post',
            url: generateURL("course/getCourseListClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(list_config)
            .then(function (response) {

                let data = response.data.data;
                setCoursesList(data);
                let latest = [];
                for (let i = 0; i<data.length && i<3; i++) {
                    latest.push(data[i]);
                }
                setLastCourses(latest);
                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });


        /*get courses count*/

        var count_config = {
            method: 'post',
            url: generateURL("course/getCourseCountClient"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: list_data
        };

        axios(count_config)
            .then(function (response) {
                setCount(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        /*get order by Filters*/
        var order_config = {
            method: 'get',
            url: generateURL("/course/GetCourseSortFilter"),
            headers: {}
        };

        axios(order_config)
            .then(function (response) {
                setOrderFilters(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        /*get degree list*/
        let degree_config = {
            method: 'get',
            url: generateURL("HelpingData/GetDegreeList"),
            headers: { }
        };

        axios(degree_config)
            .then(function (response) {
                setDegrees(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        /*get universities*/
        var data = JSON.stringify({
            "name": ""
        });

        var config = {
            method: 'post',
            url: generateURL("HelpingData/GetUniversitiesList"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setUniversities(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });


    }, []);

    return (
        <main className={Style.main + " text-center"} >
            <div className="container-fluid pb-5">
                <h3>دوره‌ها</h3>
                <div className={Style.hero + " px-5"}>
                    <div className="container">
                        {
                            lastCourses.length > 0 ?
                                <div className="row d-flex justify-content-center align-items-center">
                                    <div className="col-lg-6 pt-lg-4">
                                        <img src={lastCourses[0].defImgSource} alt="" className="w-100"/>
                                    </div>
                                    <div className="col-lg-6 text-right">
                                        {
                                            lastCourses.map((item, index) => (
                                                <div
                                                    className={Style["importent-news"] + " row py-2 d-flex justify-content-center align-items-center"}>
                                                    <div className="col-md-3 p-md-0 p-2">
                                                        <img src={item.defImgSource} alt="" className="rounded"/>
                                                    </div>
                                                    <div className="col-md-9 p-md-0 p-2">
                                                        <Link to={{
                                                            pathname: "/courses/single",
                                                            search: "id=" + item.courseId + "&" + "title=" + item.title
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
                    {/*<div className={Style["sort-items"] + " text-right d-inline col-6 col-md-10"}>*/}
                    {/*    <span>مرتب سازی بر اساس :</span>*/}
                    {/*    <div className="d-lg-inline d-none orders-parent">*/}
                    {/*        {*/}
                    {/*            orderFilters.length > 0 ?*/}
                    {/*                orderFilters.map((item, i) => (*/}
                    {/*                    <a className="" onClick={onOrderClick}>{item}</a>*/}
                    {/*                )) : null*/}
                    {/*        }*/}
                    {/*        /!*<a href="" className={Style.active}>جدیدترین</a>*!/*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={Style["sort-imgs"] + " d-inline text-left col-6 col-md-2"}>
                        <img src={GridIcon} alt="" onClick={onGridClick}/><img src={ListIcon} alt=""
                                                                               onClick={onListClick}/>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className={Style["fields-div"] + " my-3 d-md-block d-none"}>
                            <div className="fields-header">
                                <span>جستجو در نتایج</span>
                            </div>
                            <div className={Style["search-in-results-div"]}>
                                <input type="text" onChange={onSearch} className={Style["search-in-results"]} placeholder="جستجو"/>
                            </div>
                        </div>
                        <div className={Style["fields-div"] + " my-3 d-md-block d-none"}>
                            <div className="fields-header">
                                <span>دانشگاه</span>
                            </div>
                            <div className={Style["search-in-results-div"]}>
                                <Multiselect
                                    options={universities}
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    onSelect={onSelectUniversity}
                                    onRemove={onSelectUniversity}
                                    displayValue="name"
                                    style={multiSelectStyle}
                                    placeholder={"انتخاب دانشگاه"}
                                />
                                {/*<input type="text" onChange={onSearch} className={Style["search-in-results"]} placeholder="جستجو"/>*/}
                            </div>
                        </div>
                        <div className={Style["fields-div"] + " my-3 d-md-block d-none"}>
                            <div className="fields-header">
                                <span>مدرک</span>
                            </div>
                            <div className={Style["search-in-results-div"]}>
                                <Multiselect
                                    options={degrees}
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    onSelect={onSelectDegree}
                                    onRemove={onRemoveDegree}
                                    displayValue="name"
                                    style={multiSelectStyle}
                                    placeholder={"انتخاب مدرک"}
                                />
                                {/*<input type="text" onChange={onSearch} className={Style["search-in-results"]} placeholder="جستجو"/>*/}
                            </div>
                        </div>
                        <div className={Style["fields-div"] + " my-3 d-md-block d-none"}>
                            <div className="fields-header">
                                <span>شاخه</span>
                            </div>
                            <div className={Style["search-in-results-div"]}>
                                <Multiselect
                                    options={branches}
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    onSelect={onSelectBranch}
                                    onRemove={onRemoveBranch}
                                    displayValue="name"
                                    placeholder={"انتخاب شاخه"}
                                    emptyRecordMsg={"ابتدا مدرک را انتخاب کنید."}
                                    ref={branchRef}
                                />
                                {/*<input type="text" onChange={onSearch} className={Style["search-in-results"]} placeholder="جستجو"/>*/}
                            </div>
                        </div>
                        <div className={Style["fields-div"] + " my-3 d-md-block d-none"}>
                            <div className="fields-header">
                                <span>رشته</span>
                            </div>
                            <div className={Style["search-in-results-div"]}>
                                <Multiselect
                                    options={subbranches}
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    onSelect={onSelectSubbranch}
                                    onRemove={onRemoveSubbranch}
                                    displayValue="name"
                                    placeholder={"انتخاب رشته"}
                                    emptyRecordMsg={"ابتدا شاخه را انتخاب کنید."}
                                    ref={subbranchRef}
                                />
                                {/*<input type="text" onChange={onSearch} className={Style["search-in-results"]} placeholder="جستجو"/>*/}
                            </div>
                        </div>
                        <div className={Style["fields-div"] + " my-3 d-md-block d-none"}>
                            <div className="fields-header">
                                <span>گرایش</span>
                            </div>
                            <div className={Style["search-in-results-div"]}>
                                <Multiselect
                                    options={majors}
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    onSelect={onSelectMajor}
                                    onRemove={onRemoveMajor}
                                    displayValue="name"
                                    placeholder={"انتخاب گرایش"}
                                    emptyRecordMsg={"ابتدا رشته را انتخاب کنید."}
                                    ref={majorRef}
                                />
                                {/*<input type="text" onChange={onSearch} className={Style["search-in-results"]} placeholder="جستجو"/>*/}
                            </div>
                        </div>

                    </div>

                    <div className="col-md-9">
                        {!isGrid ?
                            <div className={Style["news-list"]}>
                                {
                                    coursesList.length > 0 ?
                                        coursesList.map((item, index) => (
                                            <div
                                                className={Style["news-item"] + " " + (index % 2 === 0 ? Style["news-item-even"] : Style["news-item-odd"]) + "  my-3"}>
                                                <div className="row d-flex justify-content-center align-items-center ">
                                                    <div className="col-12 col-lg-3 col-md-5">
                                                        <div className={Style["news-item-img"] + " text-center p-lg-4"}>
                                                            <img src={item.mainPicAddress} alt="" className=""/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-7">
                                                        <div className={Style["news-item-text"]}>
                                                            <div className="pl-md-5">
                                                                <h6 className="text-right">{item.title}</h6>
                                                                <p className="text-right">{item.shortDesc}</p>
                                                                <div className="text-left">
                                                                    <Link to={{
                                                                        pathname: "/courses/single",
                                                                        search: "id=" + item.courseId + "&" + "title=" + item.title
                                                                    }} className="btn">جزئیات دوره ...</Link>
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
                                        coursesList.length > 0 ?
                                            coursesList.map((item, index) => (
                                                <div
                                                    className={Style2["news"] + " " + (index % 2 === 0 ? Style2["news-even"] : Style2["news-odd"]) + " py-2 col-lg-4 col-md-6 col-12"}>
                                                    <div className={Style2["container-item"] + " container"}>
                                                        <div className="row">
                                                            <div className={Style2["news-img"] + " col-12"}>
                                                                <img src={item.mainPicAddress} alt=""/>
                                                            </div>
                                                            <div className={Style2["news-text"] + " col-12"}>
                                                                <h2 className="py-2">{item.title}</h2>
                                                                <p className="text-right">{item.shortDesc}</p>
                                                                <div className="text-left">
                                                                    <Link to={{
                                                                        pathname: "/courses/single",
                                                                        search: "id=" + item.courseId + "&" + "title=" + item.title
                                                                    }}
                                                                          className="btn">جزئیات دوره ...</Link>
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
    );

}