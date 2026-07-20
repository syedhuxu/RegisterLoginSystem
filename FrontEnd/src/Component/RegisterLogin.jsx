import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const createAccount = async (name, email, password) => {
    try {
      // 1. Assign the resolved promise data directly to a variable
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name: name,
        email: email,
        password: password,
      });

      console.log(res.data);
      navigate("/home");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message,
      );
    }
  };

  const loginAccount = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password,
      });

      console.log(res.data);
      navigate("/home");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message,
      );
    }
  };

  const registerFormHandler = (e) => {
    e.preventDefault();
    createAccount(name, email, password);
    setName("");
    setEmail("");
    setPassword("");
  };

  const loginFormHandler = (e) => {
    e.preventDefault();
    loginAccount(loginEmail, loginPassword);
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div className="parent">
      <div className="register">
        <form
          onSubmit={(e) => {
            registerFormHandler(e);
          }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Your Name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
          <button type="submit">Create Accont</button>
        </form>
      </div>

      <div className="login">
        <form
          onSubmit={(e) => {
            loginFormHandler(e);
          }}
        >
          <input
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email"
          />
          <input
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterLogin;
