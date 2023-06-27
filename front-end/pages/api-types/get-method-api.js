export default function getMethodAPI(endpoint, successCallback, errorCallback) {
  const baseURL = "http://localhost:8080";
  const token = localStorage.getItem("token");
 

  fetch(baseURL + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        errorCallback(data.error);
      } else {
        successCallback(data);
      }
    });
}
