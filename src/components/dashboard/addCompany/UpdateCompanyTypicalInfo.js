import Style from "./addCompany.module.css";
import React, {useEffect, useState} from "react";
import {generateURL} from "../../global/Requests";
import queryString, {parse} from "query-string";
import * as $ from "jquery";
import "bootstrap-icons/font/bootstrap-icons.css";
import {NotificationManager, NotificationContainer} from "react-notifications";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import MainPic from "../../company/imgs/sampleaminpic.jpg"
import {getSizeImageItems} from "../../SizeImageList/SizeImageList";
import {MoonLoader} from "react-spinners";
import {css} from "@emotion/react";
import {getRoutesItems} from "../../RoutesList/RoutesList";


export default function UpdateCompanyTypicalInfo() {
    const history = useHistory();
    const [language, setLanguage] = useState();
    const [companyId, setCompanyId] = useState();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState({fa: "", eng: ""});
    const [address, setAddress] = useState();
    const [province, setProvince] = useState({fa: "", eng: ""});
    const [city, setCity] = useState({fa: "", eng: ""});
    const [minMembers, setMinMembers] = useState();
    const [maxMembers, setMaxMembers] = useState();
    const [category, setCategory] = useState({fa: "", eng: ""});
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [isKnowledge, setIsKnowledge] = useState(false);
    const [informPhone, setInformPhone] = useState(true);
    const [informEmail, setInformEmail] = useState(true);
    const [introduction, setIntroduction] = useState("");
    const [engIntroduction, setEngIntroduction] = useState("");
    const [workCultureEng, setWorkCultureEng] = useState("");
    const [workCulture, setWorkCulture] = useState("");
    const [cooperationBenefits, setCooperationBenefits] = useState("");
    const [cooperationBenefitsEng, setCooperationBenefitsEng] = useState("");
    const [logo, setLogo] = useState(MainPic);
    const [logoLoading, setLogoLoading] = useState(false);
    const [mainPic, setMainPic] = useState(MainPic);
    const [mainPicLoading, setMainPicLoading] = useState(false);
    const [website, setWebsite] = useState();
    const [foundation, setFoundation] = useState();
    const override = css`
      display: block;
      margin: 0 auto;
    `;

    const onSubmit = () => {
        let foundation_input = $("#foundation_input").val();
        if (foundation_input === "") foundation_input = 0;
        else foundation_input = parseInt(foundation_input);
        let min = $("#min_input").val();
        if (min === "") {
            NotificationManager.error("لطفا حداقل تعداد اعضا را مشخص کنید", "", 2000);
            return;
        }
        else min = parseInt(min);
        let max = $("#max_input").val();
        if (max === "") {
            NotificationManager.error("لطفا حداکثر تعداد اعضا را مشخص کنید", "", 2000);
            return;
        }
        else max = parseInt(max);
        let category = $("#category_input").val();
        if (category === undefined || category === null){
            NotificationManager.error("لظفا دسته‌بندی شرکت را انتخاب کنید", "", 2000);
            return;
        }
        else category = parseInt(category);

        let website_input = $("#website_input").val();
        let phone_input = $("#phone_input").val();
        let email_input = $("#email_input").val();

        let axios = require('axios');
        axios.defaults.withCredentials = true;

        let data = {
            "id": companyId,
            "roleId": 5,
            "foundationYear": foundation_input,
            "minMemberCount": min,
            "maxMemberCount": max,
            "webSiteAddress": website_input,
            "introduction": introduction,
            "introductionEnglish": engIntroduction,
            "workCulture": workCulture,
            "workCultureEnglish": workCultureEng,
            "cooperationBenefits": cooperationBenefits,
            "cooperationBenefitsEnglish": cooperationBenefitsEng,
            "mapLocation": null,
            "mobilePhone": phone_input,
            "email": email_input,
            "informViaEmail": informEmail,
            "informViaPhone": informPhone,
            "companyCategoryId": category
        }

        let config = {
            method: 'post',
            url: generateURL("/company/UpdateCompanyTypicalInfo"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };
        console.log(data)

        axios(config).then(function (response) {
            console.log(response.data)
            history.push({
                pathname: getRoutesItems().dashboardRequests.route,
                search: "lang=" + language
            })

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
                NotificationManager.error(error.response.data.message, '', 2000);
            } else {
                NotificationManager.error(error.response.data.Message, '', 2000);

            }
        })
    }

    const onUploadLogo = (event) => {
        setLogoLoading(true);
        let file = event.target.files[0];
        setLogo(URL.createObjectURL(event.target.files[0]));

        var FormData = require('form-data');
        var data = new FormData();
        data.append('id', companyId);
        data.append('roleId', 5);
        data.append('heights[0]', getSizeImageItems().companyLogo.Heights);
        data.append('widths[0]', getSizeImageItems().companyLogo.Widths);
        data.append('qualities[0]', getSizeImageItems().companyLogo.Qualities);
        data.append('picFile', file);

        console.log(data)

        let config = {
            method: 'post',
            url: generateURL("/Company/UpdateCompanyLogo"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        let axios = require('axios');
        axios.defaults.withCredentials = true;

        axios(config)
            .then(function (response) {
                setLogoLoading(false);
            })
            .catch(function (error) {
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i], '', 2000);
                        }
                    });

                } else if (error.response.data.message != null && error.response.data.message != undefined) {
                    NotificationManager.error(error.response.data.message, '', 2000);
                } else {
                    NotificationManager.error(error.response.data.Message, '', 2000);

                }
            });
    }

    const onUploadMainPic = (event) => {
        setMainPicLoading(true);
        let file = event.target.files[0];
        setMainPic(URL.createObjectURL(event.target.files[0]));

        var FormData = require('form-data');
        var data = new FormData();
        data.append('id', companyId);
        data.append('roleId', 5);
        data.append('heights[0]', getSizeImageItems().companyMainPic.Heights);
        data.append('widths[0]', getSizeImageItems().companyMainPic.Widths);
        data.append('qualities[0]', getSizeImageItems().companyMainPic.Qualities);
        data.append('picFile', file);

        console.log(data)

        let config = {
            method: 'post',
            url: generateURL("/Company/UpdateCompanyMainPic"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        let axios = require('axios');
        axios.defaults.withCredentials = true;

        axios(config)
            .then(function (response) {
                setMainPicLoading(false);
            })
            .catch(function (error) {
                let errors = error.response.data.errors;
                if (errors != null) {
                    Object.keys(errors).map((key, i) => {
                        for (var i = 0; i < errors[key].length; i++) {
                            NotificationManager.error(errors[key][i], '', 2000);
                        }
                    });

                } else if (error.response.data.message != null && error.response.data.message != undefined) {
                    NotificationManager.error(error.response.data.message, '', 2000);
                } else {
                    NotificationManager.error(error.response.data.Message, '', 2000);

                }
            });
    }

    useEffect(function (){
        const url = queryString.parse(window.location.search);
        setLanguage(url.lang);
        let company_id = parseInt(url.company);
        setCompanyId(company_id);


        let axios = require('axios');
        axios.defaults.withCredentials = true;

        /************** Company Default Data *************/
        let config_data = {
            "id": company_id,
            "roleId": 5,
            "logoPicDetail": {
                "heights": [
                    getSizeImageItems().companyLogo.Heights
                ],
                "widths": [
                    getSizeImageItems().companyLogo.Widths
                ],
                "qualities": [
                    getSizeImageItems().companyLogo.Qualities
                ]
            },
            "mainPicDetail": {
                "heights": [
                    getSizeImageItems().companyMainPic.Heights
                ],
                "widths": [
                    getSizeImageItems().companyMainPic.Widths
                ],
                "qualities": [
                    getSizeImageItems().companyMainPic.Qualities
                ]
            }
        }
        let config = {
            method: 'post',
            url: generateURL("/Company/GetCompanySinglePanelSide"),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(config_data)
        };
        axios(config)
            .then(function (response) {
                console.log(response.data.data)
                let data = response.data.data;
                setName({fa:data.name, eng:data.englishName});
                setAddress(data.address);
                setPhone(data.mobilePhone);
                setEmail(data.email);
                setMinMembers(data.minMemberCount);
                setMaxMembers(data.maxMemberCount);
                setProvince({fa:data.province.name, eng:data.province.englishName});
                setCity({fa:data.city.name, eng:data.city.englishName});
                setCategory(data.companyCategory.id);
                setIsKnowledge(data.isKnowledgeBase);
                setInformEmail(data.informViaEmail);
                setInformPhone(data.informViaPhone);
                setFoundation(data.foundationYear);
                setWebsite(data.webSiteAddress);
                if (data.introduction !== null)
                    setIntroduction(data.introduction);
                if (data.introductionEnglish !== null)
                    setEngIntroduction(data.introductionEnglish);
                if (data.workCulture !== null)
                    setWorkCulture(data.workCulture);
                if (data.workCultureEnglish !== null)
                    setWorkCultureEng(data.workCultureEnglish);
                if (data.cooperationBenefitsEnglish !== null)
                    setCooperationBenefitsEng(data.cooperationBenefitsEnglish);
                if (data.cooperationBenefits !== null)
                    setCooperationBenefits(data.cooperationBenefits);
                if (data.log !== null && data.logo !== '')
                    setLogo(data.logo);
                if (data.mainPic !== null && data.mainPic !== '')
                    setMainPic(data.mainPic);
            })
            .catch(function (error) {
            });

        /************** Category List *************/
        let category_config = {
            method: 'get',
            url: generateURL("/Side/GetCompanyCategoryList"),
            headers: {}
        };
        axios(category_config)
            .then(function (response) {
                console.log(response.data.data)
                setCategories(response.data.data);
            })
            .catch(function (error) {
            });


    }, []);

    return(
        <div>
            <h5 className={"change-text"}>تکمیل اطلاعات شرکت</h5>
            <div className={'row w-100 mx-0'}>
                <div className={'col-12 form-group change-dir mt-4'}>
                    <label className={'d-block change-text ' + Style.criticalLabel}>نام شرکت </label>
                    <div className={Style.criticalDefaultField + " change-text mt-2"}>
                        <span> {name.fa} </span>
                        <span className={'mx-3'}>|</span>
                        <span> {name.eng} </span>
                    </div>
                </div>

                <div className={'col-12 form-group change-dir mt-4'}>
                    <label className={'d-block change-text ' + Style.criticalLabel}>موقعیت شرکت</label>
                    <div className={Style.criticalDefaultField + " change-text mt-2"}>
                        {language === 'fa' ?
                            province.fa + " / " + city.fa :
                            province.eng + " / " + city.eng}
                    </div>
                    <div className={Style.criticalDefaultField + " change-text mt-3"}>
                        {address}
                    </div>
                </div>
                {/*<div className={'col-12 col-xl-6 form-group change-dir mt-4'}>*/}
                {/*    <label className={'d-block change-text ' + Style.criticalLabel}>شماره تلفن همراه</label>*/}
                {/*    <div className={Style.criticalDefaultField + " change-text mt-2"}>*/}
                {/*        {phone}*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className={'col-12 col-xl-6 form-group change-dir mt-4'}>*/}
                {/*    <label className={'d-block change-text ' + Style.criticalLabel}>ایمیل</label>*/}
                {/*    <div className={Style.criticalDefaultField + " change-text mt-2"}>*/}
                {/*        {email}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={'col-12 col-xl-4 mt-4 change-dir change-text'}>
                    {
                        isKnowledge && <label className={'d-block change-text '}>

                            <i className={'bi bi-check-lg text-success mx-2 ' + Style.knowledgeIcon}></i>
                            <span>شرکت دانش بنیان</span>
                        </label>

                    }

                </div>
                <div className={'d-flex mt-4 col-12'}>
                    <Link className={'btn btn-warning py-2 px-4'} to={{
                        pathname:getRoutesItems().updateCompanyCriticalInfo.route,
                        search:"lang=" + language + "&company=" + companyId
                    }} >ویرایش اطلاعات اولیه</Link>
                </div>
            </div>
            <h5 className={"change-text mt-5"}>اطلاعات تکمیلی</h5>
            <div className={'row w-100 mx-0'}>
                <div className={'col-12 col-xl-6 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>سال تاسیس</label>
                    <input type={'number'} className={'form-control'} id={'foundation_input'} defaultValue={foundation}/>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>آدرس وبسایت</label>
                    <input type={'text'} className={'form-control'} id={'website_input'} defaultValue={website}/>
                </div>
                <div className={'col-6 col-xl-3 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>حداقل تعداد اعضا</label>
                    <input type={'number'} className={'form-control text-left'} id={'min_input'} defaultValue={minMembers}/>
                </div>
                <div className={'col-6 col-xl-3 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>حداکثر تعداد اعضا</label>
                    <input type={'number'} className={'form-control text-left'} id={'max_input'} defaultValue={maxMembers}/>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>دسته‌بندی</label>
                    { category !== undefined &&
                        <select className={'form-control'} id={'category_input'}>
                            <option selected={true} disabled={true}>انتخاب...</option>
                            {
                                categories.map((item) => (
                                    <option selected={item.id === category} value={item.id} >{language === 'fa' ? item.name: item.englishName}</option>
                                ))
                            }
                        </select>
                    }
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>شماره تلفن همراه</label>
                    <input type={'text'} className={'form-control text-left'} id={'phone_input'} defaultValue={phone}/>
                </div>
                <div className={'col-12 col-xl-6 form-group change-dir mt-4'}>
                    <label className={'d-block change-text'}>ایمیل</label>
                    <input type={'email'} className={'form-control text-left'} id={'email_input'} defaultValue={email}/>
                </div>
                <div className={'col-12 col-xl-4 mt-4 change-dir change-text'}>
                    {informPhone ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setInformPhone(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setInformPhone(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>اطلاع‌رسانی از طریق پیامک</label>
                </div>
                <div className={'col-12 col-xl-4 mt-4 change-dir change-text'}>
                    {informEmail ?
                        <button className={"mx-3 btn text-white "+ Style.toggleBtn }
                                onClick={() => {
                                    setInformEmail(false)
                                }}><i className="fas fa-toggle-on"></i></button>:
                        <button className={"mx-3 btn text-white btn-secondary "  }
                                onClick={() => {
                                    setInformEmail(true)
                                }}><i className="fas fa-toggle-on"></i></button>}

                    <label>اطلاع‌رسانی از طریق ایمیل</label>
                </div>

            </div>
            <Accordion allowZeroExpanded>
                <AccordionItem >
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <hr/>
                            <h6 className={'change-text change-dir py-2'}>
                                <span>تصاویر شرکت</span>
                                <i className={'bi bi-caret-down-fill'}></i>
                            </h6>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className={'mt-4 change-text change-dir'}>
                            <h6>لوگو:</h6>
                            <div className={'row w-100 mx-0'}>
                                <img className={Style.logoPreview + " img-thumbnail rounded"} src={logo} />
                                <div className={'d-flex'}>
                                    <div><button className={'btn btn-info py-2 px-4 mx-4'} onClick={() => {
                                        $("#logo_input").click();
                                    }}>
                                        آپلود تصویر
                                    </button></div>
                                    <MoonLoader color={"#02aebd"} loading={logoLoading} css={override} size={30}/>
                                </div>
                            </div>
                            <input type={'file'} accept="image/*" className={'d-none'} id={'logo_input'} onChange={onUploadLogo}/>
                        </div>
                        <div className={'mt-4 change-text change-dir'}>
                            <h6>تصویر اصلی:</h6>
                            <div className={'row w-100 mx-0'}>
                                <div className={'col-12 col-xl-8 px-0'}>
                                    <img className={Style.mainPicPreview + " img-thumbnail rounded"} src={mainPic} />
                                </div>
                                <div className={'d-flex'}>
                                    <div><button className={'btn btn-info py-2 px-4 mx-4'} onClick={() => {
                                        $("#mainPic_input").click();
                                    }}>
                                        آپلود تصویر
                                    </button></div>
                                    <MoonLoader color={"#02aebd"} loading={mainPicLoading} css={override} size={30}/>
                                </div>
                            </div>
                            <input type={'file'} accept="image/*" className={'d-none'} id={'mainPic_input'} onChange={onUploadMainPic}/>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem >
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <hr/>
                            <h6 className={'change-text change-dir py-2'}>
                                <span>معرفی شرکت</span>
                                <i className={'bi bi-caret-down-fill'}></i>
                            </h6>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className={'mt-4 change-text'}>
                            <h6>فارسی:</h6>
                            <CKEditor
                                config={ {
                                    language:'ar'
                                } }
                                editor={ ClassicEditor }
                                data={introduction}
                                onChange={ ( event, editor ) => {
                                    setIntroduction(editor.getData())
                                } }
                            />
                        </div>
                        <div className={'mt-4 change-text'}>
                            <h6>انگلیسی:</h6>
                            <CKEditor
                                config={ {
                                    // language:'ar'
                                } }
                                editor={ ClassicEditor }
                                data={engIntroduction}
                                onChange={ ( event, editor ) => {
                                    setEngIntroduction(editor.getData())
                                } }
                            />
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem >
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <hr/>
                            <h6 className={'change-text change-dir py-2'}>
                                <span>فرهنگ کاری شرکت</span>
                                <i className={'bi bi-caret-down-fill'}></i>
                            </h6>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className={'mt-4 change-text'}>
                            <h6>فارسی:</h6>
                            <CKEditor
                                config={ {
                                    language:'ar'
                                } }
                                editor={ ClassicEditor }
                                data={workCulture}
                                onChange={ ( event, editor ) => {
                                    setWorkCulture(editor.getData())
                                } }
                            />
                        </div>
                        <div className={'mt-4 change-text'}>
                            <h6>انگلیسی:</h6>
                            <CKEditor
                                config={ {
                                    // language:'ar'
                                } }
                                editor={ ClassicEditor }
                                data={workCultureEng}
                                onChange={ ( event, editor ) => {
                                    setWorkCultureEng(editor.getData())
                                } }
                            />
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem >
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <hr/>
                            <h6 className={'change-text change-dir py-2'}>
                                <span>مزایای همکاری با شرکت</span>
                                <i className={'bi bi-caret-down-fill'}></i>
                            </h6>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className={'mt-4 change-text'}>
                            <h6>فارسی:</h6>
                            <CKEditor
                                config={ {
                                    language:'ar'
                                } }
                                editor={ ClassicEditor }
                                data={cooperationBenefits}
                                onChange={ ( event, editor ) => {
                                    setCooperationBenefits(editor.getData())
                                } }
                            />
                        </div>
                        <div className={'mt-4 change-text'}>
                            <h6>انگلیسی:</h6>
                            <CKEditor
                                config={ {
                                    // language:'ar'
                                } }
                                editor={ ClassicEditor }
                                data={cooperationBenefitsEng}
                                onChange={ ( event, editor ) => {
                                    setCooperationBenefitsEng(editor.getData())
                                } }
                            />
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
            <div className={'mt-5 d-flex justify-content-center'}>
                <button className={'btn btn-success py-2 px-5'} onClick={onSubmit}>ثبت</button>
            </div>

            <NotificationContainer/>
        </div>
    )
}