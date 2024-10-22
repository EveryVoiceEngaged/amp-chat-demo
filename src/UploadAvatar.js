import React, {useState} from "react";
import Avatar from "react-avatar-edit";

const UploadAvatar = () => {
const [src, setSrc] = useState(null);
const [preview, setPreview] = useState(null);

const onClose =()=>{
    setPreview(null);
}
const onCrop = view =>{
    setPreview(view);
}

    return (<div>
        <Avatar 
            width = {400}
            height = {300}
            onCrop = {onCrop}
            onClose = {onClose}
            src ={src}
        />
        <img src={preview}/>
    </div>
    );
}

export default UploadAvatar;