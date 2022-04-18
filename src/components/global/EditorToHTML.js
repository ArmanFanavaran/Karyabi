import React from 'react';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';

export default function HtmlComponent(props) {
    const html = props.val;
    // console.log(props.className)
    return (
        <div className={props.className}>{ReactHtmlParser(html)}</div>
    )
}