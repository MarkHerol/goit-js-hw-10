import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "your key";

export const fetchBreeds = () => {
  return axios.get("https://api.thecatapi.com/v1/breeds");
};

export const fetchCatByBreed = (breedId) => {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
};


import React, { useState, useEffect } from "react";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Select from "react-select";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Notiflix from "notiflix";

const CatApp = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [cat, setCat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBreedsData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchBreeds();
        setBreeds(response.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchBreedsData();
  }, []);

  const handleBreedChange = selectedOption => {
    setSelectedBreed(selectedOption.value);
    setIsLoading(true);
    fetchCatByBreed(selectedOption.value)
      .then(response => {
        setCat(response.data[0]);
      })
      .catch(error => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const breedOptions = breeds.map(breed => ({
    value: breed.id,
    label: breed.name,
  }));

  return (
    <div className="cat-app">
      <h1>Cat Breed Search</h1>
      <Select
        options={breedOptions}
        value={selectedBreed}
        onChange={handleBreedChange}
        isLoading={isLoading}
        isClearable
      />
      {isError && (
        <div>
          {Notiflix.Notify.failure('An error occurred while fetching data.')}
        </div>
      )}
      {isLoading ? (
        <Loader type="ThreeDots" color="#333" height={80} width={80} />
      ) : (
        <div className="cat-info">
          {cat && (
            <>
              <img src={cat.url} alt={cat.breed} />
              <div>
                <h2>{cat.breed}</h2>
                <p>{cat.description}</p>
                <p>{cat.temperament}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CatApp;