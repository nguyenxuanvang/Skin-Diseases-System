import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Style from './EditInformationPage.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import {Form, Input } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import personalApi from '../../../redux/api/personal.slice';
import HeaderL from '../../../components/HeaderL/Header';

function EditInformationPage() {
    const { data = {} } = personalApi.useGetDetailInforQuery();
    const [updateDoctor] = personalApi.useUpdateDoctorMutation();
    const [updateAvatar] = personalApi.useUpdateImageMutation();
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState();
    const [uploadDescription, setUploadDescription] = useState("Upload Image");
    const fileInputRef = useRef(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [work_location, setWorkLocation] = useState("");
    const [position, setPosition] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [experience, setExperience] = useState("");
    const [searchAddress, setSearchAddress] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [isSearchW, setIsSearchW] = useState(false);
    const [searchWaddress, setSearchWaddress] = useState([]);

    useEffect(() => {
        setName(data.user?.name);
        setPhone(data.user?.phone);
        setAddress(data.user?.address);
        setWorkLocation(data.user?.work_location);
        setPosition(data.user?.position);
        setIntroduce(data.user?.introduce);
        setExperience(data.user?.experience);
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

    const handleOnUpdate = async () => {
        form.validateFields().then(()=>{
            updateDoctor({
                name,
                position,
                work_location,
                experience,
                phone,
                address,
                introduce
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
                
            }).catch((error) => {
                toast.error(error.message,{autoClose: 3000});
            })
        }).catch(()=>{
            toast.error('Invalid Form',{autoClose: 3000});
        })
        
    };
    const onSearch = async () => {
        const response = await fetch(`https://rsapi.goong.io/Place/AutoComplete?api_key=EfJSk00uubh5lpF7GNP1VKFtXQfA9PiIjQiTwY83&input=${address}`)
        const data = await response.json();
        setSearchAddress(data.predictions);
    };
    const onSearchW = async () => {
        const response = await fetch(`https://rsapi.goong.io/Place/AutoComplete?api_key=EfJSk00uubh5lpF7GNP1VKFtXQfA9PiIjQiTwY83&input=${work_location}`)
        const data = await response.json();
        setSearchWaddress(data.predictions);
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
                            },
                            {
                                name: ["work_location"],
                                value: work_location
                            },
                            {
                                name: ["position"],
                                value: position
                            },
                            {
                                name: ["introduce"],
                                value: introduce
                            },
                            {
                                name: ["experience"],
                                value: experience
                            }
                        ]}
                        style={{ flex: 5 }} name='form' labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Form.Item
                            label='Tên bác sĩ'
                            name='name'
                            rules={[
                                { required: true, message: 'Tên Không Được Phép Bỏ Trống' },
                                { min: 5, message: 'Độ Dài Tên Phải Từ 5 Đến 20 Kí Tự' },
                                { max: 20, message: 'Độ Dài Tên Phải Từ 5 Đến 20 Kí Tự' },
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

                        <Form.Item label='Địa chỉ' name='address' hasFeedback>
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

                        <Form.Item label='Địa chỉ công tác' name='work_location' hasFeedback>
                            <Input value={work_location} onFocus={()=>{setIsSearchW(true)}} onBlur={()=>{setTimeout(()=>{setIsSearchW(false)},300)}} onChange={(e)=>{setWorkLocation(e.target.value);onSearchW();setIsSearchW(true)}}/>
                            {(isSearchW)
                                ?
                                <div className={Style.popupSearch}>
                                    {
                                        (searchWaddress)
                                        ?
                                        (searchWaddress.length > 0)
                                        ?
                                        searchWaddress.map(item => (
                                            <div className={Style.address} onClick={()=>setWorkLocation(item.description)}>{item.description}</div>
                                        ))
                                        : setIsSearchW(false)
                                        : <div style={{fontSize: '17px',fontWeight: '700',color: 'red',textAlign: 'center', padding: '15px'}}>Không Tìm Thấy Kết Quả</div>
                                    }
                                </div>
                                : ''
                            }
                        </Form.Item>

                        <Form.Item label='Chức vụ' name='position' hasFeedback>
                            <Input onChange={(e)=>setPosition(e.target.value)}/>
                        </Form.Item>
                        <Form.Item label='Giới thiệu' name='introduce' hasFeedback>
                            <textarea
                                rows="3"
                                cols="43"
                                onChange={(e)=>setIntroduce(e.target.value)}
                                placeholder="Nhập nội dung giới thiệu..."
                            />
                        </Form.Item>

                        <Form.Item label='Kinh nghiệm' name='experience' hasFeedback>
                            <textarea
                                rows="2"
                                cols="43"
                                onChange={(e)=>setExperience(e.target.value)}
                                placeholder="Nhập nội dung kinh nghiệm..."
                            />
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


                <div className='text-center' style={{ marginBottom: '20px' }}>
                    <button className={Style.btn_update} onClick={handleOnUpdate}>Cập Nhật</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default EditInformationPage