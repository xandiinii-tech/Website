import { useCallback, useEffect, useState, type CSSProperties } from 'react';

type TourEvent = {
  id: string;
  event: string;
  date: string;
  sortDate: number;
  location: string;
  link: string;
  source: 'youtube' | 'soundcloud' | 'manual';
};

const normalizeEventTitle = (value: string) => {
  return value
    .toLowerCase()
    .replace(/\|/g, ' ')
    .replace(/[#]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const formatEventName = (value: string) => {
  const normalized = normalizeEventTitle(value);

  if (normalized.includes('schillers cosmic rave')) {
    return 'x andini | LIVE | Schillers Cosmic Rave';
  }

  if (normalized.includes('downtempo deep dive')) {
    return 'x andini | Live | Downtempo Deep Dive @ Charlis';
  }

  return value;
};

const getEventLocation = (value: string) => {
  const normalized = normalizeEventTitle(value);

  if (
    normalized.includes('charlies deep downtempo') ||
    normalized.includes('downtempo deep dive') ||
    normalized.includes('charlis')
  ) {
    return 'Berlin';
  }

  return 'Cottbus';
};

const formatEventDate = (raw: string) => {
  if (!raw) {
    return '';
  }

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const toSortDate = (raw: string) => {
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const fetchXmlThroughProxy = async (url: string) => {
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);

  if (!response.ok) {
    throw new Error('Proxy fetch failed');
  }

  return response.text();
};

export const ToursSection = () => {
  const [auroraShift, setAuroraShift] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState<TourEvent[]>([
    {
      id: 'fallback-1',
      event: 'Schillers Cosmic Rave',
      date: '14.11.2025',
      sortDate: new Date('2025-11-14').getTime(),
      location: 'Cottbus',
      link: 'https://www.instagram.com/x_andiinii/',
      source: 'manual'
    },
    {
      id: 'fallback-2',
      event: 'Charlies Deep Downtempo',
      date: '13.12.2025',
      sortDate: new Date('2025-12-13').getTime(),
      location: 'Berlin',
      link: 'https://www.instagram.com/x_andiinii/',
      source: 'manual'
    },
    {
      id: 'fallback-3',
      event: 'WK 51 NYE',
      date: '31.12.2025',
      sortDate: new Date('2025-12-31').getTime(),
      location: 'Cottbus',
      link: 'https://www.instagram.com/x_andiinii/',
      source: 'manual'
    },
    {
      id: 'fallback-4',
      event: 'x andini | LIVE @ Schillers | Schillers Dark Valentine',
      date: '14.02.2026',
      sortDate: new Date('2026-02-14').getTime(),
      location: 'Cottbus',
      link: 'https://soundcloud.com/xandiinii/xdarkvalentine?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&si=be9764b7f89945f8869f790ee15c9dcc',
      source: 'manual'
    }
  ]);

  useEffect(() => {
    let ticking = false;

    const updateAuroraShift = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setAuroraShift((y / 16) % 360);
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

  const loadUpcomingEvents = useCallback(async () => {
    try {
      const youtubeFeedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCcwxFNu1QXPEkmn5cJRCGRw';
      const soundCloudFeedUrl = 'https://feeds.soundcloud.com/users/soundcloud:users:1613003791/sounds.rss';

      const [youtubeXmlText, soundCloudXmlText] = await Promise.all([
        fetchXmlThroughProxy(youtubeFeedUrl),
        fetchXmlThroughProxy(soundCloudFeedUrl)
      ]);

      const youtubeXml = new DOMParser().parseFromString(youtubeXmlText, 'application/xml');
      const soundCloudXml = new DOMParser().parseFromString(soundCloudXmlText, 'application/xml');

      const youtubeEvents: TourEvent[] = Array.from(youtubeXml.getElementsByTagName('entry'))
        .map((entry) => {
          const title = entry.getElementsByTagName('title')[0]?.textContent?.trim() ?? '';
          const published = entry.getElementsByTagName('published')[0]?.textContent?.trim() ?? '';
          const href = Array.from(entry.getElementsByTagName('link'))
            .find((node) => node.getAttribute('rel') === 'alternate')
            ?.getAttribute('href') ?? '';

          if (!href.includes('watch?v=')) {
            return null;
          }

          return {
            id: `yt-${href}`,
            event: formatEventName(title),
            date: formatEventDate(published),
            sortDate: toSortDate(published),
            location: getEventLocation(title),
            link: href,
            source: 'youtube'
          };
        })
        .filter((item): item is TourEvent => Boolean(item && item.event && item.link));

      const soundCloudEvents: TourEvent[] = Array.from(soundCloudXml.getElementsByTagName('item'))
        .map((item) => {
          const title = item.getElementsByTagName('title')[0]?.textContent?.trim() ?? '';
          const rawDate = item.getElementsByTagName('pubDate')[0]?.textContent?.trim() ?? '';
          const href = item.getElementsByTagName('link')[0]?.textContent?.trim() ?? '';

          return {
            id: `sc-${href}`,
            event: formatEventName(title),
            date: formatEventDate(rawDate),
            sortDate: toSortDate(rawDate),
            location: getEventLocation(title),
            link: href,
            source: 'soundcloud'
          };
        })
        .filter((item): item is TourEvent => Boolean(item.event && item.link));

      const highlightEvent: TourEvent = {
        id: 'manual-schillers-dark-valentine',
        event: 'x andini | LIVE @ Schillers | Schillers Dark Valentine',
        date: '14.02.2026',
        sortDate: new Date('2026-02-14T23:59:59Z').getTime(),
        location: 'Cottbus',
        link: 'https://soundcloud.com/xandiinii/xdarkvalentine?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&si=be9764b7f89945f8869f790ee15c9dcc',
        source: 'manual'
      };

      const merged = [highlightEvent, ...youtubeEvents, ...soundCloudEvents].sort((a, b) => b.sortDate - a.sortDate);

      const dedupedByTitle = new Map<string, TourEvent>();
      for (const item of merged) {
        const key = normalizeEventTitle(item.event);
        const existing = dedupedByTitle.get(key);

        if (!existing) {
          dedupedByTitle.set(key, item);
          continue;
        }

        if (existing.source !== 'youtube' && item.source === 'youtube') {
          dedupedByTitle.set(key, item);
        }
      }

      const finalEvents = Array.from(dedupedByTitle.values())
        .sort((a, b) => b.sortDate - a.sortDate)
        .slice(0, 12);

      if (finalEvents.length > 0) {
        setUpcomingEvents(finalEvents);
      }
    } catch {
      // Keep fallback upcoming events when feeds are unavailable.
    }
  }, []);

  useEffect(() => {
    const refreshMs = 5 * 60 * 1000;

    void loadUpcomingEvents();

    const intervalId = window.setInterval(() => {
      void loadUpcomingEvents();
    }, refreshMs);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void loadUpcomingEvents();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [loadUpcomingEvents]);

  const toursBoxStyle: CSSProperties = {
    backgroundImage: `
      radial-gradient(circle at 14% 16%, hsla(${(auroraShift + 346) % 360}, 95%, 62%, 0.18), transparent 45%),
      radial-gradient(circle at 86% 84%, hsla(${(auroraShift + 214) % 360}, 90%, 60%, 0.12), transparent 46%),
      linear-gradient(110deg, rgba(26, 6, 13, 0.92), rgba(18, 8, 16, 0.92) 55%, rgba(16, 7, 19, 0.92))
    `,
    transition: 'background-image 240ms linear'
  };

  const ctaBoxStyle: CSSProperties = {
    backgroundImage: `
      radial-gradient(circle at 16% 20%, hsla(${(auroraShift + 332) % 360}, 96%, 63%, 0.16), transparent 44%),
      radial-gradient(circle at 82% 78%, hsla(${(auroraShift + 226) % 360}, 88%, 60%, 0.11), transparent 48%),
      linear-gradient(112deg, rgba(23, 8, 15, 0.9), rgba(16, 8, 16, 0.9), rgba(12, 8, 20, 0.88))
    `,
    transition: 'background-image 240ms linear'
  };

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
        
        <div
          className="backdrop-blur-sm rounded-xl p-12 mb-12 border border-red-500/30 font-['Brush Script MT', 'Comic Sans MS', cursive]"
          style={toursBoxStyle}
        >
          <div className="space-y-4">
            {upcomingEvents.map((tour, index) => (
              <a
                key={tour.id}
                href={tour.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-purple-400/20 pb-4 last:border-b-0"
              >
                <p
                  className="text-red-200 text-2xl font-bold mb-1 backdrop-blur-md px-2 py-1 rounded inline-block border border-red-300/20"
                  style={{
                    backgroundImage: `linear-gradient(110deg, hsla(${(auroraShift + index * 14 + 348) % 360}, 85%, 57%, 0.26), hsla(${(auroraShift + index * 14 + 216) % 360}, 88%, 55%, 0.15))`,
                    transition: 'background-image 240ms linear'
                  }}
                >
                  {tour.date} — {tour.event}
                </p>
                <p className="text-red-200/80 text-lg">
                  {tour.location}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-8 text-center border border-red-500/25" style={ctaBoxStyle}>
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
