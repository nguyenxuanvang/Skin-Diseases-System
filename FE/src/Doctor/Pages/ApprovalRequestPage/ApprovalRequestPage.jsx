import React, { useEffect, useRef, useState } from 'react'
import Style from './ApprovalRequestPage.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Table, Modal, Button, Popconfirm } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import HeaderL from '../../../components/HeaderL/Header';
import { ToastContainer, toast } from "react-toastify";
import personalApi from '../../../redux/api/personal.slice';
import doctorApi from '../../../redux/api/doctor.slice';
function ApprovalRequestPage() {
  const { data: info = {} } = personalApi.useGetDetailInforQuery();
  const { data = {} } = doctorApi.useGetListRequestDetailQuery();
  const [sendRequest] = doctorApi.useSendRequestMutation();
  const [deleteRequest] = doctorApi.useDeleteRequestMutation();
  const [avatar, setAvatar] = useState();
  const [uploadDescription, setUploadDescription] = useState("Upload Image");
  const fileInputRef = useRef(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar(file);
    }
  };

  const formatDate = (str) => {
    const date = new Date(str);
    const time = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
      + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`)
      + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`)
      + ' ' + ((date.getHours() > 11) ? 'PM' : 'AM');
    return time;
  }

  const handleUploadClick = () => {
    setUploadDescription("Upload the image");
    fileInputRef.current.click();
  };
  const onSendRequest = async () => {
    if (!avatar) {
      toast.error("Vui Lòng Upload Ảnh", { autoClose: 1500 });
    } else {
      if (avatar.type === 'image/jpeg' || avatar.type === 'image/png') {
        const formData = new FormData();
        formData.append('certificate', avatar);
        const response = await sendRequest(formData);
        if (response.data) {
          toast.success(response.data.message, { autoClose: 1500 });
          setIsOpenForm(false);
          setAvatar("");
          fileInputRef.current.value = "";
        } else {
          toast.error(response.error.data.message, { autoClose: 5000 });
        }
      } else {
        toast.error("Ảnh Upload Không Hợp Lệ", { autoClose: 1500 });
      }
    }

  }
  const onDeleteRequest = async () => {
    const response = await deleteRequest();
    if (response.data) {
      toast.success(response.data.message, { autoClose: 1500 });
    } else {
      toast.error(response.error.data.message, { autoClose: 1500 });
    }
  }

  const columns = [
    {
      title: 'Ảnh Chứng Chỉ',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      align: 'center',
      render: (url) => {
        return <img className={Style.img} src={`http://localhost:3000/doctor/request/${url}`} />
      },
    },
    {
      title: 'Ngày Gửi',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      width: 150,
      render: (date) => {
        return <p style={{ fontWeight: 700 }}>{date}</p>
      }
    },

    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'member',
      align: 'center',
      width: 100,
      render: (status) => {
        return <p style={{ fontWeight: 700, color: (status !== "Từ Chối") ? "green" : "red" }}>
          {status}
          {(status !== "Từ Chối")
            ?
            <Popconfirm
              style={{ width: 800 }}
              title='Bạn Muốn Xóa Yêu Cầu Xét Duyệt ?'
              onConfirm={async () => { onDeleteRequest() }}
              onCancel={() => { }}
              okText='Đồng ý'
              cancelText='Đóng'
            >
              <Button
                type='dashed'
                icon={<CloseCircleOutlined />}
                className={Style.denyIcon}
                onClick={async () => { }}
              ></Button>
            </Popconfirm>

            :
            ""
          }

        </p>
      }
    },
  ];
  const dataSource = data.data?.map(item => {
    return {
      image: item?.image,
      date: formatDate(item?.createdAt),
      status: (item?.approval_id) ? "Đang Chờ Xét Duyệt" : "Từ Chối"
    }
  });
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        <HeaderL />
      </div>
      <div style={{ display: 'flex', marginTop: "110px" }}>
        <div className={Style.approvalRequestPage_sidebar}>
          <Sidebar />
        </div>
        {
          (!info.user?.approved)
            ?
            <div className={Style.approvalRequestPage_content}>
              <div style={{ textAlign: "center", marginTop: "15px" }}>
                <button onClick={() => { setIsOpenForm(true) }}>Yêu Cầu Xét Duyệt</button>
              </div>
              <Modal
                width={1100}
                centered
                open={isOpenForm}
                title='Upload Ảnh Chứng Chỉ Tại Đây'
                onOk={async () => { onSendRequest() }}
                onCancel={() => { setIsOpenForm(false); setAvatar(""); fileInputRef.current.value = "" }}
                okText='Gửi Yêu Cầu'
                cancelText='Đóng'
              >
                <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', gap: "15px" }}>
                  <div className={Style.testDiagno}>
                    {avatar && (
                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={avatar.preview}
                        alt=""
                        height="500px"
                        width="80%"
                      />
                    )}
                    {!avatar && <div className={Style.uploadDescription}>{uploadDescription}</div>}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePreviewAvatar}
                      style={{ display: "none" }}
                      aria-label={uploadDescription}
                    />
                  </div>
                  <div className={Style.btn}>
                    <button className={Style.btn_upload} onClick={handleUploadClick}>
                      Upload
                    </button>
                  </div>
                </div>
              </Modal>
              <div>
                <p className={Style.currentRequest}>Danh Sách Yêu Cầu Xét Duyệt Đã Gửi</p>
                <Table columns={columns} dataSource={dataSource} bordered pagination={false} />
              </div>
            </div>
            :
            <div className={Style.approvalRequestPage_content_approved}>
              <img style={{width: "500px", height: "380px"}} src='http://localhost:3000/doctor/request/approve.png'/>
              <p style={{fontSize: "17px", color: "#12d212", fontWeight: "700", marginRight: "70px"}}>Tài Khoản Đã Được Xác Thực
                      <img style={{width: "25px", height: "25px"}} src="http://localhost:3000/doctor/request/tick.png"/>
              </p>
            </div>
        }
      </div>

      <ToastContainer />
    </>

  )
}

export default ApprovalRequestPage