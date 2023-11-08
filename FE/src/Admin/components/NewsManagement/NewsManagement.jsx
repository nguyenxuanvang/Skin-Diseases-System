import React from 'react';
import Styles from './NewsManagement.module.css'
import { Table, Button, Form, Input, Modal, Select, Space, Popconfirm, Upload, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
function NewsManagement() {
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const { TextArea } = Input;
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
    },

    {
      title: 'Tên bài viết',
      dataIndex: 'nameContent',
      key: 'nameContent',
    },
    {
      title: 'Ngày viết bài',
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: 'Nội dung',
      dataIndex: 'context',
      key: 'context',
      render: (text) => {
        return <p style={{ maxHeight: '3em', overflow: 'hidden', textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp:'3'}}>{text}</p>;
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
      image: 'image_url_1',
      nameContent: 'First Post',
      date: '2023-10-20',
      context: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuereLorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.Praesent ac metus in nunc lacinia posuere.',
    },
    {
      image: 'image_url_2',
      nameContent: 'Second Post',
      date: '2023-10-21',
      context: 'Praesent ac metus in nunc lacinia posuere.',
    },
    {
      image: 'image_url_3',
      nameContent: 'Third Post',
      date: '2023-10-22',
      context: 'Nulla facilisi. Sed sed turpis eu quam fringilla mattis.',
    },
    {
      image: 'image_url_4',
      nameContent: 'Fourth Post',
      date: '2023-10-23',
      context: 'Vestibulum dapibus, neque id ultricies aliquam, libero quam cursus mi.',
    },
    {
      image: 'image_url_5',
      nameContent: 'Fifth Post',
      date: '2023-10-24',
      context: 'Donec dictum augue non odio feugiat, eu tincidunt neque tincidunt.',
    },
  ];
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  return (
    <div>
      <Form form={createForm} name='create-form' labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true }} onFinish={onFinish} autoComplete='on'>
        <Form.Item label='Tên bài viết' name='nameContent' rules={[{ required: true, message: 'Chưa nhập Tiêu đề' }]} hasFeedback>
          <Input />
        </Form.Item>


        <Form.Item label='Ngày viết bài' name='date' rules={[{ required: true, message: 'Chưa nhập Thời gian' }]} hasFeedback>
          <Input />
        </Form.Item>

        <Form.Item label='Nội dung' name='context' rules={[{ required: true, message: 'Chưa nhập Nội dung' }]} hasFeedback>
          <TextArea rows={4} />
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
        <Form.Item label='Tên bài viết' name='nameContent' rules={[{ required: true, message: 'Chưa nhập Tiêu đề' }]} hasFeedback>
          <Input />
        </Form.Item>


        <Form.Item label='Ngày viết bài' name='date' rules={[{ required: true, message: 'Chưa nhập Thời gian' }]} hasFeedback>
          <Input />
        </Form.Item>

        <Form.Item label='Nội dung' name='context' rules={[{ required: true, message: 'Chưa nhập Nội dung' }]} hasFeedback>
          <TextArea rows={4} />
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

export default NewsManagement