import React from 'react';
import { Table, Button, Form, Input, Modal, Select, Space, Popconfirm, Upload, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
function DoctorManagement() {
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
          </Space>
        );
      },
    },
  ];
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
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />;
    </div>
  )
}

export default DoctorManagement