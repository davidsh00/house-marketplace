import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.conf";
import {
  getDocs,
  where,
  orderBy,
  startAfter,
  query,
  limit,
  collection,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useErrorForToast } from "../hooks/useErrorForToast";
import Spinner from "../components/Spinner";
function Category() {
  const toastError = useErrorForToast;
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", params.type),
          limit(10)
        );
        const querySnap = await getDocs(q);

        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error(toastError(error));
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  return (
    <>
      <h2 className="font-extrabold text-4xl">
        places for {params.type === "rent" ? "rent" : "sale"}
      </h2>
      {loading ? (
        <Spinner />
      ) : listings && listings.length >= 1 ? (
        <main>
          <ul>
            {listings.map((listing) => (
              <li key={listing.id}>{listing.data.type}</li>
            ))}
          </ul>
        </main>
      ) : (
        <p>no listings for {params.type}</p>
      )}
    </>
  );
}

export default Category;
