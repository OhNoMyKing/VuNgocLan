import { useState } from "react";
import SportswearService from "../../service/SportswearService";
import UserService from "../../service/UserService";



function ModuleModalUpdateUser({ user }) {




    const [files, setFiles] = useState([]);

    const [userUpdate, setUserUpdate] = useState(user);

    // const handleStatusChange = (event) => {
    //     const { checked } = event.target;
    //     if (event.target.id === 'availableCheckbox') {
    //         setUserUpdate({ ...sportswearUpdate, status: 1 });
    //     } else if (event.target.id === 'disableCheckbox') {
    //         setUserUpdate({ ...sportswearUpdate, status: 0 });
    //     }
    // };
    // const handleFileChange = (event) => {
    //     // Chuyển đổi FileList thành mảng
    //     const newFiles = Array.from(event.target.files);

    //     // Chuyển đổi các file thành base64
    //     const promises = newFiles.map((file) => {
    //         return new Promise((resolve) => {
    //             const reader = new FileReader();
    //             reader.onloadend = () => {
    //                 resolve(reader.result);
    //             };
    //             reader.readAsDataURL(file);
    //         });
    //     });

    //     // Chờ tất cả các file được chuyển đổi thành base64
    //     Promise.all(promises).then((base64Files) => {
    //         setFiles(newFiles);
    //         setSportswearUpdate({ ...sportswearUpdate, list_of_related_sportswear_images: base64Files });
    //     });
    // };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserUpdate({ ...userUpdate, [name]: value });
    };
    const deleteByID = async (event) => {

        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await SportswearService.deleteSportswearByID(token, userUpdate.id)
                if (response.message === 'oke') { // Giả sử API trả về 201 Created khi thành công
                    window.alert("Xóa sản phẩm thành công!");
                }


            } catch (error) {
                console.log("error")
            }
        }
    };
    const handleMainPhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Lưu trữ base64 vào trạng thái
                setUserUpdate({ ...userUpdate, main_image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        // Kiểm tra price
        // if (isNaN(sportswearUpdate.price) || (!Number.isInteger(parseFloat(sportswearUpdate.price)) && !isFloat(sportswearUpdate.price))) {
        //     alert('Price must be an integer or a float/decimal number.');
        //     return;
        // }

        function isFloat(value) {
            return typeof value === 'number' && !Number.isInteger(value);
        }

        // if (sportswearUpdate.status === null) {
        //     alert('Please select at least one checkbox.');
        //     return;
        // }
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await UserService.updateUser(token, userUpdate)
            if (response.message === 'oke') { // Giả sử API trả về 201 Created khi thành công
                window.alert("Cập nhật sản phẩm thành công!");
            }


        } catch (error) {
            console.log("error")
        }
    }



    return (
        <div>
            <div>
                <button type="button" className="btn btn-primary mt-4 text-white" data-toggle="modal" data-target={`#updateModaal_${user.id}`} >
                    <strong><i class="fa-regular fa-eye"></i></strong> Xem và chỉnh sửa
                </button>
                <div className="modal fade" id={`updateModaal_${user.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document" style={{ maxWidth: "1200px" }}>
                        <div className="modal-content rounded-0">
                            <div className="modal-body py-0">
                                <div class="row">
                                    <div class="col-12 d-flex justify-content-end" >
                                        <button style={{ marginRight: '15px' }} type="button" class="btn btn-success mt-4 text-white" data-toggle="modal" data-target={`#updateModaal_${user.id}`}>
                                            <strong><i class="fa-solid fa-circle-plus"></i></strong> Đóng
                                        </button>
                                    </div>

                                </div>
                                <div className="d-flex main-content">

                                    <div className="bg-image promo-img mr-3" style={{ backgroundImage: `url(${user.main_image})` }}>
                                    </div>

                                    <div className="content-text row">
                                        {/* <div className="row">
                                            <div className="col-12 d-flex justify-content-end">
                                                <button type="button" className="btn btn-danger mt-4 text-white" onClick={deleteByID}>
                                                    <strong><i class="fa-solid fa-circle-plus"></i></strong> Xóa {user.id}
                                                </button>
                                            </div>


                                        </div> */}



                                        <form onSubmit={handleSubmit} className="col-12">
                                            <div className="form-group">
                                                <label for="first_name" style={{ display: 'flex', alignItems: 'center' }}>Tên sản phẩm</label>
                                                <input type="name" className="form-control" id="first_name" name="first_name"
                                                    value={userUpdate.first_name}
                                                    onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label for="last_name" style={{ display: 'flex', alignItems: 'center' }}>Tên sản phẩm</label>
                                                <input type="name" className="form-control" id="last_name" name="last_name"
                                                    value={userUpdate.last_name}
                                                    onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label for="address" style={{ display: 'flex', alignItems: 'center' }}>Tên sản phẩm</label>
                                                <input type="name" className="form-control" id="address" name="address"
                                                    value={userUpdate.address}
                                                    onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label for="email" style={{ display: 'flex', alignItems: 'center' }}>Tên sản phẩm</label>
                                                <input type="name" className="form-control" id="email" name="email"
                                                    value={userUpdate.email}
                                                    onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label for="phone" style={{ display: 'flex', alignItems: 'center' }}>Tên sản phẩm</label>
                                                <input type="name" className="form-control" id="phone" name="phone"
                                                    value={userUpdate.phone}
                                                    onChange={handleChange} required />
                                            </div>
                                            {/* <div className="form-group">
                                                <label for="name" style={{ display: 'flex', alignItems: 'center' }}>Giá</label>
                                                <input type="text" className="form-control" id="name" name="price"
                                                    value={userUpdate.price}
                                                    onChange={handleChange} required />
                                            </div> */}
                                            {/* <div className="form-group">
                                                <label for="name" style={{ display: 'flex', alignItems: 'center' }}>Quantity</label>
                                                <input type="text" className="form-control" id="name" name="quantity"
                                                    value={sportswearUpdate.quantity}
                                                    onChange={handleChange} required />
                                            </div> */}
                                            {/* <div className="form-group">
                                                <label for="categoryName" style={{ display: 'flex', alignItems: 'center' }}>Loại</label>
                                                <div className="input-select">

                                                    <select className="form-select" name="categoryName"
                                                        value={userUpdate.categoryName}
                                                        onChange={handleChange} required>
                                                        <option value="">--Chọn đê--</option>
                                                        <option value="Jeseys" selected={userUpdate.categoryName === "Jeseys"}>Áo câu lạc bộ</option>
                                                        <option value="Trainingwear" selected={userUpdate.categoryName === "Trainingwear"}>Áo Training</option>
                                                        <option value="Fashion" selected={userUpdate.categoryName === "Fashion"}>Thời trang khác</option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            {/* <div className="form-group">
                                                <label for="name" style={{ display: 'flex', alignItems: 'center' }}>Mô tả</label>
                                                <input type="text" className="form-control" id="name" name="description"
                                                    value={userUpdate.description}
                                                    onChange={handleChange} required />
                                            </div> */}
                                            {/* <div className="d-flex align-items-center justify-content-between mb-4">
                                                <div className="form-check">
                                                    <input className="form-check-input primary" type="checkbox" value="" id="availableCheckbox" checked={sportswearUpdate.status === 1} onChange={handleStatusChange} />
                                                    <label className="form-check-label text-dark" for="availableCheckbox">
                                                        Có sẵn
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-4">
                                                <div className="form-check">
                                                    <input className="form-check-input primary" type="checkbox" value="" id="disableCheckbox" checked={sportswearUpdate.status === 0} onChange={handleStatusChange} />
                                                    <label className="form-check-label text-dark" for="disableCheckbox">
                                                        Không có sẵn
                                                    </label>
                                                </div>
                                            </div> */}
                                            {/* <div className="form-group" >
                                                <label for="name" style={{ display: 'flex', alignItems: 'center' }}>Ảnh chính</label>
                                                <input type="file" className="form-control" id="main_image"
                                                    onChange={handleMainPhotoChange} />
                                                <ul>

                                                    <li >

                                                        
                                                        {userUpdate.main_image && (
                                                            
                                                            <img
                                                                src={userUpdate.main_image}
                                                                style={{ maxWidth: "100px", marginTop: '20px' }}
                                                            />
                                                        )}
                                                    </li>

                                                </ul>
                                            </div> */}

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



        </div>

    )
} export default ModuleModalUpdateUser;