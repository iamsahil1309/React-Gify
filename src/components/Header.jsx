import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavIcon from "./NavIcon";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useGifState } from "../context/GifContext";
import Favorites from "../pages/Favorites";

function Header() {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gif, gifs, setGifs, filter, setFilter, fav } = useGifState();

  const fetchGifCategories = async () => {
    const {data} = await gif.categories()
    setCategories(data)
  }

  useEffect(() => {
    fetchGifCategories()
  },[])

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex">
          <img src="/logo.png" className="w-16" alt="logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            Gify
          </h1>
        </Link>
        {/* render categories */}

        <div className="font-bold text-md flex gap-2 items-center">
          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link
                key={category.name}
                to={`/${category.name_encoded}`}
                className="px-4 py-1 relative after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer hidden lg:block"
              >
                {category.name}
              </Link>
            );
          })}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={25}
              className={` py-0.5 hover:bg-gray-700 hover:rounded-full cursor-pointer hidden lg:block`}
            />
          </button>
        </div>
        {fav.length > 0 && (
          <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
            <Link to="/favorites">Favorite GIFs</Link>
          </div>
        )}
        <button className="block lg:hidden">
          <NavIcon />
        </button>

        {showCategories && (
          <div className="absolute right-0 my-4 top-14 px-10 pt-6 pb-9 w-full z-20 bg-gray-700 rounded-lg">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">
                {categories.map((category) => {
                    return (
                      <Link
                        key={category.name}
                        to={`/${category.name_encoded}`}
                        className="font-bold relative after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer "
                      >
                        {category.name}
                      </Link>
                    );
                })}
             
            </div>
          </div>
        )}
      </div>
      {/* search */}
    </nav>
  );
}

export default Header;
