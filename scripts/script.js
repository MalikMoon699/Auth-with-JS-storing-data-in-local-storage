const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repeat_password = document.getElementById("repeat-password");
const error_message = document.getElementById("error-message");
const signUpBtn = document.getElementById("signUpBtn");
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");

const registration = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const getSignupFormErrors = (
      firstnameValue,
      emailValue,
      passwordValue,
      repeatPasswordValue
    ) => {
      let errors = [];

      document
        .querySelectorAll(".incorrect")
        .forEach((el) => el.classList.remove("incorrect"));

      if (firstnameValue.trim() === "") {
        errors.push("Firstname is required");
        firstname.parentElement.classList.add("incorrect");
      }
      if (emailValue.trim() === "") {
        errors.push("Email is required");
        email.parentElement.classList.add("incorrect");
      }
      if (passwordValue.trim() === "") {
        errors.push("Password is required");
        password.parentElement.classList.add("incorrect");
      }
      if (passwordValue.length < 8) {
        errors.push("Password must have at least 8 characters");
        password.parentElement.classList.add("incorrect");
      }
      if (passwordValue !== repeatPasswordValue) {
        errors.push("Passwords do not match");
        password.parentElement.classList.add("incorrect");
        repeat_password.parentElement.classList.add("incorrect");
      }

      error_message.innerText = errors.join(" ");
      return errors;
    };

    let errors = getSignupFormErrors(
      firstname.value,
      email.value,
      password.value,
      repeat_password.value
    );

    if (errors.length === 0) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.some((user) => user.email === email.value)) {
        error_message.innerText = "Email already registered";
        email.parentElement.classList.add("incorrect");
        return;
      }

      users.push({
        firstname: firstname.value,
        email: email.value,
        password: password.value,
      });

      localStorage.setItem("users", JSON.stringify(users));
      window.location.assign("register.html");
      form.reset();
    }
  });
};

const login = () => {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let errors = [];
    document
      .querySelectorAll(".incorrect")
      .forEach((el) => el.classList.remove("incorrect"));

    if (firstname.value.trim() === "") {
      errors.push("Name is required");
      email.parentElement.classList.add("incorrect");
    }
    if (email.value.trim() === "") {
      errors.push("Email is required");
      email.parentElement.classList.add("incorrect");
    }
    if (password.value.trim() === "" || password.value.length < 8) {
      errors.push("Password must have at least 8 characters");
      password.parentElement.classList.add("incorrect");
    }

    if (errors.length > 0) {
      error_message.innerText = errors.join(" ");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const storedUser = users.find((user) => user.email === email.value);

    if (
      storedUser &&
      storedUser.firstname === firstname.value &&
      storedUser.email === email.value &&
      storedUser.password === password.value
    ) {
      localStorage.setItem("users", JSON.stringify(users));
      window.location.assign("register.html");
      form.reset();

      window.location.assign("register.html");
      loginForm.reset();
    } else {
      error_message.innerHTML = "Invalid email or password. ";
      go();
      firstname.parentElement.classList.add("incorrect");
      email.parentElement.classList.add("incorrect");
      password.parentElement.classList.add("incorrect");
    }
  });
};

const go = () => {
  let a = document.createElement("a");
  a.textContent = "Sign Up here";
  a.href = "signup.html";
  error_message.appendChild(a);
};
