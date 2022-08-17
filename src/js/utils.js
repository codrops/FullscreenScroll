const imagesLoaded = require('imagesloaded');

/**
 * Preload images
 * @param {String} selector - Selector/scope from where images need to be preloaded. Default is 'img'
 */
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

/**
 * Linear interpolation
 * @param {Number} a - first value to interpolate
 * @param {Number} b - second value to interpolate 
 * @param {Number} n - amount to interpolate
 */
 const lerp = (a, b, n) => (1 - n) * a + n * b;

 /**
  * Gets the cursor position
  * @param {Event} ev - mousemove event
  */
 const getCursorPos = ev => {
     return { 
         x : ev.clientX, 
         y : ev.clientY 
     };
 };

export {
    preloadImages,
    lerp,
    getCursorPos,
};