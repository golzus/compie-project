import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './picture.css';
import { useGetAllImagesQuery } from "./picturesApiSlice";

const Pictures = () => {
  const { data, isError, error, isSuccess, isLoading } = useGetAllImagesQuery()

  // const [pictures, setPictures] = useState([
  //   { path: 1, name: "sky", artist: "aharon", description: "A beautiful sunset", id: 5 },
  //   { path: 2, description: "Mountain view", id: 1 },
  //   { path: 3, name: "sky", artist: "aharon", description: "Ocean waves", id: 2 },
  //   { path: 4, name: "sky", artist: "aharon", description: "Autumn forest", id: 3 },
  //   { path: 5, name: "sky", artist: "aharon", description: "Peaceful lake", id: 4 },
  //   { path: 6, name: "sky", artist: "aharon", description: "Snowy landscape", id: 6 },
  // ]);
  const [pictures, setPictures] = useState([]);
  const [hoveredPicture, setHoveredPicture] = useState(null);
  const [filteredPictures, setFilteredPictures] = useState(pictures);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    if (data) {
      console.log(data,"data");
      setPictures(data.data)
      setFilteredPictures(data.data)}
      console.log(pictures,"pictures");
  }, [isSuccess,data,pictures])
  const handleMouseEnter = (id, event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setHoveredPicture({
      id,
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const handleFilterFictures = (e) => {
    setFilter(e.target.value);
    const arr = pictures.filter(
      (image) =>
        (image.artist && image.artist.indexOf(e.target.value) > -1) ||
        (image.name && image.name.indexOf(e.target.value) > -1)
    );
    setFilteredPictures(arr); // Update the filtered pictures list
  };

  const handleMouseLeave = () => {
    setHoveredPicture(null);
  };
if(isLoading)return <h1>Loading...</h1>
if(isError)return <h1>error</h1>
  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Artist Gallery</h1>
      <p className="gallery-subtitle">Discover beautiful and impressive art pieces</p>
      <input
        className="filter-input"
        placeholder="Search by name or artist..."
        value={filter}
        onChange={handleFilterFictures}
      />
      <div className="pictures-container">
        {filteredPictures.map((picture) => (
          <NavLink key={picture._id} to={`${picture._id}`} className="picture-item">
            <div className="picture-details">
              {picture.name && <p><strong>Name: </strong>{picture.name}</p>}
              {picture.artist && <p><strong>Artist: </strong>{picture.artist}</p>}
            </div>
            <img
  src={`${Number(picture.path)}.jpg`} // אם picture.path הוא מחרוזת שמייצגת מספר
  title={picture.description}
  alt={picture.description}
  className="picture-img"
  onMouseLeave={handleMouseLeave}
  onLoad={(e) => handleMouseEnter(picture.id, e)}
/>

            <div className="overlay">
              <div className="overlay-text">
                {picture.description}
                {hoveredPicture && (
                  <div className="image-details">
                    Resolution: {hoveredPicture.width}x{hoveredPicture.height} pixels
                  </div>
                )}
              </div>
            </div>
          </NavLink>
        ))}
        {!filteredPictures?.length && (
          <h3 className="no-images-message">No images match your search criteria</h3>
        )}
      </div>
    </div>
  );
};

export default Pictures;
