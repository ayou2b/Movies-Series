import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

import bgImage from "../../images/topHeaderBg.jpg";

import "./Auth.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errormessage, setErrormessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigateTo = useNavigate();

  const signUpHandler = async (e) => {
    try {
      e.preventDefault();

      await axios.post("http://localhost:9000/signup", {
        name: name,
        email: email,
        password: password,
      });

      navigateTo("/login");
    } catch (err) {
      console.log(err.response.data.errorMessage);
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

        <form onSubmit={signUpHandler}>
          <div className="input">
            <input
              placeholder="Enter Your Full Name"
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <input
              placeholder="Enter Your Email"
              type="text"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <input
              placeholder="Enter Your Password"
              name="password"
              type={type}
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

          <button>Sign Up</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default SignUp;
