import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as UserIcon } from "../assets/icons/user.svg";
import "../styles/user-menu.css";

const UserMenu = ({ isLoggedIn: propsIsLoggedIn, onLogout: propsOnLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Закрытие меню при клике вне области
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    propsOnLogout(); // Вызов пропса для обновления состояния в App.js
    setIsOpen(false);
    // Дополнительная логика выхода (например, очистка токена)
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Меню пользователя"
      >
        <UserIcon className="user-icon" />
        <span className="user-label">Аккаунт</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {/* Пункты меню для авторизованных пользователей */}
          {propsIsLoggedIn ? (
            <>
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate('/profile');
                  setIsOpen(false);
                }}
              >
                Профиль
              </button>
              <button className="dropdown-item" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            // Пункты меню для гостей
            <>
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate('/login');
                  setIsOpen(false);
                }}
              >
                Войти
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate('/register');
                  setIsOpen(false);
                }}
              >
                Регистрация
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;