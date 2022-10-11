const loginFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-login');
  const passwordEl = document.querySelector('#password-input-login');
  const logoutEl = document.getElementById('logout-link')

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
    logoutEl.classList.remove("hide");
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);