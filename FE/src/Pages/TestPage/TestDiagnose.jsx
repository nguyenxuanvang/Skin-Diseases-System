import { useEffect, useState, useRef } from "react";
import diseaseApi from "../../redux/api/disease.slice";
import { useMyContext } from "../../MyContext/context";
import { Spin } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import Styles from "./TestPage.module.css";
function TestDiagno() {
    const { data, updateData } = useMyContext();
    const [avatar, setAvatar] = useState();
    const [uploadDescription, setUploadDescription] = useState("Upload Ảnh");
    const [predict, { data: result = '', isLoading }] = diseaseApi.usePredictMutation();
    const fileInputRef = useRef(null);

    useEffect(() => {
        updateData(result);
    }, [result])

    useEffect(() => {
        return () => avatar && URL.revokeObjectURL(avatar.preview);
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setAvatar(file);
        }
    };
    const handleUploadClick = () => {
        setUploadDescription("Upload Ảnh");
        fileInputRef.current.click();
    };

    const handleScanClick = async () => {
        if (!avatar) {
            toast.error('Vui Lòng Upload Thêm Ảnh !',{autoClose: 3000});
        }
        else {
            if (avatar.type === 'image/jpeg' || avatar.type === 'image/png') {
                const formData = new FormData();
                formData.append('image', avatar);
                predict(formData);
            } else {
                toast.error('Ảnh Upload Không Hợp Lệ !',{autoClose: 3000});
            }
        }
    }
    return (
        <>
            <Spin spinning={isLoading} size="large" tip="Đang Chẩn Đoán...">
                <div style={{ textAlign: '-webkit-center' }}>
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
                            accept="image/*"
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
                </div>
            </Spin>
            <ToastContainer />
        </>
    );
}

export default TestDiagno;