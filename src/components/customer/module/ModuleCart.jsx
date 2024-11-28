// import React, { useContext } from 'react';
// import { CartContext } from '../../../context/CartProvider';

import { useContext, useEffect, useState } from "react";
import CartService from "../../service/CartService";
import { PaginationContext } from "../../../context/PaginationContext";
import Pagination from "../../common/Pagination";
import { Link, useNavigate } from "react-router-dom";


function ModuleCart() {
    const { noPage, setNoPage, totalPage, setTotalPage } = useContext(PaginationContext);
    const navigate = useNavigate();
    const [cartResponse, setCartResponse] = useState([]);
    const [click, setClick] = useState(false);
    // const { cartItems } = useContext(CartContext);
    // console.log(cartItems.orderItemResponseList)

    useEffect(() => {
        // Fetch users data when the component mounts
        fetchSportswear();
    }, [noPage, totalPage]);

    // const [listOrderItemResponse, setListOrderItemResponse] = useState([]);
    const fetchSportswear = async () => {
        try {

            const token = localStorage.getItem('token');
            const data = await CartService.getCart(token, noPage) // Assuming the list of users is under the key 'ourUsersList'
            console.log(data)
            setCartResponse(data)
            setTotalPage(data.totalPage)
            if (data.totalPage >= 1) {
                setNoPage(data.currentPage)

            }


        } catch (error) {
            console.log('Error fetching users:');
        }
    };
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    // const [quantity, setQuantity] = useState(1);
    const clearCart = async () => {

        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            try {

                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await CartService.clearCart(token)
                console.log(response)
                if (response.message === 'oke') { // Giả sử API trả về 201 Created khi thành công
                    window.alert("Đã thêm vào giỏ hàng!");
                    navigate("/cart-user")
                }


            } catch (error) {
                console.log("error")
            }

        }

        // Update the cart in the backend
        // ...
    };
    const deleteByID = async (index) => {

        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {

                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await CartService.deleteOrderItemByID(token, cartResponse.cartItemResponseList[index].id)
                console.log(response)
                if (response.message === 'oke') { // Giả sử API trả về 201 Created khi thành công
                    window.alert("Đã xóa vào giỏ hàng!");
                }


            } catch (error) {
                console.log("error")
            }
        }
        // Update the cart in the backend
        // ...
    };
    const increaseQuantity = async (index) => {


        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await CartService.increaseQuantity(token, cartResponse.cartItemResponseList[index].id)
            // console.log(response)
            const updatedCart = [...cartResponse.cartItemResponseList];
            updatedCart[index].quantity = updatedCart[index].quantity + 1;
            updatedCart[index].totalAmount = updatedCart[index].totalAmount + updatedCart[index].price;
            setCartResponse({
                ...cartResponse,
                cartItemResponseList: updatedCart,
                totalAmount: cartResponse.totalAmount + updatedCart[index].price
            });

        } catch (error) {
            console.log("error")
        }
        // Update the cart in the backend
        // ...
    };

    const decreaseQuantity = async (index) => {


        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await CartService.decreaseQuantity(token, cartResponse.cartItemResponseList[index].id)
            // console.log(response)
            const updatedCart = [...cartResponse.cartItemResponseList];
            updatedCart[index].quantity = updatedCart[index].quantity - 1;
            updatedCart[index].totalAmount = updatedCart[index].totalAmount - updatedCart[index].price;

            setCartResponse({
                ...cartResponse,
                cartItemResponseList: updatedCart,
                totalAmount: cartResponse.totalAmount - updatedCart[index].price
            });
        } catch (error) {
            console.log("error")
        }
    };
    return (
        <div style={{ marginTop: '30px' }}>
            {totalPage > 0 && <div className="cart-page">
                <div className="container">
                    <div className="cart-table">
                        <table>
                            <thead>
                                <tr>
                                    <th className="product-h">Sản phẩm</th>
                                    <th>Giá</th>
                                    <th className="quan">Số lượng</th>
                                    <th>Tổng tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartResponse.cartItemResponseList && cartResponse.cartItemResponseList.map((item, index) => (
                                    <tr key={index}>
                                        <td className="product-col">
                                            <img src={item.image} alt="" />
                                            <div className="p-title">
                                                <h5>{item.sportswear_name}</h5>
                                            </div>
                                        </td>
                                        <td className="price-col">{formatter.format(item.price)}</td>
                                        <td className="quantity-col">

                                            <div className="pro-qty">
                                                <button classNameName='btn btn-white  px-3' onClick={() => decreaseQuantity(index)} disabled={item.quantity === 1}>
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <input type="text" value={item.quantity} />
                                                <button classNameName='btn btn-white px-3' onClick={() => increaseQuantity(index)}>
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>

                                        </td>
                                        <td className="total">{formatter.format(item.totalAmount)}</td>
                                        <td className="product-close"><button classNameName='btn btn-white px-3' onClick={() => deleteByID(index)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    <div classNameName="cart-btn">
                        <div className="row">
                            <div className="col-lg-6">
                                {/* <div className="coupon-input">
                                    <input type="text" placeholder="Enter cupone code" />
                                </div> */}

                            </div>
                            <div className="col-lg-5 offset-lg-1 text-left text-lg-right">
                                <div className="site-btn clear-btn" onClick={clearCart}>Xóa tất cả</div>
                                <Link to={"/checkout"} className="site-btn update-btn btn-warning" >Tiến hành đặt hàng</Link>
                            </div>
                        </div>

                        <Pagination />
                    </div>




                </div>


            </div>}
            {totalPage === 0 && <div>
                <div className="container-fluid  mt-100">
                    <div className="row">

                        <div className="col-md-12">

                            <div className="card">

                                <div className="card-body cart">
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                        <h3><strong>Giỏ hàng của bạn đang rỗng</strong></h3>
                                        <h4>Thêm vài cái áo đi</h4>
                                        <a href="/home" className="btn btn-primary cart-btn-transform m-3" data-abc="true">Tiếp tục mua sắm</a>


                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>}
        </div>
    );
}

export default ModuleCart;