import Cookies from 'js-cookie';
import {generateCookieDomain, generateURL} from "../../global/Requests";
import {getCookiesItems} from "../../CookiesList/CookiesList";
import {NotificationManager} from "react-notifications";
import {getRoutesItems} from "../../RoutesList/RoutesList";

export function isAccessTokenExpired() {//// finish
    let accessExp = Cookies.get(getCookiesItems().accessExp.nickName);
    if (accessExp !== undefined && accessExp !== null && accessExp !== "") {
        let now = Date.now();
        accessExp = new Date(accessExp);
        if ( accessExp <= now)
            return true;
        else return false;
    }
    else return true;
}

export function isRefreshTokenExpired() {/// finish
    let refreshExp = Cookies.get(getCookiesItems().refreshExp.nickName);
    if (refreshExp !== undefined) {
        let now = Date.now();
        refreshExp = new Date(refreshExp);
        if ( refreshExp <= now)
            return true;
        else return false;
    }
    else return true;

}
export function getAuthStatus() {
    return !isAccessTokenExpired();
}
export function refreshToken() {
    var axios = require('axios');
    var data = JSON.stringify({});

    axios.defaults.withCredentials = true;
    var config = {
        method: 'post',
        url: generateURL("/User/RefreshToken"),
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            if (response.isSuccess) {
                let accessExp = response.data.data.accessExp;
                let refreshExp = response.data.data.refreshExp;
                Cookies.set(getCookiesItems().accessExp.nickName, accessExp, {
                    domain: getCookiesItems().accessExp.domain,
                    expires: getCookiesItems().accessExp.expires
                })
                Cookies.set(getCookiesItems().refreshExp.nickName, refreshExp, {
                    domain: getCookiesItems().refreshExp.domain,
                    expires: getCookiesItems().refreshExp.expires
                })
                Cookies.set(getCookiesItems().isCompany.nickName, response.data.data.isCompany, {
                    domain: getCookiesItems().isCompany.domain,
                    expires: getCookiesItems().isCompany.expires
                })
                Cookies.set(getCookiesItems().is_admin.nickName, response.data.data.isAdmin, {
                    domain: getCookiesItems().is_admin.domain,
                    expires: getCookiesItems().is_admin.expires
                })
                Cookies.set(getCookiesItems().is_admin_one.nickName, response.data.data.isAdminOne, {
                    domain: getCookiesItems().is_admin_one.domain,
                    expires: getCookiesItems().is_admin_one.expires
                })
                Cookies.set(getCookiesItems().firstName.nickName, response.data.data.firstName, {
                    domain: getCookiesItems().firstName.domain,
                    expires: getCookiesItems().firstName.expires
                })
                Cookies.set(getCookiesItems().lastName.nickName, response.data.data.lastName, {
                    domain: getCookiesItems().lastName.domain,
                    expires: getCookiesItems().lastName.expires
                })

                localStorage.setItem(getCookiesItems().userPic.nickName, response.data.data.picAddress);
                setTimeout(function () {
                    NotificationManager.success(response.data.message);

                }, 1000);
                window.location.reload();

            }
        })
        .catch(function (error) {
        });
}