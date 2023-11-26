import React from 'react';
import { Table, Button, Form, Input, Modal, Select, Space, Popconfirm, Upload, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import userApi from '../../../redux/api/user.slice';
import { ToastContainer, toast } from "react-toastify";
import Styles from './UserManagement.module.css';
function UserManagement() {
  const { data = {} } = userApi.useGetListUserQuery();
  const [deleteUser] = userApi.useDeleteUserMutation();
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      align: 'center',
      width: 100,
      render: (id) => {
        return <p style={{ fontWeight: 700 }}>{id}</p>
      }
    },
    {
      title: 'Ảnh Đại Diện',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width: 100,
      render: (url) => {
        return <img style={{ width: '100px', height: '100px' }} src={url} />
      }
    },
    {
      title: 'Họ Tên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 200,
      render: (name) => {
        return <p style={{ fontWeight: 700, fontSize: '17px' }}>{name}</p>
      }
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: 200,
      render: (email) => {
        return <p style={{ fontWeight: 700, fontSize: '17px' }}>{email}</p>
      }
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      width: 200,
      render: (phone) => {
        return <p style={{ fontWeight: 700, fontSize: '17px' }}>{phone}</p>
      }
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      width: 200,
      render: (address) => {
        return <p style={{ fontWeight: 700, fontSize: '17px' }}>{address}</p>
      }
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
              onConfirm={async () => {
                const response = await deleteUser(record.ID);
                if (response.data) {
                  toast.success(response.data.message, { autoClose: 3000 });
                } else {
                  toast.error(response.error.data.message, { autoClose: 3000 });
                }
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
  const dataSource = data.data?.map(item => {
    return {
      ID: item.User_id,
      image: `http://localhost:3000/detail/image/${item.avatar}`,
      name: item.name,
      email: item.email,
      phone: (item.phone) ? item.phone : 'Chưa Cập Nhật',
      address: (item.address) ? item.address : 'Chưa Cập Nhật'
    }
  })

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} bordered pagination={{ pageSize: 10 }} />;
      <ToastContainer />
    </div>
  )
}

export default UserManagement