"use strict";

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  "https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif";

function walk(img, startPos, stopPos) {
  let currentLeft = startPos;
  img.style.left = `${currentLeft}px`;

  return new Promise((resolve) => {
    const walkInterval = setInterval(() => {
      if (currentLeft < stopPos) {
        currentLeft += STEP_SIZE_PX;
        img.style.left = `${currentLeft}px`;
      } else {
        clearInterval(walkInterval);
        resolve(img);
      }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise((resolve) => {
    const walkingCatUrl = img.src;
    img.src = DANCING_CAT_URL;
    setTimeout(() => {
      img.src = walkingCatUrl;
      resolve(img);
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const img = document.querySelector("img");
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth - img.width;
  const loop = true;

  walk(img, startPos, centerPos)
    .then((resolvedImg) => dance(resolvedImg))
    .then((resolvedImg) => walk(resolvedImg, centerPos, stopPos))
    .then(() => {
      catWalk();
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("load", catWalk);
