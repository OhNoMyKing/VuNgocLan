import { useState } from "react";
import SportswearService from "../../service/SportswearService";
import OrderService from "../../service/OrderService";



function ModuleUserReview({ order }) {


    const [commentValues, setCommentValues] = useState(
        order.orderItemResponseList.map(item => item.comment || '')
    );

    // const [files, setFiles] = useState([]);
    const [orderUpdate, setOrderUpdate] = useState(order);

    const [ratingValues, setRatingValues] = useState(
        order.orderItemResponseList.map(item => item.ratingValue)
    );
    const updateOrder = (newRatingValues, newCommentValues) => {
        // Tạo một bản sao mới của order
        const updatedOrder = { ...order };
        // Cập nhật ratingValue cho từng item trong orderItemResponseList
        updatedOrder.orderItemResponseList = order.orderItemResponseList.map((item, index) => ({
            ...item,
            ratingValue: newRatingValues[index],
            comment: newCommentValues[index]
        }));
        // Cập nhật lại state của order (nếu cần)
        // ... code để cập nhật state của order
        setOrderUpdate(updatedOrder)
        // Log ra order đã được cập nhật
        console.log(updatedOrder)
    };
    const handleChange = (event, index) => {
        // Tạo một bản sao mới của mảng ratingValues để tránh cập nhật trực tiếp
        const { name, value } = event.target;
        const newRatingValues = [...ratingValues];
        const newCommentValues = [...commentValues];
        if (name.startsWith('rating-')) {

            newRatingValues[index] = value;
            setRatingValues(newRatingValues);
        } else if (name.startsWith('comment-')) {

            newCommentValues[index] = value;
            setCommentValues(newCommentValues);
        }
        updateOrder(newRatingValues, newCommentValues);

    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        // Kiểm tra price
        // if (isNaN(sportswearUpdate.price) || (!Number.isInteger(parseFloat(sportswearUpdate.price)) && !isFloat(sportswearUpdate.price))) {
        //     alert('Price must be an integer or a float/decimal number.');
        //     return;
        // }

        // function isFloat(value) {
        //     return typeof value === 'number' && !Number.isInteger(value);
        // }

        // if (sportswearUpdate.status === null) {
        //     alert('Please select at least one checkbox.');
        //     return;
        // }
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await OrderService.userReview(token, orderUpdate)
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
                <button type="button" className="btn btn-warning mt-4 text-white" data-toggle="modal" data-target={`#updateModal_${order.id}`} >
                    <strong></strong> Chưa đánh giá <i class="fa-solid fa-circle-plus"></i>
                </button>
                <div className="modal fade" id={`updateModal_${order.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document" style={{ maxWidth: "1200px" }}>
                        <div className="modal-content rounded-0">
                            <div className="modal-body py-0">
                                <div class="row">
                                    <div class="col-12 d-flex justify-content-end" >
                                        <button style={{ marginRight: '15px' }} type="button" class="btn btn-success mt-4 text-white" data-toggle="modal" data-target={`#updateModal_${order.id}`} >
                                            <strong><i class="fa-solid fa-circle-plus"></i></strong> Close
                                        </button>
                                    </div>

                                </div>
                                <div className="d-flex main-content">

                                    {/* <div className="bg-image promo-img mr-3" style={{ backgroundImage: `url(${sportswear.main_image})` }}>
                                    </div> */}

                                    <div className="content-text p-4">
                                        <div className="row">
                                            {/* <div className="col-12 d-flex justify-content-end">
                                                <button type="button" className="btn btn-danger mt-4 text-white" onClick={deleteByID}>
                                                    <strong><i class="fa-solid fa-circle-plus"></i></strong> Delete {sportswear.id}
                                                </button>
                                            </div> */}


                                        </div>

                                        <h3>Insert Sportswear</h3>

                                        <p>All their equipment and instruments are alive. The sky was cloudless and of a deep dark blue.</p>

                                        <form onSubmit={handleSubmit}>
                                            {order.orderItemResponseList.map((item, index) => (
                                                <div key={index}>
                                                    <div className="form-group">
                                                        <img
                                                            src={item.image}
                                                            style={{ maxWidth: "100px", marginTop: '20px' }}
                                                        />
                                                        <label htmlFor="rating">Rating for {item.sportswear_name}</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id={`rating-${index}`}
                                                            name={`rating-${index}`}
                                                            value={ratingValues[index]}
                                                            onChange={(event) => handleChange(event, index)}
                                                            required
                                                        />
                                                        <label htmlFor={`comment-${index}`}>Comment (Optional)</label>
                                                        <textarea // Use textarea for comments
                                                            id={`comment-${index}`} // Unique ID for each comment input
                                                            name={`comment-${index}`} // Unique name for each comment input
                                                            className="form-control"
                                                            rows="3" // Optional: Set the number of rows for the comment box
                                                            value={commentValues[index]}
                                                            onChange={(event) => handleChange(event, index)}
                                                        ></textarea>
                                                    </div>



                                                </div>
                                            ))}
                                            <div className="form-group">
                                                <input type="submit" value="Done" className="btn btn-primary btn-block" />
                                            </div>
                                            <div className="form-group ">
                                                <p className="custom-note"><small>By signing up you will agree to our <a href="/home">Privacy Policy</a></small></p>
                                            </div>
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
} export default ModuleUserReview;