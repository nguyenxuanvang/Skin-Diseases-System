import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Styles from './DetailQuestion.module.css'
import { FiMessageCircle } from "react-icons/fi";
import questionApi from '../../redux/api/question.slice';
import commentApi from '../../redux/api/comment.slice';
import AnswerQuestion from '../AnswerQuestion/AnswerQuestion';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd';
function DetailQuestion() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [getQuestion, { data: objQ = {} }] = questionApi.useLazyGetQuestionQuery();
    const [createComment] = commentApi.useCreateCommentMutation();
    let [numberComment, setNumberComment] = useState(3);
    const [Content, setContent] = useState('');

    useEffect(() => {
        getQuestion(id);
    }, [id]);

    const date = new Date(objQ.data?.createdAt);
    const time = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`)
        + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`)
        + ' ' + ((date.getHours() > 11) ? 'PM' : 'AM');
    
    const handleShowMore = () => {
        if ((numberComment + 3) > objQ.data?.comments.length) {
             if (numberComment === objQ.data?.comments.length) {
            } else {
                setNumberComment(objQ.data?.comments.length);
            }
        } else {
            setNumberComment((nb) => nb + 3);
        }
    };
    const handleHideLess = () => {
        setNumberComment(3);
    }
    const onOk = () => {
        navigate("/login");
    }

    const onHandleComment = async () => {
        if(Content.trim() === '') {
            toast.error('Vui Lòng Nhập Nội Dung Bình Luận',{autoClose: 3000});
        } else {
            const response = await createComment({
                id,
                arg: {Content}
            });
            if(response.data) {
                setContent('');
                toast.success('Added Comment Successfully !',{autoClose: 1000});
                
            } else {
                toast.error(response.error.data.message,{autoClose: 3000});
            }
        }
    }
    return (
        <>
            <div className='d-flex' style={{ margin: '50px 0 0 300px' }}>
                <div className={Styles.avatar_question}>
                    <img src={`http://localhost:3000/detail/image/${objQ.data?.avatar}`} alt="" />
                </div>
                <div className='title_question' style={{ padding: '20px 0 0 20px' }}>
                    <h3>{objQ.data?.name}</h3>
                    <div className='d-flex'>
                        <p style={{ paddingRight: '30px' }}>{time}</p>
                        <p style={{ paddingRight: '30px' }}><FiMessageCircle />{objQ.data?.num_comments}</p>
                    </div>
                </div>
            </div>

            <div style={{ margin: '15px 150px 0 300px', border: '2px solid black', backgroundColor: '#ecfffe', boxShadow: ' 0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className='context' style={{ margin: '15px 0px 15px 15px', fontWeight: 600, fontSize: '17px' }}>
                    {objQ.data?.Content}
                </div>
            </div>

            <div className='reply d-flex' style={{ margin: '5px 0 25px 200px', width: '50%' }}>
                <div className='create_question' style={{ width: '60%' }}>
                    <div className='form-container' style={{ margin: '30px 0 0 100px' }}>
                        <textarea
                            rows="3"
                            cols="143"
                            placeholder="Nhập nội dung bình luận..."
                            value={Content}
                            onChange={(e)=>{setContent(e.target.value)}}
                        />
                        <button type="primary"
                            onClick={async () => {
                            if(localStorage.getItem('token')) {
                                onHandleComment();
                            }else {
                                Modal.confirm({
                                    title: 'Alert',
                                    content: 'Please LOGIN before post your question!',
                                    onOk: onOk,
                                    footer: (_, { OkBtn, CancelBtn }) => (
                                        <>
                                            <CancelBtn />
                                            <OkBtn />
                                        </>
                                    ),
                                });
                            }
                                
                            }} style={{ width: 100, borderRadius: 10, marginLeft: '950px', marginTop: '20px' }}
                        >Comment</button>
                    </div>

                </div>
            </div>


            <div className={Styles.comment_table}>
                {objQ.data?.comments.slice(0,numberComment).map(item => (
                    <AnswerQuestion key={item.Comment_id} comment={item} />
                ))}
                {(objQ.data?.comments.length > numberComment) && 
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                        <button className={Styles.btn_more} onClick={handleShowMore} style={{width: '200px', border: 'none', backgroundColor: '#b1fffb'}}>More Comments...</button>
                    </div>
                }
                {(numberComment > 5) && 
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                        <button className={Styles.btn_more} onClick={handleHideLess} style={{width: '200px', border: 'none', backgroundColor: '#b1fffb'}}>Hide...</button>
                    </div>
                }
                
            </div>

            <ToastContainer />
        </>
    )
}

export default DetailQuestion