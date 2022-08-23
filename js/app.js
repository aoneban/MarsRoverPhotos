const API_KEY = "6RQmIjfImXE62ua5FzFp1aflqWxUShOThCstgVh2";
const API_URL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=";
const API_URL_2 = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=";

//processing an asynchronous request

getNasaPhotos();
async function getNasaPhotos() {
  const resp = await fetch(API_URL + API_KEY, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const respData = await resp.json();
  showPhotos(respData);
}

//I create a function for outputting data from a request

function showPhotos(data) {
  const photosEl = document.querySelector(".photos");

  data.photos.forEach((photo) => {
    if (photo.id % 2 !== 0) {
      const photoEl = document.createElement("div");
      photoEl.classList.add("photo");
      console.log(photosEl.length);
      photoEl.innerHTML = `
    <div class="photo">
          <div class="photo__cover-inner">
          <a href=${photo.img_src} class="imaguru"><img
              src=${photo.img_src}
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
    }
  });
}
