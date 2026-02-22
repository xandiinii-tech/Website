export const Footer = () => {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <footer className="w-full bg-dark-800 border-t border-dark-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">x andini</h3>
            <p className="text-gray-400 font-semibold mb-1">
              For bookings contact:
            </p>
            <p>
              <a href="mailto:bookings@xandini.music.net" className="text-purple-400 hover:text-pink-400 transition">bookings@xandini.music.net</a>
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#tours" className="hover:text-purple-400 transition">Tour Dates</a></li>
              <li><a href="#music" className="hover:text-purple-400 transition">Music</a></li>
              <li><a href="#gallery" className="hover:text-purple-400 transition">Gallery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Follow</h4>
            <div className="flex gap-3">
              {[
                { name: "Instagram", icon: `${baseUrl}instagram.svg`, url: "https://www.instagram.com/x_andiinii/" },
                { name: "SoundCloud", icon: `${baseUrl}soundcloud.svg`, url: "https://soundcloud.com/xandiinii" },
                { name: "YouTube", icon: `${baseUrl}youtube.svg`, url: "https://www.youtube.com/@Xandiinii" },
                { name: "Spotify", icon: `${baseUrl}spotify.svg`, url: "https://open.spotify.com/search/x%20andini" },
                { name: "Apple Music", icon: `${baseUrl}apple-music.svg`, url: "https://music.apple.com" },
              ].map((social, idx) => (
                <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-[#5A2D82] to-[#D12B81] rounded-lg p-2 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300" title={social.name}>
                  <img src={social.icon} alt={social.name} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 pt-8">
          <p className="text-center text-gray-500">
            © 2026 x andini. All rights reserved. | Built for pure beats and high energy.
          </p>
        </div>
      </div>
    </footer>
  );
};
