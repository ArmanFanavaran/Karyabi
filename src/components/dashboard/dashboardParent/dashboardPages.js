import {getRoutesItems} from "../../RoutesList/RoutesList";

const pages = {
    user: [
        {
            label: "حساب کاربری",
            labelEng: "Profile",
            pathname: getRoutesItems().DashboardParent.route ,
            iconClass: "bi bi-person-fill"
        },
        {
            label: "پیگیری رزومه‌های ارسالی",
            labelEng: "Track submitted resumes",
            pathname: getRoutesItems().SentResumes.route,
            iconClass: "bi bi-clock-history"
        }
    ],
    company: []

}
export function getDashboardPages(){
    return pages;
}