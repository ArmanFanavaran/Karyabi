import {getRoutesItems} from "../../RoutesList/RoutesList";

const pages = {
    user: [
        {
            label: "متن صفحه اصلی",
            labelEng: "Hero list",
            pathname: getRoutesItems().HeroList.route ,
            iconClass: "bi bi-person-fill"
        },
        {
            label: "مقطع تحصیلی",
            labelEng: "Degree",
            pathname: getRoutesItems().DegreeList.route,
            iconClass: "bi bi-clock-history"
        },
        {
            label: "تنظیمات فوتر",
            labelEng: "Footer Settings",
            pathname: getRoutesItems().FooterSettings.route,
            iconClass: "bi bi-clock-history"
        },
        {
            label: "پیوندها",
            labelEng: "Links",
            pathname: getRoutesItems().PublicLinks.route,
            iconClass: "bi bi-clock-history"
        },
    ],
    company: []

}
export function getDashboardPagesAdmin(){
    return pages;
}