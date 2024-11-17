import { useState } from "react";
import { BiTime, BiMessageDetail } from "react-icons/bi";
import './dialog.css'
import { NavLink } from "react-router-dom";
const Dialog = () => {
  const [dialogs, setDialogs] = useState([
    { time: new Date(new Date() - 600000).toISOString(), talking: "Hello" },
    { time: new Date(new Date() - 1200000).toISOString(), talking: "How are you?" }
  ]);
  const [message, setMessage] = useState("");

  const clickFunction = () => {
    setDialogs([...dialogs, { time: new Date().toISOString(), talking: message }]);
    setMessage("");
  };

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    < div className="dialog-container">
    <div className="img_container">
      <img src={`/3.jpg`} alt="dialog-image" />
      <h1>the nicest picture</h1>
      <h5>by haaron</h5>
      </div>
      <div className="dialog_container">
      <div className="chat-overlay">
        {dialogs.map((dialog, index) => (
          <div className="chat-message" key={index}>
            <BiMessageDetail className="message-icon" />
            <h1>{dialog.talking}</h1>
            <div className="time-container">
              <BiTime className="time-icon" />
              <p>{timeSince(dialog.time)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          placeholder="Put in a new message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={clickFunction} disabled={!message}>
          Add
        </button>
      </div>
      <NavLink to={'/pictures'}>back to the gallery</NavLink>
      </div>
    </div>
  );
};

export default Dialog;
