export default function postMethodAPI(
  credentials,
  endpoint,
  successCallback,
  errorCallback
) {
  const baseURL = "http://localhost:8080";

  // Make a POST API to backend
  fetch(baseURL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      if (data.error) {
        errorCallback(data.error);
      } else {
        successCallback(data);
      }
    });
}
