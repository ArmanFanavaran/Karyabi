import {getRoutesItems} from "../../RoutesList/RoutesList";

const pages = {
    company: [
        {
            label: "فرصت‌های شغلی",
            labelEng: "Job Offers",
            pathname: getRoutesItems().companyJobOffers.route ,
            iconClass: "bi bi-person-fill"
        },

    ],


}
export function getDashboardPages(){
    return pages;
}