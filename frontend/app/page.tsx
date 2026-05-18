// app/page.tsx

import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import Chat from "@/components/ui/Chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ef]">

      <Navbar />

      <section className="flex h-[calc(100vh-64px)]">

        <Sidebar />

        <Chat />

      </section>

    </main>
  );
}