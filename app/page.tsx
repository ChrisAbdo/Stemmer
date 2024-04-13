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
    for (let i = 0; i < audioElements.length; i++) {
      if (isPlaying) {
        audioElements[i].play();
      } else {
        audioElements[i].pause();
      }
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
            <div className="mt-10 flex items-center justify-center">
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
            <div>
              BASS
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "black",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  setBassMuted(!isBassMuted);
                }}
              >
                <audio
                  src={genData.bass}
                  autoPlay={isPlaying}
                  muted={isBassMuted}
                />
              </div>
            </div>
            <div>
              DRUMS
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "black",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  setDrumsMuted(!isDrumsMuted);
                }}
              >
                <audio
                  src={genData.drums}
                  autoPlay={isPlaying}
                  muted={isDrumsMuted}
                />
              </div>
            </div>
            <div>
              VOCALS
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "black",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  setVocalsMuted(!isVocalsMuted);
                }}
              >
                <audio
                  src={genData.vocals}
                  autoPlay={isPlaying}
                  muted={isVocalsMuted}
                />
              </div>
            </div>
            <div>
              OTHER
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "black",
                  borderRadius: "50%",
                }}
              >
                <audio
                  src={genData.other}
                  autoPlay={isPlaying}
                  muted={isOtherMuted}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
