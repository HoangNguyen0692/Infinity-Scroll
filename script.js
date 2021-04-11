// Global variables for DOM
const mImageContainer = document.getElementById("image-container");
const mLoader         = document.getElementById("loader");

// Image-related variables
let mbReady       = false;
let mImagesLoaded = 0;
let mTotalImages  = 0;
let mPhotosArray  = [];

// Unsplash API
const mCountToLoad = 5;
let   mbIsInitialised = true;
const mApiKey = 'CmYv-esLCAMLm2N3dBVQvWQ8-0zT80jmF1l90Exl160';
let   mApiUrl = `https://api.unsplash.com/photos/random/?client_id=${mApiKey}&count=${mCountToLoad}`;

/****************************************************************/
// Update number of images to load when we're done laading the first numbers
function updateAPIURLWithNewCount(aPicCount)
{
    let   mApiUrl = `https://api.unsplash.com/photos/random/?client_id=${mApiKey}&count=${aPicCount}`;
}

// Check if all images were done loaded
function imageLoaded()
{
   mImagesLoaded += 1;
   if (mImagesLoaded == mTotalImages)
   {
       mbReady        = true;
       mLoader.hidden = true; // hide the loading icon once we're done loading
       mCountToLoad   = 30;   // once we're done loading first images,  we continue to load more
   }
}

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
    // Reassign 0 to number of loaded images since we just request a new array of images
    mImagesLoaded = 0;
    // Assign value for total images 
    mTotalImages = mPhotosArray.length;
    // Run function for each object in mPhotosArray
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

        // Event listener, check when each is done loading
        vImg.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside image-container element
        vItem.appendChild(vImg);
        mImageContainer.appendChild(vItem);
    });
}

// Get photos from Unsplash API
async function getPhotos() 
{
    try {
        const vResponse = await fetch(mApiUrl);
        mPhotosArray    = await vResponse.json();
        displayPhotos();
        if(mbIsInitialised == true)
        {
            updateAPIURLWithNewCount(30);
            mbIsInitialised = false;
        }
    } catch(aError) {   
        // Catch error
        console.log(aError);
    }
}

// Check to see if scrolling near bottom of page, load more images
window.addEventListener('scroll', () => 
{
    if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000) && 
    (mbReady == true))
    {
        mbReady = false;
        getPhotos();
    }
});

// On load
getPhotos();
