import React, { useEffect } from "react";
import "./category.css";
import { Link, useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostBasedOnCategory } from "../../redux/apiCalls/postsApiCall";

const Category = () => {
    const dispatch = useDispatch();

    const { postsCate } = useSelector((state) => state.post);

    const { category } = useParams();

    useEffect(() => {
        dispatch(fetchPostBasedOnCategory(category));
        window.scrollTo(0, 0);
    }, [category,dispatch]);

    return (
        <section className="category">
            {postsCate.length === 0 ? (
                <>
                    <h1 className="category-not-found">
                        Posts with <span>{category}</span> not found
                    </h1>
                    <Link to={"/posts"} className="category-fot-found-link">
                        Go To Posts Page
                    </Link>
                </>
            ) : (
                <>
                    <h1 className="category-title">Posts Based On {category}</h1>
                    <PostList posts={postsCate} />
                </>
            )}
        </section>
    );
};

export default Category;
