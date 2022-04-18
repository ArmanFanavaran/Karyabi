import {getRoutesItems} from "../RoutesList/RoutesList";
import queryString from "query-string";

export function initializeTitles() {
    const path = window.location.pathname;

    let title = "";

    let items = getRoutesItems();
    for (var i = 0; i < items.length; i++) {
        if (items.list[i].route == path) {
            title = items.list[i].des
        }
    }
    // items.forEach(function (item) {
    //
    //
    //         if (item.route === path){
    //             title = item.title;
    //         }
    //
    // });

    if (title !== "") {
        document.title = "کاریابی دانشگاه خلیج فارس | " + title;
        document.getElementById("nav-title").innerText = title;
        document.getElementById("nav-sm-title").innerText = title;
    }
    // else {
    //     document.title = "رصدخانه مهر";
    //     document.getElementById("nav-title").innerText = "1asd";
    //     document.getElementById("nav-sm-title").innerText = "1sadasd";
    // }


}

export function initializeTitlesWithValue(title) {
    /// Lang ///
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    if (sp.get("lang") == "en") {
        document.title = "Persian Gulf University job search | " + title;
        document.querySelector('meta[property="og:title"]').setAttribute("content", "Persian Gulf University job search |");
        document.querySelector('meta[property="og:description"]').setAttribute("content", title);
        document.querySelector('meta[name="description"]').setAttribute("content", title);
    } else {
        document.title = "کاریابی دانشگاه خلیج فارس | " + title;
        document.querySelector('meta[property="og:title"]').setAttribute("content", "کاریابی دانشگاه خلیج فارس |");
        document.querySelector('meta[property="og:description"]').setAttribute("content", title);
        document.querySelector('meta[name="description"]').setAttribute("content", title);


    }
    document.querySelector('meta[name="description"]').setAttribute("content", title);

    document.querySelector('meta[name="description"]').setAttribute("content", title);

}