import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import Write from "../pages/Write";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const AuthRoute = () => {
  const { user } = useContext(UserContext);

  if (user) {
    alert("넌 이미 로그인 되어있으니, 여기 올 필요가 없어!! 메인으로 갈게!!");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

const PrivateRoute = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<AuthRoute />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/write" element={<Write />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
