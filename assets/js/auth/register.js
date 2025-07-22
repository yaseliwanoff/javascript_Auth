const registerBtn = document.getElementById("btn__register");
const form = document.querySelector(".form");
const errorMessage = document.querySelector(".error__message");
const inputs = form.querySelectorAll('input');

inputs.forEach(input => {
  input.addEventListener('input', () => {
    errorMessage.classList.remove("active");
    errorMessage.textContent = "";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.classList.toggle("active");

  try {
    // Получение значений полей из формы
    const nameField = document.getElementById("name");
    const surnameField = document.getElementById("surname");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password1");
    const confirmPassword = document.getElementById("password2");

    // Проверка на существование полей
    if (!nameField || !surnameField || !emailField || !passwordField || !confirmPassword) {
      throw new Error("Не все поля найдены в форме");
    }

    // Проверка на пустые поля
    if (
      !nameField.value.trim() || 
      !surnameField.value.trim() || 
      !emailField.value.trim() || 
      !passwordField.value.trim() || 
      !confirmPassword.value.trim()
    ) {
      errorMessage.textContent = "Заполните все поля чтобы продолжить";
      errorMessage.classList.add("active");
      return;
    }

    // Валидация данных (теперь правильно передаём параметры)
    if (!isValidData(nameField, "text")) {
      errorMessage.textContent = "Имя содержит недопустимые символы";
      errorMessage.classList.add("active");
      return;
    }

    if (!isValidData(surnameField, "text")) {
      errorMessage.textContent = "Фамилия содержит недопустимые символы";
      errorMessage.classList.add("active");
      return;
    }

    if (!isValidData(emailField, "email")) {
      errorMessage.textContent = "Email не соответствует формату";
      errorMessage.classList.add("active");
      return;
    }

    if (!isValidData(passwordField, "password", { minLength: 6, requireSpecial: true })) {
      errorMessage.textContent = "Пароль должен содержать минимум 6 символов, включая цифры, заглавные и спецсимволы";
      errorMessage.classList.add("active");
      return;
    }

    // Сравнение паролей
    const password = validateInputsFields("string", passwordField);
    const confirm = validateInputsFields("string", confirmPassword);
    
    if (password !== confirm) {
      errorMessage.textContent = "Пароли не совпадают";
      errorMessage.classList.add("active");
      return;
    }

    // Если все проверки пройдены
    const userData = {
      userName: validateInputsFields("string", nameField),
      userSurname: validateInputsFields("string", surnameField),
      email: validateInputsFields("string", emailField),
      password: validateInputsFields("string", passwordField),
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    
    // Отправка формы
    form.submit();

  } catch (error) {
    console.error("Ошибка валидации:", error);
    errorMessage.textContent = "Произошла ошибка при проверке данных";
    errorMessage.classList.add("active");
  }
});
