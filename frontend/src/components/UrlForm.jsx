import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to shorten");
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10 }}>
        <input
          type="url"
          placeholder="https://example.com/very/long/path"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ flex: 1, padding: 12, borderRadius: 12, border: "1px solid #ccc", outline: "none" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "12px 16px", borderRadius: 12, border: "none", cursor: "pointer" }}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      {shortUrl && (
        <p style={{ marginTop: 16 }}>
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}