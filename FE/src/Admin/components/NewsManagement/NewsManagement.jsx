import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Form, Input, Modal, Space, Popconfirm, Upload, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import newsApi from '../../../redux/api/news.slice';
import { ToastContainer, toast } from "react-toastify";
import Styles from './NewsManagement.module.css';
function NewsManagement() {
  const [searchNews, {data = {}}] = newsApi.useLazyGetSearchNewsQuery();
  const [updateNews] = newsApi.useUpdateNewsMutation();
  const [deleteNews] = newsApi.useDeleteNewsMutation();
  const [list, setList] = useState([]);
  const [avatar, setAvatar] = useState();
  const [uploadDescription, setUploadDescription] = useState("Upload Image");
  const fileInputRef = useRef(null);
  const [updateForm] = Form.useForm();
  const [record, setSelectedRecord] = React.useState(null);
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const { Search } = Input;

  useEffect(()=>{
    searchNews({title: ""});
  },[]);
  useEffect(() => {
    setList(data.data);
  }, [data.data]);

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
    setUploadDescription("Upload the image");
    fileInputRef.current.click();
  };

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      align: 'center',
      render: (url) => {
        return <img className={Styles.img} src={`http://localhost:3000/news/image/${url}`} />
      },
    },
    {
      title: 'Tiêu Đề',
      dataIndex: 'Title',
      key: 'title',
      width: 200,
      align: 'center',
      render: (text) => {
        return <p className={Styles.title}>{text}</p>
      },
    },
    {
      title: 'Ngày Đăng',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      align: 'center',
      render: (date) => {
        return <p className={Styles.date}>{date}</p>
      },
    },

    {
      title: 'Nội dung',
      dataIndex: 'Content',
      key: 'Content',
      width: 500,
      align: 'center',
      render: (text) => {
        return <p className={Styles.content}>{text}</p>;
      },
    },

    {
      title: '',
      key: 'actions',

      render: (text, record) => {
        return (
          <Space>
            <Popconfirm
              style={{ width: 800 }}
              title='Bạn Có Chắc Chắn Muốn Xóa ?'
              onConfirm={async () => {
                const response = await deleteNews(record.id);
                toast.success(response.data.message,{autoClose: 1000});
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
                updateForm.setFieldsValue(record);
                setEditFormVisible(true);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const onHandleUpdate = () => {
    updateForm.validateFields().then((values)=>{
      const formData = new FormData();
      formData.append('news',avatar);
      formData.append('Title',values.Title);
      formData.append('Content',values.Content);
      updateNews({
        id: values.id,
        arg: formData
    }).then((response) => {
        if(response.data) {
          toast.success(response.data.message,{autoClose: 1000});
          setEditFormVisible(false);
        } else {
          toast.error(response.error.data.message,{autoClose: 3000});
        }
      })
    }).catch(()=>{
      toast.error("Invalid Form !",{autoClose: 3000});
    })
  };


  const dataSource = list?.map(item => {
    return {
      id: item.News_id,
      image: item.image,
      Title: item.Title,
      date: `${new Date(item.updatedAt).getDate()} - ${new Date(item.updatedAt).getMonth() + 1} - ${new Date(item.updatedAt).getFullYear()}`,
      Content: item.Content
    }
  });
  return (
    <div>
      <Search
        placeholder="Tìm kiếm Theo Tiêu Đề"
        size="large"
        onChange={(e)=>{searchNews({title: e.target.value});}}
        /*onSearch={onSearch}*/
      />
      <Table columns={columns} dataSource={dataSource} bordered pagination={{ pageSize: 10 }} />;
      <Modal
        width={1100}
        centered
        open={editFormVisible}
        title='Cập nhật Tin Tức'
        onOk={onHandleUpdate}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        okText='Lưu thông tin'
        cancelText='Đóng'
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px'}}>
        <div className={Styles.testDiagno}>
          <img
            style={{ borderRadius: '10px', height: "100%", width: "100%" }}
            src={(avatar) ? avatar.preview : `http://localhost:3000/news/image/${record?.image}`}
            alt=""
            height="500px"
            width="80%"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePreviewAvatar}
            style={{ display: "none" }}
            aria-label={uploadDescription}
          />
        </div>
        <div style={{marginBottom: '25px'}}>
          <button onClick={handleUploadClick}>Upload</button>
        </div>
        </div>
        <Form form={updateForm} name='update-form' labelCol={{ span: 3 }} initialValues={{ remember: true }} autoComplete='on'>
          <Form.Item label='Tiêu Đề' name='Title' rules={[{ required: true, message: 'Chưa nhập Tiêu đề' }]} hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item label='Tiêu Đề' name='id' style={{display: 'none'}}>
            <Input />
          </Form.Item>


          <Form.Item label='Ngày viết bài' name='date' hasFeedback>
            <Input disabled />
          </Form.Item>

          <Form.Item label='Nội dung' name='Content' rules={[{ required: true, message: 'Chưa nhập Nội dung' }]} hasFeedback>
            <textarea
              rows="10"
              cols="141"
              placeholder="Nhập nội dung tin tức..."
            />
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default NewsManagement