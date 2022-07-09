import {generateCookieDomain, generateURL} from "../../global/Requests";
import Cookies from "js-cookie"
import NotificationManager from "react-notifications/lib/NotificationManager";
import {getCookiesItems} from "../../CookiesList/CookiesList";
import queryString from "query-string";

export function Logout() {
    // const history =useHistory()
    /// Lang ///
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    var axios = require('axios');
    var data = JSON.stringify({});

    axios.defaults.withCredentials = true;
    var config = {
        method: 'post',
        url: generateURL( "/User/LogOut"),
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            // if (response.status === 200) {
            // axios.defaults.withCredentials = false;
            console.log("yes")

            Cookies.remove(getCookiesItems().accessExp.nickName, {
                domain: getCookiesItems().accessExp.domain
            })
            Cookies.remove(getCookiesItems().refreshExp.nickName, {
                domain: getCookiesItems().refreshExp.domain
            })
            Cookies.remove(getCookiesItems().is_admin.nickName, {
                domain: getCookiesItems().is_admin.domain
            })
            Cookies.remove(getCookiesItems().is_admin.nickName, {
                domain: getCookiesItems().isCompany.domain
            })
            Cookies.remove(getCookiesItems().is_admin_one.nickName, {
                domain: getCookiesItems().is_admin_one.domain
            })
            Cookies.remove(getCookiesItems().firstName.nickName, {
                domain: getCookiesItems().firstName.domain
            })
            Cookies.remove(getCookiesItems().lastName.nickName, {
                domain: getCookiesItems().lastName.domain
            })

            localStorage.removeItem(getCookiesItems().userPic.nickName);

            NotificationManager.success(response.data.message);
            setTimeout(() => {
                // history.push("/login")
                window.location.reload(false);
            }, 2000);
            // }

        })
        .catch(function (error) {
            console.log(error.response)
            // NotificationManager.error(error);
        });

}
