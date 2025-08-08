import { useState, useEffect } from 'react';

interface AnimatedLogoProps {
  onComplete?: () => void;
  trigger?: boolean;
}

const AnimatedLogo = ({ onComplete, trigger = false }: AnimatedLogoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    console.log('AnimatedLogo useEffect triggered', { trigger });
    
    // For now, let's always show the animation to debug
    // Check if animation has already played this session
    const hasPlayedThisSession = localStorage.getItem('wukala-logo-played') === 'true';
    console.log('hasPlayedThisSession:', hasPlayedThisSession);
    
    // Clear localStorage for testing - remove this later
    localStorage.removeItem('wukala-logo-played');
    
    if (!hasPlayedThisSession || trigger) {
      console.log('Setting visible to true');
      setIsVisible(true);
      setHasPlayed(false);
      
      // Mark as played in localStorage
      if (!trigger) {
        localStorage.setItem('wukala-logo-played', 'true');
      }
      
      // Complete animation after 2 seconds
      const timer = setTimeout(() => {
        console.log('Animation complete, fading out');
        setIsVisible(false);
        setHasPlayed(true);
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // If already played, immediately show main content
      console.log('Animation already played, showing main content');
      setHasPlayed(true);
      onComplete?.();
    }
  }, [trigger, onComplete]);

  console.log('AnimatedLogo render:', { isVisible, hasPlayed });
  
  if (hasPlayed && !isVisible) {
    console.log('Component returning null');
    return null;
  }

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
      {/* Animated Logo SVG - Recreating the exact uploaded design */}
      <div className="relative">
        <svg
          width="500"
          height="350"
          viewBox="0 0 500 350"
          className="animate-fade-in"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))'
          }}
        >
          {/* Circuit Lines - Left side */}
          <g className="opacity-90">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <g key={index}>
                <path
                  d={`M 20 ${90 + index * 12} L 120 ${90 + index * 12}`}
                  stroke="#10b981"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="animate-[stroke-draw_1s_ease-out_forwards]"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                />
                <circle
                  cx={25 + index * 8}
                  cy={90 + index * 12}
                  r="4"
                  fill="url(#goldGradient)"
                  opacity="0"
                  className="animate-[fade-in_0.3s_ease-out_forwards]"
                  style={{
                    animationDelay: `${0.6 + index * 0.1}s`
                  }}
                />
              </g>
            ))}
          </g>

          {/* Main "W" Letter - Exact match to your design */}
          <g transform="translate(140, 60)">
            {/* Outer stroke first */}
            <path
              d="M 10 25 L 35 140 L 55 80 L 75 140 L 100 25"
              stroke="url(#goldGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="400"
              strokeDashoffset="400"
              className="animate-[stroke-draw_1.5s_ease-out_forwards]"
              style={{
                animationDelay: '0.4s'
              }}
            />
            {/* Inner fill with gradient */}
            <path
              d="M 15 30 L 35 130 L 55 75 L 75 130 L 95 30"
              stroke="none"
              fill="url(#innerGoldGradient)"
              opacity="0"
              className="animate-[fade-in_0.8s_ease-out_forwards]"
              style={{
                animationDelay: '1.4s'
              }}
            />
          </g>

          {/* Arabic Calligraphy Circle - Right side */}
          <g transform="translate(280, 70)">
            {/* Outer circle */}
            <circle
              cx="55"
              cy="55"
              r="50"
              stroke="url(#goldGradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="314"
              strokeDashoffset="314"
              className="animate-[stroke-draw_1.2s_ease-out_forwards]"
              style={{
                animationDelay: '1s'
              }}
            />
            {/* Inner decorative ring */}
            <circle
              cx="55"
              cy="55"
              r="42"
              stroke="rgba(255, 215, 0, 0.3)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="264"
              strokeDashoffset="264"
              className="animate-[stroke-draw_1s_ease-out_forwards]"
              style={{
                animationDelay: '1.2s'
              }}
            />
            {/* Arabic Calligraphy - Stylized representation */}
            <g opacity="0" className="animate-[fade-in_0.8s_ease-out_forwards]" style={{ animationDelay: '1.8s' }}>
              {/* Top Arabic text */}
              <path
                d="M 30 35 Q 45 25 60 30 Q 75 35 80 45 Q 75 40 65 42 Q 50 38 35 40 Q 25 42 30 35"
                fill="url(#goldGradient)"
              />
              {/* Middle Arabic text */}
              <path
                d="M 25 50 Q 40 45 55 50 Q 70 52 85 55 Q 80 60 70 58 Q 55 56 40 58 Q 25 60 25 50"
                fill="url(#goldGradient)"
              />
              {/* Bottom Arabic text */}
              <path
                d="M 35 70 Q 50 65 65 68 Q 75 70 80 75 Q 70 78 60 76 Q 45 74 35 76 Q 30 74 35 70"
                fill="url(#goldGradient)"
              />
              {/* Central dot */}
              <circle cx="55" cy="55" r="3" fill="url(#goldGradient)" />
            </g>
          </g>

          {/* Main Title - Wukala-GPT */}
          <text
            x="250"
            y="240"
            textAnchor="middle"
            className="text-4xl font-bold"
            fill="url(#goldGradient)"
            opacity="0"
            style={{
              fontFamily: 'serif',
              letterSpacing: '3px',
              fontWeight: 'bold'
            }}
          >
            <animate
              attributeName="opacity"
              values="0;1"
              dur="1s"
              begin="2s"
              fill="freeze"
            />
            Wukala-GPT
          </text>

          {/* Subtitle */}
          <text
            x="250"
            y="270"
            textAnchor="middle"
            className="text-base"
            fill="rgba(255, 255, 255, 0.9)"
            opacity="0"
            style={{
              fontFamily: 'sans-serif',
              letterSpacing: '2px'
            }}
          >
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.8s"
              begin="2.3s"
              fill="freeze"
            />
            Pakistan Law Nexus
          </text>

          {/* Enhanced Gradient Definitions */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
              <stop offset="30%" stopColor="#ffed4e" stopOpacity="1" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="1" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="1" />
            </linearGradient>
            
            <linearGradient id="innerGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="1" />
            </linearGradient>
            
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 215, 0, 0.3)" stopOpacity="1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Enhanced Glowing Effect */}
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
            animationDuration: '3s'
          }}
        />
        
        {/* Additional shine effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            animation: 'shine 3s ease-in-out infinite'
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
        
        @keyframes shine {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @media (max-width: 640px) {
          svg {
            width: 350px;
            height: 250px;
          }
        }
        
        @media (max-width: 480px) {
          svg {
            width: 280px;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;