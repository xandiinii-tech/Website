import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { SoundCloudSection } from './components/SoundCloudSection';
import { ToursSection } from './components/ToursSection';
import { BiographySection } from './components/BiographySection';
import { GallerySection } from './components/GallerySection';
import { ShopSection } from './components/ShopSection';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import './index.css';

function App() {
  const [splashComplete, setSplashComplete] = useState(false);

  return (
    <div className="w-full bg-dark-900">
      <SplashScreen onComplete={() => setSplashComplete(true)} />
      <Navigation />
      <main>
        <HeroSection />
        <SoundCloudSection />
        <ToursSection />
        <BiographySection />
        <ShopSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
