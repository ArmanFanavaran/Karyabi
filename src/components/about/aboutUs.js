import Style from "./aboutUs.module.css"
import Logo from "./imgs/WhatsApp Image 2021-06-15 at 02.15 3.png";

export default function AboutUs() {

    return(
        <main className={Style.main +" text-center"}>
            <h3 className="d-block">درباره ما</h3>
            <div className={Style["about-us"] + " container-fluid"}>
                <div className={Style["about-box"] + " p-5"}>
                    <div className={Style["aboutUs-info"] + " row d-flex align-items-center justify-content-center"}>
                        <div className="col-12 text-md-right">
                            <h5>اتحادیه انجمن ها علمی کامپیوتر</h5>
                        </div>
                        <div className="col-md-7  text-md-right text-center py-md-4 order-md-1 order-2">
                            <p className="">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
                                طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                                برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                                باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را
                                می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
                                خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                                حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد
                                استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید </p>
                        </div>
                        <div className={Style["about-img"] + " col-md-5 order-md-2 order-1"}>
                            <img src={Logo} alt="" className=""/>
                        </div>
                        <div className="col-md-12  text-md-right text-center order-md-3 order-3">
                            <p className="">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
                                طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                                برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                                باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را
                                می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
                                خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                                حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد
                                استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از </p>
                            <p className="">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
                                طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                                برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                                باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را
                                می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
                                خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                                حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد
                                استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از </p>
                        </div>
                    </div>
                    <h6 className="text-md-right py-3"><b>راه های ارتباطی :</b></h6>
                    <div className="row">
                        <div className={Style["aboutUs-address"] + " col-lg-4 col-md-6 pr-lg-5 text-lg-right "}>
                            <h6 className="d-inline pl-3"><i className="fas fa-phone"></i></h6>
                            <p className="d-inline">
                                <b>
                                    8252622502+
                                </b>
                            </p>
                        </div>
                        <div className={Style["aboutUs-address"] + " col-lg-4 col-md-6 pr-lg-5 text-lg-right"}>
                            <h6 className="d-inline pl-3"><i className="fas fa-map-marker-alt"></i></h6>
                            <p className="d-inline">
                                بلکه روزنامه و مجله در ستون چاپگرها و متون
                            </p>
                        </div>
                        <div className={Style["aboutUs-sm"] + " col-lg-4 col-md-12 pr-lg-5 text-center "}>

                            <a className={Style["sm-icon"] + " fb-ic"}>
                                <i className="fab fa-telegram-plane white-text"> </i>
                            </a>

                            <a className={Style["sm-icon"] + " tw-ic"}>
                                <i className="fab fa-instagram white-text"> </i>
                            </a>

                            <a className={Style["sm-icon"] + " gplus-ic"}>
                                <i className="fab fa-linkedin-in white-text"> </i>
                            </a>

                            <a className={Style["sm-icon"] + " tw-ic"}>
                                <i className="fab fa-twitter white-text"> </i>
                            </a>

                            <a className={Style["sm-icon"] + " gplus-ic"}>
                                <i className="fab fa-google white-text"> </i>
                            </a>
                        </div>
                        <div className={Style["statistics-item"] + " col-lg-4 col-12 pt-4 "}>
                            <h5>+30</h5>
                            <p>تعداد شرکت کننده های عضو اتحادیه</p>
                        </div>
                        <div className={Style["statistics-item"] + " col-lg-4 col-12 pt-4 "}>
                            <h5>+43,000</h5>
                            <p>تعداد کل اعضای اتحادیه</p>
                        </div>
                        <div className={Style["statistics-item"] + " col-lg-4 col-12 pt-4 "}>
                            <h5>+100</h5>
                            <p>تعداد انجمن های عضو اتحادیه</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}