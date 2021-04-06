// Unsplash API
const mCount = 10;
const mApiKey = 'CmYv-esLCAMLm2N3dBVQvWQ8-0zT80jmF1l90Exl160';
const mApiUrl = `https://api.unsplash.com/photos/random/?client_id=${mApiKey}&count=${mCount}`;

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const vResponse = await fetch(mApiUrl);
        const vData     = await vResponse.json();
    } catch(aError) {   
        // Catch error
    }
}

// On load
getPhotos();
