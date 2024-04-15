import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileMusic, MousePointer, MousePointerClick } from "lucide-react";

export function Guide() {
  return (
    <Card className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto">
      <CardHeader className="pb-2 flex">
        <CardTitle>Usage Guide</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2">
          <FileMusic className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Choose Your Song</p>
            <p className="text-sm text-muted-foreground">
              Upload or choose previous generations.
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2">
          <MousePointer className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Click</p>
            <p className="text-sm text-muted-foreground">
              Mute and unmute stems.
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2">
          <MousePointerClick className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Click and hold</p>
            <p className="text-sm text-muted-foreground">
              Isolate stem and mute others.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
