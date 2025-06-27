import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import SideBarContent from "./SideBarContent";
import { useState } from "react";

export function MobileSideBar() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 bg-black/20 backdrop-blur-sm border-r border-white/10 [&>button]:text-white [&>button]:hover:text-gray-300 [&>button]:hover:bg-white/10 [&>button]:rounded-lg [&>button]:p-2 [&>button]:absolute [&>button]:top-1 [&>button]:right-1 [&>button]:z-50"
      >
        <div className="px-6 pt-10 pb-4 h-full overflow-y-auto">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <SidebarHeader />
          <SideBarContent onClose={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
