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
            {uploadedUrl && <p>Uploaded URL: {uploadedUrl}</p>}
            <br />
            {loading && (
              <p>Loading your stems &rparr; this may take a while...</p>
            )}
            BASS: {genData.bass || "No data yet"}
            <br />
            DRUMSs: {genData.drums || "No data yet"}
            <br />
            VOCALS: {genData.vocals || "No data yet"}
          </div>
        </div>
      </div>
    </div>
  );
}
