export default function getMethodAPI(endpoint, successCallback, errorCallback) {
  const baseURL = "http://localhost:8080";

  fetch(baseURL + endpoint)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        errorCallback(data.error);
      } else {
        successCallback(data);
      }
    });
}
