import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "@/components/OverviewTab";
import AnalyticsTab from "@/components/AnalyticsTab";
import ToolsTab from "@/components/ToolsTab";
import GalleryTab from "@/components/GalleryTab";
import CollectionTabsHeader from "@/components/CollectionTabsHeader";

export default function CollectionTabs() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-6">
      <CollectionTabsHeader />
      <Tabs defaultValue="overview">
        <TabsList className="bg-white/10 border border-white/20 mb-6">
          {(["overview", "analytics", "tools", "gallery"] as const).map(tab => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="cursor-pointer text-xs font-medium capitalize data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-200"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>

        <TabsContent value="tools">
          <ToolsTab />
        </TabsContent>

        <TabsContent value="gallery">
          <GalleryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
