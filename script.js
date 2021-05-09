/* Unsplash API */
const count = 10;
const apiKey = 'r2ui2UNBJfauzBe1T3AHg3nS__ICGl1JL-49zfv_guU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

/* Get photos from unsplash API */
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        //Catch error her
        console.log('whoops error during retrieving photos', error);
    }
}

/* On load */
getPhotos();