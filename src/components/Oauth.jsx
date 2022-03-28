import { useNavigate, useLocation } from "react-router-dom";
import {useErrorForToast} from '../hooks/useErrorForToast'
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../firebase.conf";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

function Oauth() {
  const toastError=useErrorForToast
  const location = useLocation();
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error(toastError(error))
    }
  };
  return (
    <div className="font-bold w-full text-center">
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 group"
        onClick={onClick}
      >
        <div className="icon w-10 h-10 rounded-full flex items-center justify-center bg-red-500 text-white group-hover:text-red-500 group-hover:bg-white transition-all">
          <FaGoogle />
        </div>
        Sign{location.pathname == "/sign-up" ? "Up" : "In"}
      </button>
    </div>
  );
}

export default Oauth;
