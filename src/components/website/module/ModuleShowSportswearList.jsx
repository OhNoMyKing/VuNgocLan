// components/UserManagementPage.js
import React, { useState, useEffect, createContext, useContext } from 'react';


import { useNavigate } from "react-router-dom";
import { SearchContext } from '../../../context/SearchContext';
import { PaginationContext } from '../../../context/PaginationContext';
import SportswearService from '../../service/SportswearService';
import Pagination from '../../common/Pagination';


function ModuleShowSportswearList() {

    const [sportswears, setSportswears] = useState([]);
    const { key, categoryName } = useContext(SearchContext);
    const { noPage, setNoPage, totalPage, setTotalPage } = useContext(PaginationContext);
    const navigate = useNavigate();;
    useEffect(() => {
        // Fetch users data when the component mounts
        fetchSportswear();
    }, [key, categoryName, totalPage, noPage]);
    const fetchSportswear = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await SportswearService.getAllSportswearByCustomer(token, key, noPage, categoryName);
            //   console.log(response);
            setTotalPage(response.totalPage)
            if (totalPage > 0) {
                setNoPage(response.currentPage)
                setSportswears(response.sportswearResponseList);
            }
            // Assuming the list of users is under the key 'ourUsersList'
        } catch (error) {
            console.log('Error fetching users:');
        }
    };
    const handleViewDetails = (sportswearId) => {
        navigate(`/home/detail/${sportswearId}`); // Navigate to the details page
    };
    return (




        <div className="">

            {totalPage > 0 && <div className="container-fluid" style={{ paddingTop: '0px' }}>



                <div className="row" id="sportswearDisplays">
                    {sportswears.map(item => (
                        <div className="col-sm-6 col-xl-3" key={item.id}>
                            <div className="card overflow-hidden rounded-2">
                                <div className="position-relative">

                                    <img src={item.main_image} className="card-img-top rounded-0" alt="..." onClick={() => handleViewDetails(item.id)} />
                                    {/* <a href="#" className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></a>                      */}
                                </div>
                                <div className="card-body pt-3 p-4" style={{ width: "240px", height: "150px" }}>
                                    <h6 className="fw-semibold fs-4">{item.name}</h6>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className="fw-semibold fs-4 mb-0">{item.price_vnd} <span className="ms-2 fw-normal text-muted fs-3"></span></h6>
                                        {/* <del>$65</del> */}
                                        <ul className="list-unstyled d-flex align-items-center mb-0">
                                            <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                                            <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                                            <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                                            <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                                            <li><a className="" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>

                    ))}


                </div>




                <Pagination />
            </div>}
        </div>

    )
}
export default ModuleShowSportswearList;
