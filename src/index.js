import ReactDOM from 'react-dom';
import React, {Suspense} from 'react';
import {BrowserRouter} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import Routes from "./Routes";
import {CookiesProvider} from "react-cookie";
import {initLanguage} from "./components/global/language-configuration";
import reportWebVitals from './reportWebVitals';

initLanguage();

ReactDOM.render(
    // <React.StrictMode>
    <I18nextProvider i18n={i18next}>
        <CookiesProvider>
            <BrowserRouter>
                <Suspense fallback="loading">
                    <Routes/>
                </Suspense>
            </BrowserRouter>
        </CookiesProvider>
    </I18nextProvider>,
    // </React.StrictMode>,
    document.getElementById('root')
);
reportWebVitals();
