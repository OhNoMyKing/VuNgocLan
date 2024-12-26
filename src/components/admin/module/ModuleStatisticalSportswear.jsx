import { useState } from "react";
import SportswearService from "../../service/SportswearService";
import TestChart from "./TestChart";



function ModuleStatisticalSportswear({ sportswear }) {




    const [files, setFiles] = useState([]);

    const [sportswearUpdate, setSportswearUpdate] = useState(sportswear);

    const handleStatusChange = (event) => {
        const { checked } = event.target;
        if (event.target.id === 'availableCheckbox') {
            setSportswearUpdate({ ...sportswearUpdate, status: 1 });
        } else if (event.target.id === 'disableCheckbox') {
            setSportswearUpdate({ ...sportswearUpdate, status: 0 });
        }
    };
    const handleFileChange = (event) => {
        // Chuyển đổi FileList thành mảng
        const newFiles = Array.from(event.target.files);

        // Chuyển đổi các file thành base64
        const promises = newFiles.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        });

        // Chờ tất cả các file được chuyển đổi thành base64
        Promise.all(promises).then((base64Files) => {
            setFiles(newFiles);
            setSportswearUpdate({ ...sportswearUpdate, list_of_related_sportswear_images: base64Files });
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSportswearUpdate({ ...sportswearUpdate, [name]: value });
    };
    const deleteByID = async (event) => {

        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await SportswearService.deleteSportswearByID(token, sportswearUpdate.id)
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
                setSportswearUpdate({ ...sportswear, main_image: reader.result });
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

        if (sportswearUpdate.status === null) {
            alert('Please select at least one checkbox.');
            return;
        }
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await SportswearService.addSportswear(token, sportswearUpdate)
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
                <button type="button" className="btn btn-success mt-4 text-white" data-toggle="modal" data-target={`#updateModall_${sportswear.id}`} >
                    <strong><i class="fa-regular fa-eye"></i></strong> Xem thống kê
                </button>
                <div className="modal fade" id={`updateModall_${sportswear.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document" style={{ maxWidth: "1200px" }}>
                        <div className="modal-content rounded-0">
                            <div className="modal-body py-0">
                                <div class="row">
                                    <div class="col-12 d-flex justify-content-end" >
                                        <button style={{ marginRight: '15px' }} type="button" class="btn btn-success mt-4 text-white" data-toggle="modal" data-target={`#updateModall_${sportswear.id}`} >
                                            <strong><i class="fa-solid fa-circle-plus"></i></strong> Đóng
                                        </button>
                                    </div>

                                </div>
                                <div className="main-content">

                                    <div className="bg-image promo-img mr-3" >
                                        <TestChart sportswearID={sportswear.id} />
                                    </div>

                                    {/* <div className="content-text row">
                                        <div className="row">
                                            <div className="col-12 d-flex justify-content-end">
                                                <button type="button" className="btn btn-danger mt-4 text-white" onClick={deleteByID}>
                                                    <strong><i class="fa-solid fa-circle-plus"></i></strong> Xóa {sportswear.id}
                                                </button>
                                            </div>


                                        </div>



                                        <form onSubmit={handleSubmit} className="col-12">
                                            <div className="form-group">
                                                <label for="email" style={{ display: 'flex', alignItems: 'center' }}>Tên sản phẩm</label>
                                                <input type="name" className="form-control" id="name" name="name"
                                                    value={sportswearUpdate.name}
                                                    onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label for="name" style={{ display: 'flex', alignItems: 'center' }}>Giá</label>
                                                <input type="text" className="form-control" id="name" name="price"
                                                    value={sportswearUpdate.price}
                                                    onChange={handleChange} required />
                                            </div>
                                            
                                            <div className="form-group">
                                                <label for="categoryName" style={{ display: 'flex', alignItems: 'center' }}>Loại</label>
                                                <div className="input-select">

                                                    <select className="form-select" name="categoryName"
                                                        value={sportswearUpdate.categoryName}
                                                        onChange={handleChange} required>
                                                        <option value="">--Chọn đê--</option>
                                                        <option value="Jeseys" selected={sportswearUpdate.categoryName === "Jeseys"}>Áo câu lạc bộ</option>
                                                        <option value="Trainingwear" selected={sportswearUpdate.categoryName === "Trainingwear"}>Áo Training</option>
                                                        <option value="Fashion" selected={sportswearUpdate.categoryName === "Fashion"}>Thời trang khác</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="name" style={{ display: 'flex', alignItems: 'center' }}>Mô tả</label>
                                                <input type="text" className="form-control" id="name" name="description"
                                                    value={sportswearUpdate.description}
                                                    onChange={handleChange} required />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-4">
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
                                            </div>
                                            <div className="form-group" >
                                                <label for="name" style={{ display: 'flex', alignItems: 'center' }}>Ảnh chính</label>
                                                <input type="file" className="form-control" id="main_image"
                                                    onChange={handleMainPhotoChange} />
                                                <ul>

                                                    <li >

                                                       
                                                        {sportswearUpdate.main_image && (
                                                            
                                                            <img
                                                                src={sportswearUpdate.main_image}
                                                                style={{ maxWidth: "100px", marginTop: '20px' }}
                                                            />
                                                        )}
                                                    </li>

                                                </ul>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="name" style={{ display: 'flex', alignItems: 'center' }}>Ảnh liên quan</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    multiple
                                                    onChange={handleFileChange}

                                                />
                                                <ul>
                                                    {sportswearUpdate.list_of_related_sportswear_images?.map((base64Image, index) => (

                                                        <li key={index} style={{ display: 'inline-block', marginTop: '20px', marginRight: '10px' }}>
                                                            
                                                            {base64Image && (
                                                                <img
                                                                    src={base64Image}
                                                                    alt={`Related photo ${index + 1}`}
                                                                    style={{ maxWidth: "100px" }}
                                                                />
                                                            )}
                                                        </li>

                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="form-group">
                                                <input type="submit" value="Hoàn thành" className="btn btn-primary btn-block" />
                                            </div>
                                            
                                        </form>
                                    </div> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </div>

    )
} export default ModuleStatisticalSportswear;