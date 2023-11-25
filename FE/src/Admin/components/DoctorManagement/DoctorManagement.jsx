import React from 'react';
import { Table, Button, Form, Input, Modal, Select, Space, Popconfirm, Upload, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import doctorApi from '../../../redux/api/doctor.slice';
import { ToastContainer, toast } from "react-toastify";
import Styles from './DoctorManagement.module.css';
function DoctorManagement() {
  const {data = {}} = doctorApi.useGetListDoctorQuery();
  const [deleteDoctor] = doctorApi.useDeleteDoctorMutation();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      align: 'center',
      width: 100,
      render: (id) => {
        return <p style={{fontWeight: 700}}>{id}</p>
      }
    },
    {
      title: 'Ảnh Đại Diện',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width: 100,
      render: (url) => {
        return <img style={{width: '100px',height: '100px'}} src={url}/>
      }
    },
    {
      title: 'Họ Tên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 200,
      render: (name) => {
        return <p style={{fontWeight: 700, fontSize: '17px'}}>{name}</p>
      }
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: 200,
      render: (email) => {
        return <p style={{fontWeight: 700, fontSize: '17px'}}>{email}</p>
      }
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      width: 200,
      render: (phone) => {
        return <p style={{fontWeight: 700, fontSize: '17px'}}>{phone}</p>
      }
    },
    {
      title: 'Địa Chỉ Công Tác',
      dataIndex: 'work_location',
      key: 'work_location',
      align: 'center',
      width: 200,
      render: (work_location) => {
        return <p style={{fontWeight: 700, fontSize: '17px'}}>{work_location}</p>
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
                const response = await deleteDoctor(record.ID);
                if(response.data) {
                  toast.success(response.data.message,{autoClose: 3000});
                } else {
                  toast.error(response.error.data.message,{autoClose: 3000});
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
      ID: item.Doctor_id,
      image: `http://localhost:3000/detail/image/${item.avatar}`,
      name: item.name,
      email: item.email,
      phone: (item.phone) ? item.phone : 'Chưa Cập Nhật',
      work_location: (item.work_location) ? item.work_location : 'Chưa Cập Nhật'
    }
  })
  
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} bordered pagination={{pageSize: 10}}/>;
      <ToastContainer />
    </div>
  )
}

export default DoctorManagement