import {useEffect, useState} from 'react';
import queryString from "query-string";


import Style from "./employmentAdvertisementSingle.module.css";
import {generateURL} from "../../global/Requests";
import HtmlComponent from "../../global/EditorToHTML";
// import {serverTimeToNewsDate} from "../../global/TimeConverter";
import CloseIcon from "../imgs/cancel.png";
import {useHistory} from "react-router-dom";

let axios = require("axios");

export default function EmploymentAdvertisementSingle() {
    const history = useHistory();
    const [title, setTitle] = useState();
    const [shortDesc, setShortDesc] = useState();
    const [date, setDate] = useState();
    const [description, setDescription] = useState();
    const [branches, setBranches] = useState([]);
    const [cover, setCover] = useState();
    const [newsID, setNewsID] = useState();


    useEffect(function () {
        /* get news id */
        const url = queryString.parse(window.location.search);
        const id = parseInt(url.id);
        setNewsID(id);
        const entity = url.entity

        console.log((entity))
        var data = JSON.stringify({
            "Id": id,
            "LookingForEntity": entity
        });

        var config = {
            method: 'post',
            url: generateURL("News/GetNewsByIdClientSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log((response.data));
                let data = response.data.data;

                setCover(data.defImgSource);
                setShortDesc(data.shortDesc);
                // setDate(serverTimeToNewsDate(data.insertTime));
                setTitle(data.title);
                setDescription(data.description);
                setBranches(data.subBranches)

            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    return (
        <main className={Style.main}>
            <div className="container-fluid">
                <div className={Style.hero + " px-5"}>
                    <h3 className="text-center">{title}</h3>
                    <p className={Style["date-of-news"] + " text-right pt-3"}>{date}</p>
                    <div
                        className="row py-4 d-flex justify-content-center align-items-center text-md-right text-center">
                        <div className="col-md-4 pb-5 pb-md-0">
                            <img src={cover} className="w-100" alt=""/>
                        </div>
                        <div className="col-md-8 py-md-3" style={{lineHeight: "26px"}}>
                            <p><b>{shortDesc}</b></p>
                        </div>
                    </div>
                </div>
                <div className={Style["article"] + " text-right container my-4"}>
                    <div className={Style["article-row"] + " row d-flex justify-content-center align-items-center text-md-right text-center"}>
                        {
                            description !== undefined && description !== null ?
                                <HtmlComponent val={description} /> : null
                        }
                    </div>
                </div>
                <div className={Style["article"] + " text-right container my-4 "}>
                    <div className="row dir-rtl" style={{direction: "rtl"}}>
                        <div className="col-4"></div>
                        <div className={Style["date-of-news"] + " text-left row col-8"}>
                            <div className="col-lg-2">کد خبر : {newsID}</div>
                            <div
                                className="pr-5  col-12 col-lg-10 row dir-ltr">دسته بندی :{
                                branches.length > 0 ?
                                    branches.map((item, index) => (
                                        <div className={Style["branch-tags"] + " px-3 py-2 mx-1 mt-1"}>
                                        <span className="ml-2" onClick={() => { history.push({
                                            // pathname:
                                        })
                                        }}></span>
                                            {item.name}
                                        </div>
                                    )) : null
                            }</div>
                        </div>

                    </div>

                </div>
                {/*<div className={Style["comments"] + " container text-right"}>*/}
                {/*    <h6>نظرات</h6>*/}
                {/*    <div className="row">*/}
                {/*        <div className={Style["user-name"] + " col-lg-6 py-2 text-right"}>*/}
                {/*            <input type="text" className="form-control" placeholder="نام و نام خانوادگی"/>*/}
                {/*        </div>*/}
                {/*        <div className="col-lg-6 py-2 text-md-left text-center">*/}
                {/*            <img src="assets/imgs/Group 119.png" alt=""/>*/}
                {/*        </div>*/}
                {/*        <div className="col-12 py-2">*/}
                {/*            <textarea className="p-2 w-100" name="" id="" cols="30" rows="6"*/}
                {/*                      placeholder="نظر شما"></textarea>*/}
                {/*        </div>*/}
                {/*        <div className={Style["send-comment"] + " col-12 py-2 text-md-left text-center"}>*/}
                {/*            <button className="btn">ارسال</button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </main>
    )
}