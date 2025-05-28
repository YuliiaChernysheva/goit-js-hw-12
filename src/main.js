import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './pixabay-api';
I;
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './render-functions';

let userValue = '';
let currentPage = 1;
let maxPage = 0;

const refs = {
  formElem: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.btn-load-more'),
  loadElem: document.querySelector('.loader'),
};

refs.formElem.addEventListener('submit', async e => {
  e.preventDefault();
  userValue = e.target.elements['search-text'].value.trim();
  currentPage = 1;

  showLoader();
  const res = await getImagesByQuery(userValue, currentPage);
  clearGallery();
  createGallery(res.hits);

  maxPage = Math.ceil(res.totalHits / 15);
  updateBtnStatus();

  hideLoader();
  e.target.reset();
});

refs.btnLoadMore.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  const res = await getImagesByQuery(userValue, currentPage);
  createGallery(res.hits);

  updateBtnStatus();
  hideLoader();
});

function showLoadBtn() {
  refs.btnLoadMore.classList.remove('hidden');
}

function hideLoadBtn() {
  refs.btnLoadMore.classList.add('hidden');
}

function updateBtnStatus() {
  if (currentPage < maxPage) {
    showLoadBtn();
  } else {
    hideLoadBtn();
  }
}
