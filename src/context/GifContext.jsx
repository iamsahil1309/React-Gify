import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {

    const [gifs, setGifs] = useState([])
    const [filter, setFilter] = useState("gifs")
    const [fav, setFav] = useState([])

  const gif = new GiphyFetch(import.meta.env.VITE_GIF_KEY);
  return <GifContext.Provider value={{ gif, gifs, setGifs, filter, setFilter, fav }}>{children}</GifContext.Provider>;
};

export const useGifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
