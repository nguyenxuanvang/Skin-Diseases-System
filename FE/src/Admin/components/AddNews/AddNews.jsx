import React from 'react';
import { Table, Button, Form, Input, Modal, Select, Space, Popconfirm, Upload, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import React_Quill from '../Text-Editor';
function NewsManagement() {
  const { TextArea } = Input;
  const onFinish = (values) => {
    message.success('Thêm mới thành công!');
  };
  const [createForm] = Form.useForm();
  return (
    <div>
      <Form form={createForm} name='create-form' labelCol={{ span: 3 }} initialValues={{ remember: true }} onFinish={onFinish} autoComplete='on'>
        <Form.Item label='Tên bài viết' name='nameContent' rules={[{ required: true, message: 'Chưa nhập Tiêu đề' }]} hasFeedback>
          <Input />
        </Form.Item>

        <Form.Item label='Ngày viết bài' name='date' rules={[{ required: true, message: 'Chưa nhập Thời gian' }]} hasFeedback>
          <Input />
        </Form.Item>

        <Form.Item label='Nội dung' name='context' hasFeedback>
          <div>
          <React_Quill/>
          </div>  
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Lưu thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default NewsManagement