import "./../styles/sign.css";
import { useState } from "react";
import {
  FaAt,
  FaLock,
  FaEye,
  FaLowVision,
  FaAngleRight,
  FaSignature,
  FaRetweet,
} from "react-icons/fa";
import { Link } from "react-router-dom";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const { name, email, password, rePassword } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="sign-container">
      <h1 className="font-extrabold">SignUp Form</h1>
      <form>
        <h2 className="font-extrabold">Welcome</h2>
        <div className="input-control">
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={handleChange}
            required
          ></input>
          <div className="input-icon">
            <FaSignature />
          </div>
        </div>
        <div className="input-control">
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleChange}
            required
          ></input>
          <div className="input-icon">
            <FaAt />
          </div>
        </div>
        <div className="input-control">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            value={password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          ></input>
          <div className="input-icon">
            <FaLock />
          </div>
          <div
            className="input-icon left-[initial!important] right-0 cursor-pointer"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? <FaLowVision /> : <FaEye />}
          </div>
        </div>
        <div className={`input-control ${showPassword ? "hidden" : ""}`}>
          <input
            type="password"
            placeholder="Re Password"
            id="rePassword"
            value={rePassword}
            onChange={handleChange}
            required={!showPassword}
          ></input>
          <div className="input-icon">
            <FaRetweet />
          </div>
        </div>

        <button type="submit" className="form-submit">
          <h2>Sign Up</h2>
          <div className="submit-icon">
            <FaAngleRight />
          </div>
        </button>
      </form>

      <Link to="/sign-in" className="w-full inline-block link text-center">
        Sign In Instead
      </Link>
    </div>
  );
}

export default SignUp;
