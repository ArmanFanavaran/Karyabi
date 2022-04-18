import Style from "./FrameResume.module.css"
import * as React from "react";
import {useEffect} from "react";

export default function FirstResume(props) {

    useEffect(function (){

    },[])
    return(
        <div className={Style.wrap }>
        <iframe  src="https://localhost:3000/resume/show?lang=fa&preview=true&scale=2"
                className={Style.frame+' w-100'} width={100} height={100} ></iframe>
        </div>
    )
}