import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import './styles/sections.css';
import "./App.css";
import Player from "./components/Player";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import AlbumPage from "./pages/AlbumPage";
import { tracks } from "./data/tracks";
import GenrePage from './pages/GenrePage';
import UserMenu from "./components/UserMenu";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Обертка для передачи пропсов
const withProps = (Component, props) => {
  return <Component {...props} />;
};

function App() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние авторизации

  // Функция для получения избранных треков с сервера
  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/favorites', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        const favorites = await response.json();
        setFavorites(new Set(favorites.map(track => track.id)));
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  // Загрузка избранных треков при входе пользователя
  useEffect(() => {
    if (isLoggedIn) {
      fetchFavorites();
    }
  }, [isLoggedIn]);

  // Функция для добавления или удаления трека из избранного
  const toggleFavorite = async (trackId) => {
    const method = favorites.has(trackId) ? 'DELETE' : 'POST';

    try {
      const response = await fetch(`/api/favorites/${trackId}`, {
        method,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        // Обновляем состояние после успешного запроса
        setFavorites(prev => {
          const newSet = new Set(prev);
          method === 'POST'
            ? newSet.add(trackId)
            : newSet.delete(trackId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Favorite toggle error:', error);
    }
  };

  // Общие пропсы для всех страниц
  const commonProps = {
    tracks,
    trackIndex,
    setTrackIndex,
    favorites,
    toggleFavorite,
    isLoggedIn,
    setIsLoggedIn
  };

  return (
    <HashRouter basename="/music-player">
      <div className="App">
        {/* Передаем isLoggedIn в Navigation */}
        <Navigation isLoggedIn={isLoggedIn} />

        <main className="content">
          <div className="header">
            <UserMenu
              isLoggedIn={isLoggedIn}
              onLogout={() => setIsLoggedIn(false)}
            />
          </div>

          <Routes>
            <Route path="/" element={withProps(Home, commonProps)} />
            <Route path="/search" element={withProps(Search, commonProps)} />
            <Route
              path="/favorites"
              element={<Favorites {...commonProps} tracks={tracks.filter(t => favorites.has(t.id))} />}
            />
            <Route
              path="/album/:albumId"
              element={withProps(AlbumPage, commonProps)}
            />
            <Route
              path="/genre/:genreName"
              element={withProps(GenrePage, commonProps)}
            />
            <Route path="/profile" element={withProps(Profile, commonProps)} />
            <Route path="/login" element={withProps(Login, commonProps)} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <Player
          tracks={tracks}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </HashRouter>
  );
}

export default App;