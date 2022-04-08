import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Les mots de passe ne correspondent pas");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          S'inscrire
        </h1>
        <p>C'est parti pour créer un compte</p>
      </section>

      <section>
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Votre Nom"
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Votre Email"
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Votre mot de passe"
            onChange={onChange}
          />
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirmez le mot de passe"
            onChange={onChange}
          />
          <button type="submit">Envoyer</button>
        </form>
      </section>
    </>
  );
}

export default Register;
