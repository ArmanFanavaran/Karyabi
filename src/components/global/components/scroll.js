import $ from "jquery";
import {useEffect} from 'react';
import {withRouter} from "react-router-dom";

function ScrollTop({ history }) {
    useEffect(function (){
        const unlisten = history.listen(() => {
            // window.scrollTo(0, 0);
            $([document.documentElement, document.body]).animate({
                scrollTop: 0
            }, 1000);
        });
        console.log("ssadsa asdf xc vsfda")

        if ($('#toggle-menu').hasClass('show')) {
            console.log("hello")

            $('#toggle-menu').removeClass('show');
        }
        return () => {
            unlisten();
        }
    }, []);

    return (null);

}

export default withRouter(ScrollTop)