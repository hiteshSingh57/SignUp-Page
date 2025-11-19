// Panel Switch Logic
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Simple demo: Store users in localStorage (for real apps, use a backend)
function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

// Signup Logic
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  const users = getUsers();
  const exists = users.some(u => u.email === email);

  const msg = document.getElementById("signup-message");
  if (exists) {
    msg.textContent = "Email already registered!";
    return;
  }

  saveUser({ username, email, password });
  msg.style.color = "green";
  msg.textContent = "Signup successful! You can now log in.";
  this.reset();
});

// Login Logic
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  const msg = document.getElementById("login-message");
  if (user) {
    msg.style.color = "green";
    msg.textContent = "Login successful! Welcome, " + user.username + ".";
    this.reset();
  } else {
    msg.style.color = "#e74c3c";
    msg.textContent = "Invalid email or password.";
  }
});