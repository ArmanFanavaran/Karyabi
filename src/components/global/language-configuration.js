import i18next from "i18next";
import fa_translate from "../translations/fa/main.json";
import en_translate from "../translations/en/main.json";
import * as queryString from "query-string";

export function initLanguage() {
    let language = localStorage.getItem("language");
    localStorage.setItem("language", "fa");
    document.getElementById("website-stylesheet").href = '/assets/css/style-rtl.css';
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    i18next.init({
        interpolation: {escapeValue: false},
        lng: "fa",
        resources: {
            fa: {
                main: fa_translate
            },
            en: {
                main: en_translate
            },
        },
    })
    if (sp.has("lang") && sp.get("lang") != null) {
        if (sp.get("lang") === "fa") {
            // const queryStringes = queryString.parse(window.location.search);
            // const sp = new URLSearchParams(queryStringes);
            // if (sp.has("lang") && sp.get("lang") === "en") {
            //     sp.set("lang", "fa");
            //
            //     window.location.search = sp.toString();
            // } else if (!sp.has("lang")) {
            //     sp.append("lang", "fa");
            //
            //     window.location.search = sp.toString();
            // }
            localStorage.setItem("language", "fa");
            document.getElementById("website-stylesheet").href = '/assets/css/style-rtl.css';
            i18next.init({
                interpolation: {escapeValue: false},
                lng: "fa",
                resources: {
                    fa: {
                        main: fa_translate
                    },
                    en: {
                        main: en_translate
                    },
                },
            })
        } else if (sp.get("lang") === "en") {
            localStorage.setItem("language", "en-US");
            document.getElementById("website-stylesheet").href = '/assets/css/style.css';

            // if (sp.has("lang") && sp.get("lang") === "fa") {
            //     sp.set("lang", "en");
            //
            //     window.location.search = sp.toString();
            // } else if (!sp.has("lang")) {
            //     sp.append("lang", "en");
            //     window.location.search = sp.toString();
            // }
            i18next.init({
                interpolation: {escapeValue: false},
                lng: "en",
                resources: {
                    fa: {
                        main: fa_translate
                    },
                    en: {
                        main: en_translate
                    }
                },
            });
        } else {
            const queryStringes = queryString.parse(window.location.search);
            const sp = new URLSearchParams(queryStringes);
            sp.set("lang", "fa");
            localStorage.setItem("language", "fa");
            window.location.search = sp.toString();
        }
    } else {
        const queryStringes = queryString.parse(window.location.search);
        const sp = new URLSearchParams(queryStringes);
        // TODO End Slash OF Dashboard URL
        sp.set("lang", "fa");
        localStorage.setItem("language", "fa");
        window.location.search = sp.toString();

    }


}

export function changeToPersian(i18n) {
    localStorage.setItem("language", "fa");
    document.getElementById("website-stylesheet").href = '';
    i18n.changeLanguage('fa');
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    localStorage.setItem("language", "fa");
    sp.set("lang", "fa");
    window.location.search = sp.toString();

}

export function changeToEnglish(i18n) {
    localStorage.setItem("language", "en-US");
    document.getElementById("website-stylesheet").href = './assets/css/style.css';
    i18n.changeLanguage('en');
    const queryStringes = queryString.parse(window.location.search);
    const sp = new URLSearchParams(queryStringes);
    localStorage.setItem("language", "en-US");
    sp.set("lang", "en");
    window.location.search = sp.toString();

}
