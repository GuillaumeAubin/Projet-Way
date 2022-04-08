import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import logoPicture from "../images/planete-terre.png";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header>
      <div>
        <Link to="/">
          <img src={logoPicture} alt="logo" id="logoHeader" />
          <p>WAY</p>
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button onClick={onLogout}>
              <FaSignOutAlt /> Se déconnecter
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Se connecter
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> S'inscrire
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
