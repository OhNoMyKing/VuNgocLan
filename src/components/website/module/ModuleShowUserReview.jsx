// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import SportswearService from '../../service/SportswearService';

// function ModuleShowUserReview() {
//     const { sportswearId } = useParams();
    



//     useEffect(() => {
//         // Fetch users data when the component mounts
//         fetchSportswear();
//     }, [sportswearId]);


//     const fetchSportswear = async () => {
//         try {

//             const token = localStorage.getItem('token'); // Retrieve the token from localStorage
//             const response = await SportswearService.getSportswearByID(token, sportswearId);
            

//             // Assuming the list of users is under the key 'ourUsersList'
//         } catch (error) {
//             console.log('Error fetching users:');
//         }
//     };


    


    
//     const increaseQuantity = () => {
//         setQuantity(quantity + 1);
//     };

//     const decreaseQuantity = () => {
//         if (quantity > 1) {
//             setQuantity(quantity - 1);
//         }
//     };
//     const slideRight = () => {
//         setCurrent(current === relatedPhoto.length - 1 ? 0 : current + 1);
//     };

//     const slideLeft = () => {
//         setCurrent(current === 0 ? relatedPhoto.length - 1 : current - 1);
//     };
//     const handleSizeChange = (event) => {
//         setSelectedSize(event.target.value); // Update selected size state
//     };


//     const handleAddToCart = async (e) => {
//         e.preventDefault();
//         if (selectedSize === "") {
//             alert('Please select your size.');
//             return;
//         }
//         // Tạo đối tượng orderItemRequest
//         const newOrderItemRequest = {
//             sportswear_id: sportswears.id,
//             quantity: quantity,
//             size: selectedSize

//         };

//         // Cập nhật trạng thái orderItemRequest *trước* khi ghi nhật ký


//         // Bây giờ ghi nhật ký trạng thái đã cập nhật
//         console.log('OrderItem Request:', newOrderItemRequest);

//         try {
//             const token = localStorage.getItem('token'); // Retrieve the token from localStorage

//             const response = await SportswearService.createOrderItem(token, newOrderItemRequest)
//             console.log(response)
//             if (response.message === 'oke') { // Giả sử API trả về 201 Created khi thành công
//                 // window.alert("Đã thêm vào giỏ hàng!");
//                 alert('Đã thêm vào giỏ hàng 11!');
//             }


//         } catch (error) {
//             console.log("error")
//         }


//     };
//     return (
//         <div>

//             <div className="product-page">
//                 <div className="container">
//                     <div className="product-control">
//                         <a href="#">Previous</a>
//                         <a href="#">Next</a>
//                     </div>
//                     <div className="row">
//                         <div className="col-lg-6">
//                             <div
//                                 className="carousel"
//                                 onMouseEnter={() => {
//                                     setAutoPlay(false);
//                                     clearTimeout(timeOut);
//                                 }}
//                                 onMouseLeave={() => {
//                                     setAutoPlay(true);
//                                 }}
//                             >
//                                 <div className="carousel_wrapper" style={{ width: '80%', height: '80%', margin: 'auto' }}>
//                                     {relatedPhoto.map((image, index) => {
//                                         return (
//                                             /* (condition) ? true : false */

//                                             <div
//                                                 key={index}
//                                                 className={
//                                                     index == current
//                                                         ? "carousel_card carousel_card-active"
//                                                         : "carousel_card"
//                                                 }
//                                             >
//                                                 <img className="card_image" src={image} alt="" />
//                                                 {/* <div className="card_overlay">
//                                                     <h2 className="card_title">{title}</h2>
//                                                 </div> */}
//                                             </div>
//                                         );
//                                     })}
//                                     <div className="carousel_arrow_left" onClick={slideLeft}>
//                                         &lsaquo;
//                                     </div>
//                                     <div className="carousel_arrow_right" onClick={slideRight}>
//                                         &rsaquo;
//                                     </div>
//                                     <div className="carousel_pagination">
//                                         {relatedPhoto.map((_, index) => {
//                                             return (
//                                                 <div
//                                                     key={index}
//                                                     className={
//                                                         index == current
//                                                             ? "pagination_dot pagination_dot-active"
//                                                             : "pagination_dot"
//                                                     }
//                                                     onClick={() => setCurrent(index)}
//                                                 ></div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="d-flex justify-content-center mb-3" >
//                                 {relatedPhoto.map((image, index) => {
//                                     return (
//                                         <div className="div">

//                                             <img style={{ width: '80px', height: '80px' }} className="rounded-2" src={image} />

//                                         </div>
//                                     )
//                                 })}


//                             </div>
//                             {/* owl-carousel bo thi moi hien thi anh o className ben duoi */}
//                             {/* <div className="product-slider ">
//                                 <div className="product-img">

//                                     <figure>
//                                         <img src={sportswears.main_photo} alt="" />
//                                         <div className="p-status">new</div>
//                                     </figure>
//                                 </div>

//                             </div> */}


//                         </div>
//                         <div className="col-lg-6">
//                             <div className="product-content">
//                                 <h2 >  {sportswears.name}</h2>
//                                 <div className="pc-meta">
//                                     <h5 >${sportswears.price}</h5>
//                                     <div className="rating">
//                                         <i className="fa fa-star"></i>
//                                         <i className="fa fa-star"></i>
//                                         <i className="fa fa-star"></i>
//                                         <i className="fa fa-star"></i>
//                                         <i className="fa fa-star"></i>
//                                     </div>
//                                 </div>
//                                 <p>{sportswears.description}</p>
//                                 <ul className="tags">
//                                     <li><span>Category :</span> Men’s Wear</li>
//                                     <li><span>Tags :</span> man, shirt, dotted, elegant, cool</li>
//                                 </ul>

//                                 <div className="row mb-4">
//                                     <div className="col-md-4 col-6">
//                                         <label className="mb-2">Size</label>
//                                         <select onChange={handleSizeChange} className="form-select " style={{ height: '35px' }} required>
//                                             <option value="">Choose Size</option>
//                                             <option value="S">S</option>
//                                             <option value="M">M</option>
//                                             <option value="L">L</option>
//                                             <option value="XL">XL</option>
//                                             <option value="XXL">XXL</option>

//                                         </select>
//                                     </div>


//                                 </div>
//                                 <div className="product-quantity">
//                                     <div className="pro-qty">
//                                         <button className='btn btn-white  px-3' onClick={decreaseQuantity} disabled={quantity === 1}>
//                                             <i class="fas fa-minus"></i>
//                                         </button>
//                                         <input

//                                             min="1"
//                                             value={quantity}

//                                         />
//                                         <button className='btn btn-white px-3' onClick={increaseQuantity}>
//                                             <i class="fas fa-plus"></i>
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <a className="primary-btn pc-btn" onClick={handleAddToCart}>Add to cart</a>







//                                 <ul className="p-info">
//                                     <li>Product Information</li>
//                                     <li>Reviews</li>
//                                     <li>Product Care</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default ModuleShowUserReview;