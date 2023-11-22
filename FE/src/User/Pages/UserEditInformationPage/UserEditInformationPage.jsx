import React from 'react'
import Style from './UserEditInformationPage.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Reactquill from '../../../components/Text_Editor';
import { BsFillInfoCircleFill, BsFillBagPlusFill, BsHospitalFill, BsBookFill } from "react-icons/bs";
import { Button, Form, Input, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HeaderL from '../../../components/HeaderL/Header';
function UserEditInformationPage() {

    const [messageApi, contextHolder] = message.useMessage();
    const [createForm] = Form.useForm();

    return (
        <>
            <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
                <HeaderL />
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

                        <Form.Item label='Số điện thoại' name='context' hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Địa chỉ' name='context' hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Avatar" valuePropName="fileList" >
                            <Upload 
                                action="/upload.do" 
                                listType="picture-card"
                                accept="image/*" >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Form>
                </div>

                <div className='text-center' style={{ marginBottom: '20px', display: 'flex', marginLeft: '280px' }}>
                    {contextHolder}
                    <button className={Style.btn_update}>Update</button>
                </div>
            </div>
        </>
    )
}

export default UserEditInformationPage