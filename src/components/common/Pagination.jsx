// components/Pagination.jsx
import React, { useContext, useState, useEffect } from "react";
import { PaginationContext } from "../../context/PaginationContext";

function Pagination() {
    const { noPage, setNoPage, totalPage } = useContext(PaginationContext);
    const handlePreviousPage = () => {
        setNoPage(noPage - 1);
    };

    const handleNextPage = () => {
        setNoPage(noPage + 1);
    };
    return (
        <div className="row">
            <div className="col-md-12 text-center">
                <div className="pagination pagination-sm justify-content-center">
                    {noPage !== 1 && (
                        <button
                            type="button"
                            className="btn btn-danger m-1"
                            onClick={handlePreviousPage}
                            disabled={noPage === 1}
                        >
                            <span className="m-1"> &laquo;</span>
                        </button>
                    )}

                    <button
                        type="button"
                        className="btn btn-primary m-1"

                    >
                        <span className="m-1"> {noPage}</span>
                    </button>
                    {noPage !== totalPage && (
                        <button
                            type="button"
                            className="btn btn-warning m-1"
                            onClick={handleNextPage}
                            disabled={noPage === totalPage}
                        >
                            <span className="m-1"> &raquo;</span>
                        </button>
                    )}
                </div>
            </div>
            <div className="py-6 px-6 text-center">
                {/* <p className="mb-0 fs-4">Design and Developed by who <a href="#" target="_blank" className="pe-1 text-primary text-decoration-underline">CrushOnVuLanAnh</a></p> */}
            </div>

        </div>

    );
}

export default Pagination;