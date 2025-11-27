import React, { useState } from "react";
import "../App.css";
import chatbotImg from "../assets/chatbot.avif";

function Card() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." }
  ]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://chatbot-6tun.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await res.json();
      const assistantContent = data.assistant ?? "No response";
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: assistantContent }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Error: " + err.message }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="card">
      <header>
        <div id="content">
          <div id="logo">
            <img src={chatbotImg} alt="Chatbot" />
          </div>
          <div id="app-name">
            <h3>ChatBot App</h3>
          </div>
        </div>
      </header>

      {/* scrollable chat area */}
      <div id="output-box">
        {messages
          .filter(m => m.role !== "system")
          .map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "user-msg" : "assistant-msg"}
            >
              {m.content}
            </div>
          ))}

        {loading && (
          <div className="assistant-msg typing">
            <span>Assistant is thinking</span>
            <span className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        )}
      </div>

      {/* input area */}
      <div className="input">
        <div className="input-row">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Type a message..."
          />
          <button onClick={send}>
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
