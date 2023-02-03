import { showPhotos } from './moduls/renderPhotos.js';
import { getAPI, numberOfPhotosPerPage } from './moduls/api.js';
import { generateButtons, listenerForButtons } from './moduls/utils.js';

getAPI();
showPhotos(0, numberOfPhotosPerPage);
generateButtons();
listenerForButtons();
