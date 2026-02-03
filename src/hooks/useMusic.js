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

  return { allSongs };
};
