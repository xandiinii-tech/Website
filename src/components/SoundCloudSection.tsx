import { useCallback, useEffect, useState, type CSSProperties } from 'react';

type VideoItem = {
  id: string;
  title: string;
  href: string;
  publishedAt?: number;
};

type SoundCloudItem = {
  title: string;
  date: string;
  duration: string;
  href: string;
  sortDate: number;
};

const formatDate = (raw: string) => {
  if (!raw) {
    return '';
  }

  const parsedDate = new Date(raw);
  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return parsedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// RSS feeds don't send CORS headers, so a static site must go through a proxy.
// A single proxy is unreliable — try several in order until one returns valid XML.
const PROXY_BUILDERS: Array<(u: string) => string> = [
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  (u) => `https://thingproxy.freeboard.io/fetch/${u}`,
];

const fetchXmlThroughProxy = async (url: string) => {
  const cacheBustUrl = `${url}${url.includes('?') ? '&' : '?'}_=${Date.now()}`;
  let lastError: unknown = new Error('No proxy attempted');

  for (const build of PROXY_BUILDERS) {
    try {
      const response = await fetch(build(cacheBustUrl), { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Proxy status ${response.status}`);
      }
      const text = await response.text();
      if (text && text.includes('<')) {
        return text;
      }
      throw new Error('Empty proxy response');
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

// Newest upload first — the latest video always leads the list.
const sortYouTubeVideos = (items: VideoItem[]) => {
  return [...items].sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0));
};

export function SoundCloudSection() {
  const initialYouTubeCount = 6;
  const initialSoundCloudCount = 3;
  const feedRefreshMs = 5 * 60 * 1000;

  const fallbackVideos: VideoItem[] = [
    {
      id: 'BLQUHezYW24',
      title: 'Bouncy Mäusy | Melodic Techno & Progressive House Mix 2026 | Keta Kast',
      href: 'https://www.youtube.com/watch?v=BLQUHezYW24',
      publishedAt: new Date('2026-07-06T00:00:00Z').getTime()
    },
    {
      id: '5O0zN776Z8A',
      title: 'x andini | LIVE @ Karlstraße Fest | Spontan augfelegt und Nachbarschaft geshaked',
      href: 'https://www.youtube.com/watch?v=5O0zN776Z8A',
      publishedAt: new Date('2026-06-21T00:00:00Z').getTime()
    },
    {
      id: 'pKRBcQXXByY',
      title: 'Keta Kast | KetaTempo # 6 | Psychedelics Deep',
      href: 'https://www.youtube.com/watch?v=pKRBcQXXByY'
    },
    {
      id: 'jDaAibLKE2g',
      title: 'Keta Kast | KetaTempo #5 | Cave of Wonders',
      href: 'https://www.youtube.com/watch?v=jDaAibLKE2g'
    },
    {
      id: 'qXI3OP7yjCs',
      title: 'Keta Kast | KetaTempo #4 | Echoes from the Moon',
      href: 'https://www.youtube.com/watch?v=qXI3OP7yjCs'
    },
    {
      id: 'H0FrQSSobrc',
      title: 'Keta Kast | KetaTempo #3 | Dance with Nature',
      href: 'https://www.youtube.com/watch?v=H0FrQSSobrc'
    },
    {
      id: '8r3Vsmb9KlM',
      title: 'Keta Kast | KetaTempo #2 | Tree of Life',
      href: 'https://www.youtube.com/watch?v=8r3Vsmb9KlM'
    },
    {
      id: 'p3TrIMhCCbQ',
      title: 'Keta Kast | LIVE | Keta Slow Downtempo # 1',
      href: 'https://www.youtube.com/watch?v=p3TrIMhCCbQ'
    }
  ];

  const [latestVideos, setLatestVideos] = useState<VideoItem[]>(fallbackVideos);
  const [auroraShift, setAuroraShift] = useState(0);
  const [showAllYouTube, setShowAllYouTube] = useState(false);
  const [showAllSoundCloud, setShowAllSoundCloud] = useState(false);
  const fallbackSoundCloudSets: SoundCloudItem[] = [
    {
      title: 'Keta Kast | Bouncy Mäusi',
      date: '05 Jul 2026',
      duration: '1:12:16',
      href: 'https://soundcloud.com/xandiinii/bouncymausi',
      sortDate: new Date('2026-07-05T20:24:21Z').getTime()
    },
    {
      title: 'x andini | LIVE @ Karlstraße Fest | Spontan augfelegt und Nachbarschaft geshaked',
      date: '21 Jun 2026',
      duration: '1:32:17',
      href: 'https://soundcloud.com/xandiinii/kfest',
      sortDate: new Date('2026-06-21T00:00:00Z').getTime()
    },
    {
      title: 'Keta Kast | KetaTempo # 6 | Psychedelics Deep',
      date: '19 Apr 2026',
      duration: '1:19:56',
      href: 'https://soundcloud.com/xandiinii/keta-kast-ketatempo-6',
      sortDate: new Date('2026-04-19T00:00:00Z').getTime()
    },
    {
      title: 'Keta Kast | KetaTempo #5 | Cave of Wonders',
      date: '12 Apr 2026',
      duration: '1:21:14',
      href: 'https://soundcloud.com/xandiinii/keta-tempo-5',
      sortDate: new Date('2026-04-12T00:00:00Z').getTime()
    },
    {
      title: 'Keta Kast | KetaTempo #4 | Echoes from the Moon',
      date: '20 Mar 2026',
      duration: '1:33:01',
      href: 'https://soundcloud.com/xandiinii/keta-kast-ketatempo-4-echoes',
      sortDate: new Date('2026-03-20T00:00:00Z').getTime()
    },
    {
      title: 'Keta Kast | KetaTempo #3 | Dance with Nature',
      date: '14 Mar 2026',
      duration: '1:11:46',
      href: 'https://soundcloud.com/xandiinii/keta-kast-ketatempo-3-dance',
      sortDate: new Date('2026-03-14T00:00:00Z').getTime()
    },
    {
      title: 'x andini | LIVE @ Schillers | Schillers Dark Valentine',
      date: '22 Feb 2026',
      duration: '1:25:25',
      href: 'https://soundcloud.com/xandiinii/xdarkvalentine',
      sortDate: new Date('2026-02-22T00:00:00Z').getTime()
    }
  ];
  const [soundCloudSets, setSoundCloudSets] = useState<SoundCloudItem[]>(fallbackSoundCloudSets);

  const loadYouTubeVideos = useCallback(async () => {
    try {
      const feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCcwxFNu1QXPEkmn5cJRCGRw';
      const xmlText = await fetchXmlThroughProxy(feedUrl);
      const xml = new DOMParser().parseFromString(xmlText, 'application/xml');
      const entries = Array.from(xml.getElementsByTagName('entry'));

      const parsed: VideoItem[] = entries
        .map((entry) => {
          const title = entry.getElementsByTagName('title')[0]?.textContent?.trim() ?? '';
          const published = entry.getElementsByTagName('published')[0]?.textContent?.trim() ?? '';
          const href = Array.from(entry.getElementsByTagName('link'))
            .find((linkNode) => linkNode.getAttribute('rel') === 'alternate')
            ?.getAttribute('href') ?? '';

          if (!href.includes('watch?v=')) {
            return { id: '', title: '', href: '', publishedAt: 0 };
          }

          const id = entry.getElementsByTagName('yt:videoId')[0]?.textContent?.trim() ?? '';
          const publishedAt = Number.isNaN(new Date(published).getTime()) ? 0 : new Date(published).getTime();

          return { id, title, href, publishedAt };
        })
        .filter((video: VideoItem) => Boolean(video.id && video.title && video.href));

      if (parsed.length > 0) {
        setLatestVideos(sortYouTubeVideos(parsed));
      }
    } catch {
      // Keep fallback items when feed is unavailable.
    }
  }, []);

  const loadSoundCloudTracks = useCallback(async () => {
    const maxPages = 5;
    let currentFeedUrl = 'https://feeds.soundcloud.com/users/soundcloud:users:1613003791/sounds.rss';
    const allTracks: SoundCloudItem[] = [];

    for (let page = 0; page < maxPages && currentFeedUrl; page += 1) {
      let xmlText: string;
      try {
        xmlText = await fetchXmlThroughProxy(currentFeedUrl);
      } catch {
        // One page failed — keep whatever earlier pages returned rather than
        // discarding everything (which would drop the newest track).
        break;
      }

      const xml = new DOMParser().parseFromString(xmlText, 'application/xml');
      const items = Array.from(xml.getElementsByTagName('item'));
      const pageTracks: SoundCloudItem[] = items
        .map((item) => {
          const title = item.getElementsByTagName('title')[0]?.textContent?.trim() ?? '';
          const href = item.getElementsByTagName('link')[0]?.textContent?.trim() ?? '';
          const rawDate = item.getElementsByTagName('pubDate')[0]?.textContent?.trim() ?? '';
          const duration = item.getElementsByTagName('itunes:duration')[0]?.textContent?.trim() ?? '';
          const sortDate = Number.isNaN(new Date(rawDate).getTime()) ? 0 : new Date(rawDate).getTime();

          return { title, href, date: formatDate(rawDate), duration, sortDate };
        })
        .filter((track) => Boolean(track.title && track.href));

      allTracks.push(...pageTracks);

      currentFeedUrl = Array.from(xml.getElementsByTagName('atom:link'))
        .find((linkNode) => linkNode.getAttribute('rel') === 'next')
        ?.getAttribute('href') ?? '';
    }

    const dedupedTracks = allTracks
      .filter(
        (track, index, source) => source.findIndex((candidate) => candidate.href === track.href) === index
      )
      .sort((a, b) => b.sortDate - a.sortDate);

    if (dedupedTracks.length > 0) {
      setSoundCloudSets(dedupedTracks);
    }
  }, []);

  useEffect(() => {
    void loadYouTubeVideos();

    const intervalId = window.setInterval(() => {
      void loadYouTubeVideos();
    }, feedRefreshMs);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void loadYouTubeVideos();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [feedRefreshMs, loadYouTubeVideos]);

  useEffect(() => {
    void loadSoundCloudTracks();

    const intervalId = window.setInterval(() => {
      void loadSoundCloudTracks();
    }, feedRefreshMs);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void loadSoundCloudTracks();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [feedRefreshMs, loadSoundCloudTracks]);

  useEffect(() => {
    let ticking = false;

    const updateAuroraShift = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setAuroraShift((y / 14) % 360);
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

  const youtubeAuroraStyle: CSSProperties = {
    backgroundImage: `
      radial-gradient(circle at 12% 18%, hsla(${(auroraShift + 355) % 360}, 95%, 63%, 0.2), transparent 42%),
      radial-gradient(circle at 88% 78%, hsla(${(auroraShift + 228) % 360}, 90%, 60%, 0.13), transparent 45%),
      linear-gradient(110deg, #1a060d, #120810 55%, #100713)
    `,
    transition: 'background-image 240ms linear'
  };

  const soundCloudAuroraStyle: CSSProperties = {
    backgroundImage: `
      radial-gradient(circle at 18% 12%, hsla(${(auroraShift + 336) % 360}, 96%, 64%, 0.2), transparent 44%),
      radial-gradient(circle at 80% 85%, hsla(${(auroraShift + 210) % 360}, 88%, 60%, 0.14), transparent 48%),
      linear-gradient(110deg, #1a060d, #120810 55%, #100713)
    `,
    transition: 'background-image 240ms linear'
  };

  const visibleYouTubeVideos = showAllYouTube
    ? latestVideos
    : latestVideos.slice(0, initialYouTubeCount);

  const visibleSoundCloudSets = showAllSoundCloud
    ? soundCloudSets
    : soundCloudSets.slice(0, initialSoundCloudCount);

  return (
    <section id="soundcloud" className="relative overflow-hidden bg-dark-900 px-4 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.2),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(190,24,93,0.18),transparent_36%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.45em] text-red-300">Music</p>
          <h2 className="bg-gradient-to-r from-red-300 via-pink-400 to-rose-500 bg-clip-text text-5xl font-black text-transparent sm:text-6xl">
            Latest Sets
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Watch and listen to the latest YouTube uploads and SoundCloud sets directly from the page.
          </p>
        </div>

        <div className="mb-16">
          <div
            className="rounded-2xl border border-red-500/30 p-4 sm:p-5"
            style={youtubeAuroraStyle}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.32em] text-red-200">YouTube List</p>
            <div className="space-y-2">
              {visibleYouTubeVideos.map((video, index) => (
                <a
                  key={`${video.id}-list`}
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-black/25 px-4 py-3 transition hover:border-red-400/45 hover:bg-black/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-red-500/30">
                      <img
                        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                        alt={`${video.title} preview`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute bottom-1 right-1 rounded bg-red-600/90 px-1 text-[8px] font-black uppercase tracking-[0.05em] text-white">
                        YT
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white transition group-hover:text-red-100">{video.title}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold uppercase tracking-[0.22em] text-red-200">{String(index + 1).padStart(2, '0')}</span>
                </a>
              ))}
            </div>

            {latestVideos.length > initialYouTubeCount && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllYouTube((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded-full border border-red-400/40 bg-black/25 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-100 transition hover:border-red-300/70 hover:bg-black/40"
                >
                  {showAllYouTube ? 'Show less' : `Show more (${latestVideos.length - visibleYouTubeVideos.length})`}
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className="rounded-[32px] border border-red-500/20 p-6 backdrop-blur-md sm:p-8 lg:p-10"
          style={soundCloudAuroraStyle}
        >
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-purple-300">SoundCloud</p>
              <h3 className="text-3xl font-black text-white sm:text-4xl">Listen to the latest sets</h3>
            </div>
            <a
              href="https://soundcloud.com/xandiinii/tracks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              View all on SoundCloud
            </a>
          </div>

          <div className="space-y-5">
            {visibleSoundCloudSets.map((set, index) => (
              <article
                key={set.href}
                className="rounded-2xl border border-white/8 bg-black/20 px-5 py-5"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-sm font-black text-white">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <p className="mb-1 text-lg font-semibold text-white">{set.title}</p>
                    <p className="text-sm uppercase tracking-[0.28em] text-gray-400">
                      {set.duration ? `${set.date} · ${set.duration}` : set.date}
                    </p>
                  </div>
                </div>

                <iframe
                  title={set.title}
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  loading="lazy"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(set.href)}&color=%23c026d3&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true`}
                  className="w-full rounded-xl border border-white/10"
                />

                <a
                  href={set.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] text-purple-300 transition hover:text-pink-200"
                >
                  Open on SoundCloud
                </a>
              </article>
            ))}
          </div>

          {soundCloudSets.length > initialSoundCloudCount && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowAllSoundCloud((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-full border border-red-400/40 bg-black/25 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-100 transition hover:border-red-300/70 hover:bg-black/40"
              >
                {showAllSoundCloud ? 'Show less' : `Show more (${soundCloudSets.length - visibleSoundCloudSets.length})`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
