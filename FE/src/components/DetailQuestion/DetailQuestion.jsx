import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Styles from './DetailQuestion.module.css'
import { FiMessageCircle, FiEdit, FiTrash } from "react-icons/fi";
import questionApi from '../../redux/api/question.slice';
import commentApi from '../../redux/api/comment.slice';
import personalApi from '../../redux/api/personal.slice';
import AnswerQuestion from '../AnswerQuestion/AnswerQuestion';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd';
function DetailQuestion() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: info = {},isError} = personalApi.useGetDetailInforQuery();
    const [getQuestion, { data: objQ = {},isError: isErrorQ, isFetching }] = questionApi.useLazyGetQuestionQuery();
    const [createComment] = commentApi.useCreateCommentMutation();
    const [removeQuestion] = questionApi.useDeleteQuestionMutation();
    const [updateQuestion] = questionApi.useUpdateQuestionMutation();
    let [numberComment, setNumberComment] = useState(3);
    const [Content, setContent] = useState('');
    const [ContentQ, setContentQ] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    useEffect(()=>{
        if(isErrorQ) {
            navigate("/ForumPage");
        }
    },[isErrorQ]);
    useEffect(() => {
        getQuestion(id);
    }, [id]);
    useEffect(() => {
        if(!isError) {
            if (info?.user?.User_id === objQ?.data?.User_id || info?.user?.Doctor_id === objQ?.data?.Doctor_id) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        } else {
            setIsOwner(false);
        }
    }, [info?.user, objQ?.data, isError]);
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
    const onRemove = async (id) => {
        const response = await removeQuestion(id);
        if (response.data) {
            toast.success(response.data.message, { autoClose: 3000 });
            setTimeout(() => {
                navigate("/ForumPage");
            }, 1000);
        } else {
            toast.error(response.error.data.message, { autoClose: 3000 });
        }
    }
    const onSaveEdit = async () => {
        if(ContentQ.trim() !== '') {
            const respone = await updateQuestion({ id, Content: ContentQ });
            if (respone.data) {
                toast.success(respone.data.message, { autoClose: 3000 });
                setIsEdit(false);
            } else {
                toast.error(respone.error.data.message, { autoClose: 3000 });
            }
        } else {
            toast.error('Không Được Phép Bỏ Trống !',{autoClose: 3000});
        }
      
    }
    const onOk = () => {
        navigate("/login");
    }

    const onHandleComment = async () => {
        if (Content.trim() === '') {
            toast.error('Vui Lòng Nhập Nội Dung Bình Luận', { autoClose: 3000 });
        } else {
            const response = await createComment({
                id,
                arg: { Content }
            });
            if (response.data) {
                setContent('');
                toast.success(response.data.message, { autoClose: 1000 });

            } else {
                toast.error(response.error.data.message, { autoClose: 3000 });
            }
        }
    }
    return (
        <>
            <div className='d-flex' style={{ margin: '50px 0 0 300px' }}>
                <div className={Styles.avatar_question}>
                    <img style={{border: (objQ.data?.approved) ? '4px solid #12d212' : '4px solid #4070F4'}} src={`http://localhost:3000/detail/image/${objQ.data?.avatar}`} alt="" />
                </div>
                <div className='title_question' style={{ padding: '20px 0 0 20px' }}>
                    <h3>{objQ.data?.name} {(objQ.data?.approved) ? <img style={{width: "30px", height: "30px"}} src="http://localhost:3000/doctor/request/tick.png"/> : ''} </h3>
                    <div className='d-flex'>
                        <p style={{ paddingRight: '30px' }}>{time}</p>
                        <p style={{ paddingRight: '30px' }}><FiMessageCircle />{objQ.data?.num_comments}</p>
                    </div>
                </div>
                {(isOwner)
                    ?

                    <button className={Styles.btn_remove} onClick={() => {
                        Modal.confirm({
                            title: 'Thông Báo',
                            content: 'Bạn Có Chắc Chắn Muốn Xóa!',
                            okText: 'Xác Nhận',
                            cancelText: 'Đóng',
                            onOk: () => onRemove(objQ.data?.Question_id),
                            footer: (_, { OkBtn, CancelBtn }) => (
                                <>
                                    <CancelBtn />
                                    <OkBtn />
                                </>
                            ),
                        });
                    }}><FiTrash/></button>
                    : ''
                }
                {(isOwner)
                    ?
                    <button className={Styles.btn_edit} onClick={() => { setIsEdit(true); setContentQ(objQ?.data?.Content) }}><FiEdit /></button>
                    : ''
                }
            </div>
            {(isEdit)
                ?
                <div style={{ margin: '15px 150px 0 300px' }}>
                    <textarea
                        onChange={(e) => setContentQ(e.target.value)}
                        rows="5"
                        cols="140"
                        value={ContentQ}
                        style={{ padding: '10px', border: '5px solid #0876cc', borderRadius: '10px' }}
                        placeholder="Nhập Nội Dung Câu Hỏi"
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '15px' }}>
                        <button onClick={() => { setIsEdit(false) }}>Hủy</button>
                        <button onClick={onSaveEdit}>Lưu</button>
                    </div>
                </div>
                :
                <div style={{ margin: '15px 150px 0 300px', border: '2px solid black', backgroundColor: '#ecfffe', boxShadow: ' 0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <pre className='context' style={{ margin: '15px 15px 15px 15px', whiteSpace: 'pre-line', fontWeight: 600, fontSize: '17px' }}>
                        {objQ.data?.Content}
                    </pre>
                </div>
            }

            <div className='reply d-flex' style={{ margin: '5px 0 25px 200px', width: '50%' }}>
                <div className='create_question' style={{ width: '60%' }}>
                    <div className='form-container' style={{ margin: '30px 0 0 100px' }}>
                        <textarea
                            rows="3"
                            cols="143"
                            placeholder="Nhập nội dung bình luận..."
                            value={Content}
                            onChange={(e) => { setContent(e.target.value) }}
                        />
                        <button type="primary"
                            onClick={async () => {
                                if (localStorage.getItem('token')) {
                                    onHandleComment();
                                } else {
                                    Modal.confirm({
                                        title: 'Thông Báo',
                                        content: 'Vui Lòng Đăng Nhập Trước!',
                                        onOk: onOk,
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

                            }} style={{ width: 100, borderRadius: 10, marginLeft: '500px', marginTop: '20px' }}
                        >Bình Luận</button>
                    </div>

                </div>
            </div>


            <div className={Styles.comment_table}>
                {objQ.data?.comments.slice(0, numberComment).map(item => (
                    <AnswerQuestion key={item.Comment_id} comment={item} />
                ))}
                {(objQ.data?.comments.length > numberComment) &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                        <button className={Styles.btn_more} onClick={handleShowMore} style={{ width: '200px', border: 'none', backgroundColor: '#b1fffb' }}>Xem Thêm...</button>
                    </div>
                }
                
                {(numberComment > 5) &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                        <button className={Styles.btn_more} onClick={handleHideLess} style={{ width: '200px', border: 'none', backgroundColor: '#b1fffb' }}>Ẩn Bớt...</button>
                    </div>
                }

            </div>

            <ToastContainer />
        </>
    )
}

export default DetailQuestion