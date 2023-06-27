export default function postMethodAPI(
  credentials,
  endpoint,
  successCallback,
  errorCallback
) {
  const baseURL = "http://localhost:8080";
  const token = localStorage.getItem("token");

  // Make a POST API to backend
  fetch(baseURL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .then((data) => {
      // Check if the response data has an 'error' property
      if (data.error) {
        errorCallback(data.error);
      } else {
        successCallback(data);
      }
    })
    .catch((error) => {
      errorCallback(error.message);
    });
}
