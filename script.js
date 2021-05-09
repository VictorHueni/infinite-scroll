//Variables
let areImagesReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// DOM 
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Unsplash API 
let imagesCount = 5;
const apiKey = 'API_KEY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesCount}`;


//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        if (initialLoad) {
            loader.hidden = true;
            imagesCount = 30;
            initialLoad = false;
            apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesCount}`;
        }
        areImagesReady = true;
    }
}

// Helper function to set attributes on DOM Elements
function setAttributes(elements, attributes) {
    for (const key in attributes) {
        elements.setAttribute(key, attributes[key])
    }
}

// Create elements for links & photos, add to DOM 
function displayPhotos() {

    totalImages = photosArray.length;

    //Run function for each in photosArray
    photosArray.forEach((photo) => {

        //Create a <a> to link  to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        //Create a <img< for photos
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both inside image-container element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


// Get photos from unsplash API 
async function getPhotos() {
    try {
        //Fetch photos array object from the unsplash API
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        //Catch error her
        console.log('whoops error during retrieving photos', error);
    }
}

// Check to see if scrolling near bottom of page, Load more photos 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && areImagesReady) {
        areImagesReady = false;
        imagesLoaded = 0;
        getPhotos();
    }
});

// On load 
getPhotos();