export default function getJWT() {
  const baseURL = "http://localhost:8080";
  const token = localStorage.getItem("token");
  return { baseURL, token };
}
