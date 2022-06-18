import {getRoutesItems} from "../../RoutesList/RoutesList";

const pages = {
    company: [
        {
            label: "ثبت آگهی شغلی",
            labelEng: "Add Job Offer",
            pathname: getRoutesItems().addJobOfferByCompany.route ,
            iconClass: "bi bi-person-fill"
        },

    ],


}
export function getDashboardPages(){
    return pages;
}