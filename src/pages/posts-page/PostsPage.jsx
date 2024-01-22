import React, { useEffect, useState } from "react";
import "./post-page.css";
import PostList from "../../components/posts/PostList";
import SideBar from "../../components/sidebar/SideBar";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postsApiCall";

const POST_PER_PAGE = 3;

const PostsPage = () => {
  const dispatch = useDispatch();

  const { postsCount, posts } = useSelector((state) => state.post);

  const [currentPage, setCurrentPage] = useState(1);

  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, [dispatch]);

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <SideBar />
      </section>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
    </>
  );
};

export default PostsPage;
