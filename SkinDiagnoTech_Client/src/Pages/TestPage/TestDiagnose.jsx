import { useEffect, useState, useRef } from "react";
import Styles from "./TestPage.module.css";
function TestDiagno() {
    const [avatar, setAvatar] = useState();
    const [uploadDescription, setUploadDescription] = useState("Upload the image");
    const [result, setResult] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => avatar && URL.revokeObjectURL(avatar.preview);
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    const handleUploadClick = () => {
        setUploadDescription("Upload the image");
        fileInputRef.current.click();
    };
// Vang
/********************** *****************************/
    const handleScanClick = async () => {
        if(!avatar) {
            alert('Please Upload Image');
        }
        else {
            const formData = new FormData();
            formData.append('image',avatar);
            const response = await fetch('http://localhost:3700/scan',{
                method: 'POST',
                body: formData
            });
            const data =  await response.json();
            setResult(data)
        }
    }
/********************** *****************************/

    return (
        <>
            <div className={Styles.testDiagno}>
                {avatar && (
                    <img
                        style={{ marginTop: 8 }}
                        src={avatar.preview}
                        alt=""
                        height="500px"
                        width="80%"
                    />
                )}
                {!avatar && <div className={Styles.uploadDescription}>{uploadDescription}</div>}
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handlePreviewAvatar}
                    style={{ display: "none" }}
                    aria-label={uploadDescription}
                />
            </div>
            <div className={Styles.btn}>
                <button className={Styles.btn_upload} onClick={handleUploadClick}>
                    Upload
                </button>

                <button className={Styles.btn_scna} onClick={handleScanClick}>
                    Scan
                </button>
            </div>
        </>
    );
}

export default TestDiagno;