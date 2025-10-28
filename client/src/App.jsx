import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && query.trim()) {
      console.log("Generating prompt:", query);

      try {
        const res = await fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query }),
        });

        const data = await res.json();
        setResponse(data.reply || "No response received.");
      } catch (err) {
        console.error(err);
        setResponse("Error connecting to backend.");
      }

      setQuery(""); // clear input after submission
    }
  };

  return (
    <div className="app-container">
      <div className="app-logo">
        <span className="emoji">💰</span>
        <span className="logo-text">Finn</span>
      </div>

      <div className="chat-area">
        <h1>Ask me a finance question</h1>

        <input
          type="text"
          placeholder="Type your question and hit Enter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {response && (
          <div className="chat-response">
            <strong>Finn:</strong> {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
