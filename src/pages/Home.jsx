import React, { useState } from 'react';
import Playlist from "../components/Playlist";
import Section from "../components/Section";
import { tracks } from "../data/tracks";

const Home = ({ trackIndex, setTrackIndex, favorites, toggleFavorite }) => {
  // Группировка и преобразование альбомов
  const albums = tracks.reduce((acc, track) => {
    if (track.albumId) {
      acc[track.albumId] = acc[track.albumId] || [];
      acc[track.albumId].push(track);
    }
    return acc;
  }, {});

  const formattedAlbums = Object.entries(albums).map(([albumId, items]) => ({
    id: albumId,
    title: albumId,
    artist: items[0]?.artist,
    cover: items[0]?.cover,
    tracks: items
  }));

  // Состояния для управления отображением
  const [visibleAlbums, setVisibleAlbums] = useState({
    top: 5,
    forYou: 5,
    recent: 5
  });

  // Функция для переключения отображения
  const toggleShowAll = (section) => {
    setVisibleAlbums(prev => ({
      ...prev,
      [section]: prev[section] === formattedAlbums.length ? 5 : formattedAlbums.length
    }));
  };

  return (
    <div className="home-page">
      {/* Секция "Только хиты" */}
      <Section
        title="Только хиты"
        items={formattedAlbums.slice(0, visibleAlbums.top)}
        onShowAll={() => toggleShowAll('top')}
        showAll={visibleAlbums.top === formattedAlbums.length}
        totalItems={formattedAlbums.length}
      />

      {/* Аналогичные обновления для других секций */}
      
      <Playlist
        tracks={tracks}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default Home;