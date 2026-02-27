import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as HeartIcon } from "../assets/icons/heart.svg";
import "../styles/navigation.css";

const Navigation = ({ isLoggedIn }) => (
  <nav className="left-navigation">
    {/* Главный раздел */}
    <div className="nav-section main-section">
      <NavLink
        to="/"
        className={({ isActive }) => 
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <HomeIcon className="nav-icon" />
        <span>Главное</span>
        <div className="active-indicator"></div>
      </NavLink>

      <NavLink 
        to="/search" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        <SearchIcon className="nav-icon" />
        <span>Поиск</span>
        <div className="active-indicator"></div>
      </NavLink>
    </div>

    {/* Плейлисты */}
    <div className="nav-section playlist-section">
      <NavLink
        to="/favorites"
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        <HeartIcon className="nav-icon" />
        <span>Избранное</span>
        <div className="active-indicator"></div>
      </NavLink>
    </div>

    {/* Ссылки авторизации */}
    {!isLoggedIn && (
      <div className="nav-section auth-section">
        <NavLink 
          to="/login"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <span>Вход</span>
        </NavLink>
        <NavLink 
          to="/register"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <span>Регистрация</span>
        </NavLink>
      </div>
    )}
  </nav>
);

export default Navigation;