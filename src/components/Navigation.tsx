import { useState } from 'react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-violet-950 border-b border-violet-900">
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
              { label: 'MUSIC', href: '#music' },
              { label: 'BIOGRAPHY', href: '#biography' },
              { label: 'VIDEOS', href: 'https://www.youtube.com/@Xandiinii', target: '_blank' },
              { label: 'SHOP', href: '#shop' },
              { label: 'CONTACT', href: '#contact' },
            ].map((link) => (
              <a key={link.label} href={link.href} target={link.target || '_self'} className="text-white hover:text-violet-100 transition font-bold text-sm">
                {link.label}
              </a>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white text-2xl">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-violet-900">
            {[
              { label: 'TOUR DATES', href: '#tours' },
              { label: 'MUSIC', href: '#music' },
              { label: 'BIOGRAPHY', href: '#biography' },
              { label: 'VIDEOS', href: 'https://www.youtube.com/@Xandiinii', target: '_blank' },
              { label: 'SHOP', href: '#shop' },
              { label: 'CONTACT', href: '#contact' },
            ].map((link) => (
              <a key={link.label} href={link.href} target={link.target || '_self'} className="block py-2 text-white hover:text-violet-100 transition font-bold text-sm" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
