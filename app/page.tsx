// "use client";

// import React from "react";

// export default function Home() {
//   const [audioUrlValue, setAudioUrlValue] = React.useState("");
//   const [loading, setLoading] = React.useState(false);
//   const [genData, setGenData] = React.useState({} as any);

//   const handleChange = (event: any) => {
//     setAudioUrlValue(event.target.value);
//   };

//   const handleSubmit = async (event: any) => {
//     event.preventDefault();
//     setLoading(true);
//     const response = await fetch("/api/demucs", {
//       method: "POST",
//       body: JSON.stringify({
//         audioUrl: audioUrlValue,
//       }),
//     });
//     const data = await response.json();
//     setLoading(false);
//     setGenData(data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={audioUrlValue}
//           onChange={handleChange}
//           placeholder="Enter audio URL"
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {loading && <p>Loading your stems &rparr; this may take a while...</p>}
//       BASS: {genData.bass || "No data yet"}
//       <br />
//       DRUMSs: {genData.drums || "No data yet"}
//       <br />
//       VOCALS: {genData.vocals || "No data yet"}
//     </div>
//   );
// }

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

export default function Home() {
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
              <Drawer>
                <DrawerTrigger asChild>
                  <Button>Upload Song</Button>
                </DrawerTrigger>
                <DrawerContent className="h-2/3">
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>
                      This action cannot be undone.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
