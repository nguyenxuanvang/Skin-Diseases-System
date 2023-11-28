import { Modal } from 'antd';
import Styles from './AnswerQuestion.module.css';
import ReplyAnswer from '../ReplyAnswer/ReplyAnswer';
import replyApi from '../../redux/api/reply.slice';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AnswerQuestion({ comment }) {
  const [createReply] = replyApi.useCreateReplyMutation();
  const [showReply, setShowReply] = useState(false);
  const [Content, setContent] = useState('');
  let [numberReply, setNumberReply] = useState(3);
  const navigate = useNavigate();

  const date = new Date(comment.createdAt);
  const time = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`) + ":"
    + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`) + ' '
    + ((date.getHours() > 11) ? 'PM' : 'AM');

  const handleShowMore = () => {
    if ((numberReply + 3) > comment.replies.length) {
        if (numberReply === comment.replies.length) {
        } else {
            setNumberReply(comment.replies.length);
        }
    } else {
        setNumberReply((nb) => nb + 3);
    }
  };

  const handleHideLess = () => {
    setNumberReply(3);
  }

  const onOk = () => {
    navigate("/login");
  }

  const onHandleReply = async () => {
    if(Content.trim() === '') {
      toast.error('Vui Lòng Nhập Nội Dung Bình Luận',{autoClose: 3000});
  } else {
      const response = await createReply({
          id: comment.Comment_id,
          arg: {Content}
      });
      if(response.data) {
          setContent('');
          setShowReply(false);
          toast.success('Added Reply Successfully !',{autoClose: 1000});
          
      } else {
          toast.error(response.error.data.message,{autoClose: 3000});
      }
  }
  }
  return (
    <div className='reply d-flex' style={{ margin: '25px 15px 30px 15px', backgroundColor: '#ecfffe', border: '3px solid black', padding: '15px' }}>
      <div className={Styles.avatar_answer}>
        <img src={`http://localhost:3000/detail/image/${comment.avatar}`} alt="" />
      </div>
      <div className='title_question' style={{ padding: '5px 0 0 20px' }}>
        <h3>{comment.name}</h3>
        <div className='d-flex'>
          <p style={{ paddingRight: '30px' }}>{time}</p>
          <span className={Styles.reply_btn} onClick={() => { setShowReply(true) }} >Reply</span>
        </div>

        <div className=''>
          <p>{comment.Content}</p>
        </div>
        <div>
          {(showReply) &&
            <div className='form-container' style={{ width: '800px', margin: '30px 0 25px 0' }}>
              <textarea
                rows="3"
                cols="120"
                placeholder="Nhập nội dung bình luận..."
                value={Content}
                onChange={(e)=>setContent(e.target.value)}
              />
              <button style={{ width: 100, borderRadius: 10, margin: '25px 0 0 250px' }} onClick={() => { setShowReply(false) }}>Cancel</button>
              <button type="primary"
                onClick={() => {
                  if(localStorage.getItem('token')) {
                    onHandleReply();
                  } else {
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
                 
                }} style={{ width: 100, borderRadius: 10, margin: '25px 0 0 100px' }}
              >Reply</button>
            </div>
          }

        </div>
        <div style={{ borderBottom: '3px solid black', width: '900px' }}></div>
        {comment.replies.slice(0,numberReply).map(item => (
          <ReplyAnswer key={item.Replies_id} reply={item}/>
        ))}
        {(comment.replies.length > numberReply) &&
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
            <button className={Styles.btn_more} onClick={handleShowMore} style={{width: '200px', border: 'none', backgroundColor: '#ecfffe'}}>More Answers...</button>
          </div>
        }
        {(numberReply > 3) &&
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
            <button className={Styles.btn_more} onClick={handleHideLess} style={{width: '200px', border: 'none', backgroundColor: '#ecfffe'}}>Hide...</button>
          </div>
        }
        
      </div>
      <ToastContainer />
    </div>
  );
}
export default AnswerQuestion