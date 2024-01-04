import { Modal } from 'antd';
import Styles from './AnswerQuestion.module.css';
import { FiEdit, FiTrash } from "react-icons/fi";
import ReplyAnswer from '../ReplyAnswer/ReplyAnswer';
import commentApi from '../../redux/api/comment.slice';
import replyApi from '../../redux/api/reply.slice';
import personalApi from '../../redux/api/personal.slice';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AnswerQuestion({ comment }) {
  const { data: info = {}, isError } = personalApi.useGetDetailInforQuery();
  const [createReply] = replyApi.useCreateReplyMutation();
  const [deleteComment] = commentApi.useDeleteCommentMutation();
  const [updateComment] = commentApi.useUpdateCommentMutation();
  const [showReply, setShowReply] = useState(false);
  const [Content, setContent] = useState('');
  const [ContentC, setContentC] = useState('');
  let [numberReply, setNumberReply] = useState(3);
  const [isEdit, setIsEdit] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if(!isError) {
      if (info?.user?.User_id === comment.User_id || info?.user?.Doctor_id === comment.Doctor_id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } else {
      setIsOwner(false);
    }
  }, [info?.user, isError]);
  const date = new Date(comment.updatedAt);
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

  const onDelete = async (id) => {
    const response = await deleteComment(id);
    if (response.data) {
      toast.success(response.data.message, { autoClose: 3000 });
    } else {
      toast.error(response.error.data.message, { autoClose: 3000 });
    }
  }
  const onUpdate = async () => {
    if(ContentC.trim() !== '') {
      const response = await updateComment({ id: comment.Comment_id, Content: ContentC });
    if (response.data) {
      toast.success(response.data.message, { autoClose: 3000 });
      setIsEdit(false);
    } else {
      toast.error(response.error.data.message, { autoClose: 3000 });
    }
    }else {
      toast.error('Vui Lòng Nhập Nội Dung Bình Luận !',{autoClose: 3000});
    }
    
  }
  const onOk = () => {
    navigate("/login");
  }

  const onHandleReply = async () => {
    if (Content.trim() === '') {
      toast.error('Vui Lòng Nhập Nội Dung Trả Lời', { autoClose: 3000 });
    } else {
      const response = await createReply({
        id: comment.Comment_id,
        arg: { Content }
      });
      if (response.data) {
        setContent('');
        setShowReply(false);
        toast.success(response.data.message, { autoClose: 1000 });

      } else {
        toast.error(response.error.data.message, { autoClose: 3000 });
      }
    }
  }
  return (
    <div className='reply d-flex' style={{ margin: '25px 15px 30px 15px'  ,borderRadius: '15px', border: '3px solid black', padding: '15px' }}>
      <div className={Styles.avatar_answer}>
        <img style={{border: (comment?.approved) ? '4px solid #12d212' : '4px solid #4070F4'}} src={`http://localhost:3000/detail/image/${comment.avatar}`} alt="" />
      </div>
      <div className='title_question' style={{ padding: '5px 0 0 20px' }}>
        <h3>{comment.name} {(comment?.approved) ? <img style={{width: "30px", height: "30px"}} src="http://localhost:3000/doctor/request/tick.png"/> : ''}</h3>
        <div className='d-flex'>
          <p style={{ paddingRight: '30px' }}>{time}</p>
          <span className={Styles.reply_btn} onClick={() => { setShowReply(true); setContent('') }} >Trả Lời</span>
          {(isOwner)
            ?
            <span className={Styles.reply_btn} onClick={() => { setIsEdit(true); setContentC(comment.Content) }} ><FiEdit /></span>
            : ''
          }
          {(isOwner)
            ?
            <span className={Styles.reply_btn} onClick={() => {
              Modal.confirm({
                title: 'Thông Báo',
                content: 'Bạn Có Chắc Chắn Muốn Xóa ?',
                okText: 'Xác Nhận',
                cancelText: 'Đóng',
                onOk: () => onDelete(comment.Comment_id),
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }} ><FiTrash /></span>
            : ''
          }


        </div>
        {(isEdit)
          ?
          <div className=''>
            <textarea
              rows="3"
              cols="120"
              placeholder="Nhập nội dung bình luận..."
              value={ContentC}
              onChange={(e) => setContentC(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '15px 0px' }}>
              <button onClick={() => { setIsEdit(false) }}>Huỷ</button>
              <button onClick={onUpdate}>Lưu</button>
            </div>
          </div>
          :

          <div className=''>
            <pre style={{width: '900px', whiteSpace: 'pre-line'}}>{comment.Content}</pre>
          </div>
        }


        <div>
          {(showReply) &&
            <div className='form-container' style={{ width: '800px', margin: '30px 0 25px 0' }}>
              <textarea
                rows="3"
                cols="120"
                placeholder="Nhập nội dung trả lời..."
                value={Content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button style={{ width: 100, borderRadius: 10, margin: '25px 0 0 250px' }} onClick={() => { setShowReply(false) }}>Hủy</button>
              <button type="primary"
                onClick={() => {
                  if (localStorage.getItem('token')) {
                    onHandleReply();
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

                }} style={{ width: 100, borderRadius: 10, margin: '25px 0 0 100px' }}
              >Trả Lời</button>
            </div>
          }

        </div>
        <div style={{ borderBottom: '3px solid black', width: '900px' }}></div>
        {comment.replies.slice(0, numberReply).map(item => (
          <ReplyAnswer key={item.Replies_id} reply={item} idC={comment.Comment_id} />
        ))}
        {(comment.replies.length > numberReply) &&
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <button className={Styles.btn_more} onClick={handleShowMore} style={{ width: '200px', border: 'none', backgroundColor: '#ecfffe' }}>Xem Thêm...</button>
          </div>
        }
        {(numberReply > 3) &&
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <button className={Styles.btn_more} onClick={handleHideLess} style={{ width: '200px', border: 'none', backgroundColor: '#ecfffe' }}>Ẩn Bớt...</button>
          </div>
        }

      </div>
      <ToastContainer />
    </div>
  );
}
export default AnswerQuestion