import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { UserContext } from "../context/UserContext";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("posts").select("*");
      setPosts(data);
    };

    fetchPosts();
  }, []);

  console.log("posts => ", posts);

  return (
    <div>
      <h1>Main Page</h1>
      <ul>
        {posts.length > 0 ? (
          // TODO: 만일 내가 쓴 글이면 수정버튼 보이도록
          posts.map((post) => (
            <li key={post.id}>
              {post.title}
              {user.id === post.user_id ? " [수정]" : ""}
            </li>
          ))
        ) : (
          <>
            <p>등록된 글이 없습니다.</p>
          </>
        )}
      </ul>
    </div>
  );
};

export default Main;
