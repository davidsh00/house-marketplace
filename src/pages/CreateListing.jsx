import { useRef, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
const CreateListing = () => {
  const [geoLoacationEnabled, setGeoLoacationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "tent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    address: "",
    offer: false,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const navigate = useNavigate();
  const auth = getAuth();
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted) {
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setFormData({...formData,userRef:user.uid})
            }else{
                navigate('/sign-in')
            }
        })
    }
    return () => {
      isMounted.current = false;
    };
  },isMounted);

  if (loading) {
    return <Spinner />;
  }
  return <div>create</div>;
};
export default CreateListing;
