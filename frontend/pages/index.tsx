import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Home() {
  const [audioUrl, setAudioUrl] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(`${API_BASE}/api/transcriptions`, { audioUrl });
      setMessage(`✅ Transcription created with ID: ${res.data.id}`);
      setAudioUrl(""); // clear input
      fetchList();
    } catch (err: any) {
      setError("❌ Error creating transcription");
    } finally {
      setLoading(false);
    }
  };

  const fetchList = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_BASE}/api/transcriptions`);
      setList(res.data || []);
    } catch (err: any) {
      setError("❌ Failed to fetch transcriptions");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-8 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">🎙️ Transcription Service</h1>

      <input
        type="text"
        placeholder="Enter audio URL"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !audioUrl}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Submit"}
      </button>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <h2 className="text-xl font-semibold mt-6">📜 Transcriptions</h2>

      {loading && <p>Loading...</p>}

      {!loading && list.length === 0 && (
        <p className="text-gray-500">No transcriptions found.</p>
      )}

      <ul className="space-y-2">
        {list.map((item) => (
          <li key={item._id} className="border p-2 rounded">
            <p><strong>URL:</strong> {item.audioUrl}</p>
            <p><strong>Text:</strong> {item.transcription}</p>
            <p><em>{new Date(item.createdAt).toLocaleString()}</em></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
