import Style from "./NavbarResume.module.css";
import {useEffect} from "react";
import $ from 'jquery';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import * as queryString from "query-string";
import {getRoutesItems} from "../../RoutesList/RoutesList";
import {useHistory} from "react-router";


export default function NavbarResume(props) {
    const [t, i18n] = useTranslation('main');
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    const history = useHistory();
    useEffect(() => {
        for (var i = 1; i < props.step; i++) {
            $('#' + i).addClass('text-primary')
            // $('#'+i).removeClass(Style.disabled)
        }
        $('#' + props.step).addClass('text-success')
    }, [])
    return (
        <div className={Style.showPath + " change-dir"}>
            <div className={Style.path + " change-text "}>
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep1.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'1'}>{t("resume.navbar.generalInformation")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep2.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"}
                        id={'2'}>{t("resume.navbar.profilePicture")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }

                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep3.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'3'}>{t("resume.navbar.aboutMe")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep4.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'4'}>{t("resume.navbar.EducationalBackground")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep5.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'5'}>{t("resume.navbar.language")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep6.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'6'}>{t("resume.navbar.softwareSkills")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep7.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'7'}>{t("resume.navbar.skills")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep8.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'8'}>{t("resume.navbar.workExperience")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep9.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'9'}>{t("resume.navbar.project")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep10.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'10'}>{t("resume.navbar.honor")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep11.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'11'}>{t("resume.navbar.article")}</button>
                {sp.get("lang") === "en" ?
                    <i className={Style.pathIcon + " fas fa-chevron-right "}></i>
                    :
                    <i className={Style.pathIcon + " fas fa-chevron-left "}></i>
                }
                <button onClick={() => {history.push({ pathname: getRoutesItems().resumeStep12.route, search: "lang=" + sp.get("lang")})}} className={Style.pathItem + " btn btn-default"} id={'12'}>{t("resume.navbar.jobPreferences")}</button>
            </div>

        </div>
    )
}