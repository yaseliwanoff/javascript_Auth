const loginBtn = document.getElementById("btn__login");
const form = document.querySelector(".form");
const errorMessage = document.querySelector(".error__message");
const inputs = form.querySelector("input");

inputs.forEach(input => {
  input.addEventListener("input", () => {
    errorMessage.classList.remove("active");
    errorMessage.textContent = "";
  })
})

const ERROR_MESSAGE_FORM = "Для логина введите данные";
const ERROR_MESSAGE_DATE = "Данные которые вы ввели являются не правильными или просто отсутствуют"

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  errorMessage.classList.toggle("active");

  // Получаем данные из формы
  const userEmail = validateInputsFields("string", document.getElementById("email"));
  const userPassword = validateInputsFields("string", document.getElementById("password"));

  if (!userEmail || !userPassword) {
    errorMessage.textContent = ERROR_MESSAGE_FORM;
    throw new Error("Не все поля найдены в форме");
  }

  try {
    // Проверяем наличие данных
    const sortedData = localStorage.getItem("userData");
    if (!sortedData) {
      errorMessage.textContent = "Пользователь был не найден. Зарегестрируйтесь";
      return;
    }

    // Парсим данные
    const userData = JSON.parse(sortedData);

    if (userEmail !== userData.email || userPassword !== userData.password) {
      errorMessage.textContent = ERROR_MESSAGE_DATE;
    }

    console.log("Успешная авторизация");
  } catch (error) {
    console.error(`Ошибка входа: ${error}`);
    errorMessage.textContent = ERROR_MESSAGE_FORM;
  }
})
