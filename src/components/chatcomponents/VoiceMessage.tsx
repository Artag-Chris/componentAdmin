import { useEffect, useRef, useState } from "react";

export const VoiceMessage: React.FC<{
    src: {
      message: { data: ArrayBufferLike };
      type: string;
    };
    direction: "outgoing" | "incoming";
  }> = ({ src, direction }) => {
    const url = URL.createObjectURL(
      new Blob([new Uint8Array(src.message.data)], { type: "audio/mpeg" })
    );
  
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
  
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.addEventListener("ended", handleEnded);
      }
    }, [audioRef]);
  
    const togglePlay = () => {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    };
  
    const handleEnded = () => {
      setIsPlaying(false);
    };
  
    return (
      <div
        className={`flex items-center space-x-2 ${
          direction === "outgoing" ? "justify-end" : "justify-start"
        }`}
      >
        <audio src={url} controls preload="auto">
          <source src={url} type="audio/mpeg" />
          Tu navegador no soporta el audio.
        </audio>
      </div>
    );
  };