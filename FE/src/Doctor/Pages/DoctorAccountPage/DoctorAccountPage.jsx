import React, { useEffect, useState } from 'react'
import Style from './DoctorAccountPage.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Modal, message, Button, Form, Input } from 'antd';
import HeaderL from '../../../components/HeaderL/Header';
import { ToastContainer, toast } from "react-toastify";
import personalApi from '../../../redux/api/personal.slice';
function DoctorAccountPage() {
  const {data = {}} = personalApi.useGetDetailInforQuery();
  const [email, setEmail] = useState('');
  const [updateAccount] = personalApi.useUpdateDoctorMutation();
  const [editForm] = Form.useForm();
  useEffect(()=>{
    setEmail(data.user?.email);
  },[data.user])
  const onHandleSave = () => {
    editForm.validateFields().then((values)=>{
      updateAccount({
        email: values.email,
        oldPassword: values.oldPassword,
        password: values.password
      }).then((response) => {
        if(response.data) {
          toast.success(response.data.message,{autoClose: 1000});
        } else {
          toast.error(response.error.data.message);
        }
      })
    }).catch(()=>{
      toast.error('Form Không Hợp Lệ!');
    })
  }
  
  return (
    <>
    <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
          <HeaderL />
        </div>
      <div className={Style.doctorAccountPage_sidebar}>
        <Sidebar />
      </div>
      <div className={Style.doctorAccountPage_ml350} >
        <div>
            <Form form={editForm} name='edit-form' fields={[{name:['email'],value: email}]} labelCol={{ span: 5 }} wrapperCol={{span: 15 }} initialValues={{ remember: true }} autoComplete='on'>
              <Form.Item 
                label='Email' 
                name='email'
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                  {
                    pattern: /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: 'Email Không Hợp Lệ !',
                  },
                ]}
                hasFeedback
                >
                <Input onChange={(e)=>setEmail(e.target.value)}/>
              </Form.Item>
              <Form.Item 
                label='Mật Khẩu Cũ' 
                name='oldPassword'
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                hasFeedback
                >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Mật Khẩu Mới"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                  {
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: 'Mật Khẩu Phải Chứa Ít Nhất 1 Ký Tự In Hoa, 1 Ký Tự Thường Và Phải Có Độ Dài Tối Thiểu 8 Ký Tự',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Xác Nhận Lại Mật Khẩu"
                name="password2"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không chính xác'));
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
            </Form>
            <div style={{paddingLeft: '410px', marginTop: '50px'}}>
              <button onClick={onHandleSave}>Cập Nhật</button>
            </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default DoctorAccountPage