import React, {useState} from 'react';
import { Table, Button, Space, Popconfirm, message, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
function QAManagement() {
  const [searchText, setSearchText] = useState('');

  const onSearch = (value) => {
    setSearchText(value);
  };
  const { Search } = Input;
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Nội dung bài đăng',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: 'Người đăng',
      dataIndex: 'member',
      key: 'member',

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
      description: 'Nội dung 1',
      date: '17/11/2023',
      member: 'User',
    },
    {
      ID: '2',
      description: 'Nội dung 2',
      date: '17/11/2023',
      member: 'Doctor',
    },
    {
      ID: '1',
      description: 'Nội dung 3',
      date: '17/11/2023',
      member: 'User',
    },
    {
      ID: '1',
      description: 'Nội dung 4',
      date: '17/11/2023',
      member: 'Doctor',
    },
  ];

  const filteredDataSource = dataSource.filter(item => {
    const memberText = item.member.toLowerCase();
    return memberText.includes(searchText.toLowerCase());
  });

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <div>
        <Table columns={columns} dataSource={filteredDataSource} />;
      </div>
    </>
  )
}

export default QAManagement