export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5",
        input: req.body.message
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.output_text
    });

  } catch (error) {
    res.status(500).json({
      error: "Server error"
    });
  }
        }
