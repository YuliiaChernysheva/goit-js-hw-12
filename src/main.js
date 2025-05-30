import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn-load-more');

let userValue = '';
let currentPage = 1;
let totalHits = 0;
let currentHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  userValue = input.value.trim();

  if (!userValue) {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  currentHits = 0;
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(userValue, currentPage);

    totalHits = data.totalHits;
    currentHits = data.hits.length;

    createGallery(data.hits);
    updateBtnStatus();
    scrollPage();

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(userValue, currentPage);
    currentHits += data.hits.length;

    createGallery(data.hits);
    updateBtnStatus();
    scrollPage();

    if (currentHits >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
});

function scrollPage() {
  const galleryItem = galleryEl.querySelector('.gallery-item');
  if (!galleryItem) return;

  const cardHeight = galleryItem.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function updateBtnStatus() {
  if (currentHits < totalHits) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }
}
