export const GallerySection = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const gallery = [
    { id: 1, title: "x andini Portrait", image: `${baseUrl}profil_web.jpg` },
    { id: 2, title: "Club Vibes - Schillers", image: `${baseUrl}Screenshot 2025-11-14 200142.png` },
    { id: 3, title: "Live Energy", image: `${baseUrl}Screenshot 2025-11-14 200238.png` },
    { id: 4, title: "Crowd Moments", image: `${baseUrl}Screenshot 2025-11-14 200304.png` },
  ];

  return (
    <section id="gallery" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-dark-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-4">Gallery</h2>
          <p className="text-xl text-gray-400">Check out my recent sets and studio sessions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gallery.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl h-72 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transition">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                <h3 className="text-white font-bold text-xl">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-dark-700 to-dark-800 rounded-xl p-8 border border-purple-500/30">
          <p className="text-gray-300 mb-6 text-lg">More content on Instagram</p>
          <a href="https://www.instagram.com/x_andiinii/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:shadow-lg transition text-lg">
            View Full Gallery
          </a>
        </div>
      </div>
    </section>
  );
};
