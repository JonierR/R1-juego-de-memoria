import type { Metadata } from "next";
import { Records } from "@/components/Records";
export const metadata: Metadata = { title: "Récords" };
export default function RecordsPage() {
  return <Records />;
}
