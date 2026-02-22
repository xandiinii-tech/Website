export const ToursSection = () => {
  const tours = [
    {
      id: 1,
      event: "Schillers Cosmic Rave",
      date: "14.11.2025",
      location: "Berlin",
      link: "https://www.instagram.com/x_andiinii/"
    },
    {
      id: 2,
      event: "Charlies Deep Downtempo",
      date: "13.12.2025",
      location: "Berlin",
      link: "https://www.instagram.com/x_andiinii/"
    },
    {
      id: 3,
      event: "WK 51 NYE",
      date: "31.12.2025",
      location: "Berlin",
      link: "https://www.instagram.com/x_andiinii/"
    },
    {
      id: 4,
      event: "b2b pio @ WK 51",
      date: "01.01.2026",
      location: "Berlin",
      link: "https://www.instagram.com/x_andiinii/"
    },
    {
      id: 5,
      event: "xandini | Live at Schillers",
      date: "14.02.2026",
      location: "Berlin",
      link: "https://www.instagram.com/x_andiinii/"
    },
    {
      id: 6,
      event: "Keta Kast Sessions",
      date: "28.02.2026",
      location: "Berlin",
      link: "https://www.instagram.com/x_andiinii/"
    },
    {
      id: 7,
      event: "Keta Kast Sessions",
      date: "07.03.2026",
      location: "Berlin",
      link: "https://www.instagram.com/x_andiinii/"
    },
    {
      id: 8,
      event: "Keta Kast Sessions",
      date: "14.03.2026",
      location: "Berlin",
      link: "https://www.instagram.com/x_andiinii/"
    },
  ];

  return (
    <section id="tours" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-dark-800 relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-30"
      >
        <source src="https://videos.pexels.com/video-files/6146318/6146318-sd_640_360_30fps.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-dark-800/60 -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-4">Upcoming</h2>
          <p className="text-xl text-gray-400">Follow for the latest event announcements</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-12 mb-12 border border-purple-400/30 font-['Brush Script MT', 'Comic Sans MS', cursive]">
          <div className="space-y-4">
            {tours.map((tour) => (
              <div key={tour.id} className="border-b border-purple-400/20 pb-4 last:border-b-0">
                <p className="text-purple-400 text-2xl font-bold mb-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded inline-block">
                  {tour.date} — {tour.event}
                </p>
                <p className="text-purple-300 text-lg">
                  {tour.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-dark-700 to-dark-800 rounded-xl p-8 text-center border border-purple-500/30">
          <p className="text-gray-300 mb-6 text-lg">
            Don't miss any updates. Follow @x_andiinii on Instagram for latest tour announcements and exclusive content.
          </p>
          <a 
            href="https://www.instagram.com/x_andiinii/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-lg font-bold hover:shadow-xl transition shadow-lg text-lg"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};
