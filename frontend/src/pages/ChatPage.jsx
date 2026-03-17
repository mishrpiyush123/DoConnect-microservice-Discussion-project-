import { useState, useEffect } from "react";
import axios from "axios";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const userObj =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("loggedInUser")) ||
    JSON.parse(localStorage.getItem("admin"));

  const rawName =
    userObj?.name ||
    userObj?.username ||
    userObj?.email ||
    localStorage.getItem("userName") ||
    localStorage.getItem("username") ||
    localStorage.getItem("email") ||
    localStorage.getItem("userEmail") ||
    "user";

  const getFirstName = (value) => {
    if (!value) return "User";
    let name = value;

    if (name.includes("@")) {
      name = name.split("@")[0];
    }

    if (name.includes(" ")) {
      name = name.split(" ")[0];
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const senderId = Number(userObj?.id || localStorage.getItem("userId") || 1);
  const senderName = getFirstName(rawName);

  // temporary fixed receiver for now
  const receiverId = 2;
  const receiverName = "Rahul";

  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8083/messages/chat/${senderId}/${receiverId}`
      );
      setMessages(res.data);
    } catch (error) {
      console.log("Load messages error:", error);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post("http://localhost:8083/messages/send", {
        senderId,
        receiverId,
        senderName,
        receiverName,
        message: text,
      });

      setText("");
      loadMessages();
    } catch (error) {
      console.log("Send message error:", error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [senderId, receiverId]);

  return (
    <div className="container">
      <h2>Chat</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{getFirstName(msg.senderName)}</b>: {msg.message}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
        style={{ marginRight: "10px" }}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatPage;