// Импорт основных зависимостей React
import React from "react";
// Импорт методов для работы с DOM
import ReactDOM from "react-dom/client";
// Импорт глобальных стилей
import "./index.css";
// Главный компонент приложения
import App from "./App";

// Создание корневого DOM-элемента для рендеринга приложения
const root = ReactDOM.createRoot(document.getElementById("root"));
// Рендеринг основного компонента приложения
root.render(
  // Режим StrictMode для дополнительных проверок в разработке
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
