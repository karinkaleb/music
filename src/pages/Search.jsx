import { useState, useEffect, useCallback } from "react";
import { 
  useNavigate, 
  useSearchParams 
} from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import "../styles/search.css";

const genres = [
  "Поп", "Хип-поп", "Классика", "Романтика",
  "Спокойная", "Мотивация", "Природа", "Радостно",
  "Тренировка", "Танцпоп", "Рок", "Электроника"
];

const Search = ({ 
  tracks, 
  trackIndex, 
  setTrackIndex,
  favorites,
  toggleFavorite 
}) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
    genres: []
  });

  const navigate = useNavigate();

  const performSearch = useCallback((query) => {
    const lowerQuery = query.toLowerCase();
    const trackResults = tracks.filter(track =>
      track.title.toLowerCase().includes(lowerQuery) ||
      track.artist.toLowerCase().includes(lowerQuery) ||
      track.genre.toLowerCase().includes(lowerQuery)
    );
    
    setSearchResults({
      tracks: trackResults,
      genres: [],
      artists: []
    });
  }, [tracks]);

  const saveToHistory = useCallback((query) => {
    if(!query.trim()) return;
    const newHistory = [...new Set([query, ...searchHistory])].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  }, [searchHistory]);

  useEffect(() => {
    const query = searchParams.get("query");
    if(query) {
      setSearchQuery(query);
      performSearch(query);
    }
    
    const savedHistory = localStorage.getItem("searchHistory");
    if(savedHistory) setSearchHistory(JSON.parse(savedHistory));
  }, [searchParams, performSearch]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if(query.length > 2) {
      performSearch(query);
      saveToHistory(query);
    } else {
      setSearchResults({ tracks: [], artists: [], genres: [] });
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Искать треки, жанры, исполнителей..."
          value={searchQuery}
          onChange={handleSearch}
          className="modern-search"
        />
      </div>

      {searchQuery.length < 3 ? (
        <div className="search-content">
          {searchHistory.length > 0 && (
            <div className="search-section">
              <h2>Недавние поисковые запросы</h2>
              <div className="history-grid">
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className="search-history-item"
                    onClick={() => setSearchQuery(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="search-section">
            <h2>Все жанры</h2>
            <div className="genres-grid">
              {genres.map((genre) => (
                <div
                  key={genre}
                  className="genre-card"
                  style={{ backgroundColor: getCategoryColor(genre) }}
                  onClick={() => navigate(`/genre/${genre}`)}
                >
                  <span className="genre-title">{genre}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="search-results">
          {searchResults.tracks.length > 0 && (
            <div className="search-section">
              <h2>Найденные треки</h2>
              <div className="tracks-grid">
                {searchResults.tracks.map((track) => (
                  <div
                    key={track.id}
                    className="track-card"
                    onClick={() => {
                      const globalIndex = tracks.findIndex(t => t.id === track.id);
                      if (globalIndex !== -1) setTrackIndex(globalIndex);
                    }}
                  >
                    <img src={track.cover} alt={track.title} />
                    <h3>{track.title}</h3>
                    <p>{track.artist}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const getCategoryColor = (name) => {
  const colors = {
    "Поп": "#FF6B6B",
    "Хип-поп": "#4ECDC4",
    "Классика": "#45B7D1",
    "Романтика": "#FF9F43",
    "Спокойная": "#2ECC71",
    "Мотивация": "#F368E0",
    "Природа": "#1DD1A1",
    "Радостно": "#5F27CD",
    "Тренировка": "#54A0FF",
    "Танцпоп": "#FF6B6B",
    "Рок": "#2D3436",
    "Электроника": "#A55EEA"
  };
  return colors[name] || "#38bdf8";
};

export default Search;