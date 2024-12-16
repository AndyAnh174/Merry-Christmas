import React, { useRef, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import christmasSong from '../../assets/music/christmas-song.mp3';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = React.useState(false);

  useEffect(() => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play was prevented");
        });
      }
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      }
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={christmasSong}
        loop
        preload="auto"
      />
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 btn btn-circle btn-primary"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>
    </>
  );
};

export default AudioPlayer; 