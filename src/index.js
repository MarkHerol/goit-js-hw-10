import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");
const errorElement = document.querySelector(".error");

fetchBreeds()
 .then(response => {
    const breeds = response.data;
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
    loader.classList.add("hidden");
    breedSelect.classList.remove("hidden");
  })
 .catch(error => {
    errorElement.classList.remove("hidden");
    loader.classList.add("hidden");
  });

breedSelect.addEventListener("change", event => {
  const breedId = event.target.value;
  loader.classList.remove("hidden");
  catInfo.classList.add("hidden");
  fetchCatByBreed(breedId)
   .then(response => {
      const catData = response.data[0];
      catInfo.innerHTML = `
        <img src="${catData.url}" alt="${catData.breeds[0].name}">
        <h2>${catData.breeds[0].name}</h2>
        <p>${catData.breeds[0].description}</p>
        <p>Temperament: ${catData.breeds[0].temperament}</p>
      `;
      loader.classList.add("hidden");
      catInfo.classList.remove("hidden");
    })
   .catch(error => {
      errorElement.classList.remove("hidden");
      loader.classList.add("hidden");
    });
});