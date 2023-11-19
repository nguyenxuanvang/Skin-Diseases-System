import React from 'react'
import Style from './EditInformationPage.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Reactquill from '../../Components/Text_Editor'
import { BsFillInfoCircleFill, BsFillBagPlusFill, BsHospitalFill, BsBookFill } from "react-icons/bs";
import { Button, Form, Input, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Header from '../../../Doctor/Components/Header'
function EditInformationPage() {

    const [messageApi, contextHolder] = message.useMessage();
    const [createForm] = Form.useForm();
    const success = () => {
        messageApi
            .open({
                type: 'loading',
                content: 'Updating..',
                duration: 2.5,
            })
            .then(() => message.success('Update Successfully', 2.5))
    };

    return (
        <>
            <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
                <Header />
            </div>
            <div className={Style.editInformationPage_sidebar}>
                <Sidebar />
            </div>
            <div className={Style.editInformationPage_carrer}>

                <div className={Style.editInformationPage_list} style={{ paddingTop: '50px' }} >
                    <Form form={createForm} name='create-form' labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} initialValues={{ remember: true }}>
                        <Form.Item label='Tên người dùng' name='nameContent' rules={[{ required: true, message: 'Chưa nhập Tiêu đề' }]} hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Nội dung' name='context' hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Số điện thoại' name='context' hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Địa chỉ' name='context' hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Avatar" valuePropName="fileList" >
                            <Upload action="/upload.do" listType="picture-card" >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Form>
                </div>

                <div className={Style.editInformationPage_list} >
                    <div className={Style.list_edit}>
                        <h2><BsFillInfoCircleFill /> Nội dung giới thiệu</h2>
                    </div>
                    <Reactquill />
                </div>

                <div className={Style.editInformationPage_list} >
                    <div className={Style.list_edit}>
                        <h2><BsFillBagPlusFill /> Nội dung Chức vụ</h2>
                    </div>
                    <Reactquill />
                </div>

                <div className={Style.editInformationPage_list} >
                    <div className={Style.list_edit}>
                        <h2><BsHospitalFill /> Nội dung địa chỉ</h2>
                    </div>
                    <Reactquill />
                </div>

                <div className={Style.editInformationPage_list} >
                    <div className={Style.list_edit}>
                        <h2><BsBookFill /> Nội dung kinh nghiệm</h2>
                    </div>
                    <Reactquill />
                </div>

                <div className='text-center' style={{ marginBottom: '20px' }}>
                    {contextHolder}
                    <button className={Style.btn_update} onClick={success}>Update</button>
                </div>
            </div>
        </>
    )
}

export default EditInformationPage