import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {

    const [gifs, setGifs] = useState([])
    const [filter, setFilter] = useState("gifs")
    const [fav, setFav] = useState([])

    const addToFavorites = (id) => {
      if(fav.includes(id)) {
        const updatedFav = fav.filter((itemId) => itemId !== id)
        localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFav))
        setFav(updatedFav)
      } else {
        const updatedFav = [...fav]
        updatedFav.push(id)
         localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFav));
         setFav(updatedFav);
      }
    }

    useEffect(() => {
      const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || []
      setFav(favorites)
    },[])

  const gif = new GiphyFetch(import.meta.env.VITE_GIF_KEY);
  return <GifContext.Provider value={{ gif, gifs, setGifs, filter, setFilter, fav, addToFavorites }}>{children}</GifContext.Provider>;
};

export const useGifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
