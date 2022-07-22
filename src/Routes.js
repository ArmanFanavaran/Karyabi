import {Router, Switch, Route} from 'react-router-dom'
import * as React from "react";
import {createBrowserHistory} from "history";

import Controller from "./components/authentication/Helper/Controller";
import {getRoutesItems} from "./components/RoutesList/RoutesList";


/****************** Index *****************************/
import Index from "./components/index/Index";

/****************** public Component *****************************/
import Navbar from "./components/global/components/Navbar/Navbar";
import Footer from "./components/global/components/Footer/Footer";
import ScrollTop from "./components/global/components/scroll";

/****************** Login *****************************/
import LoginStep1 from "./components/authentication/login/step1/LoginStep1";
import LoginStep2 from "./components/authentication/login/step2/LoginStep2";
import LoginStep3 from "./components/authentication/login/step3/LoginStep3";

/****************** Change Password *****************************/
import ChangePassword from "./components/dashboard/changePassword/ChangePassword";

/****************** Register *****************************/
import RegisterStep2 from "./components/authentication/register/step2/RegisterStep2";
import RegisterStep3 from "./components/authentication/register/step3/RegisterStep3";

/****************** Forget Password *****************************/
import ForgetPassStep1 from "./components/authentication/fogetPass/step1/ForgetPassStep1";
import ForgetPassStep2 from "./components/authentication/fogetPass/step2/ForgetPassStep2";

/****************** Resume *****************************/
import Resume from "./components/Resume/resume/type1/Resume";
import ResumeType2 from "./components/Resume/resume/type2/ResumeType2";
import ResumeStep1 from "./components/Resume/step1/ResumeStep1";
import ResumeStep2 from "./components/Resume/step2/ResumeStep2";
import ResumeStep3 from "./components/Resume/step3/ResumeStep3";
import ResumeStep4 from "./components/Resume/step4/ResumeStep4";
import ResumeStep5 from "./components/Resume/step5/ResumeStep5";
import ResumeStep6 from "./components/Resume/step6/ResumeStep6";
import ResumeStep7 from "./components/Resume/step7/ResumeStep7";
import ResumeStep8 from "./components/Resume/step8/ResumeStep8";
import ResumeStep9 from "./components/Resume/step9/ResumeStep9";
import ResumeStep10 from "./components/Resume/step10/ResumeStep10";
import ResumeStep11 from "./components/Resume/step11/ResumeStep11";
import ResumeStep12 from "./components/Resume/step12/ResumeStep12";

/****************** Contact *****************************/
import ContactAdmin from "./components/contact/ContactAdmin";

/****************** AboutUs *****************************/
import AboutUs from "./components/about/aboutUs";

/****************** News *****************************/
import NewsList from "./components/employmentAdvertisement/list/EmploymentAdvertisementList";
import EmploymentAdvertisementSingle from "./components/employmentAdvertisement/single/EmploymentAdvertisementSingle";

/****************** Content Production *****************************/
import ContentProductionList from "./components/contentProduction/list/ContentProductionList";
import ContentProductionSingle from "./components/contentProduction/single/ContentProductionSingle.js";

/****************** Courses *****************************/
import CoursesList from "./components/courses/list/CoursesList";
import CoursesSingle from "./components/courses/single/CoursesSingle";

/************** Dashboard **************/
import Dashboard from "./components/dashboard/dashboardParent/DashboardParent";
import DashboardParentAdmin from "./components/dashboardAdmin/dashboardParent/DashboardParentAdmin";
import DashboardParentCompany from "./components/dashboardCompany/dashboardParent/DashboardParent";

/************* Company *************/
import CompaniesList from "./components/company/list/CompanyList";
import CompanySingle from "./components/company/single/CompanySingle";

export default function Routes() {
    return (
        <Router history={createBrowserHistory()}>
            <ScrollTop/>
            <Navbar/>
            <Switch>
                {/****************** Index *****************************/}
                <Route path="/" exact component={Index}/>

                {/****************** About *****************************/}
                <Route path="/about" exact component={AboutUs}/>

                {/****************** Login *****************************/}
                <Route path={getRoutesItems().loginStep1.route} component={LoginStep1}/>
                <Route path={getRoutesItems().loginStep2.route} component={LoginStep2}/>
                <Route path={getRoutesItems().loginStep3.route} component={LoginStep3}/>

                {/****************** Register *****************************/}
                <Route path={getRoutesItems().registerStep2.route} exact component={RegisterStep2}/>
                <Route path={getRoutesItems().registerStep3.route} exact component={RegisterStep3}/>

                {/****************** Change Password *****************************/}
                {/*<Route path={getRoutesItems().changePassword.route} exact component={ChangePassword}/>*/}

                {/****************** Reset Password *****************************/}
                <Route path={getRoutesItems().resetPasswordStep1.route} exact component={ForgetPassStep1}/>
                <Route path={getRoutesItems().resetPasswordStep2.route} exact component={ForgetPassStep2}/>




                {/****************** Employment Advertisement *****************************/}
                <Route path={getRoutesItems().employmentAdvertisementList.route} exact component={NewsList}/>
                <Route path={getRoutesItems().employmentAdvertisementSingle.route} exact component={EmploymentAdvertisementSingle}/>

                {/****************** Content Production *****************************/}
                <Route path={getRoutesItems().contentProductionList.route} exact component={ContentProductionList}/>
                <Route path={getRoutesItems().contentProductionSingle.route} exact component={ContentProductionSingle}/>

                {/****************** Courses *****************************/}
                <Route path="/courses/list" exact component={CoursesList}/>
                <Route path="/courses/single" exact component={CoursesSingle}/>

                {/****************** Contact *****************************/}
                <Route path="/contact" exact component={ContactAdmin}/>



                {/****************** Controller *****************************/}
                <Controller>
                    {/****************** Dashboard *****************************/}

                    <Route path={getRoutesItems().DashboardParent.route + "*" }  exact  component={Dashboard}/>
                    <Route path={getRoutesItems().DashboardParentAdmin.route + "*" }  exact  component={DashboardParentAdmin}/>
                    <Route path={getRoutesItems().dashboardParentCompany.route + "*" }  exact  component={DashboardParentCompany}/>

                    {/****************** Resume *****************************/}
                    <Route path={getRoutesItems().resume.route} exact component={Resume}/>
                    <Route path={getRoutesItems().resumeType2.route} exact component={ResumeType2}/>
                    <Route path={getRoutesItems().resumeStep1.route} exact component={ResumeStep1}/>
                    <Route path={getRoutesItems().resumeStep2.route} exact component={ResumeStep2}/>
                    <Route path={getRoutesItems().resumeStep3.route} exact component={ResumeStep3}/>
                    <Route path={getRoutesItems().resumeStep4.route} exact component={ResumeStep4}/>
                    <Route path={getRoutesItems().resumeStep5.route} exact component={ResumeStep5}/>
                    <Route path={getRoutesItems().resumeStep6.route} exact component={ResumeStep6}/>
                    <Route path={getRoutesItems().resumeStep7.route} exact component={ResumeStep7}/>
                    <Route path={getRoutesItems().resumeStep8.route} exact component={ResumeStep8}/>
                    <Route path={getRoutesItems().resumeStep9.route} exact component={ResumeStep9}/>
                    <Route path={getRoutesItems().resumeStep10.route} exact component={ResumeStep10}/>
                    <Route path={getRoutesItems().resumeStep11.route} exact component={ResumeStep11}/>
                    <Route path={getRoutesItems().resumeStep12.route} exact component={ResumeStep12}/>

                    {/************* Company *************/}
                    <Route path={getRoutesItems().companyList.route} exact component={CompaniesList}/>
                    <Route path={getRoutesItems().companySingle.route} exact component={CompanySingle}/>

                </Controller>

            </Switch>
            {/*{window.location.pathname !== "/resume/show" ? <Footer />:null }*/}
            <Footer/>
        </Router>
    )
}