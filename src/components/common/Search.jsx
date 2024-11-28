import React, { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import { PaginationContext } from "../../context/PaginationContext";


function Search() {
    const { noPage, setNoPage, totalPage, setTotalPage } = useContext(PaginationContext);
    const { key, setKey, categoryName, setCategoryName } = useContext(SearchContext);
    const [searchQuery, setSearchQuery] = useState(''); // Thêm trạng thái lưu trữ từ khóa tìm kiếm

    const handleSearch = (e) => {
        setNoPage(1)
        setSearchQuery(e.target.value); // Cập nhật trạng thái searchQuery
    };

    // Sử dụng useEffect để trì hoãn việc cập nhật key
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setKey(searchQuery); // Cập nhật key sau 300ms
        }, 300); // Thời gian trì hoãn (debounce) là 300ms

        // Hủy timeout nếu người dùng nhập tiếp
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleCategoryChange = (e) => {
        setCategoryName(e.target.value);
    };

    return (
        <div className="app-header" style={{ position: 'static', zIndex: 0 }}>
            <div className="s003" style={{ minHeight: '0px' }}>
                <form id="search-form">
                    <div className="inner-form" style={{ borderRadius: '20px' }}>
                        <div className="input-field first-wrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="input-select">
                                <select className="form-select" value={categoryName} onChange={handleCategoryChange}>
                                    <option value="">Loại</option>
                                    <option value="Jeseys">Áo câu lạc bộ</option>
                                    <option value="Trainingwear">Áo Traning</option>
                                    <option value="Fashion">Thời trang khác</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-field second-wrap">
                            <input id="search" type="text" placeholder="Nhập bất kì thứ gì bạn muốn ... " value={searchQuery} onChange={handleSearch} />
                        </div>
                        {/* <div className="input-field third-wrap">
                            <button id="btn-search" className="btn-search" type="submit" style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                                <svg className="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>
                            </button>
                        </div> */}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Search;