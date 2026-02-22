import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

interface Shard {
  id: number;
  vx: number;
  vy: number;
  rotation: number;
  duration: number;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [splashPhase, setSplashPhase] = useState<'fullscreen' | 'fading' | 'background'>('fullscreen');
  const [shards, setShards] = useState<Shard[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState<string[]>([]);

  useEffect(() => {
    // After 9 seconds, fade out completely and hide X
    const fadeTimer = setTimeout(() => {
      setSplashPhase('fading');
      setIsVisible(false);
      onComplete();
    }, 9000);

    // Letters appear sequentially while X is visible
    const letters = ['A', 'N', 'D', 'I'];
    const letterTimers = letters.map((letter, index) => 
      setTimeout(() => {
        setVisibleLetters(prev => [...prev, letter]);
      }, 1500 + (index * 500))
    );

    return () => {
      clearTimeout(fadeTimer);
      letterTimers.forEach(timer => clearTimeout(timer));
    };
  }, [onComplete]);

  useEffect(() => {
    // Hide X when hovering for 0.5 seconds
    if (isHovering) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(hideTimer);
    } else {
      setIsVisible(true);
    }
  }, [isHovering]);

  const handleXClick = () => {
    if (splashPhase === 'background' && shards.length === 0) {
      // Create glass shard particles
      const newShards: Shard[] = [];
      const shardCount = 16;
      
      for (let i = 0; i < shardCount; i++) {
        const angle = (i / shardCount) * Math.PI * 2;
        const velocity = 3 + Math.random() * 4;
        
        newShards.push({
          id: i,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 1.5,
          rotation: Math.random() * 360,
          duration: 1.5 + Math.random() * 0.5
        });
      }
      
      setShards(newShards);
      
      // Clear shards after animation completes
      setTimeout(() => {
        setShards([]);
      }, 2500);
    }
  };

  return (
    <div
      className={`fixed inset-0 top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] transition-all duration-1000 pointer-events-none ${
        splashPhase === 'fullscreen'
          ? 'bg-dark-900 opacity-100'
          : splashPhase === 'fading'
          ? 'bg-dark-900/50 opacity-50'
          : 'bg-transparent opacity-0'
      }`}
    >
      {/* Glass shards */}
      {shards.map((shard) => (
        <div
          key={shard.id}
          className="fixed pointer-events-none"
          style={{
            left: 'calc(50% - 8px)',
            top: 'calc(5rem + 64px)',
            width: '16px',
            height: '16px',
            animation: `shardExplode ${shard.duration}s ease-out forwards`,
            '--shard-vx': `${shard.vx}`,
            '--shard-vy': `${shard.vy}`,
            '--shard-rotation': `${shard.rotation}`,
          } as React.CSSProperties & { '--shard-vx': string; '--shard-vy': string; '--shard-rotation': string }}
        >
          <div
            className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-sm"
            style={{
              boxShadow: '0 0 8px rgba(168, 85, 247, 0.8)',
              transform: `rotate(${shard.rotation}deg)`,
              opacity: 0.8
            }}
          />
        </div>
      ))}

      {/* Main X Container */}
      {shards.length === 0 && isVisible && !isHovering && (
        <div
          className={`relative flex items-center justify-center transition-opacity duration-300 ${
            splashPhase === 'fullscreen'
              ? 'w-80 h-80'
              : splashPhase === 'fading'
              ? 'w-80 h-80'
              : 'w-32 h-32 fixed top-20 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer'
          }`}
          onClick={handleXClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Animated X with Advanced Neon Tube Effects */}
          <svg
            width={splashPhase === 'background' ? '128' : '300'}
            height={splashPhase === 'background' ? '128' : '300'}
            viewBox="0 0 150 150"
            className={splashPhase === 'fullscreen' || splashPhase === 'fading' ? 'animate-fade-in-scale' : ''}
            style={{
              filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.8))',
              opacity: splashPhase === 'background' ? 0.4 : 1
            }}
          >
            <defs>
              {/* Neon Tube Gradients */}
              <linearGradient id="neon-tube-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff006e" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
                <stop offset="75%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="100%" stopColor="#ff006e" stopOpacity="0.8" />
              </linearGradient>
              
              <linearGradient id="neon-tube-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff006e" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
                <stop offset="75%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="100%" stopColor="#ff006e" stopOpacity="0.8" />
              </linearGradient>
              
              {/* Glow Filter for Neon */}
              <filter id="neon-tube-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Diagonal line 1 - Outer shadow tube (3D depth) */}
            <line
              x1="20"
              y1="20"
              x2="130"
              y2="130"
              stroke="rgba(0, 0, 0, 0.3)"
              strokeWidth="18"
              strokeLinecap="round"
              opacity="0.5"
            />
            
            {/* Diagonal line 1 - Core neon tube */}
            <line
              x1="20"
              y1="20"
              x2="130"
              y2="130"
              stroke="url(#neon-tube-1)"
              strokeWidth="14"
              strokeLinecap="round"
              filter="url(#neon-tube-glow)"
              className={splashPhase === 'background' ? '' : 'animate-draw-vertical'}
            />
            
            {/* Diagonal line 1 - Inner bright core */}
            <line
              x1="20"
              y1="20"
              x2="130"
              y2="130"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.6"
              className={splashPhase === 'background' ? '' : 'animate-draw-vertical'}
            />
            
            {/* Diagonal line 2 - Outer shadow tube (3D depth) */}
            <line
              x1="130"
              y1="20"
              x2="20"
              y2="130"
              stroke="rgba(0, 0, 0, 0.3)"
              strokeWidth="18"
              strokeLinecap="round"
              opacity="0.5"
            />
            
            {/* Diagonal line 2 - Core neon tube */}
            <line
              x1="130"
              y1="20"
              x2="20"
              y2="130"
              stroke="url(#neon-tube-2)"
              strokeWidth="14"
              strokeLinecap="round"
              filter="url(#neon-tube-glow)"
              className={splashPhase === 'background' ? '' : 'animate-draw-horizontal'}
            />
            
            {/* Diagonal line 2 - Inner bright core */}
            <line
              x1="130"
              y1="20"
              x2="20"
              y2="130"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.6"
              className={splashPhase === 'background' ? '' : 'animate-draw-horizontal'}
            />
          </svg>
        </div>
      )}

      {/* Letters positioned around X - as neon tubes */}
    </div>
  );
}
