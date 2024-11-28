import { useEffect, useState } from "react";

import UserService from "../../service/UserService";
import { useNavigate } from "react-router-dom";




function ModuleEditProfile({ userResponseView }) {
    const navigate = useNavigate();
    const [userRequest, setUserRequest] = useState(() => {
        // Tạo một bản sao mới của userResponseView để tránh thay đổi gốc
        return JSON.parse(JSON.stringify(userResponseView));
    });

    useEffect(() => {
        // Cập nhật userRequest khi userResponseView thay đổi
        setUserRequest(JSON.parse(JSON.stringify(userResponseView)));
    }, [userResponseView]);


    const [errors, setErrors] = useState({
        name: '',
        price: '',
        // quantity: '',
        categoryName: '',
        description: '',
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setErrors({ ...errors, [name]: 'Empty' });
        setUserRequest({ ...userRequest, [name]: value });
    };

    const handleMainPhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Lưu trữ base64 vào trạng thái
                setUserRequest({ ...userRequest, main_image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Kiểm tra price


        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await UserService.changeProflie(token, userRequest)
            if (response.message === 'oke') { // Giả sử API trả về 201 Created khi thành công
                window.alert("Cập nhật thông tin thành công");
                window.location.reload();
            }
            if (response.message === 'wrong') { // Giả sử API trả về 201 Created khi thành công
                window.alert("Thất bại, kiểm tra lại thông tin của bạn");
                window.location.reload();
            }


        } catch (error) {
            console.log("error")
        }
    }

    return (
        <div>
            <div>
                <button type="button" className="btn btn-secondary px-4 py-3" data-toggle="modal" data-target="#exampleModalCenter" >
                    <strong><i class="fa-solid fa-circle-plus"></i></strong>  Chỉnh sửa thông tin
                </button>
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content rounded-0">
                            <div className="modal-body py-0">

                                <div className="d-flex main-content">
                                    {/* <div className="bg-image promo-img mr-3" style="background-image: url('images/img_1.jpg');"> */}
                                </div>
                                <div className="content-text p-4">
                                    <h3>Vul4n4nh</h3>
                                    <p>Khi một người đàn ông im lặng là lúc đó họ không nói gì cả.</p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label for="email">Tên </label>
                                            <input type="name" className="form-control" id="first_name" name="first_name"
                                                value={userRequest.first_name}
                                                onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label for="email">Họ và tên đệm</label>
                                            <input type="name" className="form-control" id="last_name" name="last_name"
                                                value={userRequest.last_name}
                                                onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label for="email">Email</label>
                                            <input type="name" className="form-control" id="email" name="email"
                                                value={userRequest.email}
                                                onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label for="email">Số điện thoại</label>
                                            <input type="name" className="form-control" id="phone" name="phone"
                                                value={userRequest.phone}
                                                onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label for="email">Địa chỉ</label>
                                            <input type="name" className="form-control" id="address" name="address"
                                                value={userRequest.address}
                                                onChange={handleChange} required />
                                        </div>
                                        {/* <div className="form-group">
                                            <label for="email">Mật khẩu hiện tại</label>
                                            <input type="name" className="form-control" id="passwordCurrent" name="passwordCurrent"
                                                value={userRequest.passwordCurrent}
                                                onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label for="email">Mật khẩu mới</label>
                                            <input type="name" className="form-control" id="newPassword" name="newPassword"
                                                value={userRequest.newPassword}
                                                onChange={handleChange} required />
                                        </div> */}
                                        {/* <div className="form-group">
                                            <label for="name">Giá</label>
                                            <input type="text" className="form-control" id="name" name="price"
                                                value={sportswear.price}
                                                onChange={handleChange} required />
                                        </div> */}
                                        {/* <div className="form-group">
                                            <label for="name">Quantity</label>
                                            <input type="text" className="form-control" id="name" name="quantity"
                                                value={sportswear.quantity}
                                                onChange={handleChange} required />
                                        </div> */}
                                        {/* <div className="form-group">
                                            <label for="categoryName">Loại</label>
                                            <div className="input-select">
                                                <select className="form-select" name="categoryName"
                                                    value={sportswear.categoryName}
                                                    onChange={handleChange} required>
                                                    <option value="">--Chọn đê--</option>
                                                    <option value="Jeseys">Áo câu lạc bộ</option>
                                                    <option value="Trainingwear">Áo Traning</option>
                                                    <option value="Fashion">Thời trang khác</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Mô tả</label>
                                            <textarea rows={3} type="text" className="form-control" id="name" name="description"
                                                value={sportswear.description}
                                                onChange={handleChange} required />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="form-check">
                                                <input className="form-check-input primary" type="checkbox" value="" id="availableCheckbox" checked={sportswear.status === 1} onChange={handleStatusChange} />
                                                <label className="form-check-label text-dark" for="availableCheckbox">
                                                    Có sẵn
                                                </label>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="form-check">
                                                <input className="form-check-input primary" type="checkbox" value="" id="disableCheckbox" checked={sportswear.status === 0} onChange={handleStatusChange} />
                                                <label className="form-check-label text-dark" for="disableCheckbox">
                                                    Không có sẵn
                                                </label>
                                            </div>
                                        </div> */}
                                        <div className="form-group">
                                            <label for="name">Ảnh đại diện</label>
                                            <input type="file" className="form-control" id="main_image"
                                                onChange={handleMainPhotoChange} />
                                            <ul>

                                                <li >

                                                    {/* Hiển thị base64 của ảnh nếu có */}
                                                    {userResponseView.main_image && (
                                                        // eslint-disable-next-line jsx-a11y/alt-text
                                                        <img
                                                            src={userRequest.main_image}
                                                            style={{ maxWidth: "100px" }}
                                                        />
                                                    )}
                                                </li>

                                            </ul>
                                        </div>

                                        <div className="form-group">
                                            <input type="submit" value="Hoàn thành" className="btn btn-primary btn-block" />
                                        </div>
                                        {/* <div className="form-group ">
                                            <p className="custom-note"><small>By signing up you will agree to our <a href="/home">Privacy Policy</a></small></p>
                                        </div> */}
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </div>

    )
} export default ModuleEditProfile;