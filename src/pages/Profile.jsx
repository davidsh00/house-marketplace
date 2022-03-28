import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.conf";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome, FaAngleRight } from "react-icons/fa";
function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isChange, setIsChange] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const onClick = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut();
      toast.info("you are LoggedOut");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
      }
    } catch (error) {
      toast.error("could not update profile details");
      console.log(error);
    }
  };
  return (
    <>
      <header className="profileHeader flex justify-between p-4 bg-white">
        <h1 className="text-3xl font-extrabold">My Profile</h1>
        <button type="button" className="btn" onClick={onClick}>
          Log Out
        </button>
      </header>
      <main className="p-4">
        <div className="profile-details">
          <div className="flex justify-between my-2 border-green-300  items-center border-b py-2">
            <h2 className="font-bold">Personal Details</h2>
            <button
              type="button"
              className="link"
              onClick={() => {
                isChange && onSubmit();
                setIsChange((prevState) => !prevState);
              }}
            >
              {isChange ? "done" : "change"}
            </button>
          </div>
          <form>
            <div className="flex flex-col gap-4 items-start ">
              <div className="flex gap-4">
                <label htmlFor="name">userName:</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  disabled={!isChange}
                  onChange={onChange}
                />
              </div>
              <div className="flex gap-4">
                <label htmlFor="email">userEmail:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  onChange={onChange}
                />
              </div>
            </div>
          </form>
          <div>
            <Link
              to="/create-listing"
              className="shadow-lg p-4 flex justify-between items-center  text-2xl font-extrabold bg-white my-4 rounded-lg hover:bg-red-500 transition-all hover:text-white"
            >
              <div className="link-icon">
                <FaHome />
              </div>
              <span>Sell or Rent your Home</span>
              <div className="link-icon">
                <FaAngleRight />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
