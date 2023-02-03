import { getAPI } from './api.js';
import { showPhotos } from './renderPhotos.js';
import { numberOfPhotosPerPage } from './api.js';

export async function totalButtonsPaginations() {
  const data = await getAPI();
  return Math.ceil(data.photos.length / numberOfPhotosPerPage);
}

export async function generateButtons(num) {
  const totalButtons = await totalButtonsPaginations();
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  const photos = document.querySelector('.container-footer');
  for (let i = 1; i <= totalButtons; i++) {
    const btn = document.createElement('button');
    if (num === i) {
      btn.classList.add('btn');
      btn.textContent = i;
      btn.style.fontSize = '1.3em';
      btn.style.border = '1px solid #ffffff';
      pagination.append(btn);
    } else {
      btn.classList.add('btn');
      btn.textContent = i;
      pagination.append(btn);
    }
  }
  photos.append(pagination);
}

export function listenerForButtons() {
  document.addEventListener('click', async function (event) {
    if ([...event.target.classList].includes('btn')) {
      const y = event.target.textContent;
      const num = Number(y);
      const start = numberOfPhotosPerPage * (y - 1);
      const end = numberOfPhotosPerPage * y;
      const pagination = document.querySelector('.pagination');
      pagination.remove();
      document.querySelector('.photos').innerHTML = '';
      await showPhotos(start, end);
      generateButtons(num);
    }
  });
}
