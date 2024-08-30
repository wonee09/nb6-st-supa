import { useContext, useState } from "react";
import { supabase } from "../supabaseClient";
import { UserContext } from "../context/UserContext";

const SignIn = () => {
  const { user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("user => ", user);

  const handleSignIn = async (e) => {
    e.preventDefault();

    // TODO: 로그인 처리하기
    console.log("email => ", email);
    console.log("password => ", password);

    try {
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } catch (error) {
      console.log("error => ", error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
