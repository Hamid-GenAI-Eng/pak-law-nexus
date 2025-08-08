import { useState, useEffect } from 'react';

interface AnimatedLogoProps {
  onComplete?: () => void;
  trigger?: boolean;
}

const AnimatedLogo = ({ onComplete, trigger = false }: AnimatedLogoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    // Check if animation has already played this session
    const hasPlayedThisSession = localStorage.getItem('wukala-logo-played') === 'true';
    
    if (!hasPlayedThisSession || trigger) {
      setIsVisible(true);
      setHasPlayed(false);
      
      // Mark as played in localStorage
      if (!trigger) {
        localStorage.setItem('wukala-logo-played', 'true');
      }
      
      // Complete animation after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setHasPlayed(true);
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // If already played, immediately show main content
      setHasPlayed(true);
      onComplete?.();
    }
  }, [trigger, onComplete]);

  if (hasPlayed && !isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Animated Logo SVG */}
      <div className="relative">
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          className="animate-fade-in"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
          }}
        >
          {/* Circuit Lines - Animated from left */}
          <g className="opacity-90">
            {[0, 1, 2, 3, 4].map((index) => (
              <g key={index}>
                <path
                  d={`M 20 ${80 + index * 15} L 80 ${80 + index * 15}`}
                  stroke="url(#circuitGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="animate-[stroke-draw_0.8s_ease-out_forwards]"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                />
                <circle
                  cx={20 + index * 15}
                  cy={80 + index * 15}
                  r="3"
                  fill="url(#goldGradient)"
                  opacity="0"
                  className="animate-[fade-in_0.3s_ease-out_forwards]"
                  style={{
                    animationDelay: `${0.5 + index * 0.1}s`
                  }}
                />
              </g>
            ))}
          </g>

          {/* Main "W" Letter */}
          <g transform="translate(120, 40)">
            <path
              d="M 0 20 L 20 120 L 40 60 L 60 120 L 80 20"
              stroke="url(#goldGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="300"
              strokeDashoffset="300"
              className="animate-[stroke-draw_1.2s_ease-out_forwards]"
              style={{
                animationDelay: '0.3s'
              }}
            />
            {/* W Fill Animation */}
            <path
              d="M 0 20 L 20 120 L 40 60 L 60 120 L 80 20 Z"
              fill="url(#goldGradient)"
              opacity="0"
              className="animate-[fade-in_0.5s_ease-out_forwards]"
              style={{
                animationDelay: '1.2s'
              }}
            />
          </g>

          {/* Arabic Calligraphy Circle */}
          <g transform="translate(250, 60)">
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="url(#goldGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="220"
              strokeDashoffset="220"
              className="animate-[stroke-draw_1s_ease-out_forwards]"
              style={{
                animationDelay: '0.8s'
              }}
            />
            {/* Arabic Text Simulation */}
            <g opacity="0" className="animate-[fade-in_0.5s_ease-out_forwards]" style={{ animationDelay: '1.5s' }}>
              <path
                d="M 25 30 Q 40 20 55 30 Q 50 40 40 45 Q 30 40 25 30"
                fill="url(#goldGradient)"
              />
              <path
                d="M 30 50 Q 40 45 50 50 Q 45 55 40 55 Q 35 55 30 50"
                fill="url(#goldGradient)"
              />
            </g>
          </g>

          {/* Title Text */}
          <text
            x="200"
            y="200"
            textAnchor="middle"
            className="text-3xl font-bold"
            fill="url(#goldGradient)"
            opacity="0"
            style={{
              fontFamily: 'serif',
              letterSpacing: '2px'
            }}
          >
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.8s"
              begin="1.5s"
              fill="freeze"
            />
            Wukala-GPT
          </text>

          {/* Subtitle */}
          <text
            x="200"
            y="230"
            textAnchor="middle"
            className="text-sm"
            fill="rgba(255, 255, 255, 0.8)"
            opacity="0"
            style={{
              fontFamily: 'sans-serif',
              letterSpacing: '1px'
            }}
          >
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.5s"
              begin="1.8s"
              fill="freeze"
            />
            Pakistan Law Nexus
          </text>

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffed4e" stopOpacity="1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
            </linearGradient>
            
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glowing Effect */}
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
            animationDuration: '2s'
          }}
        />
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes stroke-draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @media (max-width: 640px) {
          svg {
            width: 300px;
            height: 225px;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;