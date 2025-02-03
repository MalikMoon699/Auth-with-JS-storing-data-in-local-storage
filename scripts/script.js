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
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstname: firstname.value,
          email: email.value,
          password: password.value,
        })
      );
      window.location.assign("rejistered.html");
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
      errors.push("Firstname is required");
      firstname.parentElement.classList.add("incorrect");
    }
    if (email.value.trim() === "") {
      errors.push("Email is required");
      email.parentElement.classList.add("incorrect");
    }
    if (password.value.trim() === "") {
      errors.push("Password is required");
      password.parentElement.classList.add("incorrect");
    }

    if (errors.length > 0) {
      error_message.innerText = errors.join(" ");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.firstname === firstname.value &&
      storedUser.email === email.value &&
      storedUser.password === password.value
    ) {
      window.location.assign("rejistered.html");
      form.reset();
    } else {
      error_message.innerHTML = "Don't have an account? ";
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
