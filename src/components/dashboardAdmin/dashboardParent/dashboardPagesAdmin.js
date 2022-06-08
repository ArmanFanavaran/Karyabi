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
        }
    ],
    company: []

}
export function getDashboardPagesAdmin(){
    return pages;
}