import React from "react";
import {isAccessTokenExpired, isRefreshTokenExpired, refreshToken} from "./Auth";
import {Route, useHistory} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {getRoutesItems} from "../../RoutesList/RoutesList";
import queryString from "query-string";

const Controller = props => {

    const history = useHistory();
    let isAuth = !isAccessTokenExpired();
    let isRefreshed = !isRefreshTokenExpired();
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);

    const path = window.location.pathname;


    if (isAuth) {
        return (
            <div>
                {props.children}
            </div>
        )
    } else if (isRefreshed) {
        let isAuth2 = refreshToken();
        if (isAuth2) {
            return (
                <div>
                    {props.children}
                </div>
            )
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            setTimeout(() => {
                // history.push("/login")
                window.location.reload(false);
            }, 1000);
            return null;
        }
    } else {
        history.push({
            pathname: getRoutesItems().loginStep1.route,
            search: "lang=" + sp.get("lang")

        })
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        setTimeout(() => {
            // history.push("/login")
            window.location.reload(false);
        }, 1000);
        return null;
    }

}

export default withRouter(Controller);