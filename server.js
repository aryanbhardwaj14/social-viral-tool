import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/ai-caption", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You generate short, human-like Instagram captions. No hashtags. Natural tone."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 120,
        temperature: 0.9
      })
    });

    const data = await response.json();

    const caption = data.choices[0].message.content;

    res.json({
      captions: [
        caption,
        caption.replace(".", " 🔥"),
        caption.replace(".", " ✨")
      ]
    });

  } catch (err) {
    res.status(500).json({ error: "AI generation failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

Remove server.js
