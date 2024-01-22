import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        /*   postComment: null */
    },
    reducers: {
        setComments(state, action) {
            state.comments = action.payload
        },
        deleteComments(state, action) {
            state.comments = state.comments.filter(c => c._id !== action.payload)
        }


        /*  setCategories(state, action) {
             state.categories = action.payload
         },
         postComment(state, action) {
             state.postComment = action.payload
         } */
    },
});

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export { commentActions, commentReducer };
