import { useState, useEffect } from 'react';

export const HeroSection = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.min(scrollTop / 500, 1); // Effect completes after 500px scroll
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(168, 85, 247, 0.3) 100%), url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&h=900&fit=crop')",
          backgroundAttachment: "fixed"
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900" />
      
      {/* Main Content */}
      <div 
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
        style={{
          opacity: 1,
          pointerEvents: 'auto'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl shadow-purple-500/50">
              <img 
                src={`${baseUrl}profil_web.jpg`}
                alt="x andini DJ Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Main Title, Bio and CTA */}
          <div className="text-left">
            <h2 className="text-3xl font-bold text-white mb-6">x andini</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Berlin-based DJ x andini moves fluidly between the introspective and the energetic, blending rhythms and melodies that captivate both mind and body.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Each performance is an exchange of energy subtle, emotional, and intimate leaving room for the night to breathe and the crowd to move.
            </p>
            <div className="flex gap-3 mb-8">
              {[
                { name: "Instagram", icon: `${baseUrl}instagram.svg`, link: "https://www.instagram.com/x_andiinii/" },
                { name: "SoundCloud", icon: `${baseUrl}soundcloud.svg`, link: "https://soundcloud.com/xandiinii" },
                { name: "YouTube", icon: `${baseUrl}youtube.svg`, link: "https://www.youtube.com/@Xandiinii" },
                { name: "Spotify", icon: `${baseUrl}spotify.svg`, link: "https://open.spotify.com/search/x%20andini" },
                { name: "Apple Music", icon: `${baseUrl}apple-music.svg`, link: "https://music.apple.com" },
                { name: "Buy Me a Coffee", icon: `${baseUrl}paypal.svg`, link: "https://www.paypal.com/paypalme/IgorAndin" }
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-br from-[#5A2D82] to-[#D12B81] rounded-lg p-3 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                  title={platform.name}
                >
                  <img src={platform.icon} alt={platform.name} className="w-6 h-6" />
                </a>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#soundcloud" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition shadow-lg hover:shadow-xl text-lg">
                Upcoming Tours
              </a>
              <a href="#soundcloud" className="px-8 py-4 border-2 border-purple-500 hover:bg-purple-600/20 rounded-lg font-bold transition text-lg">
                Listen Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
