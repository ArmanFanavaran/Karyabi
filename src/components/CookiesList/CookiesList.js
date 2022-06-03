import {generateCookieDomain} from "../global/Requests";

var cookie = {
    "accessExp": {
        "des": "Expire Access Token",
        "nickName": "tomato",
        "domain":generateCookieDomain(),
        "expires": 7,
        "type":"cookie"
    },
    "refreshExp": {
        "des": "Expire refresh Token",
        "nickName": "potato",
        "domain":generateCookieDomain(),
        "expires": 30,
        "type":"cookie"
    },
    "is_admin": {
        "des": "Is Admin User",
        "nickName": "apple",
        "domain":generateCookieDomain(),
        "expires": 7,
        "type":"cookie"
    },
    "is_admin_one": {
        "des": "Is Admin User One",
        "nickName": "RedApple",
        "domain":generateCookieDomain(),
        "expires": 7,
        "type":"cookie"
    },
    "isCompany": {
        "des": "Is company",
        "nickName": "RedBubble",
        "domain":generateCookieDomain(),
        "expires": 7,
        "type":"cookie"
    },
    "firstName": {
        "des": "FirstName",
        "nickName": "melon",
        "domain":generateCookieDomain(),
        "expires": 7,
        "type":"cookie"
    },
    "lastName": {
        "des": "LastName",
        "nickName": "mango",
        "domain":generateCookieDomain(),
        "expires": 7,
        "type":"cookie"
    },
    "userPic": {
        "des": "UserPic",
        "nickName": "banana",
        "domain":generateCookieDomain(),
        "expires": 7,
        "type":"localStorage"
    },
    "resume": {
        "des": "Resume",
        "nickName": "grapeFruit",
        "domain":generateCookieDomain(),
        "expires": setExpireResume(),
        "type":"localStorage"
    },
}

function setExpireResume(){
    var now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    document.cookie = "name=value; expires=" + now.toUTCString() + "; path=/";
}

export function getCookiesItems() {
    return cookie;
}