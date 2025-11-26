import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

const run = async () => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
    const r = await fetch(url);
    const data = await r.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("ListModels error:", e);
  }
};

run();
