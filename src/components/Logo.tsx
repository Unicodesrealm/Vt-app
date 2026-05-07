import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 600 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      id="vt-logo-monochrome"
    >
      {/* V Character */}
      <path 
        d="M100 80H180L260 320H180L100 80Z" 
        fill="#71717A" 
      />
      <path 
        d="M340 80H260L180 320H260L340 80Z" 
        fill="#52525B" 
      />

      {/* T Character */}
      <path 
        d="M360 80H580V120H480V320H400V120H360V80Z" 
        fill="#71717A" 
      />

      {/* The Dynamic Swoosh - Simplified Monochrome */}
      <path 
        d="M200 320C200 320 260 80 580 85V140C420 140 320 240 300 320H200Z" 
        fill="#52525B" 
      />

      {/* 15 Anos Branding - Simplified */}
      <g transform="translate(485, 230)">
        <text 
          x="0" 
          y="50" 
          fill="#52525B" 
          style={{ font: 'italic 900 100px sans-serif', letterSpacing: '-6px' }}
        >
          15
        </text>
        <text 
          x="35" 
          y="85" 
          fill="#71717A" 
          style={{ font: 'bold 32px sans-serif' }}
        >
          Anos
        </text>
      </g>

      <text 
        x="130" 
        y="380" 
        className="fill-current text-zinc-600"
        style={{ font: '500 72px sans-serif', letterSpacing: '-2px' }}
      >
        Vocação Técnica, Lda
      </text>
    </svg>
  );
};
