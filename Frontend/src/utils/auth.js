const BASE_URL = "https://web-project-api-full-xdhv.vercel.app";

//Register
export const register = ({ email, password }) => {
  console.log("REGISTER DATA:", email, password);

  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    console.log("STATUS:", res.status);

    if (!res.ok) {
      return Promise.reject(`Erro: ${res.status}`);
    }

    return res.json();
  });
};

// Login
export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Erro: ${res.status}`);
    }

    return res.json();
  });
};

//Verify token
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Erro: ${res.status}`);
    }
    return res.json();
  });
};
