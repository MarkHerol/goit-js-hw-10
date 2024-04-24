import axios from "axios";

// Setting the API key in the HTTP header
axios.defaults.headers.common["x-api-key"] = "your key";

// Fetching the list of breeds and returning a promise
export function fetchBreeds() {
  // Showing the loader and hiding the breed selector
  document.querySelector(".breed-select").style.display = "none";
  document.querySelector(".loader").style.display = "block";

  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      // Hiding the loader and showing the breed selector
      document.querySelector(".loader").style.display = "none";
      document.querySelector(".breed-select").style.display = "block";

      // Populating the breed selector with options
      const breedSelect = document.querySelector(".breed-select");
      breedSelect.innerHTML = "";
      response.data.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      // Returning the list of breeds
      return response.data;
    })
    .catch((error) => {
      // Hiding the loader and showing the error message
      document.querySelector(".loader").style.display = "none";
      document.querySelector(".error").style.display = "block";

      // Rejecting the promise with the error
      return Promise.reject(error);
    });
}

// Fetching the cat data by breed ID and returning a promise
export function fetchCatByBreed(breedId) {
  // Showing the loader and hiding the cat info
  document.querySelector(".cat-info").style.display = "none";
  document.querySelector(".loader").style.display = "block";

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      // Hiding the loader and showing the cat info
      document.querySelector(".loader").style.display = "none";
      document.querySelector(".cat-info").style.display = "block";

      // Populating the cat info with the cat data
      const catInfo = document.querySelector(".cat-info");
      catInfo.innerHTML = `
        <h2>${response.data[0].breeds[0].name}</h2>
        <p>${response.data[0].breeds[0].description}</p>
        <p>Temperament: ${response.data[0].breeds[0].temperament}</p>
        <img src="${response.data[0].url}" alt="${response.data[0].breeds[0].name}">
      `;

      // Returning the cat data
      return response.data[0];
    })
    .catch((error) => {
      // Hiding the loader and showing the error message
      document.querySelector(".loader").style.display = "none";
      document.querySelector(".error").style.display = "block";

      // Rejecting the promise with the error
      return Promise.reject(error);
    });
}