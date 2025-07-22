# Auth System - Документация проекта
Проект представляет собой систему аутентификации (регистрация и вход) на чистом JavaScript с использованием localStorage для хранения данных пользователя.

## 📂 Структура проекта

```bash
auth-system/
├── index.html              # Главная страница
├── dashboard.html          # Защищенная страница (после входа)
├── assets/
│   ├── css/                 # Стили
│   │   └── main.css         # Шрифты
│   │   └── fonts.css        # Стили проекта
│   │   └── reset.css        # Сброс стилей
│   │   └── root.css         # Стили по умолчанию
│   └── js/
│       ├── auth/
│       │   ├── auth.js      # Логика входа
│       │   └── register.js  # Логика регистрации
│       └── utils/
│           └── helpers.js   # Валидация и утилиты
└── README.md                # Документация
```
## 🔧 Архитектура
1. auth.js — Логика входа <br>
___
Функционал:

Валидация полей email и пароль.
Проверка данных в localStorage.
Вывод ошибок при неверных данных.
Ключевые элементы:

```javascript
const ERROR_MESSAGE_FORM = "Для логина введите данные";
const ERROR_MESSAGE_DATA = "Неверные данные";

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  
  const userEmail = validateInputsFields("string", document.getElementById("email"));
  const userPassword = validateInputsFields("string", document.getElementById("password"));

  if (!userEmail || !userPassword) {
    showError(ERROR_MESSAGE_FORM);
    return;
  }

  const userData = JSON.parse(localStorage.getItem("userData"));
  
  if (!userData || userEmail !== userData.email || userPassword !== userData.password) {
    showError(ERROR_MESSAGE_DATA);
    return;
  }

  // Успешный вход
  window.location.href = "main.html";
});
```
2. register.js — Логика регистрации <br>
___

Функционал:

Валидация полей: имя, фамилия, email, пароль.
Проверка совпадения паролей.
Сохранение данных в localStorage.
Ключевые элементы:

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = validateInputsFields("string", document.getElementById("name"));
  const surname = validateInputsFields("string", document.getElementById("surname"));
  const email = validateInputsFields("string", document.getElementById("email"));
  const password = validateInputsFields("string", document.getElementById("password1"));
  const confirmPassword = validateInputsFields("string", document.getElementById("password2"));

  if (!isValidData(emailField, "email")) {
    showError("Некорректный email");
    return;
  }

  if (password !== confirmPassword) {
    showError("Пароли не совпадают");
    return;
  }

  const userData = { name, surname, email, password };
  localStorage.setItem("userData", JSON.stringify(userData));
  
  // Редирект после успешной регистрации
  window.location.href = "dashboard.html";
});
```
3. helpers.js — Валидация и утилиты <br>
___

Функционал:

Проверка типов данных (string, number).
Валидация email, пароля, текста.
Управление ошибками.
Основные функции:

```javascript
// Проверка email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Проверка пароля
function isValidPassword(password, options = { minLength: 6 }) {
  return password.length >= options.minLength;
}

// Вывод ошибки
function showError(message) {
  const errorElement = document.querySelector(".error__message");
  errorElement.textContent = message;
  errorElement.classList.add("active");
}
```

## 🚀 Запуск проекта

Склонируйте репозиторий:
```bash
git clone https://github.com/your-repo/auth-system.git
```
Откройте index.html в браузере (используйте Live Server в VS Code). <br>

## 🔒 Безопасность

Данные хранятся в localStorage (небезопасно для продакшена, только для учебных целей).
Пароль не шифруется (в реальном проекте используйте bcrypt + бекенд).
📌 Возможные улучшения

Добавить бекенд (Node.js + Express или Firebase).
Шифрование паролей (например, через CryptoJS).
Восстановление пароля (через email).
Капча для защиты от ботов.

___
Автор: Ярослав Селиванов <br>
Версия: 1.0.0

