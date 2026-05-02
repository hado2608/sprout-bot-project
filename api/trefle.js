export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing q parameter" });

  try {
    const response = await fetch(
      `https://trefle.io/api/v1/plants/search?q=${encodeURIComponent(q)}&token=${process.env.TREFLE_TOKEN}`
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
