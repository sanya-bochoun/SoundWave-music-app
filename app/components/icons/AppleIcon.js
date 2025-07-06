import React from "react";

export default function AppleIcon({ className = "", width, height, ...props }) {
  return (
    <svg
      className={className}
      width={width || "1em"}
      height={height || "1em"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="apple-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path
        d="M19.56 13.22c-.02-2.14 1.75-3.16 1.83-3.21-1-1.46-2.56-1.66-3.11-1.68-1.32-.13-2.58.77-3.25.77-.67 0-1.7-.75-2.8-.73-1.44.02-2.77.84-3.51 2.13-1.5 2.6-.38 6.45 1.07 8.56.71 1.03 1.56 2.19 2.67 2.15 1.08-.04 1.49-.7 2.8-.7 1.31 0 1.68.7 2.8.68 1.16-.02 1.89-1.05 2.6-2.08.82-1.19 1.16-2.34 1.18-2.4-.03-.01-2.27-.87-2.29-3.45zm-2.7-6.3c.6-.73 1-1.75.89-2.77-.86.03-1.9.57-2.52 1.3-.55.64-1.04 1.66-.86 2.64.91.07 1.85-.46 2.49-1.17z"
        fill="url(#apple-gradient)"
      />
    </svg>
  );
}