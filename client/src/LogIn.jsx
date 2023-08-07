import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = ({ login, err }) => {
  const [valueInput, setValueInput] = useState({});
  console.log(err);
  const onHandChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValueInput({ ...valueInput, [name]: value });
  };
  const onHandSubmit = (e) => {
    e.preventDefault();
    login(valueInput);
  };
  return (
    <div className="containerLogin">
      <div className="left">

      </div>
      <div className="right">
        <form onSubmit={onHandSubmit}>
          <h1>Login</h1>
          {/* <strong>{err}</strong> */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={onHandChange}
              className="form-control"
              placeholder="Enter Price"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={onHandChange}
              className="form-control"
              placeholder="Enter Image"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-login">
            Submit
          </button>
          <div className="user-foot text-center">
            <a href="../forgot-password/index.html" className="clearfix">
              Forgot password?
            </a>
            <p className="clearfix">Or login with</p>
            <li className="loginFb">
              <span>
                <FaFacebookF />
              </span>
              <a href="#">Login Facebook</a>
            </li>
            <li className="loginGg">
              <span>
                <FcGoogle />
              </span>
              <a href="#">Login Google</a>
            </li>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
