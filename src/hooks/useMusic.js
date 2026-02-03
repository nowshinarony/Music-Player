import { useState } from "react";

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

export const UseMusic = () => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,setDuration] = useState(0);

  const handlePlaySong = (songs, index) => {
    setCurrentTrack(songs);
    setCurrentTrackIndex(index);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    allSongs,
    handlePlaySong,
    currentTrack,
    currentTrackIndex,
    setCurrentTime,
    currentTime,
    formatTime,
    currentTime,
    duration
  };
};
