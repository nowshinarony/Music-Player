import { useEffect, useRef } from "react";
import { UseMusic } from "../hooks/useMusic";

export const MusicPlayer = () => {
  const {
    currentTrack,
    formatTime,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    nextTrack,
    previousTrack,
    play,
    pause,
    isPlaying,
  } = UseMusic();

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error(err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {};

    // To be able to subscribe to handleLoadedMetadata we need an eventlistener
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    // every time we do event listener in useEffect we also need to clean it when it unmounts which happens through return function
    // Otherwise it keep playing in the background and causes memory issues

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [setDuration, setCurrentTime, currentTrack]);

  return (
    <div className="music-player ">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="metadata"
        crossOrigin="anonymous"
      />

      <div className="track-info">
        <h3 className="track-title">{currentTrack.title}</h3>
        <p className="track-artist">{currentTrack.artist}</p>
      </div>

      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime || 0}
          className="progress-bar"
          // style={ }
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="controls">
        <button className="control-btn" onClick={previousTrack}>
          ⏮
        </button>
        <button
          className="control-btn play-btn"
          onClick={() => (isPlaying ? pause() : play())}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="control-btn" onClick={nextTrack}>
          ⏭
        </button>
      </div>
    </div>
  );
};
