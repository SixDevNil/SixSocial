import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [infoUser, setInfoUser] = useState([]);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setInfoUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", infoUser);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form action="">
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {error && error}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
        <div className="right">
          <h1>LAMA SOCIAL.</h1>
          <p>
            Tongasoa eto amin'ny tambazora sosialy Six Blog, ahafahana
            mifanerasera @ ireo namanao
          </p>
          <span>Commencez ici . . . </span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
