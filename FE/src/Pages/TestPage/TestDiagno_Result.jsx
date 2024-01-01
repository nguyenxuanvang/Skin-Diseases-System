import React, { useEffect, useState } from 'react'
import { useMyContext } from '../../MyContext/context';
import News from '../../components/News';
import diseaseApi from '../../redux/api/disease.slice';
import newsApi from '../../redux/api/news.slice';
import Styles from "./TestPage.module.css";
function TestDiagno_Result() {
  const [getDisease, {data:objD = {}}] = diseaseApi.useLazyGetDiseaseQuery();
  const [getNewsRelated, {data: objN = {}}] = newsApi.useLazyGetNewsRelatedQuery();
  const { data, updateData } = useMyContext();
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState('');
  useEffect(() => {
    if (data.status === 200 && data.result !== 'Normal') {
      if(data.result !== 'Normal') {
        setIsSuccess(true);getDisease(data.result);getNewsRelated(data.result);
      }
      const class_namesE = ['Acne','Eczema','Nevus','Normal','Psoriasis','Pyoderma','Ringworm','Scabies','Urticaria','Warts'];
      const class_namesV = ['Mụn Trứng Cá','Bệnh Chàm','Bệnh Nốt Ruồi','Da Khỏe Mạnh','Vảy Nến','Viêm Da','Nấm Da','Bệnh Ghẻ','Mề Đay','Mụn Cóc'];
      const findIndex = class_namesE.findIndex(item => item === data.result);
      setResult(class_namesV[findIndex]);
      
    }
    else setIsSuccess(false);
  }, [data]);
  
  return (
    <>
      <div className={Styles.result_Title}>
        Kết Quả:
      </div>
      {(isSuccess) ?
        <div className={Styles.result_img} style={{ textAlign: '-webkit-center' }}>
          <p className={Styles.disease_imgdes}>
            Hình ảnh bệnh liên quan
          </p>
          <div className={Styles.disease_imglist}>
            <img src={`http://localhost:3000/disease/image/${data.result}1`} alt={`Image ${data.result}`} />
            <img src={`http://localhost:3000/disease/image/${data.result}2`} alt={`Image ${data.result}`} />
            <img src={`http://localhost:3000/disease/image/${data.result}3`} alt={`Image ${data.result}`} />
            <img src={`http://localhost:3000/disease/image/${data.result}4`} alt={`Image ${data.result}`} />
            <img src={`http://localhost:3000/disease/image/${data.result}5`} alt={`Image ${data.result}`} />
          </div>
        </div> : ""
      }

      {
        (data.status) === 200 ?
          <div className={Styles.result_Des}>
            <div style={{textAlign: 'center', marginTop: '10px'}}>
              <span style={{fontSize: '17px', fontWeight: '600', marginRight: '10px'}}>Chẩn Đoán:</span>
              <span style={{fontSize: '17px', fontWeight: '700', color: 'red'}}>{result}</span>
            </div>
            
            <div>
            <p style={{fontSize: '17px', fontWeight: '600'}}>Giải pháp:</p>
            <pre style={{whiteSpace: 'pre-line'}}>{objD.data?.Solutions}</pre>
            </div>
            

          </div>
          :
          <div className={Styles.result_Des}>
            {(data) && <p
                        style={{
                          fontSize: '21px',
                          color: 'red',
                          fontWeight: '700',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}  
                        >Ảnh Không Hợp Lệ !</p>}
          </div>
      }
      {
        (isSuccess) ?
          <div className={Styles.result_news}>
            {(objN.data?.length > 0) ?
            <>
            <div style={{ margin: '50px 0 0 0', textAlign: 'center' }} >
            <h3>Những bài viết liên quan </h3>
          </div>
          <div style={{ margin: '50px 0 0 320px' }}>
            {objN.data?.map(item => (
              <News key={item.News_id} news={item} />
            ))}
          </div>
          </> : <div style={{textAlign: 'center',fontSize: '17px', fontWeight: 700, color: 'red'}}>Không Tìm Thấy Bài Viết Liên Quan</div>
            }
            
          </div>
          : ""
      }

    </>
  )
}

export default TestDiagno_Result