import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FlightPath from "../components/FlightPath";

export default function Home() {
  return (
    <main className="page-bg flex min-h-dvh flex-col font-sans">
      <div className="relative z-10">
        <Navbar />
      </div>
      <FlightPath />
      <Hero />
    </main>
  );
}