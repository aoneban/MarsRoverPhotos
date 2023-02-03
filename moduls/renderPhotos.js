import { getAPI } from "./api.js";

export async function showPhotos(a, b) {
  const data = await getArrayPhotos(a, b);
  const photosEl = document.querySelector('.photos');

  data.forEach((photo) => {
    const photoEl = document.createElement('div');
    photoEl.classList.add('photo');
    photoEl.innerHTML = `
          <div class="photo">
            <div class="photo__cover-inner">
            <a href=${photo.img_src} target="_blanc">
              <img
                src=${photo.img_src}
                loading="lazy"
                alt="${photo.camera.full_name}"
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

export async function getArrayPhotos(a, b) {
  const data = await getAPI();
  return data.photos.slice(a, b);
}
