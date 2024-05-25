import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

import bgImage from "../../images/topHeaderBg.jpg";

import "./Auth.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errormessage, setErrormessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigateTo = useNavigate();

  const loginHandLer = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post("https://movies-series-3.onrender.com/login", {
        email: email,
        password: password,
      });

      console.log(response.data);

      const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60);

      props.onLogin(response.data.token, true, expirationTime);

      navigateTo("/");
    } catch (err) {
      console.log(err);
      setErrormessage(err.response.data.errorMessage);
      setIsError(true);
    }
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const style = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <React.Fragment>
      <div className="auth-container" style={style}>
        {isError === true && (
          <div className="error">
            <p>{errormessage}</p>
          </div>
        )}
        <form onSubmit={loginHandLer}>
          <div className="input">
            <input
              placeholder="Enter Your Email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <input
              placeholder="Enter Your Password"
              type={type}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <span
              class="flex justify-around items-center"
              onClick={handleToggle}
            >
              <Icon class="absolute mr-10" icon={icon} size={16} />
            </span>
          </div>

          <button>Login</button>

          <Link to="/signup">Don't have an account?</Link>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
