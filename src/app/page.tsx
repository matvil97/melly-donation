import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Story from "@/components/Story";
import Project from "@/components/Project";
import Donation from "@/components/Donation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import StickyDonate from "@/components/StickyDonate";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <ScrollProgress />
      <Nav />
      <Hero />
      <VideoSection />
      <Story />
      <Project />
      <Donation />
      <Footer />
      <StickyDonate />
      <ChatBot />
    </main>
  );
}
