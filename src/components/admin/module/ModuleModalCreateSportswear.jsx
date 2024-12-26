import { useState } from "react";
import SportswearService from "../../service/SportswearService";




function ModuleModalCreateSportswear() {
    const [files, setFiles] = useState([]);
    const [sportswear, setSportswear] = useState({
        name: "",
        price: "",
        categoryName: "",
        description: "",
        status: null,
        main_image: null,
        list_of_related_sportswear_images: []
    });
    const [errors, setErrors] = useState({
        name: '',
        price: '',
        // quantity: '',
        categoryName: '',
        description: '',
    });
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
            setSportswear({ ...sportswear, list_of_related_sportswear_images: base64Files });
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setErrors({ ...errors, [name]: 'Empty' });
        setSportswear({ ...sportswear, [name]: value });
    };

    const handleMainPhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Lưu trữ base64 vào trạng thái
                setSportswear({ ...sportswear, main_image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleStatusChange = (event) => {
        const { checked } = event.target;
        if (event.target.id === 'availableCheckbox') {
            setSportswear({ ...sportswear, status: 1 });
        } else if (event.target.id === 'disableCheckbox') {
            setSportswear({ ...sportswear, status: 0 });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        // Kiểm tra price
        if (isNaN(sportswear.price) || (!Number.isInteger(parseFloat(sportswear.price)) && !isFloat(sportswear.price))) {
            alert('Price must be an integer or a float/decimal number.');
            return;
        }

        function isFloat(value) {
            return typeof value === 'number' && !Number.isInteger(value);
        }

        if (sportswear.status === null) {
            alert('Please select at least one checkbox.');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            console.log(sportswear)
            const response = await SportswearService.addSportswear(token, sportswear)
            if (response.message === 'oke') { // Giả sử API trả về 201 Created khi thành công
                window.alert("Thêm sản phẩm thành công!");
            }


        } catch (error) {
            console.log("error")
        }
    }

    return (
        <div>
            <div>
                <button type="button" className="btn btn-secondary px-4 py-3" data-toggle="modal" data-target="#exampleModalCenter" >
                    <strong><i class="fa-solid fa-circle-plus"></i></strong>  Thêm sản phẩm
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
                                            <label for="email">Tên sản phẩm</label>
                                            <input type="name" className="form-control" id="name" name="name"
                                                value={sportswear.name}
                                                onChange={handleChange} required />
                                        </div>

                                        <div className="form-group">
                                            <label for="name">Giá</label>
                                            <input type="text" className="form-control" id="name" name="price"
                                                value={sportswear.price}
                                                onChange={handleChange} required />
                                        </div>
                                        {/* <div className="form-group">
                                            <label for="name">Quantity</label>
                                            <input type="text" className="form-control" id="name" name="quantity"
                                                value={sportswear.quantity}
                                                onChange={handleChange} required />
                                        </div> */}
                                        <div className="form-group">
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
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Ảnh chính</label>
                                            <input type="file" className="form-control" id="main_image"
                                                onChange={handleMainPhotoChange} required />
                                            <ul>

                                                <li >

                                                    {/* Hiển thị base64 của ảnh nếu có */}
                                                    {sportswear.main_image && (
                                                        // eslint-disable-next-line jsx-a11y/alt-text
                                                        <img
                                                            src={sportswear.main_image}
                                                            style={{ maxWidth: "100px" }}
                                                        />
                                                    )}
                                                </li>

                                            </ul>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Ảnh liên quan</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                multiple
                                                onChange={handleFileChange} required
                                            />
                                            <ul>
                                                {files.map((file, index) => (
                                                    <li key={file.name}>
                                                        {file.name}
                                                        {/* Hiển thị base64 của ảnh nếu có */}
                                                        {sportswear.list_of_related_sportswear_images[index] && (
                                                            <img
                                                                src={sportswear.list_of_related_sportswear_images[index]}
                                                                alt={file.name}
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
} export default ModuleModalCreateSportswear;