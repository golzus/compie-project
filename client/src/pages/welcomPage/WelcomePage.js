import { NavLink } from "react-router-dom";
import "./welcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to the Art Gallery</h1>
      <p className="welcome-subtitle">Explore a world of colors, imagination, and creativity</p>
      <NavLink to="pictures" className="enter-gallery-button">
        Enter the Gallery
      </NavLink>
    </div>
  );
};

export default WelcomePage;
