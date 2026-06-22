import { redirect } from "next/navigation";

export default function RootPage() {
  // Arahkan pengunjung root (/) langsung ke bahasa default (Inggris)
  redirect("/en");
}