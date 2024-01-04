import React, { useState, useEffect } from 'react';
import QaQuestion from '../../components/Q&A_question'
import ForumSlider from './ForumSlider';
import Footer from '../../components/Footer/Footer'
import { Modal, Spin } from 'antd';
import Header from '../../components/Header';
import HeaderL from '../../components/HeaderL/Header';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import questionApi from '../../redux/api/question.slice';
function ForumPage() {
  const navigate = useNavigate();
  const { data = {} } = questionApi.useGetQuestionListQuery();
  const [createQuestion] = questionApi.useCreateQuestionMutation();
  const [content, setContent] = useState('');
  let [numberQuestion, setNumberQuestion] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogin(true);
    }
  }, []);

  const showMoreQuestions = () => {
    if ((numberQuestion + 5) > data.data.length) {
      if (numberQuestion === data.data.length) {
      } else {
        setNumberQuestion(data.data.length);
      }
    } else {
      setNumberQuestion((nb) => nb + 5);
    }
  };

  const onOk = () => {
    navigate("/login");
  }
  const onHandleCreate = async () => {
    if (content.trim() === '') {
      toast.error('Vui Lòng Nhập Nội Dung Câu Hỏi', { autoClose: 3000 });
    } else {
      const response = await createQuestion({ Content: content });
      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setContent('');
        setShowForm(false);
      } else {
        toast.error(response.error.data.message, { autoClose: 3000 });
      }
    }
  }


  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        {(isLogin) ? <HeaderL /> : <Header />}
      </div>
      {/* <Spin spinning={loading} size="large" tip="SkinDiagnoTech..." > */}
      <div>
        <ForumSlider />
      </div>
      <h1 className='text-center mt-3 bg-primary text-white'>Trang Hỏi Đáp</h1>
      <div className='create_question' style={{ width: '60%' }}>
        <div className='create_question' >
          <button style={{ width: 200, borderRadius: 10, margin: '50px 0 0 100px' }} onClick={() => setShowForm(true)/*createQuestion*/} >Tạo Bài Viết</button>
          {showForm && (
              <div className='form-container' style={{ width: '800px', margin: '30px 0 0 100px' }}>
                <textarea
                  onChange={(e) => setContent(e.target.value)}
                  rows="5"
                  cols="151"
                  style={{ padding: '10px', border: '5px solid #0876cc', borderRadius: '10px' }}
                  placeholder="Nhập Nội Dung Câu Hỏi"
                />

                <div className='text-end' style={{ display: 'flex', paddingLeft: '290px' }} >
                  <button style={{ width: 100, borderRadius: 10, margin: '50px 0 0 100px' }} onClick={() => { setShowForm(false) }}>Hủy</button>
                  <button type="primary"
                    onClick={() => {
                      if (localStorage.getItem('token')) {
                        onHandleCreate();
                      } else {
                        Modal.confirm({
                          title: 'Thông Báo',
                          onOk: onOk,
                          content: 'Vui Lòng Đăng Nhập Trước!',
                          okText: 'Đăng Nhập',
                          cancelText: 'Đóng',
                          footer: (_, { OkBtn, CancelBtn }) => (
                            <>
                              <CancelBtn />
                              <OkBtn />
                            </>
                          ),
                        });
                      }
                    }} style={{ width: 100, borderRadius: 10, margin: '50px 0 0 100px' }}
                  >Xác Nhận</button>
                </div>
              </div>
            )}
        </div>
        {(data.data?.length === 0)
          ?
          <p style={{textAlign: 'center',fontSize: '20px',fontWeight: '700',color: 'red',marginTop: '20px',width: '1520px'} }>Chưa Có Bài Viết Nào</p>
          : ''
        }

      </div>

      <div className='list_question'>
        {data.data?.slice(0, numberQuestion).map(item => (
          <QaQuestion key={item.Question_id} question={item} />
        ))}
        {
          (data.data?.length > numberQuestion) && <div className='text-center mt-5' >
            <button style={{ width: 300, borderRadius: 10 }} onClick={showMoreQuestions}>Hiển Thị thêm</button>
          </div>
        }

      </div>

      <div style={{ marginTop: 50 }}>
        <Footer />
      </div>
      {/* </Spin> */}
      <ToastContainer />
    </>
  )
}

export default ForumPage