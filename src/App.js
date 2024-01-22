import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import CreatePost from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/admin/AdminDashboard";
/* import Error404 from "./pages/error-page/Error404"; */
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import Error404 from "./pages/error-page/Error404";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        {/* ------------ Home -------------- */}
        <Route path="/" element={<Home />} />

        {/* ------------ Profile ------------ */}
        <Route path="/profile/:id" element={<Profile />} />

        {/* ------------ Posts -------------- */}
        <Route path="posts">
          <Route index element={<PostsPage />} />
          <Route path="create-post" element={user ? <CreatePost /> : <Navigate to={"/"} />} />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>

        {/* ------------ Dashboard -------------- */}
        <Route path="/admin-dashboard">
          <Route index element={user?.isAdmin ? <AdminDashboard /> : <Navigate to={"/"} />} />
          <Route path="users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to={"/"} />} />
          <Route path="posts-table" element={user?.isAdmin ? <PostsTable /> : <Navigate to={"/"} />} />
          <Route path="categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to={"/"} />} />
          <Route path="comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to={"/"} />} />
        </Route>

        {/* ------------ Auth -------------- */}
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ----------- Not Found ---------- */}
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
