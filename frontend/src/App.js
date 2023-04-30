import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPost from "./components/NewPost";
import Post from "./components/Post.jsx";
import UpdatePost from "./components/UpdatePost";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="mt-28">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-post" element={<PrivateRoute />}>
            <Route path="/new-post" element={<NewPost />} />
          </Route>

          <Route path="/post/:postId" element={<Post />} />
          <Route path="/update-post/:postId" element={<PrivateRoute />}>
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
