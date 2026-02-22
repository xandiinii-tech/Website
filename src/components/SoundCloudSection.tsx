export function SoundCloudSection() {
  const latestSets = [
    { title: "Schillers Cosmic Rave", artist: "by x andini", link: "https://soundcloud.com/xandiinii", image: "/CosmicRave.jpeg" },
    { title: "Keta Slow Downtempo #1", artist: "by x andini", link: "https://soundcloud.com/xandiinii", image: "/Keta1.jpeg" },
    { title: "KetaTempo#2: Tree of Life", artist: "by x andini", link: "https://soundcloud.com/xandiinii", image: "/Keta2.jpg" }
  ];

  // 2 X's on each side
  const sideXs = Array.from({ length: 4 }, (_, i) => ({
    id: `x-${i}`,
    isLeft: i < 2,
    position: i % 2,
    delay: `${i * 0.15}s`
  }));

  const renderX = (x: any) => (
    <svg
      key={x.id}
      width="100"
      height="100"
      viewBox="0 0 150 150"
      className="pointer-events-none"
      style={{
        animationDelay: x.delay,
        filter: 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.9))'
      }}
    >
      <defs>
        <linearGradient id={`neon-x-${x.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff006e" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
        </linearGradient>
        <filter id={`glow-${x.id}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Diagonal line 1 */}
      <line
        x1="20"
        y1="20"
        x2="130"
        y2="130"
        stroke={`url(#neon-x-${x.id})`}
        strokeWidth="10"
        strokeLinecap="round"
        filter={`url(#glow-${x.id})`}
        className="animate-draw-vertical"
        style={{ animationDelay: x.delay }}
      />
      {/* Diagonal line 2 */}
      <line
        x1="130"
        y1="20"
        x2="20"
        y2="130"
        stroke={`url(#neon-x-${x.id})`}
        strokeWidth="10"
        strokeLinecap="round"
        filter={`url(#glow-${x.id})`}
        className="animate-draw-horizontal"
        style={{ animationDelay: x.delay }}
      />
    </svg>
  );

  return (
    <section id="soundcloud" className="py-24 px-4 bg-dark-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Latest Sets</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestSets.map((set, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-lg h-96">
              <img src={set.image} alt={set.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                <a href={set.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition">
                  Listen on SoundCloud →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
