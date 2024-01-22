import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getAllCategory } from "../../redux/apiCalls/categoryApiCall";

const CategoriesTable = () => {

    const dispatch = useDispatch()

    const { categories } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])

    //^ Delete Users Handler
    const DeleteCategoryHandler = (categoryId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Category!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((isOk) => {
            if (isOk) {
                dispatch(deleteCategory(categoryId))
            }
        });
    }

    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Categories</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Category Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <b>{category?.title}</b>
                                </td>
                                <td>
                                    <div className="table-button-group">
                                        <button onClick={()=>DeleteCategoryHandler(category?._id)}>
                                            Delete Category
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default CategoriesTable;
