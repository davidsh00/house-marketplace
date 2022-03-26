import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useErrorForToast } from "../hooks/useErrorForToast";
function ForgotPassword() {
  const toastError = useErrorForToast;
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error(`could not send reset email
      ${toastError(error)}`);
      console.log(error);
    }
  };
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="sign-container">
      <form className="" onSubmit={onSubmit}>
        <div className="input-control">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
        </div>
        <button className="form-submit" type="submit">
          <h2>Send Reset Link</h2>
          <div className="submit-icon">
            <FaAngleRight />
          </div>
        </button>
        <Link to="/sign-in" className="w-full inline-block link text-right">
          Sign In
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;
