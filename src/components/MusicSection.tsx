export const MusicSection = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const platforms = [
    {
      name: "Instagram",
      link: "https://www.instagram.com/x_andiinii/",
      icon: `${baseUrl}instagram.svg`
    },
    {
      name: "SoundCloud",
      link: "https://soundcloud.com/xandiinii",
      icon: `${baseUrl}soundcloud.svg`
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/@Xandiinii",
      icon: `${baseUrl}youtube.svg`
    },
    {
      name: "Spotify",
      link: "https://open.spotify.com/search/x%20andini",
      icon: `${baseUrl}spotify.svg`
    },
    {
      name: "Apple Music",
      link: "https://music.apple.com",
      icon: `${baseUrl}apple-music.svg`
    },
    {
      name: "Buy Me a Coffee",
      link: "https://www.paypal.com/paypalme/IgorAndin",
      icon: `${baseUrl}paypal.svg`
    },
    {
      name: "Buy a Cocktail",
      link: "https://revolut.me/igoruuvzu/pocket/Fn7zegM3Rb",
      icon: `${baseUrl}icons8-revolut-50-umgewandelt-von-png.svg`
    }
  ];

  return (
    <section id="music" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-dark-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {platforms.map((platform, idx) => (
            <a
              key={idx}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-[#5A2D82] to-[#D12B81] rounded-[20%] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50"
            >
              <img src={platform.icon} alt={platform.name} className="w-8 h-8 mb-2" />
              <h3 className="text-xs font-bold text-white">
                {platform.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
