import { useDispatch } from "react-redux";
import { deletePost } from "../features/posts/postSlice";
import profilPicture from "../images/avataaars.png";

function PostItem({ post }) {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="leftSide">
        <img src={profilPicture} alt="profil" className="profilPicture" />
      </div>
      <div className="rightSide">
        <div className="headPost">
          <p>Nom</p> ·<p>{new Date(post.createdAt).toLocaleString("fr-FR")}</p>
        </div>
        <p className="mainPost">{post.text}</p>
        <div className="footPost">
          <p>Likes</p>
          <p>Comments</p>
          <button onClick={() => dispatch(deletePost(post._id))}>X</button>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
