import Reactquill from '../../components/Text_Editor';
import { Modal } from 'antd';
import Styles from './ReplyAnswer.module.css';

function ReplyAnswer ({reply}) {
  
  const date = new Date(reply.createdAt);
  const time = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`) + ":"
    + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`) + ' '
    + ((date.getHours() > 11) ? 'PM' : 'AM');
  return (
    <div className='reply d-flex' style={{ margin: '25px 0 0 0' }}>
      <div className={Styles.avatar_answer}>
        <img src={`http://localhost:3000/detail/image/${reply.avatar}`} alt="" />
      </div>
      <div className='title_question' style={{ padding: '5px 0 0 20px' }}>
        <h3>{reply.name}</h3>
        <div className='d-flex'>
          <p style={{ paddingRight: '30px', fontSize: '15px' }}>{time}</p>
        </div>

        <div className=''>
          <p>{reply.Content}</p>
        </div>
        <div style={{ borderBottom: '3px solid black', width: '830px' }}></div>
      </div>
    </div>
  );
}
export default ReplyAnswer