import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import Story from "@/components/Story";
import Testimonial from "@/components/Testimonial";
import Donation from "@/components/Donation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Carousel />
      <Story />
      <Testimonial />
      <Donation />
      <Footer />
    </main>
  );
}
