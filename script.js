// total number of images in the folder
const totalImages = 1; // <---- Update this number to the cound of images you have
let historyStack = [];
// start with a random image when page loads
let currentImage = Math.floor(Math.random() * totalImages) + 1;
let currentExtIndex = 0;
// supported image formats to try loading
const extensions = ['jpg', 'png', 'gif', 'jpeg'];
// keeps track of which images we've already shown
let viewedImages = new Set();

// Localization strings
const strings = {
  'tr': {
    congrats: 'tebrikler!',
    completed: 'sexcalibur.space\'i bitirdin',
    playAgain: 'yine, yine!'
  },
  'en': {
    congrats: 'congratulations!',
    completed: 'you finished sexcalibur.space',
    playAgain: 'again, again!'
  }
};

// Get user language
const userLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
const text = strings[userLang];

// Create popup elements
let popupOverlay;
if (document.getElementById('mainImage')) { // Only create popup if on main page
  popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay';
  popupOverlay.innerHTML = `
    <div class="popup-content">
      <h2 class="popup-title">${text.congrats}</h2>
      <p>${text.completed}</p>
      <button class="pink-btn" onclick="resetAndClose()">${text.playAgain}</button>
    </div>
  `;
  document.body.appendChild(popupOverlay);
}

const imageEl = document.getElementById("mainImage");
const numberEl = document.getElementById("imageNumber");

function setImage(num, addToHistory = true) {
  // save current image to history if needed
  if (addToHistory && currentImage) {
    historyStack.push(currentImage);
  }
  currentImage = num;
  currentExtIndex = 0;
  viewedImages.add(num);
  tryLoadImage();
  // update the image number display
  numberEl.textContent = `#${currentImage}`;
}

function tryLoadImage() {
  const ext = extensions[currentExtIndex];
  imageEl.src = `images/${currentImage}.${ext}`;
  // if image fails to load, try next file extension
  imageEl.onerror = () => {
    currentExtIndex++;
    if (currentExtIndex < extensions.length) {
      tryLoadImage();
    }
  };
}

function showCompletionPopup() {
  popupOverlay.style.display = 'flex';
}

function resetAndClose() {
  viewedImages.clear();
  viewedImages.add(currentImage);
  popupOverlay.style.display = 'none';
  const rand = getRandomUnviewedImage();
  setImage(rand, true);
}

function getRandomUnviewedImage() {
  if (viewedImages.size >= totalImages) {
    showCompletionPopup();
    viewedImages.clear();
    viewedImages.add(currentImage);
  }

  // create array of numbers from 1 to totalImages that we haven't seen yet
  const unviewedImages = Array.from(
    { length: totalImages },
    (_, i) => i + 1
  ).filter(num => !viewedImages.has(num));

  return unviewedImages[Math.floor(Math.random() * unviewedImages.length)];
}

// go back to previous image when clicking back button
const prevBtn = document.getElementById("prevBtn");
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (historyStack.length > 0) {
      const prev = historyStack.pop();
      setImage(prev, false);
    }
  });
}

// show a new random image when clicking rastgele button
const randomBtn = document.getElementById("randomBtn");
if (randomBtn) {
  randomBtn.addEventListener("click", () => {
    const rand = getRandomUnviewedImage();
    setImage(rand, true);
  });
}

// set up initial image
if (imageEl && numberEl) { // Ensure image-related elements exist
  setImage(currentImage, false);
}

// this has been mostly vibe-coded but it still works! have fun with it!
