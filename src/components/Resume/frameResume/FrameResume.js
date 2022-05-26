import Style from "./FrameResume.module.css"
import * as React from "react";
import {useEffect} from "react";
import * as queryString from "query-string";
import form from "./img/form.jpg"

export default function FirstResume(props) {
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    useEffect(function () {

    }, [])

    if (props.step === 1) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Hello, welcome to our website!</h4>
                        <p>In this section, you must enter all your general information so that you can transfer your
                            details to the employer.</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>سلام به وبسایت ما خوش آمدی!</h4>
                        <p>در این قسمت باید تمامی اطلاعات عمومی خودت را وارد کنی تا بتونی مشخصات خودت رو به کارفرما
                            منتقل
                            کنی.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else if (props.step === 2) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Upload a Photo!</h4>
                        <p>Upload a profile picture in this section. Try to make the photo you upload the whole face so
                            that the employer can see your face completely.</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>آپلود عکس!</h4>
                        <p>در این قسمت عکس پروفایل را آپلود کن. سعی کن عکسی که آپلود میکنی تمام چهره باشد تا کارفرما
                            بتواند چهره ی تو را بطور کامل مشاهده کند.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else if (props.step === 3) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Introduce yourself!</h4>
                        <p>In this section, briefly introduce yourself in a few sentences.</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>خودت را معرفی کن!</h4>
                        <p>در این قسمت بطور خلاصه خودت را در چند جمله معرفی کن.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else if (props.step === 4) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Write your academic record!</h4>
                        <p>In this section, you must write your educational background. Try to write down the records
                            according to the job you are going to choose. You can also sort the records in the order you
                            like. Just click on the desired academic record and then move it.</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>سوابق تحصیلی خود را بنویس!</h4>
                        <p>در این قسمت باید سوابق تحصیلی خودت را بنویسی. سعی کن با توجه به شغلی که قصد انتخاب آن را داری
                            سوابق را بنویسی. همچنین میتوانی سوابق را بر اساس ترتیبی که دوست داری مرتب کنی. کافیست روی
                            سابقه ی تحصیلی مورد نظر کلیک کرده و سپس آن را جابجا کنی.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else if (props.step === 5) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Language level!</h4>
                        <p>In this section you have to enter the languages that you are fluent in. You can rate your
                            language level from one to five stars when entering. You can also enable or disable star
                            display on your resume. As in the previous section, you can sort the languages according to
                            your taste.</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>سطح زبان!</h4>
                        <p>در این قسمت باید زبان هایی را که به آن مسلط هستی وارد کنی. در هنگام وارد کردن میتوانی سطح
                            زبان خود را از بین یک تا پنج ستاره امتیاز بدهی. همچنین میتوانی نمایش ستاره را در رزومه خود
                            فعال یا غیرفعال کنی. همانند قسمت قبل میتوانی زبان ها را بر اساس سلیقه ی خود مرتب سازی
                            کنی.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else if (props.step === 6) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Software skills!</h4>
                        <p>In this section, you must enter the software that you are proficient in and give your skill
                            between one to five star points. Note that priority is given to software that is more
                            relevant to the job. In this section, as in the previous sections, you can organize your
                            software skills.</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>مهارت نرم افزاری!</h4>
                        <p>در این بخش باید نرم افزارهایی را که به آن مسلط هستی وارد کنی و به مهارت خود بین یک تا پنج
                            امتیاز ستاره بدهی. توجه کن که اولویت با نرم افزارهایی است که با شغل مربوطه ارتباط بیشتری
                            داشته باشد. در این قسمت همانند قسمت های قبل میتوانی مهارت های نرم افزاری خود را مرتب سازی
                            کنی.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else if (props.step === 7) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Skills!</h4>
                        <p>In this section, enter the skills that you are good at and give your skill a score between
                            one and five stars. Note that priority is given to skills that are more relevant to the job.
                            In this section, as in the previous sections, you can organize your skills.</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>مهارت!</h4>
                        <p>در این بخش مهارت هایی را که به آن مسلط هستی وارد کن و به مهارت خود بین یک تا پنج امتیاز ستاره
                            بده. توجه کن که اولویت با مهارت هایی است که با شغل مربوطه ارتباط بیشتری داشته باشد. در این
                            قسمت همانند قسمت های قبل میتوانی مهارت های خود را مرتب سازی کنی.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else if (props.step === 8) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Work Experience!</h4>
                        <p>In this section, you must enter your work experiences. Try to articulate your experiences
                            carefully, and be sure to describe the skills you learned while working on your experience.
                            You can also arrange your experiences according to your taste, as in the previous
                            sections.</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>تجارب کاری!</h4>
                        <p>در این بخش باید تجارب کاری خود را وارد کنی. سعی کن تجارب خود را با دقت بیان کنی و درهنگام
                            توضیح تجربه خود، حتما مهارت هایی را که در خلال آن کار یادگرفتی را بیان کنی. همچنین میتوانی
                            مانند قسمت های قبل تجارب خود را بر اساس سلیقه ی خود مرتب سازی کنی.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else if (props.step === 9) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Project!</h4>
                        <p>In this section you can enter information about the projects you have done. Try to be very
                            careful in entering this information because it is a very important criterion for measuring
                            your skill level for the employer. Also, like the previous steps, you can arrange your
                            skills according to your taste.</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>پروژه ها!</h4>
                        <p>در این بخش میتوانی اطلاعات پروژه هایی را که انجام داده ای وارد کنی. سعی کن در وارد کردن این
                            اطلاعات دقت زیادی انجام دهی چون معیار بسیار مهمی برای سنجش میزان مهارت شما برای کارفرما
                            محسوب میشود. همچنین مانند مراحل قبل میتوانی مهارت های خود را بر اساس سلیقه ی خود مرتب سازی
                            کنی.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else if (props.step === 10) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Honor!</h4>
                        <p>In this section, enter the honors you have earned accurately. Also, as in the previous steps,
                            you can arrange your honors according to your taste</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>افتخارات!</h4>
                        <p>در این بخش افتخاراتی را که بدست آورده ای بطور دقیق وارد کن. همجنین مانند مراحل قبل میتوانی
                            افتخارات خود را بر اساس سلیقه ات مرتب سازی کنی.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else if (props.step === 11) {
        return (
            <div className={Style.border}>
                {sp.get("lang") === "en" ?
                    <div className={'col-12 change-text'}>
                        <h4>Article!</h4>
                        <p>In this section, state the articles you have submitted. Like the previous sections, you can sort your articles according to your taste.</p>
                        <img className={'w-100'} src={form}/>
                    </div> :
                    <div className={'col-12 change-text'}>
                        <h4>مقالات!</h4>
                        <p>در این بخش مقالاتی را که ثبت کرده ای بیان کن. مانند قسمت های قبل میتوانی مقالات خود را براساس سلیقه خود مرتب سازی کنی.</p>
                        <img className={'w-100'} src={form}/>

                    </div>
                }
            </div>
        )
    } else {
        return (
            <div className={Style.wrap}>
                <iframe src="https://localhost:3000/resume/show?lang=fa&preview=true&scale=2"
                        className={Style.frame + ' w-100'} width={100} height={100}></iframe>
            </div>
        )
    }
}