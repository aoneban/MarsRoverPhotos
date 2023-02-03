import { getAPI } from "./api.js";
import { sliderPhotos } from "./utils.js";

export async function showPhotos(a, b) {
  const data = await getArrayPhotos(a, b);
  const photosEl = document.querySelector('.photos');

  data.forEach((photo) => {
    const photoEl = document.createElement('div');
    photoEl.classList.add('photo');

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('photo__cover-inner');
    const img = document.createElement('img');
    img.classList.add('img-size');
    img.addEventListener('click', sliderPhotos);
    img.src = photo.img_src;
    img.alt = photo.camera.full_name;
    imgWrapper.append(img);
    
    const imgInfo = document.createElement('div');
    imgInfo.classList.add('photo__info');

    const photoTitle = document.createElement('p');
    photoTitle.classList.add('photo__title');
    photoTitle.textContent = `Rover name: ${photo.rover.name}`;
    const photoTitleTwo = document.createElement('p');
    photoTitleTwo.classList.add('photo__title');
    photoTitleTwo.textContent = `Camera name: ${photo.camera.full_name}`;
    const imgCategory = document.createElement('p');
    imgCategory.classList.add('photo__category');
    imgCategory.textContent = `Data: ${photo.earth_date}`;
    const average = document.createElement('p');
    average.classList.add('photo__average');
    average.textContent = photo.rover.name

    imgInfo.append(photoTitle, photoTitleTwo, imgCategory, average)
    photoEl.append(imgWrapper, imgInfo );
    photosEl.appendChild(photoEl);
  });
}

export async function getArrayPhotos(a, b) {
  const data = await getAPI();
  return data.photos.slice(a, b);
}
