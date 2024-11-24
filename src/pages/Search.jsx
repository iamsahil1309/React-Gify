import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGifState } from "../context/GifContext";
import FilterGif from "../components/FilterGif";
import Gifs from "../components/Gifs";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { gif, filter } = useGifState();

  const { query } = useParams();

  const fetchSearchResults = async () => {
    const { data } = await gif.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });

    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterGif alignLeft={true} />
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => (
            <Gifs gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for {query}. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
};

export default Search;
