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
        },
        {
            label: "ثبت شرکت",
            labelEng: "Add Company",
            pathname: getRoutesItems().addCompany.route,
            iconClass: "bi bi-clock-history"
        },
        {
            label: "لیست شرکت‌ها",
            labelEng: "Requests",
            pathname: getRoutesItems().dashboardRequests.route,
            iconClass: "bi bi-clock-history"
        }
    ],


}
export function getDashboardPages(){
    return pages;
}