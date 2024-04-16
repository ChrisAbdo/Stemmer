// @ts-nocheck

/*
{
  bass: 'https://replicate.delivery/pbxt/f09dTehfTTV9uJviVHapWUKky5Hf0EFVOgjrhfzpZPBicIPVC/bass.mp3',
  drums: 'https://replicate.delivery/pbxt/Xqt3j7IlM0Z4O9Z273YfOW7WSDZ9A6oT3Db3qCCjfY7lD5pSA/drums.mp3',
  other: 'https://replicate.delivery/pbxt/MYXzWwLSbrZvORueS3FPj8NyisPIlQNe9T3JHHfZ7l5LHyTlA/other.mp3',
  vocals: 'https://replicate.delivery/pbxt/LhbfIVeFEVt83kQfEUQTU8DUwJ6AVfl2aau3IfaFKjyhcIPVC/vocals.mp3'
}

https://replicate.delivery/pbxt/LflQA55n3fgD30ZTeg9Pgj8FO2AZt4UV4A25TgKCGwiDIjTlA/drums.mp3
*/

// TO DO: CONDITIONALS FOR INSTURMENTS so other show up if returns null.

"use client";
import React, { useRef, useEffect, useState } from "react";

export default function Visualizer({
  audioUrl,
  isPlaying,
  mute,
  onToggleMute,
}: {
  audioUrl: string;
  mute: boolean;
  onToggleMute: () => void;
}) {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const [scale, setScale] = useState(1);

  const initAudioAndPlay = async () => {
    if (!audioRef.current) return;

    if (!audioContextRef.current) {
      const audioContext = new AudioContext();
      audioContextRef.current = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
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
  useEffect(() => {
    if (isPlaying) {
      initAudioAndPlay();
    }
  }, [isPlaying]);
  const visualize = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    const draw = () => {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      let maxVolume = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        if (dataArrayRef.current[i] > maxVolume) {
          maxVolume = dataArrayRef.current[i];
        }
      }

      const newScale = 1 + maxVolume / 256;
      setScale(newScale);

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  };

  const handleOnClick = () => {
    initAudioAndPlay();
    if (onToggleMute) onToggleMute();
  };

  return (
    <div
      style={{
        transition: "transform 0.05s ease-in-out",
        transform: `scale(${scale})`,
      }}
      className={`w-[50px] h-[50px] bg-primary cursor-pointer rounded-full ${
        mute ? "bg-muted" : ""
      }`}
      onClick={handleOnClick}
    >
      <audio
        ref={audioRef}
        // CORS requires crossOrigin for external audio sources
        crossOrigin="anonymous"
        src={audioUrl}
        muted={mute}
      />
    </div>
  );
}
