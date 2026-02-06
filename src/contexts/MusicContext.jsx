import { createContext, useContext, useState } from "react";

const MusicContext = createContext();

const songs = [
  {
    id: 1,
    title: "Honey Kisses",
    artist: "DeltaX",
    url: "/songs/honey-kisses.mp3",
    duration: "2:36",
  },

  {
    id: 2,
    title: "lo-fi music loop",
    artist: "Sonican",
    url: "/songs/lo-fi-music-loop.mp3",
    duration: "1:40",
  },

  {
    id: 3,
    title: "Night Summer Lounge",
    artist: "Bransboynd",
    url: "/songs/night-summer-lounge.mp3",
    duration: "1:41",
  },

  {
    id: 4,
    title: "Sweet life luxury chill",
    artist: "Alex Grohl",
    url: "/songs/sweet-life-luxury-chill.mp3",
    duration: "1:42",
  },
];

export const MusicProvider = ({ children }) => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  //   Playlist logic
  const [playlists, setPlaylists] = useState([]);

  const handlePlaySong = (songs, index) => {
    setCurrentTrack(songs);
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allSongs.length;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const previousTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const createPlaylist = (name) => {
    const createNewPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    };

    setPlaylists((prev) => [...prev, createNewPlaylist]);
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, song: [...playlist.songs, song] };
        } else {
          return playlist;
        }
      }),
    );
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        handlePlaySong,
        currentTrack,
        currentTrackIndex,
        setCurrentTime,
        currentTime,
        formatTime,
        currentTime,
        duration,
        setDuration,
        nextTrack,
        previousTrack,
        play,
        pause,
        isPlaying,
        volume,
        setVolume,
        createPlaylist,
        playlists,
        addSongToPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);

  if (!contextValue) {
    throw new Error("useMusic must be inside of MusicProvider");
  }

  return contextValue;
};
