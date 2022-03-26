import "./../styles/sign.css";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.conf";
import {
  FaAt,
  FaLock,
  FaEye,
  FaLowVision,
  FaAngleRight,
  FaSignature,
  FaRetweet,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useErrorForToast } from "../hooks/useErrorForToast";
function SignUp() {
  const toastError=useErrorForToast
  const navigate = useNavigate();
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!showPassword && password != rePassword) {
      toast.error("passwords dont match!");
      return null;
    }
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      delete formDataCopy.rePassword;
      formDataCopy.timeStamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      toast.error(toastError(error))
      console.log(error);
    }
  };
  return (
    <div className="sign-container">
      <h1 className="font-extrabold">SignUp Form</h1>
      <form onSubmit={onSubmit}>
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
