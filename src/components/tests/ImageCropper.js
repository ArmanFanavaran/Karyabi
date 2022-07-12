import Cropper from 'react-easy-crop'
import {useState} from "react";
import Modal from "react-modal";
import * as React from "react";


export default function ImageCropper() {
    const [file, setFile] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const customStyles = {

        content: {
            top: '56%',
            left: '50%',
            width: '90%',
            maxWidth: '1000px',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            zIndex: '1',
            borderRadius: '15px',
            padding: '20px',
            // marginTop:'30px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#6969dd #e0e0e0',
            height: '85vh',
            transform: 'translate(-50%, -50%)',

        },
        webkitScrollbar: {width: "1em"},
        webkitScrollbarTrack: {boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)"},
        webkitScrollbarThumb: {backgroundColor: "darkgrey", outline: "1px solid slategrey"}
    }

    const onSelectFile = (event) => {
        setFile(event.target.files[0]);
        setIsModalOpen(true);
    }

    // const showCroppedImage = () => {
    //     try {
    //         const croppedImage = await getCroppedImg(
    //             dogImg,
    //             croppedAreaPixels,
    //             rotation
    //         )
    //         console.log('done', { croppedImage })
    //         setCroppedImage(croppedImage)
    //     } catch (e) {
    //         console.error(e)
    // }
    return (
        <div className={'w-100'}>

            <input type={'file'} accept="image/*" onChange={onSelectFile}/>

            <Modal
                isOpen={isModalOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel=""
            >

                <div className={'container'}>
                    {/*<Cropper*/}
                    {/*    image={file}*/}
                    {/*    // crop={}*/}
                    {/*    // rotation={rotation}*/}
                    {/*    // zoom={zoom}*/}
                    {/*    aspect={1}*/}
                    {/*    // onCropChange={setCrop}*/}
                    {/*    // onRotationChange={setRotation}*/}
                    {/*    // onCropComplete={onCropComplete}*/}
                    {/*    // onZoomChange={setZoom}*/}
                    {/*/>*/}
                </div>

            </Modal>
        </div>
    );
}