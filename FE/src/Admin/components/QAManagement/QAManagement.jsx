import React, {useEffect, useState} from 'react';
import { Table, Button, Space, Popconfirm, message, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import questionApi from '../../../redux/api/question.slice';
import Styles from './QAManagement.module.css';
import { ToastContainer, toast } from "react-toastify";
function QAManagement() {
  const [searchQuestions, {data = {}}] = questionApi.useLazyGetSearchQuestionsQuery();
  const [deleteQuestion] = questionApi.useDeleteQuestionMutation();
  const [searchText, setSearchText] = useState('');
  const { Search } = Input;
  useEffect(()=>{
    searchQuestions({content: ""});
  },[]);
  const formatDate = (str) => {
    const date = new Date(str);
    const time = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`)
        + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`)
        + ' ' + ((date.getHours() > 11) ? 'PM' : 'AM');
    return time;
  }
  const onSearch = async () => {
    const response = await searchQuestions({content: searchText});
    if(response.error) {
      toast.error(response.error.data.message,{autoClose: 3000});
    }
  };
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      width: 200,
      align: 'center',
      render: (id) => {
        return <p style={{ fontWeight: 700 }}>{id}</p>
      }
    },
    {
      title: 'Content',
      dataIndex: 'Content',
      key: 'description',
      align: 'center',
      width: 500,
      render: (content) => {
        return <p className={Styles.Content}>{content}</p>
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      width: 200,
      render: (date) => {
        return <p style={{ fontWeight: 700 }}>{date}</p>
      }
    },

    {
      title: 'Author',
      dataIndex: 'author',
      key: 'member',
      align: 'center',
      width: 200,
      render: (name) => {
        return <p style={{ fontWeight: 700 }}>{name}</p>
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
                const response = await deleteQuestion(record.ID);
                if(response.data) {
                  toast.success(response.data.message,{autoClose: 1000});
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
      ID: item.Question_id,
      Content: item.Content,
      date: formatDate(item.createdAt),
      author: item.name
    }
  })

  

  return (
    <>
      <Search
        placeholder="Search By Content"
        enterButton="Search"
        size="large"
        onChange={(e)=>{setSearchText(e.target.value)}}
        onSearch={onSearch}
      />
      <div>
        <Table columns={columns} dataSource={dataSource} bordered />;
      </div>
      <ToastContainer />
    </>
  )
}

export default QAManagement