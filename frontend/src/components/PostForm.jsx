import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/postSlice";

function PostForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ text }));
    setText("");
  };

  return (
    <section>
      <form className="postForm" onSubmit={onSubmit}>
        <div>
          <textarea
            type="textarea"
            name="textarea"
            value={text}
            placeholder="Aujourd'hui, j'ai acheté des vêtements d'occasion plutôt que de les acheter neufs."
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Publier</button>
        </div>
      </form>
    </section>
  );
}

export default PostForm;
