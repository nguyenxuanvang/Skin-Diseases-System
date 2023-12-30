import React, {useEffect, useState} from 'react';
import { Table, Button, Space, Popconfirm, message, Input, Modal } from 'antd';
import { EyeFilled, CloseCircleOutlined } from '@ant-design/icons';
import Styles from './Approval.module.css';
import { ToastContainer, toast } from "react-toastify";
import doctorApi from '../../../redux/api/doctor.slice';
function Approval() {
  const {data = {}} = doctorApi.useGetListRequestQuery();
  const [approval] = doctorApi.useApprovalAccountMutation();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selected, setSelected] = useState({});
  const formatDate = (str) => {
    const date = new Date(str);
    const time = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`)
        + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`)
        + ' ' + ((date.getHours() > 11) ? 'PM' : 'AM');
    return time;
  }
  const onDeny = async (selected) => {
    const response = await approval({id: selected.id, result: "no"});
    if(response.data) {
      toast.success(response.data.message,{autoClose: 1500});
    } else {
      toast.error(response.error.data.message,{autoClose: 1500});
    }
  }
  const onApproved = async (selected) => {
    const response = await approval({id: selected.id, result: "yes"});
    if(response.data) {
      toast.success(response.data.message,{autoClose: 1500});
      setIsOpenForm(false);
    } else {
      toast.error(response.error.data.message,{autoClose: 1500});
    }
  }
  
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 300,
      align: 'center',
      render: (url) => {
        return <img className={Styles.img} src={`http://localhost:3000/doctor/request/${url}`} />
      },
    },
    {
      title: 'Ngày Gửi',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      width: 350,
      render: (date) => {
        return <p style={{ fontWeight: 700 }}>{date}</p>
      }
    },

    {
      title: 'Người Gửi',
      dataIndex: 'author',
      key: 'member',
      align: 'center',
      width: 350,
      render: (name) => {
        return <p style={{ fontWeight: 700 }}>{name}</p>
      }
    },

    {
      title: '',
      key: 'actions',
      align: 'center',
      render: (text, record) => {
        return (
          <Space>
             <Button
              type='dashed'
              icon={<EyeFilled />}
              onClick={() => {setIsOpenForm(true);setSelected(record)}}
            />
            <Button
              type='dashed'
              icon={<CloseCircleOutlined />}
              className= {Styles.denyIcon}
              onClick={async() => {onDeny(record)}}
            >Từ Chối</Button>
          </Space>
        );
      },
    },
  ];
  const dataSource = data.data?.map(item => {
    return {
      id: item["Doctor.Doctor_id"],
      image: item.image,
      date: formatDate(item.createdAt),
      author: item["Doctor.name"]
    }
  })

  return (
    <>
      <div>
        <Table columns={columns} dataSource={dataSource} bordered />;
        <Modal
        width={1100}
        centered
        open={isOpenForm}
        title='Duyệt Tài Khoản'
        onOk={()=>{onApproved(selected)}}
        onCancel={() => {setIsOpenForm(false)}}
        okText='Duyệt'
        cancelText='Đóng'
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px'}}>
        <div className={Styles.testDiagno}>
          <img
            style={{ borderRadius: '10px', height: "100%", width: "100%" }}
            src={`http://localhost:3000/doctor/request/${selected.image}`}
            alt="Ảnh Chứng Chỉ"
            height="500px"
            width="80%"
          />
        </div>
        </div>
      </Modal>
      </div>
      <ToastContainer />
    </>
  )
}

export default Approval