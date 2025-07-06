import { Music } from "lucide-react";

export default function AppLogo({ showText = true, className = "", onClick }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`} onClick={onClick} style={{cursor: onClick ? "pointer" : undefined}}>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
        <Music className="h-8 w-8 text-white" />
      </div>
      {showText && (
        <span className="text-xl font-bold gradient-text">SoundWave</span>
      )}
    </div>
  );
}