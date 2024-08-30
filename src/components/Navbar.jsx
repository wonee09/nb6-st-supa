import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleSignOut = async () => {
    await supabase.auth.signOut();

    alert("로그아웃 처리가 완료됐습니다. 메인페이지로 이동할께요.");
    navigate("/");
  };

  return (
    <nav>
      <ul>
        {user ? <>{user.email}님 안녕하세요!</> : <>로그인이 필요합니다.</>}
        <li>
          <Link to="/">Main</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/mypage">My Page</Link>
            </li>
            <li>
              <Link to="/write">Write</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
      {user ? <button onClick={handleSignOut}>로그아웃</button> : ""}
    </nav>
  );
};

export default Navbar;
