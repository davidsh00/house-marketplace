import "./../styles/sign.css";
import { useState } from "react";
import { FaAt, FaLock, FaEye, FaLowVision, FaAngleRight } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import {getAuth,signInWithEmailAndPassword}from 'firebase/auth'
function SignIn() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit=async(e)=>{
    e.preventDefault()
    try {
      const auth=getAuth()
      const userCredential=await signInWithEmailAndPassword(auth,email,password)
      if(userCredential.user){
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="sign-container">
      <h1 className="font-extrabold">LogIn Form</h1>
      <form onSubmit={onSubmit}>
        <h2 className="font-extrabold">Welcome Back</h2>
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
            autoComplete="current-password"
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

        <Link to="/forgot-password" className="link w-full text-right">
          Forgot Password
        </Link>

        <button type="submit" className="form-submit">
          <h2>Sign In</h2>
          <div className="submit-icon">
            <FaAngleRight />
          </div>
        </button>
      </form>

      <Link to="/sign-up" className="w-full inline-block link text-center">
        Sign Up Instead
      </Link>
    </div>
  );
}

export default SignIn;
