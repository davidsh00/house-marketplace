import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);
  return user ? (
    <h1 className="font-extrabold text-4xl">{user.displayName}</h1>
  ) : (
    <div>Profile</div>
  );
}

export default Profile;
