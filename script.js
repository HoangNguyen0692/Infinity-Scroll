// Global variables for DOM
const mImageContainer = document.getElementById("image-container");
const mLoader         = document.getElementById("loader");

let   mPhotosArray    = [];

// Healper function to set attrubutes on DOM elements
function setAttributes(aElement, aAttrs) // aAttrs is a dictionary tbh
{
    for(const iKey in aAttrs)
    {
        aElement.setAttribute(iKey, aAttrs[iKey]);
    }
}

// Create elements for links and photos then add to DOM
function displayPhotos() 
{
    // Run function for each object in mPhotosArray
    console.log(mPhotosArray);
    mPhotosArray.forEach((aPhoto) =>
    {
        // Create <a> to link to Unsplash
        const vItem = document.createElement('a');
        // Set attributes for each Item
        setAttributes(vItem, 
            {
                href: aPhoto.links.html,
                target: '_blank'   // open in the new tab when clicked
            });

        // Create <img> for photo
        const vImg = document.createElement('img');
        // Set sus-attribute for each image
        setAttributes(vImg, 
            {
                src: aPhoto.urls.regular,
                alt: aPhoto.alt_description,
                title: aPhoto.alt_description
            });

        // Put <img> inside <a>, then put both inside image-container element
        vItem.appendChild(vImg);
        mImageContainer.appendChild(vItem);
    });
}

// Unsplash API
const mCount  = 10;
const mApiKey = 'CmYv-esLCAMLm2N3dBVQvWQ8-0zT80jmF1l90Exl160';
const mApiUrl = `https://api.unsplash.com/photos/random/?client_id=${mApiKey}&count=${mCount}`;

// Get photos from Unsplash API
async function getPhotos() 
{
    try {
        const vResponse = await fetch(mApiUrl);
        mPhotosArray    = await vResponse.json();
        //console.log(mPhotosArray);
        displayPhotos();
    } catch(aError) {   
        // Catch error
        console.log(aError);
    }
}

// On load
getPhotos();
