import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const wrapper = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

var slim = new SlimSelect({
  select: '#single',
  events: {
    afterClose: () => {
      selectBreed(slim.getSelected());
    },
  },
});

fetchBreeds()
  .then(select.isVisibilyte)
  .then(breeds => renderBreeds(breeds))
  .catch(error =>
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    )
  )
  .finally(() => {
    select.classList.remove('is-hidden');
    loader.classList.add('is-hidden');
  });

function selectBreed(values) {
  fetchCatByBreed(values)
    .then(wrapper.classList.add('is-hidden'))
    .then(loader.classList.remove('is-hidden'))
    .then(cat => renderCat(cat))
    .catch(error =>
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      )
    )
    .finally(() => {
      wrapper.classList.remove('is-hidden');
      loader.classList.add('is-hidden');
    });
}

function renderBreeds(breeds) {
  let markup = [];
  breeds.map(breed => {
    markup.push({ text: breed.name, value: breed.id });
  });
  slim.setData(markup);
}

function renderCat(cat) {
  const markup = `<img class='cat-img' src='${cat.url}' width='460px'>
  <div class='cat-wrapper'>
    <h1 class='cat-header'>${cat.breeds[0].name}</h1>
    <p class='cat-desc'>${cat.breeds[0].description}</p>
    <p class='cat-temp'><b>Temperament: </b>${cat.breeds[0].temperament}</p>
  </div>`;
  wrapper.innerHTML = markup;
}
