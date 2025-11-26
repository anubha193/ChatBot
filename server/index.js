import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "models/gemini-2.5-flash";  // 👈 use EXACT name from listModels

console.log("Gemini key starts with:", API_KEY?.slice(0, 6) + "*****");
console.log("Using model:", MODEL);

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const userText = messages?.[messages.length - 1]?.content;

    if (!userText) {
      return res.status(400).json({ error: "No message provided" });
    }

    const url =
      `https://generativelanguage.googleapis.com/v1/${MODEL}:generateContent?key=` +
      API_KEY;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: userText }],
        },
      ],
    };

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await r.json();

    if (!r.ok) {
      console.error("Gemini API error:", data);
      return res
        .status(r.status)
        .json({ error: data.error?.message || "Gemini API error" });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "(no reply)";
    return res.json({ assistant: reply });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Gemini server running on port ${port}`);
});
