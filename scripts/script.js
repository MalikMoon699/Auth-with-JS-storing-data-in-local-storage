const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repeat_password = document.getElementById("repeat-password");
const error_message = document.getElementById("error-message");
const signUpBtn = document.getElementById("signUpBtn");
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");

window.addEventListener("DOMContentLoaded", () => {
  const updateText = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const name = document.getElementById("nameMessage");
    const emailMsg = document.getElementById("emailMessage");

    if (loggedInUser) {
      if (name) name.textContent = loggedInUser.firstname;
      if (emailMsg) emailMsg.textContent = loggedInUser.email;
    }
  };

  updateText();
});

const registration = () => {
  if (!form) return;

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

      const newUser = {
        firstname: firstname.value,
        email: email.value,
        password: password.value,
      };

      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      window.location.assign("register.html");
      form.reset();
    }
  });
};

const login = () => {
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let errors = [];
    document
      .querySelectorAll(".incorrect")
      .forEach((el) => el.classList.remove("incorrect"));

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

    const storedUser = users.find(
      (user) => user.email === email.value && user.password === password.value
    );

    if (storedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      window.location.assign("register.html");
      loginForm.reset();
    } else {
      error_message.innerHTML = "Invalid email or password.";
    }
  });
};

const go = () => {
  let a = document.createElement("a");
  a.textContent = "Sign Up here";
  a.href = "signup.html";
  error_message.appendChild(a);
};

document.addEventListener("DOMContentLoaded", () => {
  const innerContainer = document.getElementById("inner");
  const outerContainer = document.getElementById("outer");
  const clear = document.getElementById("cross");

  if (innerContainer) innerContainer.style.display = "none";

  if (outerContainer) {
    outerContainer.addEventListener("click", (e) => {
      e.stopPropagation();
      if (innerContainer) innerContainer.style.display = "block";
      outerContainer.style.padding = "10px";
    });
  }

  if (clear) {
    clear.addEventListener("click", (e) => {
      e.stopPropagation();
      if (innerContainer) innerContainer.style.display = "none";
      outerContainer.style.padding = "10px 123px 15px 50px";
    });
  }

  document.addEventListener("click", (event) => {
    if (
      outerContainer &&
      innerContainer &&
      !outerContainer.contains(event.target) &&
      !innerContainer.contains(event.target)
    ) {
      innerContainer.style.display = "none";
    }
  });
});

const logout = () => {
  localStorage.removeItem("loggedInUser");
  window.location.assign("login.html");
};

registration();
login();

document.addEventListener("DOMContentLoaded", () => {
  const innerContainer = document.querySelector(".innerContainer-1");

  setTimeout(() => {
    innerContainer.classList.add("slideout");
  }, 4000);
  setTimeout(() => {
    innerContainer.style.display = "none";
  }, 5000);
});

const togglePassword = () => {
  const passwordField = document.getElementById("password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
};
const toggleRePassword = () => {
  const rePasswordField = document.getElementById("repeat-password");
  if (rePasswordField.type === "password") {
    rePasswordField.type = "text";
  } else {
    rePasswordField.type = "password";
  }
};
