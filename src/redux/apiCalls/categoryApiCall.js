import request from "../../utils/request";
import { toast } from "react-toastify"
import { categoryActions } from "../slices/categorySlice";

//^ Fetch All Categories
export function getAllCategory() {
    return async (dispatch) => {
        try {
            const { data } = await request.get("/api/categories");
            dispatch(categoryActions.setCategories(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}


//^ Create A New Category
export function createNewCategory(newCategory) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/categories", newCategory, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(categoryActions.createCategory(data));
            toast.success("Category Created Successfully!!")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

//^ Delete Category
export function deleteCategory(categoryId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/categories/${categoryId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(categoryActions.clearCategory(data.categoryId));
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
