/*
{
  bass: 'https://replicate.delivery/pbxt/f09dTehfTTV9uJviVHapWUKky5Hf0EFVOgjrhfzpZPBicIPVC/bass.mp3',
  drums: 'https://replicate.delivery/pbxt/Xqt3j7IlM0Z4O9Z273YfOW7WSDZ9A6oT3Db3qCCjfY7lD5pSA/drums.mp3',
  other: 'https://replicate.delivery/pbxt/MYXzWwLSbrZvORueS3FPj8NyisPIlQNe9T3JHHfZ7l5LHyTlA/other.mp3',
  vocals: 'https://replicate.delivery/pbxt/LhbfIVeFEVt83kQfEUQTU8DUwJ6AVfl2aau3IfaFKjyhcIPVC/vocals.mp3'
}

https://replicate.delivery/pbxt/LflQA55n3fgD30ZTeg9Pgj8FO2AZt4UV4A25TgKCGwiDIjTlA/drums.mp3
*/

"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Uploader from "@/components/uploader";
import Visualizer from "@/components/visualizer";

export default function Home() {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [uploadedUrl, setUploadedUrl] = React.useState("");
  const [audioUrlValue, setAudioUrlValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [genData, setGenData] = React.useState({} as any);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [isVocalsMuted, setVocalsMuted] = React.useState(false);
  const [isDrumsMuted, setDrumsMuted] = React.useState(false);
  const [isBassMuted, setBassMuted] = React.useState(false);
  const [isOtherMuted, setOtherMuted] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("/api/demucs", {
      method: "POST",
      body: JSON.stringify({
        audioUrl: uploadedUrl,
      }),
    });
    const data = await response.json();
    setLoading(false);
    setGenData(data);
  };

  React.useEffect(() => {
    if (uploadedUrl) {
      handleSubmit();
    }
  }, [uploadedUrl]);

  React.useEffect(() => {
    const audioElements = document.getElementsByTagName("audio");
    const playPromises = [];

    for (let i = 0; i < audioElements.length; i++) {
      if (isPlaying) {
        // Collect all play promises
        playPromises.push(audioElements[i].play());
      } else {
        audioElements[i].pause();
        audioElements[i].currentTime = 0; // Optionally reset the time to ensure all tracks start from the beginning
      }
    }

    if (isPlaying) {
      Promise.all(playPromises)
        .then(() => {
          // All audio tracks have started playing
          console.log("Playing");
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          // Handle any errors (e.g., user hasn't interacted with the document yet)
        });
    }
  }, [isPlaying]);
  return (
    <div className="bg-background">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Web Stem Player
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              web stem player is a web application that allows you to separate
              the vocals, drums, bass, and other instruments from a song.
            </p>
            <div className="mt-10 flex items -center justify-center">
              <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button>Upload Song</Button>
                </DrawerTrigger>
                <DrawerContent className="h-2/3">
                  <DrawerHeader>
                    <DrawerTitle>Upload a song to split stems</DrawerTitle>
                    <DrawerDescription>
                      Accepted file types: mp3, wav
                    </DrawerDescription>
                    <Uploader
                      onUploadComplete={(url) => {
                        setDrawerOpen(false);
                        setUploadedUrl(url);
                      }}
                    />{" "}
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>

            {loading && (
              <p>Loading your stems &rparr; this may take a while...</p>
            )}
            <Button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "Pause" : "Play"}
            </Button>

            <Visualizer
              audioUrl="https://replicate.delivery/pbxt/LhbfIVeFEVt83kQfEUQTU8DUwJ6AVfl2aau3IfaFKjyhcIPVC/vocals.mp3"
              mute={isVocalsMuted}
              onToggleMute={() => setVocalsMuted(!isVocalsMuted)}
              isPlaying={isPlaying}
            />
            <Visualizer
              audioUrl="https://replicate.delivery/pbxt/Xqt3j7IlM0Z4O9Z273YfOW7WSDZ9A6oT3Db3qCCjfY7lD5pSA/drums.mp3"
              mute={isDrumsMuted}
              onToggleMute={() => setDrumsMuted(!isDrumsMuted)}
              isPlaying={isPlaying}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
