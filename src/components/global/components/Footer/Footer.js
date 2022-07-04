import "./Footer.css";


export default function Footer() {
    return (
        <footer className="page-footer py-2">
            <div>
                <div className="container">
                    <div className="row py-4 d-flex align-items-center">
                        <div className="col-md-6 col-lg-5 text-center text-md-right mb-4 mb-md-0">
                            <h5 className="mb-0">کاریابی دانشگاه خلیج فارس</h5>
                        </div>

                        <div className="col-md-6 col-lg-7 text-center text-md-left social-medias">

                            <a className="fb-ic sm-icon ml-md-3">
                                <i className="fab fa-telegram-plane white-text"> </i>
                            </a>

                            <a className="tw-ic sm-icon ml-md-3">
                                <i className="fab fa-instagram white-text"> </i>
                            </a>

                            <a className="gplus-ic sm-icon ml-md-3">
                                <i className="fab fa-linkedin-in white-text"> </i>
                            </a>

                            <a className="tw-ic sm-icon ml-md-3">
                                <i className="fab fa-twitter white-text"> </i>
                            </a>

                            <a className="gplus-ic sm-icon ml-md-3">
                                <i className="fab fa-google white-text"> </i>
                            </a>
                        </div>


                    </div>

                </div>
            </div>
            <div className="container text-center text-md-left mt-5">
                <div className="row columns mt-3">
                    <div
                        className="col-md-6 text-center text-lg-right order-4 order-md-4 order-lg-1 col-lg-2 col-xl-2 mb-4 text-white">
                        <p className="address-footer">از طراحان گرافیک است. چاپگر ها و متون سادگی نامفهوم از صنعت چاپ و
                            با استفاده لورم ایپسوم متن ساختگی با تولید</p>
                        <p className="address-footer">
                            <h6 className="d-inline pl-3"><i className="fas fa-phone"></i></h6>
                            8252622502+
                        </p>
                        <p className="address-footer">
                            <h6 className="d-inline pl-3"><i className="fas fa-map-marker-alt"></i></h6>
                            بلکه روزنامه و مجله در ستون چاپگرها و متون
                        </p>
                    </div>
                    <div
                        className="col-md-6 text-center text-lg-left order-3 order-lg-2 order-md-3 col-lg-2 col-xl-2 mx-auto mb-4 change-text change-dir">
                        <h6 className="font-weight-bold">کارجویان</h6>
                        <p>
                            <a href="#!">First page</a>
                        </p>
                        <p>
                            <a href="#!">Second page</a>
                        </p>
                        <p>
                            <a href="#!">Third page</a>
                        </p>
                        <p>
                            <a href="#!">Fourth page</a>
                        </p>
                    </div>
                    <div
                        className="col-md-6 text-center text-lg-left order-2 order-md-2 order-lg-3 col-lg-2 col-xl-2 mx-auto mb-4 change-text change-dir">
                        <h6 className="font-weight-bold">میانبرها</h6>
                        <p>
                            <a href="#!">First page</a>
                        </p>
                        <p>
                            <a href="#!">Second page</a>
                        </p>
                        <p>
                            <a href="#!">Third page</a>
                        </p>
                        <p>
                            <a href="#!">Fourth page</a>
                        </p>

                    </div>
                    <div
                        className="order-1  order-lg-4 order-md-1 col-md-6 text-center text-lg-left col-lg-2 col-xl-2 mx-auto mb-4 change-text change-dir">
                        <h6 className="font-weight-bold">کاریابی</h6>
                        <p>
                            <a href="#!">First page</a>
                        </p>
                        <p>
                            <a href="#!">Second page</a>
                        </p>
                        <p>
                            <a href="#!">Third page</a>
                        </p>
                        <p>
                            <a href="#!">Fourth page</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3">
                <div className="row">
                    <div className="col-lg-4 col-md mt-lg-0 my-2">
                        <span>Terms of service</span>
                    </div>
                    <div className="col-lg-4 col-md mt-lg-0 my-2">
                        <span>Privacy policy</span>
                    </div>
                    <div className="col-lg-4 col-12 mt-lg-0 my-2">
                        <span>آرمان فناوران پارس رایانه 2022@</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}