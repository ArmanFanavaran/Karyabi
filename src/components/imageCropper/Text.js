import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {useEffect, useState} from "react";
import img from "../index/imgs/newsSample.png"
function CropDemo({ src }) {
    const [crop, setCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50,
        disabled: true
    })
    return (
        <ReactCrop crop={crop} onChange={c => setCrop(c)} >
            <img src={src} />
        </ReactCrop>
    )
}
export default function Text(){

    return(
        <div className={'container pt-5'}>
            <div className={'row'}>
                <div className={'col-12 text-center mt-5 pt-5'}>
                    <CropDemo src={img}/>
                </div>
            </div>
        </div>
    )
}