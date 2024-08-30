import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: 유저 정보 가져와서 전역상태로 사용하기
    const getSession = async () => {
      const response = await supabase.auth.getSession();
      setUser(response.data.session.user);
    };

    getSession();

    // SIGNED_IN: 사용자가 로그인했을 때
    // SIGNED_OUT: 사용자가 로그아웃했을 때
    // PASSWORD_RECOVERY: 비밀번호 복구가 시작되었을 때
    // USER_UPDATED: 사용자의 정보가 업데이트되었을 때
    // TOKEN_REFRESHED: 세션 토큰이 갱신되었을 때

    // 유저의 권한이 바뀌었을 때
    // 안내가 나한테 올 텐데,
    // 그리고 내가 들을텐데
    // 듣고나서 뭘 어떻게 할건데?!??!!
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("session?.user => ", session?.user);
        setUser(session?.user ? session?.user : null);
      }
    );

    // 라디오틀기();
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
