import React, { useState, useEffect } from "react";
import axios from "axios";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const userObj =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("loggedInUser")) ||
    JSON.parse(localStorage.getItem("admin")) ||
    null;

  const rawName =
    userObj?.name ||
    userObj?.username ||
    userObj?.email ||
    localStorage.getItem("userName") ||
    localStorage.getItem("username") ||
    localStorage.getItem("email") ||
    localStorage.getItem("userEmail") ||
    "User";

  const getFirstName = (value) => {
    if (!value) return "User";
    let name = value;

    if (name.includes("@")) {
      name = name.split("@")[0];
    }

    if (name.includes(" ")) {
      name = name.split(" ")[0];
    }

    return name;
  };

  const senderName = getFirstName(rawName);

  const senderId = 1;
  const receiverId = 2;
  const receiverName = "Rahul";

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8083/messages/chat/${senderId}/${receiverId}`
      );
      setMessages(res.data || []);
    } catch (error) {
      console.log("Load messages error:", error);
      setMessages([]);
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

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Discussion Chat</h2>

      <div style={styles.chatBox}>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={styles.message}>
              <b>{getFirstName(msg.senderName)}:</b> {msg.message}
            </div>
          ))
        )}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message"
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
  chatBox: {
    border: "1px solid #ccc",
    padding: "12px",
    height: "300px",
    overflowY: "auto",
    marginBottom: "12px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  message: {
    marginBottom: "10px",
    padding: "8px",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "220px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#16212b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ChatPage;