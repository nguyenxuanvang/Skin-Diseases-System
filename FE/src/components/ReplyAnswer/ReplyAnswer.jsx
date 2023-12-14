import Reactquill from '../../components/Text_Editor';
import { Modal } from 'antd';
import { FiEdit, FiTrash } from "react-icons/fi";
import Styles from './ReplyAnswer.module.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import replyApi from '../../redux/api/reply.slice';
import personalApi from '../../redux/api/personal.slice';

function ReplyAnswer({ reply, idC }) {
  const { data: info = {}, isError } = personalApi.useGetDetailInforQuery();
  const [updateReply] = replyApi.useUpdateReplyMutation();
  const [deleteReply] = replyApi.useDeleteReplyMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [Content, setContent] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if(!isError) {
      if (info?.user?.User_id === reply.User_id || info?.user?.Doctor_id === reply.Doctor_id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }else {
      setIsOwner(false);
    }
   
  }, [info?.user,isError]);
  const date = new Date(reply.createdAt);
  const time = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`) + ":"
    + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`) + ' '
    + ((date.getHours() > 11) ? 'PM' : 'AM');
  const onSave = async () => {
    if(Content.trim() !== '') {
      const response = await updateReply({ id: reply.Replies_id, Content, idC });
      if (response.data) {
        toast.success(response.data.message, { autoClose: 3000 });
        setIsEdit(false);
      } else {
        toast.error(response.error.data.message, { autoClose: 3000 });
      }
    }else {
      toast.error('Không Được Phép Bỏ Trống !',{autoClose: 3000});
    }
   
  }
  const onDelete = async (id) => {
    const response = await deleteReply({ id, idC });
    if (response.data) {
      toast.success(response.data.message, { autoClose: 3000 });
    } else {
      toast.error(response.error.data.message, { autoClose: 3000 });
    }
  }
  return (
    <div className='reply d-flex' style={{ margin: '25px 0 0 0' }}>
      <div className={Styles.avatar_answer}>
        <img src={`http://localhost:3000/detail/image/${reply.avatar}`} alt="" />
      </div>
      <div className='title_question' style={{ padding: '5px 0 0 20px' }}>
        <h3>{reply.name}</h3>
        <div className='d-flex'>
          <p style={{ paddingRight: '30px', fontSize: '15px' }}>{time}</p>
          {(isOwner)
            ?
            <span className={Styles.reply_btn} onClick={() => { setIsEdit(true); setContent(reply.Content) }} ><FiEdit /></span>
            : ''
          }
          {(isOwner)
            ?
            <span className={Styles.reply_btn} onClick={() => {
              Modal.confirm({
                title: 'Alert',
                content: 'Do You Want To Remove This Reply!',
                onOk: () => onDelete(reply.Replies_id),
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
              cols="110"
              placeholder="Nhập nội dung trả lời..."
              value={Content}
              onChange={(e) => { setContent(e.target.value) }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '15px 0px' }}>
              <button onClick={() => { setIsEdit(false) }}>Cancel</button>
              <button onClick={onSave}>Save</button>
            </div>
          </div>
          :
          <div className=''>
            <p>{reply.Content}</p>
          </div>

        }


        <div style={{ borderBottom: '3px solid black', width: '830px' }}></div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default ReplyAnswer