import * as queryString from "query-string";

///// Local /////
// var cookies_domain = null;

//// Server /////
var cookies_domain = ".ceunion.ir";

var domain_url = "https://karyabiapi.ceunion.ir/";
var domain_AdminURL = "https://admin.ceunion.ir/";
var domain_CAdminURL = "https://cadmin.ceunion.ir/";
var domain_TAdminURL = "https://tadmin.ceunion.ir/";
var recaptchaKey="6Lex8I8bAAAAAJjOliZ0HJlImhzMpgdRqTRN6HpK"

export function generateURL(url) {
    return domain_url + language()+ "/v1" + url ;
}

export function generateCookieDomain() {
    return cookies_domain;
}

export function generateAdminURL(){
    return domain_AdminURL;
}

export function generateCAdminURL(url){
    return domain_CAdminURL;
}

export function generateTAdminURL(url){
    return domain_TAdminURL;
}

export function generateCookieBoolean(boolean) {
    let num1 = Math.floor(Math.random() * 90 + 10);
    let num2 = boolean ? 1 : 0;
    let num3 = Math.floor(Math.random() * 90 + 10);
    let result = num1.toString() + num2.toString() + num3.toString();

    console.log(result);
    return result
}

export function readCookieBoolean(number) {

    let boolean = number.charAt(2);

    return boolean === 1;
}

export function generateCaptcha() {
    return recaptchaKey;
}

export function language(){
    // const queryStringes = queryString.parse(window.location.search);
    // const sp = new URLSearchParams(queryStringes);
    // return sp.get("lang");
    let lang=localStorage.getItem("language")
    return lang
}
