"use client";

import React from "react";

export default function Home() {
  const [audioUrlValue, setAudioUrlValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [genData, setGenData] = React.useState({} as any);

  const handleChange = (event: any) => {
    setAudioUrlValue(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/demucs", {
      method: "POST",
      body: JSON.stringify({
        audioUrl: audioUrlValue,
      }),
    });
    const data = await response.json();
    setLoading(false);
    setGenData(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={audioUrlValue}
          onChange={handleChange}
          placeholder="Enter audio URL"
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading your stems &rparr; this may take a while...</p>}
      BASS: {genData.bass || "No data yet"}
      <br />
      DRUMSs: {genData.drums || "No data yet"}
      <br />
      VOCALS: {genData.vocals || "No data yet"}
    </div>
  );
}
