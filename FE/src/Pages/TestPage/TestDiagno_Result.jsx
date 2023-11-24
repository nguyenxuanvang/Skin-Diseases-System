import React, { useEffect, useState } from 'react'
import { useMyContext } from '../../MyContext/context';
import News from '../../components/News';
import Styles from "./TestPage.module.css";
function TestDiagno_Result() {
  const { data, updateData } = useMyContext();
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (data.status === 200) setIsSuccess(true);
    else setIsSuccess(false);
  }, [data])
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
            <img src="/images/ImgExample/mau_1.png" alt="" />
            <img src="/images/ImgExample/mau_2.png" alt="" />
            <img src="/images/ImgExample/mau_3.png" alt="" />
            <img src="/images/ImgExample/mau_3.png" alt="" />
            <img src="/images/ImgExample/mau_3.png" alt="" />
          </div>
        </div> : ""
      }

      {
        (data.status) === 200 ?
          <div className={Styles.result_Des}>
            <div style={{textAlign: 'center'}}>
              <span style={{fontSize: '17px', fontWeight: '600', marginRight: '10px'}}>Chẩn Đoán:</span>
              <span style={{fontSize: '17px', fontWeight: '700', color: 'red'}}>{data.result}</span>
            </div>
            
            <div>
            <p style={{fontSize: '17px', fontWeight: '600'}}>Giải pháp:</p>
            <p>
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              Trứng cá trở thành bệnh phổ biến nhất thế giới khi có 650 triệu người bị bệnh, 
              trong đó lứa tuổi thanh thiếu niên chiếm 85%. Riêng tại Mỹ, mỗi năm dân số nước này 
              chi hơn 1 tỷ USD để điều trị mụn trứng cá và hàng trăm triệu USD để sử dụng các sản 
              phẩm hỗ trợ trị mụn.
              
            </p>
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
            <div style={{ margin: '50px 0 0 0', textAlign: 'center' }} >
              <h3>Những bài viết liên quan </h3>
            </div>
            <div style={{ margin: '50px 0 0 320px' }}>
              <News />
              <News />
              <News />
            </div>
          </div>
          : ""
      }

    </>
  )
}

export default TestDiagno_Result