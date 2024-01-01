import React from 'react'
import { useState, useEffect,useRef } from 'react';
import Style from './UserEditInformationPage.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Form, Input} from 'antd';
import personalApi from '../../../redux/api/personal.slice';
import { ToastContainer, toast } from "react-toastify";
import HeaderL from '../../../components/HeaderL/Header';
function UserEditInformationPage() {
    const { data = {} } = personalApi.useGetDetailInforQuery();
    const [updateUser] = personalApi.useUpdateUserMutation();
    const [updateAvatar] = personalApi.useUpdateImageMutation();
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState();
    const [uploadDescription, setUploadDescription] = useState("Upload Image");
    const fileInputRef = useRef(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [searchAddress, setSearchAddress] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        setName(data.user?.name);
        setPhone(data.user?.phone);
        setAddress(data.user?.address);
    }, [data?.user]);

    useEffect(() => {
        return () => avatar && URL.revokeObjectURL(avatar.preview);
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setAvatar(file);
        }
    };

    const handleUploadClick = () => {
        setUploadDescription("Upload the image");
        fileInputRef.current.click();
    };

    const onHandleUpdate = () => {
        form.validateFields().then(()=>{
            updateUser({
                name,
                phone,
                address
            }).then((response) => {
                if(avatar) {
                    if(avatar.type === 'image/jpeg' || avatar.type === 'image/png') {
                        const formData = new FormData();
                        formData.append('avatar',avatar);
                        updateAvatar(formData).then(() => {
                            toast.success("Upload Successfully !",{autoClose: 1000});
                        })
                    } else {
                        toast.error("Image Is Not Valid !",{autoClose: 3000});
                    }
                } else {
                    toast.success(response.data.message,{autoClose: 1000});
                }
            })
        }).catch(()=>{
            toast.error("Invalid Form!",{autoClose: 3000});
        })
    }
    const onSearch = async () => {
        const response = await fetch(`https://rsapi.goong.io/Place/AutoComplete?api_key=EfJSk00uubh5lpF7GNP1VKFtXQfA9PiIjQiTwY83&input=${address}`)
        const data = await response.json();
        setSearchAddress(data.predictions);
    }
    return (
        <>
            <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
                <HeaderL />
            </div>
            <div className={Style.editInformationPage_sidebar}>
                <Sidebar />
            </div>
            <div className={Style.editInformationPage_carrer}>

                <div className={Style.editInformationPage_list} style={{ paddingTop: '50px', display: 'flex' }} >
                    <Form 
                        form={form} 
                        name='create-form' 
                        labelCol={{ span: 5 }} 
                        wrapperCol={{ span: 12 }} 
                        initialValues={{ remember: true }}
                        style={{flex: 5}}
                        fields={[
                            {
                                name: ["name"],
                                value: name
                            },
                            {
                                name: ["phone"],
                                value: phone
                            },
                            {
                                name: ["address"],
                                value: address
                            }
                        ]}
                        >
                        <Form.Item 
                            label='Tên người dùng' 
                            name='name' 
                            rules={[
                                { required: true, message: 'Tên Không Được Phép Bỏ Trống' },
                                { min: 5, message: 'Độ Dài Tên Phải Từ 5 Đến 20 Kí Tự' },
                                { pattern: /^[a-zA-Z\sĐđÀ-ỹẰằẮắẲẳẴẵẶặẤấẦầẨẩẪẫẬậỀềỂểỄễỆệỈỉỊị]+$/, message: 'Tên Chỉ Được Phép Chứa Chữ Cái Và Dấu Khoảng Trắng' }
                            ]}
                            hasFeedback>
                            <Input onChange={(e)=>setName(e.target.value)}/>
                        </Form.Item>

                        <Form.Item 
                            label='Số điện thoại' 
                            name='phone' 
                            rules={[
                                {pattern: /^0[0-9]{8,10}$/, message: 'Số Điện Thoại Không Hợp Lệ'}
                            ]} 
                            hasFeedback>
                            <Input onChange={(e)=>setPhone(e.target.value)}/>
                        </Form.Item>
                        <Form.Item label='Địa chỉ' name='address'>
                            <Input value={address} onFocus={()=>setIsSearch(true)} onBlur={()=>{setTimeout(()=>{setIsSearch(false)},300)}} onChange={(e)=>{setAddress(e.target.value);onSearch();setIsSearch(true)}}/>
                            {(isSearch)
                                ?
                                <div className={Style.popupSearch}>
                                    {
                                        (searchAddress)
                                        ?
                                        (searchAddress.length > 0)
                                        ?
                                        searchAddress.map(item => (
                                            <div className={Style.address} onClick={()=>setAddress(item.description)}>{item.description}</div>
                                        ))
                                        : setIsSearch(false)
                                        : <div style={{fontSize: '17px',fontWeight: '700',color: 'red',textAlign: 'center', padding: '15px'}}>Không Tìm Thấy Kết Quả</div>
                                    }
                                </div>
                                : ''
                            }
                            
                        </Form.Item>
                    </Form>
                    <div style={{ flex: 1 }}>
                        <div className={Style.testDiagno}>
                            <img
                                style={{ borderRadius: '10px', height: "100%", width: "100%" }}
                                src={(avatar) ? avatar.preview : `http://localhost:3000/detail/image/${data?.user?.avatar}`}
                                alt=""
                                height="500px"
                                width="80%"
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePreviewAvatar}
                                style={{ display: "none" }}
                                aria-label={uploadDescription}
                            />
                        </div>
                        <div className={Style.btn}>
                            <button className={Style.btn_upload} onClick={handleUploadClick}>
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
                

                <div className='text-center' style={{ marginTop: '70px',marginBottom: '20px', display: 'flex', marginLeft: '230px' }}>
                    <button className={Style.btn_update} onClick={onHandleUpdate}>Cập Nhật</button>
                </div>
            </div>
            
            <ToastContainer />
        </>
    )
}

export default UserEditInformationPage