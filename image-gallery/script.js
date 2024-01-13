const apiKey = "ckf9RH6DUHrAHFtgb3Zv059h1Vbd5xRCXX9WTUGS-7g";
const imageCount = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
const imageDiv = document.getElementById("imageDiv");
const loader = document.querySelector(".loader");

let imagesArr = [];
let isWaited = false;
let imgCount = 0;
let totalImages = 0;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    imagesArr = await response.json();

    getImages();
  } catch (error) {
    console.error("Hata...");
  }
}

function imgLoading() {
  imgCount++;
  if (imgCount === totalImages) {
    loader.hidden = true;
    isWaited = true;
  }

  
}

function getImages() {
  imagesArr.forEach((item) => {
    imgCount = 0;
    totalImages = imagesArr.length;
    const imageLink = document.createElement("a");
    // imageLink.setAttribute("href", item.urls.regular);
    setAttribute(imageLink,{href:item.urls.regular});
    const image = document.createElement("img");
    // image.setAttribute("src", item.urls.regular);
    // image.setAttribute("alt", item.alt_description);
    setAttribute(image,
        {src:item.urls.regular,
        alt:item.alt_description})
    image.addEventListener("load", imgLoading);
    imageLink.appendChild(image);
    imageDiv.appendChild(imageLink);
  });
}

function setAttribute(item,attributes){
    for(const key in attributes)
    {
        item.setAttribute(key,attributes[key]);

    }
}

getPhotos();

window.addEventListener("scroll", scrollEvent);

function scrollEvent() {
  if (
    window.innerHeight + imageDiv.offsetHeight >= document.body.offsetHeight - 1000 &&
    isWaited
  ) {
    getImages();
  }
}
