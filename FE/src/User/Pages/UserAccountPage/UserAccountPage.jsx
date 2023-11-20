import React from 'react'
import Style from './UserAccountPage.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Modal, message, Button, Form, Input } from 'antd';
import HeaderL from '../../../components/HeaderL/Header';
function UserAccountPage() {

  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [editFormVisible, setEditFormVisible] = React.useState(false);

  const [editForm] = Form.useForm();
  const onUpdateFinish = (values) => {
    message.success('Cập nhật thành công!');
  };
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        <HeaderL />
      </div>
      <div className={Style.userAccountPage_sidebar}>
        <Sidebar />
      </div>
      <div className={Style.userAccountPage_ml350} >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Username" name="username" >
            <Input defaultValue="12345@gmail.com" disabled />
          </Form.Item>

          <Form.Item label="Password" name="password" >
            <Input.Password defaultValue="1234567" disabled />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={() => {
              setEditFormVisible(true);
            }}>
              Edit
            </Button>
          </Form.Item>
        </Form>

        <div>
          <Modal width={1000} centered open={editFormVisible} title='Cập nhật bài viết'
            onOk={() => {
              editForm.submit();
            }}
            onCancel={() => {
              setEditFormVisible(false);
            }}
            okText='Save'
            cancelText='Đóng'
          >
            <Form form={editForm} name='edit-form' labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} initialValues={{ remember: true }} onFinish={onUpdateFinish} autoComplete='on'>
              <Form.Item label='UserName' name='nameContent'>
                <Input />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="password"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="password2"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu không chính xác'));
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>

            </Form>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default UserAccountPage