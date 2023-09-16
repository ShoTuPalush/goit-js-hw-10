import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_LWojjEQPe8YD1gW3S5GMlVDdUQ9oOh8IfhXfkhvZQo4OZFphcrckftMDaTo3Oijv';

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?&breed_ids=${breedId}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(sad =>
      fetch(`https://api.thecatapi.com/v1/images/${sad[0].id}`).then(
        response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        }
      )
    );
}
