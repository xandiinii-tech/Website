import { useEffect, useState, type CSSProperties } from 'react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auroraShift, setAuroraShift] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateAuroraShift = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setAuroraShift((y / 18) % 360);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateAuroraShift);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const navAuroraStyle: CSSProperties = {
    backgroundImage: `
      radial-gradient(circle at 14% 16%, hsla(${(auroraShift + 212) % 360}, 98%, 63%, 0.34), transparent 44%),
      radial-gradient(circle at 84% 78%, hsla(${(auroraShift + 192) % 360}, 92%, 58%, 0.24), transparent 48%),
      linear-gradient(108deg, #120f2c, #161844 54%, #0d2554)
    `,
    transition: 'background-image 260ms linear'
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-blue-500/30" style={navAuroraStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="text-2xl font-black text-white">
              x andini
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'TOUR DATES', href: '#tours' },
              { label: 'MUSIC', href: '#soundcloud' },
              { label: 'BIOGRAPHY', href: '#biography' },
              { label: 'VIDEOS', href: 'https://www.youtube.com/@Xandiinii', target: '_blank' },
              { label: 'SHOP', href: '#shop' },
              { label: 'CONTACT', href: '#contact' },
            ].map((link) => (
              <a key={link.label} href={link.href} target={link.target || '_self'} className="text-white hover:text-blue-100 transition font-bold text-sm">
                {link.label}
              </a>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white text-2xl">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-blue-500/30">
            {[
              { label: 'TOUR DATES', href: '#tours' },
              { label: 'MUSIC', href: '#soundcloud' },
              { label: 'BIOGRAPHY', href: '#biography' },
              { label: 'VIDEOS', href: 'https://www.youtube.com/@Xandiinii', target: '_blank' },
              { label: 'SHOP', href: '#shop' },
              { label: 'CONTACT', href: '#contact' },
            ].map((link) => (
              <a key={link.label} href={link.href} target={link.target || '_self'} className="block py-2 text-white hover:text-blue-100 transition font-bold text-sm" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
