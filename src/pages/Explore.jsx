import categorySellImage from "../assets/images/categorySellImage.jpg";
import categoryRentImage from "../assets/images/categoryRentImage.jpg";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <main className="p-4">
      <h1 className="font-extrabold text-4xl">Explore</h1>

      <div className="my-4">
        <h2 className="font-bold mb-2">Category</h2>
        <div className="grid sm:grid-cols-2 px-2 gap-x-4 gap-y-8 ">
          <div>
            <Link to='category/sale' className="hover:text-green-500 transition-all group inline-block w-full" >
              <img src={categorySellImage} alt="sell image"  className="rounded-xl mb-3 hover:filter filter-none grayscale transition-all  sm:max-h-[20rem] max-h-[10rem]"/>
              <p className="group-hover:translate-y-1 transition-all">Places for Sell</p>
            </Link>
          </div>
          <div>
            <Link to='category/rent'  className="hover:text-green-500 transition-all group inline-block w-full">
              <img src={categoryRentImage} alt="rent image" className="rounded-xl mb-3 hover:filter filter-none grayscale transition-all   sm:max-h-[20rem] max-h-[10rem] " />
              <p className="group-hover:translate-y-1 transition-all">Places for Rent</p>
            </Link>
          </div>
          
          
        </div>
      </div>
    </main>
  );
}

export default Explore;
