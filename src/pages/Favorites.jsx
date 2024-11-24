import React, { useEffect, useState } from 'react'
import { useGifState } from '../context/GifContext'
import Gifs from '../components/Gifs'

function Favorites() {
  const {gif, fav} = useGifState()
  const [favGifs, setFavGifs] = useState([])

  const fetchFavGIFs = async () => {
    const {data : gifs} = await gif.gifs(fav)
    setFavGifs(gifs)
  }

  useEffect(() => {
    fetchFavGIFs()
  },[])

  return (
    <div className='mt-2'>
      <span className="faded-text">
        My Favorites
      </span>
      <div className="colums-2 md:columns-3 lg:columns-4 xl:colums-5 gap-2 mt-2">
        {favGifs.map((gif) => (
          <Gifs gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  )
}

export default Favorites
