import React from 'react';
import { Table, Button, Form, Input, Modal, Select, Space, Popconfirm, Upload, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
function DoctorManagement() {
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },

    {
      title: 'Thư điện tử',
      dataIndex: 'email',
      key: 'email',

    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',

    },
    {
      title: 'Bộ Phận',
      dataIndex: 'room',
      key: 'room',

    },

    {
      title: '',
      key: 'actions',

      render: (text, record) => {
        return (
          <Space>
            <Popconfirm
              style={{ width: 800 }}
              title='Are you sure delete?'
              onConfirm={() => {
                message.success('Xóa thành công!');
              }}
              onCancel={() => { }}
              okText='Đồng ý'
              cancelText='Đóng'
            >
              <Button danger type='dashed' icon={<DeleteOutlined />} />
            </Popconfirm>
            <Button
              type='dashed'
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedRecord(record);
                console.log('Selected Record', record);
                updateForm.setFieldsValue(record);
                setEditFormVisible(true);
              }}
            />
          </Space>
        );
      },
    },
  ];
  const onFinish = (values) => {
    message.success('Thêm mới thành công!');
  };
  const onUpdateFinish = (values) => {
    message.success('Cập nhật thành công!');
  };
  const dataSource = [
    {
      ID: '1',
      image: 'image_url_1',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
      room: 'Room 1',
    },
    {
      ID: '2',
      image: 'image_url_2',
      fullName: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '9876543210',
      room: 'Room 2',
    },
    {
      ID: '1',
      image: 'image_url_1',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
      room: 'Room 1',
    },
    {
      ID: '1',
      image: 'image_url_1',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
      room: 'Room 1',
    },
  ];
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  return (
    <div>
      <Form form={createForm} name='create-form' labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true }} onFinish={onFinish} autoComplete='on'>
        <Form.Item label='Họ' name='fullName' rules={[{ required: true, message: 'Chưa nhập Họ và Tên' }]} hasFeedback>
          <Input />
        </Form.Item>


        <Form.Item label='Số điện thoại' name='phone' rules={[{ required: true, message: 'Chưa nhập Số điện thoại' }]} hasFeedback>
          <Input />
        </Form.Item>

        <Form.Item
          hasFeedback
          label='Thư điện tử'
          name='email'
          rules={[
            { required: true, message: 'Chưa nhập Thư điện tử' },
            { type: 'email', message: 'Thư điện tử không hợp lệ' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Bộ phận" name='room' rules={[{ required: true, message: 'Chưa chọn Phòng ban' }]} hasFeedback>
          <Select>
            <Select.Option value="demo">1</Select.Option>
            <Select.Option value="demo">2</Select.Option>
            <Select.Option value="demo">3</Select.Option>
            <Select.Option value="demo">4</Select.Option>
          </Select>
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
      <Table columns={columns} dataSource={dataSource} />;
      <Modal
        centered
        open={editFormVisible}
        title='Cập nhật thông tin'
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        okText='Lưu thông tin'
        cancelText='Đóng'
      >
        <Form form={updateForm} name='update-form' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onUpdateFinish} autoComplete='on'>
          <Form.Item label='Họ' name='fullName' rules={[{ required: true, message: 'Chưa nhập Họ và Tên' }]} hasFeedback>
            <Input />
          </Form.Item>


          <Form.Item label='Số điện thoại' name='phone' rules={[{ required: true, message: 'Chưa nhập Số điện thoại' }]} hasFeedback>
            <Input />
          </Form.Item>

          <Form.Item
            hasFeedback
            label='Thư điện tử'
            name='email'
            rules={[
              { required: true, message: 'Chưa nhập Thư điện tử' },
              { type: 'email', message: 'Thư điện tử không hợp lệ' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Bộ phận" name='room' rules={[{ required: true, message: 'Chưa chọn Phòng ban' }]} hasFeedback>
            <Select>
              <Select.Option value="demo">1</Select.Option>
              <Select.Option value="demo">2</Select.Option>
              <Select.Option value="demo">3</Select.Option>
              <Select.Option value="demo">4</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Upload" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DoctorManagement