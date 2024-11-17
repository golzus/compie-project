import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './picture.css';
import { useGetAllImagesQuery } from "./picturesApiSlice";

const Pictures = () => {
  const { data, isError, error, isSuccess, isLoading } = useGetAllImagesQuery();

  const [pictures, setPictures] = useState([]);
  const [hoveredPicture, setHoveredPicture] = useState(null);
  const [filteredPictures, setFilteredPictures] = useState(pictures);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (data) {
      setPictures(data.data);
      setFilteredPictures(data.data);
    }
  }, [isSuccess, data]);

  const handleMouseEnter = (id, event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setHoveredPicture({
      id,
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const handleFilterFictures = (e) => {
    const filterValue = e.target.value.toLowerCase();  // משנה את הערך של החיפוש לאותיות קטנות
    setFilter(e.target.value);  // שומר את ערך החיפוש
  
    const arr = pictures.filter(
      (image) =>
        (image.artist && image.artist.toLowerCase().indexOf(filterValue) > -1) ||  // הופך גם את ה-artist לאותיות קטנות
        (image.title && image.title.toLowerCase().indexOf(filterValue) > -1) // הופך גם את ה-title לאותיות קטנות
    );
    
    setFilteredPictures(arr); // Update the filtered pictures list
  };
  

  const handleMouseLeave = () => {
    setHoveredPicture(null);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>error</h1>;

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
        {filteredPictures.map((picture) => ( <div className="container-link">
           <div className="picture-title">
              {/* הצגת שם התמונה */}
             
    {picture.title && <h3>{picture.title}</h3>} {/* הצגת שם התמונה */}

            </div>
          <NavLink key={picture._id} to={`${picture._id}`} className="picture-item">
         
            <div className="picture-details">
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
          </NavLink></div> 
        ))}
        {!filteredPictures?.length && (
          <h3 className="no-images-message">No images match your search criteria</h3>
        )}
      </div>
    </div>
  );
};

export default Pictures;
