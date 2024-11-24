import React, { useEffect } from "react";
import { useGifState } from "../context/GifContext";
import Gifs from "../components/Gifs";
import FilterGif from "../components/FilterGif";

function Home() {
  const { gif, gifs, setGifs, filter } = useGifState();

  const fetchTrendingGIFs = async () => {
    const { data } = await gif.trending({
      limit: 20,
      type: filter,
      rating: "g",
    });
    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGIFs();
  }, [filter]);

  return (
    <div>
      <h1 className="uppercase text-[9vh] text-center font-extrabold">
        Your Ultimate Gif Library Awaits!
      </h1>
      <img src="/banner.gif" alt="banner" className="mt-2 rounded w-full" />

      {/* filterGif */}
      <FilterGif showTrending/>
      <div className=" mt-4 colums-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => (
          <Gifs gif={gif} key={gif.title} />
        ))}
      </div>
    </div>
  );
}

export default Home;
