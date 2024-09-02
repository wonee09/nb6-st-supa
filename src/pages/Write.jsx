import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { supabase } from "../supabaseClient";

// post
// -> content, created_at, id, title, user_id

const Write = () => {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // TODO: posts state가 변경될 떄 마다 console.log
  // useEffect(() => {
  //   console.log("변경된 posts => ", posts);
  // }, [posts]);

  const handleSubmit = async (e) => {
    // TODO: 글 작성 로직 구현
    e.preventDefault();

    // supabase / posts / insert
    await supabase.from("posts").insert([
      {
        title,
        content,
        user_id: user.id,
      },
    ]);

    const { data } = await supabase.from("posts").select("*");
    console.log("data => ", data);

    // 완료가 된 이후
    // post리스트를 갱신하고 싶다...!!!
    setPosts(data);
    setTitle("");
    setContent("");
  };

  // id: 숫자
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("정말 삭제?");
    if (isConfirm) {
      await supabase.from("posts").delete().eq("id", id);

      // setPosts(prev => {
      //   return prev.filter(l => l.id !== id)
      // })

      const { data } = await supabase.from("posts").select("*");
      // 완료가 된 이후
      // post리스트를 갱신하고 싶다...!!!
      setPosts(data);

      alert("삭제 처리가 완료되었습니다.");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("posts").select("*");
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Write Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <div>
        <h3>포스팅 리스트</h3>
        {posts.length > 0 ? (
          // TODO: 만일 내가 쓴 글이면 수정버튼 보이도록
          posts.map((post) => (
            <div key={post.id}>
              {post.title}
              <span
                onClick={() => {
                  handleDelete(post.id);
                }}
              >
                {user.id === post.user_id ? " [삭제]" : ""}
              </span>
            </div>
          ))
        ) : (
          <>
            <p>등록된 글이 없습니다.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Write;
