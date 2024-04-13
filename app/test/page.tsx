/*
{
  bass: 'https://replicate.delivery/pbxt/f09dTehfTTV9uJviVHapWUKky5Hf0EFVOgjrhfzpZPBicIPVC/bass.mp3',
  drums: 'https://replicate.delivery/pbxt/Xqt3j7IlM0Z4O9Z273YfOW7WSDZ9A6oT3Db3qCCjfY7lD5pSA/drums.mp3',
  other: 'https://replicate.delivery/pbxt/MYXzWwLSbrZvORueS3FPj8NyisPIlQNe9T3JHHfZ7l5LHyTlA/other.mp3',
  vocals: 'https://replicate.delivery/pbxt/LhbfIVeFEVt83kQfEUQTU8DUwJ6AVfl2aau3IfaFKjyhcIPVC/vocals.mp3'
}
*/

// TO DO: CONDITIONALS FOR INSTURMENTS

"use client";
import React, { useRef, useEffect, useState } from "react";

export default function Home() {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const [visualSize, setVisualSize] = useState(50);

  const initAudioAndPlay = async () => {
    if (!audioRef.current) return;

    if (!audioContextRef.current) {
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 1024; // Larger FFT size for more detailed frequency data
      analyserRef.current = analyser;
      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    audioRef.current.play();
    visualize();
  };

  const visualize = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    const draw = () => {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      let maxVolume = 0;
      let totalVolume = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const volume = dataArrayRef.current[i];
        totalVolume += volume;
        if (volume > maxVolume) maxVolume = volume;
      }

      const averageVolume = totalVolume / dataArrayRef.current.length;
      const size = Math.max(50, maxVolume * 0.75); // Scale size change dynamically

      setVisualSize(size);
      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  };

  return (
    <div>
      <div
        style={{
          width: `${visualSize}px`,
          height: `${visualSize}px`,
          backgroundColor: "black",
          borderRadius: "50%",
          transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
        }}
        onClick={initAudioAndPlay}
      >
        <audio
          ref={audioRef}
          crossOrigin="anonymous"
          src="https://replicate.delivery/pbxt/LflQA55n3fgD30ZTeg9Pgj8FO2AZt4UV4A25TgKCGwiDIjTlA/drums.mp3"
        />
      </div>
    </div>
  );
}
