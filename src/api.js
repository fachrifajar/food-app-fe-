import axios from "axios";

// Create an instance of axios
const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // Enable sending cookies
  xsrfCookieName: "csrfToken", // Set the name of the XSRF token cookie
  xsrfHeaderName: "X-CSRF-TOKEN", // Set the name of the XSRF token header
});

// Set the XSRF token cookie received from the server
Api.defaults.headers.common["X-CSRF-TOKEN"] =
  document.cookie.match(/csrfToken=([^;]+)/)?.[1] || "";

export default Api;
