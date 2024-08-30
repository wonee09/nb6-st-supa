import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import Write from "../pages/Write";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Navbar from "../components/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
