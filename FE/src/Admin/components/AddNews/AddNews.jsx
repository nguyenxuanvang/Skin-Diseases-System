import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Table, Button, Form, Input, Modal, Select, Space, Popconfirm, Upload, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import React_Quill from '../Text-Editor';
import { ToastContainer, toast } from "react-toastify";
import Styles from './AddNews.module.css';
import newsApi from '../../../redux/api/news.slice';
import diseaseApi from '../../../redux/api/disease.slice';
function NewsManagement() {
  const [createNews] = newsApi.useCreateNewsMutation();
  const [uploadDisease] = diseaseApi.useUploadMutation();
  const [avatar, setAvatar] = useState();
  const [uploadDescription, setUploadDescription] = useState("Upload Ảnh");
  const fileInputRef = useRef(null);
  const [createForm] = Form.useForm();

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

  const handleUploadClick = () => {
    setUploadDescription("Upload Ảnh");
    fileInputRef.current.click();
  };

  const handleCreateNews = () => {
    createForm.validateFields().then(values => {
      if(avatar) {
        const formData = new FormData();
        formData.append('news',avatar);
        formData.append('Title',values.Title);
        formData.append('Content',values.Content);
        createNews(formData).then((response)=>{
          if(response.data) {
            toast.success(response.data.message,{autoClose: 1000});
            createForm.resetFields();
            setAvatar("");
          } else {
            toast.error(response.error.data.message,{autoClose: 3000});
          }
        });
      } else {
        toast.error('Vui Lòng Upload Thêm Ảnh !',{autoClose: 3000});
      }
    }).catch((error)=>{
      toast.error("Vui Lòng Nhập Đầy Đủ Tiêu Đề Và Nội Dung !",{autoClose: 3000});
    })
  }

  // const handleUpload = async () => {
  //   createForm.validateFields().then(values => {
  //       uploadDisease({
  //         Title: values.Title,
  //         Content: values.Content 
  //       }).then((response)=>{
  //         if(response.data) {
  //           toast.success(response.data.message,{autoClose: 1000});
  //           createForm.resetFields();
  //         } else {
  //           toast.error(response.error.data.message,{autoClose: 3000});
  //         }
  //       });
  //   }).catch((error)=>{
  //     toast.error("Vui Lòng Nhập Đầy Đủ Tiêu Đề Và Nội Dung !",{autoClose: 3000});
  //   })
  // }

  return (
    <div>
      <div style={{ textAlign: '-webkit-center' }}>
        <div className={Styles.testDiagno}>
          {avatar && (
            <img
              src={avatar.preview}
              alt=""
              height="500px"
              width="80%"
            />
          )}
          {!avatar && <div className={Styles.uploadDescription}>{uploadDescription}</div>}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePreviewAvatar}
            style={{ display: "none" }}
            aria-label={uploadDescription}
          />
        </div>
        <div className={Styles.btn}>
          <button className={Styles.btn_upload} onClick={handleUploadClick}>
            Upload
          </button>
        </div>
      </div>
      <Form form={createForm} name='create-form' labelCol={{ span: 3 }} initialValues={{ remember: true }} autoComplete='on'>
        <Form.Item
          label='Tiêu Đề'
          name='Title'
          rules={[{ required: true, message: 'Chưa nhập Tiêu đề' }]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Nội dung'
          name='Content'
          rules={[{ required: true, message: 'Chưa nhập Nội Dung' }]}
          hasFeedback
        >
          <textarea
            rows="10"
            cols="151"
            placeholder="Nhập nội dung tin tức..."
          />
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center' }}>
        <button onClick={handleCreateNews}>Tạo Bài Viết</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default NewsManagement