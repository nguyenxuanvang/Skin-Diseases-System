import React, { useState, useEffect } from 'react';
import QaQuestion from '../../components/Q&A_question'
import ForumSlider from './ForumSlider';
import Footer from '../../components/Footer/Footer'
import Reactquill from '../../components/Text_Editor';
import { Modal, Spin } from 'antd';
import Header from '../../components/Header';
import HeaderL from '../../components/HeaderL/Header';
function ForumPage() {
  const [visibleQuestions, setVisibleQuestions] = useState(8);
  const [showForm, setShowForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('token')) {
      setIsLogin(true);
    }
  },[]);

  const showMoreQuestions = () => {
    setVisibleQuestions((prev) => prev + 5);
  };

  const handleCreateQuestion = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };


  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        {(isLogin) ? <HeaderL/> : <Header/>}
      </div>
      {/* <Spin spinning={loading} size="large" tip="SkinDiagnoTech..." > */}
        <div>
          <ForumSlider />
        </div>
        <h1 className='text-center mt-3 bg-primary text-white'>Question And Answer</h1>
        <div className='create_question' style={{ width: '60%' }}>
          <div className='create_question' >
            <button style={{ width: 200, borderRadius: 10, margin: '50px 0 0 100px' }} onClick={handleCreateQuestion} >Create question</button>
          </div>

          {showForm && (
            <div className='form-container' style={{ width: '800px', margin: '30px 0 0 100px' }}>
              <Reactquill />

              <div className='text-end' >
                <button type="primary"
                  onClick={() => {
                    Modal.confirm({
                      title: 'Alert',
                      content: 'Please LOGIN before post your question!',
                      footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn />
                        </>
                      ),
                    });
                  }} style={{ width: 100, borderRadius: 10, margin: '50px 0 0 100px' }}
                >Post</button>
              </div>
            </div>
          )}

        </div>
        <div className='list_question'>
          {[...Array(visibleQuestions)].map((_, index) => (
            <QaQuestion key={index} />
          ))}

          {visibleQuestions < 100 && (
            <div className='text-center mt-5' >
              <button style={{ width: 300, borderRadius: 10 }} onClick={showMoreQuestions}>Hiển thêm</button>
            </div>
          )}
        </div>

        <div style={{ marginTop: 50 }}>
          <Footer />
        </div>
      {/* </Spin> */}
    </>
  )
}

export default ForumPage