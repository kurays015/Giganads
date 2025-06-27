import SideBarContent from "@/components/SideBarContent";
import SidebarHeader from "@/components/SidebarHeader";

export default function Sidebar() {
  return (
    <aside className="w-[450px] bg-black/20 backdrop-blur-sm border-r border-white/10 overflow-y-auto h-full">
      <div className="px-6 pt-6 pb-4">
        <SidebarHeader />
        <SideBarContent />
      </div>
    </aside>
  );
}
