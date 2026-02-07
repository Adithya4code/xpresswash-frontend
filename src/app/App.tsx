import Services from "@/pages/Services";
import Landing from "@/pages/Landing";

export default function App() {
  return (
    // Wrap everything in a Fragment or a single container
    <div className="min-h-screen bg-background text-text antialiased">
      <Landing />
      <Services />
    </div>
  );
}