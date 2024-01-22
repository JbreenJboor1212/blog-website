import React from "react";
import "./pagination.css";

const Pagination = ({ currentPage, setCurrentPage, pages }) => {
    const generatedPages = [];
    for (let i = 1; i <= pages; i++) {
        generatedPages.push(i);
    }
    return (
        <div className="pagination">
            <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="page previous"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {generatedPages?.map((page) => (
                <div
                    key={page}
                    className={currentPage === page ? "page activeT" : "page"}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </div>
            ))}
            <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="page next"
                disabled={currentPage === pages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
