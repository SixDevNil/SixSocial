import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);
  const [valid, setValide] =useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      setValide(true)
    } catch (err) {
      setErr(err.response.data);
    }
  };

  useEffect(() => {
    if(valid){
      navigate("/");
    }
  })

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Six Blog</h1>
          <p>
            Tongasoa eto amin'ny tambazora sosialy Six Blog, ahafahana mifanerasera @ ireo namanao
          </p>
          <span>Efa manana kaonty ve ianao ? </span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Passsword"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
