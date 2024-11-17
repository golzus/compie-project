
import { useState, useEffect } from "react";
import { BiTime, BiMessageDetail } from "react-icons/bi";
import './dialog.css';
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux"; // לא צריך useSelector כאן
import { useGetMessagesQuery, useSendMessageMutation}from './messagesSlice'

const Dialog = () => {
  const [message, setMessage] = useState("");
  const {id: imageId } = useParams(); // שליפת ה-imageId מה-URL
  const dispatch = useDispatch(); // יצירת הפונקציה dispatch

  // שליפת ההודעות עבור התמונה עם imageId
  const { data: dialogs, isLoading, isError } = useGetMessagesQuery(imageId);
  
  // פונקציה לשליחת הודעה חדשה
  const [sendMessage] = useSendMessageMutation();
useEffect(()=>{
  console.log(message,"mess");
},[message])
  useEffect(() => {
   if(dialogs)console.log("dialog",dialogs);
  }, [dialogs]);

  const clickFunction = async () => {
    if (message.trim()) {
      const newMessage = {
        imageId, // ה-imageId של התמונה שממנה שלוח הודעה
        message, // טקסט ההודעה
        sender: 'User', // המשלח (תוכל לשנות את זה בעת הצורך)
      };
      try {
        // שליחת ההודעה ל-API
        await sendMessage(newMessage).unwrap();
   setMessage("hello"); // איפוס השדה לאחר שליחה
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
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
if(!dialogs)return <h1>loading...</h1>
  return (
    <div className="dialog-container">
      <div className="img_container">
{    dialogs[0].imageId.title&&    <h1>{dialogs[0].imageId.title}</h1> 
}      {dialogs &&   <img src={`${dialogs[0].imageId.path}.JPG`} alt="dialog-image" />
}   


     <h1>the nicest picture</h1>
        <h5>by haaron</h5>
      </div>
      <div className="dialog_container">
        <div className="chat-overlay">
          {isLoading && <p>Loading messages...</p>}
          {isError && <p>Error loading messages</p>}
          {dialogs &&
            dialogs.map((dialog, index) => (
              <div className="chat-message" key={index}>
                <BiMessageDetail className="message-icon" />
                <h1>{dialog.message}</h1>
                <div className="time-container">
                  <BiTime className="time-icon" />
                  <p>{timeSince(dialog.createdAt)}</p>
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
        <NavLink to={'/pictures'}>Back to the gallery</NavLink>
      </div>
    </div>
  );
};

export default Dialog;
