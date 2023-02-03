export const API_KEY = '6RQmIjfImXE62ua5FzFp1aflqWxUShOThCstgVh2';
export const API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=';
export const numberOfPhotosPerPage = 24;

export async function getAPI() {
    const resp = await fetch(API_URL + API_KEY);
    const respData = await resp.json();
    return respData;
  }