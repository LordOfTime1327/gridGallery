"use strict";

let grid = document.getElementById("grid"),
  closeBtn = document.getElementById("close"),
  img = document.getElementsByClassName("block__img"),
  filters = document.getElementById("filters"),
  zoomBtn = document.getElementsByClassName("zoom"),
  block = document.getElementsByClassName("block"),
  bigImg = document.getElementById("bigImg"),
  body = document.querySelector("body"),
  zoomImg = document.getElementsByClassName("zoomed"),
  prevBtn = document.getElementsByClassName("prevBlock"),
  nextBtn = document.getElementsByClassName("nextBlock"),
  filterIconBtn = document.getElementById("filterIcon"),
  menuWrapper = document.getElementById("menuWrapper"),
  nav = document.getElementById("nav"),
  filterCloseBtn = document.getElementById("filterClose"),
  filtersItem = document.getElementsByClassName("filters__item"),
  folderArray = [],
  newImgMassive = [],
  index;

for (let i = 0; i < imagesMassive.length; i++) {
  let random = Math.floor(Math.random() * (imagesMassive.length - i)) + i;
  let el = imagesMassive[random];
  imagesMassive[random] = imagesMassive[i];
  imagesMassive[i] = el;

  let set =
    `<div class ="block">
                    <img src="` +
    el +
    `" alt=""  class="block__img" />
                    <div class='set'>
                      <img src="img/zoom.png" class="zoom" />
                      <a href="` +
    el +
    `" download><img src="img/download.png" class="download" /></a>
                      <div class="topLeft"></div>
                      <div class="topRight"></div>
                      <div class="bottomLeft"></div>
                      <div class="bottomRight"></div>
                    </div>
                  </div>`;
  grid.innerHTML += set;
}

for (let i = 0; i < img.length; i++) {
  let el = img[i].getAttribute("src");

  let getSubfolderName = el.split("/")[1];
  folderArray.push(getSubfolderName);
  let setDataFilterName = img[i].setAttribute("data-filter", getSubfolderName);
}

function unique(arr) {
  let result = [];
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}

let uniqueFn = unique(folderArray);
uniqueFn.sort();

for (let i = 0; i < uniqueFn.length; i++) {
  let filterItem =
    `<li class="filters__item" data-filter="` +
    uniqueFn[i] +
    `">` +
    uniqueFn[i] +
    `</li>`;
  filters.innerHTML += filterItem;
}

for (let i = 0; i < filtersItem.length; i++) {
  let str = filtersItem[i].innerHTML;
  function firstUpperLetter(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }
  filtersItem[i].innerHTML = firstUpperLetter(str);
}

/*function prevImg() {
  index--;
  removeBigImg();
  let setBigImg =
    `<img id="zoomed" class="zoomed fadeIn" src="` +
    img[index].getAttribute("src") +
    `" />`;
  bigImg.innerHTML += setBigImg;
  if (index == 0) prevBtn[0].style = "display: none;";
  else if ((nextBtn[0].style = "display: none;" && index != img.length)) {
    nextBtn[0].style = "display: block;";
  } else {
    prevBtn[0].style = "display: block;";
  }
}
function nextImg() {
  index++;
  removeBigImg();
  let setBigImg =
    `<img id="zoomed" class="zoomed fadeIn" src="` +
    img[index].getAttribute("src") +
    `" />`;
  bigImg.innerHTML += setBigImg;
  if (index == img.length - 1) nextBtn[0].style = "display: none;";
  else if ((prevBtn[0].style = "display: none;" && index != 0)) {
    prevBtn[0].style = "display: block;";
  } else {
    nextBtn[0].style = "display: block;";
  }
}*/

function filter() {
  let filterVal = this.getAttribute("data-filter");

  newImgMassive.length = 0;

  for (let i = 0; i < img.length; i++) {
    let imgDataFilter = img[i].getAttribute("data-filter");

    if (filterVal == imgDataFilter)
      newImgMassive.push(img[i].getAttribute("src"));

    if (filterVal == "all") block[i].classList.remove("block_hide");
    else if (filterVal != imgDataFilter) block[i].classList.add("block_hide");
    else block[i].classList.remove("block_hide");
  }
  filterClose();
}
for (let i = 0; i < filtersItem.length; i++) {
  filtersItem[i].addEventListener("click", filter, false);
}

for (let i = 0; i < zoomBtn.length; i++) {
  function zoom() {
    if (newImgMassive.length == 0) {
      index = i;
    } else {
      for (let j = 0; j < newImgMassive.length; j++) {
        let el1 = img[i].getAttribute("src");
        let el2 = newImgMassive[j];
        if (el1 == el2) index = j;
      }
    }

    if (newImgMassive.length == 1) {
      nextBtn[0].style = "display: none;";
      prevBtn[0].style = "display: none;";
    } else if (index == img.length - 1) {
      nextBtn[0].style = "display: none;";
      prevBtn[0].style = "display: block;";
    } else if (index == 0) {
      prevBtn[0].style = "display: none;";
      nextBtn[0].style = "display: block;";
    } else {
      prevBtn[0].style = "display: block;";
      nextBtn[0].style = "display: block;";
    }

    bigImg.classList.add("bigImg");
    bigImg.style = "display: flex;";
    let setBigImg =
      `<img id="zoomed" class="zoomed fadeIn" src="` +
      img[i].getAttribute("src") +
      `" />`;

    bigImg.innerHTML += setBigImg;
    body.classList.add("stop-scrolling");
  }
  zoomBtn[i].addEventListener("click", zoom, false);
}

function prevNextImg(e) {
  index += e;
  removeBigImg();
  let el;
  if (newImgMassive.length == 0) {
    el = img[index].getAttribute("src");
  } else el = newImgMassive[index];

  let setBigImg = `<img id="zoomed" class="zoomed fadeIn" src="` + el + `" />`;
  bigImg.innerHTML += setBigImg;

  if (index == newImgMassive.length - 1) {
    nextBtn[0].style = "display: none;";
    prevBtn[0].style = "display: block;";
  } else if (index == img.length - 1) {
    nextBtn[0].style = "display: none;";
    prevBtn[0].style = "display: block;";
  } else if (index == 0) {
    prevBtn[0].style = "display: none;";
    nextBtn[0].style = "display: block;";
  } else {
    prevBtn[0].style = "display: block;";
    nextBtn[0].style = "display: block;";
  }
}
document.addEventListener("keyup", e => {
  const keyName = e.key;

  if (keyName === "ArrowLeft" && index > 0) prevNextImg(-1);
  else if (
    keyName === "ArrowRight" &&
    index < img.length - 1 &&
    newImgMassive.length == 0
  )
    prevNextImg(1);
  else if (keyName === "ArrowRight" && index < newImgMassive.length - 1)
    prevNextImg(1);
});

function closeBigImg() {
  bigImg.classList.remove("bigImg");
  bigImg.style = "display: none;";
  body.classList.remove("stop-scrolling");

  removeBigImg();
}
document.addEventListener("keyup", e => {
  const keyName = e.key;
  if (keyName === "Escape") closeBigImg();
});

function removeBigImg() {
  for (let i = 0; i < zoomImg.length; i++) {
    zoomImg[i].parentNode.removeChild(zoomImg[i]);
  }
}

function filterOpen() {
  menuWrapper.classList.add("menuWrapper__show");
  nav.classList.add("nav__show");
  body.classList.add("stop-scrolling");
}
function filterClose() {
  menuWrapper.classList.remove("menuWrapper__show");
  nav.classList.remove("nav__show");
  body.classList.remove("stop-scrolling");
}

filterIconBtn.addEventListener("click", filterOpen, false);
filterCloseBtn.addEventListener("click", filterClose, false);

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -100);
    setTimeout(backToTop, 10);
  }
}
let toTop = document.getElementsByClassName("header__caption");
toTop[0].addEventListener("click", backToTop, false);
