import React, { useState } from 'react'
import Styles from './DetailQuestion.module.css'
import { FiMessageCircle } from "react-icons/fi";
import Reactquill from '../../components/Text_Editor';
import {Modal } from 'antd';
function DetailQuestion(
    {
        avatar_QA = 'doctor_img_1.png',
        sender = 'Tên người đăng',
        date_question = '13/11/2023',
        number_reply = '1',
        context_comment = 'Nội dung câu hỏi',
        replier = 'Tên người trả lời',
        context_answer = 'Nội dung trả lời'
    }
) {

    const [showForm, setShowForm] = useState(false);

    const handleCreateQuestion = () => {
        setShowForm((prevShowForm) => !prevShowForm);
    };

    return (
        <>
            <div className='d-flex' style={{ margin: '50px 0 0 300px' }}>
                <div className={Styles.avatar_question}>
                    <img src={`./images/Doctor/${avatar_QA}`} alt="" />
                </div>
                <div className='title_question' style={{ padding: '5px 0 0 20px' }}>
                    <h3>{sender}</h3>
                    <div className='d-flex'>
                        <p style={{ paddingRight: '30px' }}>{date_question}</p>
                        <p style={{ paddingRight: '30px' }}><FiMessageCircle />{number_reply}</p>
                    </div>
                </div>
            </div>

            <div className='context' style={{ margin: '50px 0 0 300px', width: '50%' }}>
                {context_comment}
            </div>

            <div className='reply d-flex' style={{ margin: '50px 0 0 300px', width: '50%' }}>
                <div className={Styles.avatar_answer}>
                    <img src={`./images/Doctor/${avatar_QA}`} alt="" />
                </div>
                <div className='title_question' style={{ padding: '5px 0 0 20px' }}>
                    <h3>{replier}</h3>
                    <div className='d-flex'>
                        <p style={{ paddingRight: '30px' }}>{date_question}</p>
                    </div>

                    <div className=''>
                        <p>{context_answer}</p>
                    </div>
                </div>
            </div>

            <div className='reply d-flex' style={{ margin: '50px 0 0 200px', width: '50%' }}>
                <div className='create_question' style={{ width: '60%' }}>
                    <div className='create_question' >
                        <button style={{ width: 200, borderRadius: 10, margin: '50px 0 0 100px' }} onClick={handleCreateQuestion} >Answer</button>
                    </div>

                    {showForm && (
                        <div className='form-container' style={{ width: '800px', margin: '30px 0 0 100px' }}>
                            <Reactquill />

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
                                }} style={{ width: 100, borderRadius: 10, margin: '50px 0 0 600px' }}
                            >Reply</button>
                        </div>


                    )}
                </div>
            </div>
        </>
    )
}

export default DetailQuestion