import Style from "./courses-single.module.css";

import  {useEffect, useState} from 'react';
import {generateURL} from "../../global/Requests";
import queryString from "query-string";

let axios = require('axios');

export default function CoursesSingle() {
    const [courseID, setCourseID] = useState();


    useEffect(function () {

        /* get course id */
        const url = queryString.parse(window.location.search);
        const id = parseInt(url.id);
        setCourseID(id);

        let course_config = {
            method: 'get',
            url: generateURL("course/getCourseClient/getbuy?id=") + id,
            headers: { }
        };

        axios(course_config)
            .then(function (response) {
                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    return (
        <main className="main text-center">
            <div className="container-fluid">
                <div className={Style.hero}>
                    <h3>لورم ایپسوم متن ساختگی با تولید</h3>
                    <div className={Style["first-part"] + " row d-flex justify-content-center align-items-center"}>
                        <div className={Style["first-part-text"] + " col-md-6 col-12"}>
                            <img src="assets/imgs/Ellipse (1).png" alt=""/>
                            <h5>سینا علیزاده <br/> استاد مشاور دانشگاه تهران</h5>
                            <p className=" w-100 mx-auto"> بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در
                                شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا
                                با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
                                خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت
                                که تمام و دشواری موجود در ارائه راهکارها</p>
                        </div>
                        <div className="col-md-6 col-12 first-part-img">
                            <img src="assets/imgs/Image.png" alt=""/>
                        </div>
                    </div>
                    <div className={Style["description"] + " container py-5"}>
                        <p>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                            است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                            تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
                            در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                            افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
                            فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
                            شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی</p>
                    </div>
                </div>
                <div className={Style["course-register"] + " container "}>
                    <div className="text-right">
                        <span className="font-weight-bold d-block">ظرفیت : 30 نفر</span>
                        <span
                            className="font-weight-bold pl-md-5 d-md-inline d-block">تاریخ شروع ثبت نام : 1400/05/15</span>
                        <span
                            className="font-weight-bold pr-md-5 d-md-inline d-block">تاریخ پایان ثبت نام : 1400/05/15</span>
                        <span className="font-weight-bold d-block">مخصوص کاربران : عادی</span>
                        <span
                            className="font-weight-bold d-block">نام انجمن برگزار کننده : انجمن  کامپیوتر خلیج فارس</span>
                        <span
                            className="font-weight-bold pl-md-5 d-md-inline d-block">تاریخ شروع دوره : 1400/05/15</span>
                        <span
                            className="font-weight-bold pr-md-5 d-md-inline d-block">تاریخ پایان ثبت  : 1400/05/15</span>
                        <span className="font-weight-bold d-block">نحوه برگزاری : آنلاین</span>
                        <span className="font-weight-bold d-block">هزینه دوره : 500 هزار تومان</span>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-12  text-right">
                            <label htmlFor="" className="font-weight-bold pl-3">کد تخفیف دارید ؟</label>
                            <input type="text" className="form-control d-md-inline"/>
                            <button className={Style["apply-off"] + " btn d-md-inline"}>ثبت</button>
                        </div>
                        <div className="col-lg-6 col-12 text-md-left ">
                            <button className="btn register-btn">ثبت نام</button>
                        </div>
                    </div>
                </div>
                <div className={Style["more-courses"] + " container text-right"}>
                    <h5>دوره های مشابه</h5>
                    <div className={Style["courses-crousel"] + " row"}>
                        <div className={Style["courses"] + " " + Style["course-even"] + " py-4  col-lg-4 col-md-6 col-12"}>
                            <div className="container">
                                <div className="row">
                                    <div className={Style["course-img"] + " col-12"}>
                                        <img src="assets/imgs/Image (3).png" alt=""/>
                                    </div>
                                    <div className={Style["courses-text"] + " col-1"}>
                                        <h2 className="mx-auto py-3">متن ساختگی با تولید لورم ایپسوم</h2>
                                        <p className="text-right">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                            چاپ و با استفاده از طراحان گرافیک است.</p>
                                        <div className="text-left ml-2">
                                            <button className="btn">اطلاعات بیشتر</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style["courses"] + " " + Style["course-odd"] + " py-4  col-lg-4 col-md-6 col-12"}>
                            <div className="container">
                                <div className="row">
                                    <div className={Style["course-img"] + " col-12"}>
                                        <img src="assets/imgs/Image (3).png" alt=""/>
                                    </div>
                                    <div className={Style["courses-text"] + " col-1"}>
                                        <h2 className="mx-auto py-3">متن ساختگی با تولید لورم ایپسوم</h2>
                                        <p className="text-right">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                            چاپ و با استفاده از طراحان گرافیک است.</p>
                                        <div className="text-left ml-2">
                                            <button className="btn">اطلاعات بیشتر</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style["courses"] + " " + Style["course-even"] + " py-4  col-lg-4 col-md-6 col-12"}>
                            <div className="container">
                                <div className="row">
                                    <div className={Style["course-img"] + " col-12"}>
                                        <img src="assets/imgs/Image (3).png" alt=""/>
                                    </div>
                                    <div className={Style["courses-text"] + " col-1"}>
                                        <h2 className="mx-auto py-3">متن ساختگی با تولید لورم ایپسوم</h2>
                                        <p className="text-right">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                            چاپ و با استفاده از طراحان گرافیک است.</p>
                                        <div className="text-left ml-2">
                                            <button className="btn">اطلاعات بیشتر</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="dots text-center pt-3">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot acitve"></span>
                        <span className="dot"></span>
                    </div>
                </div>
                {/*<div className="comments container text-right">*/}
                {/*    <h6>نظرات</h6>*/}
                {/*    <div className="row">*/}
                {/*        <div className="col-lg-6 py-2 text-right user-name">*/}
                {/*            <input type="text" className="form-control" placeholder="نام و نام خانوادگی"/>*/}
                {/*        </div>*/}
                {/*        <div className="col-lg-6 py-2 text-left">*/}
                {/*            <img src="assets/imgs/Group 119.png" alt=""/>*/}
                {/*        </div>*/}
                {/*        <div className="col-12 py-2">*/}
                {/*            <textarea className="p-2 w-100" name="" id="" cols="30" rows="6"*/}
                {/*                      placeholder="نظر شما"></textarea>*/}
                {/*        </div>*/}
                {/*        <div className="col-12 py-2 text-left send-comment">*/}
                {/*            <button className="btn">ارسال</button>*/}
                {/*        </div>*/}
                {/*        <div className="col-12 py-2">*/}
                {/*            <div className="comment m-1 row d-flex justify-content-center align-items-center">*/}
                {/*                <div className="col-md-8 px-3 pt-3">*/}
                {/*                    <p><B class="d-block">نگین شریفی</B>*/}
                {/*                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان*/}
                {/*                        گرافیک است.</p>*/}
                {/*                </div>*/}
                {/*                <div className="col-md-4 px-3 pt-3 text-left">*/}
                {/*                    <img src="assets/imgs/Group 148.png" alt=""/>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="col-12 py-2">*/}
                {/*            <div className="comment m-1 row d-flex justify-content-center align-items-center">*/}
                {/*                <div className="col-md-8 px-3 pt-3">*/}
                {/*                    <p><B class="d-block">نگین شریفی</B>*/}
                {/*                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان*/}
                {/*                        گرافیک است.</p>*/}
                {/*                </div>*/}
                {/*                <div className="col-md-4 px-3 pt-3 text-left">*/}
                {/*                    <img src="assets/imgs/Group 148.png" alt=""/>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="col-12 py-2">*/}
                {/*            <div className="comment m-1 row d-flex justify-content-center align-items-center">*/}
                {/*                <div className="col-md-8 px-3 pt-3">*/}
                {/*                    <p><B class="d-block">نگین شریفی</B>*/}
                {/*                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان*/}
                {/*                        گرافیک است.</p>*/}
                {/*                </div>*/}
                {/*                <div className="col-md-4 px-3 pt-3 text-left">*/}
                {/*                    <img src="assets/imgs/Group 148.png" alt=""/>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </main>
    )
}