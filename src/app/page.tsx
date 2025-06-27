import DashboardClient from "@/components/DashboardClient";
import SuspenseFallback from "@/components/SuspenseFallback";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <DashboardClient />
    </Suspense>
  );
}
