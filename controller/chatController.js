// No need for node-fetch if you're using Node.js 18+
import fetch from "node-fetch"; // ✅ keep this if you use Node < 18 or ESM setup

export const handleChat = async (req, res) => {
  const { messages } = req.body;

  const fetchFromOpenAI = async (retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages,
        }),
      });

      console.log(`OpenAI API status: ${response.status}`);

      if (response.status !== 429) {
        return response;
      }

      console.warn(`Rate limited. Retry ${i + 1}/${retries} in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2; // exponential backoff
    }

    throw new Error("Too many requests - rate limit hit repeatedly.");
  };

  try {
    const response = await fetchFromOpenAI();
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(429).json({ error: error.message || "Server error" });
  }
};
