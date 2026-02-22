export const ShopSection = () => {
  const merch = [
    {
      id: 1,
      tag: "New",
      name: "X Logo Club Tee",
      type: "T-Shirt",
      price: "€35",
      description: "Boxy black tee with embroidered neon X on the chest and reflective back print.",
      includes: ["Heavy 240gsm cotton", "Sizes S-XL", "Limited first run"],
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      tag: "Drop",
      name: "Neon Pulse Longsleeve",
      type: "T-Shirt",
      price: "€45",
      description: "Gradient sleeve print that glows under UV—built for late sets and cozy mornings.",
      includes: ["Soft organic cotton", "Thumb-hole cuffs", "Unisex sizing"],
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      tag: "Pack",
      name: "Holographic Sticker Set",
      type: "Stickers",
      price: "€12",
      description: "Six die-cut vinyl stickers with iridescent finish for laptops, decks, and cases.",
      includes: ["Waterproof + UV safe", "3 large / 3 mini", "Ships flat"],
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      tag: "Custom",
      name: "Stage Case Decal",
      type: "Stickers",
      price: "€18",
      description: "Oversized matte decal with the X grid lines—perfect for flight cases or walls.",
      includes: ["40cm width", "Removable adhesive", "Limited quantity"],
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <section id="shop" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-purple-400 uppercase tracking-[0.3em] text-xs mb-3">Merch Drop</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Shop X andini</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Premium tees, UV-reactive prints, and sticker packs designed for night drives and booth sessions.
            DM @x_andiinii to reserve or email bookings@xandini.de for bulk requests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {merch.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-[#120a1f] via-[#1f1033] to-[#2b0f44] border border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-900/20 hover:-translate-y-1 transition duration-300"
            >
              <div className="relative mb-5 overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={`${item.name} preview`}
                  loading="lazy"
                  className="w-full h-56 object-cover scale-[1.02] hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-purple-800/30" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.25em] text-purple-300">{item.type}</span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-600/20 text-purple-200">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
              <p className="text-gray-400 mb-4">{item.description}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-white">{item.price}</span>
                <span className="text-gray-500 text-sm">pre-order</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-1 mb-6">
                {item.includes.map((detail) => (
                  <li key={detail} className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/x_andiinii/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] text-center px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition"
                >
                  DM to Reserve
                </a>
                <a
                  href="mailto:bookings@xandini.de?subject=Merch%20Order"
                  className="flex-1 min-w-[140px] text-center px-4 py-3 border border-purple-400 text-purple-200 rounded-lg font-semibold hover:bg-purple-400/10 transition"
                >
                  Email Order
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
