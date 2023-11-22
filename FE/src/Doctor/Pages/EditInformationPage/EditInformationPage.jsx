import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Style from './EditInformationPage.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Avatar, Button, Form, Input, Upload, message } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import personalApi from '../../../redux/api/personalApi.slice';
import { useNavigate } from "react-router-dom";
import HeaderL from '../../../components/HeaderL/Header';
function EditInformationPage() {
    const { data = {} } = personalApi.useGetDetailInforQuery();
    const [updateDoctor] = personalApi.useUpdateDoctorMutation();
    const [doctor, setDoctor] = useState({});
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState();
    const [uploadDescription, setUploadDescription] = useState("Upload Image");
    const fileInputRef = useRef(null);

    useEffect(() => {
        setDoctor(data.user);
    }, [data]);
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
        setUploadDescription("Upload the image");
        fileInputRef.current.click();
    };

    const handleOnUpdate = async () => {
        const values = await form.validateFields();
        const response = await updateDoctor({
                name: values.name,
                position: values.position,
                work_location: values.work_location,
                experience: values.experience,
                phone: values.phone,
                address: values.address,
                introduce: values.introduce
             });
    };

    return (
        <>
            <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
                <HeaderL />
            </div>
            <div className={Style.editInformationPage_sidebar}>
                <Sidebar />
            </div>
            <div className={Style.editInformationPage_carrer}>

                <div className={Style.editInformationPage_list} style={{ paddingTop: '50px', display: 'flex' }} >
                    <Form
                        form={form}
                        fields={[
                            {
                                name: ["name"],
                                value: (doctor) ? doctor.name : ""
                            },
                            {
                                name: ["phone"],
                                value: (doctor) ? doctor.phone : ""
                            },
                            {
                                name: ["address"],
                                value: (doctor) ? doctor.address : ""
                            },
                            {
                                name: ["work_location"],
                                value: (doctor) ? doctor.work_location : ""
                            },
                            {
                                name: ["position"],
                                value: (doctor) ? doctor.position : ""
                            },
                            {
                                name: ["introduce"],
                                value: (doctor) ? doctor.introduce : ""
                            },
                            {
                                name: ["experience"],
                                value: (doctor) ? doctor.experience : ""
                            }
                        ]} style={{ flex: 5 }} name='form' labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Form.Item label='Tên bác sĩ' name='name' rules={[{ required: true, message: 'Tên Không Được Phép Bỏ Trống' }]} hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Số điện thoại' name='phone' hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Địa chỉ' name='address' hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Địa chỉ công tác' name='work_location' hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Chức vụ' name='position' hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Giới thiệu' name='introduce' hasFeedback>
                            <textarea
                                rows="3"
                                cols="43"
                                placeholder="Nhập nội dung giới thiệu..."
                            />
                        </Form.Item>

                        <Form.Item label='Kinh nghiệm' name='experience' hasFeedback>
                            <textarea
                                rows="2"
                                cols="43"
                                placeholder="Nhập nội dung kinh nghiệm..."
                            />
                        </Form.Item>
                    </Form>
                    <div style={{ flex: 1 }}>
                        <div className={Style.testDiagno}>
                            <img
                                style={{ marginTop: 8, height: "100%", width: "100%" }}
                                src={(avatar) ? avatar.preview : `http://localhost:3000/detail/image/${(doctor) ? doctor.avatar : ""}`}
                                alt=""
                                height="500px"
                                width="80%"
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePreviewAvatar}
                                style={{ display: "none" }}
                                aria-label={uploadDescription}
                            />
                        </div>
                        <div className={Style.btn}>
                            <button className={Style.btn_upload} onClick={handleUploadClick}>
                                Upload
                            </button>
                        </div>
                    </div>
                </div>


                <div className='text-center' style={{ marginBottom: '20px' }}>
                    <button className={Style.btn_update} onClick={handleOnUpdate}>Update</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default EditInformationPage