const KittyLogo = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="kitty-bob">
      {/* ears */}
      <path d="M13 20 L11 7 L22 15 Z" fill="hsl(348 70% 97%)" stroke="hsl(325 30% 24%)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M35 20 L37 7 L26 15 Z" fill="hsl(348 70% 97%)" stroke="hsl(325 30% 24%)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14.5 17 L13.8 10.5 L19 14.5 Z" fill="hsl(344 66% 86%)" />
      <path d="M33.5 17 L34.2 10.5 L29 14.5 Z" fill="hsl(344 66% 86%)" />

      {/* face */}
      <ellipse cx="24" cy="27" rx="14" ry="12" fill="hsl(348 70% 97%)" stroke="hsl(325 30% 24%)" strokeWidth="1.6" />

      {/* whiskers */}
      <g stroke="hsl(325 30% 24%)" strokeWidth="1.1" strokeLinecap="round">
        <line x1="6" y1="26" x2="13" y2="26.5" />
        <line x1="6" y1="30" x2="13" y2="29" />
        <line x1="42" y1="26" x2="35" y2="26.5" />
        <line x1="42" y1="30" x2="35" y2="29" />
      </g>

      {/* eyes */}
      <g className="kitty-eyes" fill="hsl(325 30% 24%)">
        <ellipse cx="19" cy="27" rx="1.5" ry="2.2" />
        <ellipse cx="29" cy="27" rx="1.5" ry="2.2" />
      </g>

      {/* nose */}
      <path d="M24 31 L22.4 29 L25.6 29 Z" fill="hsl(340 58% 60%)" />

      {/* bow on the right ear */}
      <g transform="translate(32.5 6.5)">
        <path d="M0 0 L-5.5 -3.2 L-5.5 4.2 Z" fill="hsl(340 58% 62%)" stroke="hsl(325 30% 24%)" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M0 0 L5.5 -3.2 L5.5 4.2 Z" fill="hsl(340 58% 62%)" stroke="hsl(325 30% 24%)" strokeWidth="1.1" strokeLinejoin="round" />
        <circle cx="0" cy="0.5" r="1.9" fill="hsl(344 66% 76%)" stroke="hsl(325 30% 24%)" strokeWidth="1.1" />
      </g>

      {/* sparkle */}
      <path
        className="kitty-sparkle"
        d="M41 13 c0.55 2.3 1.5 3.25 3.8 3.8 -2.3 0.55 -3.25 1.5 -3.8 3.8 -0.55 -2.3 -1.5 -3.25 -3.8 -3.8 2.3 -0.55 3.25 -1.5 3.8 -3.8Z"
        fill="hsl(36 72% 64%)"
      />
    </g>
  </svg>
);

export default KittyLogo;
