import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGifState } from "../context/GifContext";
import Gifs from "../components/Gifs";
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import FollowOn from "../components/FollowOn";
import { FaPaperPlane } from "react-icons/fa6";

const contentType = ["gifs", "stickers", "texts"];

function SingleGif() {
  const { type, slug } = useParams();
  const [giif, setGiif] = useState({});
  const [relatedGif, setRelatedGif] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gif,fav, addToFavorites } = useGifState();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gif.gif(gifId[gifId.length - 1]);
    const { data: related } = await gif.related(gifId[gifId.length - 1], {
      limit: 10,
    });

    setGiif(data);
    setRelatedGif(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, []);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {giif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={giif?.user?.avatar_url}
                alt={giif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{giif?.user?.display_name}</div>
                <div className="faded-text">@{giif?.user?.username}</div>
              </div>
            </div>
            {giif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? giif?.user?.description
                  : giif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {!readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider" />

        {giif.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={giif.source} target="_black" className="truncate">
                {giif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{giif.title}</div>
            <Gifs gif={giif} hover={false} />

            {/* mob ui */}
            <div className="flex sm:hidden gap-1">
              <img
                src={giif?.user?.avatar_url}
                alt={giif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{giif?.user?.display_name}</div>
                <div className="faded-text">@{giif?.user?.username}</div>
              </div>
              <button className="ml-auto">
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button className="flex gap-5 items-center font-bold text-lg" onClick={() => addToFavorites(giif.id)}>
              <HiMiniHeart size={30} className={`${fav.includes(giif.id) ? "text-red-500" : ""}`} />
              Favorite
            </button>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGif.slice(1).map((gif) => (
              <Gifs gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleGif;
