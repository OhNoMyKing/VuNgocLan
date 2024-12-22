import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../../context/SearchContext";
import { PaginationContext } from "../../../context/PaginationContext";
import { useNavigate } from "react-router-dom";
import SportswearService from "../../service/SportswearService";
import Search from "../../common/Search";

import ModuleModalUpdateSportswear from "./ModuleModalUpdateSportswear";
import Pagination from "../../common/Pagination";
import ModuleModalCreateSportswear from "./ModuleModalCreateSportswear";
import ModuleStatisticalSportswear from "./ModuleStatisticalSportswear";

function ModuleManagerSportswear() {
  const [sportswears, setSportswears] = useState([]);
  const { key, categoryName } = useContext(SearchContext);
  const { noPage, setNoPage, totalPage, setTotalPage } =
    useContext(PaginationContext);
  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  // Kết nối WebSocket
  useEffect(() => {
    const uniqueId = Math.random().toString(36).substring(2, 15);
    const socket = new SockJS("http://localhost:8080/ws"); // Đảm bảo endpoint đúng
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        clientId: uniqueId, // Thêm ID để backend phân biệt
      },
      onConnect: () => {
        console.log("WebSocket connected");

        // Đăng ký nhận thông báo từ topic /topic/sportswearUpdated
        client.subscribe("/topic/sportswearUpdated", (message) => {
          console.log(message);
          try {
            console.log("Received message:", message.body.body);
            const updatedProduct = JSON.parse(message.body).body;

            setSportswears((prevSportswears) => {
              const exists = prevSportswears.some(
                (item) => item.id === updatedProduct.id
              );

              if (exists) {
                // Cập nhật sản phẩm nếu đã tồn tại
                return prevSportswears.map((item) =>
                  item.id === updatedProduct.id ? updatedProduct : item
                );
              } else {
                // Thêm sản phẩm mới nếu không tồn tại
                return [...prevSportswears, updatedProduct];
              }
            });
          } catch (error) {
            console.error("Error processing WebSocket message:", error);
          }
        });
      },
      onStompError: (error) => {
        console.error("STOMP error:", error);
      },
    });

    client.activate(); // Kích hoạt kết nối WebSocket

    // Cleanup khi component bị unmount
    return () => {
      if (client) {
        client.deactivate(); // Hủy kết nối
      }
    };
  }, []);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchSportswear();
  }, [key, categoryName, totalPage, noPage]);

  const fetchSportswear = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await SportswearService.getAllSportswearByAdmin(
        token,
        key,
        noPage,
        categoryName
      );
      setTotalPage(response.totalPage);
      setNoPage(response.currentPage);
      setSportswears(response.sportswearResponseList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.log("Error fetching users:");
    }
  };

  return (
    <div className="div">
      <Search />
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 d-flex align-items-stretch">
              <div className="card w-100">
                <div className="card-body p-4">
                  <h5 className="card-title fw-semibold mb-4">VuL4n4nh</h5>
                  <ModuleModalCreateSportswear />
                  {/* <button className="btn badge bg-success rounded-3 fw-semibold" onClick={handleAddClick}>
                                        Add
                                    </button> */}
                  <div
                    className="container d-flex justify-content-center mt-50 mb-50"
                    style={{ marginTop: "50px" }}
                  >
                    <div className="row">
                      <div className="row">
                        {sportswears.map((item) => (
                          <div className="card card-body" key={item.id}>
                            <div className="media align-items-center align-items-lg-start  text-lg-left flex-column flex-lg-row">
                              <div className="mr-2 mb-3 mb-lg-0">
                                <img
                                  src={item.main_image}
                                  width="150"
                                  height="150"
                                  alt=""
                                />
                              </div>

                              <div className="media-body">
                                <h6 className="media-title font-weight-semibold">
                                  {item.name}
                                </h6>

                                <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                                  <li className="list-inline-item text-danger">
                                    Trạng thái :
                                  </li>
                                  <li className="list-inline-item">
                                    {item.status === 1 ? (
                                      <p className="text-secondary">Có sẵn</p>
                                    ) : (
                                      <p className="text-danger">
                                        Không có sẵn
                                      </p>
                                    )}
                                  </li>
                                </ul>
                                <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                                  <li className="list-inline-item text-danger">
                                    Số lượng còn lại:
                                  </li>
                                  <li className="list-inline-item">
                                    {item.quantity}
                                  </li>
                                </ul>

                                {/* <p className="mb-3 text-dark">{item.description} </p> */}

                                {/* <ul className="list-inline list-inline-dotted mb-0">
                                                                    <li className="list-inline-item">All items from <a href="#" data-abc="true">Mobile point</a></li>
                                                                    <li className="list-inline-item">Add to <a href="#" data-abc="true">wishlist</a></li>
                                                                </ul> */}
                              </div>

                              <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                                {/* <h3 className="mb-0 font-weight-semibold">{formatter.format(item.price)}</h3> */}

                                {/* <div>
                                                                    <i className="ti ti-star text-danger"></i>
                                                                    <i className="ti ti-star text-warning"></i>
                                                                    <i className="ti ti-star text-success"></i>
                                                                    <i className="ti ti-star text-dark"></i>
                                                                    <i className="fa fa-star"></i>

                                                                </div>

                                                                <div className="text-muted">1985 reviews</div> */}
                                <ModuleModalUpdateSportswear
                                  sportswear={item}
                                />
                                <ModuleStatisticalSportswear
                                  sportswear={item}
                                />
                                {/* <button type="button" onClick={() => handleViewAndEdit(item)} className="btn btn-warning mt-4 text-white" ><i className="icon-cart-add mr-2"></i>View and Edit</button> */}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* <div className="card card-body mt-3">
                                                    <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                                                        <div className="mr-2 mb-3 mb-lg-0">

                                                            <img src="https://i.imgur.com/Aj0L4Wa.jpg" width="150" height="150" alt="" />

                                                        </div>

                                                        <div className="media-body">
                                                            <h6 className="media-title font-weight-semibold">
                                                                <a href="#" data-abc="true">Apple iPhone XS Max (Gold, 64 GB)</a>
                                                            </h6>

                                                            <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                                                                <li className="list-inline-item"><a href="#" className="text-muted" data-abc="true">Phones</a></li>
                                                                <li className="list-inline-item"><a href="#" className="text-muted" data-abc="true">Mobiles</a></li>
                                                            </ul>

                                                            <p className="mb-3">256 GB ROM | 15.49 cm (6.1 inch) Display 12MP Rear Camera | 15MP Front Camera A12 Bionic Chip Processor | Gorilla Glass with high quality display </p>

                                                            <ul className="list-inline list-inline-dotted mb-0">
                                                                <li className="list-inline-item">All items from <a href="#" data-abc="true">Mobile junction</a></li>
                                                                <li className="list-inline-item">Add to <a href="#" data-abc="true">wishlist</a></li>
                                                            </ul>
                                                        </div>

                                                        <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                                                            <h3 className="mb-0 font-weight-semibold">$612.99</h3>

                                                            <div>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>

                                                            </div>

                                                            <div className="text-muted">2349 reviews</div>

                                                            <button type="button" className="btn btn-warning mt-4 text-white"><i className="icon-cart-add mr-2"></i> Add to cart</button>
                                                        </div>
                                                    </div>
                                                </div>





                                                <div className="card card-body mt-3">
                                                    <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                                                        <div className="mr-2 mb-3 mb-lg-0">

                                                            <img src="https://i.imgur.com/5Aqgz7o.jpg" width="150" height="150" alt="" />

                                                        </div>

                                                        <div className="media-body">
                                                            <h6 className="media-title font-weight-semibold">
                                                                <a href="#" data-abc="true">Apple iPhone XR (Red, 128 GB)</a>
                                                            </h6>

                                                            <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                                                                <li className="list-inline-item"><a href="#" className="text-muted" data-abc="true">Phones</a></li>
                                                                <li className="list-inline-item"><a href="#" className="text-muted" data-abc="true">Mobiles</a></li>
                                                            </ul>

                                                            <p className="mb-3">128 GB ROM | 15.49 cm (6.1 inch) Display 12MP Rear Camera | 7MP Front Camera A12 Bionic Chip Processor | Gorilla Glass with high quality display </p>

                                                            <ul className="list-inline list-inline-dotted mb-0">
                                                                <li className="list-inline-item">All items from <a href="#" data-abc="true">Mobile point</a></li>
                                                                <li className="list-inline-item">Add to <a href="#" data-abc="true">wishlist</a></li>
                                                            </ul>
                                                        </div>

                                                        <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                                                            <h3 className="mb-0 font-weight-semibold">$459.99</h3>

                                                            <div>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>

                                                            </div>

                                                            <div className="text-muted">1985 reviews</div>

                                                            <button type="button" className="btn btn-warning mt-4 text-white"><i className="icon-cart-add mr-2"></i> Add to cart</button>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="card card-body mt-3">
                                                    <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                                                        <div className="mr-2 mb-3 mb-lg-0">

                                                            <img src="https://i.imgur.com/Aj0L4Wa.jpg" width="150" height="150" alt="" />

                                                        </div>

                                                        <div className="media-body">
                                                            <h6 className="media-title font-weight-semibold">
                                                                <a href="#" data-abc="true">Apple iPhone XS Max (Gold, 64 GB)</a>
                                                            </h6>

                                                            <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                                                                <li className="list-inline-item"><a href="#" className="text-muted" data-abc="true">Phones</a></li>
                                                                <li className="list-inline-item"><a href="#" className="text-muted" data-abc="true">Mobiles</a></li>
                                                            </ul>

                                                            <p className="mb-3">256 GB ROM | 15.49 cm (6.1 inch) Display 12MP Rear Camera | 15MP Front Camera A12 Bionic Chip Processor | Gorilla Glass with high quality display </p>

                                                            <ul className="list-inline list-inline-dotted mb-0">
                                                                <li className="list-inline-item">All items from <a href="#" data-abc="true">Mobile junction</a></li>
                                                                <li className="list-inline-item">Add to <a href="#" data-abc="true">wishlist</a></li>
                                                            </ul>
                                                        </div>

                                                        <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                                                            <h3 className="mb-0 font-weight-semibold">$612.99</h3>

                                                            <div>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>

                                                            </div>

                                                            <div className="text-muted">2349 reviews</div>

                                                            <button type="button" className="btn btn-warning mt-4 text-white"><i className="icon-cart-add mr-2"></i> Add to cart</button>
                                                        </div>
                                                    </div>
                                                </div> */}
                      </div>
                    </div>
                  </div>
                  <Pagination />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModuleManagerSportswear;
