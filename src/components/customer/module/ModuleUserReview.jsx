import { useEffect, useState } from "react";
import SportswearService from "../../service/SportswearService";
import OrderService from "../../service/OrderService";

import { FaStar } from "react-icons/fa";
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};
function ModuleUserReview({ order }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const stars = Array(5).fill(0);

  const [listRating, setListRating] = useState(
    order.orderItemResponseList.map((item) => item.ratingValue || 0)
  );

  console.log(listRating);

  const [orderUpdate, setOrderUpdate] = useState(order);
  const [ratingValues, setRatingValues] = useState(
    order.orderItemResponseList.map((item) => item.ratingValue)
  );

  // const handleClick = value => {
  //     setCurrentValue(value)
  // }
  const handleClick = (event, index, rating) => {
    const newCommentValues = [...commentValues];
    const newRatingValues = [...ratingValues];

    newRatingValues[index] = rating;
    setRatingValues(newRatingValues);
    updateOrder(newRatingValues, newCommentValues);

    const newListRating = [...listRating];
    newListRating[index] = rating;
    setListRating(newListRating);
    console.log(listRating);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const [commentValues, setCommentValues] = useState(
    order.orderItemResponseList.map((item) => item.comment || "")
  );

  // const [files, setFiles] = useState([]);

  const updateOrder = (newRatingValues, newCommentValues) => {
    // Tạo một bản sao mới của order
    const updatedOrder = { ...order };
    // Cập nhật ratingValue cho từng item trong orderItemResponseList
    updatedOrder.orderItemResponseList = order.orderItemResponseList.map(
      (item, index) => ({
        ...item,
        ratingValue: newRatingValues[index],
        comment: newCommentValues[index],
      })
    );
    // Cập nhật lại state của order (nếu cần)
    // ... code để cập nhật state của order
    setOrderUpdate(updatedOrder);
    // Log ra order đã được cập nhật
    console.log(updatedOrder);
  };
  const handleChange = (event, index) => {
    // Tạo một bản sao mới của mảng ratingValues để tránh cập nhật trực tiếp
    const { name, value } = event.target;
    const newRatingValues = [...ratingValues];
    const newCommentValues = [...commentValues];
    if (name.startsWith("rating-")) {
      newRatingValues[index] = value;
      setRatingValues(newRatingValues);
    } else if (name.startsWith("comment-")) {
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
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      const response = await OrderService.userReview(token, orderUpdate);
      if (response.message === "oke") {
        // Giả sử API trả về 201 Created khi thành công
        window.alert("Đã lưu đánh giá");
        window.location.reload();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300,
    },
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    },
  };
  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-warning mt-4 text-white"
          data-toggle="modal"
          data-target={`#updateModal_${order.id}`}
        >
          <strong></strong> Chưa đánh giá{" "}
          <i className="fa-solid fa-circle-plus"></i>
        </button>
        <div
          className="modal fade"
          id={`updateModal_${order.id}`}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
            style={{ maxWidth: "1200px" }}
          >
            <div className="modal-content rounded-0">
              <div className="modal-body py-0">
                <div className="row">
                  <div className="col-12 d-flex justify-content-end">
                    <button
                      style={{ marginRight: "15px" }}
                      type="button"
                      className="btn btn-success mt-4 text-white"
                      data-toggle="modal"
                      data-target={`#updateModal_${order.id}`}
                    >
                      <strong>
                        <i className="fa-solid fa-circle-plus"></i>
                      </strong>{" "}
                      Close
                    </button>
                  </div>
                </div>
                <div className="col-lg-12 d-flex align-items-strech mt-2">
                  {/* <div className="bg-image promo-img mr-3" style={{ backgroundImage: `url(${sportswear.main_image})` }}>
                                    </div> */}
                  <div className="col-lg-12 d-flex align-items-strech">
                    <div className="card w-100">
                      <div className="card-body">
                        <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                          <div className="mb-3 mb-sm-0">
                            <h5 className="card-title fw-semibold">
                              Sales Overview
                            </h5>
                          </div>
                        </div>
                        <div className="content-text p-4">
                          <form onSubmit={handleSubmit}>
                            {order.orderItemResponseList.map((item, index) => (
                              <div key={index} className="card w-100">
                                <div className="form-group card-body">
                                  <div className="row align-items-center">
                                    <div
                                      className="col-4 "
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <img
                                        className=""
                                        src={item.image}
                                        style={{
                                          maxWidth: "100px",
                                          marginTop: "20px",
                                        }}
                                      />
                                      <div style={styles.container}>
                                        <h2> React Ratings </h2>
                                        <div style={styles.stars}>
                                          {stars.map((_, startIndex) => {
                                            return (
                                              <FaStar
                                                required
                                                key={`${index}-${startIndex}`}
                                                size={24}
                                                onClick={(event) =>
                                                  handleClick(
                                                    event,
                                                    index,
                                                    startIndex + 1
                                                  )
                                                }
                                                color={
                                                  listRating[index] > startIndex
                                                    ? colors.orange
                                                    : colors.grey
                                                }
                                                style={{
                                                  marginRight: 10,
                                                  cursor: "pointer",
                                                }}
                                              />
                                            );
                                          })}
                                        </div>
                                        {/* <textarea
                                                            placeholder="What's your experience?"
                                                            style={styles.textarea}
                                                        />

                                                        <button
                                                            style={styles.button}
                                                        >
                                                            Submit
                                                        </button> */}
                                      </div>
                                    </div>
                                    <div className="col-8">
                                      <label htmlFor="rating">
                                        Đánh giá sản phẩm:{" "}
                                        {item.sportswear_name}
                                      </label>

                                      {/* <input
                                                                                type="number"
                                                                                className="form-control"
                                                                                id={`rating-${index}`}
                                                                                name={`rating-${index}`}
                                                                                value={ratingValues[index]}
                                                                                onChange={(event) => handleChange(event, index)}
                                                                                required
                                                                            /> */}

                                      <label htmlFor={`comment-${index}`}>
                                        Đánh giá:{" "}
                                      </label>
                                      <textarea // Use textarea for comments
                                        id={`comment-${index}`} // Unique ID for each comment input
                                        name={`comment-${index}`} // Unique name for each comment input
                                        className="form-control"
                                        rows="3" // Optional: Set the number of rows for the comment box
                                        value={commentValues[index]}
                                        onChange={(event) =>
                                          handleChange(event, index)
                                        }
                                        required
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className="form-group">
                              <input
                                type="submit"
                                value="Done"
                                className="btn btn-primary btn-block"
                              />
                            </div>
                            <div className="form-group ">
                              <p className="custom-note">
                                <small>
                                  By signing up you will agree to our{" "}
                                  <a href="/home">Privacy Policy</a>
                                </small>
                              </p>
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
        </div>
      </div>
    </div>
  );
}
export default ModuleUserReview;
