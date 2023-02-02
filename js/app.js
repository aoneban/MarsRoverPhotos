const API_KEY = '6RQmIjfImXE62ua5FzFp1aflqWxUShOThCstgVh2';
const API_URL =
  'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=';

const numberOfPhotosPerPage = 24;

getAPI();
showPhotos(0, numberOfPhotosPerPage);
generateButtons();
listenerForButtons();

async function getAPI() {
  const resp = await fetch(API_URL + API_KEY);
  const respData = await resp.json();
  return respData;
}

async function getArrayPhotos(a, b) {
  const data = await getAPI();
  return data.photos.slice(a, b);
}

async function totalButtonsPaginations() {
  const data = await getAPI();
  return Math.ceil(data.photos.length / numberOfPhotosPerPage);
}

async function showPhotos(a, b) {
  const data = await getArrayPhotos(a, b);
  const photosEl = document.querySelector('.photos');

  data.forEach((photo) => {
    const photoEl = document.createElement('div');
    photoEl.classList.add('photo');
    photoEl.innerHTML = `
        <div class="photo">
          <div class="photo__cover-inner">
          <a href=${photo.img_src} class="imaguru" target="_blanc"><img
              src=${photo.img_src}
              loading="lazy"
              alt="${photo.camera.full_name}"
              class="photo__cover"
              style="width:240px;height:215px"
            /></a>
          </div>
          <div class="photo__info">
            <div class="photo__title">Rover name: ${photo.rover.name}</div>
            <div class="photo__title">Camera name: ${photo.camera.full_name}</div>
            <div class="photo__category">Data: ${photo.earth_date}</div>
            <div class="photo__average photo__average--">${photo.rover.name}</div>
          </div>
        </div>
    `;
    photosEl.appendChild(photoEl);
  });
}

async function generateButtons(num) {
  const totalButtons = await totalButtonsPaginations();
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  const photos = document.querySelector('.container2');
  for (let i = 1; i <= totalButtons; i++) {
    const btn = document.createElement('button');
    if (num === i) {
      btn.classList.add('btn');
      btn.textContent = i;
      btn.style.backgroundColor = 'red';
      pagination.append(btn);
    } else {
      btn.classList.add('btn');
      btn.textContent = i;
      pagination.append(btn);
    }
  }
  photos.append(pagination);
}

function listenerForButtons() {
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
