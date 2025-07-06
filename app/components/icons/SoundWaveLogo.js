import { Music } from "lucide-react";

export default function AppLogo({ showText = true, className = "" }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
        <Music className="h-6 w-6 text-white" />
      </div>
      {showText && (
        <span className="text-xl font-bold gradient-text">SoundWave</span>
      )}
    </div>
  );
}