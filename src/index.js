import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelectEl = document.querySelector(".breed-select");
const catInfoEl = document.querySelector(".cat-info");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");

errorEl.classList.add("is-hidden");

// Function to handle errors
const onError = (error) => {
  loaderEl.classList.replace("loader", "is-hidden");
  errorEl.classList.remove("is-hidden");
  errorEl.textContent = "An error occurred while fetching data.";
};

// Function to fetch breeds and populate select options
const fetchAndPopulateBreeds = () => {
  fetchBreeds()
   .then((data) => {
      loaderEl.classList.replace("loader", "is-hidden");

      const optionsMarkup = data.map(({ name, id }) => {
        return `<option value=${id}>${name}</option>`;
      });

      breedSelectEl.insertAdjacentHTML("beforeend", optionsMarkup);
      breedSelectEl.classList.remove("is-hidden");
    })
   .catch(onError);
};

// Initial call to fetch and populate breeds
fetchAndPopulateBreeds();

// Event listener for breed select element
breedSelectEl.addEventListener("change", (e) => {
  // Show loader while loading
  loaderEl.classList.replace("is-hidden", "loader");

  // Hide select element and cat info while loading
  breedSelectEl.classList.add("is-hidden");
  catInfoEl.classList.add("is-hidden");

  const breedId = e.target.value;

  // Fetch cat by breed and update cat info
  fetchCatByBreed(breedId)
   .then((cat) => {
      loaderEl.classList.replace("loader", "is-hidden");
      catInfoEl.classList.remove("is-hidden");
      // Update cat info element with fetched cat data
      catInfoEl.textContent = `Cat Name: ${cat.name}, Breed: ${cat.breed}`;
    })
   .catch(onError);
});
